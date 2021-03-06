const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');
const User = require('../models/user');

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
				User.findById(req.body.uid, (err, user) => {
					if(err) {
						res.json({ message: err });
					} else {
						user.tasksDone += 1;
						user.save((err) => {
							if(err) {
								res.json({message: err});
							}
						});
					}
				});
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
		Todo.find({ title: {"$regex": `${req.body.todo}`}, creator: req.body.uid }, (err, todo) => {
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

router.post('/get-done/', (req, res) => {
	Todo.find({ done: true, creator: req.body.uid }, (err, todo) => {
		if(err) { res.json({ message: err }); }
		else {
			res.json({ todo: todo });
		}
	});
});

router.post('/get-not-done/', (req, res)=> {
	Todo.find({ done: false, creator: req.body.uid }, (err, todo) => {
		if(err) { res.json({ message: err }); }
		else {
			res.json({ todo: todo });
		}
	});
})

module.exports = router;