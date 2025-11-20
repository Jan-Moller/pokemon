let BASE_URL = "https://pokeapi.co/api/v2/"
let currentPokemonArray = [];

async function init() {
    includeHTML();
    await getPokemonOverviewData()
    renderPokemonOverview()

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
        let details = await getData(`/pokemon/${pokemon.name}`);
        let german_name = await getData(`/pokemon-species/${pokemon.name}`)

        currentPokemonArray.push({
            id: i + 1,
            name: pokemon.name,
            type: details.types.map(type => type.type.name),
            img_url: details.sprites.other.dream_world.front_default,
            height: details.height,
            weight: details.weight,
            base_experience: details.base_experience,
            translated_name_de: german_name.names.find(n => n.language.name === "de")?.name || pokemon.name,
        })
    }
    console.log(currentPokemonArray);
}

function renderPokemonOverview() {
    let pokemonRef = document.getElementById('pokemon_overview');

    for (let i = 0; i < currentPokemonArray.length; i++) {
        const name = currentPokemonArray[i].translated_name_de;
        const types = getPokemonType(currentPokemonArray[i])
        pokemonRef.innerHTML += getPokemonOverviewCardTemplate(currentPokemonArray[i].type[0], currentPokemonArray[i].id, name, types, currentPokemonArray[i].img_url, currentPokemonArray[i].height, currentPokemonArray[i].weight, currentPokemonArray[i].base_experience) 
    }
}

function getPokemonType(currentPokemon) {
    let types = '';
    for (let i = 0; i < currentPokemon.type.length; i++) {
        let type = currentPokemon.type[i];
        types += /*html*/ `<img class="pokemon_overview_card_typ_img" src="/assets/img/${type}.png" alt="Icon des Pokemontyps">`
    }
    return types;
}

function openPokemonDetailView(){
    let dialog = document.querySelector('dialog')
    dialog.showModal();
}