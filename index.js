$('.js-tilt').tilt({
    glare: false,
    maxGlare:1,
    easing:"cubic-bezier(.03,.98,.52,.99)",
    speed:300,
    transition:true, 
})




const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };



const url = " https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn")



let getPokeData = () => {
    //Generate random pokemon from 1 til 150
    let id = Math.floor(Math.random() *150)+1;
    //Get full url adress
    const fullUrl = url + id;
    // fetch generated url
    fetch(fullUrl)
    .then(res=>res.json())
    .then(data=>{
        generateCard(data)
    })
}

//Generate Cards

let generateCard = (data) => {
    const hp = data.stats[0].base_stat;
    const imgPoke = data.sprites.other.dream_world.front_default;
    const pokeName =  data.name[0].toUpperCase() + data.name.substring(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
    
    //Color card based on pokemon type
    const cardColor = typeColor[data.types[0].type.name];

    card.innerHTML=`     
    <p class="hp" class="js-tilt">
    <span>HP</span>
    ${hp}
</p>
<img class="poke-img" src="${imgPoke}"/>
<h2 class="poke-name">
    ${pokeName}
</h2>
<div class="types"class="js-tilt">
</div>
<div class="stats" class="js-tilt">
    <div>
    <h4>${statAttack}</h4>
    <p>Attack</p>
</div>
<div>
    <h4>${statDefense}</h4>
    <p>Defense</p>
</div>
<div>
    <h4>${statSpeed}</h4>
    <p>Speed</p>
</div>

</div>
    
    `
    appendTypes(data.types);
    styleCard(cardColor);
    
};
let appendTypes = (types)=> {
    types.forEach((item)=>{
        let span = document.createElement('SPAN');
        span.textContent = item.type.name[0].toUpperCase() + item.type.name.substring(1) ;
        document.querySelector(".types").appendChild(span);
    })
};

let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 44%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
      typeColor.style.backgroundColor = color;
      typeColor.style.borderRadius = 5 + "px";
      typeColor.style.padding = 5 + "px";
      typeColor.style.color = "white";
      typeColor.style.fontWeight = "bold";
    });
  };



btn.addEventListener("click" , getPokeData);
window.addEventListener("load" , getPokeData);