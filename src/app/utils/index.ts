/**
 * Devuelve una promesa sencilla. Ésta puede ser utilizada para forzar
 * esperas asíncronas o testear llamadas.
 * 
 * @returns array con la promesa, la función para resolver la promesa y la función para hacerla fallar, respectivamente
 */
export const getPromise = (): Array<any> => {
    let promiseResolve: Function = () => {};
    let promiseReject: Function = () => {};
    
    const prom = new Promise((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
    });

    return [prom, promiseResolve, promiseReject];
}

/**
 * Devuelve un array de promesas y de sus respectivos resolves y rejects. Esto es útil para resolver concurrentemente
 * varias llamadas asíncronas.
 * 
 * @param length    Número de promesas a devolver
 * @returns         Array de 3 posiciones: en la primera posición un array de las promesas, en la segunda sus resolves, en la tercera sus rejects
 */
export const getMultiPromises = (length: number): Array<Array<any>> => {
    let entries = [];
    for (let i = 0; i < length; i++) {
        entries.push(getPromise());
    }
    
    const promises = entries.map((entry) => (entry[0]));
    const resolves = entries.map((entry) => (entry[1]));
    const rejects = entries.map((entry) => (entry[2]));

    return [promises, resolves, rejects];
}
