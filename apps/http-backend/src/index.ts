import express from "express";
import userRouter from "./routes/User";
import todoRouter from "./routes/Todo";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(todoRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
