import React from 'react'

export default function contact() {
    return (

        <section className="py-6 bg-gray-200/[.60] ">
            <div className="grid max-w-6xl grid-cols-1  mx-auto lg:px-8   md:grid-cols-2 md:divide-x">
                <div className="mt-[35px] md:py-0  md:px-6">
                    <h1 className="text-4xl font-bold">Get in touch</h1>
                    <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
                    <div className="space-y-4">
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Fake address, 9999 City</span>
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                            </svg>
                            <span>123456789</span>
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                            <span>contact@business.com</span>
                        </p>
                    </div>
                </div>


                <form
                    action="#"
                    className="mb-0 mt-0 space-y-4 rounded-lg border-none  sm:p-1 lg:p-2"

                >
                    <div>
                        <label htmlFor="Name" className="sr-only">

                        </label><p className='ml-2'>Name</p>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full rounded-lg border p-4 pe-12 text-sm border-2"
                                placeholder="Enter Name"
                            />

                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">

                        </label><p className='ml-2'>Email</p>
                        <div className="relative">
                            <input
                                type="email"
                                className="w-full rounded-lg border p-4 pe-12 text-sm border-2"
                                placeholder="Enter email"

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
                        <label htmlFor="password" className="sr-only">

                        </label><p className='ml-2'>Message</p>
                        <div className="relative">
                            <textarea
                                type="text"
                                className="w-full rounded-lg border p-4 pe-12 text-sm border-2"
                                placeholder="Query"
                                rows={4}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                    </div>



                    {/* Always show the "Sign Up" button */}
                    <div>
                        <button
                            type="submit"
                            className="block w-sm rounded-2xl bg-green-600 ml-[45%] px-5 py-3 text-sm font-medium text-white"
                        >
                            Submit

                        </button>

                    </div>


                </form>
            </div>
        </section>
    )
}
