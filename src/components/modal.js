import React, { Component } from "react";

import "../App.css";

export default class Modal extends Component {
  render() {
    const items = this.props.items;
    const image = this.props.thumbnail.path + "/portrait_incredible.jpg";

    var listEvents = items.map(item => {
      return <li key={item.name}>{item.name}</li>;
    });
    return (
      <div className="modalBox">
        <img className="characterImage" src={image} alt="characterImage" />
        <h2 className="nameCharacter">{this.props.name}</h2>
        <h3 className="event">Events</h3>

        <ol className="eventList">{listEvents}</ol>
      </div>
    );
  }
}
