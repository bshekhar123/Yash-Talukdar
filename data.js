// --- CONFIGURATION ---

// 1. FRAMES (HEADSHOTS) ARRAY
// Add your image filenames here.
const headshotData = [
    { src: "Images/Yash (1).png", alt: "Frame 1" },
    { src: "Images/Yash (2).png", alt: "Frame 2" },
    { src: "Images/Yash (3).png", alt: "Frame 3" },
    { src: "Images/Yash (4).png", alt: "Frame 4" },
    { src: "Images/Yash (5).png", alt: "Frame 5" },
    { src: "Images/Yash (6).png", alt: "Frame 6" },
    { src: "Images/Yash (7).png", alt: "Frame 7" },
    { src: "Images/Yash (8).png", alt: "Frame 8" },
    { src: "Images/Yash (9).png", alt: "Frame 9" },
    // { src: "Images/yash.png", alt: "Frame 10" },

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
        // {
        //     url: "https://www.youtube.com/embed/n21nZXMZA2E?si=F_a3vl7_fBfKC-yi",
        //     title: "A Streetcar Named Desire",
        //     description: "Tennessee Williams revisited through a contemporary lens of longing.",
        //     image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop"
        // },
        // {
        //     url: "https://www.youtube.com/embed/s6Ilwq3I6mo?si=VKStkfBPgci8vaJr",
        //     title: "Macbeth",
        //     description: "A stormy descent into power and prophecy, underscored by sleek staging.",
        //     image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop"
        // }
    ],
    // Empty array hides the section automatically
    other: [
        {
            title: "Dubbed Series",
            description: "Character: Sandy — a moody, layered persona crafted for a faux player demo.",
            url: "https://drive.google.com/drive/folders/1wfKCB3wNjWtOvV-CB21xJt5wvZwK45Zb",
            image: "Images/dubbed.png"
        }
    ]
};

const theatreClipData = [
    { url: "https://www.youtube.com/embed/Wag6KibLyns", title: "Clip: Wag6KibLyns", description: "Quick glimpse into a powerful monologue.", image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop" },
    { url: "https://www.youtube.com/embed/n21nZXMZA2E", title: "Clip: n21nZXMZA2E", description: "A snippet of raw emotional energy from the Streetcar piece.", image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop" },
    { url: "https://www.youtube.com/embed/jKLmEZ-1r_4", title: "Clip: jKLmEZ-1r_4", description: "Highlights a charged exchange with strong visual composition.", image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=900&auto=format&fit=crop" }
];
