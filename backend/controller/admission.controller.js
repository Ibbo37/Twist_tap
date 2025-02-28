import Admission from "../model/Admission.js";

export const AdmissionPortal = async (req, res) => {
    try {
      const { fullName, age, email, phone, city, personalStatement, statementOfPurpose, programDuration } = req.body;
  
      console.log(fullName, age, email, phone, city, personalStatement, statementOfPurpose, programDuration);
      
      const newAdmission = new Admission({
        fullName,
        age,
        email,
        phone,
        city,
        personalStatement,
        statementOfPurpose,
        programDuration
      });
  
      
      await newAdmission.save();
  
     
      res.status(200).json({ message: 'Admission submitted successfully!' });
    } catch (error) {
      console.error('Error submitting admission form:', error);
      res.status(500).json({ message: 'Error submitting admission data.' });
    }
  };

  export const getAdmissions = async (req, res) => {
    try {
      const admissions = await Admission.find();
      res.status(200).json(admissions);
    } catch (error) {
      console.error('Error fetching admissions:', error);
      res.status(500).json({ message: 'Error fetching admissions.' });
    }
  };