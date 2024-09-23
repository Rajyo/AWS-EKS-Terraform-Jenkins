const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create a new To-Do
router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
    });
    try {
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all To-Dos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a To-Do
router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a To-Do
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Todo' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
