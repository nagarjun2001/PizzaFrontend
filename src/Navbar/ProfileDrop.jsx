import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ProfileDrop = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const profileRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleGoToParentalControls = () => {
        navigate("/parentalcontrols");
        setIsOpen(false);
    };

    const userId = sessionStorage.getItem('userid');

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
                        <button
                            onClick={handleGoToParentalControls}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Parental Controls
                        </button>
                    </li>
                    <li>
                        <Link
                            to={`/userprofile/${userId}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={onLogout}
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

export default ProfileDrop;
