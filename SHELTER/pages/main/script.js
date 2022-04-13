const body = document.querySelector("body");
const burger = document.querySelector(".burger_btn");
console.log(body)
console.log(burger)

burger.addEventListener('click', () => {
    body.classList.toggle("overflow_hidden");
});