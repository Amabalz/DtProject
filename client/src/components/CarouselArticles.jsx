import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import logo from "../assets/logoFull.svg";
function CarouselArticles() {
    return (
        <div style={{ height: 500, width: "100%", position: "relative" }}>
            <div
                style={{
                    width: "40%",
                    height: "50%",
                    position: "absolute",
                    left: "30%",
                    margin: "-50 0 0 -50",
                }}
            >
                <Carousel>
                    <div>
                        <img src={logo} />
                        <p>Aici vine pus din backend componenta de thread</p>
                    </div>
                    <div>
                        <img src={logo} />
                        <p>Aici vine pus din backend componenta de thread</p>
                    </div>
                    <div>
                        <img src={logo} />
                        <p>Aici vine pus din backend componenta de thread</p>
                    </div>
                </Carousel>
            </div>
        </div>
    );
}
export default CarouselArticles;
