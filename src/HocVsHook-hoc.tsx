import React, {ChangeEvent, useEffect, useState} from 'react';
import './HocVsHook.css';

const HocVsHook = () => {
    return (
        <div>
            <Select values={['Minsk', 'Warsaw', 'Kiev']} value={'Kiev'}/>
            <Input placeholder={'Name'} value={'Denis'}/>
            <TextAreaWithLimit value={'yo'} limit={20} placeholder={'Comment'}/>
        </div>
    );
};

const withLocalStorageSaving = (lskey: string) => (Component: any) => {
    let LocalStorageSaving = ({value, ...props}: any) => {
        const [currentValue, setCurrentValue] = useState(value)

        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            setCurrentValue(e.currentTarget.value)
            localStorage.setItem(lskey, e.currentTarget.value)
        }

        useEffect(() => {
            const value = localStorage.getItem(lskey) || ''
            setCurrentValue(value)
        }, [])

        return <Component {...props} value={currentValue} onChange={onChange}/>
    }
    return LocalStorageSaving
}

let TextAreaWithLimit = ({limit, value = '', ...props}: any) => {

    return <div className={'divStyles'}>
        <textarea {...props} className={'textareaStyles'} value={value}
                  maxLength={limit}/><span
        className={'spanStyles'}>{limit - value.length}</span>
    </div>
}
TextAreaWithLimit = withLocalStorageSaving('textarea')(TextAreaWithLimit)

let Input = (props: any) => {

    return <div><input {...props}/></div>
}
Input = withLocalStorageSaving('input')(Input)


let Select = ({values, ...props}: any) => {

    return <select {...props}>
        {values.map((v: any, index: any) => <option key={index}>{v}</option>)}
    </select>
}
Select = withLocalStorageSaving('select')(Select)

export default HocVsHook;