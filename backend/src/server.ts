import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './interface/routes/auth.routes.js';
import stripeRoutes from './interface/routes/stripe.routes.js';


const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookinAdventure';

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // adapte l'URL si besoin
  credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stripe', stripeRoutes);

// Test route
app.get('/', (req, res) => res.send('API Book-in Adventure OK'));

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connecté');
    app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
  })
  .catch(err => {
    console.error('Erreur connexion MongoDB', err);
    process.exit(1);
  });
