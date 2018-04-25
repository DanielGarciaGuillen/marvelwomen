import React, { Component } from "react";
import md5 from "md5";

import "./App.css";
import getImage from "./components/getImage";

const characterList = [
  {
    name: "Widow",
    id: 1009189,
    url:
      "https://i.annihil.us/u/prod/marvel//universe3zx/images/f/f9/BlackWidow.jpg"
  },
  {
    name: "CapMarvel",
    id: 1010338,
    url: "https://i.annihil.us/u/prod/marvel/i/mg/6/30/537ba61b764b4.jpg"
  },
  {
    name: "Medusa",
    id: 1009438,
    url:
      "https://pre00.deviantart.net/6c08/th/pre/i/2010/013/6/6/medusa_by_dmmontal.jpg"
  },
  {
    name: "Storm",
    id: 1009629,
    url:
      "http://media.comicbook.com/wp-content/uploads/2014/04/Storm_1_Bianchi_Variant.jpg"
  },
  {
    name: "MsMarvel",
    id: 1017577,
    url:
      "https://orig00.deviantart.net/56c0/f/2013/312/a/a/all_new_ms_marvel_by_jprart-d6tindx.jpg"
  },
  {
    name: "Scarlet",
    id: 1009562,
    url:
      "https://img00.deviantart.net/0286/i/2010/141/e/4/scarlet_witch___colored_by_windriderx23.jpg"
  },
  {
    name: "SheHulk",
    id: 1017111,
    url:
      "https://i.pinimg.com/564x/8e/6f/89/8e6f8914695b17afa1411c7b87f5958a.jpg"
  }
];

let charactersDivs = [];

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
    /*  this.handleUpdateQuery = this.handleUpdateQuery.bind(this); */
  }

  // First loop througth initial array to create divs with background
  //Then we will figure out api call

  /*
  collection.map(function (item) {
    return <div> {item.Name} {this.getItemInfo(item)} </div>
}) */

  /* getCharacter() {
    characterInfos = characterList.map((character) =>
    callApi(character.id)

      <Character />
    )

    )
  )}
 */

  render() {
    charactersDivs = characterList.map(character => {
      console.log(character.name);
      return (
        <div
          className="panel"
          style={{ backgroundImage: `url(${character.url})` }}
        >
          <h1> {character.name}</h1>
        </div>
      );
    });

    return <div className="panels">{charactersDivs}</div>;
  }
}

export default App;
/*

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
 */
