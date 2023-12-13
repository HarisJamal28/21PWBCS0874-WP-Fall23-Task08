const express = require('express');
const app = express();
const PORT = 8080;
const ecommerceRoutes = require('./ecommerceRoutes');
const passwordStrengthRoutes = require('./passwordStrengthRoutes');
app.use('/ecommerce', ecommerceRoutes); 
app.use('/passwordstrength', passwordStrengthRoutes); 
app.use((req, res) => {
    res.status(200).send("Welcome To Go To Ecommerce Website & to see Products Please Write /ecommerce/products to See Products. \n To Check the strenght of Your Password write /passwordstrength");
});
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
