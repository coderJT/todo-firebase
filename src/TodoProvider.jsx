import { TodoContext } from "./TodoContext";
import { useReducer, useEffect } from "react";
import { 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from "firebase/firestore";
import { db } from "./firebase";
import PropTypes from 'prop-types';

const initialState = {
  todos: [], 
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };

    case "ADD":
      return { ...state, todos: [...state.todos, action.payload] };

    case "EDIT":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, name: action.payload.name, description: action.payload.description }
            : todo
        ),
      };

    case "DELETE":
      return { 
        ...state, 
        todos: state.todos.filter((todo) => todo.id !== action.payload) 
      };

    case "TOGGLE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const todosRef = collection(db, "todos");

  useEffect(() => {
    const q = query(todosRef, orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch({ type: "SET_TODOS", payload: todos });
    }, (error) => {
      console.error("Error listening to todos:", error);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async (todo) => {
    try {
      const todoData = {
        name: todo.name,
        description: todo.description,
        completed: false,
        createdAt: new Date().toISOString()
      };
      
      await addDoc(todosRef, todoData);
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  };

  const editTodo = async (todo) => {
    try {
      const todoDoc = doc(todosRef, todo.id);
      await updateDoc(todoDoc, {
        name: todo.name,
        description: todo.description,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error editing todo:", error);
      throw error;
    }
  };

  const deleteTodo = async (id) => {
    try {
      const todoDoc = doc(todosRef, id);
      await deleteDoc(todoDoc);
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoDoc = doc(todosRef, id);
      const todo = state.todos.find(t => t.id === id);
      await updateDoc(todoDoc, {
        completed: !todo.completed,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error toggling todo:", error);
      throw error;
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        editTodo,
        deleteTodo,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default TodoProvider;
