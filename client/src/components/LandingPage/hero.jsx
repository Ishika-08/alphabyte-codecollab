

export default function hero() {
    // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (

        < section
            className="relative h-[640px] bg-green-200/[.25] "
        >
            <div
                className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
            ></div>

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
            >
                <div className="max-w-xl mt-[-150px]   ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl w-[120%] text-center font-extrabold sm:text-5xl">
                        Empowering Efficiency, Enhancing Connections

                        <strong className="block font-extrabold text-green-700"> Forever Home. </strong>
                    </h1>

                    <p className="mt-4 max-w-lg sm:text-xl/relaxed text-center">
                        Streamlined scheduling, automated communication, real-time coding assessment, customizable templates, and seamless integration.
                    </p>

                    <div className="mt-8 ml-6 flex flex-wrap gap-4 text-center">
                        <a
                            href="/register"
                            className="block w-full rounded bg-green-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
                        >
                            Get Started
                        </a>

                        <a
                            href="/about"
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-green-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                        >
                            Learn More
                        </a>
                    </div>
                </div>

                    
                <div >
                    <img className=" h-[50%]  w-[70%] rounded-3xl shadow-lg  ml-[43%] " src="public\images\interview.jpg" alt="interview-img" />
                </div>
            </div>
        </section>

    );
}
