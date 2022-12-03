import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const corsOptions = {
	origin: "http://localhost:3000",
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));

interface Todo {
	name: string;
	id: string;
}
const Todos: Todo[] = [];

app.get("/", (_req, res) => {
	res.send({ message: "Hello. The application is working perfectly" });
});

app.get("/todos", (_req, res) => {
	res.send(Todos);
});

app.post("/todos", (req, res) => {
	if (req.body.name) {
		const newTodo: Todo = { name: req.body.name, id: uuidv4() };
		Todos.push(newTodo);
		res.send(newTodo);
	} else res.send({ error: "name not provided" });
});

const port = 5000;
app.listen(port, () => console.log(`app started on port ${port}`));
