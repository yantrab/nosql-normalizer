const _deSuppress = (data, suppressData,  idProp = '_id') => {
    
}


export const deSuppress = (data, idProp = '_id') => {
    if (!data || !data.suppressData) return data;
    const suppressData = data.suppressData;
    const item = data.data;
    if (Array.isArray(item)) {
        item.forEach(i => deSuppress({ data: i, suppressData }, idProp))
    } else if (typeof (item) == 'object') {
        const keys = Object.keys(item);
        keys.forEach(key => {
            if (suppressData[key]) {
                const _id = item[key];
                const data = deSuppress({ data: suppressData[key][item[key]], suppressData }, idProp);
                if (data) {
                    data[idProp] = _id;
                    item[key] = data;
                }
            }
            else {
                deSuppress({ data: item[key], suppressData }, idProp)
            }
        })
    }

    return item;
}

