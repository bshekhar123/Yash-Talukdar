// --- 1. RENDER CONTENT FROM ARRAYS ---

document.addEventListener('DOMContentLoaded', () => {
    renderHeadshots();
    setupHeadshotsViewMore();

    setupGridViewMore();

    renderWork();
    setupTheatreFilters();
    setupVideoPopup();
    setupLightbox();
});

const HEADSHOT_BATCH = 2;
const HEADSHOT_INITIAL = 8;
let headshotsVisible = HEADSHOT_INITIAL;

const GRID_CONFIG = {
    theatre: {
        items: () => workData.theatre,
        containerId: 'theatre-container',
        btnId: 'theatre-view-more',
        defaultVisible: 3,
        step: 2
    },
    clips: {
        items: () => theatreClipData,
        containerId: 'clips-grid',
        btnId: 'clips-view-more',
        defaultVisible: 3,
        step: 2
    }
};

const gridVisible = {
    theatre: GRID_CONFIG.theatre.defaultVisible,
    clips: GRID_CONFIG.clips.defaultVisible
};

function renderHeadshots() {
    const container = document.getElementById('headshots-container');
    if (!container) return;

    const visibleItems = headshotData.slice(0, headshotsVisible);
    container.innerHTML = '';

    visibleItems.forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.className = 'gallery-item';
        img.onclick = () => openLightbox(index);
        container.appendChild(img);
    });

    updateHeadshotsButton();
}

function updateHeadshotsButton() {
    const btn = document.getElementById('headshots-view-more');
    if (!btn) return;

    if (headshotData.length <= HEADSHOT_INITIAL) {
        btn.style.display = 'none';
        return;
    }

    btn.style.display = 'inline-flex';
    btn.textContent = headshotsVisible >= headshotData.length ? 'View Less' : 'View More';
}

function setupHeadshotsViewMore() {
    const btn = document.getElementById('headshots-view-more');
    if (!btn) return;

    btn.addEventListener('click', () => {
        if (headshotsVisible >= headshotData.length) {
            headshotsVisible = HEADSHOT_INITIAL;
        } else {
            headshotsVisible = Math.min(headshotsVisible + HEADSHOT_BATCH, headshotData.length);
        }
        renderHeadshots();
    });
}

function renderWork() {
    renderGridSection('theatre');
    renderGridSection('clips');
    renderOtherWork(); // ✅ show dubbed series if exists
}

const defaultThumb =
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=900&auto=format&fit=crop";

// ✅ updated to support optional click handler (for Dubbed Series open new tab)
function renderCardList(containerId, items, label, onCardClick) {
    const container = document.getElementById(containerId);
    if (!container || !items) return;

    container.innerHTML = '';
    const clickHandler = typeof onCardClick === 'function'
        ? onCardClick
        : (data) => openVideoPopup(data);

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.dataset.url = item.url;
        card.dataset.title = item.title;
        card.dataset.description = item.description || 'An exclusive snippet from the performance.';
        card.dataset.label = label;
        if (label === 'Clip') {
            card.dataset.aspect = 'portrait';
        }

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

        card.addEventListener('click', () => clickHandler(card.dataset));
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
    const filterButtons = document.querySelectorAll('.theatre-filter');
    filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === view));

    const gridSections = document.querySelectorAll('.grid-section');
    gridSections.forEach(section => {
        section.classList.toggle('is-visible', section.dataset.view === view);
    });
}

function renderGridSection(type) {
    const config = GRID_CONFIG[type];
    const items = config.items() || [];
    const visibleItems = items.slice(0, gridVisible[type]);

    const label = type === 'theatre' ? 'Full Play' : 'Clip';
    renderCardList(config.containerId, visibleItems, label);

    updateGridButton(type);
}

