const Schema = require('mongoose').Schema;
const SchemaTypes = require('mongoose').SchemaTypes;

const UserSchema = new Schema({
  password: {
    type: SchemaTypes.String,
    required: [true, 'Password required !']
  },
  pincode: {
    type: SchemaTypes.String,
    max: [8, "Max pincode 8 digits" ],
    min: [4, "Min pincode 4 digits" ],
    required: [true, 'Pincode is required !']
  },
  username: {
    type: SchemaTypes.String,
    required: [true, 'Username required !']
  },
  email: {
    type: SchemaTypes.String,
    required: [ true, 'Email require !']
  }
});

class User {}

UserSchema.loadClass(User);
module.exports.User = UserSchema;


