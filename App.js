const bodyParser = require("body-parser");
const express=require("express");
var path=require("path");
const port=4000;
const mysql=require("./Connection").con;

const app=express();

// app.set('view engines','hbs');
// app.set('views','./view');
// app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'hbs');


app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{

    console.log("In the index section for the web page");

     res.render("index");

});

app.get("/search", (req, res) => {
    res.render("search")

});



// app.get("/add",(req,resp)=>{
//     resp.render("add");
// })




app.get("/view", (req, res) => {
    let qry = "select * from player ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("view", { data: results });
        }

    });

});


app.get("/searchplayer", (req, res) => {
    


    const { player_id } = req.query;

    let qry = "select * from player where player_id=?";
    mysql.query(qry, [player_id], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false, data:results });
            } else {

                res.render("search", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server is running at port %d:", port);
});