const { body, validationResult } = require('express-validator');

const validateProduct = [
  body('name')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters.'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number.'),
  body('description')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateFile = (req, res, next) => {
  const file = req.file;
  if (file) {
    const fileSize = file.size;
    const fileType = file.mimetype;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!validTypes.includes(fileType)) {
      return res.status(400).json({ error: 'Invalid file type. Only jpg, jpeg, png are allowed.' });
    }

    if (fileSize > 5 * 1024 * 1024) { 
      return res.status(400).json({ error: 'File size exceeds 5MB.' });
    }
  }
  next();
};

module.exports = { validateProduct, validateFile };
