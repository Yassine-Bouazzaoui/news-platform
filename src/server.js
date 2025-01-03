require('dotenv').config();
const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(logger);

// Routes
app.use('/api/news', newsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});