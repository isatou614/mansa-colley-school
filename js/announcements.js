(function () {
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderItem(item) {
    return (
      '<div class="ann-item ' + escapeHtml(item.type || "info") + '">' +
        '<div style="display:flex;align-items:start;justify-content:space-between;gap:1rem;flex-wrap:wrap">' +
          '<div class="ann-title">' + escapeHtml(item.title) + "</div>" +
          '<div class="ann-meta"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-calendar"></use></svg> ' +
            escapeHtml(item.date) + " · " + escapeHtml(item.author) +
          "</div>" +
        "</div>" +
        '<div class="ann-body">' + escapeHtml(item.body) + "</div>" +
      "</div>"
    );
  }

  document.querySelectorAll("[data-announcements]").forEach(function (container) {
    var limit = parseInt(container.getAttribute("data-limit"), 10);
    var filterType = container.getAttribute("data-filter");

    fetch("data/announcements.json")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var items = data.items || [];
        if (filterType) {
          items = items.filter(function (item) { return item.type === filterType; });
        }
        if (!isNaN(limit)) {
          items = items.slice(0, limit);
        }
        container.innerHTML = items.map(renderItem).join("");
      })
      .catch(function (err) {
        console.error("Failed to load announcements:", err);
      });
  });
})();
