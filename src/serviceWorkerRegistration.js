/*
 * Registers the custom service worker located at public/service-worker.js.
 *
 * The worker is only registered in production builds so that local development
 * (with hot reloading) is never served stale, cached assets.
 */

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 is considered localhost for IPv4.
    /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/.test(
      window.location.hostname
    )
);

export function register() {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) {
    return;
  }

  // The service worker won't work if the base URL is on a different origin.
  const publicUrl = new URL(import.meta.env.BASE_URL, window.location.href);
  if (publicUrl.origin !== window.location.origin) {
    return;
  }

  window.addEventListener("load", () => {
    // BASE_URL always ends with a trailing slash (defaults to "/").
    const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;

    if (isLocalhost) {
      checkValidServiceWorker(swUrl);
    } else {
      registerValidSW(swUrl);
    }
  });
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (
            installingWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            // New content is available; it will be used on the next page load.
            // eslint-disable-next-line no-console
            console.log("New content is available; please refresh.");
          }
        };
      };
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Service worker registration failed:", error);
    });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl, { headers: { "Service-Worker": "script" } })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // No valid service worker found; reload to clear any stale worker.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => window.location.reload());
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log("No internet connection found. App is running offline.");
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => registration.unregister())
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error.message);
      });
  }
}
