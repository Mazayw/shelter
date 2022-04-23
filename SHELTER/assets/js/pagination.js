const BUTTON_FAST_BACKWARD = document.querySelector(".button_dback");
const BUTTON_BACKWARD = document.querySelector(".button_back");
const BUTTON_CURRENT = document.querySelector(".button_current");
const BUTTON_FORWARD = document.querySelector(".button_forward");
const BUTTON_FAST_FORWARD = document.querySelector(".button_dforward");
const PETS_SLIDER_CONTAINER = document.querySelector(".pets_slider_inner");
const numberOfAllSlides = 48;
let currentPage = 1;
let numberOfSlides = 8;
const PETS_DATA = [];
let numberOfPages = numberOfAllSlides / numberOfSlides;

//Generate pets from JSON
const GENERATE_PETS = () => {
    fetch(JSON_URL)
        .then(res => res.json())
        .then(data => petsGenerator(data))
        .then(allpets => {
            allpets.forEach(element => PETS_DATA.push(element));
            return petsShow(allpets);
        })
        .then(pets => createSlider(pets, PETS_SLIDER_CONTAINER));
};
GENERATE_PETS();

//Updater pagination buttons
function updatePagination() {
    if (currentPage > 1) {
        BUTTON_FAST_BACKWARD.removeAttribute('disabled');
        BUTTON_BACKWARD.removeAttribute('disabled');
    };

    if (currentPage === 1) {
        BUTTON_FAST_BACKWARD.setAttribute('disabled', '');
        BUTTON_BACKWARD.setAttribute('disabled', '');
    };

    if (currentPage === numberOfPages) {
        BUTTON_FAST_FORWARD.setAttribute('disabled', '');
        BUTTON_FORWARD.setAttribute('disabled', '');
    };

    if (currentPage < numberOfPages) {
        BUTTON_FAST_FORWARD.removeAttribute('disabled');
        BUTTON_FORWARD.removeAttribute('disabled');
    };
};





//Pagination buttons listener
BUTTON_BACKWARD.addEventListener('click', () => {
    currentPage--;
    BUTTON_CURRENT.textContent = currentPage;
    debugInfo('click', 'BUTTON_BACKWARD');
    updatePagination();
    createSlider(petsShow(PETS_DATA), PETS_SLIDER_CONTAINER);
});
BUTTON_FORWARD.addEventListener('click', () => {
    currentPage++;
    BUTTON_CURRENT.textContent = currentPage;
    debugInfo('click', 'BUTTON_FORWARD');
    updatePagination();
    createSlider(petsShow(PETS_DATA), PETS_SLIDER_CONTAINER);
});
BUTTON_FAST_BACKWARD.addEventListener('click', () => {
    currentPage = 1;
    BUTTON_CURRENT.textContent = currentPage;
    debugInfo('click', 'BUTTON_FAST_BACKWARD');
    updatePagination();
    createSlider(petsShow(PETS_DATA), PETS_SLIDER_CONTAINER);
});
BUTTON_FAST_FORWARD.addEventListener('click', () => {
    currentPage = numberOfPages;
    BUTTON_CURRENT.textContent = currentPage;
    debugInfo('click', 'BUTTON_FAST_FORWARD');
    updatePagination();
    createSlider(petsShow(PETS_DATA), PETS_SLIDER_CONTAINER);
});





//Calculating number of slides
function numberSlidersChecker() {
    if (frameWidth < 1280 && frameWidth >= 768) {
        numberOfSlides = 6;
    } else if (frameWidth < 768) {
        numberOfSlides = 3;
    };
    numberOfPages = numberOfAllSlides / numberOfSlides;
    debugInfo('Number of pages:', numberOfPages);
    debugInfo('Number of slides:', numberOfSlides);
};
numberSlidersChecker();

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

//Pets to show
function petsShow(arrayData) {
    const start = currentPage * numberOfSlides - numberOfSlides;
    const end = currentPage * numberOfSlides;
    return arrayData.slice(start, end);
};

//Randomizer of all pets
function petsGenerator(arrayData) {
    const ARRAY_OF_PETS = [];
    let prev = arrayData;
    let current;
    for (let i = 0; i < 6; i++) {
        do {
            current = arrayData.slice().sort((a, b) => Math.random() - 0.5);
        } while (prev == current);
        ARRAY_OF_PETS.push(current);
        prev = current;
    };
    return ARRAY_OF_PETS.flat();
    debugInfo('All pets: ', ARRAY_OF_PETS);
};



//Slider generator
function createSlider(arrayData, htmlSlider) {
    htmlSlider.innerHTML = '';
    for (let i = 0; i < arrayData.length; i++) {
        const card = CREATE_CARD(arrayData[i].img, arrayData[i].name);
        htmlSlider.appendChild(card);
    }
    return htmlSlider;
};
