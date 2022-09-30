import React, {useCallback, useMemo, useState} from 'react';

const Hooks = () => {
    const [counter, setCounter] = useState(0)
    const [year, setYear] = useState(2022)
    console.log('App rendered')

    const onPlusClick = useCallback(() => setCounter(counter + 1), [counter])
    // const onYearIncrement = useCallback(() => setYear(year + 1), [year])

    const onYearIncrement = useMemo(() => {
        return () => setYear(year + 1)
    }, [year])

    return (
        <div>
            <Counter counter={counter}/>
            <Button onPlusClick={onPlusClick}/>
            <Footer year={year} onIncrement={onYearIncrement}/>
        </div>
    );
};

const Counter = React.memo((props: any) => {
    console.log('Counter rendered')
    return (
        <div>
            {props.counter}
        </div>
    )
})

function Button(props: any) {
    console.log('Button rendered')
    return (
        <div>
            <button onClick={props.onPlusClick}>+</button>
        </div>
    )
}

const Footer = React.memo((props: any) => {
    console.log('Footer rendered')
    return (
        <div>
            FOOTER {props.year}
            <button onClick={props.onIncrement}>+</button>
        </div>
    )
})


export default Hooks;