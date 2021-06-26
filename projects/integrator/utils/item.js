let {
    getIndex,
    getAll,
    getOne,
    getCreate,
    getStore,
    getEdit,
    getUpdate,
    getDestroy,
    getBulk,
    getSearch,
} = require('./action');
const everyoneItem = (object) => {
    const Action = {
        ...getIndex(object),
        ...getAll(object),
        ...getOne(object),
        ...getCreate(object),
        ...getStore(object),
        ...getEdit(object),
        ...getUpdate(object),
        ...getDestroy(object),
        ...getBulk(object),
        ...getSearch(object),
    }
    return Action;
};
module.exports = {
    everyoneItem,  
};