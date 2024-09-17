import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AProfileDrop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const profileRef = useRef();
    const location = useLocation();
    const adminId = sessionStorage.getItem("adminId"); 

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        if (remainingTime !== null && remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [remainingTime]);

    const navi = useNavigate();

    const handleLogout = () => {
        navi("/adminlogin");
        sessionStorage.clear();
        toast.success("Logged out successfully!")
    }

    if (!adminId) {
        return <></>
      }
    
      if(location.pathname === "/CreatorHomepage" && sessionStorage.getItem("adminid")!= adminId){
        navi("/adminlogin");
        sessionStorage.clear();
      }

    return (
        <div className="relative" ref={profileRef}>
            <button
                className="w-10 h-10 outline-none rounded-full ring-gray-200 ring-1 lg:focus:ring-red-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex justify-center items-center">
                    <FaUserCircle size={30} />
                </div>
            </button>
            {isOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                    <li>
                        <Link
                            to={`/adminprofile/${adminId}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Edit Profile
                        </Link>
                    </li>
                    
                    <li>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default AProfileDrop;
