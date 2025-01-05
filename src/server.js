const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');
const authRouter = require('./routes/authRouter');
const errorHandler = require('./middlewares/errorMiddleware');
const logger = require('./middlewares/loggingMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  
}));
app.use(express.json());
app.use(express.static('public'));

app.use(logger);

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRouter);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});