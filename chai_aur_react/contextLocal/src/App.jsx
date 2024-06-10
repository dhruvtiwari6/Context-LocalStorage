// App.js
import React, { useState , useEffect} from "react";
import { createContext } from "react";
import TodoList from "./component/TodoList";


export const context = createContext({
    todos: [],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
});

function App() {
    const [todos, setTodos] = useState([]);


    useEffect(() => {
      const todos = JSON.parse(localStorage.getItem("todos"));

  
      if (todos && todos.length > 0) {
        setTodos(todos)
      }
    }, [])
  
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])



    const addTodo = (newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const updateTodo = (id, updateTodo) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
        );
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        );
    };

    return (
        <>
            <context.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
                <TodoList />
            </context.Provider>
        </>
    );
}

export default App;
