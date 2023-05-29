const path = require("path");
const fs = require("fs/promises");
const { Superhero } = require("../../model");
const { NotFound } = require("http-errors");

const addAvatar = async (req, res) => {
  const { id } = req.params;
  const { images } = req.body;
  const files = req.files;
  const fileNames = files.map((file) => file.originalname);

  try {
    const uploadPromises = files.map((file) => {
      const imageName = `${file.originalname}`;

      const resultUpload = path.join(
        __dirname,
        "../../",
        "public",
        "avatars",
        imageName
      );
      return fs.rename(file.path, resultUpload);
    });
    await Promise.all(uploadPromises);

    const imagesnew = fileNames.map((fileName) =>
      path.join("public", "avatars", `${fileName}`)
    );

    const newSuperhero = await Superhero.findByIdAndUpdate(
      id,
      { ...req.body, images: imagesnew },
      {
        new: true,
      }
    );

    res.json(newSuperhero);
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = addAvatar;
