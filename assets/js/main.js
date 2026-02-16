// ===== ヘッダー：ヒーロー上は透明、スクロールで白背景 =====
(function () {
  const header = document.querySelector(".header");
  if (!header) return;

  const setHeader = () => {
    const y = window.scrollY || 0;
    const solid = y > 24;
    header.classList.toggle("is-solid", solid);
    header.classList.toggle("is-transparent", !solid);
  };

  header.classList.add("is-transparent");
  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });
})();


// ===== Practice：カードクリックで詳細モーダル =====
(function () {
  const modal = document.getElementById("lessonModal");
  if (!modal) return; // Practice以外のページでは何もしない

  const titleEl = document.getElementById("modalTitle");
  const kickerEl = document.getElementById("modalKicker");
  const metaEl = document.getElementById("modalMeta");
  const textEl = document.getElementById("modalText");

  const openButtons = document.querySelectorAll(".lesson-open");
  const closeTargets = modal.querySelectorAll("[data-modal-close]");

  // ここを編集すれば、文章を自由に変えられます
  const LESSONS = {
    relax: {
      kicker: "Relax Yoga",
      title: "リラックスヨガ",
      meta: ["初心者OK", "60分", "呼吸中心", "ゆったり"],
      html: `
        <p>呼吸を整えながら、緊張しやすい肩・首・背中をやさしくほどくクラスです。</p>
        <ul>
          <li>その日の状態に合わせて、無理なく動きます</li>
          <li>終わった後に「ふっと軽くなる」感覚を大切にします</li>
        </ul>
        <p><strong>おすすめ：</strong>疲れがたまっている／眠りが浅い／気持ちが落ち着かない時に</p>
      `
    },
    power: {
      kicker: "Power Yoga",
      title: "パワーヨガ",
      meta: ["運動量多め", "45〜60分", "体幹", "集中"],
      html: `
        <p>呼吸に合わせて動くフローで、体力・集中力・体幹を整えていきます。</p>
        <ul>
          <li>姿勢を支える筋力や、安定した軸づくりを目指します</li>
          <li>ポーズは段階的に調整するので、安心して挑戦できます</li>
        </ul>
        <p><strong>おすすめ：</strong>すっきり動きたい／運動習慣を作りたい／姿勢を整えたい方へ</p>
      `
    },
    maternity: {
      kicker: "Maternity Yoga",
      title: "マタニティヨガ",
      meta: ["安定期以降", "45〜60分", "やさしい", "呼吸"],
      html: `
        <p>妊娠中の身体の変化に寄り添いながら、呼吸とやさしい動きで整えるクラスです。</p>
        <ul>
          <li>腰まわりや背中のこわばりをやわらげます</li>
          <li>出産に向けた呼吸・リラックスを練習します</li>
        </ul>
        <p><strong>注意：</strong>体調や医師の指示に合わせて無理なく行います。ご不安があれば事前にご相談ください。</p>
      `
    },
    private: {
      kicker: "Private Lesson",
      title: "プライベートレッスン",
      meta: ["マンツーマン", "60分", "目的別", "相談可"],
      html: `
        <p>目的や体調に合わせて、あなた専用のレッスン内容を組み立てます。</p>
        <ul>
          <li>姿勢改善／肩こり／腰の重さ／リラックス／体力づくり など</li>
          <li>「何から始めたらいいか分からない」方にもおすすめです</li>
        </ul>
        <p><strong>流れ：</strong>事前に簡単なヒアリング → 当日の状態に合わせてレッスン</p>
      `
    }
  };

  let lastFocus = null;

  function openModal(key) {
    const data = LESSONS[key];
    if (!data) return;

    lastFocus = document.activeElement;

    kickerEl.textContent = data.kicker;
    titleEl.textContent = data.title;

    metaEl.innerHTML = data.meta.map(t => `<span class="pill">${t}</span>`).join("");
    textEl.innerHTML = data.html;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // フォーカスを閉じるボタンへ
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.lesson;
      openModal(key);
    });
  });

  closeTargets.forEach(el => {
    el.addEventListener("click", closeModal);
  });

  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
  });
})();
// =========================
// Overlay Menu (Hamburger)
// =========================
(function () {
  const menuBtn = document.querySelector(".menu-btn");
  const overlay = document.getElementById("overlayMenu");
  const closeBtn = overlay?.querySelector(".overlay-menu__close");

  if (!menuBtn || !overlay || !closeBtn) return;

  const openMenu = () => {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("is-menu-open");
  };

  const closeMenu = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-menu-open");
  };

  menuBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  // 背景タップで閉じる（nav以外を押したら閉じる）
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeMenu();
  });

  // リンク押したら閉じる
  overlay.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // Escで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      closeMenu();
    }
  });
})();
