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

  /* ---------------- Visitor attribution and analytics ---------------- */
  var ATTRIBUTION = (function () {
    var STORAGE_KEY = "ace_attribution_v1";
    var SESSION_KEY = "ace_session_v1";
    function uuid() {
      if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        return (c === "x" ? r : (r & 3 | 8)).toString(16);
      });
    }
    function read(key) {
      try { return JSON.parse(localStorage.getItem(key) || "null"); } catch (_) { return null; }
    }
    var stored = read(STORAGE_KEY) || {};
    if (!stored.visitor_id) stored.visitor_id = uuid();
    if (!stored.created_at) stored.created_at = new Date().toISOString();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stored)); } catch (_) {}
    var session = read(SESSION_KEY) || {};
    if (!session.session_id || !session.started_at || Date.now() - Date.parse(session.last_seen_at || session.started_at) > 30 * 60 * 1000) {
      session = { session_id: uuid(), started_at: new Date().toISOString() };
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (_) {}
    }
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (_) {}
    var params = new URLSearchParams(location.search);
    var referrer = document.referrer || "";
    var clickIds = {};
    ["gclid","gbraid","wbraid","msclkid","fbclid"].forEach(function (key) {
      var value = params.get(key);
      if (value) clickIds[key] = value.slice(0, 250);
    });
    var first = stored.first_touch || {
      landing_page: location.pathname,
      referrer: referrer.slice(0, 1000),
      referrer_domain: (function(){ try{return referrer ? new URL(referrer).hostname : "";}catch(_){return "";} })(),
      utm_source: (params.get("utm_source") || "").slice(0, 200),
      utm_medium: (params.get("utm_medium") || "").slice(0, 200),
      utm_campaign: (params.get("utm_campaign") || "").slice(0, 200),
      utm_term: (params.get("utm_term") || "").slice(0, 200),
      utm_content: (params.get("utm_content") || "").slice(0, 200),
      click_ids: clickIds
    };
    stored.first_touch = first;
    stored.last_touch = {
      landing_page: location.pathname,
      referrer: referrer.slice(0, 1000),
      utm_source: (params.get("utm_source") || "").slice(0, 200),
      utm_medium: (params.get("utm_medium") || "").slice(0, 200),
      utm_campaign: (params.get("utm_campaign") || "").slice(0, 200),
      utm_term: (params.get("utm_term") || "").slice(0, 200),
      utm_content: (params.get("utm_content") || "").slice(0, 200),
      click_ids: clickIds
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stored)); } catch (_) {}
    function device() {
      var ua = navigator.userAgent || "";
      var mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
      var tablet = /iPad|Tablet/i.test(ua);
      var browser = /Edg\//.test(ua) ? "Edge" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "Other";
      var os = /Windows/.test(ua) ? "Windows" : /Android/.test(ua) ? "Android" : /iPhone|iPad|iPod/.test(ua) ? "iOS" : /Mac OS/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : "Other";
      return { device_type: tablet ? "tablet" : mobile ? "mobile" : "desktop", browser_name: browser, operating_system: os, screen_width: screen.width || 0, screen_height: screen.height || 0, language: (navigator.language || "").slice(0,35), timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone || "").slice(0,80) };
    }
    function payload(extra) {
      session.last_seen_at = new Date().toISOString();
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (_) {}
      return Object.assign({
        visitor_id: stored.visitor_id,
        session_id: session.session_id,
        visitor_created_at: stored.created_at,
        session_started_at: session.started_at,
        page_url: location.href.slice(0, 2000),
        page_path: location.pathname.slice(0, 500),
        page_title: document.title.slice(0, 300),
        referrer: referrer.slice(0, 1000),
        first_touch: first,
        last_touch: stored.last_touch,
        device: device()
      }, extra || {});
    }
    function ga(name, params) {
      if (typeof window.gtag === "function") {
        var safeParams = Object.assign({
          page_location: location.origin + location.pathname,
          page_title: document.title
        }, params || {});
        // Never send URL query strings to GA4; campaigns are captured separately.
        safeParams.page_location = location.origin + location.pathname;
        window.gtag("event", name, safeParams);
      }
    }
    function startLead(source, formType) {
      var id = uuid();
      try { sessionStorage.setItem("ace_pending_lead_id", id); sessionStorage.setItem("ace_pending_lead_created_at", String(Date.now())); } catch (_) {}
      var data = payload({ lead_id:id, source:source || "website", form_type:formType || "quote" });
      fetch("/api/lead-start", { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify(data), keepalive:true }).catch(function(){});
      return id;
    }
    function event(name, extra) {
      var data = payload({ event_name: name, event_data: extra || {} });
      fetch("/api/track", { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify(data), keepalive:true }).catch(function(){});
      ga(name, extra || {});
    }
    return { payload:payload, event:event, startLead:startLead, ga:ga, visitorId:stored.visitor_id, sessionId:session.session_id };
  })();

  /* ---------------- Page and interaction events ---------------- */
  ATTRIBUTION.event("page_view");
  document.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest("a") : null;
    if (!link) return;
    var href = link.getAttribute("href") || "";
    if (/^tel:/i.test(href)) {
      ATTRIBUTION.event("call_click", { button_location: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content", link_text: (link.textContent || "").trim().slice(0,100), phone_number:href.slice(4,50) });
    } else if (/get-a-quote|#quote-form/i.test(href)) {
      ATTRIBUTION.event("quote_click", { button_location: link.closest("header") ? "header" : link.closest(".hero") ? "hero" : link.closest(".cta-band") ? "cta_band" : "content", link_text: (link.textContent || "").trim().slice(0,100) });
      ATTRIBUTION.startLead("quote-cta", "quote");
    }
  }, true);
  var scrollMilestones = {};
  window.addEventListener("scroll", function () {
    var doc = document.documentElement;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    var pct = Math.min(100, Math.round((window.scrollY / max) * 100));
    [25,50,75,90].forEach(function(n){
      if (pct >= n && !scrollMilestones[n]) { scrollMilestones[n]=true; ATTRIBUTION.event("scroll_depth",{scroll_percentage:n}); }
    });
  }, {passive:true});

  /* ---------------- Quote / contact forms ---------------- */
  $$('form[action="/api/quote"]').forEach(function (form) {
    var status = form.querySelector(".form-status") || $("#quote-status");
    var submit = form.querySelector('button[type="submit"]');
    var leadId = "";
    try {
      var pendingAt = Number(sessionStorage.getItem("ace_pending_lead_created_at") || 0);
      if (pendingAt && Date.now() - pendingAt < 30 * 60 * 1000) leadId = sessionStorage.getItem("ace_pending_lead_id") || "";
      else { sessionStorage.removeItem("ace_pending_lead_id"); sessionStorage.removeItem("ace_pending_lead_created_at"); }
    } catch (_) {}
    var leadPromise = null;
    var started = false;
    function show(kind, html) {
      if (!status) return;
      status.className = "form-status is-visible form-status--" + kind;
      status.innerHTML = html;
    }
    function createLead() {
      if (leadPromise) return leadPromise;
      if (!leadId) leadId = ATTRIBUTION.startLead((form.querySelector('[name="source"]')||{}).value || "website", form.id === "contact-form" ? "contact" : "quote");
      leadPromise = fetch("/api/lead-start", {
        method:"POST", headers:{"content-type":"application/json"},
        body:JSON.stringify(ATTRIBUTION.payload({lead_id:leadId,form_type:form.id === "contact-form" ? "contact" : "quote", source:(form.querySelector('[name="source"]')||{}).value || "website"}))
      }).then(function(r){return r.json().then(function(b){return {ok:r.ok,body:b};});})
        .then(function(r){ if(r.ok && r.body && r.body.ok) { leadId=r.body.lead_id; var hidden=form.querySelector('[name="lead_id"]'); if(!hidden){hidden=document.createElement("input");hidden.type="hidden";hidden.name="lead_id";form.appendChild(hidden);} hidden.value=leadId; } return leadId; })
        .catch(function(){ return ""; });
      return leadPromise;
    }
    form.addEventListener("focusin", function(){ if(!started){started=true;ATTRIBUTION.event("form_start",{form_type:form.id});createLead();} });
    var quoteTarget = form.id === "quote-form" ? $("#quote-form") : form;
    if (form.id === "quote-form" && quoteTarget) {
      var observer = new IntersectionObserver(function(entries){ entries.forEach(function(entry){ if(entry.isIntersecting && !started){started=true;ATTRIBUTION.event("quote_form_view");} }); }, {threshold:0.25});
      observer.observe(quoteTarget);
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var consent = form.querySelector('input[name="consent"]');
      if (consent && !consent.checked) { show("error","Please confirm you agree to be contacted about this enquiry."); consent.focus(); return; }
      if (submit) { submit.disabled=true; submit.dataset.label=submit.textContent; submit.textContent="Sending…"; }
      show("info","Sending your enquiry…");
      var data = new FormData(form);
      createLead().then(function(){
        if (leadId) data.set("lead_id",leadId);
        var context = ATTRIBUTION.payload();
        data.set("tracking_context", JSON.stringify(context));
        return fetch(form.getAttribute("action"),{method:"POST",body:data,headers:{"Accept":"application/json"}});
      }).then(function(res){return res.json().catch(function(){return {};}).then(function(body){return {ok:res.ok,body:body};});})
      .then(function(result){
        if(result.ok && result.body.ok){
          ATTRIBUTION.event("generate_lead",{form_type:form.id,lead_status:"submitted"});
          form.reset(); leadId=""; leadPromise=null; started=false;
          try { sessionStorage.removeItem("ace_pending_lead_id"); sessionStorage.removeItem("ace_pending_lead_created_at"); } catch (_) {}
          show("success",result.body.message || "Thanks — your enquiry has been received. We will be in touch shortly.");
        } else {
          ATTRIBUTION.event("form_error",{form_type:form.id});
          show("error",result.body && result.body.message ? result.body.message : "We could not send the form. Please call (07) 8590 6941 or email AceBathroomRenovationsBrisbane@gmail.com.");
        }
      }).catch(function(){
        show("error",'The form could not be sent from this device. Please call <a href="tel:+61785906941">(07) 8590 6941</a> or email <a href="mailto:AceBathroomRenovationsBrisbane@gmail.com">AceBathroomRenovationsBrisbane@gmail.com</a>.');
      }).finally(function(){ if(submit){submit.disabled=false;submit.textContent=submit.dataset.label || "Send enquiry";} });
    });
    window.addEventListener("beforeunload",function(){ if(started && !leadId) ATTRIBUTION.event("form_abandon",{form_type:form.id}); });
  });

  /* ---------------- FAQ interactions ---------------- */
  $$("details.faq-item").forEach(function(item){ item.addEventListener("toggle",function(){if(item.open)ATTRIBUTION.event("faq_open",{question:(item.querySelector("summary")||{}).textContent||""});}); });

})();
