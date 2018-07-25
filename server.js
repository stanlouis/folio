const express = require("express");
const mongoose = require("mongoose");
require("./services/passport");

const app = express();

require("./routes/authRoutes")(app);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/gweb")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to MongoDB", err));

// Check nyt_react_search project
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT);
