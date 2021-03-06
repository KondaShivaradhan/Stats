var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
const port = 5000
app.use(express.urlencoded({ extended: false }));
var apex = require('./stats/apex.js')
var r6 = require('./stats/r6.js')
const { response } = require('express');
const { json } = require('body-parser');
// const API_KEY = 'f582bd87-1ccb-4f27-ad72-61900e1408d6' // from https://battlefieldtracker.com/site-api


app.get('/', function(req, res) {
    r6.getGenericStats('BlazingBane', 'pc', 'all').then(userStats => {
        rdata = userStats
        global.r = rdata
    })
    r6.getOperatorStats('BlazingBane', 'pc').then(userStats => {
        var rdata = userStats
        global.r1 = rdata
            // JSON.stringify
    })
    apex.user('BlazingBane', 'PC').then(data => {
        console.log(data.data.children[18])

        var aap = data.data
        global.ap = aap
    });
    if (typeof ap != 'undefined' && typeof r != 'undefined' && typeof r1 != 'undefined')
        res.render('index', { r, r1, ap });
    else {
        res.send("refresh the site")
    }
});
app.listen(process.env.PORT || 5000)