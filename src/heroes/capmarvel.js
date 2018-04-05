import React, { Component } from "react";

import "../App.css";
import ReactModal from "react-modal";

let id = ""; // whatever parameters you want, e.g., `characters/1009215`.
var query = "";

const character = [];

export default class CapMarvel extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      query: ""
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
    await this.setStateAsync({ query: query, showModal: true });
    await this.validateTitle();
  }

  //Passsing props to callback on parent component
  validateTitle() {
    const { onClick } = this.props;
    onClick(query);
  }
  render() {
    console.log(this.props);
    /*  console.log(character.name);
    const name = character.name;
    const modified = character.modified;
    const id = character.id; */

    return (
      <React.Fragment>
        <div className="panel panel1">
          <button className="more" value="1010338" onClick={this.handleQuery}>
            More
          </button>

          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={true}
          >
            <div> {this.props.name}</div>

            {/* <ModalBox character={this.props} /> */}
          </ReactModal>
        </div>
      </React.Fragment>
    );
  }
}
