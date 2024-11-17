import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address format',
    },
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
    minLength: [10, "no should have minimum 10 digits"],
    maxLength: [10, "no should have maximum 10 digits"],
    match: [/\d{10}/, "no should only have digits"]
  },
  company: String,
  jobTitle: String
});

const Contact = model('Contact', contactSchema);
export default Contact;