/* ============================================================
   KHERAD reusable components — header (mega menu), drawer, footer
   Rendered into #site-header / #site-footer on every page.
   ============================================================ */
(function () {
  "use strict";

  var page = (document.body && document.body.dataset.page) || "home";

  /* ---------- Header ---------- */
  var headerHTML = `
  <div class="topbar">
    <div class="container topbar__inner">
      <div class="topbar__group">
        <span class="topbar__date"><span class="topbar__dot"></span><span id="jalaliDate">…</span></span>
        <a class="topbar__hide-m" href="tel:+982122223333" dir="ltr">۰۲۱-۲۲۲۲۳۳۳۳ ✆</a>
        <a class="topbar__hide-m" href="mailto:info@kherad.edu">info@kherad.edu ✉</a>
      </div>
      <div class="topbar__group">
        <a href="news.html">اخبار و اطلاعیه‌ها</a>
        <a href="faq.html">سوالات متداول</a>
        <a class="topbar__portal" href="contact.html#portal">سامانه والدین</a>
      </div>
    </div>
  </div>
  <div class="container header__inner">
    <a class="brand" href="index.html" aria-label="منظومه خرد — صفحه اصلی">
      <img src="assets/img/logo.svg" alt="لوگوی موسسه منظومه خرد" width="220" height="72">
      <span class="brand__text"><strong>مؤسسه منظومه خرد</strong><span>آموزش · مشاوره · تحقیق</span></span>
    </a>
    <nav class="nav" aria-label="ناوبری اصلی">
      <div class="nav__item"><a class="nav__link" data-nav="home" href="index.html">خانه</a></div>
      <div class="nav__item" data-menu>
        <a class="nav__link" data-nav="about" href="about.html" aria-haspopup="true">آشنایی <span class="nav__caret">▾</span></a>
        <div class="dropdown">
          <a href="about.html#story">داستان خرد</a>
          <a href="about.html#leadership">رهبری مجموعه</a>
          <a href="about.html#honors">افتخارات و دستاوردها</a>
          <a href="campus.html">زندگی در خرد</a>
        </div>
      </div>
      <div class="nav__item" data-menu>
        <a class="nav__link" data-nav="programs" href="programs.html" aria-haspopup="true">آموزش <span class="nav__caret">▾</span></a>
        <div class="mega" role="menu">
          <div class="mega__col">
            <h4>مقاطع تحصیلی</h4>
            <a href="programs.html#elementary">◈ دبستان منظومه خرد</a>
            <a href="programs.html#middle">◈ متوسطه اول</a>
            <a href="programs.html#high">◈ متوسطه دوم</a>
          </div>
          <div class="mega__col">
            <h4>خدمات تخصصی</h4>
            <a href="programs.html#consult">◐ مشاوره تحصیلی و خانواده</a>
            <a href="programs.html#research">✦ پژوهش و استعدادهای درخشان</a>
            <a href="programs.html#courses">✚ دوره‌های آزاد و مهارتی</a>
          </div>
          <div class="mega__feature">
            <strong>پذیرش ۱۴۰۶–۱۴۰۵</strong>
            <p>پیش‌ثبت‌نام پایه‌های اول، هفتم و دهم از ۵ مهر آغاز می‌شود.</p>
            <a class="btn btn--primary btn--sm" href="admissions.html" style="margin-top:8px">شروع ثبت‌نام</a>
          </div>
        </div>
      </div>
      <div class="nav__item"><a class="nav__link" data-nav="admissions" href="admissions.html">پذیرش</a></div>
      <div class="nav__item"><a class="nav__link" data-nav="news" href="news.html">اخبار و رویدادها</a></div>
      <div class="nav__item"><a class="nav__link" data-nav="campus" href="campus.html">زندگی در خرد</a></div>
      <div class="nav__item"><a class="nav__link" data-nav="contact" href="contact.html">تماس با ما</a></div>
    </nav>
    <div class="header__cta">
      <a href="admissions.html" class="btn btn--primary btn--sm">پذیرش ۱۴۰۵ <span class="arrow">←</span></a>
      <button class="hamburger" id="hamburger" aria-label="باز کردن منو" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>`;

  /* ---------- Mobile drawer ---------- */
  var drawerHTML = `
  <div class="drawer" id="drawer" aria-hidden="true">
    <div class="drawer__overlay" data-drawer-close></div>
    <aside class="drawer__panel" role="dialog" aria-label="منوی موبایل">
      <div class="drawer__head">
        <img src="assets/img/logo.svg" alt="لوگوی منظومه خرد">
        <button class="drawer__close" data-drawer-close aria-label="بستن منو">✕</button>
      </div>
      <a class="drawer__link" href="index.html">خانه</a>
      <div class="drawer__group">
        <a class="drawer__link" href="about.html" data-drawer-toggle>آشنایی <span>▾</span></a>
        <div class="drawer__sub">
          <a href="about.html#story">داستان خرد</a>
          <a href="about.html#leadership">رهبری مجموعه</a>
          <a href="about.html#honors">افتخارات و دستاوردها</a>
        </div>
      </div>
      <div class="drawer__group">
        <a class="drawer__link" href="programs.html" data-drawer-toggle>آموزش <span>▾</span></a>
        <div class="drawer__sub">
          <a href="programs.html#elementary">دبستان</a>
          <a href="programs.html#middle">متوسطه اول</a>
          <a href="programs.html#high">متوسطه دوم</a>
          <a href="programs.html#consult">مشاوره تحصیلی</a>
          <a href="programs.html#research">پژوهش</a>
          <a href="programs.html#courses">دوره‌های آزاد</a>
        </div>
      </div>
      <a class="drawer__link" href="admissions.html">پذیرش</a>
      <a class="drawer__link" href="news.html">اخبار و رویدادها</a>
      <a class="drawer__link" href="campus.html">زندگی در خرد</a>
      <a class="drawer__link" href="faq.html">سوالات متداول</a>
      <a class="drawer__link" href="contact.html">تماس با ما</a>
      <div class="drawer__cta">
        <a href="admissions.html" class="btn btn--primary">پذیرش سال ۱۴۰۵</a>
        <a href="contact.html#portal" class="btn btn--outline">سامانه والدین</a>
      </div>
    </aside>
  </div>`;

  /* ---------- Footer ---------- */
  var footerHTML = `
  <div class="footer__top">
    <div class="container footer__grid">
      <div>
        <span class="footer__brand"><img src="assets/img/logo.svg" alt="لوگوی موسسه منظومه خرد" width="200" height="65"></span>
        <p class="footer__about">مؤسسه منظومه خرد از سال ۱۳۷۸ با سه رکن آموزش، مشاوره و تحقیق در کنار خانواده‌هاست؛ مدرسه‌ای که در آن هر دانش‌آموز، یک مسیر اختصاصی رشد دارد.</p>
        <div class="social" aria-label="شبکه‌های اجتماعی">
          <a href="#" aria-label="اینستاگرام">IG</a>
          <a href="#" aria-label="تلگرام">TG</a>
          <a href="#" aria-label="لینکدین">IN</a>
          <a href="#" aria-label="آپارات">AP</a>
        </div>
      </div>
      <div class="footer__col">
        <h4>دسترسی سریع</h4>
        <ul>
          <li><a href="about.html">درباره ما</a></li>
          <li><a href="admissions.html">پذیرش و ثبت‌نام</a></li>
          <li><a href="news.html">اخبار و رویدادها</a></li>
          <li><a href="campus.html">زندگی در خرد</a></li>
          <li><a href="faq.html">سوالات متداول</a></li>
          <li><a href="contact.html">تماس با ما</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>برنامه‌های آموزشی</h4>
        <ul>
          <li><a href="programs.html#elementary">دبستان</a></li>
          <li><a href="programs.html#middle">متوسطه اول</a></li>
          <li><a href="programs.html#high">متوسطه دوم</a></li>
          <li><a href="programs.html#consult">مشاوره تحصیلی</a></li>
          <li><a href="programs.html#research">پژوهش و المپیاد</a></li>
          <li><a href="programs.html#courses">دوره‌های آزاد</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>ارتباط با خرد</h4>
        <ul class="footer__contact">
          <li>◈ تهران، خیابان شریعتی، بالاتر از پل صدر، پردیس آموزشی خرد</li>
          <li>✆ <span dir="ltr">۰۲۱ - ۲۲ ۲۲ ۳۳ ۳۳</span></li>
          <li>✉ info@kherad.edu</li>
          <li>◷ شنبه تا پنجشنبه، ۷:۳۰ تا ۱۷</li>
        </ul>
        <form class="footer__newsletter" data-newsletter>
          <input type="email" name="email" placeholder="ایمیل برای خبرنامه…" aria-label="ایمیل خبرنامه" required>
          <button type="submit">عضویت</button>
        </form>
      </div>
    </div>
  </div>
  <div class="footer__bottom">
    <div class="container">
      <span>© <span id="jalaliYear">۱۴۰۵</span> مؤسسه منظومه خرد — کلیه حقوق محفوظ است.</span>
      <span>آموزش · مشاوره · تحقیق — <a href="index.html">kherad.edu</a></span>
    </div>
  </div>`;

  /* ---------- Mount ---------- */
  var headerEl = document.getElementById("site-header");
  if (headerEl) { headerEl.className = "site-header"; headerEl.innerHTML = headerHTML + drawerHTML; }
  var footerEl = document.getElementById("site-footer");
  if (footerEl) { footerEl.className = "site-footer"; footerEl.innerHTML = footerHTML; }

  /* Active nav */
  document.querySelectorAll("[data-nav]").forEach(function (a) {
    if (a.dataset.nav === page) a.classList.add("is-active");
  });

  /* Jalali date + year (native Intl, no library) */
  try {
    var fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    var dEl = document.getElementById("jalaliDate");
    if (dEl) dEl.textContent = fmt.format(new Date());
    var yFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric" });
    var yEl = document.getElementById("jalaliYear");
    if (yEl) yEl.textContent = yFmt.format(new Date());
  } catch (e) { /* Intl fallback: static text remains */ }

  /* Dropdown / mega menu (hover on desktop, click support for touch) */
  document.querySelectorAll("[data-menu]").forEach(function (item) {
    var link = item.querySelector(".nav__link");
    var closeTimer = null;
    item.addEventListener("mouseenter", function () {
      if (window.innerWidth < 1080) return;
      clearTimeout(closeTimer);
      document.querySelectorAll("[data-menu].is-open").forEach(function (o) { if (o !== item) o.classList.remove("is-open"); });
      item.classList.add("is-open");
    });
    item.addEventListener("mouseleave", function () {
      if (window.innerWidth < 1080) return;
      closeTimer = setTimeout(function () { item.classList.remove("is-open"); }, 160);
    });
    if (link) link.addEventListener("click", function (ev) {
      if (window.innerWidth < 1080 || "ontouchstart" in window) {
        if (!item.classList.contains("is-open")) {
          ev.preventDefault();
          document.querySelectorAll("[data-menu].is-open").forEach(function (o) { o.classList.remove("is-open"); });
          item.classList.add("is-open");
        }
      }
    });
  });
  document.addEventListener("click", function (ev) {
    if (!ev.target.closest("[data-menu]")) document.querySelectorAll("[data-menu].is-open").forEach(function (o) { o.classList.remove("is-open"); });
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") document.querySelectorAll("[data-menu].is-open").forEach(function (o) { o.classList.remove("is-open"); });
  });

  /* Drawer */
  var drawer = document.getElementById("drawer");
  var burger = document.getElementById("hamburger");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (burger) burger.addEventListener("click", function () { setDrawer(true); });
  document.querySelectorAll("[data-drawer-close]").forEach(function (b) { b.addEventListener("click", function () { setDrawer(false); }); });
  document.querySelectorAll("[data-drawer-toggle]").forEach(function (t) {
    t.addEventListener("click", function (ev) {
      var g = t.closest(".drawer__group");
      if (g && !g.classList.contains("is-open")) { ev.preventDefault(); g.classList.add("is-open"); }
    });
  });
})();
