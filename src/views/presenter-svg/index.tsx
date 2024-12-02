import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Svg, SVG } from '@svgdotjs/svg.js';
import { Model } from '../../model';
import './index.css';

export interface Props {
    model: Model;
    shapesToPrint: string[];
}

const PresenterSvg: FC<Props> = ({ model, shapesToPrint }) => {
    const [svg, setSvg] = useState<Svg | undefined>();
    useEffect(() => {
        svg?.clear();
        if (shapesToPrint.includes('lines')) {
        model.lines.forEach(line => {
            svg?.line(line.a.point.x, line.a.point.y, line.b.point.x, line.b.point.y).stroke({ width: 3, color: '#00F' });
        });
        }

    if (shapesToPrint.includes('vertices')) {
      model.vertices.forEach(vertex => {
        svg?.circle(10).cx(vertex.point.x).cy(vertex.point.y).fill('#0f0');
      });

      model.vertices.forEach(vertex => {
        svg?.circle(10).cx(vertex.point.x).cy(vertex.point.y).fill('#0f0');
      });
    }
    }, [model, svg, shapesToPrint])

    useLayoutEffect(() => {
        setSvg(SVG().addTo('#presentersvg').height('100%').width('100%'));
    }, []);

    return (
        <div className="presenter-svg__view-container" id="presentersvg"></div>
    );
};

export default PresenterSvg;
