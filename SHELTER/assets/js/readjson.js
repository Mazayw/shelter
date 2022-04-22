const JSON_DATA = [];

//load json data
const load_file = () => {
    fetch(JSON_URL)
        .then(res => res.json())
        .then(data => data.forEach(element => JSON_DATA.push(element)));
};
load_file();