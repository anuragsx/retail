const Schema = require('mongoose').Schema;
const SchemaTypes = require('mongoose').SchemaTypes;

const InventorySchema = new Schema({
  inv_description: {
    type: SchemaTypes.String
  },
  inv_additional_description1: {
    type: SchemaTypes.String
  },
  inv_additional_description2: {
    type: SchemaTypes.String
  },
  inv_reference: {
    type: SchemaTypes.String
  },
  inv_barcode: {
    type: SchemaTypes.String
  },
  inv_type: {
    type: SchemaTypes.String
  },
  inv_item: {
    type: SchemaTypes.String
  },
  inv_department: {
    type: SchemaTypes.String
  },
  inv_section: {
    type: SchemaTypes.String
  },
  inv_section: {
    type: SchemaTypes.String
  },
  inv_family: {
    type: SchemaTypes.String
  },
  inv_subfamily: {
    type: SchemaTypes.String
  },
  inv_brand: {
    type: SchemaTypes.String
  },
  inv_additional_desc: {
    type: SchemaTypes.String
  },
  inv_additional_desc: {
    type: SchemaTypes.String
  },
  inv_sale_tax: {
    type: SchemaTypes.String
  },
  inv_purchace_tax: {
    type: SchemaTypes.String
  },
  inv_duration: {
    type: SchemaTypes.String
  },
  inv_purchace_units: {
    type: SchemaTypes.String
  },
  inv_sale_units: {
    type: SchemaTypes.String
  },
  inv_transfer_qty: {
    type: SchemaTypes.String
  },
  inv_labels_design: {
    type: SchemaTypes.String
  },
  inv_customs_code: {
    type: SchemaTypes.String
  },
  inv_minimum_price: {
    type: SchemaTypes.Number
  },
  inv_maximum_price: {
    type: SchemaTypes.Number
  },
  inv_maximum_price: {
    type: SchemaTypes.Number
  },
}, { collection: 'inventories' });

class Inventory {}

InventorySchema.loadClass(Inventory);
module.exports.Inventory = InventorySchema;
