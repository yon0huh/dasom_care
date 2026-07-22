/* ============================= 다솜이 케어 — app.js ============================= */

/* ---------- icons (minimal inline SVG) ---------- */
const ICONS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  package: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="14" r="3.3"/>',
  chart: '<polyline points="3 17 9 11 13 15 21 6"/><polyline points="15 6 21 6 21 12"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  x: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M8 6V4h8v2M6 6l1 14h10l1-14"/>',
  pencil: '<path d="M4 20h4L18.5 9.5a2.1 2.1 0 00-3-3L4 17v3z"/><path d="M13.5 6.5l3 3"/>',
  chevL: '<polyline points="15 18 9 12 15 6"/>',
  chevR: '<polyline points="9 18 15 12 9 6"/>',
  droplet: '<path d="M12 2s7 8.7 7 13a7 7 0 01-14 0c0-4.3 7-13 7-13z"/>',
  drum: '<path d="M14 3a5 5 0 015 5c0 3-3 4-5 6l-4 4c-1.2 1.2-3 1.2-4.2 0-1.2-1.2-1.2-3 0-4.2l4-4c2-2 3-5 6-5z"/><circle cx="6.5" cy="17.5" r="2.2"/>',
  flame: '<path d="M12 2c2 4-2 5-2 9a4 4 0 008 0c0-3-2-4-2-7 3 2 4 5 4 8a6 6 0 01-12 0c0-4 2-6 4-10z"/>',
  utensils: '<path d="M6 2v8a1.6 1.6 0 003.2 0V2M7.6 2v20M17 2c-1.6 0-3 1.6-3 4.5S15.4 11 17 11v11"/>',
  pill: '<path d="M4.9 12.5l7.6-7.6a5 5 0 117.1 7.1l-7.6 7.6a5 5 0 01-7.1-7.1z"/><line x1="8.9" y1="8.5" x2="15.5" y2="15.1"/>',
  footprints: '<ellipse cx="8.2" cy="7.5" rx="2.6" ry="3.4"/><ellipse cx="15.8" cy="15.5" rx="2.6" ry="3.4"/><path d="M8.2 11v3M15.8 19v3"/>',
  sparkles: '<path d="M12 2.5l1.7 4.8 4.8 1.7-4.8 1.7L12 15.5l-1.7-4.8L5.5 9l4.8-1.7z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  loader: '<circle cx="12" cy="12" r="9" stroke-dasharray="42 14"/>',
  play: '<polygon points="6 4 20 12 6 20" fill="currentColor" stroke="none"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 21.5v-17z"/><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>',
};
function icon(name, size = 18, extra = "") {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${extra}">${ICONS[name] || ""}</svg>`;
}

/* ---------- constants ---------- */
const CATEGORIES = [
  { id: "food", label: "식사/간식", icon: "utensils", color: "var(--primary)" },
  { id: "supplement", label: "영양제", icon: "sparkles", color: "var(--purple)" },
  { id: "med", label: "약", icon: "pill", color: "var(--danger)" },
  { id: "activity", label: "활동", icon: "footprints", color: "var(--warn)" },
  { id: "etc", label: "기타", icon: "clock", color: "var(--muted)" },
];
const catMeta = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[4];

const DEFAULT_SCHEDULE = [
  { time: "08:30", label: "아침 식사", category: "food" },
  { time: "08:35", label: "영양제", category: "supplement" },
  { time: "09:40", label: "레나메진", category: "med" },
  { time: "10:40", label: "알지드", category: "med" },
  { time: "10:50", label: "노즈워크", category: "activity" },
  { time: "11:00", label: "바깥 공기/산책", category: "activity" },
  { time: "12:00", label: "점심", category: "food" },
  { time: "13:00", label: "Fibo(식이섬유)", category: "supplement" },
  { time: "15:00", label: "저녁 1", category: "food" },
  { time: "17:00", label: "저녁 2", category: "food" },
  { time: "17:05", label: "영양제", category: "supplement" },
  { time: "19:20", label: "노즈워크", category: "activity" },
  { time: "21:00", label: "저녁 4", category: "food" },
  { time: "21:05", label: "내복약 + Aktivait", category: "med" },
  { time: "22:10", label: "레나메진", category: "med" },
  { time: "23:10", label: "알지드", category: "med" },
];

/* ---------- helpers ---------- */
const uid = () => Math.random().toString(36).slice(2, 10);
const num = (v) => (isFinite(parseFloat(v)) ? parseFloat(v) : 0);
const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const nowHM = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};
const addDays = (dateStr, n) => {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const fmtDate = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
};
const esc = (s) => (s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- localStorage layer ---------- */
const LS = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      alert("저장 공간이 부족해요. 오래된 일지 사진을 좀 정리해주세요.");
      return false;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  keysWithPrefix(prefix) {
    const out = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) out.push(k);
    }
    return out.sort();
  },
};

