const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../config/config')
const User = require('../models/user');

router.post('/sign-up-user/', (req, res) => {
	User.findOne({ username: req.body.uname }, (err, user) => {
		if(err) {
			// error
			res.json({ message: err });
		} if(user) {
			// user already found
			res.json({ message: 'User already exists!!!' });
		} if(!user) {
			let new_user = new User({
				firstname: req.body.fname,
				lastname: req.body.lname,
				username: req.body.uname,
				dob: Date.now(req.body.dob)
			});
			// bcrypt to hash the password
			bcrypt.genSalt(10, (err, salt) => {
				if(err) { res.json({ message: err }); }
				else {
					bcrypt.hash(req.body.pass, salt, (errr, hash) => {
						if(err) { res.json({ message: err }); }
						else {
							new_user.password = hash;
							new_user.save((err) => {
								if(err) { res.json({ message: err }); }
								else {
									// account created !!!
									res.json({
										success: 'Account successfully created. You may now login.'
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

router.post('/sign-in-user/', (req, res) => {
  User.findOne({ username: req.body.uname }, (err, user) => {
  	if(err) { res.json({ message: err }); }
  	if(!user) { res.json({ message: 'User does not exists' }); }
  	if(user) {
  		bcrypt.compare(req.body.pass, user.password, (err, isMatch) => {
  			if(err) { res.json({message: err}); }
  			if(isMatch) {
  				const payload = jwt.sign({ user: user }, config.secret);
  				res.json({ token: `Bearer ${payload}` });
  			} else {
		  		res.json({ message: 'Password does not match' });
		  	}
  		});
  	}
  })
});

module.exports = router;
