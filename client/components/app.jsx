import React from 'react';
import MealCard from './mealCard.jsx';
import GridLayout from 'react-grid-layout';
import ReactDom from 'react-dom';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rendererArray: [true, true],
      layout: [
        { i: 'a', x: 0, y: 0, w: 4, h: 11 },
        { i: 'b', x: 4, y: 0, w: 4, h: 11 },
      ],
    };
  }
  unmount(event) {
    const idx = event.target.parentNode.parentNode.parentNode.id - 1;
    const newRendererArray = [...this.state.rendererArray];
    newRendererArray[idx] = false;
    // const newLayout = [...this.state.layout];
    // for (let i = idx; i < newLayout.length; i++) {
    //   newLayout[i].x -= 2;
    // }
    //above does not work, trying to shift every card over upon unmounting left card... oh well :)
    //i think its because gridlayout is not rerendering because it is not diffing so the diff algo doesnt pick it up
    // console.log(newLayout);
    this.setState({ rendererArray: newRendererArray });
  }
  render() {
    return (
      <div>
        <GridLayout
          className='layout'
          layout={this.state.layout}
          cols={20}
          rowHeight={30}
          width={1200}
        >
          {this.state.rendererArray[0] && (
            <div id='1' key='a' className='mealCard'>
              <MealCard unmount={this.unmount.bind(this)} />
            </div>
          )}
          {this.state.rendererArray[1] && (
            <div id='2' key='b' className='mealCard'>
              <MealCard unmount={this.unmount.bind(this)} />
            </div>
          )}
        </GridLayout>
      </div>
    );
  }
}

export default App;
