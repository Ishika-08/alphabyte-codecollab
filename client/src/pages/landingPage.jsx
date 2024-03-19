import Navbar from "../components/landingpage/Navbar";
import Contact from "../components/landingpage/contact";
import Footer from "../components/landingpage/footer";
import Hero from "../components/landingpage/hero";
import Features from "../components/landingpage/features";

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