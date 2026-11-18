(() => {
  const scripts = ['./model.js?v=106-preview-1', './core.js?v=106-preview-1', './screens.js?v=106-preview-1', './features.js?v=106-preview-1', './admin.js?v=106-preview-1', './dialogs.js?v=106-preview-1', './runtime.js?v=106-preview-1'];
  scripts.reduce(
    (chain, src) => chain.then(() => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Nepodařilo se načíst ${src}`));
      document.head.appendChild(script);
    })),
    Promise.resolve(),
  ).catch((error) => {
    const app = document.querySelector('#app');
    if (app) app.textContent = `UI preview se nepodařilo načíst: ${error.message}`;
  });
})();
