// --- CONFIGURATION ---

// 1. FRAMES (HEADSHOTS) ARRAY
// Add your image filenames here.
const headshotData = [
    { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop", alt: "Frame 1" },
    { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop", alt: "Frame 2" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop", alt: "Frame 3" },
    { src: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=600&auto=format&fit=crop", alt: "Frame 4" },
    { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop", alt: "Frame 5" },
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", alt: "Frame 6" },
    { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop", alt: "Frame 7" },
    { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop", alt: "Frame 8" }
];

// 2. WORK ARRAYS
const workData = {
    theatre: [
        {
            url: "https://www.youtube.com/embed/YGpFIwxBh8c?si=rPMXTXwlAZdudpUc",
            title: "Appointed With Death",
            description: "A gripping take on Agatha Christie, layered in suspense and character tension.",
            image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop"
        },
        {
            url: "https://www.youtube.com/embed/TzM6Ms1u0q0?si=WEXKOmx6Mk2RtdZ7",
            title: "Jab Shehar Hamara Sota Hai",
            description: "An intimate urban chronicle presented with raw, emotional honesty.",
            image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop"
        },
        {
            url: "https://www.youtube.com/embed/n21nZXMZA2E?si=F_a3vl7_fBfKC-yi",
            title: "A Streetcar Named Desire",
            description: "Tennessee Williams revisited through a contemporary lens of longing.",
            image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop"
        },
        {
            url: "https://www.youtube.com/embed/s6Ilwq3I6mo?si=VKStkfBPgci8vaJr",
            title: "Macbeth",
            description: "A stormy descent into power and prophecy, underscored by sleek staging.",
            image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop"
        }
    ],
    // Empty array hides the section automatically
    other: [
        /* { 
            url: "https://www.youtube.com/embed/VIDEO_ID", 
            title: "Short Film Title" 
        } 
        */
    ]
};

const theatreClipData = [
    { url: "https://www.youtube.com/embed/Wag6KibLyns", title: "Clip: Wag6KibLyns", description: "Quick glimpse into a powerful monologue.", image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop" },
    { url: "https://www.youtube.com/embed/n21nZXMZA2E", title: "Clip: n21nZXMZA2E", description: "A snippet of raw emotional energy from the Streetcar piece.", image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop" },
    { url: "https://www.youtube.com/embed/jKLmEZ-1r_4", title: "Clip: jKLmEZ-1r_4", description: "Highlights a charged exchange with strong visual composition.", image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop" }
];
