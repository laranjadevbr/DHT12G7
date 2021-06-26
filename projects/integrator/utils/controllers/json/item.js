let {
    getAll,
    getCreate,
    getDestroy,
    getEdit,
    getIndex,
    getOne,
    getSearch,
    getStore,
    getUpdate,
} = require('../../actions/json');
const getControllers = (object) => {
    const Action = {
        ...getAll(object),
        ...getCreate(object),
        ...getDestroy(object),
        ...getEdit(object),
        ...getIndex(object),
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