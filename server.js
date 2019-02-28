const express = require('express');
const app = express();
const fs = require('fs');

require('./config/index')(app);
require('./routes/index')(app);

app.listen(3000, () => {
    console.log('http://localhost:3000');
});