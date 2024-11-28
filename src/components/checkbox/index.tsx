import React, { FC, useState, useEffect } from 'react';

export interface Props {
    label: string;
    onChange: (val:boolean) => void;
}

const Checkbox: FC<Props> = ({label, onChange}) => {
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        onChange(checked);        
    }, [checked, onChange]);
    
    return (
        <label>
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
            {label}
        </label>
    );
}

export default Checkbox;
