const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

(async ()=> {
  try {
    await db.mongoose.connect(db.url);
    console.log("Successfully connect to MongoDB.");
  } catch (err) {
    console.error("Connection error", err);
    process.exit(1); // Exit with an error code
  }
})();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to AOL application." });
});

require("./app/routes/lecture.routes")(app);
require("./app/routes/exam.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});