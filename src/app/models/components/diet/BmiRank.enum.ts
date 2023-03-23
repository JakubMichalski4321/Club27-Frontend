import { BmiRange } from "./BmiRange";

export enum BMI {
    ONE = 'wygłodzenie',
    TWO = 'wychudzenie',
    THREE = 'niedowaga',
    FOUR = 'pożądana masa ciała',
    FIVE = 'nadwaga',
    SIX = 'otyłość I stopnia',
    SEVEN = 'otyłość II stopnia (duża)',
    EIGHT = 'otyłość III stopnia (chorobliwa)'
}

export namespace BMI {

    export function getBmiRankEnum(bmi: string): BMI {
        return BMI[bmi];
    }

    export function getBMILevel(bmi: number): string {
        if (bmi <= 16) return BMI.ONE;
        if (bmi > 16 && bmi < 17) return BMI.TWO;
        if (bmi >= 17 && bmi < 18.5) return BMI.THREE;
        if (bmi >= 18.5 && bmi < 25) return BMI.FOUR;
        if (bmi >= 25 && bmi < 30) return BMI.FIVE;
        if (bmi >= 30 && bmi < 35) return BMI.SIX;
        if (bmi >= 35 && bmi < 40) return BMI.SEVEN;
        if (bmi >= 40) return BMI.EIGHT;
    }

    export function getBMIRange(bmi: string): BmiRange {
        switch(bmi) {
            case BMI.ONE : return { lower: 0, higher: 16 };
            case BMI.TWO : return { lower: 16, higher: 17 };
            case BMI.THREE : return { lower: 17, higher: 18.5 };
            case BMI.FOUR : return { lower: 18.5, higher: 25 };
            case BMI.FIVE : return { lower: 25, higher: 30 };
            case BMI.SIX : return { lower: 30, higher: 35 };
            case BMI.EIGHT : return { lower: 40, higher: 100 };
        }
    }

    export function getLowerBMILevel(bmi: number): string {
        const bmiEnum = this.getBMILevel(bmi);
        const allBmiEnums = Object.values(BMI);
        return allBmiEnums[allBmiEnums.indexOf(bmiEnum) - 1].toString();
    }

    export function getHigherBMILevel(bmi: number): string {
        const bmiEnum = this.getBMILevel(bmi);
        const allBmiEnums = Object.values(BMI);
        return allBmiEnums[allBmiEnums.indexOf(bmiEnum) + 1].toString();
    }

    export function getLowerBMILevelDiffrence(weight: number, height: number): number {
        const bmi: number = this.calculateBMI(weight, height);
        const bmiValue: string =  this.getBMILevel(bmi);
        const bmiRange: BmiRange = this.getBMIRange(bmiValue);
        const toLowerWeight = bmiRange.lower * (height*height) / 10000;
        return Math.round((weight - toLowerWeight) * 1000) / 1000;  weight - toLowerWeight;
    }

    export function calculateBMI(weight: number, height: number): number {
        return weight / ((height/100) * (height/100));
    }

}