export const setItem = (key, value) => {
    window.localStorage.setItem(key, value);
};

export const getItem = (key) => {
    let value = window.localStorage.getItem(key);
    return value;
};

export const removeItem = (key) => {
    window.localStorage.removeItem(key);
}