var express = require('express');

var app = express();
const PORT = process.env.PORT || 3000;

// app.use(function (req, res, next) {
//   if(req.headers['x-forwarded-proto'] === 'http') next();
//   else res.redirect('http://'+req.get('host')+req.originalUrl);
// });
app.use(express.static(__dirname+'/public'));

app.listen(PORT, function(){
   console.log(`Application listening on port ${PORT}`);
});