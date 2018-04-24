import React, { Component } from "react";
import md5 from "md5";

import "./App.css";

import Widow from "./components/blackwidow";
import CapMarvel from "./components/capmarvel";
import Medusa from "./components/medusa";
import Storm from "./components/storm";
import MsMarvel from "./components/msmarvel";
import Scarlet from "./components/scarlet";
import SheHulk from "./components/shehulk";

var characterList = [
  { name: "Widow", id: 1009189 },
  { name: "CapMarvel", id: 1010338 },
  { name: "Medusa", id: 1009438 },
  { name: "Storm", id: 1009629 },
  { name: "MsMarvel", id: 1017577 },
  { name: "Scarlet", id: 1009562 },
  { name: "SheHulk", id: 1017111 }
];

const API = "https://gateway.marvel.com/v1/public/characters/";
const publicKey = `42ff63aab01f707692556ee06f049449`;
const privateKey = `944be6934bfd304689b561bb707cf92f09380cdc`;
const ts = Date.now();
const hash = md5(ts + privateKey + publicKey);

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      name: "",
      events: [],
      thumbnail: []
    };
    this.handleUpdateQuery = this.handleUpdateQuery.bind(this);
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  //Callback from Each Hero Component!
  async handleUpdateQuery(query) {
    await this.setStateAsync({
      query: query
    });

    //API Call
    const res = await fetch(
      API +
        `${this.state.query}` +
        `?apikey=${publicKey}` +
        `&hash=${hash}` +
        `&ts=${ts}`
    );

    //Destructuring API Call
    const { data: { results: [results] } } = await res.json();
    //Destructuring Variables from API Call
    const { name, events: { items }, thumbnail } = results;

    //Set State to variables from API Call
    await this.setStateAsync({
      name: name,
      events: items,
      thumbnail: thumbnail
    });
  }

  render() {
    //Destructuring Variables from state
    const { name, events, thumbnail } = this.state;
    return (
      <div className="panels">
        {/*  PANEL ONE */}
        <CapMarvel
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={events}
          thumbnail={thumbnail}
        />
        {/*  PANEL TWO */}
        <Medusa
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={events}
          thumbnail={thumbnail}
        />
        {/*  PANEL THREE */}
        <Scarlet
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={events}
          thumbnail={thumbnail}
        />
        {/*  PANEL FOUR */}
        <MsMarvel
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={events}
          thumbnail={thumbnail}
        />

        {/*  PANEL FIVE */}
        <Widow
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={events}
          thumbnail={thumbnail}
        />

        {/*  PANEL SIX */}
        <SheHulk
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={events}
          thumbnail={thumbnail}
        />

        {/*  PANEL SEVEN */}
        <Storm
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={events}
          thumbnail={thumbnail}
        />
      </div>
    );
  }
}

export default App;
