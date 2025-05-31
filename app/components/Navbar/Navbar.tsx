import { Button } from '../ui/button';
import { NavLink } from 'react-router';
import { UserAvatar } from './UserAvatar';
import { Logo } from './Logo';

export function Navbar() {
    return (
        <>
            <nav className='flex items-center justify-between gap-4 p-4 bg-gray-50 shadow-sm font-light'>
                <Logo />
                {/* <div className='flex items-center gap-8 mr-6 sm:mr-12'>
                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? "active" : ""
                    }>Optimize</NavLink>
                    <NavLink to="/about" className={({ isActive }) =>
                        isActive ? "active" : ""
                    }>About</NavLink>
                    <div className='ml-4 sm:ml-0'>
                        <UserAvatar  />
                    </div>
                </div> */}
            </nav>
        </>
    )
}