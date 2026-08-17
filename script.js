const loader = document.getElementById("loader");
const percent = document.getElementById("loaderPercent");
let p = 0;
const tick = setInterval(() => {
  p += Math.floor(Math.random()*6)+2;
  if (p >= 100) { p = 100; clearInterval(tick); }
  percent.textContent = String(p).padStart(2,"0");
}, 55);

window.addEventListener("load", () => {
  setTimeout(() => {
    percent.textContent = "100";
    loader.classList.add("hide");
    document.body.classList.add("loaded");
    setTimeout(()=>loader.remove(), 900);
  }, 2750);
});

const header = document.getElementById("header");
const progress = document.getElementById("progressBar");
const cursorGlow = document.getElementById("cursorGlow");
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (window.scrollY / h * 100) + "%";
});

document.addEventListener("mousemove", e => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
  cursorGlow.style.opacity = ".8";
});
document.addEventListener("mouseleave",()=>cursorGlow.style.opacity="0");

menu.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12, rootMargin:"0px 0px -40px 0px"});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    const target=document.querySelector(link.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
  });
});
