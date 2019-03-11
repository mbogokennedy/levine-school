const moment = require('moment');
const uuidv4 = require('uuid/v4');
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const validateRegisterInput = require('../../validation/registration');
const validateLoginInput = require('../../validation/login');
const Helper = require('../../helper')

const pool = require('../../models/dbConf')

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    try {
        const hashPassword = Helper.hashPassword(req.body.password);
        const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        const token = ""
        pool.connect((err, client, done) => {
            const createQuery = `INSERT INTO
            users(id, name, email, password, avatar, date)
            VALUES($1, $2, $3, $4, $5, $6)
            returning *`;
            const values = [
                uuidv4(),
                req.body.name,
                req.body.email,
                hashPassword,
                avatar,
                moment(new Date())
        
            ];

            client.query(createQuery, values, (error, result) => {
                done();
                if (error) {
                    res.status(400).json({error})
                }else{
                    const token = Helper.generateToken(result.rows[0].id);
                    console.log(`First ${token}`);
                    res.status(202).send({
                        status: 'Successful',
                        result: result.rows[0],
                        token 
                    });
                }
            }); 
        });
        
        console.log(`second ${token}`);
        return pool
    } catch(error) {
        if (error.routine === '_bt_check_unique') {
            return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
        }
        return res.status(400).send(error);
    };
});

 router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    try {
        pool.connect((err, client, done) => {
            const username = req.body.email;
            const password = req.body.password;
            const query = 'SELECT * FROM users WHERE email = $1';

            client.query(query, [username], (error, result) => {
                done();
                
                if(!result.rows[0]) {
                    return res.status(400).send({'message': 'The credentials you provided is incorrect'});
                }
                if(!Helper.comparePassword(result.rows[0].password, password)) {
                    return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
                }
                if (error) {
                    res.status(400).json({error})
                } else{
                    const token = Helper.generateToken(result.rows[0].id);
                    console.log(`First ${token}`);
                    res.status(200).send({
                        status: 'Successful',
                        result: result.rows[0],
                        token 
                    });
                }
            }); 
        });
    
        return pool;
    } catch(error) {
        return res.status(400).send(error)
    }
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});
module.exports = router;