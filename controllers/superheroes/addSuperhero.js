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

// const { Superhero } = require("../../model");
// const path = require("path");
// const fs = require("fs/promises");

// const addSuperhero = async (req, res) => {
//   try {
//     const { path: tempUpload, originalname } = req.file;
//     console.log(req.file);
//     const files = req.files;
//     console.log(files);
//     const fileNames = files.map((file) => file.originalname);
//     console.log(fileNames);

//     const { id } = req.params;
//     const imageName = `${id}_${originalname}`;
//     const resultUpload = fileNames.map((file) =>
//       path.join(__dirname, "../../", "public", "avatars", imageName)
//     );
//     await fs.rename(req.file.tempUpload, resultUpload);
//     console.log(tempUpload);

//     const images = images.map((image) =>
//       path.join("public", "avatars", imageName)
//     );

//     const result = await Superhero.create({
//       ...req.body,
//       images: [images],
//     });
//     res.status(201).json({
//       status: "success",
//       code: 201,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     await fs.unlink(tempUpload);
//     throw error;
//   }
// };

// module.exports = addSuperhero;

// const { Superhero } = require("../../model");

// const addSuperhero = async (req, res) => {
//   const {
//     nickname,
//     real_name,
//     origin_description,
//     superpowers,
//     catch_phrase,
//     images,
//   } = req.body;

//   // const images = (await req.files) ? req.files.map((file) => file.path) : [];

//   try {
//     const result = await Superhero.create({
//       nickname,
//       real_name,
//       origin_description,
//       superpowers,
//       catch_phrase,
//       images,
//     });

//     res.status(201).json({
//       status: "success",
//       code: 201,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     console.error("Error adding superhero:", error);
//     res.status(500).json({
//       status: "error",
//       code: 500,
//       message: "Failed to add superhero",
//     });
//   }
// };

// module.exports = addSuperhero;
