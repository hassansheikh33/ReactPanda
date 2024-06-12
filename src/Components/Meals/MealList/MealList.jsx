import classes from './MealList.module.css'
import MealItem from '../MealItem/MealItem'
import Card from '../../UI/Card/Card'
import MealsSummary from '../MealSummary/MealSummary'
import React, { useEffect, useState } from 'react'
import 'ldrs/waveform'


function MealList() {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('https://http-react-cc4f7-default-rtdb.firebaseio.com/meals.json');
                if (!response.ok) {
                    console.log(response.status);
                    throw new Error(`An error occured, status: ${response.status}`);
                }
                let fetchedMeals = [];
                const data = await response.json();
                for (const key in data) {
                    fetchedMeals.push({
                        ...data[key]
                    })
                }
                setMeals(fetchedMeals);
            } catch (err) {
                setError(err);
                console.error(err);
            }
            setIsLoading(false);
        }
        fetchMeals();
    }, []);

    return <>
        <MealsSummary></MealsSummary>
        {isLoading && !error && <h2>Loading...</h2>}
        {(error && !isLoading && meals.length === 0) && <h2>Some error occured: {error.message}</h2>}
        {
            (!isLoading && !error && meals.length > 0) &&
            <Card className={classes.meals}>
                <ul>{meals.map(meal =>
                    <MealItem
                        id={meal.id}
                        key={meal.id}
                        name={meal.name}
                        description={meal.description}
                        price={meal.price}
                    />)}</ul>
            </Card>
        }
    </>
}

export default React.memo(MealList);