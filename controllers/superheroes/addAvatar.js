const path = require("path");
const fs = require("fs/promises");
const { Superhero } = require("../../model");
const { NotFound } = require("http-errors");

const addAvatar = async (req, res) => {
  // const { path: tempUpload, originalname } = req.file;
  const { id } = req.params;
  const { images } = req.body;
  const files = req.files;
  const fileNames = files.map((file) => file.originalname);

  // const imageName = `${id}_${originalname}`;
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
    const hero = await Superhero.findById(id);
    if (!hero) {
      throw new NotFound(`Superhero with id ${id} does not found`);
    }
    hero.images.push(...imagesnew);
    await hero.save();

    res.json(hero);
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = addAvatar;
