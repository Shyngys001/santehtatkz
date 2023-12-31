import { products } from "../../constants/data.js";

const productCards = document.querySelector('.product-container');
const categories = document.querySelector('.categories');

//! Create cards;
function showProductsList() {

    for (const product of products) {
        productCards.innerHTML += `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-details-bottom">
                    <p class="product-price">${product.price}₸ (шт.)</p>
                    <div class="cart-icon" data-id="${product.id}">
                        <button class="action-btn add-to-cart-btn" aria-label="add to cart">
                            <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

showProductsList();

//! Create Categories;
const allCategories = [...new Set(products.map((product) => product.category))];
const listOfCategories = allCategories.map((category) => `<button class="btn">${category}</button>`);
categories.innerHTML += listOfCategories.join('');

//? Filter Products based on their textName;
function filterProduct(value) {
    const products = document.querySelectorAll('.product-card');
    products.forEach((element) => {
        if (value == 'Все') {
            element.classList.remove('hide');
        } else {
            const productElement = element.getAttribute('data-category');
            if (productElement === value) {
                element.classList.remove('hide');
            } else {
                element.classList.add('hide');
            }
        }
    })
}

categories.addEventListener('click', (evt) => {
    const clickedButton = evt.target;
    const noItemFoundMessage = document.querySelector('#noItemFoundMessage');

    if (clickedButton.classList.contains('btn')) {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        noItemFoundMessage.style.display = 'none';

        clickedButton.classList.add('active');
        filterProduct(clickedButton.innerText);
    }
});

//? Seach Item;
async function searchFirter() {
    const searchInputValue = document.querySelector('.search-input')?.value.toLowerCase();
    const noItemFoundMessage = document.querySelector('#noItemFoundMessage');
    // const spinner = document.querySelector('#spinner');

    if (searchInputValue.length < 1) {
        return;
    }

    const products = document.querySelectorAll('.product-card');
    let itemFound = false;

    for (const element of products) {
        const productToLowerCase = element.innerText.toLowerCase();
        if (productToLowerCase.includes(searchInputValue)) {
            element.classList.remove('hide');
            itemFound = true;
        } else {
            element.classList.add('hide');
        }
    }

    if (!itemFound) {
        noItemFoundMessage.style.display = 'block';
    } else {
        noItemFoundMessage.style.display = 'none';
    }
}

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', searchFirter)


function addToCart(event) {
    const productId = event.currentTarget.closest('.cart-icon').dataset.id;
    const product = products.find(product => product.id === Number(productId));

    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const isProductInCart = cartData.some(cartProduct => cartProduct.id === product.id);

    if (!isProductInCart) {
        cartData.push(product);
        localStorage.setItem('cart', JSON.stringify(cartData));

        Toastify({
            text: '✅ Товар добавлен в корзину',
            className: 'info',
            gravity: "top",
            position: "center",
            style: {
                background: "#fff",
                color: '#000',
                'border-radius': '7px',
                width: '300px'
            }
        }).showToast();

        showCartCounter();
    } else {
        return;
    }
}

function showCartCounter() {
    const cartIDs = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = document.querySelector('.btn-badge');

    cartCounter.innerText = cartIDs.length;
}