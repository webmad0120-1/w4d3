const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema(
  {
    name: String
  },
  { timestamps: true }
);

const Model = mongoose.model("Directors", schemaName);
module.exports = Model;
