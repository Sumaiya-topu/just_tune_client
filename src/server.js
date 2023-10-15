const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 8000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Define a custom POST route for creating new items
server.post("/posts", (req, res) => {
  const db = router.db; // Access the database
  const post = req.body; // Get the new item from the request body
  db.get("posts").push(post).write(); // Add the new item to the database

  res.status(201).json(post); // Respond with the newly created item
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
