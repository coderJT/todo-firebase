import './App.css'
import TaskList from './components/TodoList'
import { useContext } from 'react';
import { TodoContext } from './TodoContext';

function App() {
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = {
      name: e.target[0].value,
      description: e.target[1].value,
      completed: false
    };
    
    try {
      await addTodo(newTodo);
      e.target.reset();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  return (
    <div className="flex justify-center align-center w-screen h-screen">  
      <div className="flex justify-center flex-col items-center w-full h-screen px-10 pt-10 md:px-20 md:pt-20">
        <h1 className="text-4xl mt-3 font-semibold">Todo List</h1>
        <div className="w-full flex-1 bg-slate-200 mt-5 p-10 overflow-y-scroll scroll-smooth rounded-t-2xl">
          <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
            <input type="text" required className="block p-2 bg-transparent border-2 border-slate-300 rounded focus:bg-slate-300" placeholder="Task Name"></input>
            <input type="text" required className="block p-2 bg-transparent border-2 border-slate-300 rounded focus:bg-slate-300" placeholder="Task Description"></input>
            <button type="submit" className="py-2 px-2 rounded-lg text-white font-medium bg-blue-500 hover:bg-blue-700">Create new Todo</button>
          </form>
          <TaskList />
        </div>
      </div>
    </div>
  )
}

export default App
