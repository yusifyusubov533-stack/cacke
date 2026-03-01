const products=[
{id:1,name:"Velvet Orchid",price:110,oldPrice:150,cat:"ხილის",img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600"},
{id:2,name:"Noir Truffle",price:180,cat:"შოკოლადი",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"},
{id:3,name:"Grand Wedding",price:1100,oldPrice:1400,cat:"საქორწილო",img:"https://www.kumori.com.ph/cdn/shop/files/Screenshot_2024-11-05_at_10.20.20_AM.png?v=1730773240"},
{id:4,name:"Summer Berry",price:70,cat:"ხილის",img:"https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600"},
{id:5,name:"Golden Pistachio",price:240,oldPrice:300,cat:"შოკოლადი",img:"https://recipesblob.oetker.ca/assets/b75297c3976e41a39cf3e74376d1459a/360x400/birthday-cake-11.webp"},
{id:6,name:"Royal Layer",price:950,cat:"საქორწილო",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7x6786VLvfSL2E7XqCKdbO6W844Acv2y5aA&s"},
{id:7,name:"Cupcake Cake",price:70,cat:"შოკოლადი",img:"https://patisserie-valerie.co.uk/cdn/shop/files/luxurious-chocolate-wedding-cake-556169_800x.jpg?v=1716898355"},
{id:8,name:"Biscuit Cake",price:1070,cat:"საქორწილო",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aOqYoG7-hKRlC6XPy_k9cDzoE3xDZbun8g&s"},
{id:9,name:"Cappuccino Cake",price:65,cat:"ხილის",img:"https://natashaskitchen.com/wp-content/uploads/2020/05/Vanilla-Cupcakes-3.jpg"},
{id:10,name:"Muffin Cake",price:450,cat:"საქორწილო", oldPrice:650,img:"https://cakesbymk.com/wp-content/uploads/2024/06/Template-Size-for-Blog-Photos-85.jpg"},
{id:11,name:"Summer Berry",price:40,cat:"ხილის", oldPrice:80,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS3dDkXj9WDmA4fkxi-sBhVkuC8-1HSvnNkw&s"},
{id:12,name:"Chocolate Cake",price:65,cat:"შოკოლადი",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQvEnilq1C8yOhxjrY7PGqcMvhCbp9CcjGWA&s"},
];

const grid=document.getElementById("productGrid");
const cats=document.querySelectorAll(".cat");

function renderProducts(items){
grid.innerHTML=items.map(p=>{
const sale=p.oldPrice?Math.round(((p.oldPrice-p.price)/p.oldPrice)*100):0;
return`
<div class="card" onclick="viewProduct(${p.id})">
<div class="img-container">
${sale?`<div class="sale-badge">-${sale}%</div>`:''}
<img src="${p.img}">
</div>
<div style="padding:20px">
<h4 style="font-family:'Tenor Sans';margin-bottom:10px">${p.name}</h4>
<div class="price-wrapper">
<span class="current-price">${p.price} ₾</span>
${p.oldPrice?`<span class="old-price">${p.oldPrice} ₾</span>`:''}
</div>
<button class="btn-add">ნახვა</button>
</div>
</div>`}).join("");

setTimeout(()=>{
document.querySelectorAll(".card").forEach((card,i)=>{
setTimeout(()=>card.classList.add("show"),i*100);
});
},100);
}

function handleFilter(){
const active=[...cats].filter(c=>c.checked).map(c=>c.value);
const filtered=products.filter(p=>{
if(active.length===0)return true;
const catMatch=active.includes(p.cat);
if(active.includes("sale")&&active.length===1)return p.oldPrice;
if(active.includes("sale")&&active.length>1)return p.oldPrice&&active.includes(p.cat);
return catMatch;
});
renderProducts(filtered);
}
cats.forEach(c=>c.addEventListener("change",handleFilter));

function viewProduct(id){
const p=products.find(x=>x.id===id);
document.getElementById("mainContent").classList.add("hidden");
const page=document.getElementById("productPage");
page.classList.remove("hidden");
page.innerHTML=`
<button onclick="goHome()" style="background:none;border:none;color:var(--accent);cursor:pointer;margin-bottom:40px;font-size:16px;">← კოლექციაში დაბრუნება</button>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:60px;">
<img src="${p.img}" style="width:100%">
<div>
<h2 style="font-family:'Tenor Sans';font-size:40px;margin-bottom:20px">${p.name}</h2>
<div class="price-wrapper">
<span class="current-price" style="font-size:30px">${p.price} ₾</span>
${p.oldPrice?`<span class="old-price" style="font-size:20px">${p.oldPrice} ₾</span>`:''}
</div>
<p style="color:var(--gray);margin:30px 0;font-size:18px">
ეს ექსკლუზიური დესერტი დამზადებულია საუკეთესო ნატურალური ინგრედიენტებით.
</p>
<button class="btn-add" style="background:var(--accent);color:black;font-weight:600;padding:20px">შეკვეთა</button>
</div>
</div>`;
window.scrollTo(0,0);
}

function goHome(){
document.getElementById("productPage").classList.add("hidden");
document.getElementById("mainContent").classList.remove("hidden");
}

function toggleMenu(){
document.getElementById("navMenu").classList.toggle("active");
}

function closeMenu(){
document.getElementById("navMenu").classList.remove("active");
}

renderProducts(products);