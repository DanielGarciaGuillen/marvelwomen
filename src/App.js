import React, { Component } from "react";

import "./App.css";

import md5 from "md5";

import Widow from "./heroes/blackwidow";
import CapMarvel from "./heroes/capmarvel";
import Medusa from "./heroes/medusa";
import Storm from "./heroes/storm";
import MsMarvel from "./heroes/msmarvel";
import Scarlet from "./heroes/scarlet";
import SheHulk from "./heroes/shehulk";

const API = "https://gateway.marvel.com/v1/public/characters/";

const publicKey = `42ff63aab01f707692556ee06f049449`;
const privateKey = `944be6934bfd304689b561bb707cf92f09380cdc`;
const ts = Date.now();
const hash = md5(ts + privateKey + publicKey);

let thumbnail = [];
let eventList = [];
let character = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      character: [],
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
    //Clean list before doing new API Call
    character.length = 0;
    eventList.length = 0;
    thumbnail.length = 0;

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

    eventList = results.events.items;
    thumbnail = results.thumbnail;
    await this.setStateAsync({
      character: results,
      events: eventList,
      thumbnail: thumbnail
    });
    console.log(this.state);
  }

  render() {
    const name = this.state.character.name;
    return (
      <div className="panels">
        {/*  PANEL ONE */}
        <CapMarvel
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={eventList}
          thumbnail={thumbnail}
        />
        {/*  PANEL TWO */}
        <Medusa
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={eventList}
          thumbnail={thumbnail}
        />
        {/*  PANEL THREE */}
        <Scarlet
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={eventList}
          thumbnail={thumbnail}
        />
        {/*  PANEL FOUR */}
        <MsMarvel
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={eventList}
        />

        {/*  PANEL FIVE */}
        <Widow
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={eventList}
        />

        {/*  PANEL SIX */}
        <SheHulk
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={eventList}
        />

        {/*  PANEL SEVEN */}
        <Storm
          onClick={this.handleUpdateQuery.bind(this)}
          name={name}
          events={eventList}
        />
      </div>
    );
  }
}

export default App;
