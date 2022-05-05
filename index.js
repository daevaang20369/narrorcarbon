const express = require("express");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const mysql = require("mysql");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const expressLayouts = require("express-ejs-layouts");
const { request } = require("express");
const { urlencoded } = require("body-parser");
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("html", require('ejs').renderFile);
app.set('view engine', 'ejs')
require('dotenv').config;
app.use(expressLayouts)
app.set('layout', './layouts/layout')
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MyNewPass'
})


db.connect(err => {
    if (err) {
        throw err
    }
    console.log('Mysqlconnted')
})
let sql = "USE disproject";
db.query(sql, (err) => {
    if (err) {
        throw err;
    }
    console.log("connected")
})

app.get('', (req, res) => {
    var result = [{ 'releaseco': 350, 'submitdate': "14 MARCH 2022" }, { 'releaseco': 300, 'submitdate': "16 MARCH 2022" },
        { 'releaseco': 230, 'submitdate': "17 MARCH 2022" }
    ]

    res.render("home", { resu: result })


})
app.get('/addactivity', (req, res) => {
    res.render("dropdown");
})
app.get('/transport', (req, res) => {
    res.render("transport");
})
app.get('/datatransport', async(req, res) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    let data = req.query;
    let carbon = 0;

    carbon = carbon + (data.card * 0.111)
    carbon = carbon + (data.biked * 0.50)
        // let sql = "insert into submission values ('1','" + date + "','" + time + "','" + carbon + "')";
        // db.query(sql, (err, result) => {
        //     if (err) {
        //         throw err;
        //     } else {

    //     }
    // })

    var arry = [];
    var i = 0;
    arry.push(carbon);

    if (data.card > data.biked) {
        arry.push("You should try to travel more with 2 wheeler")
    }
    if (data.card > 100) {
        arry.push("You should use cycle for smaller distances")
    }
    if (data.carmanu < 2010) {
        arry.push("You should buy a new car with emission under regulatory standards")
    }
    if (data.carmi < 10) {
        arry.push("You should switch to clearner fuels which helps in increase of milage")
    }
    if (data.carmanu < 2010) {
        arry.push("You should buy a new car with emission under regulatory standards")
    }


    res.render('suggestion', { arry });
})
app.get('/lifestyle', (req, res) => {
    res.render("lifestyle");
})
app.get('/datalifestyle', async(req, res) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    let data = req.query;
    let carbon = 0;

    carbon = carbon + (data.elbill * 0.527 / 12)
        // let sql = "insert into submission values ('1','" + date + "','" + time + "','" + carbon + "')";
        // db.query(sql, (err, result) => {
        //     if (err) {
        //         throw err;
        //     } else {

    //     }
    // })

    var arry = [];
    arry.push(carbon);

    if (data.elbill > 4500) {
        arry.push("You should try use renewable sources of energy")
    }
    if (data.vegan == "NO" || data.vegan == "no") {
        arry.push("The more energy-intensive it is to produce and transport your food, the worse for the environment it generally is. Kindly try to accommodate more plant based products in your diet so that CO2 emissions are minimal. ")
    }
    if (data.clothingprice > 3000) {
        arry.push("When clothing is disposed of quickly, they fill up landfills, decompose and produce methane. So kindly try and use recycled activewear/denim or plant based fabrics to minimise your Co2 emmisions.")
    }


    res.render('suggestion', { arry });
})

app.get('/articles', (req, res) => {
    res.render("articles");
})
app.get('/sug', (req, res) => {
    res.render("suggestion");
})
app.listen('5001', () => {
    console.log("connected")
})