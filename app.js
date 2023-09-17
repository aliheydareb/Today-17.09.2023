const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

let connection = mysql.createConnection({
    host: "btbn9g9ru97a7onzg57k-mysql.services.clever-cloud.com",
    user: "uacgnk4wtnvk0pav",
    password: "MA6rxqJjVCTUSh33IKxt",
    database: "btbn9g9ru97a7onzg57k",
  });

app.get("/users", function (req, res) {
    connection.query("select * from users", function (err, result, fields) {
      res.send(result);
    });
  });
  
app.get("/users/:id", (req, res) => {
    const elem = req.params;
    connection.query("select * from users", function (err, result, fields) {
      for (let i = 0; i < result.length; i++) {
        if (elem.id == result[i].id) {
          res.send(result[i]);
        }
      }
    })
  })
  
app.delete("/users/:id", (req, res) => {
    const elem = req.params.id;
    const silininenElementArray = db.filter(
      (element) => element.id != elem
    );
    connection.query(
      `DELETE FROM users WHERE id=${elem}`,
      function (err, result, fields) {
        console.log(result);
      }
    );
  });
  
  app.post("/users/", (req, res) => {
    let obj = req.body;
    console.log(obj);
    connection.query(
      `INSERT INTO users (id, ad, soyad, password)
      VALUES ("${obj.id}", "${obj.ad}", "${obj.soyad}", "${obj.password}")`,
      function (err, result, fields) {
          console.log(result);
          app.get("/student", function (req, res) {
            res.send(result);
          });
      }
    );
    connection.query("select * from users", function (err, result, fields) {
      console.log(result);
      res.send(result);
    });
  });
  
  
  app.listen(process.env.PORT || 3000);