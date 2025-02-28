import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  personalStatement: { type: String, required: true },
  statementOfPurpose: { type: String, required: true },
  programDuration: { type: String, required: true },  
});

const Admission = mongoose.model('Admission', admissionSchema);

export default Admission;
