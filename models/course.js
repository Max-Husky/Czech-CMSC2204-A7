const { Schema } = require("mongoose");

module.exports = new Schema({
  courseInstructor: {type: String, required: true},
  courseCredits: {type: Number, required: true},
  courseID: {type: String, required: true},
  courseName: {type: String, required: true},
  dateEntered: {type: Date, required: true, default: () => new Date()},
});
