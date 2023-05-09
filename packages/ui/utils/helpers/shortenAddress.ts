const shortenAddress = (address: any) => {
  const length = address.length;
  const firstFive = address?.substring(0, 5);
  const lastFive = address?.substring(length - 4, length);
  return [firstFive, "...", lastFive].join("") ?? "0x00000";
};

export default shortenAddress;
