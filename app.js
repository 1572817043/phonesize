// ===== i18n =====
const I18N = {
  zh: {
    // 校准弹窗
    m_title1: "什么情况",
    m_title2: " 你在手机上查看手机尺寸？！",
    m_desc: "兄弟，你手上拿的那个就是手机啊",
    m_hint: "请用电脑或笔记本打开本站",
    s1_title: "我们需要知道你屏幕的 PPI",
    s1_desc: "屏幕像素密度（PPI）决定了显示的真实物理尺寸，我们需要这个值来还原手机实际大小。",
    s1_know: "我知道",
    s1_know_desc: "直接输入 PPI",
    s1_dont_know: "我不知道",
    s1_dont_know_desc: "帮你计算 PPI",
    back: "← 返回",
    sk_title: "输入你的屏幕 PPI",
    sk_desc: "可以在屏幕参数页面或 displaySpecifications 网站查到。",
    sk_placeholder: "例如 220",
    confirm: "确认",
    sc_title: "帮你计算 PPI",
    sc_desc: "选择一种方式来获取你的屏幕 PPI。",
    tab_screen: "输入屏幕尺寸",
    tab_card: "银行卡校准",
    screen_label: "你的屏幕对角线尺寸是",
    screen_placeholder: "例如 15.6",
    inch: "英寸",
    card_hint: "请将银行卡（长 85.6mm）贴在屏幕上，拖动滑块使下方卡片与实物重合。",
    card_name: "银行卡",
    card_confirm: "确认校准",
    // 主界面
    title: "手机尺寸可视化",
    rotate_landscape: "切换横屏",
    rotate_portrait: "切换竖屏",
    ppi_label: "当前 PPI",
    recalibrate: "重新校准",
    select_phone: "选择常见手机",
    search_placeholder: "搜索手机型号...",
    or: "或",
    custom_size: "自定义尺寸",
    width: "宽度",
    height: "高度",
    display: "显示",
    custom_label: "自定义",
    custom_cancel: "取消展示",
    fold_unfolded: "展开",
    fold_folded: "折叠",
    placeholder: "请先校准屏幕，然后选择手机或输入尺寸",
    // Toast
    toast_ppi_invalid: "请输入有效的 PPI（50-1000）",
    toast_screen_invalid: "请输入有效的屏幕尺寸（5-100 英寸）",
    toast_custom_invalid: "请输入有效的宽度和高度",
    // 对比
    compare_clear: "清空对比",
    compare_already: "该手机已在对比中",
    compare_already_showing: "该手机已在尺寸框中显示",
    compare_max: "最多对比 6 款手机",
  },
  en: {
    // Calibration modal
    m_title1: "Wait what",
    m_title2: "You're checking phone sizes... on a phone?!",
    m_desc: "Dude, the phone is literally in your hand",
    m_hint: "Please open this site on a computer or laptop",
    s1_title: "We need your screen's PPI",
    s1_desc: "Screen pixel density (PPI) determines the real physical size displayed. We need this value to render phones at their actual size.",
    s1_know: "I know it",
    s1_know_desc: "Enter PPI directly",
    s1_dont_know: "I don't know",
    s1_dont_know_desc: "Help me calculate PPI",
    back: "← Back",
    sk_title: "Enter your screen PPI",
    sk_desc: "You can find it on your screen specs page or displaySpecifications website.",
    sk_placeholder: "e.g. 220",
    confirm: "Confirm",
    sc_title: "Calculate PPI for you",
    sc_desc: "Choose a method to get your screen PPI.",
    tab_screen: "Screen size",
    tab_card: "Credit card calibrate",
    screen_label: "Your screen diagonal size is",
    screen_placeholder: "e.g. 15.6",
    inch: "inches",
    card_hint: "Place a credit card (85.6mm long) on your screen, drag the slider until the card below matches the real one.",
    card_name: "Credit Card",
    card_confirm: "Confirm calibration",
    // Main interface
    title: "Phone Size Visualizer",
    rotate_landscape: "Landscape",
    rotate_portrait: "Portrait",
    ppi_label: "Current PPI",
    recalibrate: "Recalibrate",
    select_phone: "Select a phone",
    search_placeholder: "Search phone model...",
    or: "or",
    custom_size: "Custom size",
    width: "Width",
    height: "Height",
    display: "Display",
    custom_label: "Custom",
    custom_cancel: "Cancel",
    fold_unfolded: "Unfolded",
    fold_folded: "Folded",
    placeholder: "Calibrate your screen first, then select a phone or enter dimensions",
    // Toast
    toast_ppi_invalid: "Please enter a valid PPI (50-1000)",
    toast_screen_invalid: "Please enter a valid screen size (5-100 inches)",
    toast_custom_invalid: "Please enter valid width and height",
    // Compare
    compare_clear: "Clear all",
    compare_already: "Already in comparison",
    compare_already_showing: "Already displayed",
    compare_max: "Max 6 phones at once",
  }
};

