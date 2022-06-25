import { productsData } from "./products.js";

const productContainer = document.querySelector(".productContainer");
const btnDisplayModal = document.querySelector(".basket");
const modal = document.querySelector(".modal");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".btnclose");
const cartItemsMobile = document.querySelector(".cartitemsMobile");
const cartItemsDesktop = document.querySelector(".cartitemsDesktop");
const total = document.querySelector(".total-price");
const cartElements = document.querySelector(".cartelements");
const btnClear = document.querySelector(".btnclear");
const searchElement = document.querySelector("#search");
const basketMobile = document.querySelector(".basketMobile");
const pRange = document.querySelector(".priceRange");
const desktopPriceRange = document.querySelector(".desktop-priceRange");
const price = document.querySelector(".price");
const desktopPrice = document.querySelector(".desktop-price");
const btncancel = document.querySelector(".btn-cancel");
const btnok = document.querySelector(".btn-ok");
const _brand = document.querySelector(".brand");
const desktopBrand=document.querySelector('.desktop-brand')
const filteritems = document.querySelector(".filter-items");
const circle=document.querySelector('.circle');
const title=document.querySelector('.productContainer');

let counter = 1;
let cart = [];
let addButtons = [];
let allData = [];
let filters = [];

document.addEventListener("DOMContentLoaded", () => {
  // axios.get("http://localhost:3000/pdata").then((res) => {
  //   //console.log(res.data);
  //   allData = res.data;

  // });
  displayAllProducts();
  getCartbtn();
  countCartItems(cart);
  saveAllDataToStorage();
  //showCartItems();
});

btncancel.addEventListener("click", () => {
  filteritems.innerText = "";
  displayAllProducts();
});

function displayAllProducts() {
  let tag = "";
  //console.log(allData);
  productsData.forEach((product) => {
    tag += `
    <div class="bg-stone-50 rounded-lg p-2 shadow-xl ">
    
     <div class=" mb-3   p-2 rounded-lg   ">
    <img  class="w-full h-auto" src=${product.imageUrl}  alt="" />
    </div>


 <div  class="h-12 flex items-center   ">
 <a href="/public/singleProduct.html">
 <span data-id=${product.id}  class="title flex items-center justify-center font-medium text-sm  pr-2 mb-2 overflow-hidden text-ellipsis ">${product.title}</span>
 </a>
  
  </div>
  
<div class="flex items-center justify-center mb-4">

<p  class=" text-center font-medium text-orange-700 text-xl sm:text-base ">${product.price} تومان</p>
</div>
  
  <hr class="mb-1" />
  <button data-id="${product.id}" class="btnorder w-full py-2 font-medium text-xl sm:text-base  text-center text-orange-400"> 
  مشاهده و سفارش
   </button> 
  
 
   
   </div>`;
    productContainer.innerHTML = tag;

  });
}

title.addEventListener('click',(e)=>{
  //console.log(e.target.dataset.id);
  sessionStorage.setItem('productId',e.target.dataset.id);
});

searchElement.addEventListener("input", search);
let elm = "";
pRange.addEventListener("input", (e) => {
  price.innerText  = Intl.NumberFormat('fa-IR', { maximumSignificantDigits: 3 }).format( e.target.value);
  elm = e;
});

desktopPriceRange.addEventListener('input',(e)=>{
  desktopPrice.innerText = Intl.NumberFormat('fa-IR', { maximumSignificantDigits: 3 }).format( e.target.value);
  console.log(e);
  elm = e;
  search(e);
});

_brand.addEventListener("click", (e) => {
  if (e.target.checked) filters = [...filters, e.target.dataset.id];
  else if (!e.target.checked)
    filters = filters.filter((item) => item !== e.target.dataset.id);
  //console.log(filters);
});

