const URL = 'http://127.0.0.1:5000';

/*
 * Get Symptoms
 */

export enum DataType {
  numeric,
  binary
}

type APISymptomMeta = Array<{
  name: string;
  type: string;
}>;

const SYMPTOM_TYPE_MAP = new Map([
  ['numeric', DataType.numeric],
  ['binary', DataType.binary]
]);

export function getSymtomMata(): Promise<{[key: string]: DataType}> {
  return fetch(`${URL}/symptoms`)
    .then((response) => response.json())
    .then((metaArr: APISymptomMeta) => {
      const metaMap: {[key: string]: DataType} = {};
      for (const meta of metaArr) {
        metaMap[meta.name] = SYMPTOM_TYPE_MAP.get(meta.type) as DataType;
      }
      return metaMap;
    });
}

/*
 * Get Prediction
 */
export function getPrediciton(symptoms: {[key: string]: number | undefined}): Promise<{[key: string]: number}> {
  const options = {
    body: JSON.stringify(symptoms),
    method: 'post'
  };
  return fetch(`${URL}/predict`, options)
    .then((response) => response.json() as Promise<{[key: string]: number}>);
}


export function getAccuracy(symptomKeys: string[]): Promise<number> {
  const options = {
    body: JSON.stringify(symptomKeys),
    method: 'post'
  };
  return fetch(`${URL}/accuracy`, options)
    .then((response) => response.json())
    .then((data) => data['accuracy'] as number);
}


export function confirmResult(symptoms: {[key: string]: number | undefined}, result: string): Promise<Response> {
  const options = {
    body: JSON.stringify({
      symptoms,
      result
    }),
    method: 'post'
  };
  return fetch(`${URL}/add_knowledge`, options);
}
