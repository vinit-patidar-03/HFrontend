import { useContext } from "react"
import Navbar from "../components/Navbar"
import DashBoard from "../components/DashBoard";
import { Context } from "../context/AppContext";

function Home() {
    const { user } = useContext(Context);

    return (
        <>
            <Navbar user={user} />
            <DashBoard user={user} />
        </>
    )
}

export default Home