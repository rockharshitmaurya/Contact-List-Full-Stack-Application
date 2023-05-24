require("dotenv").config({ path: ".env" });
const express = require("express");
const morgan = require("morgan");

const connectDB = require("./database/db");

const auth = require("./middlewares/auth");

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(require("cors")());

// routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/contact"));

app.get("/",(req,res)=>{
  res.json({message:"Welcome to the Contact API!"})
})

// server configurations.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  
  console.log(`server listening on port: ${PORT}`);
});
