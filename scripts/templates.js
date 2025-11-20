function getPokemonOverviewCardTemplate(type, id, name, types, img, height, weight, exp) {
   return /*html*/ `
    <div class="flip-card" onclick="openPokemonDetailView()">
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
        <h3>Gewicht: ${(weight/10)}kg</h3>
        <h3>Basis-Erfahrung: ${exp}EP</h3>
     </article> 
</div>
    `
}