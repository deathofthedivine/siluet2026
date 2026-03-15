document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Canvas Background with correct color codes
  tsParticles.load("particles-canvas", {
    background: {
      color: "transparent",
    },
    particles: {
      color: {
        value: ["#3b82f6", "#60a5fa", "#1a56db"], // Синие оттенки форума
      },
      number: {
        value: 60,
        density: { enable: true, area: 800 }
      },
      size: {
        value: { min: 1, max: 3 },
      },
      links: {
        enable: true,
        color: "#3b82f6",
        distance: 150,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        outModes: "out",
      },
      opacity: {
        value: { min: 0.2, max: 0.5 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: { opacity: 0.8 }
        },
      },
    },
  });

  // 2. Navbar glass effect on scroll
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // 3. Side Drawer Logic
  const burgerBtn = document.getElementById("burger-btn");
  const drawerClose = document.getElementById("drawer-close");
  const navDrawer = document.getElementById("nav-drawer");
  const navOverlay = document.getElementById("nav-overlay");

  const openDrawer = () => {
    navDrawer.classList.add("active");
    navOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    burgerBtn.setAttribute("aria-expanded", "true");
  };

  const closeDrawer = () => {
    navDrawer.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
    burgerBtn.setAttribute("aria-expanded", "false");
  };

  if (burgerBtn) burgerBtn.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (navOverlay) navOverlay.addEventListener("click", closeDrawer);

  // Close mobile menu on link click
  const navLinks = document.querySelectorAll(".nav__link[data-section]");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  // 4. Smooth Scrolling + Active State Update
  const sections = document.querySelectorAll("section");

  const updateActiveLink = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        let id = section.getAttribute("id");
        // DEUCOUPLE: In RU 'about' link goes to acronym, in EN it goes to about
        const lang = document.documentElement.lang || 'ru';
        if (id === "acronym") {
          if (lang === 'ru') id = "about";
          else id = "hero"; // Acronym hidden in EN
        }
        current = id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveLink);
  
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      let targetId = link.getAttribute("data-section");
      
      const lang = document.documentElement.lang || 'ru';
      // Remap 'about' based on language
      if (targetId === "about") {
        targetId = (lang === 'ru') ? "acronym" : "about";
      }
      
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Modal Form Submission Logic
  const regForm = document.getElementById("registration-form");
  const formBtn = document.getElementById("form-submit-btn");
  
  if (regForm && formBtn) {
    regForm.addEventListener("submit", function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Visual feedback: Success
      const btnText = formBtn.querySelector(".btn-submit-text");
      const btnSuccess = formBtn.querySelector(".btn-submit-success");
      
      formBtn.classList.add("success");
      if (btnText) btnText.classList.add("hidden");
      if (btnSuccess) btnSuccess.classList.remove("hidden");
      
      // Wait 1.5s and close
      setTimeout(() => {
        closeModal();
        // Reset after close
        setTimeout(() => {
          formBtn.classList.remove("success");
          if (btnText) btnText.classList.remove("hidden");
          if (btnSuccess) btnSuccess.classList.add("hidden");
          regForm.reset();
        }, 500);
      }, 1500);
      
      return false;
    });
  }

  // 5. Scroll Reveal Animation
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on load

  // 6. Program Tabs Logic
  const tabWraps = document.querySelectorAll(".program__tab-wrap");
  const panels = document.querySelectorAll(".program__panel");

  tabWraps.forEach((wrap) => {
    wrap.addEventListener("click", () => {
      // Remove active from all
      tabWraps.forEach((w) => w.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      // Add active to current
      wrap.classList.add("active");
      const targetId = wrap.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
    });
  });

  // 7. Modal Registration Dialog
  const modalOverlay = document.getElementById("reg-modal");
  const closeBtn = document.getElementById("modal-close");
  
  const openModalNav = document.getElementById("open-modal-nav");
  const openModalHero = document.getElementById("open-modal-hero");
  const openModalHeroCase = document.getElementById("open-modal-hero-case");
  const openModalCta = document.getElementById("open-modal-cta");
  const openModalCtaCase = document.getElementById("open-modal-cta-case");

  const tabForumWrap = document.getElementById("tab-forum-wrap");
  const tabCaseWrap = document.getElementById("tab-case-wrap");

  // Functions to open/close
  const openModal = (type = "forum") => {
    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Block scroll
    
    // Switch to appropriate tab
    if (type === "case") {
      tabCaseWrap.click();
    } else {
      tabForumWrap.click();
    }
  };

  const closeModal = () => {
    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // Attach event listeners for modal
  const openModalRegButtons = [
    document.getElementById("open-modal-nav"),
    document.getElementById("open-modal-nav-mobile"),
    document.getElementById("open-modal-hero"),
    document.getElementById("open-modal-hero-case"),
    document.getElementById("open-modal-cta"),
    document.getElementById("open-modal-cta-case")
  ];

  openModalRegButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        const type = btn.id.includes("case") ? "case" : "forum";
        openModal(type);
      });
    }
  });

  closeBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
      closeModal();
    }
  });

  // Make form tabs clickable
  tabForumWrap.addEventListener("click", () => {
    tabForumWrap.classList.add("active");
    tabCaseWrap.classList.remove("active");
  });
  tabCaseWrap.addEventListener("click", () => {
    tabCaseWrap.classList.add("active");
    tabForumWrap.classList.remove("active");
  });


  // 8. Internationalization (i18n)
  const translations = {
    ru: {
      "nav.about": "О форуме",
      "nav.program": "Программа",
      "nav.tracks": "Треки",
      "nav.activities": "Активности",
      "nav.venue": "Площадка",
      "nav.partners": "Партнёры",
      "nav.register": "Регистрация",
      "hero.badge": "Студенческий форум · Саратов · 2026",
      "hero.silhouette": "СИЛУЭТ",
      "hero.sub": "Будущего — 2026",
      "hero.reg_forum": "Регистрация на форум",
      "hero.reg_case": "Регистрация на кейс-чемпионат",
      "hero.date_label": "Дата проведения",
      "hero.date": "ДАТА БУДЕТ ОБЪЯВЛЕНА",
      "hero.venue_label": "Площадка",
      "hero.venue": "ТЕХНОПАРК SARATOV DIGITAL",
      "acronym.title": "Что значит СИЛУЭТ",
      "acronym.s": "Социология",
      "acronym.i": "ИИ",
      "acronym.l": "Лидерство",
      "acronym.u": "Управление",
      "acronym.e": "Экономика",
      "acronym.t": "Технологии",
      "acronym.ai_expanded": "Искусственный интеллект",
      "about.stat1": "ожидаемых участников",
      "about.stat2": "дня насыщенной программы",
      "about.stat3": "спикеров из бизнеса и власти",
      "about.stat4": "тематических направления",
      "about.title": "Пространство идей, технологий и новых карьерных возможностей",
      "about.desc": "«СИЛУЭТ будущего — 2026» — это двухдневный форум, объединяющий студентов, исследователей, предпринимателей и представителей государства для обсуждения тенденций в экономике, социологии и технологиях, в особенности ИИ, влияющих на будущее общества, экономики и рынка труда.",
      "about.desc_extra": "Наша цель — создать площадку, где талантливая молодежь сможет взаимодействовать с лидерами индустрий, решать реальные бизнес-задачи и находить карьерные возможности.",
      "about.desc_end": "Форум станет местом, где идеи превращаются в решения, а знакомства — в будущие проекты и карьеры.",
      "about.point1": "Взаимодействие с лидерами индустрий",
      "about.point2": "Решение реальных бизнес-задач",
      "about.point3": "Карьерные возможности",
      "about.point4": "Идеи превращаются в решения",
      "about.point5": "Знакомства в проекты и карьеры",
      "about.point6": "Обсуждение трендов: экономика, ИИ, общество",
      "program.title": "Расписание форума",
      "program.format_desc": "Форум пройдет в течение двух насыщенных дней, сочетающих образовательную программу, командную работу и взаимодействие с компаниями.",
      "program.day1": "День 1 — Выступления и мастермайнд",
      "program.day1_heading": "ДЕНЬ 1: Экспертные выступления и мастермайнд",
      "program.day1_desc": "Первый день посвящен обмену опытом, практическим знаниям и совместному поиску решений.",
      "program.day1_p1": "интерактивный формат коллективного мастермайнда",
      "program.day1_p2": "выступления приглашённых спикеров — экспертов бизнеса, технологий и цифровой экономики",
      "program.day1_p3": "обсуждение ключевых трендов цифровизации",
      "program.day2": "День 2 — Кейс-чемпионат",
      "program.day2_heading": "ДЕНЬ 2: Студенческий кейс-чемпионат",
      "program.day2_desc": "Во второй день пройдет кейс-чемпионат от компаний-партнёров. Участники будут решать практические задачи, связанные с внедрением цифровых решений в ресторанный бизнес. Команды представят свои решения перед экспертным жюри из представителей компаний.",
      "program.day2_p1": "поработать над реальными бизнес-кейсами",
      "program.day2_p2": "проявить аналитические и управленческие навыки",
      "program.day2_p3": "получить карьерные предложения от компаний",
      "program.ev1_t": "Регистрация участников",
      "program.ev1_d": "Приветственный кофе, нетворкинг и выдача бейджей.",
      "program.ev2_t": "Пленарная сессия",
      "program.ev2_d": "Открытие форума с участием приглашенных спикеров и представителей власти.",
      "program.ev3_t": "Лектория / Треки",
      "program.ev3_d": "Параллельные сессии по тематическим трекам форума.",
      "program.ev4_t": "Обед",
      "program.ev4_d": "Перерыв на обед в зоне фудкорта ОЭЗ.",
      "program.ev5_t": "Кейс-Чемпионат",
      "program.ev5_d": "Решение практических задач от компаний-партнёров, связанных с внедрением цифровых решений в ресторанный бизнес.",
      "program.ev6_t": "Защита проектов",
      "program.ev6_d": "Команды представят свои решения перед экспертным жюри из представителей компаний.",
      "program.ev7_t": "Мастермайнд",
      "program.ev7_d": "Участники объединятся в команды и будут решать мини-кейсы, подготовленные спикерами — применяя знания на практике и знакомясь с экспертами.",
      "program.ev8_t": "Карьерная зона / Нетворкинг",
      "program.ev8_d": "Компании-партнёры открывают карьерные площадки — экспресс-интервью, нетворкинг, знакомство с перспективными студентами.",
      "program.ev9_t": "Подведение итогов",
      "program.ev9_d": "Эксперты подводят итоги кейс-чемпионата, оценивают представленные решения и объявляют победителей.",
      "program.ev10_t": "Награждение",
      "program.ev10_d": "Торжественное вручение наград победителям и призёрам кейс-чемпионата. Закрытие форума.",
      "tracks.title": "Тематические треки",
      "tracks.t1": "Экономика",
      "tracks.d1": "Новые реалии бизнеса, стартапы и инвестиции в условиях технологического перехода.",
      "tracks.p1_1": "Инвестиции",
      "tracks.p1_2": "Стартапы",
      "tracks.t2": "ИИ & IT",
      "tracks.d2": "Как нейросети меняют профессии, рабочие процессы и повседневную жизнь людей.",
      "tracks.p2_1": "Нейросети",
      "tracks.p2_2": "Автоматизация",
      "tracks.t3": "Управление",
      "tracks.d3": "Менеджмент будущего: от лидерства до построения эффективных команд.",
      "tracks.p3_1": "Лидерство",
      "tracks.p3_2": "Командообразование",
      "activities.title": "Помимо лектория",
      "activities.a1_t": "Кейс-Чемпионат",
      "activities.a1_d": "Собери команду, реши реальный кейс от партнеров и защити его перед жюри.",
      "activities.a2_t": "Нетворкинг-сессии",
      "activities.a2_d": "Интерактивные форматы для быстрого обмена идеями и контактами с профи.",
      "activities.a3_t": "Мастер-классы",
      "activities.a3_d": "Практические занятия от экспертов рынка по настройке рабочих процессов.",
      "venue.title": "Открытая площадка",
      "venue.address": "Саратов, ул. Кутякова, д. 3, Технопарк",
      "venue.f1": "Кофе-брейк зоны",
      "venue.f2": "Конференц-залы",
      "venue.f3": "Зоны нетворкинга",
      "venue.f4": "Экспо-зона",
      "partners.title": "При поддержке бизнеса",
      "cta.title": "Стань частью форума<br>«СИЛУЭТ Будущего 2026»",
      "cta.desc": "Форум — это не просто мероприятие, а пространство, где формируются новые идеи, профессиональные связи и карьерные возможности. Присоединяйтесь к тем, кто создает будущее уже сегодня.",
      "career.heading": "Карьерное пространство",
      "career.intro": "На протяжении форума будет работать карьерная зона компаний.",
      "career.f1": "представить свою организацию",
      "career.f2": "познакомиться с талантливыми студентами и молодыми специалистами",
      "career.f3": "провести экспресс-интервью и нетворкинг",
      "career.f4": "найти будущих сотрудников и стажёров",
      "career.outro": "Форум станет точкой встречи бизнеса и перспективных молодых кадров.",
      "packages.label": "ПАРТНЁРСТВО",
      "packages.title": "Пакеты участия для компаний",
      "packages.desc": "Мы предлагаем несколько форматов партнёрства. Форум станет точкой встречи бизнеса и перспективных молодых кадров.",
      "packages.p1_name": "Стандарт",
      "packages.p1_price": "25 000 ₽",
      "packages.p1_f1": "Размещение площадки компании в карьерном пространстве",
      "packages.p1_f2": "Возможность взаимодействия с участниками форума",
      "packages.p2_name": "Партнер",
      "packages.p2_price": "50 000 ₽",
      "packages.p2_f1": "Размещение площадки компании в карьерном пространстве",
      "packages.p2_f2": "Возможность взаимодействия с участниками форума",
      "packages.p2_f3": "Выступление представителя компании в качестве спикера",
      "packages.p3_name": "Спонсор",
      "packages.p3_price": "100 000 ₽",
      "packages.p3_f1": "Размещение площадки компании в карьерном пространстве",
      "packages.p3_f2": "Возможность взаимодействия с участниками форума",
      "packages.p3_f3": "Выступление представителя компании в качестве спикера",
      "packages.p3_f4": "VIP-статус официального спонсора форума",
      "footer.nav": "Навигация",
      "footer.info": "Информация",
      "footer.contacts": "Контакты",
      "footer.copy": "© 2026 Все права защищены.",
      "modal.title": "Регистрация на форум",
      "modal.subtitle": "Заполните поля ниже, чтобы стать участником.",
      "modal.tab1": "Участник форума",
      "modal.tab2": "Кейс-чемпионат",
      "modal.name": "ФИО",
      "modal.phone": "Телефон",
      "modal.role": "Статус",
      "modal.role_ph": "Выберите вашу роль",
      "modal.about": "Сфера интересов",
      "modal.submit": "Подать заявку",
      "modal.role_s": "Студент",
      "modal.role_e": "Эксперт",
      "modal.role_p": "Партнёр",
      "modal.success": "ЗАЯВКА ОТПРАВЛЕНА!",
      "modal.consent": "Я согласен(-а) с политикой обработки персональных данных и даю согласие на их обработку."
    },
    en: {
      "nav.about": "About",
      "nav.program": "Program",
      "nav.tracks": "Tracks",
      "nav.activities": "Activities",
      "nav.venue": "Venue",
      "nav.partners": "Partners",
      "nav.register": "Register",
      "hero.badge": "Student Forum · Saratov · 2026",
      "hero.silhouette": "SILHOUETTE",
      "hero.sub": "of the Future — 2026",
      "hero.reg_forum": "Register for Forum",
      "hero.reg_case": "Register for Case Champ",
      "hero.date_label": "Event Date",
      "hero.date": "TO BE ANNOUNCED",
      "hero.venue_label": "Venue",
      "hero.venue": "TECHNOPARK SARATOV DIGITAL",
      "acronym.title": "Meaning of SILHOUETTE",
      "acronym.s": "Sociology",
      "acronym.i": "Artificial Intelligence",
      "acronym.l": "Leadership",
      "acronym.u": "Management",
      "acronym.e": "Economics",
      "acronym.t": "Technologies",
      "acronym.ai_expanded": "Artificial Intelligence",
      "about.stat1": "expected participants",
      "about.stat2": "days of intense program",
      "about.stat3": "speakers from business",
      "about.stat4": "thematic tracks",
      "about.title": "A Space for Ideas, Technologies and New Career Opportunities",
      "about.desc": "«SILHOUETTE of the Future — 2026» is a two-day forum bringing together students, researchers, entrepreneurs and government representatives to discuss trends in economics, sociology and technology — especially AI — and their impact on society, the economy and the labour market.",
      "about.desc_extra": "Our goal is to create a platform where talented young people can engage with industry leaders, tackle real business challenges and discover career opportunities.",
      "about.desc_end": "The forum is a place where ideas become solutions and connections become future projects and careers.",
      "about.point1": "Engagement with industry leaders",
      "about.point2": "Solving real business challenges",
      "about.point3": "Career opportunities",
      "about.point4": "Ideas turned into solutions",
      "about.point5": "Connections into projects and careers",
      "about.point6": "Discussing trends: economy, AI, society",
      "program.title": "Forum Schedule",
      "program.format_desc": "The forum will take place over two intensive days combining an educational programme, teamwork and interaction with companies.",
      "program.day1": "Day 1 — Talks & Mastermind",
      "program.day1_heading": "DAY 1: Expert Talks & Mastermind",
      "program.day1_desc": "The first day is dedicated to sharing experience, practical knowledge and collaborative problem-solving.",
      "program.day1_p1": "interactive collective mastermind format",
      "program.day1_p2": "talks by invited speakers — experts from business, technology and the digital economy",
      "program.day1_p3": "discussion of key digitalisation trends",
      "program.day2": "Day 2 — Case Championship",
      "program.day2_heading": "DAY 2: Student Case Championship",
      "program.day2_desc": "The second day features a case championship from partner companies. Participants will solve practical challenges related to implementing digital solutions in the restaurant business. Teams will present their solutions to an expert jury of company representatives.",
      "program.day2_p1": "work on real business cases",
      "program.day2_p2": "demonstrate analytical and management skills",
      "program.day2_p3": "receive career offers from companies",
      "program.ev1_t": "Registration",
      "program.ev1_d": "Welcome coffee, networking and badge pickup.",
      "program.ev2_t": "Plenary Session",
      "program.ev2_d": "The opening of the forum with invited speakers from authorities.",
      "program.ev3_t": "Lectures / Tracks",
      "program.ev3_d": "Parallel sessions focusing on AI and Economics.",
      "program.ev4_t": "Lunch",
      "program.ev4_d": "Lunch break in the SEZ food court area.",
      "program.ev5_t": "Case Championship",
      "program.ev5_d": "Solving practical challenges from partner companies related to implementing digital solutions in the restaurant business.",
      "program.ev6_t": "Project Defense",
      "program.ev6_d": "Teams present their solutions to the expert jury of company representatives.",
      "program.ev7_t": "Mastermind",
      "program.ev7_d": "Participants form teams and solve mini-cases prepared by speakers — applying knowledge in practice and meeting experts.",
      "program.ev8_t": "Career Zone / Networking",
      "program.ev8_d": "Partner companies open career booths — express interviews, networking, and meeting promising students.",
      "program.ev9_t": "Wrap-up & Judging",
      "program.ev9_d": "Experts summarise the case championship, evaluate the solutions presented and announce the winners.",
      "program.ev10_t": "Awards Ceremony",
      "program.ev10_d": "Formal award ceremony for winners and prize-winners of the case championship. Closing of the forum.",
      "tracks.title": "Thematic Tracks",
      "tracks.t1": "Economics",
      "tracks.d1": "New realities of business, startups and investments in tech transition.",
      "tracks.p1_1": "Investments",
      "tracks.p1_2": "Startups",
      "tracks.t2": "AI & IT",
      "tracks.d2": "How neural networks are changing professions and daily lives.",
      "tracks.p2_1": "Neural Networks",
      "tracks.p2_2": "Automation",
      "tracks.t3": "Management",
      "tracks.d3": "Future management: from leadership to building effective teams.",
      "tracks.p3_1": "Leadership",
      "tracks.p3_2": "Teambuilding",
      "activities.title": "Beyond Lectures",
      "activities.a1_t": "Case Championship",
      "activities.a1_d": "Assemble a team, solve a real business case from partners and pitch it to the jury.",
      "activities.a2_t": "Networking Sessions",
      "activities.a2_d": "Interactive formats for rapid exchange of ideas and contacts with professionals.",
      "activities.a3_t": "Workshops",
      "activities.a3_d": "Practical classes from market experts on workflow settings and personal efficiency.",
      "venue.title": "Open Ground",
      "venue.address": "Saratov, Kutyakova st, 3, Technopark",
      "venue.f1": "Coffee Break Zones",
      "venue.f2": "Conference Halls",
      "venue.f3": "Networking Zones",
      "venue.f4": "Expo Area",
      "partners.title": "Supported by Businesses",
      "cta.title": "Join the student forum<br>«SILHOUETTE of the Future 2026»",
      "cta.desc": "The forum is more than just an event — it is a space where new ideas, professional connections and career opportunities take shape. Join those who are building the future today.",
      "career.heading": "Career Space",
      "career.intro": "Throughout the forum, a company career zone will be open.",
      "career.f1": "present their organisation",
      "career.f2": "meet talented students and young professionals",
      "career.f3": "conduct express interviews and networking",
      "career.f4": "find future employees and interns",
      "career.outro": "The forum will be the meeting point for business and promising young talent.",
      "packages.label": "PARTNERSHIP",
      "packages.title": "Participation Packages for Companies",
      "packages.desc": "We offer several partnership formats. The forum will be the meeting point for business and promising young talent.",
      "packages.p1_name": "Standard",
      "packages.p1_price": "25 000 ₽",
      "packages.p1_f1": "Company booth placement in the career space",
      "packages.p1_f2": "Opportunity to interact with forum participants",
      "packages.p2_name": "Partner",
      "packages.p2_price": "50 000 ₽",
      "packages.p2_f1": "Company booth placement in the career space",
      "packages.p2_f2": "Opportunity to interact with forum participants",
      "packages.p2_f3": "Speaking slot for a company representative",
      "packages.p3_name": "Sponsor",
      "packages.p3_price": "100 000 ₽",
      "packages.p3_f1": "Company booth placement in the career space",
      "packages.p3_f2": "Opportunity to interact with forum participants",
      "packages.p3_f3": "Speaking slot for a company representative",
      "packages.p3_f4": "VIP status as official forum sponsor",
      "footer.nav": "Navigation",
      "footer.info": "Information",
      "footer.contacts": "Contacts",
      "footer.copy": "© 2026 All rights reserved.",
      "modal.title": "Forum Registration",
      "modal.subtitle": "Fill in the fields below to become a participant.",
      "modal.tab1": "Forum Participant",
      "modal.tab2": "Case Champ",
      "modal.name": "Full Name",
      "modal.phone": "Phone",
      "modal.role": "Status",
      "modal.role_ph": "Choose your role",
      "modal.role_s": "Student",
      "modal.role_e": "Expert",
      "modal.role_p": "Partner",
      "modal.about": "Areas of Interest",
      "modal.submit": "Submit Request",
      "modal.success": "APPLICATION SENT!",
      "modal.consent": "I agree to the personal data processing policy and give consent to their processing."
    }
  };

  const setLanguage = (lang) => {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        if (el.tagName === 'H2' && key === 'cta.title') {
           el.innerHTML = translations[lang][key]; // Support <br>
        } else {
           el.textContent = translations[lang][key];
        }
      }
    });

    // Toggle Acronym section visibility
    const acronymSection = document.getElementById('acronym');
    if (acronymSection) {
      if (lang === 'en') {
        acronymSection.style.setProperty('display', 'none', 'important');
      } else {
        acronymSection.style.setProperty('display', 'block');
      }
    }

    // Sync all language buttons (desktop topbar + mobile drawer)
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const btnLang = btn.getAttribute("data-lang");
      if (btnLang === lang) {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      }
    });
  };

  // Delegate click events for all language buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (lang) setLanguage(lang);
    });
  });

  // 9. Dynamic Topbar Text Color (Hardcoded Hero Hitbox)
  const topbar = document.querySelector(".nav__topbar");
  const heroHitbox = document.getElementById("hero-hitbox");

  if (topbar && heroHitbox) {
    const checkTopbarIntersection = () => {
      // Find the visual bounds of the content inside topbar
      const children = Array.from(topbar.children);
      if(children.length === 0) return;
      
      const firstChildRect = children[0].getBoundingClientRect();
      const lastChildRect = children[children.length - 1].getBoundingClientRect();
      
      const contentRect = {
        top: Math.min(...children.map(c => c.getBoundingClientRect().top)),
        bottom: Math.max(...children.map(c => c.getBoundingClientRect().bottom)),
        left: firstChildRect.left,
        right: lastChildRect.right
      };

      const heroRect = heroHitbox.getBoundingClientRect();
      
      // Vertical check against the specific hero banner hitbox. No large buffer.
      // We want it to be precise.
      const verticalOverlap = contentRect.bottom > heroRect.top && 
                              contentRect.top < heroRect.bottom;
      
      // Horizontal check against the hero banner
      const horizontalOverlap = contentRect.right > heroRect.left &&
                                contentRect.left < heroRect.right;

      if (verticalOverlap && horizontalOverlap) {
        topbar.classList.add("topbar-light");
      } else {
        topbar.classList.remove("topbar-light");
      }
    };

    // Check on scroll and resize
    window.addEventListener("scroll", checkTopbarIntersection, { passive: true });
    window.addEventListener("resize", checkTopbarIntersection, { passive: true });
    
    // Initial check
    checkTopbarIntersection();
  }

  // Program day-intro accordion (mobile only — toggle is cursor:pointer only on ≤900px)
  document.querySelectorAll(".program__day-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      if (window.innerWidth > 900) return;
      const intro = toggle.closest(".program__day-intro");
      const isOpen = intro.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  });

  // Package accordion toggle (mobile/tablet only — ≤900px)
  document.querySelectorAll(".package-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      if (window.innerWidth > 900) return;
      const inner = toggle.closest(".package-inner");
      const isOpen = inner.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  });

});

