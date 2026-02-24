import React from 'react';
import { Link,Outlet } from 'react-router-dom';
import './Nav.css'
const Nav = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="cart">cart</Link></li>
                </ul>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default Nav;