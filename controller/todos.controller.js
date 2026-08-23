import Todo from "../model/todos.model.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    const todo = await Todo.create({
      title,
      description,
    });

    return res
      .status(201)
      .json({ success: true, message: "Todo created successfully", todo });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTodos = async (req, res) => {
  try {
    const { search, sort, page = 1, limit = 10 } = req;

    let query = {};

    // search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    // sorting
    let sortOption = {};
    if (sort === "asc") sortOption.createdAt = 1;
    else sortOption.createdAt = -1;

    // pagination
    const skip = (page - 1) * limit;
    const todos = await Todo.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    // if (!mongoose.Types.ObjectId(id)) {
    //   return res.status(400).json({ success: false, message: "Invalid Id" });
    // }
    const todo = await Todo.findById(id);

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todo,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Title not found" });
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true },
    );

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todo,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Todo Id not found" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todo,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Todo Id not found" });
    }

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: todo,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
