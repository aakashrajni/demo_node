var express = require('express');
var app = express();
var path = require('path');
var fileUpload = require('express-fileupload');
var logger = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs'),
        pdf2json = require("pdf2json");
            var pdf2table = require("pdf2table");
var hummus = require("hummus");
var text,texts;

// Log all requests
app.use(logger('dev'));

// Serve static files
app.use(express.static(__dirname));
app.use(fileUpload());

// Parse request body into req.body.*
app.use(urlencodedParser);

// Route for specific URLs
app.get('/books', function(req, res){
  res.send('A list of books goes here');
});

// A specific book by ID
app.get('/books/:id', function(req, res){
  var html = "<p>You requested book <b>" + req.params.id + "</b>.</p>"
  res.send(html);
});

// Search form (GET)
app.get("/search", function(req, res) {
  res.send('page End');
		const pdfWriter = hummus.createWriterToModify( 'fixed.pdf', {
			modifiedFilePath: 'Modified.pdf'
		});
		const pageModifier = new hummus.PDFPageModifier(pdfWriter,0);
		pageModifier.startContext();
		const context = pageModifier.getContext();
		context.writeText(
			text[4],
			180, 500,
			{font:pdfWriter.getFontForFile('Times New Roman.ttf'),size:14,colorspace:'black',color:'black'}
		);
		context.writeText(
			text[7],
			450, 500,
			{font:pdfWriter.getFontForFile('Times New Roman.ttf'),size:14,colorspace:'black',color:'black'}
		);
		context.writeText(
			text[10],
			620, 500,
			{font:pdfWriter.getFontForFile('Times New Roman.ttf'),size:14,colorspace:'black',color:'black'}
		);
		context.writeText(
			text[13],
			180, 350,
			{font:pdfWriter.getFontForFile('Times New Roman.ttf'),size:14,colorspace:'black',color:'black'}
		);
		context.writeText(
			text[16],
			450, 350,
			{font:pdfWriter.getFontForFile('Times New Roman.ttf'),size:14,colorspace:'black',color:'black'}
		);
		context.writeText(
			text[19],
			620, 350,
			{font:pdfWriter.getFontForFile('Times New Roman.ttf'),size:14,colorspace:'black',color:'black'}
		);
		context.writeText(
			text[22],
			180, 200,
			{font:pdfWriter.getFontForFile('Times New Roman.ttf'),size:14,colorspace:'black',color:'black'}
		);
		context.writeText(
			text[25],
			450, 200,
			{font:pdfWriter.getFontForFile('Times New Roman.ttf'),size:14,colorspace:'black',color:'black'}
		);
		context.writeText(
			text[28],
			620, 200,
			{font:pdfWriter.getFontForFile('Times New Roman.ttf'),size:14,colorspace:'black',color:'black'}
		);
		pageModifier.endContext().writePage();
		pdfWriter.end();

		
});

// Search form (POST)
app.post("/search", urlencodedParser, function(req, res) {
  var searchText = req.body.searchText;
  res.send("<p>Your search for <b>" + searchText + "</b> returned no results</p>");
});

app.post("/upload", function(req, res) {
req.files.sampleFile.mv('try.pdf', function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send('File uploaded!');
    }

fs.readFile('try.pdf', function (err, buffer) {
    if (err) return console.log(err);

    pdf2table.parse(buffer, function (err, rows, rowsdebug) {
        if(err) return console.log(err);
	fs.writeFile('tried.txt',rows);
	console.log(rows);
	function function2() {
	 text = fs.readFileSync('tried.txt').toString().split(",") 
}
setTimeout(function2, 1000);
    });
});
});

});

// Route for everything else.
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/sample.html'));

	
  
});

// Fire it up!
app.listen(3000);
console.log('Listening on port 3000');
