
const form = document.getElementById('form');
const searchCityInput = document.getElementById('search_city');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const element = document.getElementById('main');
const progressBar = document.querySelector('.progress-bar');
const my_city = document.getElementById('city_name');

getWheather('Dubai');

function getWheather(city_name) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '512dce12famsh4a74388ddb60411p1e2f8ajsn2b411655e2b4',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city_name, options)
        .then(response => {
            console.log(response);
            const clonedResponse = response.clone(); // Clone the response
            readResponse(response);
            return clonedResponse;
        })
        .then(response => {
            getData(response, city_name)})
        .catch(err => showError(err));

}
function getData(data, city_name) {
    
    if (data.status == 200 && city_name!=null) {
        data.json().then(response => {
            my_city.innerText = city_name;
            if (response.hasOwnProperty('temp')) {
                let highest_temp = response.max_temp;
                temp.innerHTML = response.temp;
                max_temp.innerHTML = highest_temp;
                max_temp2.innerHTML = highest_temp;
                min_temp.innerHTML = response.min_temp;
                feels_like.innerHTML = response.feels_like;

                var mysunrise = new Date(response.sunrise * 1000).toLocaleString();
                sunrise.innerHTML = mysunrise.substring(mysunrise.length - 10);
                var mysunset = new Date(response.sunset * 1000).toLocaleString();
                sunset.innerHTML = mysunset.substring(mysunset.length - 10);

                humidity.innerHTML = response.humidity;
                wind_degrees.innerHTML = response.wind_degrees;
                wind_speed.innerHTML = response.wind_speed;
                cloud_pct.innerHTML = response.cloud_pct;
                avg_temp.innerHTML = (parseInt(response.max_temp) + parseInt(response.min_temp)) / 2;
                if (parseInt(response.temp) > 25) {
                    document.querySelectorAll('.card-body p').innerText = "Today is very hot weather and chances of temprature rise.";
                }
                if (parseInt(response.temp) < 25 && parseInt(response.temp > 10)) {
                    document.querySelectorAll('.card-body p').innerText = "Today is very good weather and chances of little cold";
                }
                if (parseInt(response.temp) < 10) {
                    document.querySelectorAll('.card-body p').innerText = "Today is very cold weather and stay inside your blanket";
                }

            }

        });
    }

    else {
        element.innerHTML = '';
        if (data.status == 502) {
            showError("API server is not responsding. Contact your API provider.");
        }
        else {
            showError("This city does not exist in our Database");
            console.log("you stuck in else block");
        }

    }
}

function showError(errorMsg) {
    console.log(errorMsg);
    element.innerHTML = `
      <h2>${errorMsg}</h2>
      <hr class="text-divider">
      <div class="d-flex justify-content-center">
        <img src="images/sad.gif" alt="sad GIF" width="200" height="200">
      </div>
    `
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    progressBar.parentElement.style.display = 'block';
    getWheather(searchCityInput.value);
});


dropdownItems.forEach(item => {
    item.addEventListener('click', function () {
        const selectedCity = this.innerText;
        progressBar.parentElement.style.display = 'block';
        getWheather(selectedCity);
    });
});

function readResponse(response) {
    const totalBytes = parseInt(response.headers.get('content-length'));
    console.log(totalBytes);
    let bytesLoaded = 0;
    const reader = response.body.getReader();
  
    function read() {
        reader.read().then(({ done, value }) => {
            if (done) {
                progressBar.style.width = '100%';
                progressBar.setAttribute('aria-valuenow', '100');
                setTimeout(() => progressBar.parentElement.style.display = 'none', 1000);
                return;
            }
            bytesLoaded += value.byteLength;
            const progress = bytesLoaded / totalBytes * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
            read();
        });
    }
    return read();
}
