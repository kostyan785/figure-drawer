import React, { FC, useState } from 'react';
import Selector from '../../components/selector';
import PresenterSvg from '../../views/presenter-svg';
import { initModel } from '../../model';
import './index.css';

const model = initModel();
const shapeList: string[] = Object.entries(model).filter((entry) => typeof entry[1] !== 'function').map(result => result[0]);

const Square: FC = () => {
    const [toPrint, setToPrint] = useState(shapeList);

    const handleShapeListChange = (value: string[]) => {
        setToPrint(value);
    };

    return (
        <div className="square">
            <div className='square__checkbox-container'>
                <Selector shapeList={shapeList} onListChange={handleShapeListChange} />
            </div>
            <PresenterSvg model={model} shapesToPrint={toPrint} />
        </div>
    );
};

export default Square;
