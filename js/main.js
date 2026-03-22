// document.addEventListener('DOMContentLoaded', () => {

//     // --------------------------------------------------------
//     // Countdown Timer
//     // --------------------------------------------------------
//     const countdownDate = new Date();
//     countdownDate.setDate(countdownDate.getDate() + 11); // 11 days from now
//     countdownDate.setHours(countdownDate.getHours() + 4);
//     countdownDate.setMinutes(countdownDate.getMinutes() + 35);

//     function updateCountdown() {
//         const now = new Date().getTime();
//         const distance = countdownDate - now;

//         if (distance < 0) {
//             return;
//         }

//         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//         const timeVals = document.querySelectorAll('.time-val');
//         if (timeVals.length >= 4) {
//             timeVals[0].innerText = days < 10 ? '0' + days : days;
//             timeVals[1].innerText = hours < 10 ? '0' + hours : hours;
//             timeVals[2].innerText = minutes < 10 ? '0' + minutes : minutes;
//             timeVals[3].innerText = seconds < 10 ? '0' + seconds : seconds;
//         }
//     }

//     setInterval(updateCountdown, 1000);
//     updateCountdown();

//     // --------------------------------------------------------
//     // Product Tabs
//     // --------------------------------------------------------
//     const tabs = document.querySelectorAll('.product-tabs li');
//     tabs.forEach(tab => {
//         tab.addEventListener('click', () => {
//             tabs.forEach(t => t.classList.remove('active'));
//             tab.classList.add('active');
//             // Filter logic would go here
//         });
//     });

//     // --------------------------------------------------------
//     // Hero Slider (Simple Auto Switch)
//     // --------------------------------------------------------
//     // Note: Since we only implemented one slide structure in HTML for simplicity, 
//     // we will simulate a slide change effect or just leave it static as per the plan.
//     // However, if there were multiple .hero-slide elements, we would toggle the .active class.

//     const dots = document.querySelectorAll('.dot');
//     dots.forEach((dot, index) => {
//         dot.addEventListener('click', () => {
//             dots.forEach(d => d.classList.remove('active'));
//             dot.classList.add('active');
//             // Logic to switch slides would go here
//         });
//     });

//     // --------------------------------------------------------
//     // Mobile Menu Toggle (Placeholder)
//     // --------------------------------------------------------
//     const menuBtn = document.querySelector('.browse-categories');
//     if (menuBtn) {
//         menuBtn.addEventListener('click', () => {
//             console.log('Toggle Categories');
//         });
//     }
// });





// let AllPro = [];
// async function getPros() {
//   let res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
//   let finRes = await res.json();
//   AllPro = finRes.data.slice(0, 5);
//   disPros();
// }

// // ,,,,,,,,,,,,

// async function addToCart(prId) {
//   console.log(prId);
//   let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "Application/json",
//       token: localStorage.getItem("token"),
//     },
//     body: JSON.stringify({
//       productId: prId,
//     }),
//   });
//   let finalRes = await res.json();
//   console.log(finalRes);
// }

// // let btn = document.querySelector("#btn");
// // btn.addEventListener("click",function(){
// //     addToCart();
// // })

// $('.owl-carousel').owlCarousel({
//     loop:true,
//     margin:10,
//     nav:true,
//     responsive:{
//         0:{
//             items:2
//         },
//         600:{
//             items:4
//         },
//         1000:{
//             items:7
//         }
//     }
// })

// let AllPros = [];

// async function getPro() {
//   let res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
//     method: "GET",
//   });
//   let finalRes = await res.json();
//   AllPros = finalRes.data.slice(0, 5);
//   disPro();
// }
// getPro();

// function disPro() {
//   let pros = ``;
//   for (let i = 0; i < AllPros.length; i++) {
//     pros += `
//             <div class="col">
//                 <div class="product">
//                   <div class="pro-img">
//                     <a href="#">
//                       <img src="${"imgs/imgi_37_pro02.png"}" alt="" />
//                       <img src="${"imgs/imgi_37_pro02.png"}" alt="" />
//                     </a>
//                   </div>
//                   <div class="pro-info">
//                     <a href="#">
//                       <h3>${AllPros[i].title}</h3>
//                     </a>
//                     <p>
//                       ${AllPros[i].description}
//                     </p>
//                     <div class="pro-rate">
//                       <i class="fa-solid fa-star" ></i>
//                       <i class="fa-solid fa-star" ></i>
//                       <i class="fa-solid fa-star" ></i>
//                       <i class="fa-solid fa-star" ></i>
//                       <i class="fa-solid fa-star" ></i>
//                       <span>(${AllPros[i].ratingsQuantity} review)</span>
//                     </div>
//                     <div class="pro-price">
//                       <span><del>$250</del></span>
//                       <span>$${AllPros[i].price}</span>
//                     </div>
//                     <button id="btn" onclick="addToCart('${AllPros[i]._id}')">Add To Cart</button>
//                   </div>
//                   <div class="pro-discount">-12%</div>
//                   <div class="pro-controls">
//                     <div class="pro-icon-con">
//                       <i class="fa-regular fa-heart"></i>
//                     </div>
//                     <div class="pro-icon-con">
//                       <i class="fa-regular fa-eye"></i>
//                     </div>
//                     <div class="pro-icon-con">
//                       <i class="fa-solid fa-code-compare"></i>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//         `;
//   }
//   document.querySelector(".rec-products .row").innerHTML = pros;
// }

// async function getCartPros() {
//   let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "Application/json",
//       token: localStorage.getItem("token"),
//     },
//   });
//   let finalRes = await res.json();
//   console.log(finalRes.data.products);
// }
// getCartPros();






