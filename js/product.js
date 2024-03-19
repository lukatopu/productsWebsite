import{getSingleProduct} from "../api/api.js"

const backButton = document.querySelector('.backButton')
const productsList = document.querySelector('.productsList')
const singleProductPage = document.querySelector('.singleProduct')
let itemInfo = document.querySelector('.productInfo')
let price = document.querySelector('.itemPrice')
let productTitle = document.querySelector('.itemName')
let itemStock = document.querySelector('.stock')
let qtyMinus = document.querySelector('.minusButton')
let qtyPlus = document.querySelector('.plusButton')
let qtyNum = document.querySelector('.qtyNumber')
let addToCartButton = document.querySelector('.addToCart')
let productData = null



backButton.addEventListener('click', () => {
    productsList.classList.remove('hidden')
    singleProductPage.classList.add('hidden')
})

function setProductData() {
    let productImg = document.querySelector('.mainPic')
    let sideImg = document.querySelector('.oth1')
    let sideImg1 = document.querySelector('.oth2')
    let sideImg2 = document.querySelector('.oth3')
    productImg.src = productData.images[0]
    sideImg.src = productData.images[1]
    sideImg1.src = productData.images[2]
    sideImg2.src = productData.images[3]
}

export async function getSingleProductData(id) {
    
    let data = await getSingleProduct(id)

    if(data.title) {
        backButton.classList.remove('hidden')
        productData = data
        productTitle.innerText = data.title
        itemStock.innerText = `left in stock: ${data.stock}`
        itemInfo.innerText = data.description
        price.innerText = `${data.price}$`
        setProductData()
    }
}



qtyPlus.addEventListener('click', (e) => {
    const currentQty = Number(qtyNum.innerText)
    qtyNum.innerText = currentQty + 1
});


qtyMinus.addEventListener('click', (e) => {
    let currentQty = Number(qtyNum.innerText);
    if (currentQty > 0) {
        qtyNum.innerText = currentQty - 1;
    }
});



addToCartButton.addEventListener('click', (e) => {
    addToCartButton.innerText ='succesfully added to cart'
    qtyNum.innerText = '1'
})


addToCartButton.addEventListener('mouseout', (e) => {
    addToCartButton.innerText = 'Add to Cart'
})


const mainImg = document.querySelector('.mainPic');
const sideImg = document.querySelector('.oth1');
const sideImg1 = document.querySelector('.oth2');
const sideImg2 = document.querySelector('.oth3');

sideImg.addEventListener('click', (e) => {
    mainImg.src = sideImg.src;
});

sideImg1.addEventListener('click', (e) => {
    mainImg.src = sideImg1.src;
});

sideImg2.addEventListener('click', (e) => {
    mainImg.src = sideImg2.src;
});
