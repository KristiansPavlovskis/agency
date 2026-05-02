const heroBg = document.getElementById("heroBg");
const classesStrip = document.getElementById("classesStrip");
const membershipPlans = document.getElementById("membershipPlans");
const joinForm = document.getElementById("joinForm");
const joinName = document.getElementById("joinName");
const joinEmail = document.getElementById("joinEmail");
const joinPlan = document.getElementById("joinPlan");
const joinSuccess = document.getElementById("joinSuccess");
const joinSuccessTitle = document.getElementById("joinSuccessTitle");
const ghostName = document.getElementById("ghostName");

const classes = [
  {
    name: "HIIT Storm",
    time: "6:00",
    trainer: "Marcus V.",
    intensity: 5,
    duration: "45 min",
    color: "#FF6B00",
    tag: "Cardio",
    image:
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Iron Strength",
    time: "7:30",
    trainer: "Leah K.",
    intensity: 4,
    duration: "60 min",
    color: "#FFD600",
    tag: "Strength",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Cycle Burn",
    time: "9:00",
    trainer: "Ryan T.",
    intensity: 4,
    duration: "50 min",
    color: "#FF6B00",
    tag: "Cardio",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Yoga Flow",
    time: "10:30",
    trainer: "Sofia M.",
    intensity: 2,
    duration: "60 min",
    color: "#60EFFF",
    tag: "Recovery",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Box Fury",
    time: "12:00",
    trainer: "Dante R.",
    intensity: 5,
    duration: "45 min",
    color: "#FF6B00",
    tag: "Combat",
    image:
      "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Power Lift",
    time: "17:00",
    trainer: "Ana G.",
    intensity: 5,
    duration: "75 min",
    color: "#FFD600",
    tag: "Strength",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
  },
];

const plans = [
  {
    name: "STARTER",
    price: "£29",
    period: "/mo",
    tagline: "Get the basics.",
    features: [
      { text: "Gym Floor Access", included: true },
      { text: "2 Group Classes/Week", included: true },
      { text: "Locker Room Access", included: true },
      { text: "Nutrition Coaching", included: false },
      { text: "Personal Training Sessions", included: false },
      { text: "Unlimited Classes", included: false },
      { text: "Guest Passes (2/mo)", included: false },
      { text: "Priority Booking", included: false },
    ],
    cta: "Get Started",
    color: "#FF6B00",
    elite: false,
  },
  {
    name: "ELITE",
    price: "£79",
    period: "/mo",
    tagline: "The full PowerZone experience.",
    features: [
      { text: "Gym Floor Access", included: true },
      { text: "Unlimited Group Classes", included: true },
      { text: "Locker Room + Sauna", included: true },
      { text: "Nutrition Coaching", included: true },
      { text: "4 Personal Training Sessions", included: true },
      { text: "Unlimited Classes", included: true },
      { text: "Guest Passes (2/mo)", included: true },
      { text: "Priority Booking", included: true },
    ],
    cta: "Go Elite",
    color: "#FFD600",
    elite: true,
  },
  {
    name: "PRO",
    price: "£49",
    period: "/mo",
    tagline: "Level up your training.",
    features: [
      { text: "Gym Floor Access", included: true },
      { text: "Unlimited Group Classes", included: true },
      { text: "Locker Room Access", included: true },
      { text: "Nutrition Coaching", included: true },
      { text: "Personal Training Sessions", included: false },
      { text: "Unlimited Classes", included: true },
      { text: "Guest Passes (2/mo)", included: false },
      { text: "Priority Booking", included: false },
    ],
    cta: "Go Pro",
    color: "#FF6B00",
    elite: false,
  },
];

function handleMouseMove(event) {
  if (!heroBg) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 20;
  const y = (event.clientY / window.innerHeight - 0.5) * 20;
  heroBg.style.transform = `translate(${-x}px, ${-y}px) scale(1.06)`;
}

function scrollToTarget(event) {
  const targetId = event.currentTarget.getAttribute("data-target");
  if (!targetId) return;

  const section = document.getElementById(targetId);
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth" });
}

