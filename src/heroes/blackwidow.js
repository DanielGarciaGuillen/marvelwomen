import React, { Component } from "react";

import "../App.css";
import ReactModal from "react-modal";

let id = ""; // whatever parameters you want, e.g., `characters/1009215`.
var query = "";

const character = [];

export default class Widow extends Component {
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
    */
    const comics = this.props.comics;
    console.log(comics);
    /*  listJobs = jobsArraySplit.map(job => {
      return (
        <ListJobs key={job[0]}>
          <JobTitle>{job[0]}</JobTitle>
          <Apply target="_blank" href={job[1]}>
            Apply
          </Apply>
        </ListJobs>
      );
    }); */

    return (
      <React.Fragment>
        <div className="panel panel5">
          <button className="more" value="1009189" onClick={this.handleQuery}>
            E
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
