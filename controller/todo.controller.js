export const todoPage = async (req, res) => {
  try {
    const todo = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await todo.json();
    res.render("todo", data);
  } catch (err) {
    res.status(400).json({ success: false, message: "not found" });
  }
};
