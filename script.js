document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Initializing modern mobile app features")

  // Loading screen
  const loading = document.getElementById("loading")
  window.addEventListener("load", () => {
    setTimeout(() => {
      loading.classList.add("hidden")
    }, 1000)
  })

  // Mobile navigation
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active")
    navMenu.classList.toggle("active")
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : ""
  })

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active")
      navMenu.classList.remove("active")
      document.body.style.overflow = ""
    })
  })

  // Initialize Locomotive Scroll
  const LocomotiveScroll = window.LocomotiveScroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    multiplier: 1,
    class: "is-revealed",
    smartphone: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
  })

  // Update ScrollTrigger when Locomotive Scroll updates
  const ScrollTrigger = window.gsap.ScrollTrigger
  scroll.on("scroll", ScrollTrigger.update)

  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return value !== undefined ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
    },
    pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed",
  })

  // GSAP Animations
  const gsap = window.gsap
  gsap.registerPlugin(ScrollTrigger)

  // Hero animations
  const heroTl = gsap.timeline()
  heroTl
    .from(".hero-title", {
      duration: 1.2,
      y: 100,
      opacity: 0,
      ease: "power3.out",
    })
    .from(
      ".hero-description",
      {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.8",
    )
    .from(
      ".hero-buttons .btn",
      {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.6",
    )
    .from(
      ".stat-item",
      {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.4",
    )

  // Section animations
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        scroller: "[data-scroll-container]",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    })
  })

  // Card animations
  gsap.utils.toArray(".service-card, .team-card, .pricing-card, .feature-item").forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        scroller: "[data-scroll-container]",
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    })
  })

  // Contact items animation
  gsap.utils.toArray(".contact-item").forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        scroller: "[data-scroll-container]",
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      x: index % 2 === 0 ? -50 : 50,
      opacity: 0,
      ease: "power3.out",
    })
  })

  // Button hover animations
  gsap.utils.toArray(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        duration: 0.3,
        scale: 1.05,
        ease: "power2.out",
      })
    })

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        duration: 0.3,
        scale: 1,
        ease: "power2.out",
      })
    })
  })

  // Initialize Swiper for mobile services
  let servicesSwiper

  function initSwiper() {
    if (window.innerWidth <= 768 && !servicesSwiper) {
      // Show mobile swiper, hide desktop grid
      document.querySelector(".services-swiper").style.display = "block"
      document.querySelector(".services-grid").style.display = "none"

      const Swiper = window.Swiper
      servicesSwiper = new Swiper(".services-swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 1.2,
            spaceBetween: 30,
          },
        },
        effect: "coverflow",
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        loop: true,
      })
    } else if (window.innerWidth > 768) {
      // Show desktop grid, hide mobile swiper
      document.querySelector(".services-swiper").style.display = "none"
      document.querySelector(".services-grid").style.display = "grid"

      if (servicesSwiper) {
        servicesSwiper.destroy(true, true)
        servicesSwiper = null
      }
    }
  }

  // Initialize on load
  initSwiper()

  // Reinitialize on resize
  window.addEventListener("resize", () => {
    initSwiper()
    scroll.update()
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        scroll.scrollTo(target, {
          offset: -80,
          duration: 1000,
          easing: [0.25, 0.0, 0.35, 1.0],
        })
      }
    })
  })

  // Form submission with animation
  const contactForm = document.getElementById("contact-form")
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const submitBtn = this.querySelector(".btn-primary")
    const originalText = submitBtn.textContent

    // Animate button
    gsap.to(submitBtn, {
      duration: 0.3,
      scale: 0.95,
      ease: "power2.out",
      onComplete: () => {
        submitBtn.textContent = "Sending..."
        submitBtn.disabled = true

        // Simulate form submission
        setTimeout(() => {
          submitBtn.textContent = "Message Sent!"
          gsap.to(submitBtn, {
            duration: 0.3,
            scale: 1,
            backgroundColor: "#10b981",
            ease: "power2.out",
          })

          // Reset form
          setTimeout(() => {
            this.reset()
            submitBtn.textContent = originalText
            submitBtn.disabled = false
            gsap.to(submitBtn, {
              duration: 0.3,
              backgroundColor: "var(--primary-color)",
              ease: "power2.out",
            })
          }, 2000)
        }, 1500)
      },
    })
  })

  // Parallax effect for hero background
  gsap.to(".hero-section::before", {
    scrollTrigger: {
      trigger: ".hero-section",
      scroller: "[data-scroll-container]",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    y: -100,
    ease: "none",
  })

  // Counter animation for stats
  gsap.utils.toArray(".stat-number").forEach((stat) => {
    const finalValue = stat.textContent
    const numericValue = Number.parseInt(finalValue.replace(/\D/g, ""))

    ScrollTrigger.create({
      trigger: stat,
      scroller: "[data-scroll-container]",
      start: "top 80%",
      onEnter: () => {
        gsap.from(
          { value: 0 },
          {
            duration: 2,
            value: numericValue,
            ease: "power2.out",
            onUpdate: function () {
              const currentValue = Math.round(this.targets()[0].value)
              if (finalValue.includes("+")) {
                stat.textContent = currentValue + "+"
              } else if (finalValue.includes("%")) {
                stat.textContent = currentValue + "%"
              } else {
                stat.textContent = currentValue
              }
            },
          },
        )
      },
    })
  })

  // Header scroll effect
  ScrollTrigger.create({
    trigger: ".hero-section",
    scroller: "[data-scroll-container]",
    start: "bottom top",
    end: "bottom top",
    onEnter: () => {
      gsap.to(".header", {
        duration: 0.3,
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        ease: "power2.out",
      })
    },
    onLeaveBack: () => {
      gsap.to(".header", {
        duration: 0.3,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        boxShadow: "none",
        ease: "power2.out",
      })
    },
  })

  // Refresh ScrollTrigger after all animations are set
  ScrollTrigger.addEventListener("refresh", () => scroll.update())
  ScrollTrigger.refresh()

  console.log("[v0] Modern mobile app initialization complete")
})

// Handle resize events
window.addEventListener("resize", () => {
  const ScrollTrigger = window.gsap.ScrollTrigger
  ScrollTrigger.refresh()
})

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--transition", "all 0.2s ease")
}


// Open popup
document.getElementById('getStartedBtn').addEventListener('click', () => {
  document.getElementById('estimatePopup').style.display = 'flex';
});

// Close popup
document.getElementById('closeEstimate').addEventListener('click', () => {
  document.getElementById('estimatePopup').style.display = 'none';
});

// Popup estimate logic
(function(){
  const PRICING = {
    basic: [15000, 25000],
    business: [30000, 50000],
    ecom: [60000, 120000],
    webapp: [80000, 250000],
    android: [70000, 200000],
    ios: [90000, 250000],
    hybrid: [100000, 300000]
  };

  const serviceBtns = Array.from(document.querySelectorAll('#popupServices .service-btn'));
  const estimateValue = document.getElementById('popupEstimateValue');
  let selected = null;

  serviceBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      serviceBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      selected = btn.dataset.key;
      updateEstimate();
    });
  });

  function formatINR(n){ return '₹' + n.toLocaleString('en-IN'); }
  function updateEstimate(){
    if(!selected){ estimateValue.innerText = 'Select a service to see estimate'; return; }
    const [min,max] = PRICING[selected] || [0,0];
    estimateValue.innerText = `${formatINR(min)} – ${formatINR(max)} (approx.)`;
  }
})();





