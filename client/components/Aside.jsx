import React from 'react';

const Aside = (props) => {
  const orderedListBuilder = (item, idx) => {
    const newItem = (
      <li className='listItem' key={idx} index={idx}>
        {' '}
        {item}
      </li>
    );
    return newItem;
  };

  const useInput = (init) => {
    const [value, setValue] = React.useState(init);
    const onChange = (e) => {
      setValue(e.target.value);
    };
    // return the value with the onChange function instead of setValue function
    return [value, onChange];
  };

  const [pantryItemInput, pantryItemInputOnChange] = useInput('');
  const [cartItemInput, cartItemInputOnChange] = useInput('');

  return (
    <aside className='listContainer' id='aside'>
      <h3>My Items</h3>

      <h4>Pantry</h4>
      <ol className='pantryList'>
        {props.pantryItems.map((item, idx) => orderedListBuilder(item, idx))}
      </ol>
      <div>
        <input
          value={pantryItemInput}
          placeholder='Enter item here...'
          onChange={pantryItemInputOnChange}
        ></input>
        <button
          onClick={() => {
            props.setPantryItems(props.pantryItems.concat([pantryItemInput]));
            pantryItemInput = '';
          }}
        >
          Add to List
        </button>
      </div>

      <h4>Shopping List</h4>
      <ol className='cartList'>
        {props.cartItems.map((item, idx) => orderedListBuilder(item, idx))}
      </ol>
      <div>
        <input
          value={cartItemInput}
          placeholder='Enter item here...'
          onChange={cartItemInputOnChange}
        ></input>
        <button
          onClick={() => {
            props.setCartItems(props.cartItems.concat([cartItemInput]));
            value = '';
          }}
        >
          Add to List
        </button>
      </div>
    </aside>
  );
};

export default Aside;
