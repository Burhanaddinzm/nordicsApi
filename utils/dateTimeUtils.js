const getAzTime = () => {
  const now = new Date();
  const utcNow = new Date(now.toUTCString());
  return new Date(utcNow.getTime() + 4 * 60 * 60 * 1000);
};

module.exports = { getAzTime };
