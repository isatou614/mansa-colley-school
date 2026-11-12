(function () {
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderItem(item) {
    return (
      '<div class="cal-item">' +
        '<div class="cal-date">' +
          '<div class="cal-day">' + escapeHtml(item.day) + "</div>" +
          '<div class="cal-month">' + escapeHtml(item.month) + "</div>" +
        "</div>" +
        "<div>" +
          '<div class="cal-title">' + escapeHtml(item.title) + "</div>" +
          '<div class="cal-range">' + escapeHtml(item.dateRange) + "</div>" +
          '<div class="cal-desc">' + escapeHtml(item.description) + "</div>" +
        "</div>" +
      "</div>"
    );
  }

  document.querySelectorAll("[data-calendar]").forEach(function (container) {
    fetch("data/calendar.json")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var items = data.items || [];
        container.innerHTML = items.map(renderItem).join("");
        var termLabel = container.closest("div").querySelector("[data-calendar-term]");
        if (termLabel && data.term) {
          termLabel.textContent = data.term;
        }
      })
      .catch(function (err) {
        console.error("Failed to load calendar:", err);
      });
  });
})();
