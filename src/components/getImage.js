/* eslint-disable global-require */
const images = {
  /*  Widow: require("../images/"), */
  CapMarvel: require("../images/cpmarvel.jpg")
  /*  Medusa: require("../assets/heavy-rain.gif"),
  Storm: require("../assets/light-rain.webp"),
  MsMarvel: require("../assets/heavy-rain.gif"),
  Scarlet: require("../assets/light-rain.webp"),
  SheHulk: require("../assets/heavy-rain.gif") */
};

export default character => images[character];
