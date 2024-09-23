const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todo');
const Todo = require('./models/Todo');

dotenv.config();

const app = express();

// const corsOptions = {
//     origin: process.env.CLIENT_URL, 
//     credentials: true, 
//   };
// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');
        const todos = await Todo.find();
        if (todos.length === 0) {
            await Todo.insertMany([
                { title: 'Learn Node.js' },
                { title: 'Learn MongoDB' },
                { title: 'Build a RESTful API' },
            ]);
        }
    })
    .catch(err => console.log(err));


// Routes
app.get('/', (req, res) => {
    res.send('Hello, Home!');
});

app.get('/api', (req, res) => {
    res.send('Hello, API!');
});

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
