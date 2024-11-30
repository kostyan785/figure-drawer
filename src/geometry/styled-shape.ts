import { Shape } from "./shape";

/** for simplicity */
export class Styles {
    constructor(
        public lineThickness: number,
        public lineColor: string,
        public pointSize: number,
        public pointColor: string,
    ) {
    }
}

export class StyledShape {
    constructor(readonly shape: Shape, readonly styles: Styles) {
    }
}