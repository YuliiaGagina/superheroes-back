const { NotFound } = require("http-errors");
const { Superhero } = require("../../model");

const getById = async (req, res) => {
  const { id } = req.params;
  const superhero = await Superhero.findById(id);
  if (!superhero) {
    throw new NotFound(`Superhero with id ${id} does not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      superhero,
    },
  });
};

module.exports = getById;
