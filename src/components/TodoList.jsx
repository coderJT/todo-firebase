import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../TodoContext";

export default function TodoList() {
    const { todos, toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);

    const handleCompleted = async (id) => {
       await toggleTodo(id);
    }

    const handleDelete = async (id) => {
        await deleteTodo(id);
    }   

    const handleEdit = async (id, name, description) => {
       await editTodo({ id, name, description });
    }

    return (
        <ul>
            {todos && todos.length > 0 && todos.map((todo) => (
                <li key={todo.id}>
                    <TodoItem 
                        name={todo.name} 
                        description={todo.description} 
                        completed={todo.completed} 
                        id={todo.id} 
                        onCompleted={handleCompleted} 
                        onDelete={handleDelete} 
                        onEdit={handleEdit} 
                    />
                </li>
            ))}
        </ul>
    )
}