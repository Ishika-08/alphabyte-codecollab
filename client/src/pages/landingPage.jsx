import Navbar from "../components/LandingPage/Navbar";
import Contact from "../components/LandingPage/contact";
import Footer from "../components/LandingPage/footer";
import Hero from "../components/LandingPage/hero";
import Features from "../components/LandingPage/features";

export default function LandingPage() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Features/>
            <Contact />
            <Footer />
        </div>
    );
}