import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useThemeContext } from '../hooks/useThemeContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const { theme } = useThemeContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header data-theme={theme}>
            <div className="container">
                <Link to="/">
                    <h1>Notes app</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user &&(
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;