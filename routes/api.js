const express = require('express');
const router = express.Router();

const Todo = require('../models/todo')

router.post('/get-all-todo/', (req, res) => {
	Todo.find({ creator: req.body.uid }, (err, todos) => {
		if(err) {
			res.json({ message: err });
		} else {
			res.json({ todos: todos });
		}
	});
});

router.post('/add-new-todo/', (req, res) => {
	Todo.findOne({ title: req.body.todo, creator: req.body.uid }, (err, todo) => {
		if(err) { res.json({ message: err }); }
		if(todo) { res.json({ message: 'TODO already exists' }); }
		if(!todo) {
			let new_todo = new Todo({
				title: req.body.todo,
				creator: req.body.uid
			});
			new_todo.save((err)=> {
				if(err) {
					res.json({ message: err });
				}
				else {
					res.json({ success: 'New todo saved' });;
				}
			});
		}
	});
});

router.post('/delete-todo/', (req, res) => {
	Todo.findOneAndDelete( { _id: req.body.todo, creator: req.body.uid },
		(err, todo) => {
			if(err) {
				res.json({ message: err });
			} else {
				res.json({ success: 'TODO deleted' });
			}
		});
});

router.post('/done-todo/', (req, res) => {
	Todo.findOne( { _id: req.body.todo, creator: req.body.uid },
		(err, todo) => {
			if(err) {
				res.json({ message: err });
			} else {
				todo.done = true;
				todo.save((err) => {
					if(err) {
						res.json({ message: err });
					} else {
						res.json({ success: 'TODO completed' });
					}
				});
			}
		});
});

router.post('/type-todo/', (req, res) => {
	if(req.body.todo !== '') {
		Todo.find({ title: {"$regex": `${req.body.todo}`} }, (err, todo) => {
			if(err) {
				res.json({
					message: err
				});
			} else {
				res.json({
					todo: todo
				});
			}
		});
	}
});

module.exports = router;