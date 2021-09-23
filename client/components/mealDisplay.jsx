import React from "react";
import GridLayout from "react-grid-layout";
const MealDisplay = (props) => {
  //dumb component that just renders stuff passed down to it, meals arr is created in App
  return (
    <div key="a">
      <GridLayout
        className="layout"
        layout={props.layout}
        cols={200}
        rowHeight={300}
        width={1200}
      >
        {props.mealArray}
      </GridLayout>
    </div>
  );
};

export default MealDisplay;
