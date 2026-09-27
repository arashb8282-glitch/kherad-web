# Kherad Design System (نظام طراحی) v1.0

## ۱. اصول
Persian-first · RTL native · سفیدِ تنفسی · لهجه آبیِ کم‌مصرف (≤۱۵٪ سطح دیداری) · حرکت ظریف و پرمیوم.

## ۲. رنگ
| نقش | توکن | مقدار |
|---|---|---|
| پس‌زمینه | `--white` / `--gray-100` / `--gray-200` | `#FFFFFF` / `#F7F7F7` / `#EFEFEF` |
| متن | `--ink` / `--ink-2` / `--ink-3` | `#111111` / `#333333` / `#666666` |
| لهجه | `--accent` / `--accent-dark` | `#007EC2` / `#00659B` |
| لهجه نرم | `--accent-soft` / `--accent-line` | `rgba(0,126,194,.08)` / `rgba(0,126,194,.22)` |
| خط جداکننده | `--border` | `#E4E4E4` |

قانون ۱۵٪: آبی فقط در دکمه اصلی، kickerها، لینک‌ها/هوور، آیکون‌ها، نشان تاریخ و خطوط باریک تزئینی.

## ۳. تایپوگرافی
- **فونت:** Vazirmatn خودمیزبان (`assets/fonts/*.woff2`، weights 400–900) — بدون هیچ CDN خارجی. مجوز OFL در `assets/fonts/OFL.txt`.
- جایگزین‌ها: `IRANSans, IRANSansX, Tahoma, Segoe UI`.
- تیترها 800–900، متن 400–500، ارتفاع خط متن ۲ (خوانایی فارسی)، اعداد و تاریخ‌ها فارسی/جلالی.

## ۴. لوگو
`assets/img/logo.svg` (و `logo.png`) دقیقاً بدون تغییر استفاده شود: هدر (ارتفاع ۵۴px)، دراور موبایل، فوتر (روی پلاک سفید به‌سبب پس‌زمینه تیره — خود لوگو دست‌نخورده).

## ۵. چیدمان
- کانتینر `min(1200px, 92%)` · گرید ۱۲ستونه ذهنی (کارت‌ها ۳/۲/۱) · سکشن ۸۸px، موبایل ۶۴px.
- ریتم تناوبی سفید/خاکستری `#F7F7F7` + نوارهای تیره `#111` برای کنتراست (آمار، نظرات، CTA، فوتر).
- نقاط شکست: `1080px` (ناو→دراور) · `860px` (دو‌ستونه→تک) · `560px` (فشرده موبایل).

## ۶. کامپوننت‌ها (`assets/css/style.css` + `assets/js/components.js`)
Topbar (تاریخ جلالی زنده) · Sticky header · Dropdown · Mega-menu · Drawer · Hero slider · Quick cards · Stats counters · Split+checklist · Pillars · Cards (news/program) · Team · Quote · Carousel · Testimonials · Events · FAQ accordion · Tabs · Steps · Forms+notices · Gallery+lightbox · Article+sidebar · CTA band · Page-hero+breadcrumb · Footer(۴ ستون)+newsletter · Back-to-top · Reveal-on-scroll.

## ۷. حرکت
- `ease = cubic-bezier(.22,.61,.36,1)`؛ هوورها ۰.۲۵–۰.۳۵s با `translateY(-4~-7px)`؛ هیرو: کراس‌فید + Ken Burns؛ شمارنده‌ها ۱.۷s با easing؛ آکاردئون/لایت‌باکس/دراور با ترنزیشن نرم.
- احترام به `prefers-reduced-motion`.

## ۸. دسترس‌پذیری و سئو
`lang="fa" dir="rtl"` · تگ‌های معنایی · alt فارسی · aria روی کنترل‌ها · `:focus-visible` · title/description یکتا هر صفحه · تصاویر `loading="lazy` (به‌جز هیرو).
