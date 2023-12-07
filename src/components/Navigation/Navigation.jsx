import './Navigation.scss';
import navicon from '../../assets/navicon.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navigation() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className={ `navigation ${ showMenu ? 'show-menu' : '' }` }>
            <img role='menu-btn' src={ navicon } className='navigation__icon'
            onClick={ () => { setShowMenu(!showMenu) }} />
            <a role='nav-booking' href="#" className={ `navigation__link ${ showMenu ? '' : 'hide' }` } 
            onClick={ () => { navigate('/') }}>Booking</a>
            <a role='nav-confirmation' href="#" className={ `navigation__link ${ showMenu ? '' : 'hide' }` } 
            onClick={ () => { navigate('/confirmation') }}>Confirmation</a>
        </nav>
    )
}

export default Navigation;