// ヒーロー上は透明ヘッダー、スクロールしたら白背景にする
(function () {
  const header = document.querySelector(".header");
  if (!header) return;

  const setHeader = () => {
    const y = window.scrollY || 0;
    const solid = y > 24;
    header.classList.toggle("is-solid", solid);
    header.classList.toggle("is-transparent", !solid);
  };

  // 初期状態
  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });
})();