function createPowerBars(level, color) {
  return Array.from({ length: 5 }, (_, index) => {
    const active = index < level;
    return `<span class="power-bar" style="background:${active ? color : "rgba(255,255,255,0.14)"}"></span>`;
  }).join("");
}

function createClassCard(cls) {
  return `
    <article class="class-card">
      <img class="class-image" src="${cls.image}" alt="${cls.name}">
      <div class="class-time">${cls.time}</div>
      <span class="class-tag" style="background:${cls.color}">${cls.tag}</span>
      <div class="class-body">
        <h3 class="class-name">${cls.name}</h3>
        <div class="class-more">
          <p class="class-meta">with ${cls.trainer} · ${cls.duration}</p>
          <span class="intensity-label">INTENSITY</span>
          <div class="power-bars">${createPowerBars(cls.intensity, cls.color)}</div>
          <button class="book-btn" data-target="join-now" style="background:${cls.color}">BOOK CLASS</button>
        </div>
      </div>
    </article>
  `;
}

function renderClasses() {
  if (!classesStrip) return;
  classesStrip.innerHTML = classes.map(createClassCard).join("");
}

function createPlanFeatures(plan) {
  return plan.features
    .map((feature) => {
      const rowClass = feature.included ? "included" : "excluded";
      const icon = feature.included ? "✓" : "✕";
      const iconStyle = feature.included ? `style="color:${plan.color}"` : "";
      return `
        <li class="plan-feature ${rowClass}">
          <span class="feature-icon" ${iconStyle}>${icon}</span>
          <span class="feature-text">${feature.text}</span>
        </li>
      `;
    })
    .join("");
}

function createPlanCard(plan) {
  return `
    <article class="plan-card ${plan.elite ? "elite" : ""}">
      ${plan.elite ? '<div class="popular-pill">MOST POPULAR</div>' : ""}
      <h3 class="plan-name" style="color:${plan.color}">${plan.name}</h3>
      <p class="plan-tagline">${plan.tagline}</p>
      <div class="plan-price-row">
        <span class="plan-price">${plan.price}</span>
        <span class="plan-period">${plan.period}</span>
      </div>
      <ul class="plan-features">${createPlanFeatures(plan)}</ul>
      <button class="plan-btn ${plan.elite ? "elite" : ""}" data-target="join-now">${plan.cta}</button>
    </article>
  `;
}

function renderMembership() {
  if (!membershipPlans) return;
  membershipPlans.innerHTML = plans.map(createPlanCard).join("");
}

function handleJoinNameInput() {
  if (!ghostName || !joinName) return;
  ghostName.textContent = joinName.value.trim();
}

function handleJoinSubmit(event) {
  event.preventDefault();
  if (!joinForm || !joinName || !joinEmail || !joinPlan || !joinSuccess || !joinSuccessTitle) return;

  const name = joinName.value.trim();
  const email = joinEmail.value.trim();
  const plan = joinPlan.value.trim();

  if (!name || !email || !plan) {
    joinForm.reportValidity();
    return;
  }

  joinSuccessTitle.textContent = `WELCOME, ${name}!`;
  joinSuccess.hidden = false;
  joinForm.hidden = true;
}

function initRevealAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const revealTargets = [
    ".classes-head",
    ".class-card",
    ".membership-head",
    ".plan-card",
    ".join-image-col",
    ".join-form-inner",
    ".footer-brand-col",
    ".footer-links-col",
    ".footer-contact-col",
    ".footer-watermark",
    ".footer-legal",
  ];

  const elements = document.querySelectorAll(revealTargets.join(", "));
  elements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 360)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach((element) => observer.observe(element));
}

renderClasses();
renderMembership();
initRevealAnimations();

window.addEventListener("mousemove", handleMouseMove);
if (joinName) joinName.addEventListener("input", handleJoinNameInput);
if (joinForm) joinForm.addEventListener("submit", handleJoinSubmit);
document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-target]");
  if (!trigger) return;
  scrollToTarget({ currentTarget: trigger });
});
