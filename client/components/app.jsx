import React from 'react';
import MealCard from './mealCard.jsx';
import GridLayout from 'react-grid-layout';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const layout = [
      { i: 'a', x: 1, y: 1, w: 1, h: 2 },
      { i: 'b', x: 1, y: 1, w: 1, h: 2 },
    ];
    return (
      <div>
        Hello There :&#41; &lt; &gt; as
        <GridLayout
          className='layout'
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
        >
          <MealCard key='a' />
          <MealCard key='b' />
        </GridLayout>
      </div>
    );
  }
}

export default App;
