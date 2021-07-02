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

app.get("/api/:date", (req, res) => {
  let date_string = req.params.date;
  let unix;
  // Check if date is unix or other formats
  if (date_string.match(/\d{13}/)) {
    unix = parseInt(date_string);
    res.json({
      unix,
      utc: new Date(unix).toUTCString(),
    });
  } else {
    let dateObject = new Date(date_string);

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
