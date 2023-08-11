const JSON_DATA = [];

//load json data
(() => {
    fetch(JSON_URL)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => JSON_DATA.push(element));
            debugInfo(`Json loaded: `, data);
        });
})();
