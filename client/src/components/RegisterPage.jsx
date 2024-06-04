import "./bootstrap.css";
import Logo from "./Logo";
import Register from "./Register";
import CarouselArticles from "./CarouselArticles";

function RegisterPage() {
    return (
        <div>
            <div className="article-container vstack" style={{ height: "50vh" }}>
                <div className="article">
                    <Logo />
                </div>
                <div className="vstack" style={{ background: "#1895D7" }}>
                    <Register />
                </div>
            </div>
            <CarouselArticles />
        </div>
    );
}

export default RegisterPage;
