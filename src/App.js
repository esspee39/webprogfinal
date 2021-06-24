import logo from './nuwo.png';
import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

const monURL = "https://pokeapi.co/api/v2/pokemon/";

var monType1 = "";
var monType2 = "";

var moveURL;
const NORMAL = 0;
const FIGHTING = 1;
const FLYING = 2;
const POISON = 3;
const GROUND = 4;
const ROCK = 5;
const BUG = 6;
const GHOST = 7;
const STEEL = 8;
const FIRE = 9;
const WATER = 10;
const GRASS = 11;
const ELECTRIC = 12;
const PSYCHIC = 13;
const ICE = 14;
const DRAGON = 15;
const DARK = 16;
const FAIRY = 17;

const TYPES = ["NORMAL", "FIGHTING", "FLYING", "POISON", "GROUND", "ROCK", "BUG", "GHOST", "STEEL", "FIRE", "WATER", "GRASS", "ELECTRIC", "PSYCHIC", "ICE", "DRAGON", "DARK", "FAIRY"];
const MULTI = [[       1,          1,        1,        1,        1,     .5,     1,       0,      .5,      1,       1,       1,          1,         1,     1,        1,      1,       1],//NORMAL attacker
               [       2,          1,       .5,       .5,        1,      2,    .5,       0,       2,      1,       1,       1,          1,        .5,     2,        1,      2,      .5],//FIGHTING attacker
               [       1,          2,        1,        1,        1,     .5,     2,       1,      .5,      1,       1,       2,         .5,         1,     1,        1,      1,       1],//FLYING attacker
               [       1,          1,        1,       .5,       .5,     .5,     1,       1,       0,      1,       1,       2,          1,         1,     1,        1,      1,       2],//POSION attacker
               [       1,          1,        0,        2,        1,      2,    .5,       1,       2,      2,       1,      .5,          2,         1,     1,        1,      1,       1],//GROUND attacker
               [       1,         .5,        2,        1,       .5,      1,     2,       1,      .5,      2,       1,       1,          1,         1,     2,        1,      1,       1],//ROCK attacker
               [       1,         .5,       .5,       .5,        1,      1,     1,      .5,      .5,     .5,       1,       2,          1,         2,     1,        1,      2,      .5],//BUG attacker
               [       0,          1,        1,        1,        1,      1,     1,       2,       1,      1,       1,       1,          1,         2,     1,        1,     .5,       1],//GHOST attacker
               [       1,          1,        1,        1,        1,      2,     1,       1,      .5,     .5,      .5,       1,         .5,         1,     2,        1,      1,       2],//STEEL attacker
               [       1,          1,        1,        1,        1,     .5,     2,       1,       2,     .5,      .5,       2,          1,         1,     2,       .5,      1,       1],//FIRE attacker
               [       1,          1,        1,        1,        2,      2,     1,       1,       1,      2,      .5,      .5,          1,         1,     1,       .5,      1,       1],//WATER attacker
               [      .5,          1,       .5,       .5,        2,      2,    .5,       1,      .5,     .5,       2,      .5,          1,         1,     1,       .5,      1,       1],//GRASS attacker
               [       1,          1,        2,        1,        0,      1,     1,       1,       1,      1,       2,      .5,         .5,         1,     1,       .5,      1,       1],//ELECTRIC attacker
               [       1,          2,        1,        2,        1,      1,     1,       1,      .5,      1,       1,       1,          1,        .5,     1,        1,      0,       1],//PSYCHIC attacker
               [       1,          1,        2,        1,        2,      1,     1,       1,      .5,     .5,      .5,       2,          1,         1,    .5,        2,      1,       1],//ICE attacker
               [       1,          1,        1,        1,        1,      1,     1,       1,      .5,      1,       1,       1,          1,         1,     1,        2,      1,       0],//DRAGON attacker
               [       1,         .5,        1,        1,        1,      1,     1,       2,       1,      1,       1,       1,          1,         2,     1,        1,     .5,      .5],//DARK attacker
               [       1,          2,        1,       .5,        1,      1,     1,       1,      .5,     .5,       1,       1,          1,         1,     1,        2,      2,       1]];//FAIRY attacker

function getRandomID() {
  return Math.floor(Math.random() * (898 - 1) + 1);
}

function firstUpper(text){
  if(text == undefined){
    return text;
  }
  if(text[0] == undefined){
    return text;
  }
  if(text == null){
    return text;
  }
  if(text.length == 0){
    return text;
  }
  var newText = text[0].toUpperCase() + text.slice(1).toLowerCase();
  return newText;
}

