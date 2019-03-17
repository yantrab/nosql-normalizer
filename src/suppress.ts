const _suppress = (obj, idProp: string, suppressData) => {
    const keys = Object.keys(obj);
    for (const key of keys) {
        let value = obj[key]
        if (typeof (value) !== 'object') continue;

        const id = value[idProp]
        if (!id) {
            if (Array.isArray(value) && value[0] && value[0][idProp]) {
                suppressData[key] = {};
                let i = 0;
                for (const v of value) {
                    _suppress(v, idProp, suppressData);
                    suppressData[key][v[idProp]] = v;
                    value[i] = suppressData[key][v[idProp]][idProp];
                    delete suppressData[key][v[idProp]][idProp];
                    i++;
                }
            } else {
                _suppress(value, idProp, suppressData)
            }
        }
        else {
            if (!suppressData[key]) suppressData[key] = {}
            let cloneValue = Object.assign({}, { ...obj[key] });
            suppressData[key][id] = cloneValue;
            _suppress(cloneValue, idProp, suppressData);
            delete cloneValue[idProp]
            obj[key] = id;
        }
    }
}

export const suppress = (item: any[] | any, idProp = '_id'): any => {
    const suppressData = {};
    if (Array.isArray(item)) {
        for (let i of item) _suppress(i, idProp, suppressData)
    } else {
        _suppress(item, idProp, suppressData)
    }
    if (!!Object.keys(suppressData).length)
        return { data: item, suppressData };
    else return item;
}

