const { Superhero } = require("../../model");
const { NotFound } = require("http-errors");
const fs = require("fs/promises");
const path = require("path");

const removeAvatar = async (req, res) => {
  const { id, imageId } = req.params;

  try {
    const hero = await Superhero.findById(id);
    if (!hero) {
      throw new NotFound(`Superhero with id ${id} does not found`);
    }
    const { images } = hero;
    const updatedImages = images.filter((image, index) => {
      return index !== Number(imageId);
    });

    if (updatedImages.length === images.length) {
      return res.status(404).json({ error: "Image not found" });
    }

    hero.images = updatedImages;
    await hero.save();

    return res.json({
      status: "success",
      code: 200,
      message: "Image deleted successfully",
      data: {
        updatedImages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = removeAvatar;
