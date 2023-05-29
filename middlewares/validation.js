const validation = (schema) => {
  return (req, rea, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
};

module.exports = validation;
