let c = (el)=> document.querySelector(el);
let ca = (el)=> document.querySelectorAll(el);

c('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = c('#searchInput').value;
    
    if(input !== ''){

        clearInfo();
        showWarning('Carregando...');
        let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=2e20686711a9e0118a2f6f53b3c8099f&units=metric&lang=pt_br`;

        let result = await fetch(urlApi);

        let json = await result.json();

        if(json.cod === 200){
            setResults({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed ,
                windDeg: json.wind.deg
            });
        }else{
            clearInfo();
            showWarning('Localização não encontrada!');
        }

    }else{
        clearInfo();
        showWarning('Difite o nome da cidade desejada!');
    } 
});


function showWarning(warning){
    c('.aviso').innerHTML = warning;
}

function setResults(json){
    showWarning('');

    c('.resultado').style.display = 'block';
    c('.titulo').innerHTML = `${json.name}, ${json.country}`;
    c('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    c('.ventoInfo').innerHTML= `${json.windSpeed} <span>km/h</span>`;

    c('.ventoPonto').style.transform = `rotate(${json.windDeg-90}deg)`;

    c('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    showWarning('Informações retiradas do <a class="linkRef" href="https://openweathermap.org" target="blank">OpenWeather</a>')

}

function clearInfo(){
    showWarning('');
    c('.resultado').style.display = 'none';

}