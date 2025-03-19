import express from 'express';
import dotenv from 'dotenv'
import connect from './Config/DbConfig.js';
import apirouter from './Routers/ApiRouter.js';
import cors from 'cors'
dotenv.config();


const app = express();

// Allow multiple frontend origins
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  process.env.FRONTEND_ADMIN_URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json({ limit:'50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



app.use('/api',apirouter);

app.get('/', (req, res) => {
    return res.status(201).json({ message: 'hello' });
});


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ',process.env.PORT);
    connect();
});
