import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function SignUpForm() {
    const [error, setError] = useState("");

    const handleSignUp = async (event) => {
        event.preventDefault();
        setError("");

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            event.target.reset();
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('Email already registered');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/weak-password':
                    setError('Password should be at least 6 characters');
                    break;
                default:
                    setError('Failed to create account');
            }
            console.error("Sign up error:", error);
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
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
                    Sign Up
                </button>
            </form>
        </div>
    );
}