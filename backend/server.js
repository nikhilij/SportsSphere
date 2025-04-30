const app = require('./app');
const mongoose = require('mongoose');

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    });