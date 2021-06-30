let {
    getAll,
    getBulk,
    getCreate,
    getDestroy,
    getEdit,
    getIndex,
    getInside,
    getOne,
    getSearch,
    getStore,
    getUpdate,
} = require('../../actions/database');
const getControllers = (object) => {
    const Action = {
        ...getAll(object),
        ...getBulk(object),
        ...getCreate(object),
        ...getDestroy(object),
        ...getEdit(object),
        ...getIndex(object),
        ...getInside(object),
        ...getOne(object),
        ...getSearch(object),
        ...getStore(object),
        ...getUpdate(object),
    }
    return Action;
};
module.exports = {
    getControllers,  
};