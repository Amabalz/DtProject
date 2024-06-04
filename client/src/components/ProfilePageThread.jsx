import ProfileComp from "./ProfileComp";
import SidebarComp from "./SidebarComp";
import UserThreads from "./UserThreads";

function ProfilePageThreads() {

    return (
        <div
            style={{
                background: "#e9ecef",
                height: 1500,
                width: "100%",
                position: "relative",
            }}
        >
            <div style={{ width: "15%", height: "100%" }}>
                <SidebarComp profilePicture={"/avatar.jpg"}/>
                <div
                    style={{
                        //background: "orange",
                        width: "60%",
                        height: "100%",
                        position: "absolute",
                        left: "20%",
                        top: "0",
                    }}
                >
                    <ProfileComp
                        avatar={"avatar.jpg"}
                    />
                    <h2>Posted Threads</h2>
                    <UserThreads />
                </div>
            </div>
        </div>
    );
}
export default ProfilePageThreads;
