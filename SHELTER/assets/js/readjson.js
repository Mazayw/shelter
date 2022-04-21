const JSON_DATA = [];

//load json data
const load_file = () => {
    fetch(JSON_URL)
        .then(res => res.json())
        .then(data => data.forEach(element => { element.id = element.name + "-" + Math.trunc(Math.random() * 100000); JSON_DATA.push(element) }));
};
load_file();