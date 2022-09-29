import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import './HocVsHook.css';

const HocVsHook = () => {
    return (
        <div>
            <Select values={['Minsk', 'Warsaw', 'Kiev']} value={'Kiev'}/>
            <TextAreaWithLimit limit={20} placeholder={'Comment'}/>
        </div>
    );
};

const TextAreaWithLimit = ({limit, value = '', ...props}: any) => {
    const [currentValue, setCurrentValue] = useState(value)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.currentTarget.value)
        localStorage.setItem('textarea', e.currentTarget.value)
    }

    useEffect(() => {
        const value = localStorage.getItem('textarea') || ''
        setCurrentValue(value)
    }, [])

    return <div className={'divStyles'}>
        <textarea {...props} className={'textareaStyles'} maxLength={limit}
                  value={currentValue}
                  onChange={onChange}/><span
        className={'spanStyles'}>{limit - currentValue.length}</span>
    </div>
}

const Select = ({values, value='Kiev', ...props}: any) => {
    const [currentValue, setCurrentValue] = useState(value)

    const onChange = (e: FormEvent<HTMLOptionElement>) => {
        setCurrentValue(e.currentTarget.value)
        localStorage.setItem('select', e.currentTarget.value)
    }

    useEffect(() => {
        const value = localStorage.getItem('select') || ''
        setCurrentValue(value)
    }, [])


    return <select value={currentValue} {...props} onChange={onChange}>
        {values.map((v: any, index: any) => <option                                                    key={index}>{v}</option>)}
    </select>
}

export default HocVsHook;