import { useState } from 'react';
import logo from '../images/ytlogo.png';
import ProfileDrop from './ProfileDrop';
import { Link } from 'react-router-dom';
import CProfileDrop from './CProfileDrop';

const CNav = ({ onSetTimer, onLogout }) => {
    const [menuState, setMenuState] = useState(false);

    return (
        <nav className="bg-white border-b">
            <div className="flex items-center space-x-8 py-2 px-4 max-w-screen-xl mx-auto md:px-8">
                <div className="flex-none lg:flex-initial">
                    <Link to="/CreatorHomepage">
                        <img
                            src={logo}
                            width={50}
                            height={50}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="flex-1 flex items-center justify-between">

<div class="relative">
  <label for="Search" class="sr-only"> Search </label>
</div>
                    <div className="flex z-50 items-center space-x-2 sm:space-x-6">
                        <CProfileDrop
                            onSetTimer={onSetTimer}
                            onLogout={onLogout}
                        />
                        <button 
                            className="outline-none text-gray-400 block lg:hidden"
                            onClick={() => setMenuState(!menuState)}
                        >
                            {
                                menuState ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default CNav;
