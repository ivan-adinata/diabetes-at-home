const patientModel = require('../models/patients')
const Clinician = require('../models/clinicians')

// Get all clinicians.
const getAllClinicians = async (req, res, next) => {
  try {
    const clinicians = await Clinician.find()
    return res.send(clinicians)
  } catch (err) {
    return next(err)
  }
}

// Get all the patients of a clinician.
const viewAllPatients = async (req, res, next) => {
  try {
    // Hardcode the user (for now).
    const clinician = await Clinician.findOne({ first_name: 'Chris' })
    // Find all Patient document IDs listed for this Clinician.
    const data = await patientModel.Patient.find({
      _id: { $in: clinician.patient_list },
    })
    res.send(data)
  } catch (err) {
    return next(err)
  }
}

// Get one specific patinet 
const getOnePatient = async (req, res, next) => { 
  try { 
    const patient = await Patient.findById(req.params.patient_id).lean()
    if (patient) { 
      res.send(patient)
    }
    else { 
      res.send("patient not found")
    }
  } catch (err) { 
    return next(err)
  }
}

// Add a new patient 
const addOnePatient = async (req, res, next) => { 
  try { 
    const newPatient = req.body
    if (!Patient.find((d) => d.patient_id == newPatient.id)) { 
      Patient.push(newPatient) 
    }
  } catch (err) { 
    return next(err)
  } 
}

module.exports = {
  //getAllClinicians,
  viewAllPatients,
  getOnePatient,
  addOnePatient,
}
