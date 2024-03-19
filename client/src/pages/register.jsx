
import { useState } from "react";
import {auth} from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";

import Navbar from "../components/landingpage/Navbar";


export default function Register() {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {  
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        console.log(input)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, input.email, input.password)
        .then((userCredential) => {
           console.log(userCredential);
            navigate("/dashboard");
        }).catch((error) => {
            console.log(error)
        });

        console.log(input);
    }

    return (
        <div>
            <Navbar />
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-green-600 sm:text-3xl">Welcome back</h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Ready to step into the coding arena? Log in to CodeCollab and let your skills shine in your next interview!
                    </p>

                    <form
                        action="#"
                        className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                        onSubmit={handleSubmit}
                    >
                        <p className="text-center text-lg font-medium">
                            Register to your account
                        </p>

                        <div>
                            <label htmlFor="Name" className="sr-only">
                                Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full rounded-lg border p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Name"
                                    onChange={(e) => {handleInputChange(e)}}
                                />

                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full rounded-lg border p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                    onChange={(e) => {handleInputChange(e)}}
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full rounded-lg border p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                    name="password"
                                    onChange={(e) => {handleInputChange(e)}}
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                            </div>

                        </div>



                        {/* Always show the "Sign Up" button */}
                        <div>
                            <button
                                type="submit"
                                className="block w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white"
                            >
                                Register

                            </button>

                        </div>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <a className="underline" href="/sign-up">Log in</a>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    );
}