import express, { Request, Response } from 'express'

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json())

const PORT = 3000;

app.get('/Id/:id/Name/:name', (req: Request, res: Response) => {
    res.send({
        message: "hello world",
        id: req.params.id,
        name: req.params.name
    });
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