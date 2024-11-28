import React, { FC, useEffect, useState, useLayoutEffect } from 'react';
import { Svg, SVG } from '@svgdotjs/svg.js';
import { initRoom } from '../../model';
import './index.css';

const room = initRoom([[10, 10], [200, 10], [200, 100], [65, 170], [10, 100], [130, 60]]);

const Room: FC = () => {
    const [svg, setSvg] = useState<Svg | undefined>();

    useLayoutEffect(() => {
        setSvg(SVG().addTo('#room').height('100%').width('100%'));
    }, [])

    useEffect(() => {
        svg?.clear();
        room.lines.forEach(line => {
            svg?.line(line.a.point.x, line.a.point.y, line.b.point.x, line.b.point.y).stroke({ width: 3, color: 'red' });
        });
    }, [svg]);

    return (
        <div className="room">
            <div className="room__svg-container" id="room" />
        </div>
    )
};

export default Room;
