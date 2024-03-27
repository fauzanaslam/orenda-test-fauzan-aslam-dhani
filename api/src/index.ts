import express, { Request, Response } from "express";
import "dotenv/config";
import router from "./routes/Routes";

const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    response: "Express TypeScript",
  });
});

app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `${process.env.APP_NAME} running on port ${process.env.APP_PORT}`
  );
});
