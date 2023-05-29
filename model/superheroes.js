const { Schema, model } = require("mongoose");
const Joi = require("joi");
const SuperHeroesSchema = Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    real_name: {
      type: String,
      required: true,
    },
    origin_description: {
      type: String,
      required: true,
    },
    superpowers: {
      type: String,
      default: false,
    },
    catch_phrase: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Superhero = model("superhero", SuperHeroesSchema);

const joiSchema = Joi.object({
  nickname: Joi.string().required(),
  real_name: Joi.string().required(),
  origin_description: Joi.string().required(),
  superpowers: Joi.string().required(),
  catch_phrase: Joi.string().required(),
  images: Joi.any(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
module.exports = SuperHeroesSchema;

module.exports = {
  Superhero,
  joiSchema,
  favoriteJoiSchema,
};

// role:{
// type: String,
//     enum: ['admin', 'user', 'manager']
//         default: "user"
// }
// code: {
//     type: String,
//         required: true,
//         unique: true (делается с помощью индексов сами по себе они не работают),
//                 match: /^[0-9]{9}$ /
// }
