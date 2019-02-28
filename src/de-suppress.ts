export const deSuppress = (data) => {
    if (!data || !data.suppressData) return data;
    const suppressData = data.suppressData;
    const item = data.data;
    if (Array.isArray(item)) {
        item.forEach(i => deSuppress({ data: i, suppressData }))
    }
    else if (typeof (item) == 'object') {
        const keys = Object.keys(item);
        keys.forEach(key => {
            if (suppressData[key])
                item[key] = suppressData[key][item[key]] | item[key];
            else {
                deSuppress({ data:  item[key], suppressData })
            }
        })
    }

    return item;
}

