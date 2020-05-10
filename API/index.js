const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const consola = require('consola');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// Import API Routes
const authRoute = require('./routes/api/auth');
const personelRoute = require('./routes/api/personel');
const iotRoute = require('./routes/api/iot');
const listRoute = require('./routes/api/list');
const apiInfoRoute = require('./routes/api/info');
const invalidRoute = require('./routes/api/invalid');
// Import Web Routes
// const postRoute = require('./routes/post');

// EXPRESS Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// API Routes
app.use('/api/user', authRoute);
app.use('/api/personel', personelRoute);
app.use('/api/iot', iotRoute);
app.use('/api/list', listRoute);
app.use('/api/v1', apiInfoRoute);
app.use('*', invalidRoute);
// WEB Routes


async function startServer() {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(() => {
            consola.success({
                message: `Veritabanına bağlanıldı!`,
                badge: true
            });
        }).catch((err) => {
            consola.error({
                message: `Veritabanına bağlanılamadı. \n${err.message}`,
                badge: true
            });
            throw new Error(err.message);
        });

        app.listen(process.env.PORT, () => {
            consola.success({
                message: `Sunucu başlatıldı! Port:${process.env.PORT}`,
                badge: true
            });
        });
    } catch (err) {
        consola.error({
            message: `Bir hata oluştu. Tüm işlemler durduruldu! \n${err}`,
            badge: true
        })
    }
}

startServer();