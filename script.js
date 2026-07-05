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
    },
    potionOBJ :{
        name:"",
        color:"",
        effect:"",
        power:0,
        powerName:"",
        potionType:0
    },
    potionList : []
}
const effect = {
    name : ["healing","poison","flying","curse","luck","petrification"],
    type : [1,-1,1,-1,1,-1],
    powerName:["weak","medium","strong","powerful","legendary", "unique"],
    color:["red","green","blue","purple","yellow","grey", "black","brown","orange"]
}
let score = 0;
const maxRound = 10;
let round = 0;
const maxRefresh = 5;
let refresh = 0;
let oldPotion = document.getElementById("oldPotion");
let newPotion = document.getElementById("newPotion");
let fusedPotion = document.getElementById("fusedPotion");
// let fuseButton = document.getElementById("fuseMEANDLEAVEMEALONE");
let shakerContainer = document.querySelector(".shakerContainer");
// let fuseButton = document.getElementsById("fuseButton");
let musicBG = document.getElementById("musicBG");
let musicFuseCount = 0;
let musicFuseArray = [document.getElementById("musicFuse1"),document.getElementById("musicFuse2"),document.getElementById("musicFuse3"),document.getElementById("musicFuse4"), document.getElementById("musicFuse5")];
let potionSelect = document.getElementById("potionselect");

document.addEventListener("click", ()=>{
    musicBG.play();
})

potionSelect.addEventListener("click",()=>{
    choosePotion();
});

if(load()==null){
    potionGenerator();
     if(saveData.potion.powerName=="unique"){
        oldPotion.children[0].src=`assets/images/${saveData.potion.powerName}-${saveData.potion.effect}-potion.png`;
    }else{
        oldPotion.children[0].src=`assets/images/${saveData.potion.color}-${saveData.potion.powerName}-potion.png`;
    }
    // oldPotion.style.backgroundColor=saveData.potion.color;
    oldPotion.style.borderRadius = "20px 20px 0 0";
    oldPotion.children[1].innerText=saveData.potion.name;
    saveData.potionList.push(structuredClone(saveData.potion)); 
    potionRandomGenerator();
    if(saveData.potionRDM.powerName=="unique"){
        newPotion.children[0].src=`assets/images/${saveData.potionRDM.powerName}-${saveData.potionRDM.effect}-potion.png`;
    }else{
        newPotion.children[0].src=`assets/images/${saveData.potionRDM.color}-${saveData.potionRDM.powerName}-potion.png`;
    }
        // newPotion.style.backgroundColor=saveData.potionRDM.color;
    newPotion.style.borderRadius = "20px 20px 0 0";
    newPotion.children[1].innerText=saveData.potionRDM.name;
    potionOBJGenerator(saveData.potionOBJ);
};
//console.log(saveData.potion);
//console.log(saveData.potionRDM);
shakerContainer.addEventListener("click",() =>{
    if(round<=maxRound){
        fusePotion(saveData.potion,saveData.potionRDM);
        //
        //  save(saveData);
        //
    if(musicFuseCount==5){
        musicFuseCount=0;
    }
    musicFuseArray[musicFuseCount].play();
    musicFuseCount++;
    }
    else{
        alert("Stop playing");
    }
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
    saveData.potion.color = randomValueFromArray(effect.color);
    saveData.potion.powerName = effect.powerName[Math.round(saveData.potion.power/2)];
    saveData.potion.name = `${saveData.potion.powerName} potion of ${saveData.potion.effect}`;
    saveData.potion.potionType = effect.type[effect.name.indexOf(saveData.potion.effect)];
};

function potionRandomGenerator(){
    saveData.potionRDM.power = Math.floor(Math.random() * 6); 
    saveData.potionRDM.effect = randomValueFromArray(effect.name);
    saveData.potionRDM.color = randomValueFromArray(effect.color);
    saveData.potionRDM.powerName = effect.powerName[Math.round(saveData.potionRDM.power/2)];
    saveData.potionRDM.name = `${saveData.potionRDM.powerName} potion of ${saveData.potionRDM.effect}`;
    saveData.potionRDM.potionType = effect.type[effect.name.indexOf(saveData.potionRDM.effect)];
};

function potionOBJGenerator(potionOBJ){
    potionOBJ.power = Math.floor(Math.random() * 11);
    potionOBJ.powerName = effect.powerName[Math.round(potionOBJ.power/2)];
    potionOBJ.effect = randomValueFromArray(effect.name);
    if(potionOBJ.powerName=="unique"){
        potionOBJ.color=effect.color[effect.name.indexOf(potionOBJ.powerName)];
    }else{
        potionOBJ.color = randomValueFromArray(effect.color);
    }
    potionOBJ.name = `${potionOBJ.powerName} potion of ${potionOBJ.effect}`;
    potionOBJ.potionType = effect.type[effect.name.indexOf(potionOBJ.effect)];
};

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
};

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
    saveData.potion.potionType = effect.type[effect.name.indexOf(saveData.potion.effect)];
    saveData.potion.powerName = effect.powerName[Math.floor(saveData.potion.power/2)];
    console.log(Math.floor(saveData.potion.power/2));
    console.log(effect.powerName[Math.floor(saveData.potion.power/2)]);
    saveData.potion.name = `${saveData.potion.powerName} potion of ${saveData.potion.effect}`;
    if(saveData.potion.powerName=="unique"){
        saveData.potion.color=effect.color[effect.name.indexOf(saveData.potion.effect)];
    }else{
        saveData.potion.color = colorPicker(potion1.color,potion2.color);
    }
    potionRandomGenerator();
    console.log(saveData.potion.power==10);
    if(saveData.potion.powerName=="unique"){
        oldPotion.children[0].src=`assets/images/${saveData.potion.powerName}-${saveData.potion.effect}-potion.png`;
        fusedPotion.children[0].src=`assets/images/${saveData.potion.powerName}-${saveData.potion.effect}-potion.png`;
    }else{
        oldPotion.children[0].src=`assets/images/${saveData.potion.color}-${saveData.potion.powerName}-potion.png`;
        fusedPotion.children[0].src=`assets/images/${saveData.potion.color}-${saveData.potion.powerName}-potion.png`;

    }
    newPotion.children[0].src=`assets/images/${saveData.potionRDM.color}-${saveData.potionRDM.powerName}-potion.png`;
    fusedPotion.style.borderRadius = "20px 20px 0 0";
    oldPotion.children[1].innerText=saveData.potion.name;
    fusedPotion.children[1].innerText=saveData.potion.name;
    newPotion.children[1].innerText=saveData.potionRDM.name;
    
    saveData.potionList.push(structuredClone(saveData.potion));
    potionSelect.options[potionSelect.options.length] = new Option(saveData.potionList[saveData.potionList.length-1].name, saveData.potionList.length-1);
    console.log(saveData.potionList);
    console.log(saveData.potionList.length);
    console.log(potionSelect);
};

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
};

