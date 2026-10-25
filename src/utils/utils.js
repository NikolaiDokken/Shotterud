/**
 * Reads a JSON value from sessionStorage
 * @param {string} key
 * @param {*} fallback returned when the key is missing or the stored value isn't valid JSON
 */
export const loadFromSessionStorage = (key, fallback) => {
    try {
        return JSON.parse(window.sessionStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
};

export const saveToSessionStorage = (key, value) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
};
