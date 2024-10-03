"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { doesNotMatch } from 'assert';
const express_1 = __importDefault(require("express"));
// import mysql from "mysql";
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(routes_1.default);
// const PORT = 3000;
// app.get('/details/:id', (req: Request, res: Response) => {
//     var pool = mysql.createPool({
//         host        : process.env.HOST,
//         user        : "root",
//         port        :  3306,   
//         password     : "",
//         database      : "mydata",
//         connectionLimit    : 10,
//         multipleStatements : true
//     })
//     pool.getConnection(function (err: any, conn : any) {
//         if(err) {
//             console.log("entered into error");
//             console.log(err)
//             res.send({
//                 success: false,
//                 statusCode: 500,
//                 message:"getting error during the connection"
//             });
//             return;
//         }
//         console.log(`the id: ` + req.params.id);
//         conn.query("SELECT * FROM actorsdetails WHERE id = ?", [req.params.id], function (err: any, rows : any) {
//             if(err) {
//                 console.log("err", err);
//               conn.release();
//               return res.send ({
//                   success: false,
//                   statusCode: 400
//               });
//             }
//             res.send({
//                 message: "succces",
//                 statusCode: 200,
//                data : rows
//             });
//             conn.release();
//       })
//     })
// res.send({
//     message: "hello world",
//     id: req.params.id,
//     name: req.params.name
//     // });
// })
// app.post("/register", (req: Request, res: Response) => {
//     var pool = mysql.createPool({
//         host        : process.env.HOST,
//         user        : "root",
//         port        :  3306,   
//         password     : "",
//         database      : "details",
//         connectionLimit    : 10,
//         multipleStatements : true
//     });
//     pool.getConnection(function (err: any, conn : any) {
//         if(err) 
//         {
//             console.log("entered into error")
//             console.log(err)
//             res.send({
//                 success : false,
//                 statusCode: 500,
//                 message: "getting error during the connection"
//             })
//              return;
//         }
//         console.log("line 91")
//             console.log(req.body)
//         let sqlQuery = "call registeruser(?, ?)";
//         conn.query(sqlQuery, [req.body.email, req.body.password], function(err : any, rows: any) {
//             if(err) {
//                 conn.release();
//                 return res.send({
//                     success: false,
//                     statusCode: 400,
//                 });
//             }
//             console.log("line 100")
//             console.log(req.body)
//             res.send({
//                 message: "success",
//                 statusCode: 200,
//             });
//             conn.release();
//         })
//     })
// })
app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT}`);
});
