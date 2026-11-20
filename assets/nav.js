(function () {
  var btn = document.querySelector("[data-nav-toggle]");
  var panel = document.querySelector("[data-nav-panel]");
  if (btn && panel) {
    var setOpen = function (open) {
      btn.setAttribute("aria-expanded", String(open));
      panel.classList.toggle("open", open);
    };
    btn.addEventListener("click", function () {
      setOpen(btn.getAttribute("aria-expanded") !== "true");
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // Venture status filter (progressive enhancement)
  var bar = document.querySelector("[data-filters]");
  if (bar) {
    bar.hidden = false;
    var groups = document.querySelectorAll(".group");
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-filter]");
      if (!b) return;
      var f = b.getAttribute("data-filter");
      bar.querySelectorAll("button").forEach(function (x) {
        x.setAttribute("aria-pressed", String(x === b));
      });
      groups.forEach(function (g) {
        g.hidden = !(f === "all" || g.classList.contains("group-" + f));
      });
    });
  }

  // Scroll reveal
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    var els = document.querySelectorAll(
      "main .head, .pillar, .principle, .card, .stage, .outcome, .story-step, .founder-card, .bizpanel, .decision, .funnel, .field, .pipeline li, .areas li, .div-card, .band, .closing-lines, .closing-punch, .opmodel, .lifecycle"
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }
})();
