import { sendError } from '../utils/apiResponse.js';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return sendError(res, 400, 'Validation failed', messages);
    }

    next();
  };
};
