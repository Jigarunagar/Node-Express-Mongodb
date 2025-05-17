const validate = (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (name && email && password) {
        return next();
      } else {
        return res.status(404).send("invalid data");
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  };
   
  module.exports = validate;