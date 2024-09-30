"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const PORT = 3000;
app.get('/Id/:id/Name/:name', (req, res) => {
    res.send({
        message: "hello world",
        id: req.params.id,
        name: req.params.name
    });
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
