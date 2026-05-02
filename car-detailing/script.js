const hero = document.getElementById("hero");
const radial = document.getElementById("bg-radial");
const ring = document.getElementById("cursor-ring");
const dot = document.getElementById("cursor-dot");
const heroCar = document.getElementById("hero-car");
const heroCarImg = heroCar?.querySelector("img");

const carMotionOk = () =>
  window.matchMedia("(min-width: 861px)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (hero && radial && ring && dot) {
  let carX = 0;
  let carY = 0;
  let carTx = 0;
  let carTy = 0;
  let carRaf = 0;

  const carRestAnchor = () => {
    const w = hero.clientWidth || 1;
    const h = hero.clientHeight || 1;
    return { x: w * 0.63, y: h * 0.4 + 150 };
  };

  const syncCarDom = () => {
    if (!heroCarImg) return;
    heroCarImg.style.left = `${carX}px`;
    heroCarImg.style.top = `${carY}px`;
  };

  const placeCarAtRest = () => {
    const r = carRestAnchor();
    carX = carTx = r.x;
    carY = carTy = r.y;
    syncCarDom();
  };

  /** Small parallax drift from anchor (not cursor tracking). nx, ny ∈ [-1, 1]. */
  const parallaxTarget = (rect, clientX, clientY) => {
    const anchor = carRestAnchor();
    const nx = (clientX - rect.left) / rect.width - 0.5;
    const ny = (clientY - rect.top) / rect.height - 0.5;
    const maxShiftX = Math.min(38, rect.width * 0.021);
    const maxShiftY = Math.min(30, rect.height * 0.018);
    return {
      x: anchor.x + nx * 2 * maxShiftX,
      y: anchor.y + ny * 2 * maxShiftY,
    };
  };

  const stepCar = () => {
    if (!carMotionOk() || !heroCarImg) {
      carRaf = 0;
      return;
    }
    const dx = carTx - carX;
    const dy = carTy - carY;
    if (Math.abs(dx) > 0.12 || Math.abs(dy) > 0.12) {
      carX += dx * 0.017;
      carY += dy * 0.017;
      syncCarDom();
      carRaf = requestAnimationFrame(stepCar);
    } else {
      carX = carTx;
      carY = carTy;
      syncCarDom();
      carRaf = 0;
    }
  };

  const requestCarTick = () => {
    if (!carMotionOk() || !heroCarImg) return;
    if (!carRaf) {
      carRaf = requestAnimationFrame(stepCar);
    }
  };

  const setMouseEffects = (clientX, clientY) => {
    const rect = hero.getBoundingClientRect();
    const xPct = ((clientX - rect.left) / rect.width) * 100;
    const yPct = ((clientY - rect.top) / rect.height) * 100;

    radial.style.background = `
      radial-gradient(ellipse 52% 45% at ${xPct}% ${yPct}%, rgba(45, 102, 255, 0.28) 0%, transparent 70%),
      radial-gradient(ellipse 78% 58% at 78% 20%, rgba(99, 74, 230, 0.12) 0%, transparent 60%),
      radial-gradient(ellipse 52% 48% at 24% 82%, rgba(20, 90, 220, 0.16) 0%, transparent 62%)
    `;

    ring.style.left = `${clientX - rect.left}px`;
    ring.style.top = `${clientY - rect.top}px`;
    dot.style.left = `${clientX - rect.left}px`;
    dot.style.top = `${clientY - rect.top}px`;

    if (heroCarImg && carMotionOk()) {
      const p = parallaxTarget(rect, clientX, clientY);
      carTx = p.x;
      carTy = p.y;
      requestCarTick();
    }
  };

  hero.addEventListener("mousemove", (e) => {
    setMouseEffects(e.clientX, e.clientY);
  });

  hero.addEventListener("mouseleave", () => {
    ring.style.opacity = "0";
    dot.style.opacity = "0";
    if (heroCarImg && carMotionOk()) {
      const r = carRestAnchor();
      carTx = r.x;
      carTy = r.y;
      requestCarTick();
    }
  });

  hero.addEventListener("mouseenter", () => {
    ring.style.opacity = "1";
    dot.style.opacity = "1";
  });

  window.addEventListener("resize", () => {
    if (!carMotionOk()) {
      cancelAnimationFrame(carRaf);
      carRaf = 0;
      return;
    }
    const r = carRestAnchor();
    carTx = r.x;
    carTy = r.y;
    carX = r.x;
    carY = r.y;
    syncCarDom();
  });

  if (heroCarImg) {
    placeCarAtRest();
  }
}

function animateCount(el, target, duration = 1800) {
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.floor(progress * target);
    el.textContent = String(current);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll("[data-target]");
setTimeout(() => {
  counters.forEach((counter, i) => {
    const target = Number(counter.getAttribute("data-target") || 0);
    const duration = [2200, 1800, 1200, 1000][i] || 1600;
    animateCount(counter, target, duration);
  });
}, 600);

const scrollButtons = document.querySelectorAll("[data-scroll]");
const topNav = document.getElementById("top-nav");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const setNavScrolled = () => {
  if (!topNav) return;
  topNav.classList.toggle("is-scrolled", window.scrollY > 40);
};

setNavScrolled();
window.addEventListener("scroll", setNavScrolled);

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    mobileMenu.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

scrollButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSelector = btn.getAttribute("data-scroll");
    if (!targetSelector) return;
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (menuToggle && mobileMenu) {
      menuToggle.classList.remove("is-open");
      mobileMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const revealCards = document.querySelectorAll(".reveal-card");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealCards.forEach((card) => {
    card.style.transitionDelay = "0ms";
    observer.observe(card);
  });
} else {
  revealCards.forEach((card) => card.classList.add("is-visible"));
}

const bookingForm = document.getElementById("booking-form");
if (bookingForm) {
  const bookingSteps = Array.from(bookingForm.querySelectorAll(".booking-step"));
  const stepLabels = Array.from(document.querySelectorAll("[data-step-label]"));
  const progressFill = document.getElementById("booking-progress-fill");
  const progressCar = document.getElementById("booking-progress-car");
  const nextBtn = document.getElementById("booking-next");
  const backBtn = document.getElementById("booking-back");
  let currentStep = 0;

  const requiredStep0 = ["name", "phone", "email", "make", "model", "year"];

  const updateProgress = () => {
    const progress = (currentStep / 2) * 100;
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (progressCar) progressCar.style.left = `${progress}%`;

    stepLabels.forEach((label, index) => {
      label.classList.toggle("is-active", index <= currentStep);
    });
  };

  const showStep = (step) => {
    bookingSteps.forEach((el, idx) => el.classList.toggle("is-visible", idx === step));
    currentStep = step;
    updateProgress();
  };

  const validateStep0 = () => {
    let valid = true;
    requiredStep0.forEach((name) => {
      const input = bookingForm.elements.namedItem(name);
      if (!(input instanceof HTMLInputElement)) return;
      const isFieldValid = input.value.trim().length > 0;
      input.style.borderColor = isFieldValid ? "#d8dce7" : "#d9534f";
      valid = valid && isFieldValid;
    });
    return valid;
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (validateStep0()) showStep(1);
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => showStep(0));
  }

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedService = bookingForm.querySelector("input[name='service']:checked");
    if (!selectedService) return;
    showStep(2);
  });

  showStep(0);
}
