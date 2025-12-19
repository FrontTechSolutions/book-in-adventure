const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./interface/routes/auth.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookinAdventure';

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Test route
app.get('/', (req, res) => res.send('API Book-in Adventure OK'));

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connecté');
    app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
  })
  .catch(err => {
    console.error('Erreur connexion MongoDB', err);
    process.exit(1);
  });
