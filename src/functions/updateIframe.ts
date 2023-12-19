export const updateIframe = (code: string, iframe: HTMLIFrameElement) => {
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
