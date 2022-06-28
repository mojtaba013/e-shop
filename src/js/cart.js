

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
 div.classList.add('bg-white','rounded-lg','items-stretch','shadow-lg','px-4','py-2','mx-4');
  div.innerHTML= `
  <div class="grid grid-rows-4 grid-flow-col gap-x-4">

        <div class=" row-span-3   ">
          <img class="w-full h-28" src=${cart.imageUrl} alt="">
        </div>

        <div class=" row-span-1  flex items-center justify-center gap-x-2 ">
          <span data-id=${cart.id} class="_plus cursor-pointer   flex font-medium items-center justify-center rounded-full bg-gray-200 w-6 h-6 md:w-7 md:h-7">+</span>
          <span class="flex items-center justify-center border border-orange-500 rounded w-4 h-7 md:w-7 md:h-8 text-xs md:text-base" >${cart.quantity}</span>
          <span data-id=${cart.id} class="_minus cursor-pointer flex font-medium items-center justify-center rounded-full bg-orange-200 w-6 h-6 md:w-7 md:h-7">-</span>
        </div>

        <div  class="col-span-3 row-span-4 py-2 ">
        <section class="flex flex-col items-start justify-between">
            <span class="text-sm font-medium text-gray-700">${cart.title}</span>
            <div class="flex items-center gap-x-2">
            <span class="text-xs font-normal text-gray-500" >سری پردازنده:</span>
            <span class="font-normal text-slate-800" >celeron</span>
            </div>
            <div class="flex items-center gap-x-2">
            <span class="text-xs font-base text-gray-500" >ظرفیت حافظه RAM :</span>
            <span class="font-normal text-slate-800" >4 گیگ</span>
            </div>
            <div class="flex items-center gap-x-2">
            <span class="text-xs font-base text-gray-500" >اندازه صفحه نمایش :</span>
            <span class="font-normal text-slate-800" >15.6 اینچ</span>
            </div>
            
            <span class="text-gray-700 text-sm md:text-lg">${cart.price} تومان</span>
        </section>
          
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
