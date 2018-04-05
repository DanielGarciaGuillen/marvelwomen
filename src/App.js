import React, { Component } from "react";

import "./App.css";
import ReactModal from "react-modal";
import md5 from "md5";

import ModalBox from "./modal";

/*
Black Widow 1009189, Captain Marvel 1010338, Medusa 1009438, Ms. Marvel 1017577,
 Scarlet Witch1009562, She-Hulk 1017111, Storm 1009629
 */

const publicKey = `42ff63aab01f707692556ee06f049449`;
const privateKey = `944be6934bfd304689b561bb707cf92f09380cdc`;
const ts = Date.now();
const hash = md5(ts + privateKey + publicKey);

const opts = `1009215`; // whatever parameters you want, e.g., `characters/1009215`.

const url = `https://gateway.marvel.com/v1/public/characters/${opts}?apikey=${
  publicKey
}&hash=${hash}&ts=${ts}`; // putting it all together

const character = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      id: "1009189",
      character: []
    };
    /* this.handleOpenModal = this.handleOpenModal.bind(this); */
    this.getInfo = this.getInfo.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  /*  handleOpenModal() {
    this.setState({ showModal: true });
    console.log("Show Modal!");
  }
 */
  handleCloseModal() {
    this.setState({ showModal: false });
    console.log("Close Modal");
  }

  async getInfo() {
    character.length = 0;
    this.setStateAsync({
      character: character,
      loading: true
    });

    const res = await fetch(url);
    const { data } = await res.json();
    console.log(data.results["0"]);
    const results = data.results["0"];

    await this.setStateAsync({
      character: results,
      loading: false,
      showModal: true
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="panels">
        {/*  PANEL ONE */}
        <div className="panel panel1">
          <p>Hey</p>

          <button
            onClick={() => {
              this.getInfo();
            }}
          >
            Let's
          </button>
          <p>Dance</p>
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
        >
          <ModalBox character={this.state.character} />
        </ReactModal>

        {/*  PANEL TWO */}
        <div className="panel panel2">
          <p>Hey</p>

          <button
            onClick={() => {
              this.getInfo();
            }}
          >
            Let's
          </button>
          <p>Dance</p>
        </div>

        {/*  PANEL THREE */}
        <div className="panel panel3">
          <p>Hey</p>

          <button
            onClick={() => {
              this.getInfo();
            }}
          >
            Let's
          </button>
          <p>Dance</p>
        </div>

        {/*  PANEL FOUR */}
        <div className="panel panel4">
          <p>Hey</p>

          <button
            onClick={() => {
              this.getInfo();
            }}
          >
            Let's
          </button>
          <p>Dance</p>
        </div>

        {/*  PANEL FIVE */}
        <div className="panel panel5">
          <p>Hey</p>

          <button
            onClick={() => {
              this.getInfo();
            }}
          >
            Let's
          </button>
          <p>Dance</p>
        </div>

        {/*  PANEL SIX */}
        <div className="panel panel6">
          <p>Hey</p>

          <button
            onClick={() => {
              this.getInfo();
            }}
          >
            Let's
          </button>
          <p>Dance</p>
        </div>

        {/*  PANEL SEVEN */}
        <div className="panel panel7">
          <p>Hey</p>

          <button
            onClick={() => {
              this.getInfo();
            }}
          >
            Let's
          </button>
          <p>Dance</p>
        </div>
      </div>
    );
  }
}

export default App;
