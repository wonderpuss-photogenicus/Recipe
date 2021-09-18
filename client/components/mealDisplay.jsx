import React from 'react';
import MealCard from './mealCard.jsx';
import GridLayout from 'react-grid-layout';
import ReactDom from 'react-dom';
const MealDisplay = () => {
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
        <div id={idx.toString()} key={idx.toString()} className='mealCard'>
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
  function addMeal() {
    //get request to backend
    const dummyObj = {
      name: 'cereal... with no milk',
      ingredients: dummyList,
      directions: dummyDirections,
    };
    const newMeals = [...meals];
    newMeals.push(dummyObj);
    setMeals(newMeals);

    const newLayout = [...layout];
    if (layout[layout.length - 1].x < 13) {
      newLayout.push({
        i: layout.length.toString(),
        x: layout[layout.length - 1].x + 4,
        y: layout[layout.length - 1].y,
        w: 4,
        h: 11,
      });
    } else {
      newLayout.push({
        i: layout.length.toString(),
        x: 0,
        y: layout[layout.length - 1].y + 11,
        w: 4,
        h: 11,
      });
    }
    setLayout(newLayout);
    const newRendererArray = [...rendererArray];
    newRendererArray.push(true);
    setRendererArray(newRendererArray);
  }

  return (
    <div id='mealDisplay'>
      <button id='addMealButton' onClick={addMeal}>
        Find new Meal!
      </button>
      <GridLayout
        className='layout'
        layout={layout}
        cols={20}
        rowHeight={30}
        width={1200}
      >
        {mealArray}
      </GridLayout>
    </div>
  );
};

export default MealDisplay;