let currentLang = localStorage.getItem("lang") || "zh";

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = lang === "zh" ? "手机尺寸可视化" : "Phone Size Visualizer";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (I18N[lang][key] !== undefined) {
      el.textContent = I18N[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (I18N[lang][key] !== undefined) {
      el.placeholder = I18N[lang][key];
    }
  });
}

function t(key) {
  return I18N[currentLang][key] || key;
}

// 手机端检测
if (window.innerWidth < 768) {
  document.getElementById("mobileBlock").style.display = "flex";
  setLang(currentLang);
  document.getElementById("langBtnMobile").addEventListener("click", () => {
    setLang(currentLang === "zh" ? "en" : "zh");
  });
  throw new Error("Mobile detected");
}

const CARD_WIDTH_MM = 85.6;
const CARD_HEIGHT_MM = 53.98;
const CARD_RATIO = CARD_HEIGHT_MM / CARD_WIDTH_MM;
const MM_PER_INCH = 25.4;

let ppi = null;
let currentBrand = null;
let currentPhone = null;
let isLandscape = false;
let isCustomPhone = false;

// Toast 提示
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2000);
}

// 语言切换
function toggleLang() {
  setLang(currentLang === "zh" ? "en" : "zh");
  if (currentPhone) {
    rotateBtn.textContent = isLandscape ? t("rotate_portrait") : t("rotate_landscape");
  }
  if (customConfirm.classList.contains("btn-cancel")) {
    customConfirm.textContent = t("custom_cancel");
  }
  if (appInitialized) renderPhoneList();
}

document.getElementById("langBtnModal").addEventListener("click", toggleLang);
document.getElementById("langBtnHeader").addEventListener("click", toggleLang);

// 初始化语言
setLang(currentLang);

// ===== 校准弹窗逻辑 =====
const modal = document.getElementById("calibrationModal");
const mainApp = document.getElementById("mainApp");

// 步骤导航
function showStep(id) {
  document.querySelectorAll(".step").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("iKnowBtn").addEventListener("click", () => showStep("step-know"));
document.getElementById("iDontKnowBtn").addEventListener("click", () => showStep("step-calc"));
document.getElementById("backFromKnow").addEventListener("click", () => showStep("step1"));
document.getElementById("backFromCalc").addEventListener("click", () => showStep("step1"));

// Tab 切换
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});

// 直接输入 PPI
document.getElementById("ppiConfirm").addEventListener("click", () => {
  const val = parseFloat(document.getElementById("ppiInput").value);
  if (!val || val < 50 || val > 1000) {
    showToast(t("toast_ppi_invalid"));
    return;
  }
  ppi = val;
  finishCalibration();
});

// 路径1：输入屏幕尺寸
document.getElementById("screenSizeConfirm").addEventListener("click", () => {
  const inch = parseFloat(document.getElementById("screenInchInput").value);
  if (!inch || inch < 5 || inch > 100) {
    showToast(t("toast_screen_invalid"));
    return;
  }
  const w = screen.width * window.devicePixelRatio;
  const h = screen.height * window.devicePixelRatio;
  const diagPixels = Math.sqrt(w ** 2 + h ** 2);
  ppi = diagPixels / inch;
  finishCalibration();
});

// 路径2：银行卡校准
const cardSlider = document.getElementById("cardSlider");
const cardPreview = document.getElementById("cardPreview");
const sliderValue = document.getElementById("sliderValue");