desktopBrand.addEventListener("click",(e)=>{
  if (e.target.checked) filters = [...filters, e.target.dataset.id];
  else if (!e.target.checked)
    filters = filters.filter((item) => item !== e.target.dataset.id);
    let filteredProducts = [];
    filters.forEach((item) => {
      filteredProducts = [
        ...filteredProducts,
        ...productsData.filter((p) => p.title.toLowerCase().includes(item)),
      ];
    });
    if (filteredProducts.length != 0) renderPage(filteredProducts);
    //else search(elm);
});



btnok.addEventListener("click", () => {
  let filteredProducts = [];
  filters.forEach((item) => {
    filteredProducts = [
      ...filteredProducts,
      ...productsData.filter((p) => p.title.toLowerCase().includes(item)),
    ];
  });
  if (filteredProducts.length != 0) renderPage(filteredProducts);
  else search(elm);
});

function search(_element) {
  const filteredData = productsData.filter((p) => {
    if (_element.target.classList.contains("search"))
      return p.title.toLowerCase().includes(_element.target.value);
    else if (_element.target.classList.contains("priceRange")||_element.target.classList.contains("desktop-priceRange"))
      return (
        parseInt(p.price.split(",").join("")) < parseInt(_element.target.value)
      );
  });
  if (filteredData) renderPage(filteredData);
  else displayAllProducts();
}

function renderPage(_filteredData) {
  productContainer.innerHTML = "";
  let tag = "";
  _filteredData.forEach((product) => {
    tag += `
    <div class="bg-stone-50 rounded-lg p-2 shadow-xl mb-9">
     <div class="mb-3 bg-slate-200 p-2 rounded-lg">
    <img src=${product.imageUrl} alt="" />
  </div>
  <div class="flex w-full justify-between items-center mb-4">
              <p class="font-medium text-xs text-slate-400">اپل</p>

              <div x-data="{color:'orange'}" class="flex justify-center items-center">
                <div @click="color='orange'"
                  class="flex justify-center items-center bg-orange-400 rounded-full w-6 h-6 sm:w-8 sm:h-8 cursor-pointer">
                  <svg x-show="color==='orange'" xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 sm:w-8 sm:h-8 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div @click="color='yellow'"
                  class="flex justify-center items-center bg-yellow-400 rounded-full w-6 h-6 sm:w-8 sm:h-8 -mr-0.5 cursor-pointer">
                  <svg x-show="color==='yellow'" xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 sm:w-8 sm:h-8 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div @click="color='blue'"
                  class="flex justify-center items-center bg-indigo-600 rounded-full w-6 h-6 sm:w-8 sm:h-8 -mr-0.5 cursor-pointer">
                  <svg x-show="color==='blue'" xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 sm:w-8 sm:h-8 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
  <p  class="font-medium text-sm text-slate-800 pr-2 mb-2">${product.title}</p>

  <p  class="mb-2 text-center font-medium text-orange-700 text-xl sm:text-base">${product.price}</p>
  <hr class="mb-2" />
  <button data-id="${product.id}" class="btnorder w-full font-medium text-xl sm:text-base mb-3 text-center text-orange-400"> 
  مشاهده و سفارش
   </button> 
   <div></div>
   </div>`;
    productContainer.innerHTML = tag;
  });
}

function createCartItems(cart) {
  const div = document.createElement("div");
  div.classList.add(".selected-product");
  div.innerHTML = ` 
       <div class="flex flex-row items-center justify-between px-4">
        <div>
  <img class="w-10 h-8" src="../../postcss/assets/images/watch7.jpg" alt="">
</div>
<div class="flex flex-col">
  <p>${cart.title}</p>
  <p>${cart.price}</p>
</div>
<div class="flex flex-col items-center justify-center">
  
  <i class="fa-solid fa-chevron-up cursor-pointer" data-id="${cart.id}"></i>

  <span class="quantity">${cart.quantity}</span>
 
  <i class="fa-solid fa-chevron-down cursor-pointer" data-id="${cart.id}"></i>
  
</div>
<span>
  <i class="fa-solid fa-trash cursor-pointer" data-id="${cart.id}"></i>
</span> </div>`;
  cartElements.appendChild(div);
}

