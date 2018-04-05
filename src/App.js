import React, { Component } from "react";

import "./App.css";
import ReactModal from "react-modal";
import md5 from "md5";

import ModalBox from "./modal";
import Character from "./character";

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
const character = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      character: []
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
    console.log(this.state);

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
    console.log(data.results["0"]);
    const results = data.results["0"];
    await this.setStateAsync({
      character: results,
      loading: false
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="panels">
        {/*  PANEL ONE */}
        <Character
          character={character}
          onClick={this.handleUpdateQuery.bind(this)}
        />
        {/*  PANEL TWO */}
        <Character
          character={character}
          onClick={this.handleUpdateQuery.bind(this)}
        />
        {/*  PANEL THREE */}
        <Character
          character={character}
          onClick={this.handleUpdateQuery.bind(this)}
        />
        {/*  PANEL FOUR */}
        <Character
          character={character}
          onClick={this.handleUpdateQuery.bind(this)}
        />

        {/*  PANEL FIVE */}
        <Character
          character={character}
          onClick={this.handleUpdateQuery.bind(this)}
        />

        {/*  PANEL SIX */}
        <Character
          character={character}
          onClick={this.handleUpdateQuery.bind(this)}
        />

        {/*  PANEL SEVEN */}
        <Character
          character={character}
          onClick={this.handleUpdateQuery.bind(this)}
        />
      </div>
    );
  }
}

export default App;
