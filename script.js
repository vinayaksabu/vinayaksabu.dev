// Init Icons
lucide.createIcons();

// DOM Elements
const body = document.body;
const switchContainer = document.querySelector('.liquid-switch');
const btnEng = document.getElementById('btn-eng');
const btnCreate = document.getElementById('btn-create');
const viewEng = document.getElementById('view-eng');
const viewCreate = document.getElementById('view-create');
const roleText = document.getElementById('role-label');
const profileImg = document.getElementById('profile-img');

// Photo Assets
const PHOTO_ENG = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop";
const PHOTO_CRT = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop";

// Theme Logic
function toggleTheme() {
    if (body.classList.contains('theme-dark')) {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
    } else {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
    }
}

// Mode Switching
function setTab(mode) {
    if (mode === 'create') {
        body.classList.remove('mode-eng');
        body.classList.add('mode-create');
        switchContainer.classList.add('switched');
        
        btnEng.classList.remove('active');
        btnCreate.classList.add('active');

        viewEng.classList.remove('active');
        setTimeout(() => viewCreate.classList.add('active'), 200);
        
        roleText.innerText = "VISUAL_DESIGNER";
        profileImg.src = PHOTO_CRT;
    } else {
        body.classList.remove('mode-create');
        body.classList.add('mode-eng');
        switchContainer.classList.remove('switched');
        
        btnCreate.classList.remove('active');
        btnEng.classList.add('active');

        viewCreate.classList.remove('active');
        setTimeout(() => viewEng.classList.add('active'), 200);

        roleText.innerText = "SYSTEM_ARCHITECT";
        profileImg.src = PHOTO_ENG;
    }
}

// Data Filter Logic
function filterGrid(type) {
    const items = document.querySelectorAll('.bento-layout > div');
    const btns = document.querySelectorAll('.filter-btn');
    
    // Toggle active button
    btns.forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    items.forEach(item => {
        if (type === 'all' || item.classList.contains(`item-${type}`)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Modal Logic
const modal = document.getElementById('modal-overlay');
const mImg = document.getElementById('m-img');
const mTitle = document.getElementById('m-title');
const mDesc = document.getElementById('m-desc');
const mCat = document.getElementById('m-cat');

const DATA = {
    'hostel': { title: 'Hostel_OS', cat: 'Dev', desc: 'React + Firebase architecture for real-time logistics.', img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&q=80' },
    'mobile': { title: 'Campus Connect', cat: 'App', desc: 'Flutter mobile application for student resources.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80' },
    'extreme': { title: 'IEEEXtreme', cat: 'Award', desc: 'Top 5% Global Rank. Algorithms in C++.', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80' },
    'branding': { title: 'Identity', cat: 'Design', desc: 'Visual System for Electrical Dept.', img: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80' },
    'promo': { title: 'Event_Promo', cat: 'VFX', desc: 'Teaser trailer edited in Premiere Pro.', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?w=800&q=80' }
};

function openModal(id) {
    const d = DATA[id];
    if(d) {
        mImg.src = d.img;
        mTitle.innerText = d.title;
        mDesc.innerText = d.desc;
        mCat.innerText = d.cat;
        modal.classList.add('active');
    }
}

function closeModal() {
    modal.classList.remove('active');
}