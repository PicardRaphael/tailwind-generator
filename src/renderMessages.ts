import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export const renderMessages = (
  messages: ChatCompletionMessageParam[],
  ul: HTMLUListElement
) => {
  ul.innerHTML = '';

  for (const message of messages) {
    if (message.role !== 'user') {
      continue;
    }
    const li = document.createElement('li');
    li.classList.add('text-gray-400');
    li.innerText = `You : ${message.content}`;
    ul.appendChild(li);
  }
};
