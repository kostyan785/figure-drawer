import React, { FC, useEffect, useState, useLayoutEffect } from 'react';
import { Svg, SVG } from '@svgdotjs/svg.js';
import Selector from '../../components/selector';
import { initModel } from '../../model';
import './index.css';

const model = initModel();
const shapeList: string[] = Object.entries(model).filter((entry) => typeof entry[1] !== 'function').map(result => result[0]);

const Square: FC = () => {
    const [svg, setSvg] = useState<Svg | undefined>();
    const [toPrint, setToPrint] = useState<string[]>([]);


    useLayoutEffect(() => {
        setToPrint(shapeList);
        setSvg(SVG().addTo('#square').height('100%').width('100%'));
    }, []);

    useEffect(() => {
        model.printShape(svg, toPrint);
    }, [svg, toPrint]);

    const handleShapeListChange = (value: string[]) => {
        setToPrint(value);
    };

    return (
        <div className="square">
            <div className='square__checkbox-container'>
                <Selector shapeList={shapeList} onListChange={handleShapeListChange} />
            </div>
            <div className="square__svg-container" id="square"></div>
        </div>
    );
};

export default Square;
