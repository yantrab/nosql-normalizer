const _deSuppress = (data, suppressData, idProp = '_id') => {
    if (typeof (data) == 'object') {
        const keys = Object.keys(data);
        for (let key of keys) {
            if (suppressData[key]) {
                const itemArrayOrId = data[key];

                if (Array.isArray(itemArrayOrId)) {
                    const item = itemArrayOrId as Array<any>;
                    let i = 0;
                    for (let aItem of item) {
                        const _id = item[i];
                        item[i] = deSuppress({ data: suppressData[key][item[i]], suppressData }, idProp);
                        item[i][idProp] = _id;
                        i++;
                    }
                }
                else {
                    const _id = itemArrayOrId;
                    const sData = deSuppress({ data: suppressData[key][_id], suppressData }, idProp);
                    if (sData) {
                        sData[idProp] = _id;
                        data[key] = sData;
                    }
                }
            }
            else {
                deSuppress({ data: data[key], suppressData }, idProp)
            }
        }
    }
}


export const deSuppress = (data, idProp = '_id') => {
    if (!data || !data.suppressData) return data;
    const suppressData = data.suppressData;
    const item = data.data;
    if (Array.isArray(item)) {
        for (let i of item) {_deSuppress(i, suppressData, idProp)}
    } else {
        _deSuppress(item, suppressData, idProp)
    }



    return item;
}

