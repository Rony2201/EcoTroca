import express from 'express';
import register from './routes/registerRoutes.js'
import productRouter from './routes/productRoutes.js';

const app = express();

app.use(express.json());


app.get('/', (req,res) => {
    res.send('Hello World')
});
app.use('/', register);
app.use('/', productRouter)



export default app;