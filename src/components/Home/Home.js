import { products } from '../../constants/data.js';

/**--scroll reveal effect--*/
const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();
window.addEventListener('scroll', scrollReveal);

/*===Dynamic Creating New Products===*/
const newProductsList = document.querySelector('#new-products');
const newProducts = products.filter((item) => item.isNew === true);

const bestSellerProductsList = document.querySelector('#best-sellers');
const bestSellerProducts = products.filter((item) => item.bestseller === true);

const createNewProductsCard = (listOfProducts, listElement) => {
  return listOfProducts.forEach((item, inx) => {
    return listElement.innerHTML +=
      `
        <li class="scrollbar-item">
        <a class="shop-card" href="products.html">
          <div class="card-banner img-holder" style="--width: 540; --height: 720;">
            <img src="${item.image}" loading="lazy" alt="${item.name}" class="img-contain">
            ${item.hasDiscount ? `<span class="badge" aria-label="20% off">-20%</span>` : ''}
          </div>
          <div class="card-content">
            <h3><a href="products.html" class="card-title">${item.name}</a></h3>
            <div class="price">
              <span class="span">${item.price}₸ (шт.)</span>
            </div>
          </div>
        </a>
      </li>
    `
  })
}
createNewProductsCard(newProducts, newProductsList);
createNewProductsCard(bestSellerProducts, bestSellerProductsList);