function renderOtherWork() {
    const section = document.getElementById('other-work-section');
    const container = document.getElementById('other-container');
    if (!section || !container) return;

    const items = workData.other || [];
    if (!items.length) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    container.innerHTML = '';

    items.forEach(item => {
        const badge = item.url && item.url.includes('drive.google.com') ? 'Drive Folder' : 'Link';
        const thumbUrl = item.image || defaultThumb;

        const card = document.createElement('a');
        card.className = 'other-card';
        card.href = item.url;
        card.target = '_blank';
        card.rel = 'noopener';

        card.innerHTML = `
      <div class="other-card-thumb">
        <img src="${thumbUrl}" alt="${item.title}">
        <span class="other-badge">${badge}</span>
      </div>

      <div class="other-card-title">${item.title || 'Untitled'}</div>
      <div class="other-card-desc">${item.description || ''}</div>

      <div class="other-card-footer">
        <span class="card-label">Open</span>
        <span class="other-open">
          <i class="fas fa-arrow-up-right-from-square"></i> View
        </span>
      </div>
    `;

        container.appendChild(card);
    });
}






function setupGridViewMore() {
    Object.keys(GRID_CONFIG).forEach(type => {
        const btn = document.getElementById(GRID_CONFIG[type].btnId);
        if (!btn) return;

        btn.addEventListener('click', () => {
            const total = GRID_CONFIG[type].items().length;

            if (gridVisible[type] >= total) {
                gridVisible[type] = GRID_CONFIG[type].defaultVisible;
            } else {
                gridVisible[type] = Math.min(gridVisible[type] + GRID_CONFIG[type].step, total);
            }

            renderGridSection(type);
        });
    });
}

function updateGridButton(type) {
    const config = GRID_CONFIG[type];
    const btn = document.getElementById(config.btnId);
    if (!btn) return;

    const total = config.items().length;

    if (total <= config.defaultVisible) {
        btn.style.display = 'none';
        return;
    }

    btn.style.display = 'inline-flex';
    btn.textContent = gridVisible[type] >= total ? 'View Less' : 'View More';
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

function buildEmbedUrl(rawUrl) {
    if (!rawUrl) return '';

    try {
        const url = new URL(rawUrl);
        let videoId = '';

        if (url.hostname.includes('youtu.be')) {
            videoId = url.pathname.replace('/', '');
        } else if (url.pathname.includes('/shorts/')) {
            videoId = url.pathname.split('/shorts/')[1].split('/')[0];
        } else if (url.pathname.includes('/watch')) {
            videoId = url.searchParams.get('v') || '';
        } else if (url.pathname.includes('/embed/')) {
            videoId = url.pathname.split('/embed/')[1].split('/')[0];
        }

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }

        return rawUrl;
    } catch {
        return rawUrl;
    }
}

function openVideoPopup(data) {
    if (!videoPopupElement || !videoPopupIframe) return;

    videoPopupTitle.textContent = data.title;
    videoPopupDesc.textContent = data.description;
    const baseUrl = buildEmbedUrl(data.url);
    const separator = baseUrl.includes('?') ? '&' : '?';
    videoPopupIframe.src = `${baseUrl}${separator}autoplay=1`;

    videoPopupElement.classList.toggle('is-portrait', data.aspect === 'portrait');
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

    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
        target.scrollTop = 0;
    }

}

// --- 3. LIGHTBOX LOGIC ---

let lightbox = null;
let lightboxImg = null;
let currentIndex = 0;

function setupLightbox() {
    lightbox = document.getElementById('lightbox');
    lightboxImg = document.getElementById('lightbox-img');

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (lightbox && lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
        }
    });
}

function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;

    currentIndex = index;
    lightbox.style.display = 'flex';
    lightboxImg.src = headshotData[currentIndex].src;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox) return;

    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeSlide(n) {
    if (!lightboxImg) return;

    currentIndex += n;
    if (currentIndex >= headshotData.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = headshotData.length - 1;

    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.src = headshotData[currentIndex].src;
        lightboxImg.style.opacity = 1;
    }, 200);
}
