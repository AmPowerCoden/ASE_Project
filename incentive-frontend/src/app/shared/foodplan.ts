import { DateTime } from "luxon";

export class foodplan {
    name!: string;
    montagProdukt!: string;
    montagPreis!: number;
    montagCheck!: boolean;
    dienstagProdukt!: string;
    dienstagPreis!: number;
    dienstagCheck!: boolean;
    mittwochProdukt!: string;
    mittwochPreis!: number;
    mitwochCheck!: boolean;
    donnerstagProdukt!: string;
    donnerstagPreis!: number;
    donnerstagCheck!: boolean;
    freitagProdukt!: string;
    freitagPreis!: number;
    freitagsCheck!: boolean;
    samstagProdukt!: string;
    samstagPreis!: number;
    samstagsCheck!: boolean;
    start!: DateTime;
}