import React, { useContext, useState } from "react";
import { context } from "../App"; 
import { FaNewspaper } from "react-icons/fa";

export default function TodoList() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete } = useContext(context);
  const [newTodo, setNewTodo] = useState("");
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [editedValue, setEditedValue] = useState(""); // State to hold edited value

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleTodoAdded = () => {
    if (newTodo.trim()) {
      addTodo({
        id: Date.now(),
        todomsg: newTodo,
        isCompleted: false,
      });
      setNewTodo("");
    }
  };

  const editTodo = (todo) => {
    // Update the specific todo using its data
    updateTodo(todo.id, { ...todo, todomsg: editedValue });
    setIsTodoEditable(false);
    setEditedValue(""); // Reset editedValue after update
  };

  const handleTodoChange = (e) => {
    setEditedValue(e.target.value);
  };

  return (
    <div>
      <h1 className="heading">Todo List <FaNewspaper className="notes"/></h1>
      <input
        className="todo-Add"
        type="text"
        placeholder="Add your work ...."
        value={newTodo}
        onChange={handleNewTodoChange}
      />
      <button onClick={handleTodoAdded}>ADD TODO</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.isCompleted ? "completed-todo" : "not-completed-todo"}>
            <input
              type="text"
              className="todo-input"
              value={isTodoEditable ? editedValue : todo.todomsg}
              readOnly={!isTodoEditable}
              onChange={handleTodoChange}
            />
            <button onClick={() => toggleComplete(todo.id)}>
              {todo.isCompleted ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button
              onClick={() => {
                if (todo.isCompleted) return;
                if (isTodoEditable) {
                  editTodo(todo);
                } else setIsTodoEditable(true);
              }}
              disabled={todo.isCompleted}
            >
              {isTodoEditable ? "Save" : "Edit"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
