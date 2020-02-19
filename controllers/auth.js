const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const appointmentsList = require('../models/appointments');
const PersonModel = require('../models/person');
const http = require('http');
const https = require('https');
const api_helper = require('./api_helper');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const verifyToken = require('./tokenValidator');

const SECRET_KEY = 'secretkey12345'

router.post('/login', (req,res) => {
    axios.post('http://localhost:3001/vr/api/auth/loginPatient',{ 
          "email": req.body.user.email,
          "password": req.body.user.password
      })
      .then(response => {
         res.status(200).send({
            user: response.data.user,
            token: response.data.token
          });
          
      })
      .catch(error => {
          res.send(false)
      });
    });

    router.post('/singIn', (req,res) => {
        axios.post('http://localhost:3001/vr/api/auth/registerPatient',{ 
              "person": { 
                "firstName": req.body.user.firstName,
                "lastName": req.body.user.lastName,
                "birthDate": "",
                "dni": "",
                "phone": ""
              },
              "patient": {
                    "email": req.body.user.email,
                    "password": req.body.user.password
              }
            }
            
            
          )
          .then(response => {
             res.status(200).send({
                user: response.data.user,
                token: response.data.token
              });
              
          })
          .catch(error => {
              res.send(false)
          });
        });

    
// middleware
        // function verifyToken(req, res, next) {
        //     const token = req.headers['authorization'];
        //     if (!token) {
        //         return res.status(401).send({ auth: false, message: 'No token provided' });
        //     }
        //     // Decode the Tokenreq.userId = decoded.id;
        //     const decoded =  jwt.verify(token, SECRET_KEY);
        //     req.userId = decoded._id;
        //     next();
        // }
        


module.exports = router;