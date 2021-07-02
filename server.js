const morgan = require("morgan");

// init project
var express = require("express");
var app = express();

const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");

app.use(morgan("common"));
app.use(cors());

app.get("/api", (req, res) => {
  let now = Date.now();
  res.json({
    unix: now,
    utc: new Date(now).toUTCString(),
  });
});

let months = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

app.get("/api/:date", (req, res) => {
  let date_string = req.params.date;
  let unix;

  // console.log(date_string);

  //   console.log(date_string);
  //   console.log(new Date(date_string));
  // Check if date is unix or other formats
  if (date_string.match(/\d{13}/)) {
    unix = parseInt(date_string);
    res.json({
      unix,
      utc: new Date(unix).toUTCString(),
    });
  } else if (date_string.match(/\d{1,2}\s{1,}[a-z]+\s{1,}\d{4}/i)) {
    let parsed = date_string.split(/\s+/);
    // console.log(parsed);
    let day = parseInt(parsed[0]);
    let month = months[parsed[1]];
    let year = parseInt(parsed[2]);

    let date = new Date(Date.UTC(year, month, day));
    // console.log(date);
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString(),
    });
  } else {
    let dateObject = new Date(date_string);

    // console.log(dateObject);
    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: dateObject.valueOf(),
        utc: dateObject.toUTCString(),
      });
    }
  }
});

// listen for requests :)
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
