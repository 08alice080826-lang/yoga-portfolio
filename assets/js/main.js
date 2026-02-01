// Header: transparent on top, solid after scroll
(function () {
  const header = document.querySelector(".header");
  if (!header) return;

  const setHeader = () => {
    const y = window.scrollY || 0;
    const solid = y > 24;
    header.classList.toggle("is-solid", solid);
    header.classList.toggle("is-transparent", !solid);
  };

  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });

  // footer year
  const yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
