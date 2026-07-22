// Local Storage Keys
const STORAGE_KEY_NOTES = 'dasom_pwa_notes';
const STORAGE_KEY_HEALTH = 'dasom_pwa_health';

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');

// Note Elements
const noteForm = document.getElementById('note-form');
const noteDateInput = document.getElementById('note-date');
const noteTimeInput = document.getElementById('note-time');
const noteTextInput = document.getElementById('note-text');
const noteListContainer = document.getElementById('note-list');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDateTimeDefaults();
    loadNotes();
    initFormEvents();
    registerServiceWorker();
});

// Navigation Handling
function initNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');

            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            item.classList.add('active');
            const targetContent = document.getElementById(`tab-${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Set Today's Date and Current Time as Default Values
function initDateTimeDefaults() {
    const now = new Date();
    
    // YYYY-MM-DD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // HH:MM
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    if (noteDateInput) noteDateInput.value = `${year}-${month}-${day}`;
    if (noteTimeInput) noteTimeInput.value = `${hours}:${minutes}`;
}

// Form Submission Events
function initFormEvents() {
    if (noteForm) {
        noteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveNote();
        });
    }
}

// Save New Note
function saveNote() {
    const date = noteDateInput.value;
    const time = noteTimeInput.value;
    const text = noteTextInput.value.trim();

    if (!date || !time || !text) {
        alert('모든 필드를 입력해 주세요.');
        return;
    }

    const newNote = {
        id: Date.now().toString(),
        date: date,
        time: time,
        text: text,
        createdAt: new Date().toISOString()
    };

    const notes = getStoredNotes();
    notes.unshift(newNote); // 최신 항목이 맨 위로 오도록 추가

    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));

    // Reset Form Text
    noteTextInput.value = '';
    
    // Reload View & Reset Time to Now
    initDateTimeDefaults();
    renderNotes(notes);
}

// Get Stored Notes from LocalStorage
function getStoredNotes() {
    const data = localStorage.getItem(STORAGE_KEY_NOTES);
    return data ? JSON.parse(data) : [];
}

// Delete Note Item
function deleteNote(id) {
    if (!confirm('이 특이사항 기록을 삭제하시겠습니까?')) return;

    let notes = getStoredNotes();
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));

    renderNotes(notes);
}

// Load and Render Notes
function loadNotes() {
    const notes = getStoredNotes();
    renderNotes(notes);
}

/* -------------------------------------------------------------
   [수정/개선] 특이사항 DOM 렌더링 함수 (구조화 및 HTML 최적화)
------------------------------------------------------------- */
function renderNotes(notes) {
    if (!noteListContainer) return;

    if (notes.length === 0) {
        noteListContainer.innerHTML = `
            <div class="empty-state">
                <p>기록된 특이사항이 없습니다.</p>
            </div>
        `;
        return;
    }

    noteListContainer.innerHTML = notes.map(note => {
        const formattedDate = formatDateString(note.date);
        
        return `
            <div class="note-card" data-id="${note.id}">
                <div class="note-card-header">
                    <div class="note-card-meta">
                        <span class="note-card-date">📅 ${formattedDate}</span>
                        <span class="note-card-time">⏰ ${note.time}</span>
                    </div>
                    <button type="button" class="btn-delete-note" onclick="deleteNote('${note.id}')">삭제</button>
                </div>
                <div class="note-card-content">${escapeHtml(note.text)}</div>
            </div>
        `;
    }).join('');
}

// Date Formatter (YYYY-MM-DD -> YYYY.MM.DD (요일))
function formatDateString(dateStr) {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return dateStr;

    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const dayName = days[dateObj.getDay()];

    return `${year}.${month}.${day} (${dayName})`;
}

// XSS Prevention Utility
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Register Service Worker for PWA Support
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => {
                    console.log('Service Worker Registered Successfully:', reg.scope);
                })
                .catch(err => {
                    console.error('Service Worker Registration Failed:', err);
                });
        });
    }
}