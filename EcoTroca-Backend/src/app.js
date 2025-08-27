import express from 'express';
import register from './routes/registerRoutes.js';
import productRouter from './routes/productRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';

const app = express();

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