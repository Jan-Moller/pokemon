let BASE_URL = "https://pokeapi.co/api/v2/"
let currentPokemonArray = [];

async function init() {
    includeHTML();
    await getPokemonOverviewData()

}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

async function getData(path = "") {
    let response = await fetch(BASE_URL + path)
    let responseToJson = await response.json()
    return responseToJson; 

}

async function getPokemonOverviewData() {
    let pokemons = await getData("/pokemon?limit=10&offset=0")
    for (let i = 0; i < pokemons.results.length; i++) {
        const pokemon = pokemons.results[i];
        let details = await getData(`/pokemon/${pokemon.name}`)

        currentPokemonArray.push({
            id: i + 1,
            name: pokemon.name,
            type: details.types.map(type => type.type.name),
            img_url: details.sprites.other.dream_world.front_default,
            height: details.height,
            weight: details.weight, 
            base_experience: details.base_experience,
        })
    }
    console.log(currentPokemonArray);
    
}