import React from 'react';

const NavBar = () => {

    return (
        <nav className='listContainer'>
            <ol className='pantryList'>
                {pantryItems.map((item, idx) => orderedListBuilder(item, idx))}
            </ol>
            <ol className='cartList'>
                {cartItems.map((item, idx) => orderedListBuilder(item, idx))}
            </ol>
        </nav>
    );
};

export default NavBar;
