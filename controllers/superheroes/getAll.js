const { Superhero } = require("../../model");
const getAll = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const totalProducts = await Superhero.countDocuments();
 
  const totalPages = Math.ceil(totalProducts / limit);
  const superheroes = await Superhero.find({}, "", {
    skip,
    limit: Number(limit),
  });
  res.json({
    status: "success",
    code: 200,

    data: {
      totalPages,
      result: superheroes,
    },
  });
};

module.exports = getAll;
