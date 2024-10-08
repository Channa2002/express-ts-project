import { Router, Request, Response } from "express";
import mysql from "mysql";
import bcrypt from "bcrypt";
// import * as bcrypt from 'bcrypt';

const usersRouter = Router();

usersRouter.get("/", (request : Request, response : Response ) => {
    return response.json("ok") as any;
});

usersRouter.get('/details/:id', (req: Request, res: Response) => {
    
    var pool = mysql.createPool({
        host        : process.env.HOST,
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
});

usersRouter.post("/register", (req: Request, res: Response) => {
    
    var pool = mysql.createPool({
        host        : process.env.HOST,
        user        : "root",
        port        :  3306,   
        password     : "",
        database      : "details",
        connectionLimit    : 10,
        multipleStatements : true
    });

    pool.getConnection(function (err: any, conn : any) {

        if(err) 
        {
            console.log("entered into error")
            console.log(err)
            res.send({
                success : false,
                statusCode: 500,
                message: "getting error during the connection"
            })
             return;
        }

         const saltround = 10;
       
        bcrypt.hash(req.body.password,saltround, (error : any, hash: string) =>{
            if(error) {
                res.send({
                    success : false,
                    statusCode: 500,
                    message: "getting error during the connection"
                })

                return;
              } else {
            let sqlQuery = "call registeruser(?, ?)";
    
            conn.query(sqlQuery, [req.body.email, hash], function(err : any, rows: any) {
                if(err) {
                    conn.release();
                    return res.send({
                        success: false,
                        statusCode: 400,
                    });
                }
    
                res.send({
                    message: "success",
                    statusCode: 200,
                });
                conn.release();
            })
              }
        })
    })

});

export default usersRouter;