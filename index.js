const pokeName = document.getElementById("Name");
    const pokeId = document.getElementById("Id");
    const pokeType = document.getElementById("Type");
    const pokeStats = document.getElementById("Stats");
    const pokeMoves = document.getElementById("Moves");

const fetchPokemon = () => {
    
    // Guardando el nombre del pokemón 

    const inputName = document.getElementById("inputName");
    let pokemonName = inputName.value;
    pokemonName = pokemonName.toLowerCase();

    // Usando la API en una variable para buscar por nombre

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    // Código asíncrono

    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokemonImage("./pokemon-sad.gif");
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            pokemonImage(pokeImg);
            setCardColor(data)
            console.log(data);
            pokeName.textContent = data.name;
            pokeId.textContent = `No. ${data.id}`;
            showType(data);
            showStats(data);
            showMoves(data);
        }
    }) 
}

// Cambiar datos del pokemon

const pokemonImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const setCardColor = data => {
    const colorOne = typeColors[data.types[0].type.name];
    const colorTwo = data.types[1] ? typeColors[data.types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const showType = data => {
    pokeType.textContent = "";
    data.types.forEach(type => {
        const typeName = document.createElement("div");
        typeName.textContent = type.type.name;
        typeName.style.color = "white";
        typeName.style.backgroundColor = typeColors[type.type.name]
        pokeType.append(typeName);
    });
}

const showStats = data => {
    pokeStats.textContent = "";
    data.stats.forEach(stat => {
        const statName = document.createElement("div");
        const statValue = document.createElement("div");
        const statContainer = document.createElement("div");
        statName.textContent = stat.stat.name;
        statValue.textContent = stat.base_stat;
        statContainer.append(statName);
        statContainer.append(statValue);
        pokeStats.append(statContainer);
    });
}

const showMoves = data => {
    pokeMoves.textContent = "";
    data.moves.forEach(move => {
        const moveName = document.createElement("div");
        moveName.textContent = move.move.name;
        moveName.style.color = "white";
        pokeMoves.append(moveName);
    });
}


// Colores para los tipos

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};