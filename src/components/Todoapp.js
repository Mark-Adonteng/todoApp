import React, { useState } from 'react';
import "./todoapp.css"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const TodoApp = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, text: 'Complete the online JavaScript course', completed: false },
    { id: 2, text: '10 minutes meditation', completed: false },
    { id: 3, text: 'Read for 1 hour', completed: false },
    { id: 4, text: 'Pick up groceries', completed: false },
    { id: 5, text: 'Complete Todo App on Frontend Mentor', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const handleToggleTodo = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(updatedTodoList);
  };

  const handleAddTodo = (e) => {
    if (e.key === 'Enter' && newTodo.trim() !== '') {
      const newTodoItem = {
        id: todoList.length + 1,
        text: newTodo,
        completed: false,
      };
      setTodoList([...todoList, newTodoItem]);
      setNewTodo('');

    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodoList(items);
  };

  const showAll = () => {
    setTodoList([
      ...todoList
    ]);
  };

  const showActive = () => {
    const activeTodos = todoList.filter((todo) => !todo.completed);
    setTodoList(activeTodos);
  };


  const showCompleted = () => {
    const completedTodos = todoList.filter((todo) => todo.completed);
    setTodoList(completedTodos);
  };

  const handleClearCompleted = () => {
    const updatedTodoList = todoList.filter((todo) => !todo.completed);
    setTodoList(updatedTodoList);
  };
  return (
    <div>
      <div className="mainContainer">
        <div className="title">
          <div className="todo">TODO</div>
          <div className="toggle">
            <img src="images/icon-moon.svg" alt="" />
          </div>
        </div>
        <div className="addNote">
          <div className="NcheckBtn">
            <img src="images/icon-check.svg" alt="" />
          </div>

          
          <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleAddTodo}
          className="inputForNewNote" />
        </div>
        <div className="displayNotes">
          {todoList.map((todo) => (
            <div className="listItem" key={todo.id} draggable="true">
              <div
                className={`checkBtn ${todo.completed ? 'activeCheckBox' : ''}`}
                onClick={() => handleToggleTodo(todo.id)}
              >
                <img src="images/icon-check.svg" alt="" />
              </div>
              <div className={`noteOutput ${todo.completed ? 'active' : ''}`}>{todo.text}</div>
            </div>
          ))}
        </div>
        <div className="actionBtns">
          <div className="itemsLeft hide-on-mobile">
            {`${todoList.filter((todo) => !todo.completed).length} item(s) left`}
          </div>
          
          <div className="filterBtns">
            <div className="All mx-2"onClick={showAll}>All
            
            </div>
            <div className="Active mx-2"onClick={showActive}>Active
          
            </div>
            <div className="Completed mx-2" onClick={showCompleted}>Completed
            {/* <button onClick={showCompleted}>Completed</button> */}
            </div>
          </div>
          <div className="clear hide-on-mobile" onClick={handleClearCompleted}>Clear Completed
          {/* <button  onClick={handleClearCompleted}>Clear Completed</button> */}
          </div>
         
        </div>
        <div className="notify">drag and drop to reorder the list</div>
      </div>
    </div>
  );
};

export default TodoApp;
