

let cart = JSON.parse(localStorage.getItem('cart'));
const container=document.querySelector('.cartContainer');
const cartItemsMobile = document.querySelector(".cartitemsMobile");
const cartItemsDesktop = document.querySelector(".cartitemsDesktop");
const sp=document.querySelector('.sp');
const tPrice=document.querySelector('.totalprice');


document.addEventListener("DOMContentLoaded", () => {
  
  showCartItems();
  
});



function showCartItems() {
  const data = JSON.parse(localStorage.getItem("cart"));
  data.forEach((cart) => {
      //console.log(cart);
    createCartItems(cart);
    
  });
  countCartItems(data);
}

  function createCartItems(cart) {
 
  const div=document.createElement('div');
 div.classList.add('flex','flex-row','bg-white','rounded-lg','items-stretch','shadow-lg','px-4','py-2','mx-4');
  div.innerHTML= `
  <div class="w-16 md:w-24 h-auto">
    <img class="w-full h-auto" src=${cart.imageUrl}  alt="">
  </div>

  <div class="flex flex-1 flex-col  justify-between px-4 text-xs md:text-xl">
    <span class="font-bold text-slate-800 overflow-hidden">${cart.title}</span>
    <span class="text-orange-600 font-medium">${cart.price} تومان</span>
  </div>

  <div class="flex  flex-col  justify-between  items-end md:gap-x-6 "> 
  <i class="fas fa-trash-alt text-orange-500" data-id=${cart.id}></i>

  

    <div class="flex items-center gap-x-1 md:gap-x-3">
    <span data-id=${cart.id} class="_plus cursor-pointer   flex font-medium items-center justify-center rounded-full bg-gray-200 w-4 h-4 md:w-6 md:h-6">+</span>
    <span class="flex items-center justify-center border border-orange-500 rounded w-3 h-5 md:w-6 md:h-7 text-xs md:text-base" >${cart.quantity}</span>
    <span data-id=${cart.id} class="_minus cursor-pointer flex font-medium items-center justify-center rounded-full bg-orange-200 w-4 h-4 md:w-6 md:h-6">-</span>
  </div>
 
 
  </div>
`;
  container.appendChild(div);
}

function countCartItems(cart) {
  //console.log(cart);
  let tempCartItems = 0;
  const totalPrice = cart.reduce((acc, curr) => {
    tempCartItems += curr.quantity;
    return curr.quantity * parseInt(curr.price.split(",").join("")) + parseInt(acc);
  }, 0);  
  cartItemsMobile.innerText = tempCartItems;  
  cartItemsDesktop.innerText = tempCartItems; 
  tPrice.innerText=`${totalPrice}  تومان`;
  
}

function saveCart(_cart) {
  localStorage.setItem("cart", JSON.stringify(_cart));
}

function removeCartItems(_id) {
  cart = cart.filter((crt) => crt.id != _id);
  saveCart(cart);
  countCartItems(cart);
 
}

container.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.contains("_plus")) {
    const _id = e.target.dataset.id;
    //console.log(_id);
    const product = cart.find((crt) => crt.id == _id);    
    product.quantity++;

    e.target.nextElementSibling.innerText = product.quantity;
    saveCart(cart);
    countCartItems(cart);
    //console.log(e.target.nextElementSibling);
  } else if (e.target.classList.contains("_minus")) {
    const _id = e.target.dataset.id;
    //console.log(_id);
    const product = cart.find((crt) => crt.id == _id);
    if (product.quantity === 1) {
      e.target.parentElement.parentElement.parentElement.remove();
      removeCartItems(_id);
      return;
    }
    product.quantity--;

    e.target.previousElementSibling.innerText = product.quantity;
    saveCart(cart);
    countCartItems(cart);
  } else if (e.target.classList.contains("fa-trash-alt")) {
    const _id = e.target.dataset.id;
    const product = cart.find((crt) => crt.id == _id);
    e.target.parentElement.parentElement.remove();
    removeCartItems(_id);
    //console.log('trash',e.target.dataset.id);
  }
});
