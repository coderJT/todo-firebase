import './App.css'
import TaskList from './components/TodoList'
import { useContext, useState, useEffect } from 'react';
import { TodoContext } from './TodoContext';
import { auth } from './firebase';
import SignInForm from './components/SignIn';
import SignUpForm from './components/SignUp';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const { addTodo } = useContext(TodoContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    })

    return () => unsubscribe();
  })

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          {showSignUp ? <SignUpForm /> : <SignInForm />}
          <div className="text-center mt-4">
            <button
              onClick={() => setShowSignUp(!showSignUp)}
              className="text-blue-500 hover:text-blue-700"
            >
              {showSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center align-center w-screen h-screen">  
      <div className="flex justify-center flex-col items-center w-full h-screen px-10 pt-10 md:px-20 md:pt-20">
      <div className="w-full flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Todo List</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
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
