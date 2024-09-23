import React, { useState, useEffect } from "react";
import axiosInstance from "./axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t._id === id);
    await axiosInstance.patch(`/${id}`, { completed: !todo.completed });
    fetchTodos();
  };

  const fetchTodos = async () => {
    const response = await axiosInstance.get("/");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (title) {
      await axiosInstance.post("/", { title });
      setTitle("");
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    await axiosInstance.delete(`/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const thStyle = {
    padding: "10px",
    fontSize: "18px",
    border: "0.5px solid black",
  };

  const tdStyle = {
    padding: "10px",
    border: "0.5px solid gray",
  };

  return (
    <div
      style={{
        padding: "20px",
        minWidth: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <h1>To-Do List</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <input
          type="text"
          style={{ padding: "8px", fontSize: "14px" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <table
        style={{
          width: "100%",
          marginTop: "30px",
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Completed</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {todos && todos.length > 0
            ? todos?.map((todo) => (
                <tr key={todo._id}>
                  <td
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      ...tdStyle,
                    }}
                  >
                    {todo.title}
                  </td>
                  <td style={tdStyle}>
                    <input
                      style={{ width: "20px", height: "20px" }}
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo._id)}
                    />
                  </td>
                  <td style={tdStyle}>
                    <button
                      style={{ fontSize: "16px" }}
                      onClick={() => deleteTodo(todo._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : <></>}
        </tbody>
      </table>
    </div>
  );
};

export default App;
