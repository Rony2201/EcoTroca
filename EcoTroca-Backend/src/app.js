import express from 'express';
import register from './routes/registerRoutes.js';
import productRouter from './routes/productRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';

const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));


app.use(express.json());

// Rota de teste
app.get('/', (req,res) => {
    res.send('Hello World');
});

// Rotas do sistema
app.use('/', register);
app.use('/', productRouter);
app.use('/categories', categoryRouter);

export default app;