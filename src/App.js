import React, { Component } from "react";

import "./App.css";
import ReactModal from "react-modal";
import md5 from "md5";

import ModalBox from "./modal";
import Widow from "./heroes/blackwidow";
import CapMarvel from "./heroes/capmarvel";
import Medusa from "./heroes/medusa";
import Storm from "./heroes/storm";
import MsMarvel from "./heroes/msmarvel";
import Scarlet from "./heroes/scarlet";
import SheHulk from "./heroes/shehulk";

const API = "https://gateway.marvel.com/v1/public/characters/";

/*
Black Widow 1009189, Captain Marvel 1010338, Medusa 1009438, Ms. Marvel 1017577,
 Scarlet Witch1009562, She-Hulk 1017111, Storm 1009629
 */

const publicKey = `42ff63aab01f707692556ee06f049449`;
const privateKey = `944be6934bfd304689b561bb707cf92f09380cdc`;
const ts = Date.now();
const hash = md5(ts + privateKey + publicKey);

const opts = `1009215`; // whatever parameters you want, e.g., `characters/1009215`.
/* const url = `https://gateway.marvel.com/v1/public/characters/${opts}?apikey=${
  publicKey
}&hash=${hash}&ts=${ts}`; // putting it all together
 */
var character = [];

var comics = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      character: [],
      comics: []
    };
    this.handleUpdateQuery = this.handleUpdateQuery.bind(this);
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  //Callback from Child ChangeTheme Component
  async handleUpdateQuery(query) {
    character.length = 0;
    comics.length = 0;

    await this.setStateAsync({
      query: query,
      character: character
    });

    const res = await fetch(
      API +
        `${this.state.query}` +
        `?apikey=${publicKey}` +
        `&hash=${hash}` +
        `&ts=${ts}`
    );

    const { data } = await res.json();

    const results = data.results[0];
    console.log(results);
    console.log(results.comics.items);
    comics = results.comics.items;
    await this.setStateAsync({
      character: results,
      comics: comics
    });
    console.log(this.state);
  }

  render() {
    /*  let { character } = this.state; */

    const name = this.state.character.name;
    const comics = this.state.comics;

    /*  console.log(this.state.character.comics.collectionURI); */

    return (
      <div className="panels">
        {/*  PANEL ONE */}
        <CapMarvel
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          comics={comics}
        />
        {/*  PANEL TWO */}
        <Medusa name={name} onClick={this.handleUpdateQuery.bind(this)} />
        {/*  PANEL THREE */}
        <Scarlet name={name} onClick={this.handleUpdateQuery.bind(this)} />
        {/*  PANEL FOUR */}
        <MsMarvel name={name} onClick={this.handleUpdateQuery.bind(this)} />

        {/*  PANEL FIVE */}
        <Widow onClick={this.handleUpdateQuery.bind(this)} name={name} />

        {/*  PANEL SIX */}
        <SheHulk name={name} onClick={this.handleUpdateQuery.bind(this)} />

        {/*  PANEL SEVEN */}
        <Storm name={name} onClick={this.handleUpdateQuery.bind(this)} />
      </div>
    );
  }
}

export default App;
