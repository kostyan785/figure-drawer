import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Svg, SVG } from '@svgdotjs/svg.js';
import { Model, Room } from '../../model';
import './index.css';

export interface Props {
    model: Model | Room;
    note?: string;
}

const ViewSvg: FC<Props> = ({ model, note }) => {
    const [svg, setSvg] = useState<Svg | undefined>();
    useEffect(() => {
        svg?.clear();

        model.lines.forEach(line => {
            svg?.line(line.a.point.x, line.a.point.y, line.b.point.x, line.b.point.y).stroke({ width: 3, color: '#00F' });
        });

        if ('vertices' in model) {
            model.vertices.forEach(vertex => {
                svg?.circle(10).cx(vertex.point.x).cy(vertex.point.y).fill('#0f0');
            });
        }

        if (note) {
            const noteText = svg?.text(note);
            noteText?.move(30, 30);
        }

        return(() => {
            svg?.clear();
        })

    }, [model, svg, note])

    useLayoutEffect(() => {
        setSvg(SVG().addTo('#viewsvg').height('100%').width('100%'));
    }, []);

    return (
        <div className="presenter-svg__view-container" id="viewsvg"></div>
    );
};

export default ViewSvg;