// 滑块范围动态适配 DPI，物理范围约 40mm ~ 90mm
cardSlider.max = Math.round(360 * window.devicePixelRatio);
cardSlider.value = Math.round(200 * window.devicePixelRatio);

function updateCardPreview() {
  const w = cardSlider.value;
  const h = Math.round(w * CARD_RATIO);
  cardPreview.style.width = w + "px";
  cardPreview.style.height = h + "px";
  sliderValue.textContent = w + "px";
}

cardSlider.addEventListener("input", updateCardPreview);
updateCardPreview();

document.getElementById("cardConfirm").addEventListener("click", () => {
  const cardWidthPx = parseFloat(cardSlider.value) * window.devicePixelRatio;
  ppi = cardWidthPx / (CARD_WIDTH_MM / MM_PER_INCH);
  finishCalibration();
});

// Enter 键确认
document.getElementById("ppiInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("ppiConfirm").click();
});
document.getElementById("screenInchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("screenSizeConfirm").click();
});
document.getElementById("customWidth").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("customConfirm").click();
});
document.getElementById("customHeight").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("customConfirm").click();
});

// 校准完成
function finishCalibration() {
  document.getElementById("ppiValue").textContent = ppi.toFixed(1);
  modal.style.display = "none";
  mainApp.style.display = "block";
  initMainApp();
  // 重新校准后用新 PPI 刷新当前手机
  if (currentPhone) drawPhone();
}

// 重新校准
document.getElementById("recalibrateBtn").addEventListener("click", () => {
  modal.style.display = "flex";
  showStep("step1");
});

// 点击弹窗外部关闭（仅重新校准时）
modal.addEventListener("click", (e) => {
  if (e.target === modal && appInitialized) modal.style.display = "none";
});

// ===== 主界面逻辑 =====
let appInitialized = false;

function initMainApp() {
  if (appInitialized) return;
  appInitialized = true;
  renderBrandTabs();
  const brands = [...new Set(PHONES.map((p) => p.brand))];
  selectBrand(brands[0]);
}

// 渲染品牌标签
function renderBrandTabs() {
  const container = document.getElementById("brandTabs");
  const brands = [...new Set(PHONES.map((p) => p.brand))];
  container.innerHTML = brands
    .map((b) => `<button class="brand-tab" data-brand="${b}">${b}</button>`)
    .join("");

  container.querySelectorAll(".brand-tab").forEach((btn) => {
    btn.addEventListener("click", () => selectBrand(btn.dataset.brand));
  });
}

// 选择品牌
function selectBrand(brand) {
  currentBrand = brand;
  document.querySelectorAll(".brand-tab").forEach((b) => {
    b.classList.toggle("active", b.dataset.brand === brand);
  });
  phoneSearch.value = "";
  document.getElementById("phoneList").scrollTop = 0;
  renderPhoneList();
}

// 搜索过滤
const phoneSearch = document.getElementById("phoneSearch");
phoneSearch.addEventListener("input", renderPhoneList);

// 渲染手机列表
function renderPhoneList() {
  const container = document.getElementById("phoneList");
  const keyword = phoneSearch.value.trim().toLowerCase().replace(/\s+/g, "");
  const phones = PHONES.filter((p) => p.brand === currentBrand &&
    (!keyword || p.model.toLowerCase().replace(/\s+/g, "").includes(keyword)));
  container.innerHTML = phones
    .map((p) => {
      const inCompare = comparePhones.find((c) => c.model === p.model);
      const foldMatch = p.model.match(/(.*?)(（折叠）|（展开）)$/);
      const displayName = foldMatch ? foldMatch[1] : p.model;
      const isFolded = foldMatch && foldMatch[2] === "（折叠）";
      const foldTag = foldMatch
        ? `<span class="phone-fold-tag${isFolded ? " folded" : ""}">${isFolded ? t("fold_folded") : t("fold_unfolded")}</span>`
        : "";
      return `
      <div class="phone-item" data-model="${p.model}">
        <div class="phone-item-info">
          <div>${displayName} ${foldTag} <span class="phone-inch">${p.screen}"</span></div>
          <div class="phone-size">${p.width} x ${p.height} mm</div>
        </div>
        <button class="btn-compare-add${inCompare ? " in-compare" : ""}" data-model="${p.model}">${inCompare ? "−" : "+"}</button>
      </div>`;
    })
    .join("");

  container.querySelectorAll(".phone-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-compare-add")) return;
      if (item.classList.contains("active")) {
        item.classList.remove("active");
        hidePhone();
        return;
      }
      const phone = PHONES.find((p) => p.model === item.dataset.model);
      if (phone && comparePhones.find((p) => p.model === phone.model)) {
        showToast(t("compare_already"));
        return;
      }
      container.querySelectorAll(".phone-item").forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      if (phone) {
        isCustomPhone = false;
        resetCustomBtn();
        renderPhone(phone.model, phone.width, phone.height, phone.screen);
      }
    });
  });

  container.querySelectorAll(".btn-compare-add").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const phone = PHONES.find((p) => p.model === btn.dataset.model);
      if (!phone) return;
      if (btn.classList.contains("in-compare")) {
        removeFromCompare(phone.model);
      } else {
        addToCompare(phone);
      }
    });
  });
}

