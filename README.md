# مؤسسه منظومه خرد — وب‌سایت رسمی

Persian-first · RTL · Static (zero dependencies) · Self-hosted Vazirmatn · Jalali dates

## اجرا (پیش‌نمایش محلی)
```bash
cd kherad-web
python3 -m http.server 8000
# → http://localhost:8000
```
> به‌خاطر بارگذاری کامپوننت‌ها با جاوااسکریپت، حتماً از طریق http(s) باز کنید نه `file://`.

## نقشه
| مسیر | صفحه |
|---|---|
| `/` | خانه (هیرو، آمار، برنامه‌ها، رهبری، اخبار، نظرات، رویدادها، سوالات) |
| `/about.html` | درباره ما (داستان، خط زمانی، رهبری، افتخارات) |
| `/programs.html` | آموزش (۶ برنامه + تب‌بندی + جزئیات مقاطع) |
| `/admissions.html` | پذیرش (مراحل + فرم پیش‌ثبت‌نام) |
| `/news.html` | اخبار + تقویم رویدادها |
| `/article.html?id=N` | قالب خبر (۱ تا ۶) |
| `/campus.html` | زندگی در خرد (امکانات + گالری) |
| `/faq.html` · `/contact.html` · `/404.html` | سوالات · تماس · خطا |

## سفارشی‌سازی سریع
- **محتوا:** فقط `assets/js/data.js` (اخبار، رویدادها، نظرات، سوالات، گالری، آمار).
- **منو/فوتر:** `assets/js/components.js` · **استایل:** `assets/css/style.css`.
- **فونت سازمانی:** فایل‌های `.woff2` خود را جایگزین `assets/fonts/` کنید (نام‌ها را حفظ کنید) — بدون CDN خارجی.
- **عکس واقعی:** جایگزین فایل‌های `assets/img/*.jpg` (نسبت پیشنهادی ۱۶:۹، حداکثر ۳۰۰KB).

## مستندات
`docs/SITEMAP.md` · `docs/DESIGN_SYSTEM.md` · `docs/ARCHITECTURE.md` · `docs/DATABASE.md` (شمای PostgreSQL آماده برای CMS آینده)

## دارایی‌های مخزن اصلی
`logo.svg` / `logo.png` (بدون هیچ تغییری استفاده شده) و `principal.webp` (عکس مدیر مجموعه) در `assets/img/` کپی و در صفحات به کار رفته‌اند؛ نسخه اصلی در ریشه مخزن دست‌نخورده باقی است.
