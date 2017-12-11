const Schema = require('mongoose').Schema;
const SchemaTypes = require('mongoose').SchemaTypes;

const DepartmentSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    max: [20, "Max Name 20 digits" ],
    required: [true, 'Name is required !']
  },
  belong_to: {
    type: SchemaTypes.ObjectId,
    required: [false, ''],
    default: null
  },
  code: {
    type: SchemaTypes.Number,
    required: [true, 'Code required !']
  },
  type: {
    type: SchemaTypes.String,
    required: [true, 'Code required !']
  }
});

class Department {}

DepartmentSchema.loadClass(Department);
module.exports.Department = DepartmentSchema;


