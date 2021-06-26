let {
    getAll,
    getAuthenticate,
    getBulk,
    getCreate,
    getDestroy,
    getEdit,
    getIndex,
    getLogin,
    getLogout,
    getOne,
    getSearch,
    getStore,
    getUpdate,
} = require('../../actions/database');
const getControllers = (object) => {
    const Action = {
        ...getAll(object),
        // ...getAuthenticate(object),
        ...getBulk(object),
        ...getCreate(object),
        ...getDestroy(object),
        ...getEdit(object),
        ...getIndex(object),
        // ...getLogin(object),
        // ...getLogout(object),
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