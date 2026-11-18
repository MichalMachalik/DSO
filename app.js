const previewScript = document.currentScript;
if (previewScript.hasAttribute('data-mobile-entry') && window.matchMedia('(max-width: 520px)').matches) {
  window.location.replace(new URL('./app/?v=106-preview-1', previewScript.src));
} else if ('serviceWorker' in navigator) {
  const workerURL = new URL('./sw.js', previewScript.src);
  const previouslyControlled = Boolean(navigator.serviceWorker.controller);
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (previouslyControlled && !reloading) { reloading = true; window.location.reload(); }
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(workerURL, { updateViaCache: 'none' })
      .then(registration => registration.update()).catch(() => {});
  });
}
