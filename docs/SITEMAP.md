# Kherad Website — Sitemap (نقشه سایت)

> Persian-first · RTL · Jalali dates · Persian digits. All routes are static HTML (no framework lock-in).

## Page tree

```
index.html (خانه)
├── about.html (درباره ما)
│   ├── #story        داستان خرد + مأموریت/چشم‌انداز/ارزش‌ها
│   ├── #leadership   رهبری مجموعه (مدیر + مدیرعامل) + نقل‌قول
│   └── #honors       افتخارات و دستاوردها
├── programs.html (آموزش)
│   ├── [tabs] مقاطع تحصیلی / خدمات تخصصی / دوره‌های آزاد
│   ├── #elementary   دبستان (اول تا ششم)
│   ├── #middle       متوسطه اول (هفتم تا نهم)
│   ├── #high         متوسطه دوم (دهم تا دوازدهم)
│   ├── #consult      مشاوره تحصیلی و خانواده
│   ├── #research     پژوهش و استعدادهای درخشان
│   └── #courses      دوره‌های آزاد و مهارتی
├── admissions.html (پذیرش)
│   ├── مراحل ۴گانه پذیرش + مدارک و شهریه
│   └── #form         فرم پیش‌ثبت‌نام آنلاین
├── news.html (اخبار و رویدادها)
│   ├── خبر ویژه + آرشیو خبرها (۶ خبر اولیه)
│   └── #events       تقویم رویدادها
├── article.html?id=N (صفحه خبر — قالب داینامیک)
│   └── متن کامل + برچسب‌ها + اخبار مرتبط + سایدبار
├── campus.html (زندگی در خرد)
│   ├── امکانات پردیس (۶ کارت) + گالری (۹ تصویر + لایت‌باکس)
│   └── CTA تور بازدید
├── faq.html (سوالات متداول — آکاردئون کامل)
├── contact.html (تماس با ما)
│   ├── اطلاعات تماس + نقشه + فرم ارتباط
│   └── #portal        یادداشت سامانه والدین (به‌زودی)
└── 404.html (صفحه خطا)
```

## Navigation mapping

| Header item | Target | Type |
|---|---|---|
| خانه | index.html | link |
| آشنایی | about.html + 3 anchors + campus | dropdown |
| آموزش | programs.html + 6 anchors | **mega menu** (2 cols + feature card) |
| پذیرش | admissions.html | link + header CTA button |
| اخبار و رویدادها | news.html | link |
| زندگی در خرد | campus.html | link |
| تماس با ما | contact.html | link |
| سوالات متداول | faq.html | topbar + footer + in-page links |

Mobile (<1080px): hamburger → slide-in drawer with collapsible groups.

## Homepage hierarchy (top → bottom)

1. Hero slider (3 slides, autoplay, dots+arrows) → 2. Quick-access cards (×4, overlap) → 3. Animated stats band → 4. About split + 3 pillars → 5. Programs grid → 6. Leadership + quote → 7. News carousel → 8. Testimonials (dark band) → 9. Events + FAQ split → 10. CTA band → Footer.

## Content inventory

- 6 programs · 6 news articles (full body) · 4 events · 4 testimonials · 6 FAQs · 9 gallery items · 4 stats — all in `assets/js/data.js`.
