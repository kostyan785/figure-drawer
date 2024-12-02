import React, { FC, useState, useEffect } from 'react';

export interface Props {
    label: string;
    info: string;
    onChange: (val:boolean, text: string) => void;
}

const Checkbox: FC<Props> = ({label, info, onChange}) => {
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        onChange(checked, info);
        // TODO: подумать о использовании useCallback или мемоизации для предотвращения ререндеринга, а пока так:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    return (
        <label>
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
            {label}
        </label>
    );
}

export default Checkbox;
