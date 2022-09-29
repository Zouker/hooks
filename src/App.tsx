import React, {useEffect, useState} from 'react';
import './App.css';

function AppContainer(props: any) {
    const [age, setAge] = useState(18);
    const [weight, setWeight] = useState(70);
    const [coords, setCoords] = useState({x: '0', y: '0'});


    useEffect(() => {
        const interval = setInterval(() => {
            setAge(age => age + 1)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [weight])


    let style = {
        left: coords.x + 'px',
        top: coords.y + 'px'
    }

    const onAreaClick = (e: any) => {
        setCoords({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
    }

    return (
        <>
            coords: <div className={'area'} onClick={onAreaClick}>
            <div className="point" style={style}></div>
        </div>
            <App {...props} age={age} setAge={setAge} weight={weight}
                 setWeight={setWeight}/>
        </>
    );
}

function App({age, setAge, weight, setWeight}: any) {
    return (
        <div className="App">
            age: {age}
            <button onClick={() => setAge(age + 1)}>+</button>
            weight: {weight}
            <button onClick={() => setWeight(weight + 1)}>+</button>
        </div>
    );
}

export default AppContainer;
