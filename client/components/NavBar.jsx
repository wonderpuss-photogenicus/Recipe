import React from 'react';

const NavBar = () => {

    return (
        <nav className='navBar'>
            <ul className='addMeal'>
                <button>Add Meal + </button>
            </ul>
            <ul className='favMeal'>
                <button>Fav Meals</button>
            </ul>
            <ul className='recentMeal'>
                <button>Recent Meals</button>
            </ul>
            <ul className='weeklyPlanner'>
                <button>Weekly Planner</button>
            </ul>
        </nav>
    );
};

export default NavBar;
