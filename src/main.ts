import './style.css';
import { openai } from './openai';
import { promptSystem } from './promptSystem.ts';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
const form = document.querySelector('#generate-form') as HTMLFormElement;
const iframe = document.querySelector('#generate-code') as HTMLIFrameElement;
const input = document.querySelector('#prompt') as HTMLInputElement;
const fieldset = document.querySelector('fieldset') as HTMLFieldSetElement;

let messages: ChatCompletionMessageParam[] = [
  {
    role: 'system',
    content: promptSystem,
  },
];

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (fieldset.disabled) {
    return;
  }

  const formData = new FormData(form);

  const prompt = formData.get('prompt') as string;

  if (!prompt) {
    return;
  }

  let openaiKey = localStorage.getItem('openai-key') ?? '';

  if (!openaiKey) {
    const newKey = window.prompt('Please enter your OpenAI key');

    if (!newKey) {
      return;
    }

    localStorage.setItem('openai-key', newKey);
    openaiKey = newKey;
  }

  messages.push({
    role: 'user',
    content: prompt,
  });

  renderMessages();

  fieldset.disabled = true;

  const response = await openai(openaiKey).chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
    temperature: 1,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  });
  let code = '';
  const onNewChunck = createTimedUpdateIframe();

  for await (const message of response) {
    const isDone = message.choices[0].finish_reason === 'stop';
    const token = message.choices[0].delta.content;

    if (isDone) {
      form.reset();
      fieldset.disabled = false;
      messages = messages.filter((message) => message.role !== 'assistant');
      messages.push({
        role: 'assistant',
        content: code,
      });
      break;
    }

    code += token;

    onNewChunck(code);
  }

  if (!code) {
    alert('Erreur: Aucun code généré');
    return;
  }

  input.value = '';
});

const createTimedUpdateIframe = () => {
  let date = new Date();
  let timeout: null | ReturnType<typeof setTimeout> = null;

  return (code: string) => {
    // only call updateIframe if last call was more than 1s ago
    if (new Date().getTime() - date.getTime() > 1000) {
      updateIframe(code);
      date = new Date();
    }

    // clear timeout
    if (timeout) {
      clearTimeout(timeout);
    }

    // set new timeout
    timeout = setTimeout(() => {
      updateIframe(code);
    }, 1000);
  };
};

const updateIframe = (code: string) => {
  iframe.srcdoc = `<!DOCTYPE html>
  <html lang="en" class="h-full">
    <head>
      <meta charset="UTF-8" />
      <title>Generated Code</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      ${code}
    </body>
  </html>`;
};

const renderMessages = () => {
  const ul = document.querySelector('#messages') as HTMLUListElement;
  ul.innerHTML = '';

  for (const message of messages) {
    if (message.role !== 'user') {
      continue;
    }
    const li = document.createElement('li');
    li.innerText = `You ${message.content}`;
    ul.appendChild(li);
  }
};
