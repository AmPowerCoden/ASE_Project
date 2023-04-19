import { DateTime } from "luxon";

export class foodplan {
    name!: string;
    montagProdukt!: string;
    montagPreis!: number;
    dienstagProdukt!: string;
    dienstagPreis!: number;
    mittwochProdukt!: string;
    mittwochPreis!: number;
    donnerstagProdukt!: string;
    donnerstagPreis!: number;
    freitagProdukt!: string;
    freitagPreis!: number;
    samstagProdukt!: string;
    samstagPreis!: number;
    start!: DateTime;
}