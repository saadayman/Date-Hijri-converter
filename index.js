const express = require("express");
const app = express();
const port = 3000;
let moment = require("moment-hijri");

// Hijri month names in Arabic
const hijriMonthsAr = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];
app.use(express.json()); // Middleware to parse JSON bodies

app.post("/convert-to-hijri", (req, res, next) => {
  try {
    moment.locale("en");
    const date = req.body.date; // Expecting a date in 'YYYY-MM-DD' format
    console.log(date);

    const hijriDate = moment(date).format("iYYYY/iM/iD");
    let formattedDate = moment(date).format("iYYYY/iM/iD dddd, iMMMM");
    const hijriMoment = moment(date);
    const hijriMonthNameEn = hijriMoment.format("iMMMM");
    const hijriDayNameEn = hijriMoment.format("dddd");
    moment.locale("ar-SA");
    const hijriDate2 = moment(date).format("iYYYY/iM/iD");
    let formattedDate2 = moment(date).format("iYYYY/iM/iD dddd, iMMMM");
    const hijriMonthIndex = parseInt(hijriMoment.format("iM")) - 1; // 0-based index for arrays
    const hijriDayNameAr = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ][hijriMoment.day()];
    const hijriMonthNameAr = hijriMonthsAr[hijriMonthIndex];
    res.json({
      convertedDate: {
        english: {
          hijriDate,
          formattedDate,
          monthName: hijriMonthNameEn,
          dayName: hijriDayNameEn,
        },
        arabic: {
          hijriDate2,
          formattedDate2,
          monthName: hijriMonthNameAr,
          dayName: hijriDayNameAr,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

app.post("/convert-to-gregorian", (req, res) => {
  const { date } = req.body; // Expecting a date in 'iYYYY/iM/iD' format
  moment.locale("en");
  const gregorianDate = moment(date, "iYYYY/iM/iD").format("YYYY-MM-DD");
  res.json({ convertedDate: gregorianDate });
});
app.use((err, req, res, next) => {
  res.status(400).json({
    error: err.message,
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
