import { updateHTMLContent } from "./auth.js"
import { getProducts } from "../api/api.js";
import { getSingleProductData } from "./product.js";


const body = document.querySelector('body')
const header = document.querySelector('header')
const searchInput = document.querySelector('#searchInput')
const username = document.querySelector('#user')
const logoutButton = document.querySelector('#logoutButton')
const productsList = document.querySelector('.productsList')
const darkModeButton = document.querySelector('#darkMode')
const icon = document.querySelector('#darkModeIcon')
const darkModeText = document.querySelector('#darkModeText')
let allProducts = null;
const scrollToTopButton = document.querySelector('#scrollToTopButton')
const backButton = document.querySelector('.backButton')

window.addEventListener('DOMContentLoaded', async () => {
    updateUsername()

    logoutButton.addEventListener('click', () => {
        document.cookie = "token=";
        updateHTMLContent()
    })
    
    let data = await getProducts()
    if(data.products) {
        allProducts = data.products
        displayProducts(allProducts)
    }

    searchInput.addEventListener('input', (e) => {
        let searchText = e.target.value
        searchProducts(searchText)
    })

    //product functions

    function displayProducts(products) {
        productsList.innerHTML = ""

        for(let i = 0; i < products.length; i++) {
            let product = products[i]
            let hasSale = product.discountPercentage > 14
            productsList.innerHTML += `
                <div class="product" id=${product.id}>
                    <img class="saleImage ${hasSale ? 'visible' : ''}" src='./assets/sale.png' >
                    <img class="productImage" src=${product.thumbnail} alt="">
                    <div class="productDescription">
                        <div class="productLeftContainer">
                            <p>${product.title}</p>
                            <div class="rating">
                                ${transformRatingToStars(product.rating)}
                            </div>
                        </div>
                        <div class="priceContainer">
                            <p class="newPrice ${hasSale ? 'visible' : ''}">
                                $${getNewPrice(product.price, product.discountPercentage)}
                            </p>
                            <p class="productPrice ${hasSale ? 'hasSale' : ''}">
                                $${product.price}
                            </p>
                        </div>
                    </div>
                </div>
            `
    
        }
    }

    function transformRatingToStars(ratingValue) {
        ratingValue = Math.round(ratingValue)

        let result = ""
        for(let i = 0; i < 5; i++) {
            result += `<i class="${ratingValue > i ? 'active' : ''} star fa-solid fa-star"></i>`
        }

        return result
    }

    function getNewPrice(price, discountPercentage) {
        return Math.round(price - (price * discountPercentage / 100))
    }

    function searchProducts(searchText) {
        searchText = searchText.toLowerCase().trim()
        let filteredProducts = allProducts.filter((item) => {
            return item.title.toLowerCase().includes(searchText)
        })
        displayProducts(filteredProducts)
    }


    //Dark Mode
    darkModeButton.addEventListener('click', () => {
        if(icon.classList.contains('fa-toggle-off')){
            icon.classList.remove('fa-toggle-off')
            icon.classList.add('fa-toggle-on')
            body.classList.add('darkMode')
            header.classList.add('headerDarkMode')
            backButton.classList.add('darkMode')
            darkModeText.textContent = 'Dark Mode'
        }else{
            icon.classList.remove('fa-toggle-on')
            icon.classList.add('fa-toggle-off')
            body.classList.remove('darkMode')
            header.classList.remove('headerDarkMode')
            backButton.classList.remove('darkMode')
            darkModeText.textContent = 'Light Mode'
        }
    })


    //Scroll To Top
    window.addEventListener("scroll", function() {
        if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
          scrollToTopButton.style.display = "block"
        } else {
          scrollToTopButton.style.display = "none"
        }
    })
    
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })

    
    const products = document.querySelectorAll('.product')
    const singleProductPage = document.querySelector('.singleProduct')
    products.forEach(item => {
        item.addEventListener('click', () => {
            productsList.classList.add('hidden')
            singleProductPage.classList.remove('hidden')
            document.documentElement.scrollTop = 0
            getSingleProductData(item.id)
        })
    })
})



export function updateUsername() {
    username.textContent = localStorage.getItem('username')
}



