type Token = {
  token:     string,    // Random string
  generated: number,    // Unix timestamp (milliseconds)
  expiry?:   number     // Unix timestamp (milliseconds)
};

export {Token};
