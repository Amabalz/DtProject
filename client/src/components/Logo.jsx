import logo from "../assets/logoFull.svg";

function Logo() {
    return (
        <div
            className="vstack"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                background: "#e9ecef",
            }}
        >
            <img
                src={logo}
                alt="Logo"
                style={{ width: "50%", height: "auto", marginBottom: "1rem" }}
            />
            <h6 className="text-center">
                Sign up to support the best cooking community!
            </h6>
        </div>
    );
}

export default Logo;
