import { action, computed, makeObservable, observable } from "mobx";
import React from "react";
import { BooleanObjectProp, NumberObjectProp, ObjectProp, ObjectPropEncoded } from "../common/object-props";
import { Room, RoomSettings } from "../model/room";
import { StyledShape } from "../geometry/styled-shape";

export const RoomStoreContext =
    React.createContext<IRootStore>({} as IRootStore);

export interface IRootStore {
    styledShapes: readonly StyledShape[],
    settings: readonly ObjectProp[],
    setNumber: (id: string, value: number) => void,
    setBoolean: (id: string, value: boolean) => void,
    text: string,

    history: RoomHistory,
}

class RoomHistory {
    constructor(private root: RootStore, initialProps: readonly ObjectPropEncoded[]) {

        this.snapshots = [initialProps];
        this.currentSnapshot = 0;
        this.candidate = initialProps;
        makeObservable(this);
    }
    @computed get backEnable(): boolean {
        return this.currentSnapshot > 0;
    }
    @computed get forwardEnable(): boolean {
        return this.currentSnapshot < this.snapshots.length - 1;
    }
    @computed get applyEnable(): boolean {
        const currentStr = JSON.stringify(this.snapshots[this.currentSnapshot]);
        const candidateStr = JSON.stringify(this.candidate);
        return currentStr !== candidateStr;
    }

    @observable currentSnapshot: number;

    @observable candidate: readonly ObjectPropEncoded[];
    @action setCandidate = (candidate: readonly ObjectPropEncoded[]) => {
        this.candidate = candidate;
    }

    @observable snapshots: ReadonlyArray<readonly ObjectPropEncoded[]>;

    @action apply = () => {
        if (!this.applyEnable) return;
        const newSnapshots = this.snapshots.slice(0, this.currentSnapshot + 1);
        newSnapshots.push(this.candidate);
        this.snapshots = newSnapshots;
        this.currentSnapshot = this.currentSnapshot + 1;
    }

    @action reset = () => {
        if (!this.applyEnable) return;
        this.root.updateScene(
            RoomSettings.fromDto(this.snapshots[this.currentSnapshot]).settings
        );

    }

    @action back = () => {
        if (!this.backEnable) return;
        this.currentSnapshot = this.currentSnapshot - 1;
        this.root.updateScene(
            RoomSettings.fromDto(this.snapshots[this.currentSnapshot]).settings
        );

    }

    @action forward = () => {
        if (!this.forwardEnable) return;
        this.currentSnapshot = this.currentSnapshot + 1;
        this.root.updateScene(
            RoomSettings.fromDto(this.snapshots[this.currentSnapshot]).settings
        );

    }
}

export class RootStore implements IRootStore {
    constructor(
    ) {
        this.room = new Room(); // initial room
        this.settings = this.room.settings.settings;
        this.styledShapes = this.room.getStyledShapes();
        this.text = Math.round(this.room.getSqure()).toString();
        this.history = new RoomHistory(this, this.room.settings.toDto());

        makeObservable(this);
    }
    private room: Room;

    @observable styledShapes: readonly StyledShape[];

    @observable settings: readonly ObjectProp[];

    @observable text: string;

    @action setNumber = (id: string, value: number) => {
        const setting = this.settings.find(s => s.id === id);
        if (setting === undefined) return;
        if (NumberObjectProp.isNumber(setting)) {
            const newSettings = this.settings.map(s => s.id === id ? setting.setValue(value) : s);
            this.updateScene(newSettings);
        }
    }

    @action setBoolean = (id: string, value: boolean) => {
        const setting = this.settings.find(s => s.id === id);
        if (setting === undefined) return;
        if (BooleanObjectProp.isBoolean(setting)) {
            const newSettings = this.settings.map(s => s.id === id ? setting.setValue(value) : s);
            this.updateScene(newSettings);
        }
    }

    history: RoomHistory;

    @action updateScene(newSettings: readonly ObjectProp[]) {
        const roomSettings = new RoomSettings(newSettings);
        this.history.setCandidate(roomSettings.toDto());
        this.room = new Room(roomSettings);
        this.settings = this.room.settings.settings;
        this.styledShapes = this.room.getStyledShapes();
        this.text = Math.round(this.room.getSqure()).toString();
    }
}
