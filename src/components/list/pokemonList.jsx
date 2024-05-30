import { React, useState, useEffect } from "react";
import "./pokemonList.css";
import PokemonCard from "../card/pokemonCard";
import ModelPopup from "../popup/pokemonPopup";
import logo from '../../assets/pokeball1.png';
import pokemonTitleImg01 from "../../assets/pokemon-logo.png";
import pokemonTitleImg02 from "../../assets/pokemon-logo01.png";
import Button from 'react-bootstrap/Button';
import CloseButton from "react-bootstrap/esm/CloseButton";

export default function PokemonLists() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setloading] = useState(true);

  // ----------------------------------------- Api Call ---------------------------------------
  const getAllPokemons = async () => {
    setloading(true)
    const res = await fetch(loadMore).catch(function (error) {
      console.log(error);
    });
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        ).catch(function (error) {
          console.log(error);
        });
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
    setTimeout(() => {
      setloading(false)
    }, 400);
  };

  const PokemonDetail = (data, name) => {
    setPokemonDetails(data);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  const style = pokemonDetails?.types[0].type.name;

  // -------------------------------------------- Loding Content --------------------------------

  const loadingContent = () =>{

    return
  }



  // -------------------------------------------- ModalPopup Content --------------------------------
  const modalContent = () => {
    const firstFiveMoves = pokemonDetails?.moves.slice(0, 5);
    return (
      <div className="individualContainer">

        <div className="insideContainer">
          <div className="pokemonImg">
            <img
              src={pokemonDetails?.sprites.other.dream_world.front_default}
            />
          </div>
          <div className="pokemonPowers">
            <h2>
              {" "}
              Name : <span> {pokemonDetails?.name} </span>{" "}
            </h2>
            <p>
              {" "}
              Weight : <span> {pokemonDetails?.weight} </span>{" "}
            </p>
            <p>
              {" "}
              Height : <span> {pokemonDetails?.height} </span>{" "}
            </p>
            <p className="types">
              Types :{" "}
              {pokemonDetails &&
                pokemonDetails?.types?.map((item, index) => (
                  <span key={index}> {item.type.name} </span>
                ))}
            </p>
            <p className="ability">
              Abilities :{" "}
              {pokemonDetails?.abilities?.map((data, index) => (
                <span key={index}> {data.ability.name} </span>
              ))}
            </p>
            <p className="mb-1"> Moves :- </p>
            <div className="moves">
              {firstFiveMoves?.map((item, index) => (
                <span key={index} className={style}>
                  {" "}
                  {item.move.name}{" "}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pokemonContainer">
      <div className={loading? "loading" : "dnon"}>
        <img src={logo} className="loading-logo" alt="logo" />
      </div>

      <div className="pokemonTitleImg">
        <img src={pokemonTitleImg01} alt="pokemonTitle01" />
        <img src={pokemonTitleImg02} alt="pokemonTitle02" />
      </div>
      <div className="allContainer">
        {
          allPokemons.map((item, index) => (
            <div key={index} className="cardWidth">
              <PokemonCard
                keyValue={index}
                id={item.id}
                image={item.sprites.other.dream_world.front_default}
                name={item.name}
                type={item.types[0].type.name}
                pokemonData={item}
                detail={PokemonDetail}
                modalShow={setModalShow}
              />
            </div>
          ))}
      </div>
      <Button onClick={() => getAllPokemons()}> Load More... </Button>
      <ModelPopup
        show={modalShow}
        onHide={() => setModalShow(!modalShow)}
        content={modalContent()}
        header={`${pokemonDetails?.name.toUpperCase()} Details...`}
      />
    </div>
  );
}
