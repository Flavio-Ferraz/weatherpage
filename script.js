//API_OPEN_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}&lang=pt_br'
//API_ICON_URL = 'https://openweathermap.org/img/wn'
//API_COUTRY = 'https://flagcdn.com/'

const apiKey = '2925bc2c8fa7783264acf86a9feccb07'
const input = document.querySelector('input')
const button = document.querySelector('button')
const element = document.querySelector('.info')

button.addEventListener('click', handleGetWeather)


async function handleGetWeather(event){
    event.preventDefault()

    const  location=input.value

    if(!location){
        return alert("Por favor, digite uma localidade.")
    }

    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}&lang=pt_br`)

    const data = await response.json()

    if(data.cod==='404'){
        element.innerHTML = '<h1 class="error">Localidade não encontrada</h1>'
    }

    element.innerHTML=`
                    <h1>${data.main.temp.toFixed(0)}ºC</h1>
                <div class="condition">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon+'.png'}" alt="Imagem da condição do tempo">
                    <span>${data.weather[0].description}</span>
                </div>
                <div class="city">
                    <span>${data.name}, ${data.sys.country}</span>
                    <img src="https://flagcdn.com/${data.sys.country.toLowerCase() +'.svg'}" alt="Imagem da bandeira do país">
                </div>
                <div class="details">
                    <div class="card">
                        <i class="ph ph-wind"></i>
                        <div>
                            <strong>Vento</strong>
                            <strong>${data.wind.speed} km/h</strong>
                        </div>
                    </div>
                    <div class="card">
                        <i class="ph ph-drop-half"></i>
                        <div>
                            <strong>Umidade</strong>
                            <strong>${data.main.humidity}%</strong>
                        </div>
                    </div>
                </div>  
    `
    input.value = ''
    input.focus()
}