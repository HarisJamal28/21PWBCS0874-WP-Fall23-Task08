const express = require('express');
const passwordStrengthRoutes = express.Router();
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
  .is().min(8)
  .is().max(20)
  .has().uppercase()
  .has().lowercase() 
  .has().digits(1) 
  .has().symbols(1) 
  .has().not().spaces();

passwordStrengthRoutes.use(express.json());

passwordStrengthRoutes.get('/', (req, res) =>{
  res.send("To Check your password stength go to (/check-password) route!");
});

// Endpoint to check password strength
passwordStrengthRoutes.get('/check-password', (req, res) => {
  const { password } = req.body;
  const isValid = schema.validate(password);

  if (isValid) {
    res.status(200).json({ message: 'Password is strong!' });
  } else {
    res.status(400).json({ message: 'Password does not meet requirements.' });
  }
});
module.exports= passwordStrengthRoutes;