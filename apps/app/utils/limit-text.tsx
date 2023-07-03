const shortenName = (name: string) => {
  if (name.length > 9) {
    // return name?.substring(0, 8) + "..."; // dont forget to add this once mainnet
    return name?.substring(0, 8);
  } else {
    return name?.substring(0, 8);
  }
};

export default shortenName;
