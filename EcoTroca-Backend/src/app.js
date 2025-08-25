import express from 'express';
import register from './routes/registerRoutes.js'
import productRegister from './routes/productRoutes.js';

const app = express();

app.use(express.json());


app.get('/', (req,res) => {
    res.send('Hello World')
});
app.use('/register', register);
app.use('/product', productRegister)



export default app;