import meta from "./meta.json";
import type { Dict } from "./en";

/**
 * Persian is a first-class language here, not a translation layer: the copy is
 * written to read naturally in Persian rather than to mirror the English
 * sentence by sentence. Article titles stay in their original English, because
 * that is what the reader will find at the other end of the link.
 */
export const fa: Dict = {
  meta: meta.fa,
  nav: {
    work: "تجربه",
    projects: "متن‌باز",
    about: "درباره",
    stack: "فناوری‌ها",
    writing: "نوشته‌ها",
    contact: "تماس",
  },
  a11y: {
    skip: "رفتن به محتوا",
    theme: "تغییر به حالت {mode}",
    light: "روشن",
    dark: "تیره",
    lang: "Switch to English",
    menu: "باز کردن منو",
    close: "بستن منو",
    top: "بازگشت به بالا",
    external: "در تب تازه باز می‌شود",
  },
  hero: {
    eyebrow: "بک‌اند · هوش مصنوعی · ویدیو",
    nameLines: ["محمد", "لیاقی"],
    role: "مهندس نرم‌افزار · هوش مصنوعی",
    at: "در",
    statement:
      "سامانه‌هایی می‌سازم که یک متن را به ویدیوی نهایی تبدیل می‌کنند — خط‌لوله‌های پردازش در لایهٔ زیرین، گام‌های مدل در میانه، و رابط کاربری روی همهٔ این‌ها.",
    lede: "پنج سال کار با Python؛ تمام‌پشته با گرایش بک‌اند. دربارهٔ رفتار واقعی سامانه‌های مبتنی بر مدل‌های زبانی، وقتی کاربر واقعی به آن‌ها می‌رسد، می‌نویسم.",
    resume: "رزومه",
    email: "ایمیل بزنید",
    scroll: "پایین‌تر",
  },
  resume: {
    label: "رزومه",
    read: "مطالعهٔ آنلاین",
    download: "دریافت PDF",
    en: "انگلیسی",
    fa: "فارسی",
  },
  stats: {
    stars: "ستارهٔ گیت‌هاب",
    repos: "مخزن عمومی",
    years: "سال تجربه",
  },
  work: {
    title: "جاهایی که کار کرده‌ام",
    lede: "دو مورد، چون بیش از دو تا نبوده.",
    present: "اکنون",
    roles: {
      zebracat: {
        role: "مهندس نرم‌افزار · هوش مصنوعی",
        where: "دورکاری — برلین",
        what: "پلتفرم ساخت ویدیو از متن",
        bullets: [
          "ساخت خط‌لولهٔ تولید: هر رندر به کارهایی شکسته می‌شود که مستقل از هم روی کارگرهای RabbitMQ دوباره تلاش می‌کنند و وضعیت هر کار جداگانه نگه داشته می‌شود، تا شکست یک مرحله به قیمت کل ویدیو تمام نشود.",
          "کار روی بخش مدلِ محصول — ساخت متن و صحنه، اعتبارسنجی خروجی با شِما پیش از رسیدن به خط‌لوله، و تلاش مجددی که نمی‌گذارد یک پاسخ نامعتبر کل رندر را خراب کند.",
          "ساخت ویدیوی برنامه‌پذیر با Remotion: کامپوننت‌های React که بدون مرورگر به فریم تبدیل می‌شوند، تا تغییر یک قالب مثل هر تغییر کد دیگری منتشر شود.",
          "کار در همهٔ لایه‌ها — سرویس‌های Django و FastAPI پشت رابط‌های React و TypeScript.",
        ],
      },
      freelance: {
        role: "توسعه‌دهندهٔ تمام‌پشته",
        where: "دورکاری",
        what: "محصولات وب و SaaS",
        bullets: [
          "تحویل کامل محصول به کارفرما: مدل داده، API، رابط کاربری، استقرار، و پشتیبانی پس از آن.",
          "استانداردسازی روی Django/DRF و FastAPI پشت React، کانتینری‌شده و با پایش فعال پیش از تحویل.",
          "برعهده‌گرفتن بخش‌هایی که کارفرما خودش نمی‌توانست بررسی‌شان کند — احراز هویت، کنترل دسترسی، و نحوهٔ نگهداری داده‌هایش.",
        ],
      },
    },
  },
  projects: {
    title: "متن‌باز",
    lede: "همه‌اش عمومی و قابل خواندن است. ستاره‌ها را گیت‌هاب می‌شمارد، نه من.",
    more: "همهٔ {count} مخزن",
    stars: "ستاره",
    items: {
      foodanywhere:
        "بک‌اند سفارش غذا. PostGIS برای جست‌وجوی مکانی، Celery برای هر کار سنگین، و ردیابی توزیع‌شده‌ای که یک سفارش را از درخواست تا کارگری که تمامش می‌کند دنبال می‌کند.",
      fastcommerce:
        "بک‌اند فروشگاهی ناهمگام با تمرکز بر توان عملیاتی — مرزهای تمیز API، پردازش پس‌زمینه، و مجموعه‌آزمونی که جلوی انتشار خراب را می‌گیرد.",
      academymaster:
        "API مدیریت آموزشگاه با دسترسی‌های لایه‌ای و کارهای زمان‌بندی‌شدهٔ پس‌زمینه، آمادهٔ استقرار روی کانتینر.",
      tsuna:
        "بک‌اند پخش ویدیو و موسیقی، با انتقال پردازش‌های سنگین به کارگرهای پس‌زمینه.",
      rubika:
        "فایل‌های تا ۲ گیگابایت را مستقیم میان دو پلتفرم جابه‌جا می‌کند تا کسی پهنای باند محدودش را صرف آپلود دوبارهٔ چیزی که پیش‌تر فرستاده نکند.",
      fastquora:
        "سامانهٔ پرسش و پاسخ روی FastAPI. Elasticsearch برای جست‌وجو، Redis برای کش، و ردیابی توزیع‌شده در هر دو.",
    },
  },
  about: {
    title: "درباره",
    paragraphs: [
      "مهندس نرم‌افزارم؛ پنج سال است با Python کار می‌کنم و بیشترش در بک‌اند بوده. مدتی است روی ویدیوی مبتنی بر هوش مصنوعی کار می‌کنم و همان‌جا فهمیدم مسئلهٔ جالب معمولاً خودِ مدل نیست، بلکه هر چیزی است که دورش ساخته می‌شود — صف‌هایی که مرگ یک کارگر را تاب می‌آورند، وضعیتی که بشود از سر گرفت، و پیشرفتی که کاربر واقعاً ببیندش.",
      "به‌جای تمرکز روی یک لایه، در همهٔ پشته کار می‌کنم: Django و FastAPI پشت React و TypeScript، و Remotion وقتی خروجی به‌جای صفحه، ویدیو است. سامانه‌ها معمولاً درست در درزِ میان همین‌ها می‌شکنند؛ برای همین بیشترِ حواسم آنجاست.",
      "بیرون از کار متن‌باز منتشر می‌کنم — بیشتر بک‌اند، به‌علاوهٔ یک بستهٔ self-hosted برای همکاری روی شبکه‌هایی که نمی‌شود به آن‌ها تکیه کرد. در Medium هم می‌نویسم که سامانه‌های مبتنی بر مدل‌های زبانی، وقتی کاربر واقعی به آن‌ها می‌رسد، دقیقاً چه می‌کنند.",
    ],
    facts: {
      work: { label: "نحوهٔ کار", value: "دورکاری" },
      role: { label: "سمت", value: "مهندس نرم‌افزار · هوش مصنوعی" },
      company: { label: "شرکت", value: "Zebracat" },
      languages: { label: "زبان‌ها", value: "فارسی (زبان مادری)، انگلیسی (حرفه‌ای)" },
    },
  },
  stack: {
    title: "فناوری‌ها",
    lede: "عمداً کوتاه است. این همان فهرستی است که با خیال راحت دربارهٔ تک‌تکش مصاحبه می‌دهم.",
    groups: {
      languages: "زبان‌ها",
      backend: "بک‌اند",
      ai: "مدل‌ها",
      data: "داده",
      frontend: "فرانت‌اند",
      infra: "زیرساخت",
      reliability: "پایداری",
    },
  },
  writing: {
    title: "نوشته‌ها",
    lede: "یادداشت‌های بلند دربارهٔ ساختن با مدل‌های زبانی، منتشرشده در Medium — به انگلیسی.",
    more: "همهٔ نوشته‌ها در Medium",
    read: "{minutes} دقیقه مطالعه",
    items: {
      featureFactory: "Stop Being a Feature Factory: The Engineer's Other Job Is Reading the Money",
      bottleneck: "Stop Being the Bottleneck: The Engineer's New Job in the Age of Coding Agents",
      nightShift: "Stop Being Your Product's Night Shift: How an Agent Squad Actually Works",
      habits: "Stop Vibing, Start Engineering: 15 Advanced Habits for Coding Agents",
      routing: "Stop Treating Open Source Models as a Downgrade: How Model Routing Actually Works",
      vectors: "Stop Treating Embeddings as Meaning: How Vector Spaces Actually Work",
    },
  },
  contact: {
    title: "در تماس باشیم",
    lede: "ایمیل سریع‌ترین راه است و جوابش را می‌دهم. بقیه هم کار می‌کنند.",
    cta: "سلام کنید",
    elsewhere: "جاهای دیگر",
    socials: {
      email: "ایمیل",
      github: "گیت‌هاب",
      linkedin: "لینکدین",
      medium: "Medium",
      telegram: "تلگرام",
    },
  },
  footer: {
    built: "طراحی و ساخته‌شده از صفر",
    source: "کد منبع",
    rights: "© {year} محمد لیاقی",
  },
};
