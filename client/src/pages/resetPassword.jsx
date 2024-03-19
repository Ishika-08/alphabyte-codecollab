import { useState } from "react";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    return (
        <div>

            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-green-600 sm:text-3xl">Reset Password</h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.
                    </p>

                    <form
                        action="#"
                        className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                        onSubmit={handleSubmit}
                    >

                        <div>
                            <label htmlFor="email" className="sr-only"></label>
                            <p className="text-green-800 my-2 text-md">Your Email</p>
                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border p-4 pe-12 text-sm shadow-sm"
                                    placeholder="name@gamil.com"

                                    onChange={(e) => setEmail(e.target.value)}
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
                            <button
                                type="submit"
                                className="block w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white"
                            >
                                Reset Password

                            </button>

                        </div>


                    </form>
                </div>
            </div>

        </div>
    );
}