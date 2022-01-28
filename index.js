window.addEventListener('DOMContentLoaded', async () => {

    const btn_responsive = document.querySelector('.btn_responsive')
    const nav_items = document.querySelector('.navItems')

    btn_responsive.addEventListener('click', () => btnResponsive(nav_items))

    /* Data */
    const ListRecommendations = await getListRecommendations()
    const newMusic = await getNewMusicTracks()
    const listMusicTop = await getListArtistTop()
    
    /* Año nuevo */
    addCardsToDOM(document.querySelector('.content_anioNuevo .content_cards'), ListRecommendations)
    /* Musica nueva */
    addCardsToDOM(document.querySelector('.content_musicaNueva .content_cards'), newMusic)
    /* Lista de canciones destacadas */
    addListItemsToDOM(document.querySelector('.content_cancionesNuevasDestacadas .listaDeCanciones'),listMusicTop)
    
})  
/* Btn nav responsive */
function btnResponsive(nav_items) {
    nav_items.classList.toggle('ocultar')
}
/* Add HTML to DOM */
function addCardsToDOM(div, data){
    div.innerHTML = createCardsHorizontal(data)
}
function addListItemsToDOM(div, data){
    div.innerHTML = createListItems(data)
}
/* 
    Create HTML 
*/
function createCardsHorizontal(info) {
    let htmlCards = ''
    info.forEach(data => {
        htmlCards += createCard(data)
    })
    return htmlCards
}
function createCard(data) {
    return `
    <div class="card">
        <div class="imagen">
            <img src="${data.image}" alt="${data.title}">
        </div>
        <div class="texto">
            <h4>${data.title}</h4>
            <p>${data.subtitle}</p>
        </div>
    </div>
    `
}
function createListItems(info){
    let listHtml = ''
    info.forEach(data => {
        listHtml += createItem(data)
    })
    return listHtml
}
function createItem(data){
    return `
    <div class="card">
        <div class="imagen">
            <img src="${data.image}" alt="${data.title}">
        </div>

        <div class="texto">
            <h4>${data.title}</h4>
            <p>${data.subtitle}</p>
        </div>

        <div class="boton">
            <img src="./icons/more-horizontal.svg" alt="link">
        </div>
    </div>
    `
}


/* 
    Get Data API
*/
// Top Latinos
async function getTopPopLatinos() {
    const response = await fetch("https://shazam.p.rapidapi.com/search?term=pop%20latino", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "shazam.p.rapidapi.com",
            "x-rapidapi-key": "9788db139bmshbc53a57232bd948p1e485fjsnf528f39d11ed"
        }
    })
    const data = await response.json()
    return data.tracks
}
// Top Artistas
async function getTopArtistas() {
    const response = await fetch("https://shazam.p.rapidapi.com/search?term=top%20artista", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "shazam.p.rapidapi.com",
            "x-rapidapi-key": "9788db139bmshbc53a57232bd948p1e485fjsnf528f39d11ed"
        }
    })
    const data = await response.json()
    const artistas = data.artists.hits.filter(artista => artista.artist.avatar)
    return artistas
}  
// Para año nuevo
async function getListRecommendations() {
    try {
        let listMusic = []

        const response = await fetch("https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": "9788db139bmshbc53a57232bd948p1e485fjsnf528f39d11ed"
            }
        })
        const data = await response.json()
        data.tracks.forEach(track => {
            listMusic = [
                ...listMusic,
                {
                    title: track.title,
                    subtitle: track.subtitle,
                    image: track.share.image,
                    url: track.url,
                }
            ]
        })
        return listMusic
    } catch (err) {
        console.log(err)
        return []
    }
}
// Para musica nueva 
async function getNewMusicTracks() {
    try {
        let newMusic = []
        const response = await fetch("https://shazam.p.rapidapi.com/search?term=new%20music", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": "9788db139bmshbc53a57232bd948p1e485fjsnf528f39d11ed"
            }
        })
        const data = await response.json()

        data.tracks.hits.forEach(hit => {
            newMusic = [
                ...newMusic,
                {
                    title: hit.track.title,
                    subtitle: hit.track.subtitle,
                    image: hit.track.share.image,
                    url: hit.track.url
                }
            ]
        })
        return newMusic
    } catch (err) {
        console.log(err)
        return []
    }
}
// Para lista de canciones nuevas
async function getListArtistTop() {
    try {
        let listArtistas = []
        const response = await fetch("https://shazam.p.rapidapi.com/songs/list-artist-top-tracks?id=40008598&locale=en-US", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "x-rapidapi-key": "3edd3ae533msh440d6db57d7da46p10a811jsn03f9fa96060f"
            }
        })
        const data = await response.json()
        data.tracks.forEach(track => {
            listArtistas = [
                ...listArtistas,
                {
                    title: track.title,
                    subtitle: track.subtitle,
                    image: track.share.image,
                    url: track.url,
                }
            ]
        })
        return listArtistas
    } catch (err) {
        console.log(err)
        return []
    }
}
async function getPopLatinoTop() {
    try {
        const response = await fetch("https://shazam.p.rapidapi.com/search?term=pop%20latino", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "shazam.p.rapidapi.com",
            "x-rapidapi-key": "9788db139bmshbc53a57232bd948p1e485fjsnf528f39d11ed"
        }
    })
    const data = await response.json()
    const track = data.tracks.hits[0].track
    return {
        title: track.title,
        subtitle: track.subtitle,
        image: track.share.image,
        url: track.url,
    }
    } catch (err) {
        console.log(err)
        return []
    }
}
 