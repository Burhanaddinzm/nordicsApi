const fs = require("fs");
const path = require("path");
const { throwErrorWithStatusCode } = require("./errorUtils");

const deleteImage = (imgPath) => {
  try {
    const fullPath = path.resolve(
      __dirname,
      "../uploads",
      path.basename(imgPath)
    );

    fs.unlinkSync(fullPath);
  } catch (error) {
    throwErrorWithStatusCode(
      400,
      `Failed to delete image ${imgPath.replace("/uploads/", "")}`
    );
  }
};

module.exports = { deleteImage };
