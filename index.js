// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
  // res.send("Hello");
  let datePattern = /^\d{4}-\d{1,2}-\d{1,2}$/;
  let numericPattern = /^\d+$/;

  if (datePattern.test(req.params.date) === true || numericPattern.test(req.params.date)) {
    // Getting date from url
    let date = req.params.date;

    if (!date.includes("-")) {
      date = Number(date);
    }

    // date = Number(date);
    const newDate = new Date(date);
    console.log(newDate);
    // Timestamp function

    const timeStampDate = Math.floor(newDate.getTime());
    console.log(timeStampDate);
    // UTC date

    const utcDate = newDate.toUTCString();
    console.log(utcDate);

    res.json({
      unix: timeStampDate,
      utc: utcDate,
    });
  } else {
    res.json({
      error: "Invalid date"
    })
  }

  
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
