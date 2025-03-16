require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');


const app = express();
connectDB();


app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,

}))
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());



app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));