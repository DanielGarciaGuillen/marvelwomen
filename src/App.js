import React, { Component } from "react";
import md5 from "md5";
import ReactModal from "react-modal";

import "./App.css";
import Modal from "./components/modal";
import characterList from "./characterList";

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

  handleCloseModal() {
    this.setState({ showModal: false });
  }

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
      })
      .then(() => {
        const { data: { results: [results] } } = data;
        const { name, events: { items }, thumbnail } = results;
        this.setState({ name, items, thumbnail, loading: false });
      });
  }

  render() {
    const { name, items, thumbnail } = this.state;

    //Loop though the array and characters
    let charactersDivs = characterList.map(character => {
      return (
        <div
          className="panel"
          style={{ backgroundImage: `url(${character.url})` }}
        >
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

            {/*Modal Component where I pass props */}
            <Modal name={name} items={items} thumbnail={thumbnail} />
          </ReactModal>
        </div>
      );
    });
    //Return array from render
    return <div className="panels">{charactersDivs}</div>;
  }
}

export default App;
