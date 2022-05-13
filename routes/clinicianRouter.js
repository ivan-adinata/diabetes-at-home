const express = require('express')
const clinicianRouter = express.Router()
const clinicianController = require('../controllers/clinicianController')

clinicianRouter.get('/', clinicianController.viewAllPatients)

module.exports = clinicianRouter
