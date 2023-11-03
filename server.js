const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const DIST_DIR = path.join(__dirname, '/dist');
const HTML_FILE = path.join(DIST_DIR, '/amver-ui/', 'index.html');

const app = express();
dotenv.config();

// serve up production assets
app.use(cors());
app.use(express.static(DIST_DIR));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(HTML_FILE));
});

const PORT = process.env.PORT;
console.log('server started on port:', PORT);
app.listen(PORT);
