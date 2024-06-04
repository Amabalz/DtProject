import ProfileComp from "./ProfileComp";
import UserComments from "./UserComments"
import SidebarComp from "./SidebarComp";

function ProfilePageComm() {
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
                <SidebarComp profilePicture={"/avatar.jpg"} name={"TestUser"} />
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
                    <h2>Posted Comments</h2>
                    <UserComments />
                </div>
            </div>
        </div>
    );
}
export default ProfilePageComm;
