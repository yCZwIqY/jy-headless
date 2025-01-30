const generateHash = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export default generateHash;
