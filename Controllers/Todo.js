const Todo = require("../Model/crud");

const createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            name: req.body.name,
            img: req.body.img,
            summary: req.body.summary
        });
        const savedTodo = await todo.save();
        return res.status(200).send(savedTodo);
    } catch (err) {
        return res.status(500).send(err);
    }
 };


 const getTodos = async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  const deleteTodo = async (req, res) => {
    try {
      await Todo.deleteOne({ _id: req.params.todoID });
      res.status(200).json({ message: "Todo Deleted" });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const updateTodo = async (req, res) => {
    try {
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: req.params.todoID },
        {
          $set: {
            name: req.body.name,
            img: req.body.img,
            summary: req.body.summary,
          },
        },
        { new: true }
      );
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  

  module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
  