import './style.css';
import { openai } from './openai';
import { promptSystem } from './promptSystem.ts';
const form = document.querySelector('#generate-form') as HTMLFormElement;
const iframe = document.querySelector('#generate-code') as HTMLIFrameElement;
const input = document.querySelector('#prompt') as HTMLInputElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const prompt = formData.get('prompt') as string;

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: promptSystem,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
    stream: true,
  });
  let code = '';
  const onNewChunck = createTimedUpdateIframe();
  console.log(response);
  for await (const message of response) {
    const isDone = message.choices[0].finish_reason === 'stop';
    if (isDone) {
      break;
    }
    const token = message.choices[0].delta.content;
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
    <body class="m-2">
      ${code}
    </body>
  </html>`;
};
