import { updateIframe } from './updateIframe';

export const createTimedUpdateIframe = () => {
  let date = new Date();
  let timeout: null | ReturnType<typeof setTimeout> = null;

  return (code: string, iframe: HTMLIFrameElement) => {
    // only call updateIframe if last call was more than 1s ago
    if (new Date().getTime() - date.getTime() > 1000) {
      updateIframe(code, iframe);
      date = new Date();
    }

    // clear timeout
    if (timeout) {
      clearTimeout(timeout);
    }

    // set new timeout
    timeout = setTimeout(() => {
      updateIframe(code, iframe);
    }, 1000);
  };
};
