/**
 * cfg.js — Site Config Loader
 * Fetches /api/config and injects values into any element with data-cfg="key.path"
 * Include this script in every page just before </body>
 */
(function () {
  fetch('https://sspl-production-production.up.railway.app/api/config')
    .then(r => r.json())
    .then(cfg => {
      // Helper: deep-get value by dot path e.g. "contact.phone"
      function get(obj, path) {
        return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
      }

      // Inject text / href content
      document.querySelectorAll('[data-cfg]').forEach(el => {
        const key = el.getAttribute('data-cfg');
        const val = get(cfg, key);
        if (val === null) return;

        const attr = el.getAttribute('data-cfg-attr'); // optional: set a specific attribute
        if (attr) {
          el.setAttribute(attr, val);
        } else {
          el.textContent = val;
        }
      });

      // Special: update mailto / wa links that carry data-cfg-href
      document.querySelectorAll('[data-cfg-href]').forEach(el => {
        const tpl = el.getAttribute('data-cfg-href'); // e.g. "mailto:{contact.email}"
        const resolved = tpl.replace(/\{([^}]+)\}/g, (_, k) => get(cfg, k) || '');
        el.href = resolved;
      });

      // Expose cfg globally so page scripts can use it
      window.__SSPL_CFG = cfg;
    })
    .catch(() => {
      // Silently fail — static content remains visible
    });
})();
