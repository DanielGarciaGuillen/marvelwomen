import React, { Component } from "react";

import "./App.css";
import ReactModal from "react-modal";
import md5 from "md5";

import ModalBox from "./modal";

/*
Black Widow 1009189, Captain Marvel 1010338, Medusa 1009438, Ms. Marvel 1017577,
 Scarlet Witch1009562, She-Hulk 1017111, Storm 1009629
 */

let id = ""; // whatever parameters you want, e.g., `characters/1009215`.
var query = "";

const character = [];

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      id: ""
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.validateTitle = this.validateTitle.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  async handleQuery({ currentTarget }) {
    currentTarget.preventDefault;
    query = currentTarget.value;
    await this.setStateAsync({ id: query, showModal: true });
    console.log(this.state);
    await this.validateTitle();
  }

  //Passsing props to callback on parent component
  validateTitle() {
    const { onClick } = this.props;
    onClick(query);
    console.log(this.props);
    console.log(this.state);
  }
  render() {
    return (
      <div className="panels">
        <div className="panel panel1">
          <p>Hey</p>

          <button value="1009189" onClick={this.handleQuery}>
            Let's
          </button>
          <p>Dance</p>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={true}
          >
            <ModalBox character={this.props} />
          </ReactModal>
        </div>
      </div>
    );
  }
}

export default Character;