// 自定义尺寸
const customConfirm = document.getElementById("customConfirm");

customConfirm.addEventListener("click", () => {
  if (isCustomPhone) {
    hidePhone();
    resetCustomBtn();
    return;
  }
  const w = parseFloat(document.getElementById("customWidth").value);
  const h = parseFloat(document.getElementById("customHeight").value);
  if (!w || !h || w <= 0 || h <= 0) {
    showToast(t("toast_custom_invalid"));
    return;
  }
  isCustomPhone = true;
  renderPhone(t("custom_label"), w, h);
  customConfirm.textContent = t("custom_cancel");
  customConfirm.classList.add("btn-cancel");
});

function resetCustomBtn() {
  customConfirm.textContent = t("display");
  customConfirm.classList.remove("btn-cancel");
}

// ===== 渲染手机 =====
const rotateBtn = document.getElementById("rotateBtn");

function renderPhone(name, widthMm, heightMm, screenInch) {
  if (!ppi) return;

  currentPhone = { name, widthMm, heightMm, screenInch: screenInch || null };
  const wrapper = document.getElementById("phoneWrapper");
  wrapper.style.width = "";
  wrapper.style.height = "";
  drawPhone();
  rotateBtn.style.display = "inline-block";
  rotateBtn.textContent = isLandscape ? t("rotate_portrait") : t("rotate_landscape");
}

function hidePhone() {
  if (isCustomPhone) resetCustomBtn();
  currentPhone = null;
  isCustomPhone = false;
  document.getElementById("phoneOutline").style.display = "none";
  document.getElementById("placeholder").style.display = "";
  if (comparePhones.length > 0) {
    drawComparePhones();
  } else {
    rotateBtn.style.display = "none";
  }
}

function drawPhone() {
  if (!currentPhone) return;

  let { name, widthMm, heightMm } = currentPhone;
  if (isLandscape) [widthMm, heightMm] = [heightMm, widthMm];

  const widthPx = (widthMm / MM_PER_INCH) * ppi / window.devicePixelRatio;
  const heightPx = (heightMm / MM_PER_INCH) * ppi / window.devicePixelRatio;

  const outline = document.getElementById("phoneOutline");
  const placeholder = document.getElementById("placeholder");
  const label = document.getElementById("phoneLabel");
  const dim = document.getElementById("phoneDim");

  placeholder.style.display = "none";
  outline.style.display = "flex";
  outline.style.width = widthPx + "px";
  outline.style.height = heightPx + "px";

  label.textContent = name;
  dim.textContent = currentPhone.screenInch
    ? `${currentPhone.screenInch}" · ${widthMm.toFixed(1)} x ${heightMm.toFixed(1)} mm`
    : `${widthMm.toFixed(1)} x ${heightMm.toFixed(1)} mm`;
}

rotateBtn.addEventListener("click", () => {
  isLandscape = !isLandscape;
  rotateBtn.textContent = isLandscape ? t("rotate_portrait") : t("rotate_landscape");
  drawPhone();
  drawComparePhones();
});

