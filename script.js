// --- 1. RENDER CONTENT FROM ARRAYS ---

document.addEventListener('DOMContentLoaded', () => {
    renderHeadshots();
    renderWork();
    setupTheatreFilters();
    setupVideoPopup();
});

function renderHeadshots() {
    const container = document.getElementById('headshots-container');
    if (!container) return;

    headshotData.forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.className = 'gallery-item';
        img.onclick = () => openLightbox(index);
        container.appendChild(img);
    });
}

function renderWork() {
    renderCardList('theatre-container', workData.theatre, 'Full Play');
    renderCardList('clips-grid', theatreClipData, 'Clip');
}

const defaultThumb = "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=900&auto=format&fit=crop";

function renderCardList(containerId, items, label) {
    const container = document.getElementById(containerId);
    if (!container || !items) return;
    container.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.dataset.url = item.url;
        card.dataset.title = item.title;
        card.dataset.description = item.description || 'An exclusive snippet from the performance.';
        card.dataset.label = label;
        const thumbUrl = item.image || defaultThumb;
        const thumbHtml = `
            <div class="card-thumb">
                <img src="${thumbUrl}" alt="${item.title}">
                <span class="thumb-icon"><i class="fas fa-play"></i></span>
            </div>
        `;

        card.innerHTML = `
            <div class="video-card-inner">
                <div class="card-top-row">
                    <img src="favicon.svg" alt="logo" class="card-logo">
                    <span class="card-label">${label}</span>
                </div>
                ${thumbHtml}
                <div class="card-title-row">
                    <h3>${item.title}</h3>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openVideoPopup(card.dataset));
        container.appendChild(card);
    });
}

function setupTheatreFilters() {
    const filterButtons = document.querySelectorAll('.theatre-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.dataset.filter;
            if (!view) return;

            toggleTheatreView(view);
        });
    });

    toggleTheatreView('full');
}

function toggleTheatreView(view) {
    const theatreContainer = document.getElementById('theatre-container');
    const clipsGrid = document.getElementById('clips-grid');
    const filterButtons = document.querySelectorAll('.theatre-filter');
    filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === view));
    if (!theatreContainer || !clipsGrid) return;

    const isFull = view === 'full';
    theatreContainer.style.display = isFull ? 'grid' : 'none';
    clipsGrid.style.display = isFull ? 'none' : 'grid';
}

// --- VIDEO POPUP ---

let videoPopupElement;
let videoPopupIframe;
let videoPopupTitle;
let videoPopupDesc;

function setupVideoPopup() {
    videoPopupElement = document.getElementById('video-popup');
    videoPopupIframe = document.getElementById('video-popup-iframe');
    videoPopupTitle = document.getElementById('video-popup-title');
    videoPopupDesc = document.getElementById('video-popup-desc');

    if (!videoPopupElement) return;
    videoPopupElement.addEventListener('click', e => {
        if (e.target === videoPopupElement || e.target.id === 'video-popup-close') {
            closeVideoPopup();
        }
    });
}

function openVideoPopup(data) {
    if (!videoPopupElement || !videoPopupIframe) return;
    videoPopupTitle.textContent = data.title;
    videoPopupDesc.textContent = data.description;
    videoPopupIframe.src = `${data.url}?autoplay=1`;
    videoPopupElement.classList.add('visible');
    videoPopupElement.setAttribute('aria-hidden', 'false');
}

function closeVideoPopup() {
    if (!videoPopupElement || !videoPopupIframe) return;
    videoPopupElement.classList.remove('visible');
    videoPopupIframe.src = '';
    videoPopupElement.setAttribute('aria-hidden', 'true');
}

// --- 2. NAVIGATION LOGIC ---

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    if (sectionId === 'home') {
        document.getElementById('home').style.display = 'block';
    } else {
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.style.display = 'block';
            activeSection.scrollTop = 0;
        }
    }
}

// --- 3. LIGHTBOX LOGIC ---

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = 'flex';
    lightboxImg.src = headshotData[currentIndex].src;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeSlide(n) {
    currentIndex += n;
    if (currentIndex >= headshotData.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = headshotData.length - 1;

    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.src = headshotData[currentIndex].src;
        lightboxImg.style.opacity = 1;
    }, 200);
}

lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
        closeLightbox();
    }
});

document.addEventListener('keydown', function (e) {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
    }
});
