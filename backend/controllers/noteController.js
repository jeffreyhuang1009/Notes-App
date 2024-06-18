const Note = require('../models/noteModel');
const mongoose = require('mongoose');

// GET all notes 
const getNotes = async (req, res) => {
    const user_id = req.user._id;
    
    const notes = await Note.find({ user_id }).sort({createdAt: -1});

    res.status(200).json(notes);
};

// GET a single note
const getNote = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Note not found'});
    }

    const note = await Note.findById(id);

    if(!note) {
        return res.status(404).json({error: 'Note not found'});
    }

    res.status(200).json(note);
};

// POST a new note
const createNote = async (req, res) => {
    const {title, body} = req.body;

    let emptyFields = [];

    if(!title) {
        emptyFields.push('title');
    }

    if(!body) {
        emptyFields.push('body');
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
    }

    // add doc to db
    try{
        const user_id = req.user._id;
        const note = await Note.create({title, body, user_id});
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({error: error.message});
    }

};

// DELETE a note
const deleteNote = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Note not found'});
    }

    const note = await Note.findByIdAndDelete({_id: id});

    if(!note) {
        return res.status(400).json({error: 'Note not found'});
    }

    res.status(200).json(note);

};

// UPDATE a note
const updateNote = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Note not found'});
    }

    const note = await Note.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!note) {
        return res.status(400).json({error: 'Note not found'});
    }

    res.status(200).json(note);
};


module.exports = {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
};