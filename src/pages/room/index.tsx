import React, { FC } from 'react';
import ViewSvg from '../../views/view-svg';
import { initRoom, Coords } from '../../model';
import { getRoomArea } from '../../utils';
import './index.css';

const roomCornerPoints: Coords = [[10, 10], [200, 10], [200, 100], [65, 170], [10, 100]];
const room = initRoom(roomCornerPoints);
const roomArea = getRoomArea(roomCornerPoints);

const Room: FC = () => {
    return (
        <div className="room">
            <ViewSvg model={room} note={`Площадь: ${roomArea}`} />
        </div>
    )
};

export default Room;
