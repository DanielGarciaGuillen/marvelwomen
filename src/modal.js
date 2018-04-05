import React from "react";

class ModalBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //RENDERRRRRRRRRRRRRRRRRRRRRRRRRRRR
  render() {
    const { character } = this.props;
    var { arr } = Object.values({ character });

    console.log({ character });

    return <div>{character.name}</div>;
  }
}

export default ModalBox;
