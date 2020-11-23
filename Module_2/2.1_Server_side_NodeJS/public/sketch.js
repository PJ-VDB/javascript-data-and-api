        function setup() {

            noCanvas();
            const video = createCapture(VIDEO);
            video.size(320, 240);

            //set up button
            const button = document.getElementById("btn");

            //Fetch geolocation
            button.addEventListener('click', function () {
                video.loadPixels();
                const image64 = video.canvas.toDataURL();

                
                if ('geolocation' in navigator) {
                    console.log('geolocation is available')
                    const feel = document.getElementById('feeling').value;
                    navigator.geolocation.getCurrentPosition(async position => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        console.log(lat, lon);

                        document.getElementById('latitude').textContent = lat;
                        document.getElementById('longitude').textContent = lon;

                        const data = {
                            lat,
                            lon,
                            feel,
                            image64
                        };
                        const options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        };
                        const response = await fetch('/api', options);
                        const json = await response.json();
                        console.log(json);
                    });
                } else {
                    console.log('geolocation is not available');
                }
            });
        }