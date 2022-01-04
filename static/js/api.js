
//aqui llamamos a los datas nombrados en html
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
 //con esta funcionalidad mapeamos al tipo de pokemon colocandole en color que le corresponda y anadimos un color por default
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


const searchPokemon = event => {   //
    event.preventDefault();   //prevenimos una nueva descarga de la pagina por que el submit se  envia el form y trata de recargarse l pagina
    const { value } = event.target.pokemon;  //obteniendo el nombre del  pokemon  y sus valores conectando a fetch
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)//tambien le agregamos toLowerCase para evitar problemas con el requerimiento
        .then(data => data.json()) //optenemos la respose
        .then(response => renderPokemonData(response)) //llamamos a unafuncion y le enviamos el response
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {  //resive la data
    const sprite =  data.sprites.front_default;  //obtenemos los datos que requerimos e este caso sprites que es una url
    const { stats, types } = data;// aqui le decimos que si los atributos de el objeto tienen el mismo nombre que le pasamos{stats,types}se guaarda en esta variable

    pokeName.textContent = data.name;//momstramos el nombre data
    pokeImg.setAttribute('src', sprite);// el atributo src nos ayuda para mostrar la url que solicitamos
    pokeId.textContent = `Nº ${data.id}`;//con textContent agregamos el id de la data *ya en esta posicion podemos ver la imagen el nombre y el id
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}


const setCardColor = types => {//creamos esta funcion para anadirle fondo relacionado con el tipo de pokemon ejemplo:agua:color de fondo azul
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', '');
    pokeImg.style.background =  'white';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}