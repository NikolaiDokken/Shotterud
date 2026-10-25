const LIGHT_TEXT = "#fff";
const DARK_TEXT = "rgba(0, 0, 0, 0.87)";
// Dark surfaces are lightened slightly so the top bar stands out from the page
const DARK_APP_BAR = "#282828";

/**
 * Relative luminance of a #rrggbb color, as defined by WCAG
 * @param {string} hex
 */
function getLuminance(hex) {
    const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Picks white text when it has at least 3:1 contrast against the background, otherwise dark text
 * @param {string} background #rrggbb color
 */
function getContrastText(background) {
    const contrastWithWhite = 1.05 / (getLuminance(background) + 0.05);
    return contrastWithWhite >= 3 ? LIGHT_TEXT : DARK_TEXT;
}

/**
 * Turns a theme's colors into the CSS custom properties the stylesheets use
 * @param {object} theme an entry from themes.js
 * @returns style object to put on the app's root element
 */
export function getThemeStyle({ colors }) {
    const isDark = colors.mode === "dark";
    const appBar = colors.appBar ?? (isDark ? DARK_APP_BAR : colors.primary);
    return {
        colorScheme: isDark ? "dark" : "light",
        "--primary": colors.primary,
        "--on-primary": getContrastText(colors.primary),
        "--secondary": colors.secondary,
        "--on-secondary": getContrastText(colors.secondary),
        "--background": colors.background,
        "--on-background": getContrastText(colors.background),
        "--text": isDark ? LIGHT_TEXT : DARK_TEXT,
        "--app-bar": appBar,
        "--on-app-bar": isDark ? LIGHT_TEXT : getContrastText(appBar),
    };
}
