import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export default function SignInForm() {
    const [error, setError] = useState("");
    
    const handleSignIn = async (event) => {
        event.preventDefault();
        setError("");

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Successfully signed in
            event.target.reset();
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/user-disabled':
                    setError('This account has been disabled');
                    break;
                case 'auth/user-not-found':
                    setError('No account found with this email');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password');
                    break;
                default:
                    setError('Failed to sign in');
            }
            console.error("Sign in error:", error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
            <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Email address"
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}
                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}