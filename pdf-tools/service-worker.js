 self.__precacheManifest = [
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/_app.js",
    "revision": "33410b8ad32d7ed98219"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/_error.js",
    "revision": "12fe337c1fbe134a1c1d"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/compare-pdf.js",
    "revision": "303620b6ae4d1969a8f1"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/extract-text.js",
    "revision": "5ec9cc197564afca5955"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/images-to-pdf.js",
    "revision": "28c061128e8a507e6c38"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/index.js",
    "revision": "d61eb2c04d0e178ba47b"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/merge-pdf.js",
    "revision": "701a1b246bcfd011f544"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/office-to-pdf.js",
    "revision": "60b15caaa5b3983abe24"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/protect-pdf.js",
    "revision": "256294f919f2b89bb796"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/remove-pdf-password.js",
    "revision": "18b9a7328f8a5b89fead"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/response.js",
    "revision": "e378d00080c6dd442524"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/split-pdf.js",
    "revision": "20b23d494932c0edf0c4"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/-3LORrjv1ZNLcxjr-GonD/pages/validate-pdfa.js",
    "revision": "e484d3987a597aff4c82"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/chunks/commons.54e0e119138033bae810.js",
    "revision": "b2d7a77cfe1cf0899f59"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/chunks/pdfjsWorker.d83f417bd68a31b4bf3d.js",
    "revision": "8a1db8b30b2584f3a5af"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/css/commons.bf3ce678.chunk.css",
    "revision": "b2d7a77cfe1cf0899f59"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/runtime/main-eee797f0d8892a627620.js",
    "revision": "8687224d512a455080b3"
  },
  {
    "url": "https://tools.pdfforge.org/_next/static/runtime/webpack-c992d92ff9d1f9b8c575.js",
    "revision": "9e48ebbabfcd7f08f99a"
  }
];

/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "https://tools.pdfforge.org/static/sw-push.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^https?(?:(?!.*api).*)/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"offlineCache", plugins: [new workbox.expiration.Plugin({ maxEntries: 2000, purgeOnQuotaError: false }), new workbox.backgroundSync.Plugin("toolsQueue", { maxRetentionTime: 10 }), new workbox.broadcastUpdate.Plugin({ channelName: 'toolsUpdateChanel', headersToCheck: [ 'X-Tools-Version', 'content-length', 'etag', 'last-modified' ] })] }), 'GET');
