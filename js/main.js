/* ============================================================
   MAIN.JS — Graphic TECH
   Handles: navbar scroll/mega menu/mobile nav, scroll progress,
            scroll-reveal, portfolio grid render + filter +
            load-more, back-to-top,
            smooth anchor scroll
   ============================================================ */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     NAVBAR: sticky shadow + scroll progress
     ------------------------------------------------------------ */
  const navbar = document.getElementById("navbar");
  const scrollProgress = document.getElementById("scrollProgress");

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle("is-stuck", y > 30);

    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (y / docH) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = pct + "%";

    if (toTop) toTop.classList.toggle("is-visible", y > 480);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ------------------------------------------------------------
     MOBILE NAV
     ------------------------------------------------------------ */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navBackdrop = document.getElementById("navBackdrop");

  function closeMobileNav() {
    navMenu.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navBackdrop.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }

  function toggleMobileNav() {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navBackdrop.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
  }

  if (navToggle) navToggle.addEventListener("click", toggleMobileNav);
  if (navBackdrop) navBackdrop.addEventListener("click", closeMobileNav);

  /* Mega menu: expand-in-place on mobile, hover on desktop (CSS handles hover) */
  document.querySelectorAll(".nav__item").forEach(function (item) {
    const link = item.querySelector(":scope > .nav__link");
    const mega = item.querySelector(".nav__mega");
    if (!link || !mega) return;

    link.addEventListener("click", function (e) {
      if (window.innerWidth > 1220) return; /* desktop uses hover */
      e.preventDefault();
      e.stopImmediatePropagation(); /* block the smooth-scroll handler on this same anchor */
      const isExpanded = item.classList.toggle("is-expanded");
      link.setAttribute("aria-expanded", String(isExpanded));
    });
  });

  /* Close mobile nav when a normal link/anchor inside it is clicked */
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (link.closest(".nav__mega"))
        return; /* mega links handled by detail.js */
      closeMobileNav();
    });
  });

  /* ------------------------------------------------------------
     SCROLL REVEAL (IntersectionObserver)
     ------------------------------------------------------------ */
  const revealSelectors =
    ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade";
  const revealEls = Array.from(document.querySelectorAll(revealSelectors));

  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObs = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Expose a helper other modules (counters.js) can reuse */
  window.GTObserveReveal = function (el) {
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        function (entries, o) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              o.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      obs.observe(el);
    } else {
      el.classList.add("is-visible");
    }
  };

  /* ------------------------------------------------------------
     BACK TO TOP
     ------------------------------------------------------------ */
  const toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  onScroll();



  /* ------------------------------------------------------------
     PORTFOLIO GRID: render, filter, load-more
     ------------------------------------------------------------ */
  const grid = document.getElementById("portfolioGrid");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const collapseBtn = document.getElementById("collapseBtn");
  const filterWrap = document.getElementById("portfolioFilters");

  let activeFilter = "all";
  let rendered = 0;

  /* Map portfolio category -> service detail page (for "ดูรายละเอียด") */
  const CATEGORY_PAGE_MAP = {
    "UI/UX Design": "service-uiux",
    "Graphic Design": "service-graphic",
    "Web Development": "service-web",
    "Digital Marketing": "service-marketing",
    "ERP System": "service-erp",
    Branding: "service-branding",
  };

  function placeholderSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>`;
  }

  function filteredItems() {
    if (typeof PORTFOLIO_ITEMS === "undefined") return [];
    
    let items = PORTFOLIO_ITEMS;
    if (activeFilter !== "all") {
      items = PORTFOLIO_ITEMS.filter(function (item) {
        return item.category === activeFilter;
      });
    }

    // Sort items from smallest to largest height 
    // (Largest ratio = shortest height, smallest ratio = tallest height)
    return items.sort(function(a, b) {
      return (b.ratio || 0) - (a.ratio || 0);
    });
  }

  function renderPortfolioItem(item, isFeaturedSpot) {
    const el = document.createElement("div");
    el.className =
      "portfolio-item reveal-scale" + (isFeaturedSpot ? " span-2" : "");
    el.tabIndex = 0;

    const page = CATEGORY_PAGE_MAP[item.category] || "";
    const hasImg = item.image;

    el.innerHTML = `
      ${hasImg ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : ""}
      <div class="portfolio-placeholder" style="${hasImg ? "display:none" : ""}">
        ${placeholderSvg()}<span>${item.category}</span>
      </div>
      <div class="portfolio-item__overlay">
        <p class="portfolio-item__category">${item.category}</p>
        <p class="portfolio-item__title">${item.title}</p>
        <span class="portfolio-item__link" ${page ? `data-page="${page}"` : ""}>
          ดูรายละเอียด
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>`;

    const img = el.querySelector("img");
    if (img) {
      img.addEventListener("error", function () {
        img.style.display = "none";
        const ph = el.querySelector(".portfolio-placeholder");
        if (ph) ph.style.display = "";
      });
    }

    if (page) {
      el.dataset.page = page;
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", item.title + " — ดูรายละเอียด");
    }

    return el;
  }

  function observeNewReveal(container) {
    container
      .querySelectorAll(".reveal-scale:not(.is-visible)")
      .forEach(function (el) {
        window.GTObserveReveal(el);
      });
  }

  function renderBatch(reset) {
    if (!grid || typeof PORTFOLIO_ITEMS === "undefined") return;
    if (reset) {
      grid.innerHTML = "";
      rendered = 0;
    }
    const items = filteredItems();
    const pageSize =
      typeof PORTFOLIO_PAGE_SIZE !== "undefined" ? PORTFOLIO_PAGE_SIZE : 6;
    const batch = items.slice(rendered, rendered + pageSize);

    batch.forEach(function (item, i) {
      const globalIndex = rendered + i;
      const isFeaturedSpot = false; // Removed featured spot to align all cards equally
      grid.appendChild(renderPortfolioItem(item, isFeaturedSpot));
    });
    rendered += batch.length;
    observeNewReveal(grid);

    if (loadMoreBtn && collapseBtn) {
      if (rendered >= items.length) {
        loadMoreBtn.style.display = "none";
        collapseBtn.style.display = items.length > pageSize ? "inline-block" : "none";
      } else {
        loadMoreBtn.style.display = "";
        collapseBtn.style.display = "none";
      }
    }
  }

  if (grid) renderBatch(true);
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      renderBatch(false);
    });
  }
  
  if (collapseBtn) {
    collapseBtn.addEventListener("click", function () {
      renderBatch(true);
      const offset = grid.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  }

  if (filterWrap) {
    filterWrap.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterWrap.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      activeFilter = btn.dataset.filter || "all";
      renderBatch(true);
    });
  }

  /* ------------------------------------------------------------
     SMOOTH SCROLL for in-page anchors
     ------------------------------------------------------------ */
  document
    .querySelectorAll('a[href^="#"]:not([data-page])')
    .forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  /* ═════════ REUSABLE SLIDER LOGIC ═════════ */
  function initSlider({ trackId, dotsId, nextBtnId, prevBtnId, isDynamic = false }) {
    const track = document.getElementById(trackId);
    const dotsContainer = document.getElementById(dotsId);
    if (!track || !dotsContainer) return;

    // สำหรับแบนเนอร์หน้าแรกที่มีการโหลดจาก LocalStorage
    if (isDynamic) {
      const savedBanners = JSON.parse(localStorage.getItem("gt_banners")) || [];
      if (savedBanners.length > 0) {
        track.innerHTML = "";
        savedBanners.forEach((imgSrc) => {
          const slide = document.createElement("div");
          slide.className = "slide";
          slide.innerHTML = `<img src="${imgSrc}" alt="Dynamic Banner">`;
          track.appendChild(slide);
        });
      }
    }

    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    const nextBtn = document.getElementById(nextBtnId);
    const prevBtn = document.getElementById(prevBtnId);

    let currentIndex = 0;
    let slideInterval;

    // สร้างจุดไข่ปลา (Dots)
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = `slider-dot ${i === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.children);

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) =>
        dot.classList.toggle("active", i === currentIndex)
      );
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
      resetInterval();
    }

    function startInterval() {
      slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetInterval();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetInterval();
      });
    }

    // Swipe and Drag Support (Mouse & Touch)
    let startX = 0;
    let endX = 0;
    track.style.touchAction = 'pan-y'; 

    track.addEventListener('pointerdown', (e) => {
      startX = e.clientX;
      clearInterval(slideInterval);
    });

    track.addEventListener('pointerup', (e) => {
      endX = e.clientX;
      const threshold = 40;
      if (startX - endX > threshold) {
        nextSlide();
      } else if (endX - startX > threshold) {
        prevSlide();
      }
      resetInterval();
    });

    startInterval();
  }

  document.addEventListener("DOMContentLoaded", () => {
    // 1. Slider หน้าแรก
    initSlider({
      trackId: "sliderTrack",
      dotsId: "sliderDots",
      nextBtnId: "sliderNext",
      prevBtnId: "sliderPrev",
      isDynamic: true
    });

    // 2. Portfolio Slider (หน้าที่เป็น UI/UX, etc.)
    initSlider({
      trackId: "portfolioSliderTrack",
      dotsId: "portfolioSliderDots",
      nextBtnId: "portfolioSliderNext",
      prevBtnId: "portfolioSliderPrev",
      isDynamic: false
    });
  });
})();
