const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const appointmentsList = require('../models/appointments');
const PersonModel = require('../models/person');
const http = require('http');
const https = require('https');
const axios = require('axios')
const api_helper = require('./api_helper');
const verifyToken = require('./tokenValidator');


//GET HTTP method to /pacientes
router.get('/specialist/:specialistName',(req,res) => {
    let specialistName = req.params.specialistName;
    api_helper.make_API_call('http://localhost:3001/vr/api/doctor/speciality/' + specialistName)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    });
});

router.get('/specialist/:specialistName',(req,res) => {
// let specialist = req.body.specialist;
    console.log(req.params.specialistName); 
    Doctor.find({gender:'Man'}, (err, lists) => {
        if (err) {
            res.json({success: false, message: `Failed to load all lists. Error: ${err}`});
        } else {
            res.write(JSON.stringify({success: true, lists:lists},null,2));
            res.end();
        }
    })
});


router.post('/request-appointment', (req,res,next) => {

    axios.post('http://localhost:3001/vr/api/appointment/new',{
        doctor: req.body.doctor_id,
        patient: req.body.patient_id,
        date: req.body.date,
        hour: req.body.hour,
        observation: req.body.observation
    })
    .then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
      })
      .catch((error) => {
        console.error(error)
        res.json({success: false, message: 'Tuvimos problemas para solicitar este turno, por favor intente de nuevo'});
      });
      res.json({success: true, message: 'turno solicitado'});

})

router.post('/request-appointment-logged', verifyToken,  (req,res,next) => {

    axios.post('http://localhost:3001/vr/api/appointment/new',{
        doctor: req.body.doctor_id,
        patient: req.userId,
        date: req.body.date,
        hour: req.body.hour,
        observation: req.body.observation
    })
    .then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
      })
      .catch((error) => {
        console.error(error)
        res.json({success: false, message: 'Tuvimos problemas para solicitar este turno, por favor intente de nuevo'});
      });
      res.json({success: true, message: 'turno solicitado'});

})

//POST HTTP method to /doctors

router.post('/', (req,res,next) => {
        let newDoctor = new Doctor({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dni: req.body.dni,
            gender: req.body.gender,
            phone: req.body.phone,
            birthDate: req.body.birthDate 
        });
        Doctor.addList(newDoctor, (err, list) => {
            if (err) {
                res.json({success: false, message: `failed to create a new list. Error: ${err}`})
            } else {
                res.json({success: true, message: 'Added new list'});
            }
        })
    });

// METODO PARA AGREGAR TURNOS

//DELETE HTTP method to /doctors. Here, we pass in a params which is the object dni.
router.delete('/', (req,res,next) => {
    
    let id;
    let dni = parseInt(req.body.dni);
    Doctor.findOne({dni: dni}, function (err, obj) {
        id = obj.id;  
        //Call the model method deleteListById
        Doctor.deleteListById(id,(err,list) => {
            if(err) {
                res.json({success:false, message: `Failed to delete the list. Error: ${err}`});
            }
            else if(list) {
                res.json({success:true, message: "Deleted successfully"});
            }
            else
                res.json({success:false});
        })
    });
    
  });

  router.post('/createappointment', (req, res, next) => {
    let newAppointment = new appointmentsList ({
        doctorId: req.body.doctorId,
        date: req.body.date,
        appointmentStatus: req.body.appointmentStatus,
    });

    appointmentsList.addList(newAppointment, (err, list) => {
        if (err) {
            res.json({success: false, message: `failed to create a new list. Error: ${err}`})
        } else {
            console.log('turno creado. Asignandolo al doctor.');
            Doctor.addAppointment(req.body.doctorId, list.id, (err,list) => {
                if (err) {
                    res.json({success: false, message: `failed to create a new list. Error: ${err}`})
                } else {
                    res.json({success: true, message: 'Added new list'});
                }
            })
        }
    });
  });

  router.get('/next/:id',(req,res) => {    
    api_helper.make_API_call('http://localhost:3001/vr/api/appointment/next/' + req.params.id)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    });
});

router.get('/onDay/:id/:date',(req,res) => {    
    api_helper.make_API_call('http://localhost:3001/vr/api/appointment/doctor/available/' + req.params.id + '/' + req.params.date)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    });
});

module.exports = router;