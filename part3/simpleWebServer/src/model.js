
const mongoose = require('mongoose')

const customValidator = {
  validator: function(value) {
    return /^[0-9]{2,3}-[0-9]+$/.test(value) && value.length >= 8;
  },
  message: props => `${props.value} is not a valid format. It should be in the format 'XX-XXXX' or 'XXX-XXXX' where X is a digit, and the total length is 8 or more characters.`
}

const numberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    number: {
      type: String,
      required: true,
      validate: customValidator
    }
  })
  
const Number = mongoose.model('Number', numberSchema)
module.exports = Number;
