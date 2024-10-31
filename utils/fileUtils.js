const fs = require("fs");
const { throwErrorWithStatusCode } = require("./errorUtils");

const deleteImage = (imgPath) => {
  try {
    fs.unlinkSync(`../${imgPath}`);
  } catch (error) {
    throwErrorWithStatusCode(400, `Failed to delete image at ${imgPath}`);
  }
};

module.exports = { deleteImage };
