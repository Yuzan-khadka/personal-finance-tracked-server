import express, {type Express} from 'express';
import connectDB from './db.ts';
import routes from './routes/routes.ts';
import cors from 'cors';

const app: Express = express();

// Middleware & routes
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/financial-records', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}/`));
