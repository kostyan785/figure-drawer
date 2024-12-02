import React, {FC, useEffect, useState} from 'react';
import Checkbox from '../../components/checkbox';

export interface Props {
    shapeList: string[];
    onListChange: (list: string[]) => void;
}
const Selector: FC<Props> = ({shapeList, onListChange}) => {
    const [shapes, setShapes] = useState(shapeList);

    useEffect(() => {
        onListChange(shapes);
    }, [shapes, onListChange]);

    const handleCheckChange = (allowPrint: boolean, shapeName: string) => {
        if (allowPrint) {
            const unique = new Set(shapes);
            unique.add(shapeName);
            if (shapes.length !== unique.size) {}
                setShapes( Array.from(unique));

        } else {
            setShapes(shapes.filter(shape => shape !== shapeName));
        }
    };

    return(
        <div>
            {shapeList.map((shapeName) => <Checkbox key={shapeName} label={shapeName} info={shapeName} onChange={handleCheckChange} />)}
        </div>
    );
};

export default Selector;
