import React, { FC, useState, useEffect } from 'react';
import Selector from '../../components/selector';
import ViewSvg from '../../views/view-svg';
import { initCustomModel } from '../../model';
import { getModelFieldNames } from '../../utils';
import './index.css';

const modelInitial = initCustomModel();
const shapeList: string[] = getModelFieldNames(modelInitial);

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
            <ViewSvg model={model} />
        </div>
    );
};

export default Square;
