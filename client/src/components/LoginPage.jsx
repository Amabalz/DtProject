import "./bootstrap.css";
import Logo from "./Logo";
import Login from "./Login";
import CarouselArticles from "./CarouselArticles";

function LoginPage() {
    return (
        <>
            <div>
                <div className="article-container vstack" style={{ height: "50vh" }}>
                    <div className="article">
                        <Logo />
                    </div>
                    <div className="" style={{ background: "#1895D7" }}>
                        <Login />
                    </div>
                </div>
            </div>
            <CarouselArticles />
        </>
    );
}

export default LoginPage;
