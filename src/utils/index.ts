import { Coords, Model, Room } from "../model";

export type ModelType = Model | Room;

export const getRoomArea = (points: Coords) => {
    if (!points.length) return 0;

    const a: number[] = points.map(point => point[0]);
    const b: number[] = points.map(point => point[1]);

    a[a.length] = a[0];
	b[b.length] = b[0];
	const A = [];
	const B = [];
	const C = [];
	const t = [];
	const S = [];
	let Stotal = 0.0;
	for (let i=0; i < a.length-1; i++) {
		A[i] = Math.sqrt(a[i]*a[i]+b[i]*b[i]);
		B[i] = Math.sqrt(a[i+1]*a[i+1]+b[i+1]*b[i+1]);
		C[i] = Math.sqrt(Math.pow(a[i+1]-a[i],2) + Math.pow(b[i+1]-b[i],2));
		t[i] = (A[i] + B[i] + C[i]) / 2;
		S[i] = Math.sqrt(t[i] * (t[i] - A[i]) * (t[i] - B[i]) * (t[i] - C[i]));
		Stotal += S[i];
	}
	return Math.round(Stotal/100);
};

export const getModelFieldNames = (model: ModelType) => {
	return Object.entries(model).filter((entry) => typeof entry[1] !== 'function').map(result => result[0]);
};
