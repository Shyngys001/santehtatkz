export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export const isEmptyArray = (array) => array.length < 1;

export const getTotalPrice = (array) => array.reduce((acc, curr) => acc + +curr.price, 0);

export const currencyFormat = (number) => {
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'KZT',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const formattedValue = formatter.format(number);
    const parts = formattedValue.split('.');

    const result = parts.length > 1 ? `${parts[0].replace(/\./g, ' ')} ${parts[1]}` : parts[0];

    return result.replace('KZT', '₸');
};

export function useCounter(button) {
    const quantityElement = button.parentElement.querySelector('span');
    let currentQuantity = parseInt(quantityElement.textContent, 10);

    if (button.classList.contains('qty-inc')) {
        currentQuantity++;
    } else if (button.classList.contains('qty-dec') && currentQuantity > 1) {
        currentQuantity--;
    }

    quantityElement.textContent = currentQuantity;

    // Update the corresponding price
    const cartItem = button.closest('.cart-item');
    const priceElement = cartItem.querySelector('.price');
    const initialPrice = parseFloat(priceElement.dataset.initialPrice);
    const updatedPrice = (currentQuantity * initialPrice).toFixed(2);

    priceElement.textContent = currencyFormat(updatedPrice);
}