function sellPotion(){
    if(saveData.potion.effect===saveData.potionOBJ.effect){
        score+=15;
    }else{
        score-=10;
    }
    if(saveData.potion.power===saveData.potionOBJ.power){
        score+=5;
    }else{
        score-=5;
    }
    if(saveData.potion.color===saveData.potionOBJ.color){
        score+=5;
    }else{
        score-=1;
    }
    if(saveData.potion.type===saveData.potionOBJ.type){
        score+=1;
    }else{
        score-=5;
    }
    if(saveData.potion.powerName=="unique"){
        score+=15;
    }
     score+=Math.log((maxRound/round)*10);
    round++;
    if(round=>maxRound){
        alert(`Game over / your score is ${score}`);
    }else{
        potionOBJGenerator(saveData.potionOBJ);
        potionRandomGenerator();
        newPotion.children[0].src=`assets/images/${saveData.potionRDM.color}-${saveData.potionRDM.powerName}-potion.png`;
        newPotion.style.borderRadius = "20px 20px 0 0";
        newPotion.children[1].innerText=saveData.potionRDM.name;
    }
};

function refreshPotion(){
    if (refresh<=maxRefresh){
        potionRandomGenerator();
        newPotion.children[0].src=`assets/images/${saveData.potionRDM.color}-${saveData.potionRDM.powerName}-potion.png`;
        newPotion.style.borderRadius = "20px 20px 0 0";
        newPotion.children[1].innerText=saveData.potionRDM.name;
    }else{
        alert("No more refresh available");
    }
    refresh++;
};

function choosePotion(){
    saveData.potion.power = saveData.potionList[potionSelect.value].power;
    saveData.potion.effect = saveData.potionList[potionSelect.value].effect;
    saveData.potion.color = saveData.potionList[potionSelect.value].color;
    saveData.potion.powerName = saveData.potionList[potionSelect.value].powerName;
    saveData.potion.name = saveData.potionList[potionSelect.value].name;
    saveData.potion.potionType = saveData.potionList[potionSelect.value].potionType;
     if(saveData.potion.powerName=="unique"){
        oldPotion.children[0].src=`assets/images/${saveData.potion.powerName}-${saveData.potion.effect}-potion.png`;
    }else{
        oldPotion.children[0].src=`assets/images/${saveData.potion.color}-${saveData.potion.powerName}-potion.png`;
    }
    oldPotion.style.borderRadius = "20px 20px 0 0";
    oldPotion.children[1].innerText=saveData.potion.name;
};

function colorPicker(color1,color2){
    console.log(color1, color2);
    let color3="";
    const sortOfPrimaryColor =["red","green","blue","yellow"];
    if(color1=="black" && color2=="black"){
        color3=randomValueFromArray(sortOfPrimaryColor);
    }else if (color1=="grey"||color2=="grey"){
        color3="black";
    }else if((color1=="black"||color2=="black")||((color1=="purple"||color1=="orange"||color1=="brown")&&(color2=="purple"||color2=="orange"||color2=="brown"))){
        color3="grey";
    }else if(((color1=="red"||color1=="yellow")&&(color2=="red"||color2=="yellow"))||((color1=="orange"||color2=="orange"))){
        color3="orange";
    }else if(((color1=="red"||color1=="green")&&(color2=="red"||color2=="green"))||((color1=="brown"||color2=="brown"))){
        color3="brown";
    }else if(((color1=="red"||color1=="green")&&(color2=="red"||color2=="green"))||((color1=="brown"||color2=="brown"))){
        color3="brown";
    }else if(((color1=="red"||color1=="blue")&&(color2=="red"||color2=="blue"))||((color1=="purple"||color2=="purple"))){
        color3="purple";
    }else if((color1=="blue"||color1=="green")&&(color2=="blue"||color2=="green")){
        color3="blue";
    }else if((color1=="yellow"||color1=="green")&&(color2=="yellow"||color2=="green")){
        color3="yellow";
    }else if((color1=="green"&&color2=="green")||((color1=="blue"||color1=="yellow")&&(color2=="blue"||color2=="yellow"))){
        color3="green";
    }else if (color1=="red"&&color2=="red"){
        color3="red";
    }else{
        color3=randomValueFromArray(effect.color);
    }
    return color3
};