/* Ace Bathroom Renovations Brisbane — progressive enhancement only. */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------------- Mobile navigation ---------------- */
  var nav = $("#mobile-nav");
  var toggle = $("#nav-toggle");
  var closeBtn = $("#nav-close");

  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    nav.setAttribute("aria-hidden", open ? "false" : "true");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
    if (open && closeBtn) closeBtn.focus();
  }

  if (toggle) toggle.addEventListener("click", function () {
    setNav(!nav.classList.contains("is-open"));
  });

  if (closeBtn) closeBtn.addEventListener("click", function () {
    setNav(false);
  });

  if (nav) nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setNav(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav && nav.classList.contains("is-open")) {
      setNav(false);
      if (toggle) toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1040 && nav && nav.classList.contains("is-open")) {
      setNav(false);
    }
  });

  /* ---------------- Sticky header ---------------- */
  var header = $("#site-header");

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.pageYOffset > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Smooth in-page links ---------------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id === "#") return;

      var target = $(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (history.replaceState) history.replaceState(null, "", id);
    });
  });

  /* ---------------- Cost calculator ---------------- */
  var calc = $("#cost-calculator");

  if (calc) {
    var projectBase = {
      full: [22000, 42000],
      small: [15000, 28000],
      ensuite: [18000, 34000],
      laundry: [9000, 20000],
      kitchen: [24000, 55000],
      waterproofing: [3500, 9000],
      tiling: [5000, 16000],
      accessible: [16000, 32000]
    };

    var labels = {
      project: {
        full: "Full bathroom renovation",
        small: "Small or compact bathroom",
        ensuite: "Ensuite renovation",
        laundry: "Laundry renovation",
        kitchen: "Kitchen renovation",
        waterproofing: "Waterproofing only",
        tiling: "Tiling only",
        accessible: "Accessible bathroom modifications"
      },
      size: {
        compact: "compact size",
        standard: "standard size",
        large: "large size"
      },
      finish: {
        essential: "essential finish",
        mid: "mid-range finish",
        premium: "premium finish"
      },
      layout: {
        keep: "existing layout",
        change: "changed layout"
      },
      access: {
        standard: "standard access",
        apartment: "apartment access",
        difficult: "difficult access"
      },
      scope: {
        none: "",
        asbestos: "possible asbestos removal",
        structural: "structural or substrate repair",
        heating: "underfloor heating",
        joinery: "custom joinery"
      }
    };

    var sizeMul = {
      compact: 0.85,
      standard: 1,
      large: 1.27
    };

    var finishMul = {
      essential: 0.88,
      mid: 1,
      premium: 1.24
    };

    var layoutMul = {
      keep: 1,
      change: 1.16
    };

    var accessMul = {
      standard: 1,
      apartment: 1.09,
      difficult: 1.13
    };

    var scopeAdd = {
      none: [0, 0],
      asbestos: [2500, 7000],
      structural: [4000, 14000],
      heating: [2500, 5500],
      joinery: [3000, 9000]
    };

    function val(id) {
      var el = document.getElementById(id);
      return el ? el.value : "";
    }

    function moneyFmt(n) {
      var rounded = Math.round(n / 500) * 500;
      return "$" + rounded.toLocaleString("en-AU");
    }

    function updateCalc() {
      var project = val("calc-project") || "full";
      var size = val("calc-size") || "standard";
      var finish = val("calc-finish") || "mid";
      var layout = val("calc-layout") || "keep";
      var access = val("calc-access") || "standard";
      var scope = val("calc-scope") || "none";

      var base = projectBase[project] || projectBase.full;

      var mul =
        (sizeMul[size] || 1) *
        (finishMul[finish] || 1) *
        (layoutMul[layout] || 1) *
        (accessMul[access] || 1);

      var add = scopeAdd[scope] || [0, 0];

      var low = base[0] * mul + add[0];
      var high = base[1] * mul + add[1];

      var amount = $("#calc-amount");
      var detail = $("#calc-detail");

      if (amount) {
        amount.textContent = moneyFmt(low) + " – " + moneyFmt(high);
      }

      if (detail) {
        var parts = [
          labels.project[project],
          labels.size[size],
          labels.finish[finish],
          labels.layout[layout],
          labels.access[access]
        ];

        if (labels.scope[scope]) {
          parts.push(labels.scope[scope]);
        }

        detail.textContent =
          parts.join(", ") +
          ". Planning guide only — confirm with a site measure.";
      }
    }

    calc.addEventListener("change", updateCalc);

    calc.addEventListener("submit", function (e) {
      e.preventDefault();
      updateCalc();

      var result = $("#calc-result");

      if (result) {
        result.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    calc.addEventListener("reset", function () {
      window.setTimeout(updateCalc, 0);
    });

    updateCalc();
  }

  /* ---------------- Gallery filter ---------------- */
  var gallery = $("#gallery-grid");

  if (gallery) {
    var buttons = $$(".filter-btn[data-filter]");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");

        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });

        $$("[data-category]", gallery).forEach(function (item) {
          var show = filter === "all" ||
            item.getAttribute("data-category") === filter;

          item.hidden = !show;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------------- Remove any injected preview/archive banners ---------------- */
  try {
    var killBanners = function() {
      try {
        var nodes = document.querySelectorAll('body *');
        for (var i = 0; i < nodes.length; i++) {
          var b = nodes[i];
          if (!b || !b.textContent) continue;
          var txt = b.textContent;
          if (/You are viewing an archived copy|archived copy of this site|preview deployment|open the live site to send|pages\.dev/i.test(txt)) {
            // Remove if it's a fixed/sticky bar or top-level banner
            try {
              var style = window.getComputedStyle ? window.getComputedStyle(b) : null;
              if (style && (style.position === 'fixed' || style.position === 'sticky')) {
                if (b.parentNode) { b.parentNode.removeChild(b); continue; }
              }
            } catch(e) {}
            if (b.parentNode === document.body) {
              var rect = b.getBoundingClientRect ? b.getBoundingClientRect() : null;
              if (rect && rect.top < 200) {
                if (b.parentNode) { b.parentNode.removeChild(b); continue; }
              }
            }
            if (b.offsetHeight && b.offsetHeight < 200 && /archived|live site|preview/i.test(txt)) {
              if (b.parentNode) { b.parentNode.removeChild(b); continue; }
            }
          }
        }
        // Also check body children
        var bodyKids = document.body ? document.body.children : [];
        for (var j = 0; j < bodyKids.length; j++) {
          var k = bodyKids[j];
          if (k && k.textContent && /archived copy|You are viewing an archived|open the live site/i.test(k.textContent)) {
            if (k.offsetHeight < 250) { k.parentNode && k.parentNode.removeChild(k); }
          }
        }
      } catch(e) {}
    };
    killBanners();
    setTimeout(killBanners, 50);
    setTimeout(killBanners, 150);
    setTimeout(killBanners, 500);
    setTimeout(killBanners, 1000);
    setTimeout(killBanners, 2000);
    if (typeof MutationObserver !== 'undefined') {
      try {
        var mo = new MutationObserver(function(){ killBanners(); });
        mo.observe(document.documentElement, {childList:true, subtree:true, attributes:true});
      } catch(e) {}
    }
  } catch (e) {}

  /* ---------------- Quote / contact forms ---------------- */
  $$('form[action="/api/quote"]').forEach(function (form) {
    var status = $("#quote-status");
    var submit = form.querySelector('button[type="submit"]');

    function show(kind, html) {
      if (!status) return;

      status.className = "form-status is-visible form-status--" + kind;
      status.innerHTML = html;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var consent = form.querySelector('input[name="consent"]');

      if (consent && !consent.checked) {
        show("error", "Please confirm you agree to be contacted about this enquiry.");
        consent.focus();
        return;
      }

      if (submit) {
        submit.disabled = true;
        submit.dataset.label = submit.textContent;
        submit.textContent = "Sending…";
      }

      show("info", "Sending your enquiry…");

      var data = new FormData(form);

      fetch(form.getAttribute("action"), {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      })
        .then(function (res) {
          return res.json().catch(function () {
            return {};
          }).then(function (body) {
            return {
              ok: res.ok,
              body: body
            };
          });
        })
        .then(function (result) {
          if (result.ok && result.body.ok) {
            form.reset();

            show(
              "success",
              result.body.message ||
              "Thanks — your enquiry has been received. We will be in touch shortly."
            );
          } else {
            show(
              "error",
              (result.body && result.body.message) ?
                result.body.message :
                "We could not send the form. Please call (07) 8590 6941 or email AceBathroomRenovationsBrisbane@gmail.com."
            );
          }
        })
        .catch(function () {
          show(
            "error",
            'The form could not be sent from this device. Please call ' +
            '<a href="tel:+61785906941">(07) 8590 6941</a> or email ' +
            '<a href="mailto:AceBathroomRenovationsBrisbane@gmail.com">AceBathroomRenovationsBrisbane@gmail.com</a>.'
          );
        })
        .finally(function () {
          if (submit) {
            submit.disabled = false;
            submit.textContent = submit.dataset.label || "Send enquiry";
          }
        });
    });
  });

})();
