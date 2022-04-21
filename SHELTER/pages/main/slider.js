const LEFT_ARROW = document.querySelector('.left_arrow');
const RIGHT_ARROW = document.querySelector('.right_arrow');
const SLIDER = document.querySelector('.pets_slider_wrapper');
const LEFT_ITEMS = document.querySelector('#slider_left');
const RIGHT_ITEMS = document.querySelector('#slider_right');
let active_items = document.querySelector('#slider_active');



// Card generator
const CREATE_CARD = (img_src, name, id) => {
    const sliderCard = document.createElement('div');
    sliderCard.classList.add('slider_card');
    const img = document.createElement('img');
    img.src = img_src;
    img.alt = name;
    sliderCard.appendChild(img);
    const h4 = document.createElement('h4');
    h4.classList.add('pet_name');
    h4.innerHTML = name;
    sliderCard.appendChild(h4);
    const button = document.createElement('button');
    button.classList.add('button');
    button.classList.add('button_secondary');
    button.innerHTML = 'Learn more';
    button.setAttribute('id', id);
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

function createSlider(arrayData, htmlSlider) {
    arrayData.sort((a, b) => Math.random() - 0.5);
    //for (let i = 0; i < arrayData.length; i++) {
    for (let i = 0; i < 3; i++) {
        const card = CREATE_CARD(arrayData[i].img, arrayData[i].name, i);
        htmlSlider.appendChild(card);
    }
    return htmlSlider;
}

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
    changedItem.innerHTML = '';
    changedItem = createSlider(JSON_DATA, changedItem);

    LEFT_ARROW.addEventListener('click', SLIDE_LEFT);
    RIGHT_ARROW.addEventListener('click', SLIDE_RIGHT);
});



//event.target.closest('.класс карточки')


//document.querySelectorAll("#slider_active > div > h4") - active card list
