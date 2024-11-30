import { BooleanObjectProp, deserializeObjectProp, NumberObjectProp, ObjectProp, ObjectPropEncoded } from "../common/object-props";
import { Line, Shape, Point, Vertex } from "../geometry/shape";
import { StyledShape, Styles } from "../geometry/styled-shape";

export class RoomSettings {

    static readonly angleNum_min = 3;
    static readonly angleNum_max = 20;

    static readonly thickness_min = 1;
    static readonly thickness_max = 30;

    static readonly settingsKeys = {
        angleNum: "angleNume",
        verticeVisible: "vertice",
        outerWallsVisible: "outer",
        innerWallsVisible: "inner",
        wallThickness: "thickness",
    }

    /** unsafe for simplicity */
    constructor(settings?: readonly ObjectProp[] | undefined) {
        this.settings =
            settings !== undefined
                ? settings
                : [
                    new BooleanObjectProp(RoomSettings.settingsKeys.verticeVisible, "Вершины", true),
                    new BooleanObjectProp(RoomSettings.settingsKeys.outerWallsVisible, "Внешние стены", true),
                    new BooleanObjectProp(RoomSettings.settingsKeys.innerWallsVisible, "Внутренние стены", true),
                    new NumberObjectProp(RoomSettings.settingsKeys.angleNum, "Количество углов",
                        RoomSettings.angleNum_min, RoomSettings.angleNum_max, 6),
                    new NumberObjectProp(RoomSettings.settingsKeys.wallThickness, "Толщина стен",
                        RoomSettings.thickness_min, RoomSettings.thickness_max, 6),
                ]
    }
    readonly settings: readonly ObjectProp[];

    toDto = (): readonly ObjectPropEncoded[] => this.settings.map(s => s.serialize());

    /** unsafe for simplicity */
    static fromDto = (props: readonly ObjectPropEncoded[]): RoomSettings => {
        return new RoomSettings(props.map(deserializeObjectProp));
    }
}

export class Room {
    constructor(settings?: RoomSettings | undefined) {
        this.settings =
            settings !== undefined
                ? settings
                : new RoomSettings()
    }
    settings: RoomSettings;

    /** unsafe for simplicity */
    private getAngleNum = () =>
        (this.settings.settings.find(s => s.id === RoomSettings.settingsKeys.angleNum) as NumberObjectProp).value;
    /** unsafe for simplicity */
    private getWallThickness = () =>
        (this.settings.settings.find(s => s.id === RoomSettings.settingsKeys.wallThickness) as NumberObjectProp).value;
    /** unsafe for simplicity */
    private getInnerVisibility = () =>
        (this.settings.settings.find(s => s.id === RoomSettings.settingsKeys.innerWallsVisible) as BooleanObjectProp).value;
    /** unsafe for simplicity */
    private getOuterVisibility = () =>
        (this.settings.settings.find(s => s.id === RoomSettings.settingsKeys.outerWallsVisible) as BooleanObjectProp).value;
    /** unsafe for simplicity */
    private getVerticesVisibility = () =>
        (this.settings.settings.find(s => s.id === RoomSettings.settingsKeys.verticeVisible) as BooleanObjectProp).value;

    public getSqure = (): number => {
        const angleNum = this.getAngleNum();
        const angle = 2 * Math.PI / angleNum;
        const hord = Math.sqrt((1 - Math.cos(angle)) ** 2 + Math.sin(angle) ** 2) * 200;
        const angleHalf = Math.PI / angleNum;
        const result = (angleNum * (hord ** 2) / 4) * (1 / Math.tan(angleHalf));
        return result;
    }

    public getStyledShapes = (): StyledShape[] => {

        const angleNum = this.getAngleNum();

        const points: Point[] = this.getPoints(angleNum);
        const lines = points.map((point, index) => {
            const other = points[index < points.length - 1 ? index + 1 : 0];
            return new Line(new Vertex(point), new Vertex(other));
        });

        const result: StyledShape[] = [];

        if (this.getInnerVisibility()) {
            result.push(this.getStyledInnerWalls(points));
        }

        if (this.getOuterVisibility()) {
            result.push(this.getStyledOuterWalls(lines));
        }

        if (this.getVerticesVisibility()) {
            result.push(this.getStyledVertices(points));
        }

        return result;
    }

    private getStyledVertices = (points: Point[]): StyledShape => {
        const shape = new Shape(points.map(p => new Vertex(p)), []);
        return new StyledShape(shape, this.getDefaultStyles());
    }

    private getStyledOuterWalls = (lines: Line[]): StyledShape => {
        const shape = new Shape([], lines);
        const style = this.getDefaultStyles();
        const thickness = this.getWallThickness();
        style.lineThickness = thickness;
        return new StyledShape(shape, style);
    }

    private getStyledInnerWalls = (points: Point[]): StyledShape => {
        const innerLineIndexes: { p1: number, p2: number }[] = [];
        for (let p1 = 0; p1 < points.length; ++p1) {
            for (let p2 = 0; p2 < points.length; ++p2) {
                if (p1 === p2) continue;
                if (p2 === 0) continue;
                if (p1 === p2 - 1) continue;
                if (p1 === p2 + 1) continue;
                if (p2 === points.length - 1) continue;

                if (innerLineIndexes.find(p =>
                    (p.p1 === p1 && p.p2 === p2)
                    || (p.p1 === p2 && p.p2 === p1)
                )) continue;
                innerLineIndexes.push({ p1, p2 });
            }
        }
        const lines: Line[] = innerLineIndexes.map(l =>
            new Line(new Vertex(points[l.p1]), new Vertex(points[l.p2]))
        );

        const shape = new Shape([], lines);
        const style = this.getDefaultStyles();
        return new StyledShape(shape, style);
    }

    private getPoints(angleNum: number): Point[] {
        const xb = 0;
        const yb = 0;
        const angle = 2 * Math.PI / angleNum;
        const hord = Math.sqrt((1 - Math.cos(angle)) ** 2 + Math.sin(angle) ** 2) * 200;

        let points: Point[] = [];
        points.push(new Point(xb + hord / 2, yb));
        for (let i = 0; i < angleNum - 1; ++i) {
            const prev = points[i];
            points.push(new Point(
                prev.x + hord * Math.cos(i * angle),
                prev.y + hord * Math.sin(i * angle)));
        }

        // translate points         
        const xmin = Math.min(...points.map(x => x.x));
        const padding = 10; // laziness
        points = points.map(v => new Point(v.x - xmin + padding, v.y + padding));
        return points;
    }

    /** simplified for simplicity */
    private getDefaultStyles = (): Styles => {
        return new Styles(1, "#00F", 10, "#0f0");
    }
}
