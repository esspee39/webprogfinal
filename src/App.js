import logo from './nuwo.png';
import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

const monURL = "https://pokeapi.co/api/v2/pokemon/";

var moveURL;

function getRandomID() {
  return Math.floor(Math.random() * (898 - 1) + 1);
}

function firstUpper(text){
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

  useEffect(() => {
    getMoveType()
  }, [moveURL])

  const getMoveType = () => {
    axios.get(moveURL)
    .then(response => {
      console.log(response);
      setMoveType(response.data.type.name);
    })
  }

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
      console.log(toArray);
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

  //console.log(pokemonDataA);
  //console.log(pokemonDataB);

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
        {pokemonDataA.map((data) => {
            moveURL = data.moves[0].move.url;
            return (
              <div className="learns">
              {firstUpper(data.name)} learns {firstUpper(data.moves[0].move.name)} which is a {firstUpper(moveType)}-type move.
              </div>
            );
          })}
      </div>

    </div>
    //
  );
};

export default App;
