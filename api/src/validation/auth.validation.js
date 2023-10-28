const Joi = require("@hapi/joi");

// VALIDATION
const registerValidation = (body) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(body);
};

const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    // token_device: Joi.string()
    //     .required(),
  });

  return schema.validate(body);
};

// const updateUserValidation = (body) => {
//     const schema = Joi.object({
//         username: Joi.string()
//             .min(3)
//             .required(),
//         phone_number: Joi.string()
//             .min(10)
//             .max(12)
//             .allow(null, ''),
//     })
//     return schema.validate(body)
// }

module.exports = {
  registerValidation,
  loginValidation,
};
