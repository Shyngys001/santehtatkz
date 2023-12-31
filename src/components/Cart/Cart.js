import { products } from "../../constants/data.js";
import { isEmptyArray, getTotalPrice } from "../../utils/index.js";

const cartItems = document.querySelector('.cart-items');
const cartContainer = document.querySelector('.cart-container');

const localStorageIDs = [1, 2, 3]; // Make it getter function from localStorage; -> which returns array of ID's; 
const id = 2;
const filteredProduct = products.filter((product) => product.id === id);

console.log(filteredProduct);

function showCartProducts() {

    if (isEmptyArray(filteredProduct)) {
        cartContainer.innerHTML = 'Opps, Your Cart Is Empty'
        return;
    }

    for (const product of filteredProduct) {
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="title">${product.name}</div>
                <div class="quantity">
                    <button class="qty-inc">-</button>
                    <span class="">${1}</span>
                    <button class="qty-dec">+</button>
                </div>
                <div class="price">${product.price} ₸</div>
            </div>
        `
    }

    showCartTotal();
}

function showCartTotal() {
    const cartRightSide = document.querySelector('.cart-right-side');
    const totalPrice = getTotalPrice(filteredProduct); // Get money with a formatter;
    const totalProducts = filteredProduct.length;
    console.log(totalPrice);

    cartRightSide.innerHTML = `
        <div class="flex">
            <span>Товары, ${totalProducts} шт.</span>
            <span>${totalPrice} ₸</span>
        </div>
        <div class="flex">
            <span>Итого</span>
            <span>${totalPrice} ₸</span>
        </div>
        <button>Заказать</button>
    `
}

showCartProducts()



/* 
Gonna Store ID of products on localStorage; 
Whenever user wants to add item to the cart;
Just go through 'products list' find by id and show in cart page;
--- 
For now that we don't have backend Its way easier, than storing all info about each product in localStorage;
*/