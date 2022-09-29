let express = require('express');

let app = express();

app.use(express.static(__dirname+"/dist/school"));

app.get('/*',(req ,resp)=>{
    resp.sendFile(__dirname+'/dist/school/index.html');
});

app.listen(process.env.PORT || 8080);