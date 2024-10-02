import { doesNotMatch } from 'assert';
import express, {Request, Response } from 'express';
import mysql from "mysql"

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json())

const PORT = 3000;

app.get('/details/:id', (req: Request, res: Response) => {
    
    var pool = mysql.createPool({
        host        : "127.0.0.1",
        user        : "root",
        port        :  3306,   
        password     : "",
        database      : "mydata",
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
        conn.query("SELECT * FROM actorsdetails WHERE id = ?", [req.params.id], function (err: any, rows : any) {
            if(err) {
                console.log("err", err);
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