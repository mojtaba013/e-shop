import { productsData } from "./products.js";

const productImage=document.querySelector('.product-image');
const productTitle=document.querySelector('.product-title');

let productId=sessionStorage.getItem('productId');
function displayProduct(){
    console.log(productId);
    const _product=productsData.find(p=>p.id==productId);
    productImage.innerHTML=`<img class="w-full h-auto" src=${_product.imageUrl}>`;
    productTitle.innerHTML=`
    <h1 class=" text-lg mb-1 md:mb-2 font-bold text-slate-800 md:text-2xl">${_product.title}</h1>
    <h2 class="font text-gray-500 md:text-lg">${_product.title}</h2>
    `;

}

displayProduct();