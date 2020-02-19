const express = require('express');
const router = express.Router();
const pacientesList = require('../models/patient');
const appointmentsList = require('../models/appointments');
const verifyToken = require('./tokenValidator');
const api_helper = require('./api_helper');
const axios = require('axios')




//GET HTTP method to /pacientes
router.get('/',(req,res) => {
    pacientesList.getAllLists((err, lists) => {
        if (err) {
            res.json({success: false, message: `Failed to load all lists. Error: ${err}`});
        } else {
            res.write(JSON.stringify({success: true, lists:lists},null,2));
            res.end();
        }
    })
});



//POST HTTP method to /pacientes

router.post('/', (req,res,next) => {
        let newList = new pacientesList({
            dni: req.body.dni,  
            name: req.body.name,
            surname: req.body.surname,
            gender: req.body.gender
        });
        pacientesList.addList(newList, (err, list) => {
            if (err) {
                res.json({success: false, message: `failed to create a new list. Error: ${err}`})
            } else {
                res.json({success: true, message: 'Added new list'});
            }
        })
    });


//DELETE HTTP method to /pacientes. Here, we pass in a params which is the object id.
router.delete('/', (req,res,next)=> {

    let id;
    let dni = parseInt(req.body.dni);
    pacientesList.findOne({dni: dni}, function (err, obj) {
        id = obj.id;  
        //Call the model method deleteListById
        pacientesList.deleteListById(id,(err,list) => {
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

  router.post('/requestappointment', (req,res,next) => {
      appointmentsList.setPatientId(req.body.appointmentId, req.body.patientId, (err, obj) => {
        if (err) {
            res.json({success: false, message: `failed to create a new list. Error: ${err}`})
        } else {
            pacientesList.requestedAppointments(req.body.patientId, req.body.appointmentId, (err, obj) => {
                if (err) {
                    res.json({success: false, message: `failed to create a new list. Error: ${err}`})
                } else {
                    res.json({success: true, message: 'Added new list'});
                }
            })
        }
      })
  });

//   retorna el usuario logueado

router.get('/currentUser', verifyToken, (req,res) => {    
    api_helper.make_API_call('http://localhost:3001/vr/api/patient/' + req.userId)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.send(error)
    });
});

router.post('/createPatient', (req,res,next) => {
    axios.post('http://localhost:3001/vr/api/patient/create' ,{ 'person': {
        
        'firstName': req.body.user.name,
        'lastName':  req.body.user.lastName,
        'phone':  req.body.user.phone,
        },
        'patient': {
		
        }
      
    })
    .then(response => {
        res.status(200).send({
            user: response.data,
          });
        console.log(response);
    })
    .catch(error => {
        res.send(error)
    });

})

router.post('/update', verifyToken, (req,res) => {
    axios.post('http://localhost:3001/vr/api/patient/update/' + req.userId , { 'person': {
        'firstName': req.body.user.name,
        'lastName':  req.body.user.lastName,
        'birthDate': req.body.user.birthDate,
        'dni': req.body.user.dni,
        'phone':  req.body.user.phone,
        }      
    })
    .then(response => {
        res.status(200).send({
           user: response.data.user,
           token: response.data.token
         });
         
     })
     .catch(error => {
         res.send(error)
    });

})

module.exports = router;