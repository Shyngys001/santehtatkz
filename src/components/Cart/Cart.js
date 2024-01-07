import {
    isEmptyArray,
    getTotalPrice,
    getTotalQuantity,
    currencyFormat,
} from "../../utils/index.js";

const cartItems = document.querySelector('.cart-items');
const cartContainer = document.querySelector('.cart-container');
const modalOverlay = document.getElementById('orderModal');

let cartProducts = null;

loadCartData();

function loadCartData() {
    cartProducts = getCartData();
    showCartProducts();
    showCartTotal();
}

function showCartProducts() {
    if (isEmptyArray(cartProducts)) {
        cartContainer.innerHTML = 'Opps, Your Cart Is Empty'
        return;
    }

    cartItems.innerHTML = '';

    for (const product of cartProducts) {
        cartItems.innerHTML += `
            <div class="cart-item" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="title">${product.name}</div>
                <div class="quantity">
                    <button class="qty-dec">-</button>
                    <span>${product.quantity}</span>
                    <button class="qty-inc">+</button>
                </div>
                <div class="price-container">
                    <div class="price" data-initial-price="${product.price}">${currencyFormat(product.price * product.quantity)}</div>
                    <button class="cart-remove-btn">
                        <ion-icon name="trash" aria-hidden="true" aria-hidden="true"></ion-icon>
                    </button>
                </div>
            </div>
        `
    }

    // Add Listener for Quantity Buttons
    const quantityButtons = document.querySelectorAll('.quantity button');
    quantityButtons.forEach(button => {
        button.addEventListener('click', () => useCounter(button));
    });

    // Add Listener for Delete Buttons
    const deleteButtons = document.querySelectorAll('.cart-remove-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteCartItem);
    });

    showCartTotal();
}

function showCartTotal() {
    const cartRightSide = document.querySelector('.cart-right-side');
    const totalPrice = getTotalPrice(cartProducts);
    const totalProducts = getTotalQuantity(cartProducts);

    if (isEmptyArray(cartProducts)) {
        return;
    }

    cartRightSide.innerHTML = `
        <div class="flex">
            <span>Товары, ${totalProducts} шт.</span>
            <span>${currencyFormat(totalPrice)} ₸</span>
        </div>
        <div class="flex">
            <span>Итого</span>
            <span>${currencyFormat(totalPrice)} ₸</span>
        </div>
        <button id="order-button">Заказать</button>
    `;

    // Add an event listener to the "order-button" to show the modal
    const orderButton = document.getElementById('order-button');
    orderButton.addEventListener('click', function () {
        // Display the modal
        const orderModal = document.getElementById('orderModal');
        orderModal.style.display = 'flex';
    });

    // Add an event listener to the submit button
    const submitButton = document.querySelector('.form-button');
    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        submitOrderForm();
    });
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

    const cartItem = button.closest('.cart-item');
    const productId = cartItem.dataset.id;

    const priceElement = cartItem.querySelector('.price');
    const initialPrice = parseFloat(priceElement.dataset.initialPrice);
    const updatedPrice = (currentQuantity * initialPrice).toFixed(2);

    priceElement.textContent = currencyFormat(updatedPrice);

    const updatedCartProducts = cartProducts.map(product => {
        if (product.id === Number(productId)) {
            return {
                ...product,
                quantity: currentQuantity,
            }
        }
        return product;
    });

    cartProducts = updatedCartProducts;

    updateCartData(cartProducts);

    showCartTotal();
}

function deleteCartItem(event) {
    const cartItem = event.currentTarget.closest('.cart-item');
    const productId = cartItem.dataset.id;
    const cartData = getCartData();

    const updatedCartData = cartData.filter(product => product.id !== Number(productId));
    localStorage.setItem('cart', JSON.stringify(updatedCartData));

    cartProducts = updatedCartData;
    showCartProducts();
    showCartTotal();
}

//------ LocalStorage Helpers --------//
function getCartData() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    return cartData;
}

function updateCartData(updatedCartData) {
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
}

//? Submit Form;
function submitOrderForm() {
    // Grab all form inputs
    const userNameInput = document.querySelector('.form-input[name="userName"]');
    const userPhoneInput = document.querySelector('.form-input[name="userPhone"]');
    const userAddressInput = document.querySelector('.form-input[name="userAddress"]');

    const deliverOptions = document.querySelectorAll('.input-radios[name="deliver"]');
    const selectedDeliverOption = Array.from(deliverOptions).find(option => option.checked);
    const deliverValue = selectedDeliverOption ? selectedDeliverOption.value : '';

    const paymentOptions = document.querySelectorAll('.input-radios[name="payment"]');
    const selectedPaymentOption = Array.from(paymentOptions).find(option => option.checked);
    const paymentValue = selectedPaymentOption ? selectedPaymentOption.value : '';

    const userCommentTextarea = document.querySelector('.form-comment textarea[name="userComment"]');

    // Now you can use these values as needed (e.g., submit them via AJAX)
    console.log('User Name:', userNameInput.value);
    console.log('User Phone:', userPhoneInput.value);
    console.log('User Address:', userAddressInput.value);
    console.log('Delivery Option:', deliverValue);
    console.log('Payment Option:', paymentValue);
    console.log('User Comment:', userCommentTextarea.value);

    // You can add your AJAX submission logic here

    // Optionally, you can reset the form after submission
    resetForm();
}

function resetForm() {
    // Reset input values and radio buttons
    document.querySelector('.form-input[name="userName"]').value = '';
    document.querySelector('.form-input[name="userPhone"]').value = '';
    document.querySelector('.form-input[name="userAddress"]').value = '';

    const deliverOptions = document.querySelectorAll('.input-radios[name="deliver"]');
    deliverOptions.forEach(option => option.checked = false);

    const paymentOptions = document.querySelectorAll('.input-radios[name="payment"]');
    paymentOptions.forEach(option => option.checked = false);

    document.querySelector('.form-comment textarea[name="userComment"]').value = '';
}

//? Modal Window;
modalOverlay.addEventListener('click', function (event) {
    // Check if the clicked element is the modal overlay itself (not its children)
    if (event.target === modalOverlay) {
        // Close the modal
        closeModal();
    }
});

// Function to close the modal
function closeModal() {
    const orderModal = document.getElementById('orderModal');
    orderModal.style.display = 'none';
}