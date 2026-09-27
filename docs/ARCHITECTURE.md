# Kherad Architecture (معماری فنی)

## تصمیم معماری
وب‌سایت **استاتیک چندصفحه‌ای بدون بیلد** (HTML/CSS/JS خالص، صفر وابستگی npm) تا:
- همه‌جا قابل میزبانی باشد (هر هاست اشتراکی، Nginx، GitHub Pages، کلوهای ایرانی)؛
- سریع‌ترین LCP ممکن را بدهد (فونت و عکس خودمیزبان، بدون رانتایم فریم‌ورک)؛
- برای تیم غیرفنی قابل نگهداری باشد (محتوا در یک فایل داده).

## ساختار فایل‌ها
```
index.html about.html programs.html admissions.html news.html
article.html campus.html faq.html contact.html 404.html
assets/
  css/style.css          # کل دیزاین‌سیستم (توکن‌ها + ~۴۰ کامپوننت)
  js/data.js             # تنها منبع محتوای داینامیک (window.KHERAD)
  js/components.js       # هدر/مگامنو/دراور/فوتر + تاریخ جلالی (Intl)
  js/main.js             # اسلایدرها، شمارنده، آکاردئون، لایت‌باکس، فرم‌ها، رندرها
  fonts/Vazirmatn-*.woff2 (۶ وزن) + OFL.txt
  img/ (logo.svg/png، principal.webp، ۷ عکس پردیس)
docs/ (SITEMAP · DESIGN_SYSTEM · ARCHITECTURE · DATABASE)
```

## الگوی رندر
- کروم مشترک (هدر/فوتر) با `components.js` در `#site-header`/`#site-footer` تزریق می‌شود → **تک‌منبع بودن کامپوننت‌ها**.
- محتوای تکراری (اخبار، رویدادها، نظرات، سوالات، گالری، آمار) از `data.js` در کانتینرهای `[data-render]` رندر می‌شود.
- `article.html?id=N` یک قالب داینامیک سمت‌کاربر است؛ افزودن خبر = افزودن یک آبجکت به `D.posts`.
- تاریخ جلالی تاپ‌بار و سال فوتر با `Intl.DateTimeFormat('fa-IR-u-ca-persian')` بدون کتابخانه.

## افزودن محتوا (بدون کدنویسی عمیق)
| کار | محل |
|---|---|
| خبر جدید | آبجکت تازه در `D.posts` + عکس در `assets/img/` |
| رویداد/نظر/سوال | آرایه متناظر در `data.js` |
| عکس گالری | آرایه `D.gallery` |
| تغییر منو/فوتر | قالب‌ها در `components.js` |

## مسیر ارتقا (بدون بازنویسی)
1. **CMS سبک:** همین `data.js` را از یک API/فایل JSON تولید کنید (ساختار کلیدها ثابت می‌ماند).
2. **بک‌اند کامل:** شمای پایگاه داده آماده در `docs/DATABASE.md` (PostgreSQL، ایندکس‌گذاری‌شده، `fa-IR` collation).
3. **SSR/SSG:** قالب‌های HTML مستقیماً به partialهای هر فریم‌ورکی (Next/Nuxt/Astro) نگاشت می‌شوند؛ کلاس‌های CSS بدون تغییر می‌مانند.

## عملکرد
- فونت‌ها `preload` + `font-display:swap`؛ تصاویر lazy (به‌جز هیرو)؛ بدون فونت/اسکریپت خارجی.
- JS زیر ۴۰KB (سه فایل، `defer`)؛ CSS تک‌فایل بدون پیش‌پردازنده.
- پیشنهاد استقرار: فعال‌سازی gzip/brotli + کش یک‌ساله روی `assets/*` + `index.html` بدون کش.
