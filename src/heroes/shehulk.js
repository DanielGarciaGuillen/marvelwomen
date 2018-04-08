import React, { Component } from "react";

import "../App.css";
import ReactModal from "react-modal";

var query = "";

export default class SheHulk extends Component {
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
    const events = this.props.events;

    const image = this.props.thumbnail.path + "/portrait_incredible.jpg";
    console.log(image);

    if (events.length === 0) {
      var listEvents = "No events related to this Character";
    } else {
      listEvents = events.map(eve => {
        return <li key={eve.name}>{eve.name}</li>;
      });
    }

    return (
      <React.Fragment>
        <div className="panel panel7">
          <button className="more" value="1017111" onClick={this.handleQuery}>
            L
          </button>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={true}
            className="Modal"
            overlayClassName="Overlay"
          >
            <div className="modalBox">
              <button className="escapeButton" onClick={this.handleCloseModal}>
                X
              </button>

              <img
                className="characterImage"
                src={image}
                alt="characterImage"
              />
              <h2 className="nameCharacter">{this.props.name}</h2>
              <h3 className="event">Events</h3>

              <ol className="eventList">{listEvents}</ol>
            </div>
          </ReactModal>
        </div>
      </React.Fragment>
    );
  }
}
