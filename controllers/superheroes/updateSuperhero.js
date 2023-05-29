const { Superhero } = require("../../model");
const { NotFound } = require("http-errors");
const path = require("path");
const fs = require("fs/promises");

const updateSuperhero = async (req, res) => {
  const { id } = req.params;
  const files = req.files;
  const fileNames = files.map((file) => file.originalname);
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body;
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
    // const updatedFields = {
    //   nickname,
    //   real_name,
    //   origin_description,
    //   superpowers,
    //   catch_phrase,
    // };
    const newSuperhero = await Superhero.findByIdAndUpdate(
      id,
      { ...req.body, images: images },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      code: 200,
      data: {
        newSuperhero,
      },
    });
    if (!newSuperhero) {
      throw new NotFound(`Superhero with id ${id} does not found`);
    }
  } catch (error) {
    files.forEach((file) => fs.unlink(file.path));
    throw error;
  }
};

module.exports = updateSuperhero;
