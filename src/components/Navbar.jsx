import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Navbar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("HeliverseToken");
        navigate('/login');
    }
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://icon-library.com/images/class-icon-png/class-icon-png-5.jpg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-lg sm:text-2xl font-bold whitespace-nowrap dark:text-white">Class<span className="text-green-600 font-bold">Room</span></span>
                </Link>
                <div className="flex sm:flex-row gap-2 cursor-pointer flex-col-reverse items-end sm:items-center" onClick={() => setIsOpen(prev => !prev)}>
                    <div>
                        <h3 className="font-bold text-end ">{user?.name}</h3>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    {user && <img className="h-8" src={user?.picture} alt="image" />}
                </div>
                {isOpen && <div className=" w-32 h-32 absolute top-24 z-10 right-3 bg-white flex justify-center items-center rounded-lg shadow-[0_0px_3px_rgba(0,0,0,0.3)]">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                </div>
                }
            </div>
        </nav>

    )
}

export default Navbar