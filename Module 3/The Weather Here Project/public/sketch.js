        function setup() {

            noCanvas();
            let lat, lon;

            //set up button
            const button = document.getElementById("btn");

            //Fetch geolocation
            if ('geolocation' in navigator) {
                console.log('geolocation is available')
                navigator.geolocation.getCurrentPosition(async position => {

                    let weather, air;
                    try {

                        lat = position.coords.latitude;
                        lon = position.coords.longitude;
                        console.log(lat, lon);

                        const api_url = `weather/${lat},${lon}`;
                        const response = await fetch(api_url);
                        const json = await response.json();
                        weather = json.weather;
                        air = json.air_quality.results[0].measurements[0];
                        console.log(json);
                        document.getElementById('latitude').textContent = lat;
                        document.getElementById('longitude').textContent = lon;
                        document.getElementById('summary').textContent = weather.weather[0].description;
                        document.getElementById('temperature').textContent = weather.main.temp;
                        document.getElementById('aq_parameter').textContent = air.parameter;
                        document.getElementById('aq_value').textContent = air.value;
                        document.getElementById('aq_units').textContent = air.unit;
                        document.getElementById('aq_date').textContent = air.lastUpdated;

                        //updat with button
                        // button.addEventListener('click', async event => {

                    } catch (error) {
                        console.log("Something went wrong" + error);
                        document.getElementById('aq_value').textContent = "NO READING";
                        air = {value: -1 };
                    }

                    const data = {
                        lat,
                        lon,
                        weather,
                        air
                    };

                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    };
                    const db_response = await fetch('/api', options);
                    const db_json = await db_response.json();
                    console.log(db_json);

                });

            } else {
                console.log('geolocation is not available');
            }
        }