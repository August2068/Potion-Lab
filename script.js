let saveData = {
    potion : {
        name:"",
        color:"",
        effect:"",
        power:0,
        powerName:"",
        potionType:0
    },
    potionRDM : {
        name:"",
        color:"",
        effect:"",
        power:0,
        powerName:"",
        potionType:0
    }
}
const effect = {
    name : ["healing","poison","fire resistance","frost resistance"],
    type : [1,-1,1,-1],
    powerName:["weak","medium","strong","powerful","legendary"]
}
let oldPotion = document.getElementById("oldPotion");
let newPotion = document.getElementById("newPotion");
let fusedPotion = document.getElementById("fusedPotion");
let fuseButton = document.getElementsById("fuseButton");


if(load()==null){
    potionGenerator();
    oldPotion.children[0].src=`assets/images/${saveData.potion.powerName}-potion.png`;
    oldPotion.style.backgroundColor=saveData.potion.color;
    console.log(saveData.potion);
    potionRandomGenerator();
    newPotion.children[0].src=`assets/images/${saveData.potionRDM.powerName}-potion.png`;
    newPotion.style.backgroundColor=saveData.potionRDM.color;
};
//console.log(saveData.potion);
//console.log(saveData.potionRDM);
fuseButton.addEventListener("click",() =>{
    fusePotion(saveData.potion,saveData.potionRDM);
});
// console.log(saveData.potion);
// console.log(saveData.potionRDM);


function load(){
    return JSON.parse(localStorage.getItem("save"));
};

function save(state){
    localStorage.setItem("save", JSON.stringify(state));
};
function potionGenerator(){
    saveData.potion.power = Math.floor(Math.random() * 6); 
    saveData.potion.effect = randomValueFromArray(effect.name);
    saveData.potion.color = getRandomColor();
    saveData.potion.powerName = effect.powerName[Math.round(saveData.potion.power/2)];
    saveData.potion.name = `${saveData.potion.powerName} potion of ${saveData.potion.effect}`;
    saveData.potion.potionType = effect.type[effect.name.indexOf(saveData.potion.effect)];
};

function potionRandomGenerator(){
    saveData.potionRDM.power = Math.floor(Math.random() * 6); 
    saveData.potionRDM.effect = randomValueFromArray(effect.name);
    saveData.potionRDM.color = getRandomColor();
    saveData.potionRDM.powerName = effect.powerName[Math.round(saveData.potionRDM.power/2)];
    saveData.potionRDM.name = `${saveData.potionRDM.powerName} potion of ${saveData.potionRDM.effect}`;
    saveData.potionRDM.potionType = effect.type[effect.name.indexOf(saveData.potionRDM.effect)];
};

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function fusePotion(potion1,potion2){
    let power1 = potion1.power;
    let power2 = potion2.power;
    let power3 = 0;
    if(power1<power2){
        saveData.potion.effect = potion2.effect;
    }
    power3 = power1*potion1.potionType + power2*potion2.potionType;
    power3 = Math.abs(power3);
    saveData.potion.power= clamp((power3),0,10);
    saveData.potion.name = `${saveData.potion.powerName} potion of ${saveData.potion.effect}`;
    saveData.potion.potionType = effect.type[effect.name.indexOf(saveData.potion.effect)];
    saveData.potion.powerName = effect.powerName[Math.round(saveData.potion.power/2)];
    saveData.potion.color = getRandomColor();
    potionRandomGenerator();
    oldPotion.children[0].src=`assets/images/${saveData.potion.powerName}-potion.png`;
    fusedPotion.children[0].src=`assets/images/${saveData.potion.powerName}-potion.png`;
    newPotion.children[0].src=`assets/images/${saveData.potionRDM.powerName}-potion.png`;
    oldPotion.style.backgroundColor=saveData.potion.color;
    newPotion.style.backgroundColor=saveData.potionRDM.color;
    fusedPotion.style.backgroundColor=saveData.potion.color;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}