const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.lectures = require("./lecture.model.js")(mongoose);
db.exams = require("./exam.model.js")(mongoose);

module.exports = db;