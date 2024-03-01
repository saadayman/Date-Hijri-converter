const express = require("express");
const moment = require("moment-hijri");
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/convert-to-hijri", (req, res) => {
  const { date } = req.body; // Expecting a date in 'YYYY-MM-DD' format
  const hijriDate = moment(date).format("iYYYY/iM/iD");
  res.json({ convertedDate: hijriDate });
});

app.post("/convert-to-gregorian", (req, res) => {
  const { date } = req.body; // Expecting a date in 'iYYYY/iM/iD' format
  const gregorianDate = moment(date, "iYYYY/iM/iD").format("YYYY-MM-DD");
  res.json({ convertedDate: gregorianDate });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
