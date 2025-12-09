function getPokemonOverviewCardTemplate(type, id, name, types, img, height, weight, exp) {
    return /*html*/ `
    <div class="flip-card" onclick="openPokemonDetailView(${id})">
    <article class="pokemon_overview_card background_color_${type} pokemon_overview_card_front">
        <section class="pokemon_overview_card_title">
            <span class="pokemon_over_card_id"><h2>#${id}</h2></span>
            <span><h2>${name}</h2></span>
        </section>
        <section class="pokemon_overview_card_front_content">
            <div class="pokemon_ovierview_card_front_types">${types}</div>
            <img class="pokemon_overview_card_pkm_img" src=${img} alt="Bild eines Pokemons">
        </section>
    </article>
     <article class="pokemon_overview_card pokemon_overview_card_back background_color_${type}">
        <h3>Größe: ${height}0cm</h3>
        <h3>Gewicht: ${(weight / 10)}kg</h3>
        <h3>Basis-Erfahrung: ${exp}EP</h3>
     </article> 
</div>
    `
}

function getOpenPokemonDetailViewTemplate(type, german_name, id, imgUrl, base_experience, height, weight, typesImg, types, chain, base_happiness, capture_rate, cry) {
    return /*html*/`
    <article class="pokemon_card background_color_${type}">
        <section class="pokemon_card_header">
            <img class="pokemon-next-btn" src="/assets/img/next.png" alt="Weiter Button" onclick="showNextPokemon(${id})">
            <img class="pokemon-previously-btn" src="/assets/img/prev_button.png" alt="Vorher Button" onclick="showPreviousPokemon(${id})">
            <div class="pokemon_card_header_headline">
                <h2>${german_name}</h2>
                <span class="pokekom_card_header_id">#${id}</span>
            </div>
            <div class="pokekom_card_header_img">
                <img src=${imgUrl} alt="Bild eines Pokemons">
            </div>
        </section>
        <section class="pokemon_card_navbar">
            <nav>
                <h4 onclick="showPokemonContentInfo('stats')">Stats</h4>
                <h4 onclick="showPokemonContentInfo('types')">Typ</h4>
                <h4 onclick="showPokemonContentInfo('chain')">Entwicklungen</h4>
                <h4 onclick="showPokemonContentInfo('more_stats')">Mehr Infos</h4>
            </nav>
        </section>
        <section class="pokemon_card_content">
        <article id="pokemon_card_content_stats" class="pokemon_card_content_stats">
            <div class="pokemon_card_content_stats_info"><label for="base_experience">Basis-Erfahrung:</label><span id="base_experience">${base_experience} EXP</span></div>
            <div class="pokemon_card_content_stats_info"><label for="pokemon_height">Größe:</label><span id="pokemon_height">${height}0 cm</span></div>
            <div class="pokemon_card_content_stats_info"><label for="pokemon_weight">Gewicht:</label><span id="pokemon_weight">${weight / 10} kg</span></div>
        </article>
         <article style="display: none" id="pokemon_card_content_types" class="pokemon_card_content_stats">
            <figure class="pokemon_card_content_types_figures">
                <div class="pokemon_card_content_types">${typesImg}</div>
                <figcaption class="pokemon_card_content_types">${types}</figcaption>
            </figure>
        </article>
        <article style="display: none" id="pokemon_card_content_chain" class="pokemon_card_content_stats">
           <section>${chain}</section>
           <section></section>
        </article>
         <article style="display: none" id="pokemon_card_content_more_stats" class="pokemon_card_content_stats">
            <div class="pokemon_card_content_stats_info"><label for="base_happiness">Basis-Freundschaft:</label><span id="base_base_happiness">${base_happiness}</span></div>
            <div class="pokemon_card_content_stats_info"><label for="capture_rate">Fangrate:</label><span id="capture_rate">${capture_rate}</span></div>
            <div class="pokemon_card_content_stats_info"><label for="pokemon_crie">Laut:</label><img class="pokemon_card_detailed_view_sound_symbol" onclick="playPokemonCry('${cry}')" src="assets/img/sound_on.png" alt="Bild eines Audio-Symbols"></div>
        </article>
        
        </section>
       
    </article>
    
    `
}


function getRenderEvolutionChainTemplate(germanPokemon, pokemonImgURL) {
    return /*html*/ `
        <figure class="pokemon_card_detailed_view_chain">
            <span>${germanPokemon}</span>
            <img src=${pokemonImgURL} alt="Bild des Pokemons">
        </figure>
        `
}