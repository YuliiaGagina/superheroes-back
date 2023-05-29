const { Contact } = require("../../model");
const { NotFound } = require("http-errors");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const newContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    code: 200,
    data: {
      newContact,
    },
  });
  if (!newContact) {
    throw new NotFound(`Product with id ${contactId} does not found`);
  }
};

module.exports = updateFavorite;
