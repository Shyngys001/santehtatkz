import { products } from "../../constants/data.js";
import { isEmptyArray, getTotalPrice, useCounter, currencyFormat } from "../../utils/index.js";

const cartItems = document.querySelector('.cart-items');
const cartContainer = document.querySelector('.cart-container');

const cartProductIDs = getLocalStorageIDs();
const cartProducts = products.filter(product => cartProductIDs.includes(String(product.id)));

function showCartProducts() {
    if (isEmptyArray(cartProducts)) {
        cartContainer.innerHTML = 'Opps, Your Cart Is Empty'
        return;
    }

    for (const product of cartProducts) {
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="title">${product.name}</div>
                <div class="quantity">
                    <button class="qty-dec">-</button>
                    <span>${1}</span>
                    <button class="qty-inc">+</button>
                </div>
                <div class="price" data-initial-price="${product.price}">${currencyFormat(product.price)}</div>
            </div>
        `
    }

    const quantityButtons = document.querySelectorAll('.quantity button');

    quantityButtons.forEach(button => {
        button.addEventListener('click', () => useCounter(button));
    });

    showCartTotal();
}

function showCartTotal() {
    const cartRightSide = document.querySelector('.cart-right-side');
    const totalPrice = getTotalPrice(cartProducts); // Get money with a formatter;
    const totalProducts = cartProducts.length;

    cartRightSide.innerHTML = `
        <div class="flex">
            <span>Товары, ${totalProducts} шт.</span>
            <span>${currencyFormat(totalPrice)} ₸</span>
        </div>
        <div class="flex">
            <span>Итого</span>
            <span>${currencyFormat(totalPrice)} ₸</span>
        </div>
        <button>Заказать</button>
    `
}

showCartProducts();

function getLocalStorageIDs() {
    const cartIDs = JSON.parse(localStorage.getItem('cart')) || [];
    return cartIDs;
}

/* 
Gonna Store ID of products on localStorage; 
Whenever user wants to add item to the cart;
Just go through 'products list' find by id and show in cart page;
--- 
For now that we don't have backend Its way easier, than storing all info about each product in localStorage;
*/