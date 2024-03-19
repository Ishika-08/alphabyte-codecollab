import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
    const navigate = useNavigate();

    const handleSchedule = () => {
        navigate("/interviewer-form");
    }

    const handleCreate = () => {
        navigate("/room");
    }

    return (
        <div>
            <Navbar />
            <div className="flex  p-10">
                <div className="mt-[15%] ml-[10%]  w-[35%] text-center">
                    <h1 className="text-5xl mb-5 text-gray-800"><b><span style={{ color: 'green' }}>Unlock</span> Your Interview</b></h1>

                    <p className="text-gray-500">Unlock a world of potential with us. Showcase your talents,  grow professionally, and make your career aspirations a reality.</p>
                </div>


                <div className="mt-[10%] ml-[10%] w-[35%] grid grid-col-1 p-1  ">
                    <div className="p-2 border-1 rounded-2xl  mr-[25%] bg-sky-500/[.08] shadow-lg h-[95%] ">
                        <h1 className="text-xl text-gray-800"><b>Schedule New Interview</b></h1>
                        <p className="text-gray-500">
                            Join us in shaping the future of your career. Let's schedule your next interview and take the next step towards finding your perfect fit.</p>
                        <button className="bg-green-500/[.8] text-white p-1 ml-[80%] mb-[1.5%] rounded-md my-[3%]" onClick={handleSchedule}>Schedule</button>

                    </div>

                    <div className="p-2 border-1 rounded-2xl bg-sky-500/[.08] ml-[20%] shadow-lg h-[95%] ">
                        <h1 className="text-xl text-gray-800"><b>Today's Interview</b></h1>
                        <p className="text-gray-500">
                            Today's packed with potential! Join us as we pave the way for great matches in talent and opportunity.</p>
                        <button className="bg-green-500/[.8] text-white  ml-[85%] p-[1%] rounded-md my-[2%]">Arrivals</button>

                    </div>

                    <div className="p-2 border-1 rounded-2xl  mr-[25%] bg-sky-500/[.08] shadow-lg h-[95%] ">
                        <h1 className="text-xl text-gray-800"><b>Start An Instant Meet</b></h1>
                        <p className="text-gray-500">
                            Meet your match: where hiring great candidates meets great goods.</p>
                        <button className="bg-green-500/[.8] text-white p-1 ml-[80%] mb-[1.5%] rounded-md my-[3%]"
                        onClick={handleCreate}>Create</button>

                    </div>
                </div>
            </div>
        </div>
    );
}