import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import { logout } from '../../api/index';
import { deauthenticate } from '../../store/userSlice';
import { toast, Flip } from 'react-toastify';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import '../../scss/Navbar.scss';

interface Store {
    auth: {
        isAuthenticated: boolean
    }
}

const Navbar: React.FC = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: Store) => state.auth.isAuthenticated)

    const backdropClickHandler = () => {
        setShowLoginModal(false);
    }
    const loginClickHandler = () => setShowLoginModal(true);

    const logoutClickHandler = () => {
        logout()
            .then(res => {
                dispatch(deauthenticate());
                toast.success(res.data.message, { transition: Flip });
                history.push('/');
            })
            .catch(err => {
                toast.error(err.response.data.message, { transition: Flip });
            });
    }

    const signupClickHandler = () => history.push("/signup");
    let rightNavLinks;

    if (isAuthenticated) {
        rightNavLinks = (
            <>
                <li>
                    <button className="transition-border duration-300 border-4 border-transparent hover:bg-grey-lighter
                                py-4 px-3 lg:px-5 lg:mx-3 w-full lg:w-auto text-lg font-medium text-syntax-yellow-darker focus:outline-none"
                        onClick={logoutClickHandler}
                    >
                        Logout
                    </button>
                </li>
            </>
        );
    } else {
        rightNavLinks = (
            <>
                <li>
                    <button className="transition-border duration-300 border-4 border-transparent hover:bg-grey-lighter 
                                py-4 px-3 lg:px-5 lg:mx-3 w-full lg:w-auto text-lg font-medium text-syntax-yellow-darker focus:outline-none"
                        onClick={signupClickHandler}
                    >
                        Sign Up
                                </button>
                </li>
                <li>
                    <button className="transition-border duration-300 border-4 border-transparent hover:bg-grey-lighter
                                py-4 px-3 lg:px-5 lg:mx-3 w-full lg:w-auto text-lg font-medium text-syntax-yellow-darker focus:outline-none"
                        onClick={loginClickHandler}
                    >
                        Login
                                </button>
                </li>
            </>
        );
    }

    return (
        <>
            <LoginModal show={showLoginModal} backdropClicked={backdropClickHandler} />
            <nav className="flex flex-1 w-screen px-1 bg-grey fixed top-0 left-0 font-display font-medium z-30"
                id="navbar">
                <div className="flex flex-1 flex-wrap lg:flex-nowrap justify-between items-center">
                    <ul className="flex items-center px-6 self-stretch">
                        <li className="flex align-center self-stretch">
                            <Link to="/" className="transition-border duration-300 border-4 border-transparent 
                            hover:bg-grey-lighter py-4 px-3 font-logo text-lg text-red">
                                Backdoor
                            </Link>
                        </li>
                    </ul>

                    <label htmlFor="hamburger-menu-toggle" className="cursor-pointer lg:hidden border-4 border-transparent py-4 px-6">
                        <svg className="fill-current text-syntax-yellow-darker" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </label>
                    <input className="hidden" type="checkbox" id="hamburger-menu-toggle" />

                    <div className="hidden lg:flex lg-w-min lg:items-center lg:justify-end w-full lg:px-6" id="hamburger-menu">
                        <ul className="lg:flex items-center">
                            {rightNavLinks}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;