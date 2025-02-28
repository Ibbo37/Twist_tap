import express from 'express';
import Admission from '../model/Admission.js';
import { AdmissionPortal } from '../controller/admission.controller.js';


const router = express.Router();


router.route('/submit-admission').post(AdmissionPortal)

export default router;