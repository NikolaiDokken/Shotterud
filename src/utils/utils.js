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

/**
 * Function that shuffles array in place using Fisher-Yates Shuffle
 * @param {array} array
 * @returns shuffled array
 */
export function shuffle(array) {
    for (let m = array.length - 1; m > 0; m--) {
        const i = Math.floor(Math.random() * (m + 1));
        [array[m], array[i]] = [array[i], array[m]];
    }
    return array;
}
