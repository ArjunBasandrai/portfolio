/* Field Notes - shared site behavior */
(function () {
  // ---- Theme ----
  const root = document.documentElement;
  const saved = localStorage.getItem("fn-theme");
  if (saved) root.setAttribute("data-theme", saved);
  else if (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches)
    root.setAttribute("data-theme", "dark");

  function toggleTheme() {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("fn-theme", next);
  }

  // ---- DOM ready ----
  document.addEventListener("DOMContentLoaded", () => {
    const tBtn = document.querySelector(".theme-toggle");
    if (tBtn) tBtn.addEventListener("click", toggleTheme);

    // mobile nav
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
      nav.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => nav.classList.remove("open"))
      );
    }

    // reveal on scroll
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.transitionDelay = (Math.min(i, 6) * 60) + "ms";
      io.observe(el);
    });

    // category filter (projects)
    const filterBar = document.querySelector("[data-filter-bar]");
    if (filterBar) {
      const items = [...document.querySelectorAll("[data-tags]")];
      const counter = document.querySelector("[data-filter-count]");
      const breaker = document.querySelector("[data-breaker]");
      filterBar.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-tag]");
        if (!btn) return;
        filterBar.querySelectorAll("[data-tag]").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const tag = btn.dataset.tag;
        let shown = 0;
        items.forEach((it) => {
          const ok = tag === "all" || it.dataset.tags.split(",").includes(tag);
          it.style.display = ok ? "" : "none";
          if (ok) shown++;
        });
        if (counter) counter.textContent = shown;
        if (breaker) breaker.style.display = tag === "all" ? "" : "none";
      });
    }

    // active TOC (project detail)
    const toc = document.querySelector("[data-toc]");
    if (toc) {
      const links = [...toc.querySelectorAll("a")];
      const heads = links.map((l) => document.getElementById(l.getAttribute("href").slice(1))).filter(Boolean);
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            links.forEach((l) => l.classList.remove("active"));
            const active = links.find((l) => l.getAttribute("href") === "#" + en.target.id);
            if (active) active.classList.add("active");
          }
        });
      }, { rootMargin: "-10% 0px -70% 0px" });
      heads.forEach((h) => spy.observe(h));
    }
    const bar = document.querySelector("[data-progress]");
    if (bar) {
      const onScroll = () => {
        const h = document.documentElement;
        const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
        bar.style.transform = "scaleX(" + Math.max(0, Math.min(1, p)) + ")";
      };
      document.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // contact form validation
    const form = document.querySelector("[data-contact]");
    if (form) wireForm(form);
  });

  function wireForm(form) {
    const fields = form.querySelectorAll("[data-field]");
    const status = form.querySelector("[data-status]");
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validate(field, silent) {
      const input = field.querySelector("input, textarea, select");
      const err = field.querySelector("[data-err]");
      let msg = "";
      const v = (input.value || "").trim();
      if (input.required && !v) msg = "This field is required.";
      else if (input.type === "email" && v && !emailRe.test(v)) msg = "Enter a valid email address.";
      else if (input.tagName === "TEXTAREA" && v && v.length < 12) msg = "A little more detail, please (12+ characters).";
      else if (input.tagName === "TEXTAREA" && v.length > 2000) msg = "Message is too long (2000 char max).";
      field.classList.toggle("invalid", !!msg);
      field.classList.toggle("valid", !msg && v.length > 0);
      if (err && !silent) err.textContent = msg;
      else if (err && msg === "") err.textContent = "";
      return !msg;
    }

    fields.forEach((f) => {
      const input = f.querySelector("input, textarea, select");
      input.addEventListener("blur", () => validate(f, false));
      input.addEventListener("input", () => { if (f.classList.contains("invalid")) validate(f, false); });
      // live char count
      if (input.tagName === "TEXTAREA") {
        const count = f.querySelector("[data-count]");
        if (count) input.addEventListener("input", () => (count.textContent = input.value.length + " / 2000"));
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let ok = true;
      fields.forEach((f) => { if (!validate(f, false)) ok = false; });
      if (!ok) {
        status.className = "form-status err";
        status.textContent = "Please fix the highlighted fields.";
        return;
      }

      const turnstileToken =
        (window.turnstile && window.turnstile.getResponse()) || "";
      if (!turnstileToken) {
        status.className = "form-status err";
        status.textContent = "Please complete the verification below.";
        return;
      }

      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending\u2026";

      const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        reason: form.reason ? form.reason.value : "",
        subject: form.subject ? form.subject.value.trim() : "",
        message: form.message.value.trim(),
        company: form.company ? form.company.value.trim() : "",
        turnstileToken,
      };

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.ok) {
          form.reset();
          fields.forEach((f) => f.classList.remove("valid", "invalid"));
          status.className = "form-status ok";
          status.innerHTML = "Thanks, your message is on its way. I usually reply within a couple of days.";
          const cnt = form.querySelector("[data-count]"); if (cnt) cnt.textContent = "0 / 2000";
        } else {
          status.className = "form-status err";
          status.textContent = data.error || "Something went wrong. Please try again.";
        }
      } catch {
        status.className = "form-status err";
        status.textContent = "Network error. Please try again.";
      } finally {
        if (window.turnstile) window.turnstile.reset();
        btn.disabled = false; btn.textContent = btn.dataset.label;
      }
    });
  }
})();
