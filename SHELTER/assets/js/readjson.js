const JSON_URL = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json';
const JSON_DATA = [];

//load json data
const load_file = () => {
    fetch(JSON_URL)
        .then(res => res.json())
        .then(data => data.forEach(element => JSON_DATA.push(element)));
};
load_file();