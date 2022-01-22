var express = require('express');
var cors = require('cors');
var formidable = require('formidable');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res) {
  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    console.log(fields);
    console.log(files.upfile);
    res.json({ name: files.upfile.originalFilename, type: files.upfile.mimetype, size:files.upfile.size });
  });
    
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
