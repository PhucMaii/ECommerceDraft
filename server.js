const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path'); 

const app = express();
require('dotenv').config();
const PORT = 2000;

const CustomerRoute = require('./routes/customers');
const AdminRoute = require('./routes/admins');
const ClothesRoute = require('./routes/clothes');
const CouponRoute = require('./routes/coupon');



app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URL).then((response) => {
    console.log("Database is connected")
}).catch((error) => {
    console.log(error);
})

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'html', 'homePage.html');
    res.sendFile(filePath);
})

app.use('/api/v1/admins', AdminRoute);

app.use('/api/v1/customers', CustomerRoute);

app.use('/api/v1/clothes', ClothesRoute);

app.use('/api/v1/coupon', CouponRoute);


app.listen(PORT, () => {
    console.log("Server is running on " + PORT);

})