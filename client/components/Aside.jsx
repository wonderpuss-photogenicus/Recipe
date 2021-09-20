import React from 'react';

const Aside = (props) => {
  //   const pantryItems = [
  //     { index: 0, name: 'veg' },
  //     { index: 1, name: 'grains' },
  //   ];
  //   const cartItems = [
  //     { index: 0, name: 'fruit' },
  //     { index: 1, name: 'sauce' },
  //   ];

  const orderedListBuilder = (item, idx) => {
    const newItem = (
      <li className='listItem' key={idx} index={idx}>
        {' '}
        {item}
      </li>
    );
    return newItem;
  };

  return (
    <aside className='listContainer' id='aside'>
      <h3>My Items</h3>
      <h4>Pantry</h4>
      <ol className='pantryList'>
        {props.pantryItems.map((item, idx) => orderedListBuilder(item, idx))}
      </ol>
      <h4>Shopping List</h4>
      <ol className='cartList'>
        {props.cartItems.map((item, idx) => orderedListBuilder(item, idx))}
      </ol>
    </aside>
  );
};

export default Aside;
