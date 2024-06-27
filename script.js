document.getElementById('submit').addEventListener('click', function submitData() {
    const input = document.getElementById('input');
    const city = input.value;
    fetchWeatherData(city);
})

async function fetchWeatherData(city) {

    try {
        const apifile = await fetch('api.json');
        const apidata = await apifile.json();
        const api = apidata.API_KEY;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api}&units=metric`;
        // const geourl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${api}`;

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
        console.log(data.main.temp);

        document.getElementById('city').innerHTML=`Forecast in: ${data.name}`;

    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}