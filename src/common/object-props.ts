/** Сериализация и десериализация для простоты и наглядности сделаны влоб, сам я пользуюсь Effect-TS Schema */

export abstract class ObjectProp {
    constructor(readonly id: string, readonly displayName: string, readonly disc: ObjectPropTypeValues) { }
    abstract serialize(): ObjectPropEncoded;
}
export interface ObjectPropEncoded {
    id: string,
    displayName: string,
    disc: string,
}

export const ObjectPropType = {
    number: "num",
    boolean: "bool",
} as const;
export type ObjectPropTypeValues = (typeof ObjectPropType)[keyof typeof ObjectPropType];

export class BooleanObjectProp extends ObjectProp {
    constructor(readonly id: string, readonly displayName: string, readonly value: boolean) {
        super(id, displayName, ObjectPropType.boolean);
    }
    serialize(): BooleanObjectPropEncoded {
        return {
            disc: this.disc,
            displayName: this.displayName,
            id: this.id,
            value: this.value,
        }
    }
    setValue = (value: boolean): BooleanObjectProp => {
        return new BooleanObjectProp(this.id, this.displayName, value);
    }
    static deserialize(props: BooleanObjectPropEncoded): BooleanObjectProp {
        return new BooleanObjectProp(props.id, props.displayName, props.value);
    }
    static isBoolean(obj: ObjectProp): obj is BooleanObjectProp {
        return obj.disc === ObjectPropType.boolean
    }
    static isBooleanEnc(obj: ObjectPropEncoded): obj is BooleanObjectPropEncoded {
        return obj.disc === ObjectPropType.boolean
    }
}
export interface BooleanObjectPropEncoded extends ObjectPropEncoded {
    value: boolean
}

export class NumberObjectProp extends ObjectProp {
    constructor(
        readonly id: string,
        readonly displayName: string,
        readonly min: number,
        readonly max: number,
        readonly value: number
    ) {
        super(id, displayName, ObjectPropType.number);
    }
    setValue = (value: number): NumberObjectProp => {
        return new NumberObjectProp(this.id, this.displayName, this.min, this.max, value);
    }
    serialize = (): NumberObjectPropEncoded => {
        return {
            disc: this.disc,
            displayName: this.displayName,
            id: this.id,
            max: this.max,
            min: this.min,
            value: this.value,
        }
    }
    static deserialize(props: NumberObjectPropEncoded): NumberObjectProp {
        return new NumberObjectProp(props.id, props.displayName, props.min, props.max, props.value);
    }
    static isNumber(obj: ObjectProp): obj is NumberObjectProp {
        return obj.disc === ObjectPropType.number
    }
    static isNumberEnc(obj: ObjectPropEncoded): obj is NumberObjectPropEncoded {
        return obj.disc === ObjectPropType.number
    }
}
export interface NumberObjectPropEncoded extends ObjectPropEncoded {
    min: number,
    max: number,
    value: number,
}

export const deserializeObjectProp = (prop: ObjectPropEncoded): ObjectProp => {
    if (BooleanObjectProp.isBooleanEnc(prop)) {
        return BooleanObjectProp.deserialize(prop);
    } else if (NumberObjectProp.isNumberEnc(prop)) {
        return NumberObjectProp.deserialize(prop);
    } else {
        throw new Error('Unimplemented')
    }
}