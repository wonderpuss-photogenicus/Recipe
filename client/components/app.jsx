import React from 'react';

import MealCard from './MealCard.jsx';
import GridLayout from 'react-grid-layout';
import ReactDom from 'react-dom';
import Aside from './Aside.jsx';
<<<<<<< HEAD
import MealDisplay from './MealDisplay.jsx';
import GridLayout from 'react-grid-layout';
import MealCard from './MealCard.jsx';
import Filter from './Filter.jsx';
const App = () => {
  const [rendererArray, setRendererArray] = React.useState([true, true]);
  const [layout, setLayout] = React.useState([
    { i: '0', x: 0, y: 0, w: 4, h: 11 },
    { i: '1', x: 4, y: 0, w: 4, h: 11 },
  ]);

  const dummyList = [
    'onions',
    'bread',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
    'ramen',
  ];
  const dummyDirections = [
    'Make some food',
    'I love writing fake recipes',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
    'Call me Paula Deen',
  ];
  const [meals, setMeals] = React.useState([
    {
      name: "Mama's Lasagna",
      ingredients: dummyList,
      directions: dummyDirections,
    },
    {
      name: "Papa's Lasagna",
      ingredients: dummyList,
      directions: dummyDirections,
    },
  ]);
  const mealArray = [];
  meals.forEach((el, idx) => {
    if (rendererArray[idx]) {
      mealArray.push(
        <div
          id={idx.toString()}
          key={idx.toString()}
          className='mealCard'
          className='no-drag'
        >
          <MealCard
            unmount={unmount}
            name={el.name}
            directions={el.directions}
            ingredients={el.ingredients}
          />
        </div>
      );
    }
  });

  function unmount(event) {
    const idx = event.target.parentNode.parentNode.parentNode.id;
    const newRendererArray = [...rendererArray];
    newRendererArray[idx] = false;
    // const newLayout = [...this.state.layout];
    // for (let i = idx; i < newLayout.length; i++) {
    //   newLayout[i].x -= 2;
    // }
    //above does not work, trying to shift every card over upon unmounting left card... oh well :)
    //i think its because gridlayout is not rerendering because it is not diffing so the diff algo doesnt pick it up
    // console.log(newLayout);
    setRendererArray(newRendererArray);
  }
  function addMeal(num) {
    console.log(num);
    console.log('cool');
    //get request to backend
    const dummyObj = {
      name: 'cereal... with no milk',
      ingredients: dummyList,
      directions: dummyDirections,
    };
    const newMeals = [...meals];
    const newLayout = [...layout];
    const newRendererArray = [...rendererArray];
    for (let i = 0; i < num; i++) {
      newMeals.push(dummyObj);
      if (newLayout[newLayout.length - 1].x < 9) {
        newLayout.push({
          i: newLayout.length.toString(),
          x: newLayout[newLayout.length - 1].x + 4,
          y: newLayout[newLayout.length - 1].y,
          w: 4,
          h: 11,
        });
      } else {
        newLayout.push({
          i: newLayout.length.toString(),
          x: 0,
          y: newLayout[newLayout.length - 1].y + 11,
          w: 4,
          h: 11,
        });
      }
      newRendererArray.push(true);
    }
    setMeals(newMeals);
    setLayout(newLayout);
    setRendererArray(newRendererArray);
  }

  return (
    <div id='app'>
      <Aside />
      <GridLayout
        className='layout'
        layout={[
          { i: 'a', x: 0, y: 0, w: 20, h: 20 },
          { i: 'b', x: 0, y: 20, w: 20, h: 20 },
          { i: 'c', x: 0, y: 40, w: 20, h: 20 },
          { i: 'd', x: 0, y: 60, w: 20, h: 20 },
        ]}
        cols={20}
        rowHeight={30}
        width={1200}
        draggableCancel='.no-drag'
      >
        <div id='mealDisplay' key='a'>
          <Filter addMeal={addMeal} />
          <MealDisplay
            mealArray={mealArray}
            rendererArray={rendererArray}
            layout={layout}
            addMeal={addMeal.bind(this)}
          />
        </div>
      </GridLayout>
    </div>
  );
=======
import Nav from './NavBar.jsx'


const App = () => {
    const [rendererArray, setRendererArray] = React.useState([true, true]);
    const [layout, setLayout] = React.useState([
        { i: 'a', x: 0, y: 0, w: 4, h: 11 },
        { i: 'b', x: 4, y: 0, w: 4, h: 11 },
    ]);

    function unmount(event) {
        const idx = event.target.parentNode.parentNode.parentNode.id - 1;
        const newRendererArray = [...rendererArray];
        newRendererArray[idx] = false;
        // const newLayout = [...this.state.layout];
        // for (let i = idx; i < newLayout.length; i++) {
        //   newLayout[i].x -= 2;
        // }
        //above does not work, trying to shift every card over upon unmounting left card... oh well :)
        //i think its because gridlayout is not rerendering because it is not diffing so the diff algo doesnt pick it up
        // console.log(newLayout);
        setRendererArray(newRendererArray);
    }

    return (
        <div>
            <Nav />
            <Aside />
            <GridLayout
                className='layout'
                layout={layout}
                cols={20}
                rowHeight={30}
                width={1200}
            >
                {rendererArray[0] && (
                <div id='1' key='a' className='mealCard'>
                    <MealCard unmount={unmount} />
                </div>
                )}
                {rendererArray[1] && (
                <div id='2' key='b' className='mealCard'>
                    <MealCard unmount={unmount} />
                </div>
                )}
            </GridLayout>
        </div>
    );
>>>>>>> c7cc42811b0f9edc4b6d40f90a646312c40dadfe
};

export default App;
