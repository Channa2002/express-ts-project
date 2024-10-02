"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const PORT = 3000;
app.get('/details/:id', (req, res) => {
    var pool = mysql2_1.default.createPool({
        host: "127.0.0.1",
        user: "root",
        password: " ",
        database: "Myconnection",
        connectionLimit: 10,
        multipleStatements: true
    });
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log("entered into error");
            console.log(err);
            res.send({
                success: false,
                statusCode: 500,
                message: "getting error during the connection"
            });
            return;
        }
        console.log(`the id: ` + req.params.id);
        conn.query("SELECT * FROM mydata.actorsdetails_id = ?", [req.params.id], function (err, rows) {
            if (err) {
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400
                });
            }
            res.send({
                message: "succces",
                statusCode: 200,
                data: rows
            });
            conn.release();
        });
    });
    // res.send({
    //     message: "hello world",
    //     id: req.params.id,
    //     name: req.params.name
    // });
});
app.post("/Id/:id/Name/:name", (req, res) => {
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name
        }
    });
});
app.listen(PORT, () => {
    console.log(`${PORT}`);
});
