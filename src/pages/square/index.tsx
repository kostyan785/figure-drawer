import React, { FC, useEffect, useState } from 'react';
import { Svg, SVG } from '@svgdotjs/svg.js';

import Checkbox from '../../components/checkbox';
import { initModel } from '../../model';
import './index.css';

const Square: FC = () => {
    const [svg, setSvg] = useState<Svg | undefined>();
    const [showVertices, setShowVertices] = useState(true);
    const [showLines, setShowLines] = useState(true);

    const [model] = useState(initModel());

    useEffect(() => {
        setSvg(SVG().addTo('#square').height('100%').width('100%'));
    }, []);

    useEffect(() => {
        svg?.clear();

        if (showLines) {
            model.lines.forEach(line => {
                svg?.line(line.a.point.x, line.a.point.y, line.b.point.x, line.b.point.y).stroke({ width: 3, color: '#00F' });
            });
        }

        if (showVertices) {
            model.vertices.forEach(vertex => {
                svg?.circle(10).cx(vertex.point.x).cy(vertex.point.y).fill('#0f0');
            });
        }
    }, [model, svg, showLines, showVertices]);

    return (
        <div className="square">
            <div className='square__checkbox-container'>
                <Checkbox label='Вершины' onChange={(e) => setShowVertices(e)} />
                <Checkbox label='Линии' onChange={(e) => setShowLines(e)} />
            </div>
            <div className="square__svg-container" id="square"></div>
        </div>
    );
};

export default Square;
