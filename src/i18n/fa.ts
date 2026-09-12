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
    primary: "اصلی",
    theme: "تغییر به حالت {mode}",
    light: "روشن",
    dark: "تیره",
    lang: "Switch to English",
    menu: "باز کردن منو",
    close: "بستن منو",
    top: "بازگشت به بالا",
    external: "در تب تازه باز می‌شود",
    photo: "پرترهٔ محمد لیاقی",
    palette: "باز کردن جعبهٔ فرمان",
  },
  hero: {
    eyebrow: "بک‌اند · هوش مصنوعی · ویدیو",
    nameLines: ["محمد", "لیاقی"],
    role: "مهندس نرم‌افزار · هوش مصنوعی",
    at: "در",
    line: "پایپ‌لاین تولید ویدیوی هوش مصنوعی می‌سازم.",
    statement:
      "نوشتن متن آسان است. بیرون کشیدن ویدیو از آن، هر بار، کار اصلی است. در Zebracat روی همین مسیر کار می‌کنم: صف‌هایی که مرگ یک کارگر را تاب می‌آورند، خروجی مدلی که باید از شِما رد شود، و قالب‌های Remotion که مثل هر تغییر کد دیگری منتشر می‌شوند.",
    lede: "پنج سال Python، بیشتر در بک‌اند، تمام‌پشته وقتی کار ایجاب کند. درباره‌ی سامانه‌های مبتنی بر مدل زبانی می‌نویسم، وقتی کاربر واقعی به آن‌ها می‌رسد.",
    resume: "رزومه",
    email: "ایمیل بزنید",
    jump: "پرش",
  },
  palette: {
    placeholder: "برو به یک بخش، یا یک کار اجرا کن…",
    empty: "چیزی پیدا نشد.",
    page: "در این صفحه",
    action: "کارها",
    go: "برو",
    theme: "تغییر پوسته",
    lang: "تغییر زبان",
    resume: "باز کردن رزومه",
    email: "نوشتن ایمیل",
    hint: "برای پرش",
  },
  pipeline: {
    kicker: "یک رندر چطور ساخته می‌شود",
    from: "از یک متن",
    to: "تا ویدیوی نهایی",
    steps: [
      { title: "کارها", body: "تقسیم. تلاش مجدد. از سرگیری." },
      { title: "مدل‌ها", body: "تولید، بعد بررسی." },
      { title: "فریم‌ها", body: "React، رندر شده." },
    ],
  },
  resume: {
    label: "رزومه",
    read: "مطالعهٔ آنلاین",
    download: "دریافت PDF",
    en: "انگلیسی",
    fa: "فارسی",
  },
  stats: {
    years: "سال تجربه",
    repos: "مخزن عمومی",
    writing: "یادداشت",
  },
  work: {
    title: "تجربه",
    lede: "الان Zebracat. قبل از آن فریلنس.",
    present: "اکنون",
    roles: {
      zebracat: {
        role: "مهندس نرم‌افزار · هوش مصنوعی",
        where: "دورکاری — برلین",
        what: "پلتفرم ساخت ویدیو از متن",
        bullets: [],
        steps: [
          {
            title: "کارها",
            body: "دیگر شکست یک صحنه کل رندر را نمی‌کشد. هر مرحله یک کار روی RabbitMQ است، با وضعیت و تلاش مجدد خودش.",
          },
          {
            title: "مدل‌ها",
            body: "متن و صحنه تولید می‌شوند، بعد با شِما سنجیده می‌شوند. پاسخ خراب دوباره تلاش می‌کند؛ ویدیو را پایین نمی‌آورد.",
          },
          {
            title: "فریم‌ها",
            body: "قالب‌ها Remotion هستند — React که بدون مرورگر به فریم تبدیل می‌شود. تغییر یکی یعنی یک تغییر کد.",
          },
        ],
      },
      freelance: {
        role: "توسعه‌دهندهٔ تمام‌پشته",
        where: "دورکاری",
        what: "محصولات وب و SaaS",
        bullets: [
          "محصول کارفرما را از مدل داده تا API و رابط و استقرار بردم، و بعد از تحویل هم ماندم.",
          "Django/DRF یا FastAPI پشت React، کانتینری‌شده، با پایش فعال پیش از تحویل.",
          "احراز هویت، کنترل دسترسی، و نحوهٔ نگهداری داده — بخش‌هایی که کارفرما خودش نمی‌توانست بررسی‌شان کند.",
        ],
        steps: [],
      },
    },
  },
  projects: {
    title: "متن‌باز",
    lede: "بیشتر بک‌اندهای عمومی. چندتایشان هنوز پرسیده می‌شوند.",
    more: "همهٔ {count} مخزن",
    stars: "ستاره",
    kinds: {
      foodanywhere: "مکانی",
      fastcommerce: "فروشگاه",
      academymaster: "دسترسی",
      tsuna: "پخش",
      rubika: "انتقال",
      fastquora: "جست‌وجو",
    },
    items: {
      foodanywhere:
        "رستوران نزدیک را پیدا کن و سفارش را به آشپزخانه برسان. PostGIS جست‌وجو می‌کند، Celery کار سنگین را، و یک ردپا سفارش را از درخواست تا کارگری که تمامش می‌کند دنبال می‌کند.",
      fastcommerce:
        "API فروشگاهی ناهمگام با تمرکز بر توان عملیاتی. مرزهای تمیز، پردازش پس‌زمینه، و آزمون‌هایی که جلوی انتشار خراب را می‌گیرند.",
      academymaster:
        "API یک آموزشگاه: چه کسی چه می‌بیند، و کارهایی که سر وقت اجرا می‌شوند.",
      tsuna:
        "پخش ویدیو و موسیقی، با انتقال پردازش سنگین از مسیر درخواست.",
      rubika:
        "فایل تا ۲ گیگابایت را مستقیم میان دو پلتفرم جابه‌جا می‌کند تا پهنای باند صرف آپلود دوبارهٔ چیزی که پیش‌تر فرستاده شده نشود.",
      fastquora:
        "پرسش و پاسخ، با Elasticsearch روی مسیر جست‌وجو و ردیابی در کش.",
    },
  },
  about: {
    title: "درباره",
    paragraphs: [
      "مهندس نرم‌افزارم. پنج سال Python، بیشتر در بک‌اند، این اواخر روی ویدیوی مبتنی بر هوش مصنوعی. آنجا معمولاً خودِ مدل مسئله نیست. مسئله صفّی است که مرگ یک کارگر را تاب بیاورد، وضعیتی که بشود از سر گرفت، و پیشرفتی که بشود به آن اعتماد کرد.",
      "در همهٔ پشته کار می‌کنم چون سامانه‌ها همان‌جا می‌شکنند: Django و FastAPI پشت React و TypeScript، و Remotion وقتی خروجی به‌جای صفحه، ویدیو است. بک‌اند متن‌باز منتشر می‌کنم و در Medium می‌نویسم.",
    ],
    facts: {
      work: { label: "نحوهٔ کار", value: "دورکاری" },
      role: { label: "سمت", value: "مهندس نرم‌افزار · هوش مصنوعی" },
      company: { label: "شرکت", value: "Zebracat" },
      education: { label: "تحصیلات", value: "کارشناسی علوم کامپیوتر" },
      languages: { label: "زبان‌ها", value: "فارسی (زبان مادری)، انگلیسی (حرفه‌ای)" },
    },
  },
  stack: {
    title: "فناوری‌ها",
    lede: "همان‌هایی که واقعاً دست می‌برم سمت‌شان.",
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
    lede: "دربارهٔ ایجنت‌ها، مدل‌ها، و پولی که دورِ ساختن‌شان می‌چرخد — به انگلیسی.",
    more: "همهٔ نوشته‌ها در Medium",
    read: "{minutes} دقیقه مطالعه",
    items: {
      featureFactory: {
        title: "Stop Being a Feature Factory: The Engineer's Other Job Is Reading the Money",
        dek: "ساخت قابلیت کار اصلی نیست. خواندن اقتصاد واحد هست.",
      },
      bottleneck: {
        title: "Stop Being the Bottleneck: The Engineer's New Job in the Age of Coding Agents",
        dek: "ایجنت‌ها کار کمیاب را جابه‌جا می‌کنند. مهندس هم باید با آن‌ها جابه‌جا شود.",
      },
      nightShift: {
        title: "Stop Being Your Product's Night Shift: How an Agent Squad Actually Works",
        dek: "الگویی که با آن یک گروه ایجنت، وقتی خوابی، واقعاً منتشر می‌کند.",
      },
      habits: {
        title: "Stop Vibing, Start Engineering: 15 Advanced Habits for Coding Agents",
        dek: "پانزده عادت که پرامپت‌زدن به ایجنت را از مهندسی‌کردن با آن جدا می‌کند.",
      },
      routing: {
        title: "Stop Treating Open Source Models as a Downgrade: How Model Routing Actually Works",
        dek: "مدل متن‌باز ضعیف نیست اگر هر درخواست به مدل درستش برسد.",
      },
      vectors: {
        title: "Stop Treating Embeddings as Meaning: How Vector Spaces Actually Work",
        dek: "امبدینگ معنا نیست؛ هندسه است. همان هندسه بخش مفید کار است.",
      },
    },
  },
  contact: {
    title: "در تماس باشیم",
    lede: "ایمیل سریع‌ترین راه است. جواب می‌دهم.",
    open: "اگر گفت‌وگوی درستی باشد، باز هستم.",
    cta: "بنویسید",
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
    built: "English / فارسی",
    source: "کد منبع",
    rights: "© {year} محمد لیاقی",
  },
};
