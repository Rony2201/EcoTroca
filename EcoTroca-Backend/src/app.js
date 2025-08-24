import express from 'express';
import loginRoutes from './routes/loginRoutes.js';

const app = express();

app.use(express.json());


app.get('/', (req,res) => {
    res.send('Hello World')
});
app.use('/register', loginRoutes);



export default app;