function showCartItems() {
  const data = JSON.parse(localStorage.getItem("cart"));

  data.forEach((cart) => {
    createCartItems(cart);
  });
}

function saveAllDataToStorage() {
  localStorage.setItem("products", JSON.stringify(productsData));
}

function getProductById(_id) {
  const _products = JSON.parse(localStorage.getItem("products"));
  return _products.find((product) => product.id == _id);
}

function saveCart(_cart) {
  localStorage.setItem("cart", JSON.stringify(_cart));
}

function getCartbtn() {
  const btnAddtocart = [...document.querySelectorAll(".btnorder")];
  addButtons = btnAddtocart;
  btnAddtocart.forEach((btn) => {
    const _id = btn.dataset.id;
    cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    const stattusProduct = cart.find((product) => product.id == _id);
    if (stattusProduct) {
      btn.innerText = "تو سبد خرید هست";
      btn.disabled = true;
    }
    btn.addEventListener("click", (e) => {
      e.target.innerText = "تو سبد خرید هست!";
      e.target.disabled = true;
      const selectedProduct = { ...getProductById(_id), quantity: 1 };
      cart = [...cart, selectedProduct];
      saveCart(cart);
      countCartItems(cart);
      createCartItems(selectedProduct);
    });
  });
}

// btnClear.addEventListener("click", () => {
//   clearCart();
// });

function countCartItems(cart) {
  //console.log(cart);
  let tempCartItems = 0;
  const totalPrice = cart.reduce((acc, curr) => {
    tempCartItems += curr.quantity;
    return curr.quantity * curr.price + acc;
  }, 0);
  cartItemsDesktop.innerText = tempCartItems;
  cartItemsMobile.innerText = tempCartItems;
  // total.innerText = `${totalPrice} ریال `;
}

// function clearCart() {
//   while (cartElements.children.length) {
//     cartElements.removeChild(cartElements.children[0]);
//   }
//   cart.forEach((item) => removeCartItems(item.id));
// }

// cartElements.addEventListener("click", (e) => {
//   //console.log(e.target);
//   if (e.target.classList.contains("fa-chevron-up")) {
//     const _id = e.target.dataset.id;
//     //console.log(_id);
//     const product = cart.find((crt) => crt.id == _id);
//     //console.log(product);
//     product.quantity++;

//     e.target.nextElementSibling.innerText = product.quantity;
//     saveCart(cart);
//     countCartItems(cart);
//     //console.log(e.target.nextElementSibling);
//   } else if (e.target.classList.contains("fa-chevron-down")) {
//     const _id = e.target.dataset.id;
//     //console.log(_id);
//     const product = cart.find((crt) => crt.id == _id);
//     if (product.quantity === 1) {
//       e.target.parentElement.parentElement.parentElement.remove();
//       removeCartItems(_id);
//       return;
//     }
//     product.quantity--;

//     e.target.previousElementSibling.innerText = product.quantity;
//     saveCart(cart);
//     countCartItems(cart);
//   } else if (e.target.classList.contains("fa-trash")) {
//     const _id = e.target.dataset.id;
//     const product = cart.find((crt) => crt.id == _id);
//     e.target.parentElement.parentElement.remove();
//     removeCartItems(_id);
//   }
// });

function closeModalBox() {
  modal.style.opacity = "0";
  backDrop.style.display = "none";
  modal.style.transform = "translate(-50%,-100vh) ";
}

//btnDisplayModal.addEventListener("click", displayModal);

function displayModal() {
  modal.style.opacity = "1";
  modal.style.transform = "translate(-50%,-20%) ";
  modal.style.top = "20%";
  modal.style.left = "50%";
  backDrop.style.display = "block";
}

//closeModal.addEventListener("click", closeModalBox);
//backDrop.addEventListener("click", closeModalBox);

// cart
