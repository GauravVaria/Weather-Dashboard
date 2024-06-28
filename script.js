document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    document.getElementById('submit').addEventListener('click', function submitData() {
        const city = input.value;
        fetchWeatherData(city);
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const city = input.value;
            fetchWeatherData(city);
        }
    });

    async function fetchWeatherData(city) {
        try {
            const apifile = await fetch('api.json');
            const apidata = await apifile.json();
            const api = apidata.API_KEY;

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api}&units=metric`;

            const response = await fetch(url);
            if (!response.ok) {
                alertbox.render({
                    alertIcon: 'question',
                    title: 'Error',
                    message: 'Please enter a valid location.',
                    btnTitle: 'Ok',
                    themeColor: '#000000',
                    btnColor: '#252230',
                    border: true
                });
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);

            document.getElementById('city').innerHTML = `Forecast in: ${data.name}`;

            function updatetime() {
                let timestamp = data.dt;

                const date = new Date(timestamp * 1000);

                const month = date.getMonth();
                const day = date.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();

                const dayOfWeek = date.getDay();
                const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const dayName = daysOfWeek[dayOfWeek];

                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const monthName = months[month];

                const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                document.getElementById('time').innerHTML = `${dayName}, ${day} ${monthName} at ${formattedTime}`;
            }
            updatetime();

            const currTempEl = document.getElementById('currTemp');
            const highEl = document.getElementById('high');
            const lowEl = document.getElementById('low');
            const visibilityEl = document.getElementById('visibility');
            const weatherDesc = document.getElementById('weatherDescription');
            const cityEl = document.getElementById('city2');

            if (currTempEl) currTempEl.innerHTML = data.main.temp.toFixed(1);
            if (highEl) highEl.innerHTML = data.main.temp_max.toFixed(1);
            if (lowEl) lowEl.innerHTML = data.main.temp_min.toFixed(1);
            if (visibilityEl) visibilityEl.innerHTML = `Visibility: ${data.visibility}`;
            if (weatherDesc) weatherDesc.innerHTML = data.weather[0].description;
            if (cityEl) cityEl.innerHTML = data.name;

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
});
