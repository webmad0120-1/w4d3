const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function capitalize(val) {
  if (typeof val !== "string") {
    val = "";
  }
  //   return val.charAt(0).toUpperCase() + val.substring(1);
  return `xxxxx${val
    .split("")
    .map((x, idx) => (idx % 2 ? x.toUpperCase() : x))
    .join("")}xxxxx`;
}

const schemaName = new Schema({
  name: {
    type: String,
    // set: capitalize,
    maxlength: 5
  },
  password: String,
  salary: Number,
  avatar: {
    type: String,
    default:
      "https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg"
  }
});

const Model = mongoose.model("Users", schemaName);
module.exports = Model;
