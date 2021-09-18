import React from 'react';
import MealCard from './MealCard.jsx';
import GridLayout from 'react-grid-layout';
import ReactDom from 'react-dom';
import Aside from './Aside.jsx';
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
};

export default App;