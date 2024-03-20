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

                <div class="grid grid-cols-1 grid-rows-2 gap-y-4 w-[500px] mx-[200px] mt-[100px]">
                <div class="bg-gray-200 p-4 h-[200px] rounded-lg">
                <h1 className="text-xl text-gray-800"><b>Schedule New Interview</b></h1>
                <p className="text-gray-500">
                    Join us in shaping the future of your career. Let's schedule your next interview and take the next step towards finding your perfect fit.</p>
                    <button className="bg-green-500/[.8] text-white p-4 ml-[70%] mb-[1.5%] rounded-md my-[3%] text-lg font-semibold"
                            onClick={handleSchedule}>
                    Schedule
                    </button>

                </div>

                <div class="bg-gray-200 p-4 rounded-lg">
                <h1 className="text-xl text-gray-800"><b>Start An Instant Meet</b></h1>
                <p className="text-gray-500">
                    Meet your match: where hiring great candidates meets great goods.</p>
                    <button className="bg-green-500/[.8] text-white p-4 ml-[70%] mb-[1.5%] rounded-md my-[3%] text-lg font-semibold"
                            onClick={handleCreate}>
                    Create
                    </button>
                </div>
                </div>             
            </div>
        </div>
    );
}

