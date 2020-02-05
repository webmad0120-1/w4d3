const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema(
  {
    title: String,
    year: Number,
    director: String
  },
  { timestamps: true }
);

const Model = mongoose.model("Movies", schemaName);
module.exports = Model;
