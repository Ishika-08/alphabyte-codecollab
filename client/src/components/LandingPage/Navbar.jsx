import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    const handleLogin = () => {
        navigate("/login")
    }

    const handleSignIn = () => {
        navigate("/register")
    }

    return (
        <div className="">
            <header className=" bg-gray-800">

                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-1 md:flex md:items-center md:gap-12">
                            <div style={{ margin: "-40px 0px 0px 0px", height: "1.5vh", width: "90px" }}>

                            </div>
                            <a className="block text-indigo-500" href="#">
                                <span className="sr-only">Home</span>
                                <svg
                                    className="h-8"
                                    viewBox="0 0 28 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >

                                </svg>
                            </a>
                        </div>

                        <div className="md:flex md:items-center md:gap-12">
                            <nav aria-label="Global" className="hidden md:block">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <a
                                            className="text-white transition hover:text-gray-100/75"
                                            href="/about"
                                        >
                                            {" "}
                                            About{" "}
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                            <div className="flex items-center gap-4">
                                <div className="sm:flex sm:gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleLogin()}
                                        className="hidden px-6 py-2 font-semibold rounded lg:block text-gray-50 bg-green-600">
                                        Log In
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSignIn()}
                                        className="hidden px-6 py-2 font-semibold rounded lg:block text-gray-50 bg-green-600">
                                        Register
                                    </button>
                                </div>

                                <div className="block md:hidden">
                                    <button className="rounded bg-green-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