// ===== 多机对比 =====
const COMPARE_COLORS = ["#4361ee", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c"];
let comparePhones = [];

function toggleCompareBtn(model, inCompare) {
  const btn = document.querySelector(`.btn-compare-add[data-model="${model}"]`);
  if (!btn) return;
  if (inCompare) {
    btn.textContent = "−";
    btn.classList.add("in-compare");
  } else {
    btn.textContent = "+";
    btn.classList.remove("in-compare");
  }
}

function addToCompare(phone) {
  if (currentPhone && currentPhone.name === phone.model) {
    showToast(t("compare_already_showing"));
    return;
  }
  if (comparePhones.find((p) => p.model === phone.model)) {
    showToast(t("compare_already"));
    return;
  }
  if (comparePhones.length >= 6) {
    showToast(t("compare_max"));
    return;
  }
  comparePhones.push(phone);
  toggleCompareBtn(phone.model, true);
  renderCompareTray();
  drawComparePhones();
}

function removeFromCompare(model) {
  comparePhones = comparePhones.filter((p) => p.model !== model);
  toggleCompareBtn(model, false);
  renderCompareTray();
  drawComparePhones();
}

function clearCompare() {
  comparePhones.forEach((p) => toggleCompareBtn(p.model, false));
  comparePhones = [];
  renderCompareTray();
  drawComparePhones();
  if (!currentPhone) {
    const wrapper = document.getElementById("phoneWrapper");
    wrapper.style.width = "";
    wrapper.style.height = "";
  }
}

function renderCompareTray() {
  const tray = document.getElementById("compareTray");
  const items = document.getElementById("compareItems");
  if (comparePhones.length === 0) {
    tray.style.display = "none";
    return;
  }
  tray.style.display = "flex";
  items.innerHTML = comparePhones
    .map((p, i) => `
      <div class="compare-tag" style="border-color:${COMPARE_COLORS[i]}">
        <span class="compare-tag-dot" style="background:${COMPARE_COLORS[i]}"></span>
        ${p.model}
        <button class="compare-tag-remove" data-model="${p.model}">×</button>
      </div>`)
    .join("");

  items.querySelectorAll(".compare-tag-remove").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCompare(btn.dataset.model));
  });
}

document.getElementById("compareClear").addEventListener("click", clearCompare);

function drawComparePhones() {
  if (!ppi) return;
  const container = document.getElementById("compareContainer");
  const wrapper = document.getElementById("phoneWrapper");

  if (comparePhones.length > 0 || currentPhone) {
    rotateBtn.style.display = "inline-block";
    rotateBtn.textContent = isLandscape ? t("rotate_portrait") : t("rotate_landscape");
  } else {
    rotateBtn.style.display = "none";
  }

  let maxW = 0, maxH = 0;
  const phonesData = comparePhones.map((phone, i) => {
    let { width: w, height: h, model } = phone;
    if (isLandscape) [w, h] = [h, w];
    const widthPx = (w / MM_PER_INCH) * ppi / window.devicePixelRatio;
    const heightPx = (h / MM_PER_INCH) * ppi / window.devicePixelRatio;
    if (widthPx > maxW) maxW = widthPx;
    if (heightPx > maxH) maxH = heightPx;
    return { model, widthPx, heightPx, color: COMPARE_COLORS[i] };
  });

  const placeholder = document.getElementById("placeholder");
  if (comparePhones.length > 0) {
    placeholder.style.display = "none";
    if (!currentPhone) {
      wrapper.style.width = maxW + "px";
      wrapper.style.height = maxH + "px";
    }
  } else if (!currentPhone) {
    placeholder.style.display = "";
    wrapper.style.width = "";
    wrapper.style.height = "";
  }

  const existing = container.querySelectorAll(".compare-outline");
  const existingMap = {};
  existing.forEach((el) => { existingMap[el.dataset.model] = el; });

  const usedModels = new Set();
  phonesData.forEach(({ model, widthPx, heightPx, color }) => {
    usedModels.add(model);
    let div = existingMap[model];
    if (!div) {
      div = document.createElement("div");
      div.className = "compare-outline";
      div.dataset.model = model;
      div.style.borderColor = color;
      div.innerHTML = `<span class="compare-label" style="color:${color}">${model}</span>`;
      container.appendChild(div);
    }
    div.style.width = widthPx + "px";
    div.style.height = heightPx + "px";
  });

  Object.keys(existingMap).forEach((model) => {
    if (!usedModels.has(model)) existingMap[model].remove();
  });
}
