export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export const isEmptyArray = (array) => array.length < 1;

export const getTotalPrice = (array) => array.reduce((acc, curr) => acc + +curr.price, 0);

export const currencyFormat = (number, currency) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(number);
}