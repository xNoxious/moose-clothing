import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { Link, Outlet } from "react-router-dom";
import './navigation.styles.scss';

import { ReactComponent as Logo } from '../../assets/crown.svg';

const Navigation = () => {

    const { currentUser } = useContext(UserContext);

    const handleSignout = async () => {
        await signOutUser();
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <Logo alt="logo" className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span onClick={handleSignout} className="nav-link">SIGN OUT</span>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>
                        )

                    }
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;