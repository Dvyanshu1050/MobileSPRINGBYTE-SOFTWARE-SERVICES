// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".navbar", {
  y: -80,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out"
});

gsap.from(".section-title", {
  opacity: 0,
  y: 40,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".section-title",
    start: "top 80%"
  }
});

gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 0.6,
    delay: i * 0.2,
    scrollTrigger: {
      trigger: card,
      start: "top 85%"
    }
  });
});

// Dynamic year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Open link function
function openLink(url) {
  window.open(url, "_blank");
}
