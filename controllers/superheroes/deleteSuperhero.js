const { Superhero } = require("../../model");
const { NotFound } = require("http-errors");

const deleteSuperhero = async (req, res) => {
  const { id } = req.params;
  const result = await Superhero.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound(`Superhero with id ${id} does not found`);
  }
  res.json({
    status: "succes",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = deleteSuperhero;
