import React, { FC, useState, useEffect } from 'react';
import Selector from '../../components/selector';
import PresenterSvg from '../../views/presenter-svg';
import { initCustomModel } from '../../model';
import './index.css';

const modelInitial = initCustomModel();
const shapeList: string[] = Object.entries(modelInitial).filter((entry) => typeof entry[1] !== 'function').map(result => result[0]);

const Square: FC = () => {
    const [model, setModel] = useState(modelInitial);
    const [toPrint, setToPrint] = useState(shapeList);

    useEffect(() => {
        const m = initCustomModel(toPrint);
        setModel(m);
    }, [toPrint]);

    const handleShapeListChange = (value: string[]) => {
        setToPrint(value);
    };

    return (
        <div className="square">
            <div className='square__checkbox-container'>
                <Selector shapeList={shapeList} onListChange={handleShapeListChange} />
            </div>
            <PresenterSvg model={model} />
        </div>
    );
};

export default Square;
