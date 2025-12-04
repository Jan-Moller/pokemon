let BASE_URL = "https://pokeapi.co/api/v2/"
let currentPokemonArray = [];
let currentPokemonCard = {};

async function init() {
    toggleLoadingSpinner()
    includeHTML();
    await getPokemonOverviewData()
    await renderPokemonOverview()
    toggleLoadingSpinner()
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

function toggleLoadingSpinner(){
    let spinner = document.getElementById('spinner');
    spinner.classList.toggle('d-none')
}

async function getData(path = "") {
    let response = await fetch(BASE_URL + path)
    let responseToJson = await response.json()
    return responseToJson;

}

async function getPokemonOverviewData() {
    let pokemons = await getData("/pokemon?limit=20&offset=0")

    for (let i = 0; i < pokemons.results.length; i++) {
        const pokemon = pokemons.results[i];
        let details = await getData(`/pokemon/${pokemon.name}`);
        let german_name = await getData(`/pokemon-species/${pokemon.name}`);

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

}

async function renderPokemonOverview() {
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

async function getPokemonDetails(id) {
    let pokemon = await getData(`pokemon/${id}`)
    let details = await getData(`/pokemon-species/${pokemon.name}`);
    let evolve_chain = await getEvolutionChain(`/pokemon-species/${pokemon.name}`);

    currentPokemonCard = {
        id: id,
        name: pokemon.name,
        type: pokemon.types.map(type => type.type.name),
        img_url: pokemon.sprites.other.dream_world.front_default,
        height: pokemon.height,
        weight: pokemon.weight,
        base_experience: pokemon.base_experience,
        translated_name_de: details.names.find(n => n.language.name === "de")?.name || pokemon.name,
        chain: evolve_chain,
        cries: pokemon.cries.legacy,
        base_happiness: details.base_happiness,
        capture_rate: details.capture_rate,
    }

    console.log(currentPokemonCard);


}

async function getEvolutionChain(url) {
    let chain_url = await getData(url);
    let evolve_chain_data = await getEvolutionChainData(chain_url.evolution_chain.url);
    let evolve_chain = [];
    let current = evolve_chain_data.chain;

    while (current) {
        if (current.species) {
            evolve_chain.push(current.species.name);
        }
        current = current.evolves_to && current.evolves_to[0];
    }
    return evolve_chain
}

async function getEvolutionChainData(url) {
    let response = await fetch(url);
    let responseToJson = await response.json()
    return responseToJson;
}

async function openPokemonDetailView(id) {
    let dialog = document.querySelector('dialog');
    let body = document.querySelector('body');
    await getPokemonDetails(id);
    let typesImg = getPokemonType(currentPokemonCard);
    let types = translatePokemonType(currentPokemonCard);
    let chain = await renderEvolutionChain(currentPokemonCard);
    body.style.overflow = "hidden";
    dialog.innerHTML = getOpenPokemonDetailViewTemplate(currentPokemonCard.type[0], currentPokemonCard.translated_name_de, id, currentPokemonCard.img_url, currentPokemonCard.base_experience, currentPokemonCard.height, currentPokemonCard.weight, typesImg, types, chain, currentPokemonCard.base_happiness, currentPokemonCard.capture_rate, currentPokemonCard.cries);
    dialog.showModal();
}

function hideAllPokemonContentInfo() {
    let content_ids = ['pokemon_card_content_stats', 'pokemon_card_content_chain', 'pokemon_card_content_more_stats', 'pokemon_card_content_types']
    for (let i = 0; i < content_ids.length; i++) {
        let id = content_ids[i];
        let idRef = document.getElementById(id);
        idRef.style.display = 'none';
    }
}

function showPokemonContentInfo(info) {
    hideAllPokemonContentInfo();
    let infoSideRef = document.getElementById(`pokemon_card_content_${info}`)
    infoSideRef.style.display = 'flex';
}

function translatePokemonType(currentPokemonCard) {
    const pokemonTypes = ["grass", "fire", "water", "bug", "flying", "normal", "poison", "electric", "ground", "fairy", "fighting", "psychic", "rock", "ghost", "ice", "dragon"];
    const pokemonTypesGerman = ["Pflanze", "Feuer", "Wasser", "Käfer", "Flug", "Normal", "Gift", "Elektro", "Boden", "Fee", "Kampf", "Psycho", "Gestein", "Geist", "Eis", "Drache"];
    let typesTranslated = '';

    for (let i = 0; i < currentPokemonCard.type.length; i++) {
        const type = currentPokemonCard.type[i];
        typesTranslated += /*html*/ `<h3 class="pokemon_card_content_types_translated">${pokemonTypesGerman[pokemonTypes.indexOf(type)]}</h3>`
    }
    return typesTranslated;
}

async function renderEvolutionChain(currentPokemonCard) {
    let chain = '';
    for (let i = 0; i < currentPokemonCard.chain.length; i++) {
        const pokemon = currentPokemonCard.chain[i];
        let pokemonDetails = await getData(`/pokemon-species/${pokemon}`);
        let pokemonImgData = await getData(`pokemon/${pokemon}`)
        let germanPokemon = pokemonDetails.names.find(n => n.language.name === "de")?.name || pokemon.name;
        let pokemonImgURL = pokemonImgData.sprites.other.dream_world.front_default;

        chain += getRenderEvolutionChainTemplate(germanPokemon, pokemonImgURL)
    }
    return chain
}

function playPokemonCry(cryUrl) {
   audio = new Audio(cryUrl);
   audio.play();
}
