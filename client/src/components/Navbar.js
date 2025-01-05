import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
const Navbar = () => {
    const [loginCheck, setLoginCheck] = useState(false);
    const checkLogin = () => {
        const isLoggedIn = auth.loggedIn(); // Ensure loggedIn() returns a boolean
        if (isLoggedIn) {
            setLoginCheck(true);
        }
        else {
            setLoginCheck(false);
        }
    };
    useEffect(() => {
        console.log('Login status:', loginCheck);
        checkLogin();
    }, []);
    return (_jsxs("div", { className: 'nav', children: [_jsx("div", { className: 'nav-title', children: _jsx(Link, { to: '/', children: "Krazy Kanban Board" }) }), _jsx("ul", { children: !loginCheck ? (_jsx("li", { className: 'nav-item', children: _jsx("button", { type: 'button', children: _jsx(Link, { to: '/login', children: "Login" }) }) })) : (_jsx("li", { className: 'nav-item', children: _jsx("button", { type: 'button', onClick: () => {
                            auth.logout();
                            setLoginCheck(false); // Reset login status after logout
                        }, children: "Logout" }) })) })] }));
};
export default Navbar;
