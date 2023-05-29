const { Superhero } = require("../../model");
const path = require("path");
const fs = require("fs/promises");

const addSuperhero = async (req, res) => {
  const files = req.files;
  const fileNames = files.map((file) => file.originalname);

  const { id } = req.params;
  try {
    const uploadPromises = files.map((file) => {
      const imageName = `${file.originalname}`;
      const destinationPath = path.join(
        __dirname,
        "../../",
        "public",
        "avatars",
        imageName
      );
      return fs.rename(file.path, destinationPath);
    });

    await Promise.all(uploadPromises);
    const images = fileNames.map((fileName) =>
      path.join("public", "avatars", `${fileName}`)
    );
    const result = await Superhero.create({
      ...req.body,
      images: images,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    files.forEach((file) => fs.unlink(file.path));
    throw error;
  }
};

module.exports = addSuperhero;



