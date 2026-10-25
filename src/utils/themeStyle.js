const WHITE = "#FFFFFF";
const BLACK = "#1A1A1A";

/**
 * Relative luminance of a #rrggbb color, as defined by WCAG
 * @param {string} hex
 */
function getLuminance(hex) {
    const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(a, b) {
    const [light, dark] = [getLuminance(a), getLuminance(b)].sort((x, y) => y - x);
    return (light + 0.05) / (dark + 0.05);
}

/**
 * Picks white or near-black text, whichever contrasts more with the background
 * @param {string} background #rrggbb color
 */
function getContrastText(background) {
    return getContrastRatio(background, WHITE) >= getContrastRatio(background, BLACK) ? WHITE : BLACK;
}

/**
 * Turns a theme's colors into the CSS custom properties the stylesheets use
 * @param {object} theme an entry from themes.js
 * @returns style object to put on the app's root element
 */
export function getThemeStyle({ colors }) {
    return {
        colorScheme: getLuminance(colors.background) < 0.2 ? "dark" : "light",
        "--bg": colors.background,
        "--ink": colors.ink,
        "--tile": colors.tile,
        "--tile-ink": getContrastText(colors.tile),
        "--accent": colors.accent,
        "--accent-ink": getContrastText(colors.accent),
    };
}
