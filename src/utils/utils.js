export const writeToSessionStorage = (key, value) => {
    window.sessionStorage.setItem(key, value);
};

export const readFromSessionStorage = (key) => {
    return window.sessionStorage.getItem(key);
};
