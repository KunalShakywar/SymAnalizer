import basicSymptoms from "./basic.json";
import specialSymptoms from "./special.json";

export const basicConditionIssues = new Set(basicSymptoms.map((condition) => condition.issue));
export const basicConditions = basicSymptoms;
export const specialConditions = specialSymptoms;
export const allSymptoms = [...basicSymptoms, ...specialSymptoms];
export default allSymptoms;
