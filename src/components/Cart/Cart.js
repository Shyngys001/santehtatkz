import { products } from "../../constants/data.js";
import {
    isEmptyArray,
    getTotalPrice,
    getTotalQuantity,
    currencyFormat,
} from "../../utils/index.js";

const cartItems = document.querySelector('.cart-items');
const cartContainer = document.querySelector('.cart-container');

const cartProductIDs = getLocalStorageIDs();
let cartProducts = products.filter(product => cartProductIDs.includes(String(product.id)));

function showCartProducts() {
    if (isEmptyArray(cartProducts)) {
        cartContainer.innerHTML = 'Opps, Your Cart Is Empty'
        return;
    }

    for (const product of cartProducts) {
        cartItems.innerHTML += `
            <div class="cart-item" data-id="${product.id}">
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

showCartProducts();


function showCartTotal() {
    const cartRightSide = document.querySelector('.cart-right-side');
    const totalPrice = getTotalPrice(cartProducts);
    const totalProducts = getTotalQuantity(cartProducts);

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
    `;
}

function useCounter(button) {
    const quantityElement = button.parentElement.querySelector('span');
    let currentQuantity = parseInt(quantityElement.textContent, 10);

    if (button.classList.contains('qty-inc')) {
        currentQuantity++;
    } else if (button.classList.contains('qty-dec') && currentQuantity > 1) {
        currentQuantity--;
    }

    quantityElement.textContent = currentQuantity;

    // Find the closest parent .cart-item and get the product ID
    const cartItem = button.closest('.cart-item');
    const productId = cartItem.dataset.id;

    const priceElement = cartItem.querySelector('.price');
    const initialPrice = parseFloat(priceElement.dataset.initialPrice);
    const updatedPrice = (currentQuantity * initialPrice).toFixed(2);

    priceElement.textContent = currencyFormat(updatedPrice);

    // Update the cartProducts array with the new quantity
    const updatedCartProducts = cartProducts.map(product => {
        if (product.id === +productId) {
            return {
                ...product,
                quantity: currentQuantity,
            };
        }
        return product;
    });

    console.log(updatedCartProducts);
    cartProducts = updatedCartProducts;

    // Update the total display
    showCartTotal();
}

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