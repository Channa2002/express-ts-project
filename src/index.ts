import express, { query, Request, Response } from 'express';
import mysql2 from "mysql2"

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json())

const PORT = 3000;

app.get('/details/:id', (req: Request, res: Response) => {
    
    var pool = mysql2.createPool({
        host        : "127.0.0.1",
        user        : "root",
        password     : " ",
        database      : "Myconnection",
        connectionLimit    : 10,
        multipleStatements : true
    })



    pool.getConnection(function (err: any, conn : any) {
        if(err) {
            console.log("entered into error");
            console.log(err)
            res.send({
                success: false,
                statusCode: 500,
                message:"getting error during the connection"
            });

            return;
        }
        console.log(`the id: ` + req.params.id);
        conn.query("SELECT * FROM mydata.actorsdetails_id = ?", [req.params.id], function (err: any, rows : any) {
            if(err) {
              conn.release();
              return res.send ({
                  success: false,
                  statusCode: 400
              });
            }
  
            res.send({
                message: "succces",
                statusCode: 200,
               data : rows
            });
  
            conn.release();
      })
    })
    
    // res.send({
    //     message: "hello world",
    //     id: req.params.id,
    //     name: req.params.name
    // });
})

app.post("/Id/:id/Name/:name", (req: Request, res: Response) => {
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name
        }
    })
})

app.listen(PORT, () => {
    console.log(`${PORT}`);
});