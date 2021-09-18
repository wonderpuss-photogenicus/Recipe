import React from 'react';

const Aside = () => {

    const pantryItems = [{index: 0, name: 'veg'}];
    const cartItems = [{index: 0, name: 'fruit'}];

    const orderedListBuilder = (item, idx) => {
    
        const newItem = <li className='listItem' key={idx} index={idx}>
            {item.name}
            </li>
        return newItem
    }

    return (
        <div>
            <ol className='pantryList'>
                {pantryItems.map((item, idx) => orderedListBuilder(item, idx))}
            </ol>
            <ol className='cartList'>
                {cartItems.map((item, idx) => orderedListBuilder(item, idx))}
            </ol>
        </div>
    );
};

export default Aside;
