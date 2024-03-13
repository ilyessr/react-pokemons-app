import React, { FunctionComponent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar: FunctionComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const goBack = () => {

        if (location.pathname.includes('/edit/')) {
            navigate('/');
        } else {
            navigate(-1);
        }
    };

    return (
        <nav className="h-16 min-h-16 bg-red-500 shadow-lg flex items-center">
            {location.pathname !== '/' && (
                <div className="absolute flex items-center text-white font-semibold mr-4">
                    <button onClick={goBack} className="flex items-center" aria-label='Retour'>
                        <i className="material-icons ml-4 mr-2">arrow_back</i>
                        <span className='hover:underline hidden sm:block'>Retour</span>
                    </button>
                </div>
            )}
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-center items-center">
                    <Link to="/" className="flex items-center justify-center text-white font-semibold text-4xl">
                        <img src="/assets/images/icons/icon_pokeball.png" alt="Logo" className="h-8 mr-2" />
                        <span>Pokédex</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
