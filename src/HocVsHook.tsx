import React, {ChangeEvent, useEffect, useState} from 'react';
import './HocVsHook.css';

const withLS = (keyLS: string) => (Component: any) => ({value, ...props}: any) => {
    let [currentValue, onChange] = useLocalStorageSaving(keyLS, value)

    return <Component {...props} onChange={onChange} value={currentValue}/>
}

const HocVsHook = () => {
    return (
        <div>
            <Select values={['Minsk', 'Warsaw', 'Kiev']} value={'Kiev'}/>
            <TextAreaWithLimit limit={20} placeholder={'Comment'}/>
        </div>
    );
};

const useLocalStorageSaving = (lskey: string, value: string) => {
    const [currentValue, setCurrentValue] = useState(value)
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.currentTarget.value)
        localStorage.setItem(lskey, e.currentTarget.value)
    }

    useEffect(() => {
        const value = localStorage.getItem(lskey) || ''
        setCurrentValue(value)
    }, [])

    return [
        currentValue,
        onChange
    ]
}

let TextAreaWithLimit = ({limit, value = '', ...props}: any) => {

    return <div className={'divStyles'}>
        <textarea className={'textareaStyles'}
                  maxLength={limit}
                  value={value}
                  {...props} /><span
        className={'spanStyles'}>{limit - value.length}</span>
    </div>
}
TextAreaWithLimit = withLS('textarea')(TextAreaWithLimit)

let Select = ({values, ...props}: any) => {

    return <select {...props} >
        {values.map((v: any, index: any) => <option key={index}>{v}</option>)}
    </select>
}
Select = withLS('select')(Select)

export default HocVsHook;