/* ============================================================
   KHERAD interactions — sliders, counters, carousels,
   accordion, tabs, gallery, forms, renderers.
   ============================================================ */
(function () {
  "use strict";
  var D = window.KHERAD || {};
  var FA = "۰۱۲۳۴۵۶۷۸۹";
  function toFa(s) { return String(s).replace(/[0-9]/g, function (d) { return FA[+d]; }); }
  function faNum(n) { try { return Number(n).toLocaleString("fa-IR"); } catch (e) { return toFa(n); } }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Sticky header state ---------- */
  var header = $("#site-header");
  function onScrollHeader() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Render: stats ---------- */
  $all('[data-render="stats"]').forEach(function (box) {
    box.innerHTML = (D.stats || []).map(function (s) {
      return '<div class="stat"><div class="stat__num"><span data-count="' + s.value + '">۰</span><b>' + s.suffix + '</b></div><div class="stat__label">' + s.label + '</div></div>';
    }).join("");
  });

  /* ---------- Render: programs ---------- */
  $all('[data-render="programs"]').forEach(function (box) {
    var limit = parseInt(box.dataset.limit || "99", 10);
    box.innerHTML = (D.programs || []).slice(0, limit).map(function (p) {
      return '<article class="card program reveal" id="' + p.id + '">' +
        '<div class="program__icon" style="font-size:1.7rem">' + p.icon + '</div>' +
        '<h3>' + p.title + '</h3><p>' + p.text + '</p>' +
        '<div class="program__list">' + p.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("") + '</div>' +
        '<a class="card__link" href="admissions.html">ثبت‌نام و مشاوره <span class="arrow">←</span></a></article>';
    }).join("");
  });

  /* ---------- Render: posts ---------- */
  function postCard(p) {
    return '<article class="card reveal">' +
      '<a class="card__media" href="article.html?id=' + p.id + '"><img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
      '<span class="card__tag">' + p.category + '</span>' +
      '<span class="card__date">' + p.date + '</span></a>' +
      '<div class="card__body"><h3 class="card__title"><a href="article.html?id=' + p.id + '">' + p.title + '</a></h3>' +
      '<p class="card__text">' + p.excerpt + '</p>' +
      '<div class="card__meta"><span>◷ ' + p.readTime + '</span><span>✎ روابط عمومی خرد</span></div>' +
      '<a class="card__link" href="article.html?id=' + p.id + '">ادامه مطلب <span class="arrow">←</span></a></div></article>';
  }
  $all('[data-render="posts"]').forEach(function (box) {
    var limit = parseInt(box.dataset.limit || "99", 10);
    box.innerHTML = (D.posts || []).slice(0, limit).map(postCard).join("");
  });
  $all('[data-render="related"]').forEach(function (box) {
    var cur = parseInt(box.dataset.current || "0", 10);
    var rel = (D.posts || []).filter(function (p) { return p.id !== cur; }).slice(0, 3);
    box.innerHTML = rel.map(postCard).join("");
  });
  $all('[data-render="widget-posts"]').forEach(function (box) {
    box.innerHTML = (D.posts || []).slice(0, 4).map(function (p) {
      return '<a class="widget__post" href="article.html?id=' + p.id + '"><img src="' + p.image + '" alt="" loading="lazy"><span><strong>' + p.title + '</strong><span>' + p.date + '</span></span></a>';
    }).join("");
  });
  $all('[data-render="featured"]').forEach(function (box) {
    var p = (D.posts || [])[0];
    if (!p) return;
    box.innerHTML =
      '<article class="card" style="display:grid;grid-template-columns:1.1fr 1fr">' +
      '<a class="card__media" style="height:100%;min-height:300px" href="article.html?id=' + p.id + '"><img src="' + p.image + '" alt="' + p.title + '"><span class="card__tag">خبر ویژه</span></a>' +
      '<div class="card__body" style="justify-content:center;padding:36px"><span class="kicker">' + p.category + ' · ' + p.date + '</span>' +
      '<h3 class="card__title" style="font-size:1.4rem"><a href="article.html?id=' + p.id + '">' + p.title + '</a></h3>' +
      '<p class="card__text">' + p.excerpt + '</p>' +
      '<a class="card__link" href="article.html?id=' + p.id + '">خواندن خبر <span class="arrow">←</span></a></div></article>';
  });

  /* ---------- Render: events ---------- */
  $all('[data-render="events"]').forEach(function (box) {
    var limit = parseInt(box.dataset.limit || "99", 10);
    box.innerHTML = (D.events || []).slice(0, limit).map(function (e) {
      return '<div class="event reveal"><div class="event__date"><b>' + e.day + '</b><span>' + e.month + '</span></div>' +
        '<div><h3>' + e.title + '</h3><p>' + e.desc + '</p><div class="event__meta"><span>◈ ' + e.place + '</span></div></div>' +
        '<a class="btn btn--outline btn--sm" href="contact.html">رزرو حضور</a></div>';
    }).join("");
  });

  /* ---------- Render: testimonials ---------- */
  $all('[data-render="testimonials"]').forEach(function (box) {
    box.innerHTML = (D.testimonials || []).map(function (t, i) {
      return '<div class="testi__slide' + (i === 0 ? " is-active" : "") + '">' +
        '<div class="testi__stars">★★★★★</div><p class="testi__text">«' + t.text + '»</p>' +
        '<div class="testi__who"><span class="testi__avatar">' + t.initial + '</span><span style="text-align:right"><strong>' + t.name + '</strong><span>' + t.role + '</span></span></div></div>';
    }).join("");
  });
  $all('[data-render="testi-dots"]').forEach(function (box) {
    box.innerHTML = (D.testimonials || []).map(function (_, i) {
      return '<button class="testi__dot' + (i === 0 ? " is-active" : "") + '" data-tdot="' + i + '" aria-label="نظر ' + toFa(i + 1) + '"></button>';
    }).join("");
  });

  /* ---------- Render: FAQs ---------- */
  $all('[data-render="faqs"]').forEach(function (box) {
    var limit = parseInt(box.dataset.limit || "99", 10);
    box.innerHTML = (D.faqs || []).slice(0, limit).map(function (f, i) {
      return '<div class="faq__item' + (i === 0 && box.hasAttribute("data-open-first") ? " is-open" : "") + '">' +
        '<button class="faq__q" aria-expanded="' + (i === 0 && box.hasAttribute("data-open-first") ? "true" : "false") + '">' + f.q + '<span class="faq__icon">+</span></button>' +
        '<div class="faq__a"><p>' + f.a + '</p></div></div>';
    }).join("");
  });

  /* ---------- Render: gallery ---------- */
  $all('[data-render="gallery"]').forEach(function (box) {
    var limit = parseInt(box.dataset.limit || "99", 10);
    box.innerHTML = (D.gallery || []).slice(0, limit).map(function (g, i) {
      return '<button class="gallery__item reveal" data-lightbox="' + i + '" aria-label="مشاهده ' + g.cap + '"><img src="' + g.src + '" alt="' + g.cap + '" loading="lazy"><span class="gallery__cap">' + g.cap + '</span></button>';
    }).join("");
  });

  /* ---------- Article page ---------- */
  var articleBox = $("[data-article]");
  if (articleBox) {
    var id = 1;
    try { id = parseInt(new URLSearchParams(location.search).get("id") || "1", 10); } catch (e) {}
    var post = (D.posts || []).find(function (p) { return p.id === id; }) || D.posts[0];
    if (post) {
      document.title = post.title + " | منظومه خرد";
      var rel = $("[data-render=\"related\"]");
      if (rel) { rel.dataset.current = post.id; rel.innerHTML = (D.posts || []).filter(function (p) { return p.id !== post.id; }).slice(0, 3).map(postCard).join(""); bindReveal(rel); }
      articleBox.innerHTML =
        '<div class="article__cover"><img src="' + post.image + '" alt="' + post.title + '"></div>' +
        '<div class="article__body"><div class="article__meta"><span class="card__tag" style="position:static">' + post.category + '</span><span>◷ ' + post.date + '</span><span>◷ ' + post.readTime + '</span><span>✎ روابط عمومی خرد</span></div>' +
        '<h1>' + post.title + '</h1>' +
        post.body.map(function (par, i) {
          if (i === 1) return '<h2>جزئیات بیشتر</h2><p>' + par + '</p>';
          return '<p>' + par + '</p>';
        }).join("") +
        '<div class="article__quote">«' + post.quote + '»</div>' +
        '<div class="article__tags">' + post.tags.map(function (t) { return "<span>#" + t + "</span>"; }).join("") + '</div></div>';
      var crumb = $("#crumbTitle");
      if (crumb) crumb.textContent = post.title.length > 42 ? post.title.slice(0, 42) + "…" : post.title;
    }
  }

  /* ---------- Reveal on scroll ---------- */
  var revealIO = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); revealIO.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  function bindReveal(ctx) { $all(".reveal:not(.is-visible)", ctx || document).forEach(function (el) { if (revealIO) revealIO.observe(el); else el.classList.add("is-visible"); }); }
  bindReveal(document);

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.dataset.count, 10) || 0;
    var dur = 1700, t0 = null;
    function frame(t) {
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - k, 3);
      el.textContent = faNum(Math.round(target * eased));
      if (k < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var countIO = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { animateCount(en.target); countIO.unobserve(en.target); } });
  }, { threshold: 0.5 }) : null;
  $all("[data-count]").forEach(function (el) { if (countIO) countIO.observe(el); else el.textContent = faNum(el.dataset.count); });

  /* ---------- Hero slider ---------- */
  $all("[data-hero]").forEach(function (hero) {
    var slides = $all(".hero__slide", hero);
    var dots = $all(".hero__dot", hero);
    var idx = 0, timer = null;
    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === idx); });
    }
    function auto() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 6500); }
    $all("[data-hero-next]", hero).forEach(function (b) { b.addEventListener("click", function () { go(idx + 1); auto(); }); });
    $all("[data-hero-prev]", hero).forEach(function (b) { b.addEventListener("click", function () { go(idx - 1); auto(); }); });
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); auto(); }); });
    hero.addEventListener("mouseenter", function () { clearInterval(timer); });
    hero.addEventListener("mouseleave", auto);
    var tx0 = null;
    hero.addEventListener("touchstart", function (e) { tx0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      if (tx0 === null) return;
      var dx = e.changedTouches[0].clientX - tx0;
      if (Math.abs(dx) > 45) { go(dx < 0 ? idx + 1 : idx - 1); auto(); }
      tx0 = null;
    }, { passive: true });
    auto();
  });

  /* ---------- Generic RTL-aware carousel buttons ---------- */
  $all("[data-carousel]").forEach(function (car) {
    var track = $(".carousel__track", car);
    if (!track) return;
    function stepPx() { var c = track.querySelector(".card, .event, article"); return c ? c.getBoundingClientRect().width + 24 : car.clientWidth * 0.7; }
    $all("[data-car-next]", car).forEach(function (b) { b.addEventListener("click", function () { track.scrollBy({ left: -stepPx(), behavior: "smooth" }); }); });
    $all("[data-car-prev]", car).forEach(function (b) { b.addEventListener("click", function () { track.scrollBy({ left: stepPx(), behavior: "smooth" }); }); });
  });

  /* ---------- Testimonials slider ---------- */
  $all("[data-testi]").forEach(function (wrap) {
    var slides = $all(".testi__slide", wrap);
    if (!slides.length) return;
    var dots = $all("[data-tdot]");
    var idx = 0, timer = null;
    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === idx); });
    }
    function auto() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 7000); }
    $all("[data-testi-next]", wrap).forEach(function (b) { b.addEventListener("click", function () { go(idx + 1); auto(); }); });
    $all("[data-testi-prev]", wrap).forEach(function (b) { b.addEventListener("click", function () { go(idx - 1); auto(); }); });
    dots.forEach(function (d) { d.addEventListener("click", function () { go(parseInt(d.dataset.tdot, 10)); auto(); }); });
    auto();
  });

  /* ---------- FAQ accordion ---------- */
  document.addEventListener("click", function (ev) {
    var q = ev.target.closest(".faq__q");
    if (!q) return;
    var item = q.closest(".faq__item");
    var ans = $(".faq__a", item);
    var list = q.closest(".faq");
    var willOpen = !item.classList.contains("is-open");
    if (list && list.hasAttribute("data-single")) {
      $all(".faq__item.is-open", list).forEach(function (o) {
        if (o !== item) { o.classList.remove("is-open"); $(".faq__a", o).style.maxHeight = "0px"; $(".faq__q", o).setAttribute("aria-expanded", "false"); }
      });
    }
    item.classList.toggle("is-open", willOpen);
    q.setAttribute("aria-expanded", willOpen ? "true" : "false");
    ans.style.maxHeight = willOpen ? ans.scrollHeight + "px" : "0px";
  });
  $all(".faq__item.is-open .faq__a").forEach(function (a) { a.style.maxHeight = a.scrollHeight + "px"; });

  /* ---------- Tabs ---------- */
  $all("[data-tabs]").forEach(function (tabs) {
    var btns = $all("[data-tab]", tabs);
    var panes = $all("[data-pane]", tabs);
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (o) { o.classList.remove("is-active"); });
        panes.forEach(function (p) { p.classList.remove("is-active"); });
        b.classList.add("is-active");
        var pane = $('[data-pane="' + b.dataset.tab + '"]', tabs);
        if (pane) pane.classList.add("is-active");
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = null, lbImg = null, lbIdx = 0;
  var galItems = [];
  function openLB(i) {
    galItems = $all("[data-lightbox]");
    if (!galItems.length) return;
    lbIdx = (i + galItems.length) % galItems.length;
    if (!lb) {
      lb = document.createElement("div");
      lb.className = "lightbox";
      lb.innerHTML = '<button class="lightbox__close" aria-label="بستن">✕</button><button class="lightbox__nav lightbox__prev" aria-label="قبلی">›</button><img alt=""><button class="lightbox__nav lightbox__next" aria-label="بعدی">‹</button>';
      document.body.appendChild(lb);
      lbImg = lb.querySelector("img");
      lb.querySelector(".lightbox__close").addEventListener("click", closeLB);
      lb.querySelector(".lightbox__prev").addEventListener("click", function (e) { e.stopPropagation(); openLB(lbIdx - 1); });
      lb.querySelector(".lightbox__next").addEventListener("click", function (e) { e.stopPropagation(); openLB(lbIdx + 1); });
      lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
      document.addEventListener("keydown", function (e) {
        if (!lb || !lb.classList.contains("is-open")) return;
        if (e.key === "Escape") closeLB();
        if (e.key === "ArrowLeft") openLB(lbIdx + 1);
        if (e.key === "ArrowRight") openLB(lbIdx - 1);
      });
    }
    var img = galItems[lbIdx].querySelector("img");
    lbImg.src = img.src; lbImg.alt = img.alt;
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeLB() { if (lb) lb.classList.remove("is-open"); document.body.style.overflow = ""; }
  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-lightbox]");
    if (g) openLB(parseInt(g.dataset.lightbox, 10));
  });

  /* ---------- Forms ---------- */
  function bindForm(form, okMsg) {
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var notice = $(".notice", form);
      var valid = true;
      $all("[required]", form).forEach(function (f) {
        var bad = !f.value.trim() || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
        f.style.borderColor = bad ? "#d33" : "";
        if (bad) valid = false;
      });
      if (!notice) return;
      notice.className = "notice is-visible " + (valid ? "notice--success" : "notice--error");
      notice.textContent = valid ? okMsg : "لطفاً خطاهای فرم را برطرف کنید و دوباره تلاش نمایید.";
      if (valid) { form.reset(); notice.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
  }
  bindForm($("#contactForm"), "پیام شما با موفقیت ثبت شد؛ کارشناسان ما حداکثر ظرف یک روز کاری پاسخ می‌دهند. سپاس از اعتمادتان.");
  bindForm($("#admissionForm"), "درخواست پذیرش شما ثبت شد و کد پیگیری پیامک می‌شود. جلسه آشنایی از طریق تماس تلفنی هماهنگ خواهد شد.");
  $all("[data-newsletter]").forEach(function (f) {
    f.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var input = $("input", f), btn = $("button", f);
      if (input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        btn.textContent = "عضو شدید ✓"; btn.disabled = true; input.value = ""; input.placeholder = "عضویت شما ثبت شد";
      } else if (input) { input.focus(); input.style.outline = "2px solid #d33"; }
    });
  });

  /* ---------- Back to top ---------- */
  var toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "بازگشت به بالا");
  toTop.innerHTML = "↑";
  document.body.appendChild(toTop);
  window.addEventListener("scroll", function () { toTop.classList.toggle("is-visible", window.scrollY > 600); }, { passive: true });
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
})();
