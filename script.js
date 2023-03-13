

getWheather('Dubai');


function getWheather(city){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '512dce12famsh4a74388ddb60411p1e2f8ajsn2b411655e2b4',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };
    
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

document.getElementById('submit_city').addEventListner("click", ()=>{
    e.preventDefault();
    console.log(search.value);
})


