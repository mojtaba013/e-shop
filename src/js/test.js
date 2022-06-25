
const btnClick = document.querySelector(".btn");

 document.addEventListener("DOMContentLoaded",async ()=>{
    const tag = document.querySelector(".container");
  tag.innerHTML = `<button class="btn">click me</button>`;
});


 await btnClick.addEventListener("click", () => {
  console.log('hello world');
});

