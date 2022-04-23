const body = document.querySelector("body");
const burger = document.querySelector(".burger_btn");
const burgerCheck = document.querySelector("#burger_menu");

burger.addEventListener('click', () => {
    body.classList.toggle("overflow_hidden");
});


function closeBurger() {
    if (burgerCheck.checked) {
        body.classList.remove("overflow_hidden");
        burgerCheck.checked = false;
    }
}

//close burger menu
document.body.addEventListener('click', (event) => {
    if (event.target.closest('.body_blackout')) {
        closeBurger();
    }
});