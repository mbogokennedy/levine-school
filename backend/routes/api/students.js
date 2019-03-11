const express = require("express");
const router = express.Router();
const pool = require('../../models/dbConf');
const moment = require('moment');
const uuidv4 = require('uuid/v4') ;


pool.on('connect', () => {
  console.log('connected to the Database');
});

//@ GET route = it gets all items from api/items

router.get('/', (req, res) => {
    pool.connect((err, client, done) => {
        const query = 'SELECT * FROM students';
        client.query(query, (error, result) => {
            done();
            if (error) {
                res.status(400).json({error})
            } 
            if(result.rows < '1') {
                res.status(404).send({
                status: 'Failed',
                message: 'No student information found',
            });
            } else {
                res.status(200).send({
                    status: 'Successful',
                    message: 'Students Information retrieved',
                    students: result.rows,
                });
            };
        });
    });
});

router.post('/', (req, res) => {
    const data = {
        name : req.body.student_name,
        age : req.body.student_age,
        classroom : req.body.student_class,
        parents : req.body.parent_contact,
    }
  
    pool.connect((err, client, done) => {
      const query = 'INSERT INTO students(id,student_name,student_age, student_class, parent_contact,admission_date) VALUES($1,$2,$3,$4,$5,$6) RETURNING *';
      const values = [uuidv4(), data.name, data.age, data.classroom, data.parents, moment(new Date())];
  
      client.query(query, values, (error, result) => {
        done();
        if (error) {
          res.status(400).json({error});
        } else{
            res.status(202).send({
            status: 'Successful',
            result: result.rows[0],
            });
        };
      });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    pool.connect((err, client, done) => {
        const query = 'SELECT * FROM students WHERE id = ($1)';
        client.query(query, [id], (error, result) => {
            done();
            if (error) {
                res.status(400).json({error})
            
            }
            if(result.rows < '1') {
                res.status(404).send({
                status: 'Failed',
                message: `No student information found for id ${id}`,
            });
            } else {
                res.status(200).send({
                    status: 'Successful',
                    message: 'Student Information retrieved',
                    students: result.rows,
                });
            };
        });
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const data = {
        name : req.body.studentName,
        age : req.body.studentAge,
        classroom : req.body.studentClass,
        parents : req.body.parentContact,
        admission : req.body.admissionDate,
      }
    
    pool.connect((err, client, done) => {
        const query = 'UPDATE students SET student_name=$1, student_age=$2, student_class=$3, parent_contact=$4, admission_date=$5 WHERE id=$6';
        const values =[data.name, data.age, data.classroom, data.parents, data.admission, id]
        client.query(query, values, (error, result) => {
            done();
            if (error) {
                res.status(400).json({error})
            }else {
                res.status(200).send({
                    status: 'Successful',
                    message: `student information with id ${id} modified`,
                    result: result.rows[id],
                });
            };
        });
    });
});

router.delete('/:id', (req, res) =>{
    const id = req.params.id;
    pool.connect((err, client, done) => {
        const query = 'DELETE FROM students WHERE id = $1';
        client.query(query, [id], (error, result) =>{
            if (error){
                throw error
            } else{
                res.status(200).send({
                    status: 'Succesful',
                    message: `Student with id ${id} deleted`
                });
            };
        });
    });
});

module.exports = router