const BODY_BLACKOUT = document.querySelector('.body_blackout_modal');
const CLOSE_BUTTON = document.querySelector('.modal_window_block');

//Close modal window
const closeModalWindow = () => {
    const MODAL_WINDOW = document.querySelector('.modal_window_block');
    if (MODAL_WINDOW) {
        MODAL_WINDOW.remove();
        body.classList.toggle("overflow_hidden");
    }
};


//Creating modal window
const CREATE_MODAL_WINDOW = (objPet) => {
    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal_window_block');
    const modalHtml =
        `   <div class="body_blackout_modal" onclick="closeModalWindow()"></div>
        <div class="modal_window" style="animation - delay=250; animation - type=fadeIn">
        <button class="close_buton" onclick="closeModalWindow()" >
                <img class="modal_close" src="../../assets/icons/close.svg" alt="Modal window close button">
            </button>
            <img class="modal_pet_photo" src="${objPet.img}" alt="${objPet.type}-${objPet.name}">
            <div class="modal_content">
                <span class="modal_title">
                    <h3 class="modal_name">${objPet.name}</h3>
                    <h4 class="modal_subtitle">${objPet.type} - ${objPet.breed}</h4>
                </span>
                <h5 class="modal_description">${objPet.description}</h5>
                <ul class="modal_list">
                     <li class="modal_list_item modal_age"><span class="heading_bold">Age: </span>${objPet.age}</li>
                     <li class="modal_list_item modal_inoculations"><span class="heading_bold">Inoculations: </span>${objPet.inoculations}</li>
                     <li class="modal_list_item modal_diseases"><span class="heading_bold">Diseases: </span>${objPet.diseases}</li>
                     <li class="modal_list_item modal_parasites"><span class="heading_bold">Parasites: </span>${objPet.parasites}</li>
                </ul>
                </div>
            </div>`;
    modalWindow.innerHTML = modalHtml;
    return modalWindow;
};

//Modal window worker
document.body.addEventListener('click', (event) => {
    let clickedCardName, petObjData;
    petObjData
    if (event.target.closest('.slider_card')) {
        clickedCardName = event.target.closest('.slider_card').querySelector('.pet_name').innerText;
        petObjData = JSON_DATA.find(obj => obj.name === clickedCardName);
        document.body.appendChild(CREATE_MODAL_WINDOW(petObjData));
        body.classList.toggle("overflow_hidden");
    } else if (event.target.closest('.close_buton') || event.target.closest('.body_blackout_modal')) {
        closeModalWindow();
    } else return;
    debugInfo('Clicked card name: ', clickedCardName);
    debugInfo(`Clicked pets object:`, petObjData);
});