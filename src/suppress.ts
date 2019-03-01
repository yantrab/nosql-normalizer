const _suppress = (obj, idProp: string, suppressData) => {
    const keys = Object.keys(obj);
    for (const key of keys) {
        let value = obj[key]
        if (typeof (value) !== 'object') continue;

        const id = value[idProp]
        if (!id) _suppress(value, idProp, suppressData)
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
        item.forEach(i => _suppress(i, idProp, suppressData))
    }
    else {
        _suppress(item, idProp, suppressData)
    }
    if (!!Object.keys(suppressData).length)
        return { data: item, suppressData };
    else return item;
}

