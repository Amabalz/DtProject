const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');
const app = express();
const PORT = process.env.PORT || 7082;

app.use(express.json())

app.use(cors());

app.use('/', controllers);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
