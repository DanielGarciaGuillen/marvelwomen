import React, { Component } from "react";
import md5 from "md5";
import ReactModal from "react-modal";

import "./App.css";
import Modal from "./components/modal";

const characterList = [
  {
    id: 1010338,
    url: "https://i.annihil.us/u/prod/marvel/i/mg/6/30/537ba61b764b4.jpg",
    button: "M"
  },
  {
    id: 1009438,
    url:
      "https://pre00.deviantart.net/6c08/th/pre/i/2010/013/6/6/medusa_by_dmmontal.jpg",
    button: "A"
  },
  {
    id: 1009562,
    url:
      "https://img00.deviantart.net/0286/i/2010/141/e/4/scarlet_witch___colored_by_windriderx23.jpg",
    button: "R"
  },

  {
    id: 1017577,
    url:
      "https://orig00.deviantart.net/56c0/f/2013/312/a/a/all_new_ms_marvel_by_jprart-d6tindx.jpg",
    button: "V"
  },
  {
    id: 1009189,
    url:
      "https://i.annihil.us/u/prod/marvel//universe3zx/images/f/f9/BlackWidow.jpg",
    button: "E"
  },

  {
    id: 1017111,
    url:
      "https://i.pinimg.com/564x/8e/6f/89/8e6f8914695b17afa1411c7b87f5958a.jpg",
    button: "L"
  },
  {
    id: 1009629,
    url:
      "http://media.comicbook.com/wp-content/uploads/2014/04/Storm_1_Bianchi_Variant.jpg",

    button: "!"
  }
];

const API = "https://gateway.marvel.com/v1/public/characters/";
const publicKey = `42ff63aab01f707692556ee06f049449`;
const privateKey = `944be6934bfd304689b561bb707cf92f09380cdc`;
const ts = Date.now();
const hash = md5(ts + privateKey + publicKey);

let query = "";
let data = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      name: "",
      items: [],
      thumbnail: []
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  // Loop througth initial array to create divs with background DONE
  //Then we will figure out api call
  // First we handle the state for the query, then we do a function to do the api call
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  //Callback from Each Hero Component!
  handleQuery({ currentTarget }) {
    query = currentTarget.value;
    this.setState(
      {
        query,
        loading: true,
        showModal: true
      },
      this.apiCall
    );
  }

  //API Call
  apiCall() {
    fetch(
      API +
        `${this.state.query}` +
        `?apikey=${publicKey}` +
        `&hash=${hash}` +
        `&ts=${ts}`
    )
      .then(res => res.json())
      .then(function(MyJson) {
        data = MyJson;
        console.log(data);
      })
      .then(() => {
        const { data: { results: [results] } } = data;
        const { name, events: { items }, thumbnail } = results;
        this.setState({ name, items, thumbnail, loading: false });
        console.log(this.state);
      });
  }

  render() {
    const { name, items, thumbnail } = this.state;
    let charactersDivs = characterList.map(character => {
      return (
        <div
          className="panel"
          style={{ backgroundImage: `url(${character.url})` }}
        >
          {/*  This button handles api query */}
          <button
            className="more"
            onClick={this.handleQuery}
            value={character.id}
          >
            {character.button}
          </button>

          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={true}
            className="Modal"
            overlayClassName="Overlay"
          >
            <button className="escapeButton" onClick={this.handleCloseModal}>
              X
            </button>
            <Modal name={name} items={items} thumbnail={thumbnail} />
          </ReactModal>
        </div>
      );
    });

    return <div className="panels">{charactersDivs}</div>;
  }
}

export default App;
