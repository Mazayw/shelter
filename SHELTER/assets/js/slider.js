const LEFT_ARROW = document.querySelector('.left_arrow');
const RIGHT_ARROW = document.querySelector('.right_arrow');
const SLIDER = document.querySelector('.pets_slider_wrapper');
let LEFT_ITEMS = document.querySelector('#slider_left');
let RIGHT_ITEMS = document.querySelector('#slider_right');
let active_items = document.querySelector('#slider_active');
let numberOfSlides = 3;

//Active Pets Names
const activePetsNames = () => {
    let pets = [];
    const active = document.querySelectorAll("#slider_active > div > h4");
    for (i = 0; i < active.length; i++) {
        pets.push(active[i].innerHTML);
    }
    return pets;
};

//Filter cards pets for duplicates
const filterCards = (jsonPets, activePets) => {
    let result = jsonPets.filter(element => !activePets.includes(element.name));
    return result;
};

//Number of slides
if (frameWidth < 1280 && frameWidth >= 768) {
    numberOfSlides = 2;
} else if (frameWidth < 768) {
    numberOfSlides = 1;
}
debugInfo("Number of slides:", numberOfSlides);

// Card generator
const CREATE_CARD = (img_src, name) => {
    const sliderCard = document.createElement('div');
    sliderCard.classList.add('slider_card');
    const img = document.createElement('img');
    img.src = img_src;
    img.alt = name;
    sliderCard.appendChild(img);
    const h4 = document.createElement('h4');
    h4.classList.add('pet_name');
    h4.innerText = name;
    sliderCard.appendChild(h4);
    const button = document.createElement('button');
    button.classList.add('button');
    button.classList.add('button_secondary');
    button.innerText = 'Learn more';
    sliderCard.appendChild(button);
    return sliderCard;
};

const SLIDE_LEFT = () => {
    SLIDER.classList.add('transition_left');
    LEFT_ARROW.removeEventListener('click', SLIDE_LEFT);
    RIGHT_ARROW.removeEventListener('click', SLIDE_RIGHT);
};

const SLIDE_RIGHT = () => {
    SLIDER.classList.add('transition_right');
    LEFT_ARROW.removeEventListener('click', SLIDE_LEFT);
    RIGHT_ARROW.removeEventListener('click', SLIDE_RIGHT);
};

LEFT_ARROW.addEventListener('click', SLIDE_LEFT);
RIGHT_ARROW.addEventListener('click', SLIDE_RIGHT);

//Slider generator
function createSlider(arrayData, htmlSlider) {
    const petsNamesActive = activePetsNames();
    arrayData = filterCards(arrayData, petsNamesActive);
    debugInfo(`Array generated: `, arrayData);
    htmlSlider.innerHTML = '';
    arrayData.sort((a, b) => Math.random() - 0.5);
    for (let i = 0; i < numberOfSlides; i++) {
        const card = CREATE_CARD(arrayData[i].img, arrayData[i].name);
        htmlSlider.appendChild(card);
    }
    return htmlSlider;
}
//Slider worker
SLIDER.addEventListener('animationend', (animationEvent) => {
    let changedItem;
    if (animationEvent.animationName === 'move_left') {
        active_items.innerHTML = LEFT_ITEMS.innerHTML;
        SLIDER.classList.remove('transition_left');
        changedItem = LEFT_ITEMS;
    } else {
        active_items.innerHTML = RIGHT_ITEMS.innerHTML;
        SLIDER.classList.remove('transition_right');
        changedItem = RIGHT_ITEMS;
    }
    changedItem = createSlider(JSON_DATA, changedItem);
    LEFT_ARROW.addEventListener('click', SLIDE_LEFT);
    RIGHT_ARROW.addEventListener('click', SLIDE_RIGHT);
});

//Create slider elements
setTimeout(() => {
    LEFT_ITEMS = createSlider(JSON_DATA, LEFT_ITEMS);
    RIGHT_ITEMS = createSlider(JSON_DATA, RIGHT_ITEMS);
}, 300);




