const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
var sql = require("mssql");
var cors = require('cors');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
//Initializing connection string
var dbConfig = {
    user:  "username",
    password: "password",
    server: "hostname",
    database: "dbname"
};

const sqlReq=sql.Request();
sql.connect(dbConfig);//'Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true'
//sql.query`select * from mytable where id = ${value}`        
app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/get/lophocphan',(req,res)=>{
    sqlReq.query(`SELECT * FROM LOPHOCPHAN LEFT JOIN LICHTHI_HOCPHAN ON LOPHOCPHAN.id_lichthi=LICHTHI_HOCPHAN.id_lichthi`).then(result=>res.json(result));
})

app.post('/insert/lichthi',(req,res)=>{
    var e=req.body.params;
    sqlReq.query(`INSERT INTO LICHTHI_HOCPHAN VALUES ("${e.id_lichthi}",${e.phongthi},${e.ngaythi},"${e.thoigian}")`).then(result=>res.json(result));
})

app.post('/update/lichthi',(req,res)=>{
    var e=req.body.params;
    sqlReq.query(`UPDATE LICHTHI_HOCPHAN 
    SET id_lichthi= "${e.id_lichthi}", ngaythi= ${e.ngaythi},phongthi=${e.phongthi},thoigian= "${e.thoigian}"
    WHERE id_lichthi="${e.id_lichthi};`).then(result=>res.json(result));
})

app.post('/insert/lophocphan',(req,res)=>{
    var e=req.body.params;
    sqlReq.query(
        `INSERT INTO LOPHOCPHAN VALUES("${e.id_lop}","${e.ten}","${e.hocki}",${e.sinhvientoida},0,"${e.id_monhoc}",NULL)`
    ).then(result=>res.json(result));
});
app.post('/update/lophocphan',(req,res)=>{
    var e=req.body.params;
    sqlReq.query(
        `UPDATE LOPHOCPHAN SET id_lop="${e.id_lop}", ten="${e.ten}",hocki="${e.hocki}",sinhvientoida = ${e.sinhvientoida},id_monhoc="${e.id_monhoc}"`
    ).then(result=>res.json(result));
});

app.listen(process.env.PORT || 8080);