/* ---------- IndexedDB layer (for diary photos/videos) ---------- */
const IDB = {
  _db: null,
  open() {
    if (this._db) return Promise.resolve(this._db);
    return new Promise((resolve, reject) => {
      const req = indexedDB.open("dasom-care-media", 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains("media")) {
          const store = db.createObjectStore("media", { keyPath: "id" });
          store.createIndex("date", "date", { unique: false });
        }
      };
      req.onsuccess = () => {
        this._db = req.result;
        resolve(this._db);
      };
      req.onerror = () => reject(req.error);
    });
  },
  async put(record) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("media", "readwrite");
      tx.objectStore("media").put(record);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  },
  async get(id) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("media", "readonly");
      const req = tx.objectStore("media").get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  },
  async delete(id) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("media", "readwrite");
      tx.objectStore("media").delete(id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  },
};

/* ---------- image compression ---------- */
function compressImage(file, maxDim = 1080, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width, height } = img;
      if (width > height && width > maxDim) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else if (height > maxDim) {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          resolve(blob);
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

/* ============================= STATE ============================= */
const state = {
  tab: "today",
  date: todayStr(),
  products: LS.get("dasom_products", []),
  schedule: LS.get("dasom_schedule", null) || DEFAULT_SCHEDULE.map((s) => ({ ...s, _id: uid() })),
  targets: LS.get("dasom_targets", { water: "", protein: "" }),
  modal: null, // {type:'entry'|'product'|'schedule'|'diary', payload:{...}}
  diaryMediaDraft: [], // [{tmpId, blob, url, type}]
};
if (!LS.get("dasom_schedule", null)) LS.set("dasom_schedule", state.schedule);

function getEntries(date) {
  return LS.get(`dasom_entries_${date}`, []);
}
function setEntries(date, entries) {
  LS.set(`dasom_entries_${date}`, entries);
}
function getDiary(date) {
  return LS.get(`dasom_diary_${date}`, { text: "", mediaIds: [] });
}
function setDiary(date, diary) {
  LS.set(`dasom_diary_${date}`, diary);
}

function calcEntry(e, products) {
  const p = e.productId ? products.find((pp) => pp.id === e.productId) : null;
  const amount = num(e.amountG);
  const extraWater = num(e.waterMl);
  const protein = p ? (amount * num(p.proteinPct)) / 100 : 0;
  const fat = p ? (amount * num(p.fatPct)) / 100 : 0;
  const kcal = p ? (amount * num(p.kcalPer100g)) / 100 : 0;
  const moisture = p ? (amount * num(p.waterPct)) / 100 : 0;
  return { protein, fat, kcal, moisture, totalWater: moisture + extraWater };
}
function daySummary(entries, products) {
  return entries.reduce(
    (acc, e) => {
      const c = calcEntry(e, products);
      acc.protein += c.protein;
      acc.fat += c.fat;
      acc.kcal += c.kcal;
      acc.water += c.totalWater;
      if (e.category === "food") acc.foodG += num(e.amountG);
      return acc;
    },
    { protein: 0, fat: 0, kcal: 0, water: 0, foodG: 0 }
  );
}

/* ============================= RENDER ============================= */
const root = document.getElementById("app");

function render() {
  root.innerHTML = `
    ${renderHeader()}
    <div class="content">${renderTab()}</div>
    ${renderFab()}
    ${renderTabbar()}
    ${state.modal ? renderModal() : ""}
  `;
  bindGlobalEvents();
}

function renderHeader() {
  return `
    <div class="header">
      <img src="icons/icon-192.png" alt="다솜이" />
      <div>
        <div class="title serif">다솜이 케어</div>
        <div class="sub">오늘도 잘 먹고, 잘 견뎌줘서 고마워</div>
      </div>
    </div>
  `;
}

function renderTabbar() {
  const tabs = [
    { id: "today", label: "오늘", icon: "sun" },
    { id: "products", label: "제품", icon: "package" },
    { id: "diary", label: "일지", icon: "camera" },
    { id: "schedule", label: "일정", icon: "clock" },
    { id: "history", label: "기록", icon: "chart" },
  ];
  return `
    <div class="tabbar"><div class="tabbar-inner">
      ${tabs
        .map(
          (t) => `
        <button class="tabbtn ${state.tab === t.id ? "active" : ""}" data-action="tab" data-tab="${t.id}">
          ${icon(t.icon, 19)}<span>${t.label}</span>
        </button>`
        )
        .join("")}
    </div></div>
  `;
}

function renderFab() {
  if (state.tab === "diary") {
    return `<button class="fab" data-action="open-diary-form">${icon("plus", 24)}</button>`;
  }
  return "";
}

function renderTab() {
  if (state.tab === "today") return renderToday();
  if (state.tab === "products") return renderProducts();
  if (state.tab === "diary") return renderDiary();
  if (state.tab === "schedule") return renderSchedule();
  if (state.tab === "history") return renderHistory();
  return "";
}

/* ---------------- TODAY ---------------- */
function renderToday() {
  const entries = getEntries(state.date);
  const s = daySummary(entries, state.products);
  const isToday = state.date === todayStr();
  const wTarget = num(state.targets.water);
  const pTarget = num(state.targets.protein);
  const wPct = wTarget > 0 ? Math.min(100, Math.round((s.water / wTarget) * 100)) : null;
  const pPct = pTarget > 0 ? Math.min(100, Math.round((s.protein / pTarget) * 100)) : null;

  const scheduleHtml = state.schedule
    .map((sc) => {
      const done = entries.some((e) => e.fromSchedule === sc.time + sc.label);
      const meta = catMeta(sc.category);
      return `
      <button class="item ${done ? "done" : ""}" data-action="quick-log" data-time="${sc.time}" data-label="${esc(sc.label)}" data-category="${sc.category}">
        <div class="badge" style="background:color-mix(in srgb, ${meta.color} 18%, transparent); color:${meta.color}">${icon(meta.icon, 16)}</div>
        <div class="main">
          <div class="t1">${esc(sc.label)}</div>
          <div class="t2">${sc.time}</div>
        </div>
        ${done ? `<span style="color:var(--primary)">${icon("check", 17)}</span>` : ""}
      </button>`;
    })
    .join("");

  const entriesHtml = entries.length
    ? entries
        .map((e) => {
          const meta = catMeta(e.category);
          const c = calcEntry(e, state.products);
          const p = e.productId ? state.products.find((pp) => pp.id === e.productId) : null;
          const detail = [
            e.amountG ? `${e.amountG}g` : "",
            e.waterMl ? `+물 ${e.waterMl}ml` : "",
            c.protein > 0 || c.totalWater > 0 ? `→ 단백질 ${c.protein.toFixed(1)}g, 수분 ${c.totalWater.toFixed(0)}ml` : "",
            e.note || "",
          ]
            .filter(Boolean)
            .join(" · ");
          return `
        <div class="item">
          <div class="badge" style="background:color-mix(in srgb, ${meta.color} 18%, transparent); color:${meta.color}">${icon(meta.icon, 16)}</div>
          <div class="main">
            <div class="t1">${e.time} · ${esc(e.label)}${p ? " · " + esc(p.name) : ""}</div>
            <div class="t2">${esc(detail)}</div>
          </div>
          <div class="acts">
            <button data-action="edit-entry" data-id="${e.id}">${icon("pencil", 15)}</button>
            <button class="danger" data-action="delete-entry" data-id="${e.id}">${icon("trash", 15)}</button>
          </div>
        </div>`;
        })
        .join("")
    : "";

  return `
    <div class="datenav">
      <button data-action="date" data-delta="-1">${icon("chevL", 18)}</button>
      <div class="dt">
        <div class="d serif">${fmtDate(state.date)}</div>
        ${!isToday ? `<button class="g" data-action="date-today">오늘로 이동</button>` : ""}
      </div>
      <button data-action="date" data-delta="1">${icon("chevR", 18)}</button>
    </div>

    <div class="summary">
      <div class="summary-head">
        <span>오늘의 섭취 요약</span>
        <button data-action="toggle-targets" style="color:#fff;opacity:.85">${icon("pencil", 14)}</button>
      </div>
      <div class="stat-grid">
        <div class="stat"><div class="lab">${icon("droplet", 13)} 총 수분</div>
          <div class="val">${s.water.toFixed(0)}<small> ml</small></div>
          ${wPct !== null ? `<div class="bar"><i style="width:${wPct}%"></i></div>` : ""}
        </div>
        <div class="stat"><div class="lab">${icon("drum", 13)} 총 단백질</div>
          <div class="val">${s.protein.toFixed(1)}<small> g</small></div>
          ${pPct !== null ? `<div class="bar"><i style="width:${pPct}%"></i></div>` : ""}
        </div>
        <div class="stat"><div class="lab">${icon("flame", 13)} 칼로리</div><div class="val">${s.kcal.toFixed(0)}<small> kcal</small></div></div>
        <div class="stat"><div class="lab">${icon("utensils", 13)} 총 급여량</div><div class="val">${s.foodG.toFixed(0)}<small> g</small></div></div>
      </div>
      <div id="targetEdit" style="display:none">
        <div class="target-edit">
          <label>수분 목표(ml)<input type="number" id="tgWater" value="${state.targets.water || ""}" placeholder="선택"/></label>
          <label>단백질 목표(g)<input type="number" id="tgProtein" value="${state.targets.protein || ""}" placeholder="선택"/></label>
        </div>
      </div>
    </div>

    <div class="section-title"><h3>시간표</h3>
      <button class="linkbtn" data-action="open-entry-form">${icon("plus", 15)} 자유 기록</button>
    </div>
    ${scheduleHtml}

    <div class="section-title"><h3>기록된 항목 (${entries.length})</h3></div>
    ${entries.length ? entriesHtml : `<div class="empty"><img src="icons/icon-192.png"/>아직 기록이 없어요. 위 시간표를 눌러 기록을 시작해보세요.</div>`}
  `;
}

/* ---------------- PRODUCTS ---------------- */
function renderProducts() {
  const items = state.products
    .map(
      (p) => `
    <div class="item" style="align-items:flex-start">
      <div class="badge" style="background:var(--primary-soft); color:var(--primary)">${icon("package", 16)}</div>
      <div class="main">
        <div class="t1">${esc(p.name)}</div>
        <div class="t2">100g당 · 수분 ${p.waterPct || 0}% · 단백질 ${p.proteinPct || 0}% · 지방 ${p.fatPct || 0}%${p.kcalPer100g ? ` · ${p.kcalPer100g}kcal` : ""}</div>
      </div>
      <div class="acts">
        <button data-action="edit-product" data-id="${p.id}">${icon("pencil", 15)}</button>
        <button class="danger" data-action="delete-product" data-id="${p.id}">${icon("trash", 15)}</button>
      </div>
    </div>`
    )
    .join("");

  return `
    <div class="section-title">
      <div><h3 class="serif" style="font-size:17px">제품 영양성분</h3></div>
      <button data-action="open-product-form" class="badge" style="background:var(--primary); color:#fff">${icon("plus", 18)}</button>
    </div>
    <p class="muted" style="font-size:12px;margin-top:-4px;margin-bottom:12px">제품 포장의 '보장 성분' 표시를 보고 100g당 수치를 입력해주세요.</p>
    ${state.products.length ? items : `<div class="empty">등록된 제품이 없어요.<br/>습식/건사료 등을 등록하면 급여량 입력만으로 단백질·수분 섭취량이 자동 계산돼요.</div>`}
  `;
}

/* ---------------- SCHEDULE ---------------- */
function renderSchedule() {
  const items = state.schedule
    .map((s) => {
      const meta = catMeta(s.category);
      return `
    <div class="item">
      <div class="badge" style="background:color-mix(in srgb, ${meta.color} 18%, transparent); color:${meta.color}">${icon(meta.icon, 16)}</div>
      <div class="main"><div class="t1">${esc(s.label)}</div><div class="t2">${s.time}</div></div>
      <div class="acts">
        <button data-action="edit-schedule" data-id="${s._id}">${icon("pencil", 15)}</button>
        <button class="danger" data-action="delete-schedule" data-id="${s._id}">${icon("trash", 15)}</button>
      </div>
    </div>`;
    })
    .join("");
  return `
    <div class="section-title">
      <div><h3 class="serif" style="font-size:17px">일정표 편집</h3></div>
      <button data-action="open-schedule-form" class="badge" style="background:var(--primary); color:#fff">${icon("plus", 18)}</button>
    </div>
    ${items}
  `;
}

/* ---------------- DIARY ---------------- */
function renderDiary() {
  const dates = LS.keysWithPrefix("dasom_diary_").reverse();
  if (!dates.length) {
    return `<div class="section-title"><h3 class="serif" style="font-size:17px">다솜이 일지</h3></div>
    <div class="empty"><img src="icons/icon-192.png"/>아직 일지가 없어요. 오른쪽 아래 + 버튼을 눌러 오늘 다솜이 이야기를 남겨보세요.</div>`;
  }
  const entriesHtml = dates
    .map((key) => {
      const date = key.replace("dasom_diary_", "");
      const d = LS.get(key, { text: "", mediaIds: [] });
      if (!d.text && (!d.mediaIds || !d.mediaIds.length)) return "";
      return `
      <div class="diary-entry" data-diary-date="${date}">
        <div class="section-title" style="margin:0 0 8px">
          <h3 style="font-size:13px;color:var(--muted)">${fmtDate(date)}</h3>
          <div class="acts" style="display:flex;gap:8px">
            <button data-action="edit-diary" data-date="${date}" style="color:var(--muted)">${icon("pencil", 15)}</button>
            <button data-action="delete-diary" data-date="${date}" style="color:var(--danger)">${icon("trash", 15)}</button>
          </div>
        </div>
        ${d.text ? `<div class="diary-text">${esc(d.text)}</div>` : ""}
        <div class="diary-media" data-media-mount="${date}"></div>
      </div>`;
    })
    .join("");
  return `
    <div class="section-title"><h3 class="serif" style="font-size:17px">다솜이 일지</h3></div>
    ${entriesHtml}
  `;
}

async function mountDiaryMedia() {
  const mounts = document.querySelectorAll("[data-media-mount]");
  for (const el of mounts) {
    const date = el.getAttribute("data-media-mount");
    const d = LS.get(`dasom_diary_${date}`, { mediaIds: [] });
    if (!d.mediaIds || !d.mediaIds.length) continue;
    const html = [];
    for (const id of d.mediaIds) {
      const rec = await IDB.get(id);
      if (!rec) continue;
      const url = URL.createObjectURL(rec.blob);
      if (rec.type === "video") {
        html.push(`<div class="m"><video src="${url}" muted playsinline preload="metadata"></video><span class="vic">${icon("play", 11)}</span></div>`);
      } else {
        html.push(`<div class="m"><img src="${url}"/></div>`);
      }
    }
    el.innerHTML = html.join("");
  }
}

/* ---------------- HISTORY ---------------- */
function renderHistory() {
  const dateKeys = LS.keysWithPrefix("dasom_entries_");
  if (!dateKeys.length) {
    return `<div class="section-title"><h3 class="serif" style="font-size:17px">최근 기록 추이</h3></div>
    <div class="empty">아직 쌓인 기록이 없어요. 오늘 탭에서 기록을 시작하면 여기에 추이가 나타나요.</div>`;
  }
  const last14 = dateKeys.slice(-14);
  const rows = last14.map((k) => {
    const date = k.replace("dasom_entries_", "");
    const entries = LS.get(k, []);
    const s = daySummary(entries, state.products);
    return { date, water: s.water, protein: s.protein, count: entries.length };
  });
  const maxWater = Math.max(1, ...rows.map((r) => r.water));

  const chart = rows
    .map((r) => {
      const h = Math.max(4, Math.round((r.water / maxWater) * 100));
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1">
        <div style="width:100%;max-width:20px;height:100px;display:flex;align-items:flex-end">
          <div style="width:100%;height:${h}%;background:var(--primary);border-radius:5px 5px 2px 2px"></div>
        </div>
        <div style="font-size:9px;color:var(--muted)">${r.date.slice(5)}</div>
      </div>`;
    })
    .join("");

  const list = [...rows]
    .reverse()
    .map(
      (r) => `
      <div class="item" style="cursor:default">
        <div class="main"><div class="t1">${fmtDate(r.date)}</div></div>
        <div class="t2" style="text-align:right">수분 ${r.water.toFixed(0)}ml · 단백질 ${r.protein.toFixed(1)}g · 기록 ${r.count}건</div>
      </div>`
    )
    .join("");

  return `
    <div class="section-title"><h3 class="serif" style="font-size:17px">최근 기록 추이</h3></div>
    <div class="card" style="margin-bottom:14px">
      <div class="muted" style="font-size:12px;margin-bottom:10px">${icon("droplet", 12)} 일별 총 수분 섭취량(ml)</div>
      <div style="display:flex;gap:6px;align-items:flex-end">${chart}</div>
    </div>
    ${list}
  `;
}

/* ============================= MODALS ============================= */
function renderModal() {
  const m = state.modal;
  if (m.type === "entry") return renderEntryModal(m.payload);
  if (m.type === "product") return renderProductModal(m.payload);
  if (m.type === "schedule") return renderScheduleModal(m.payload);
  if (m.type === "diary") return renderDiaryModal(m.payload);
  return "";
}

function renderEntryModal(p) {
  const isEdit = !!p.id;
  const productOptions = state.products.map((pp) => `<option value="${pp.id}" ${p.productId === pp.id ? "selected" : ""}>${esc(pp.name)}</option>`).join("");
  return `
  <div class="modal-backdrop" data-action="backdrop">
    <div class="modal" data-stop>
      <div class="modal-head"><h3 class="serif">${isEdit ? "기록 수정" : "기록 추가"}</h3><button data-action="close-modal">${icon("x", 20)}</button></div>
      <div class="field-row">
        <div class="field"><span>시간</span><input type="time" id="f_time" value="${p.time}"/></div>
        <div class="field"><span>이름</span><input id="f_label" value="${esc(p.label || "")}" placeholder="예: 아침 식사"/></div>
      </div>
      <div class="field"><span>분류</span>
        <div class="pillrow" id="f_category_row">
          ${CATEGORIES.map((c) => `<button type="button" class="pillbtn ${p.category === c.id ? "active" : ""}" data-cat="${c.id}">${c.label}</button>`).join("")}
        </div>
      </div>
      <div class="field"><span>제품 (영양 계산용, 선택)</span>
        <select id="f_product"><option value="">선택 안 함</option>${productOptions}</select>
      </div>
      <div class="field-row">
        <div class="field"><span>급여량 (g)</span><input type="number" inputmode="decimal" id="f_amount" value="${p.amountG || ""}" placeholder="0"/></div>
        <div class="field"><span>추가로 섞은 물 (ml)</span><input type="number" inputmode="decimal" id="f_water" value="${p.waterMl || ""}" placeholder="0"/></div>
      </div>
      <div class="field"><span>메모</span><input id="f_note" value="${esc(p.note || "")}" placeholder="선택 사항"/></div>
      <div id="f_calc_hint"></div>
      <button class="savebtn" data-action="save-entry" data-id="${p.id || ""}" data-from-schedule="${esc(p.fromSchedule || "")}">저장</button>
    </div>
  </div>`;
}

function renderProductModal(p) {
  return `
  <div class="modal-backdrop" data-action="backdrop">
    <div class="modal" data-stop>
      <div class="modal-head"><h3 class="serif">${p.id ? "제품 수정" : "제품 등록"}</h3><button data-action="close-modal">${icon("x", 20)}</button></div>
      <div class="field"><span>제품명</span><input id="p_name" value="${esc(p.name || "")}" placeholder="예: 로얄캐닌 습식"/></div>
      <div class="field-row">
        <div class="field"><span>수분 (%)</span><input type="number" inputmode="decimal" id="p_water" value="${p.waterPct ?? ""}"/></div>
        <div class="field"><span>단백질 (%)</span><input type="number" inputmode="decimal" id="p_protein" value="${p.proteinPct ?? ""}"/></div>
      </div>
      <div class="field-row">
        <div class="field"><span>지방 (%)</span><input type="number" inputmode="decimal" id="p_fat" value="${p.fatPct ?? ""}"/></div>
        <div class="field"><span>kcal/100g</span><input type="number" inputmode="decimal" id="p_kcal" value="${p.kcalPer100g ?? ""}"/></div>
      </div>
      <button class="savebtn" data-action="save-product" data-id="${p.id || ""}">저장</button>
    </div>
  </div>`;
}

function renderScheduleModal(p) {
  return `
  <div class="modal-backdrop" data-action="backdrop">
    <div class="modal" data-stop>
      <div class="modal-head"><h3 class="serif">일정 항목</h3><button data-action="close-modal">${icon("x", 20)}</button></div>
      <div class="field-row">
        <div class="field"><span>시간</span><input type="time" id="s_time" value="${p.time}"/></div>
        <div class="field"><span>이름</span><input id="s_label" value="${esc(p.label || "")}"/></div>
      </div>
      <div class="field"><span>분류</span>
        <div class="pillrow" id="s_category_row">
          ${CATEGORIES.map((c) => `<button type="button" class="pillbtn ${p.category === c.id ? "active" : ""}" data-cat="${c.id}">${c.label}</button>`).join("")}
        </div>
      </div>
      <button class="savebtn" data-action="save-schedule" data-id="${p._id || ""}">저장</button>
    </div>
  </div>`;
}

function renderDiaryModal(p) {
  const mediaPreview = state.diaryMediaDraft
    .map(
      (m) => `
      <div class="p">
        ${m.type === "video" ? `<video src="${m.url}" muted></video>` : `<img src="${m.url}"/>`}
        <button class="rm" data-action="rm-draft-media" data-tmp="${m.tmpId}">${icon("x", 11)}</button>
      </div>`
    )
    .join("");
  return `
  <div class="modal-backdrop" data-action="backdrop">
    <div class="modal" data-stop>
      <div class="modal-head"><h3 class="serif">오늘의 일지</h3><button data-action="close-modal">${icon("x", 20)}</button></div>
      <div class="hint">${fmtDate(p.date)} · 다솜이 상태와 사진/영상을 자유롭게 남겨주세요.</div>
      <div class="field"><span>오늘 상태</span><textarea id="d_text" placeholder="예: 아침에 밥을 잘 먹었고, 산책도 10분 했어요.">${esc(p.text || "")}</textarea></div>
      <label class="photo-pick" for="d_files">${icon("camera", 18)} 사진/영상 추가하기
        <input type="file" id="d_files" accept="image/*,video/*" multiple style="display:none"/>
      </label>
      <div class="pick-grid" id="d_preview">${mediaPreview}</div>
      <p class="muted" style="font-size:11px;margin-top:-6px;margin-bottom:12px">영상은 용량이 크면 저장이 안 될 수 있어요. 기기 저장공간에 따라 다릅니다.</p>
      <button class="savebtn" data-action="save-diary" data-date="${p.date}">저장</button>
    </div>
  </div>`;
}

/* ============================= EVENTS ============================= */
function bindGlobalEvents() {
  document.querySelectorAll("[data-action]").forEach((el) => {
    if (el._bound) return;
  });

  root.onclick = async (e) => {
    const t = e.target.closest("[data-action]");
    if (!t) return;
    const action = t.getAttribute("data-action");

    if (action === "tab") {
      state.tab = t.getAttribute("data-tab");
      render();
      if (state.tab === "diary") mountDiaryMedia();
      return;
    }
    if (action === "date") {
      state.date = addDays(state.date, parseInt(t.getAttribute("data-delta"), 10));
      render();
      return;
    }
    if (action === "date-today") {
      state.date = todayStr();
      render();
      return;
    }
    if (action === "toggle-targets") {
      const box = document.getElementById("targetEdit");
      if (box) box.style.display = box.style.display === "none" ? "block" : "none";
      return;
    }
    if (action === "backdrop" && e.target === t) {
      closeModal();
      return;
    }
    if (action === "close-modal") {
      closeModal();
      return;
    }
    if (action === "open-entry-form") {
      openEntryModal({ time: state.date === todayStr() ? nowHM() : "12:00", category: "food" });
      return;
    }
    if (action === "quick-log") {
      const time = t.getAttribute("data-time");
      const label = t.getAttribute("data-label");
      const category = t.getAttribute("data-category");
      openEntryModal({
        time: state.date === todayStr() ? nowHM() : time,
        label,
        category,
        fromSchedule: time + label,
      });
      return;
    }
    if (action === "edit-entry") {
      const entries = getEntries(state.date);
      const entry = entries.find((e2) => e2.id === t.getAttribute("data-id"));
      if (entry) openEntryModal(entry);
      return;
    }
    if (action === "delete-entry") {
      const id = t.getAttribute("data-id");
      const entries = getEntries(state.date).filter((e2) => e2.id !== id);
      setEntries(state.date, entries);
      render();
      return;
    }
    if (action === "save-entry") {
      saveEntryFromForm(t.getAttribute("data-id"), t.getAttribute("data-from-schedule"));
      return;
    }
    if (action === "open-product-form") {
      openModal("product", {});
      return;
    }
    if (action === "edit-product") {
      const prod = state.products.find((p) => p.id === t.getAttribute("data-id"));
      if (prod) openModal("product", prod);
      return;
    }
    if (action === "delete-product") {
      if (!confirm("이 제품을 삭제할까요?")) return;
      state.products = state.products.filter((p) => p.id !== t.getAttribute("data-id"));
      LS.set("dasom_products", state.products);
      render();
      return;
    }
    if (action === "save-product") {
      saveProductFromForm(t.getAttribute("data-id"));
      return;
    }
    if (action === "open-schedule-form") {
      openModal("schedule", { time: "12:00", category: "food" });
      return;
    }
    if (action === "edit-schedule") {
      const s = state.schedule.find((x) => x._id === t.getAttribute("data-id"));
      if (s) openModal("schedule", s);
      return;
    }
    if (action === "delete-schedule") {
      if (!confirm("이 일정을 삭제할까요?")) return;
      state.schedule = state.schedule.filter((x) => x._id !== t.getAttribute("data-id"));
      LS.set("dasom_schedule", state.schedule);
      render();
      return;
    }
    if (action === "save-schedule") {
      saveScheduleFromForm(t.getAttribute("data-id"));
      return;
    }
    if (action === "open-diary-form") {
      state.diaryMediaDraft = [];
      const existing = getDiary(state.date);
      openModal("diary", { date: state.date, text: existing.text });
      return;
    }
    if (action === "edit-diary") {
      const date = t.getAttribute("data-date");
      state.diaryMediaDraft = [];
      const existing = getDiary(date);
      openModal("diary", { date, text: existing.text });
      return;
    }
    if (action === "delete-diary") {
      const date = t.getAttribute("data-date");
      if (!confirm("이 날짜의 일지를 삭제할까요? 사진/영상도 함께 삭제돼요.")) return;
      const d = getDiary(date);
      for (const id of d.mediaIds || []) await IDB.delete(id);
      LS.remove(`dasom_diary_${date}`);
      render();
      return;
    }
    if (action === "rm-draft-media") {
      const tmp = t.getAttribute("data-tmp");
      state.diaryMediaDraft = state.diaryMediaDraft.filter((m) => m.tmpId !== tmp);
      const preview = document.getElementById("d_preview");
      if (preview) preview.outerHTML = renderDiaryPreviewOnly();
      return;
    }
    if (action === "save-diary") {
      saveDiaryFromForm(t.getAttribute("data-date"));
      return;
    }
  };

  // category pill selection (event delegation, since re-render happens only on submit)
  root.addEventListener("click", (e) => {
    const catBtn = e.target.closest("[data-cat]");
    if (!catBtn) return;
    const row = catBtn.parentElement;
    row.querySelectorAll(".pillbtn").forEach((b) => b.classList.remove("active"));
    catBtn.classList.add("active");
  });

  // live nutrition hint in entry form
  root.addEventListener("input", (e) => {
    if (["f_product", "f_amount", "f_water"].includes(e.target.id)) updateEntryHint();
  });
  root.addEventListener("change", (e) => {
    if (e.target.id === "f_product") updateEntryHint();
    if (e.target.id === "d_files") handleDiaryFiles(e.target.files);
  });
}

function updateEntryHint() {
  const hint = document.getElementById("f_calc_hint");
  if (!hint) return;
  const pid = document.getElementById("f_product").value;
  const amount = num(document.getElementById("f_amount").value);
  const water = num(document.getElementById("f_water").value);
  const p = state.products.find((pp) => pp.id === pid);
  if (!p || !amount) {
    hint.innerHTML = "";
    return;
  }
  const protein = (amount * num(p.proteinPct)) / 100;
  const moisture = (amount * num(p.waterPct)) / 100 + water;
  hint.innerHTML = `<div class="hint">예상 섭취: 단백질 ${protein.toFixed(1)}g · 수분 ${moisture.toFixed(0)}ml</div>`;
}

function openEntryModal(payload) {
  openModal("entry", payload);
  setTimeout(updateEntryHint, 0);
}
function openModal(type, payload) {
  state.modal = { type, payload };
  render();
}
function closeModal() {
  state.diaryMediaDraft.forEach((m) => URL.revokeObjectURL(m.url));
  state.diaryMediaDraft = [];
  state.modal = null;
  render();
  if (state.tab === "diary") mountDiaryMedia();
}

function saveEntryFromForm(id, fromSchedule) {
  const label = document.getElementById("f_label").value.trim();
  if (!label) return;
  const time = document.getElementById("f_time").value;
  const category = document.querySelector("#f_category_row .pillbtn.active")?.getAttribute("data-cat") || "food";
  const productId = document.getElementById("f_product").value || null;
  const amountG = document.getElementById("f_amount").value;
  const waterMl = document.getElementById("f_water").value;
  const note = document.getElementById("f_note").value.trim();

  const entries = getEntries(state.date);
  const entry = { id: id || uid(), time, label, category, productId, amountG, waterMl, note, fromSchedule: fromSchedule || undefined };
  const idx = entries.findIndex((e) => e.id === entry.id);
  if (idx >= 0) entries[idx] = entry;
  else entries.push(entry);
  entries.sort((a, b) => a.time.localeCompare(b.time));
  setEntries(state.date, entries);
  state.modal = null;
  render();
}

function saveProductFromForm(id) {
  const name = document.getElementById("p_name").value.trim();
  if (!name) return;
  const product = {
    id: id || uid(),
    name,
    waterPct: document.getElementById("p_water").value,
    proteinPct: document.getElementById("p_protein").value,
    fatPct: document.getElementById("p_fat").value,
    kcalPer100g: document.getElementById("p_kcal").value,
  };
  const idx = state.products.findIndex((p) => p.id === product.id);
  if (idx >= 0) state.products[idx] = product;
  else state.products.push(product);
  LS.set("dasom_products", state.products);
  state.modal = null;
  render();
}

function saveScheduleFromForm(id) {
  const label = document.getElementById("s_label").value.trim();
  if (!label) return;
  const item = {
    _id: id || uid(),
    time: document.getElementById("s_time").value,
    label,
    category: document.querySelector("#s_category_row .pillbtn.active")?.getAttribute("data-cat") || "food",
  };
  const idx = state.schedule.findIndex((s) => s._id === item._id);
  if (idx >= 0) state.schedule[idx] = item;
  else state.schedule.push(item);
  state.schedule.sort((a, b) => a.time.localeCompare(b.time));
  LS.set("dasom_schedule", state.schedule);
  state.modal = null;
  render();
}

async function handleDiaryFiles(fileList) {
  for (const file of Array.from(fileList)) {
    try {
      if (file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        state.diaryMediaDraft.push({ tmpId: uid(), blob: file, url, type: "video" });
      } else if (file.type.startsWith("image/")) {
        const blob = await compressImage(file);
        const url = URL.createObjectURL(blob);
        state.diaryMediaDraft.push({ tmpId: uid(), blob, url, type: "image" });
      }
    } catch (err) {
      console.error(err);
    }
  }
  const preview = document.getElementById("d_preview");
  if (preview) preview.outerHTML = renderDiaryPreviewOnly();
}
function renderDiaryPreviewOnly() {
  const inner = state.diaryMediaDraft
    .map(
      (m) => `
      <div class="p">
        ${m.type === "video" ? `<video src="${m.url}" muted></video>` : `<img src="${m.url}"/>`}
        <button class="rm" data-action="rm-draft-media" data-tmp="${m.tmpId}">${icon("x", 11)}</button>
      </div>`
    )
    .join("");
  return `<div class="pick-grid" id="d_preview">${inner}</div>`;
}

async function saveDiaryFromForm(date) {
  const text = document.getElementById("d_text").value.trim();
  const existing = getDiary(date);
  const newIds = [];
  for (const m of state.diaryMediaDraft) {
    const id = uid();
    try {
      await IDB.put({ id, date, type: m.type, mime: m.blob.type, blob: m.blob });
      newIds.push(id);
    } catch (err) {
      alert("사진/영상 저장에 실패했어요. 용량이 너무 크지 않은지 확인해주세요.");
    }
  }
  const mediaIds = [...(existing.mediaIds || []), ...newIds];
  setDiary(date, { text, mediaIds });
  state.diaryMediaDraft.forEach((m) => URL.revokeObjectURL(m.url));
  state.diaryMediaDraft = [];
  state.modal = null;
  render();
  if (state.tab === "diary") mountDiaryMedia();
}

/* ============================= INIT ============================= */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

render();
if (state.tab === "diary") mountDiaryMedia();