function App(){
  const [pokemonA, setPokemonA] = useState("");
  const [pokemonDataA, setPokemonDataA] = useState([]);
  const [pokemonB, setPokemonB] = useState("");
  const [pokemonDataB, setPokemonDataB] = useState([]);
  const [moveType, setMoveType] = useState("");

  const [moveNameList, setMoveNameList] = useState([]);
  const [moveTypeList, setMoveTypeList] = useState([]);
  const [moveURLList, setMoveURLList] = useState([]);
  var moveIndex = 0;

  const handleChangeA = (e) => {
    setPokemonA(e.target.value.toLowerCase());
  };
  
  const handleSubmitA = (e) => {
    e.preventDefault();
    getPokemonA();
  };

  const handleButton = (e) => {
    e.preventDefault();
    console.log("BUTTON PUSHED");
  };

  const handleChangeB = (e) => {
    setPokemonB(e.target.value.toLowerCase());
  };
  
  const handleSubmitB = (e) => {
    e.preventDefault();
    getPokemonB();
  };

  const getPokemonA = async () => {
    const toArray = [];
    try {
      const res = await axios.get(monURL+pokemonA);
      toArray.push(res.data);
      setPokemonDataA(toArray);
    } catch (e) {
      console.log(e);
    }
  };

  const getPokemonB = async () => {
    const toArray = [];
    try {
      const res = await axios.get(monURL+pokemonB);
      toArray.push(res.data);
      setPokemonDataB(toArray);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("getMoveType triggered");
    getMoveType();
  }, [moveURL])

  const getMoveType = async () => {
    
    const toArray = [];
    try {
      const response = await axios.get(moveURL);
      toArray.push(response.data);
      console.log(response.data.name);
      moveNameList[moveIndex] = (response.data.name);
      console.log(response.data.type.name);
      moveTypeList[moveIndex] = (response.data.type.name);
      setMoveType(response.data.type.name);
    } catch (e) {
      console.log(e);
    }
  };


const renderMovesList = (dataA) => {
  var moveList = [];
  var URLList = [];
  var typeList = [];
  for(let i = 0; i < dataA.moves.length; i++){
    moveIndex = i;
    console.log("moveIndex updated to:");
    console.log(moveIndex);
    console.log(dataA.moves[i].move.name);
    moveURL = dataA.moves[i].move.url;
    console.log("moveURL updated to:");
    console.log(moveURL);
    moveList.push(dataA.moves[i].move.name);
    URLList.push(dataA.moves[i].move.url);
    typeList.push(" ");
  } 
  console.log(moveList);
  console.log(URLList);
  typeList[6] = moveTypeList[6];
  console.log(typeList);
  console.log(moveTypeList);
  
  return (
    <div className="learns">
      <ul>
        {moveList.map((move, index) => (
          <li key={index}>{firstUpper(dataA.name)} learns {firstUpper(move)} which is {grammarFixer(typeList[index])} {firstUpper(typeList[index])}-type move.</li>
        ))}
      </ul>
    </div>
  );
}

  //const getMoveList = moveNameList => moveNameList.map(move => (
  //  <li key={move.id}>{move.name}</li>
  //));

  //console.log(pokemonDataA);
  //console.log(pokemonDataB);

  //console.log("TEST TYPES:");
  //console.log(MULTI[ELECTRIC][GROUND]);
  //console.log(MULTI[ELECTRIC][FLYING]*MULTI[ELECTRIC][ELECTRIC]);

  return (
    <div className = "App">

      <div className="Mons">
        <div className="MonA">
          <form onSubmit={handleSubmitA}>
            <label>
              <input
                type="text"
                onChange={handleChangeA}
                placeholder="Enter Pokemon Name"
              />
            </label>
          </form>
          {pokemonDataA.map((data) => {
            return (
              <div className="container">
              <img src={data.sprites.other["official-artwork"]["front_default"]} height="120" width="120"/>
              </div>
            );
          })}
        </div>

        <div className="MonB">
          <form onSubmit={handleSubmitB}>
            <label>
              <input
                type="text"
                onChange={handleChangeB}
                placeholder="Enter Pokemon Name"
              />
            </label>
          </form>
          {pokemonDataB.map((data) => {
            console.log(moveURL);
            return (
              <div className="container">
              <img src={data.sprites.other["official-artwork"]["front_default"]} height="120" width="120"/>
              </div>
            );
          })}
        </div>
      </div>

      <div> 
        <button onClick={handleButton}>
          Generate Data
       </button>
        {pokemonDataA.map((dataA) => {return(renderMovesList(dataA));})}

        {pokemonDataB.map((dataB) => {
         console.log(dataB);
         if(dataB.types.length > 1){
          monType1 = dataB.types[0].type.name;
          monType2 = dataB.types[1].type.name;
          return (           
            <div className="learns">
              
            {firstUpper(dataB.name)} is {grammarFixer(dataB.types[0].type.name)} {firstUpper(dataB.types[0].type.name)}-type and {grammarFixer(dataB.types[1].type.name)} {firstUpper(dataB.types[1].type.name)}-type.
            </div>
          );
         }else{
          monType1 = dataB.types[0].type.name;
          monType2 = "none";
          return (
            <div className="learns">              
            {firstUpper(dataB.name)} is {grammarFixer(dataB.types[0].type.name)} {firstUpper(dataB.types[0].type.name)}-type.
            </div>
          );
         }
            
          })}
      </div>

    </div>
    //
  );
};







//DEDICATED TO JOVIAN12
function grammarFixer(type){
  if(type == undefined){
    return;
  }
  if(type[0] == undefined){
    return;
  }
  if(type[0].toUpperCase() == "I" || type[0].toUpperCase() == "E"){
    return "an";
  }else{
    return "a";
  }
}

export default App;
