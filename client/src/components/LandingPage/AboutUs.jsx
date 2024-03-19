
import React from 'react'
import Navbar from "./Navbar"
import { Link } from 'react-router-dom'

export default function AboutUs() {
    return (
        <section className="bg-white text-gray-600">
            <Navbar />
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="mx-auto  text-center">
                    <h2 className="text-3xl  font-bold sm:text-4xl">Empowering Efficiency, Enhancing Connections</h2>

                    <p className="mt-10 mx-auto text-lg max-w-md text-gray-550">
                        Streamlined scheduling, automated communication, real-time coding assessment, customizable templates, and seamless integration.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <p
                        className="block rounded-xl  p-8 shadow-md transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                        href="#"
                    >
                        <img src="https://res.cloudinary.com/dx7uxfrne/image/upload/v1708870761/assets/leadership_vrjqsq.png" alt="img" />

                        <h2 className="mt-4 text-xl font-bold text-black">Our Mission</h2>

                        <p className="mt-1  text-sm text-gray-600">
                            Our interview platform signifies a transformative approach to interviews, delivering unmatched convenience, transparency, and security. We are committed to empowering companies to conduct more effective and efficient interviews, fostering better hiring decisions and long-term success.
                        </p>
                    </p>

                    <p
                        className="block rounded-xl  p-8 shadow-md transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                        href="#"
                    >
                        <img src="https://res.cloudinary.com/dx7uxfrne/image/upload/v1708870766/assets/opportunity_n2dzwz.png" alt="img" />

                        <h2 className="mt-4 text-xl font-bold text-black">Our Vision</h2>

                        <p className="mt-1 text-sm text-gray-600">
                            To revolutionize hiring by reducing time-to-hire, improving candidate experience, and setting a new industry standard for recruitment efficiency with our innovative interview platform.
                        </p>
                    </p>

                    <p
                        className="block rounded-xl  p-8 shadow-md transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                        href="#"
                    >
                        <img src="https://res.cloudinary.com/dx7uxfrne/image/upload/v1708870760/assets/key-performance-indicator_leqghi.png" alt="img" />

                        <h2 className="mt-4 text-xl font-bold text-black">Effortless Scheduling</h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Our platform streamlines the interview scheduling process, empowering recruiters to efficiently schedule multiple interviews simultaneously. Simply upload Excel files with candidate data to get started.
                        </p>
                    </p>

                    <p
                        className="block rounded-xl  p-8 shadow-md transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                        href="#"
                    >
                        <img src="https://res.cloudinary.com/dx7uxfrne/image/upload/v1708870761/assets/heart_dkg2zs.png" alt="img" />

                        <h2 className="mt-4 text-xl font-bold text-black">Real-Time Coding Assessment</h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Our platform revolutionizes the interview process by offering a built-in compiler. Candidates can demonstrate their coding skills directly on-screen, while recruiters can observe and edit the code in real-time, fostering collaboration and enhancing assessment efficiency.
                        </p>
                    </p>

                    <p
                        className="block rounded-xl  p-8 shadow-md transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                        href="#"
                    >
                        <img src="https://res.cloudinary.com/dx7uxfrne/image/upload/v1708870768/assets/visibility_kx9pdl.png" alt="img" />

                        <h2 className="mt-4 text-xl font-bold text-black">Seamless Integration</h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Our platform effortlessly integrates with leading HR management systems, providing recruiters with centralized access to candidate data and interview insights, streamlining the recruitment process.
                        </p>
                    </p>

                    <p
                        className="block rounded-xl  p-8 shadow-md transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                        href="#"
                    >
                        <img src="https://res.cloudinary.com/dx7uxfrne/image/upload/v1708870767/assets/social-care_x2pqir.png" alt="img" />

                        <h2 className="mt-4 text-xl font-bold text-black">Seamless Support</h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Providing unparalleled assistance and guidance to ensure a smooth user experience.
                        </p>
                    </p>
                </div>

                <div className="mt-12 text-center">
                    <Link to={"/register"}><p

                        className="inline-block rounded bg-green-600 px-12 py-3 text-md font-medium text-white transition hover:bg-green-800 focus:outline-none focus:ring focus:ring-yellow-400"
                    >
                        Get Started Today
                    </p></Link>
                </div>
            </div>
            <footer class="w-full relative bg-green-600 text-white text-center py-4">
                <p className='text-lg text-center  '>Alpha-byte@2024</p>
            </footer>
        </section>

    )
}
