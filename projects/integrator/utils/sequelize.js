const {
    lengths : {
        cep,
        cnh,
        cnpj,
        cpf,
        passport,
        phone,
        rg,
        uf,
    },
    lorem : {
        description,
        title,
    },
} = option = require('../database/options');
module.exports = {
    id : (Sequelize) => {
        return {
            id : {
                allowNull : false,
                autoIncrement : true,
                primaryKey : true,
                type : Sequelize.INTEGER,
            },
        };
    },
    eventDate : (Sequelize) => {
        return {
            startdate : {
                allowNull : false,
                type : Sequelize.DATE,
            },
            enddate : {
                allowNull : false,
                type : Sequelize.DATE,
            },
            starttime : {
                allowNull : false,
                type : Sequelize.TIME,
            },
            endtime : {
                allowNull : false,
                type : Sequelize.TIME,
            },
        };
    },
    everyoneAddress : (Sequelize) => {
        return {
            cep : Sequelize.STRING(cep),
            address : Sequelize.STRING,
            number : Sequelize.INTEGER,
            district : Sequelize.STRING,
            city : Sequelize.STRING,
            state : Sequelize.STRING(uf),
        };
    },
    // everyoneAddress : (Sequelize, Entity) => {
    //     let entity = Entity ? Entity : '';
    //     return {
    //         [entity + 'cep'] : Sequelize.STRING(cep),
    //         [entity + 'address'] : Sequelize.STRING,
    //         [entity + 'number'] : Sequelize.INTEGER,
    //         [entity + 'district'] : Sequelize.STRING,
    //         [entity + 'city'] : Sequelize.STRING,
    //         [entity + 'state'] : Sequelize.STRING(uf),
    //     };
    // },
    everyoneContact : (Sequelize) => {
        return {
            email : Sequelize.STRING,
            phone : Sequelize.STRING(phone),
        };
    },
    everyoneCost : (Sequelize) => {
        return {
            cost : Sequelize.INTEGER,
        };
    },
    everyoneCreate : (Sequelize) => {
        return {
            createdAt : {
                allowNull : false,
                defaultValue : Sequelize.NOW,
                type : Sequelize.DATE,
            },
            updatedAt : {
                allowNull : false,
                defaultValue : Sequelize.NOW,
                type : Sequelize.DATE,
            },
        }
    },
    everyonePicture : (Sequelize) => {
        return {
            picture : Sequelize.STRING,
        };
    },
    everyoneProfile : (Sequelize) => {
        return {
            title : {
                allowNull : false,
                type : Sequelize.STRING,
            },
            description : {
                allowNull : false,
                defaultValue : description,
                type : Sequelize.TEXT,
            },
        };
    },
    everyoneState : (Sequelize) => {
        return {
            approved : {
                allowNull : false,
                defaultValue : true,
                type : Sequelize.BOOLEAN,
            },
            deleted : {
                allowNull : false,
                defaultValue : false,
                type : Sequelize.BOOLEAN,
            },
            disable : {
                allowNull : false,
                defaultValue : false,
                type : Sequelize.BOOLEAN,
            },
        }
    },
    publicAccess : (Sequelize) => {
        return {
            accesskey : {
                allowNull : false,
                type : Sequelize.STRING,
            },
            password : {
                allowNull : false,
                type : Sequelize.STRING,
            },
            confirmation : {
                allowNull : false,
                type : Sequelize.STRING,
            },
        };
    },
    publicAdd : (Sequelize) => {
        return {
            gender : Sequelize.STRING,
            birthdate : Sequelize.DATE,
            status : Sequelize.STRING,
        };
    },
    publicCompany : (Sequelize, Entity) => {
        return {
            cnpj : Sequelize.STRING(cnpj),
            fantasy : Sequelize.STRING,
            company : Sequelize.STRING,
        };
    },
    publicCurriculum : (Sequelize) => {
        return {
            profession : Sequelize.STRING,
            curriculum : {
                defaultValue : description,
                type : Sequelize.TEXT,
            },
            salary : Sequelize.STRING,
        };
    },
    publicDocument : (Sequelize) => {
        return {
            cnh : Sequelize.STRING(cnh),
            cpf : Sequelize.STRING(cpf),
            passport : Sequelize.STRING(passport),
            rg : Sequelize.STRING(rg),
        };
    },
    publicHobbies : (Sequelize) => {
        return {
        };
    },
    publicLevel : (Sequelize) => {
        return {
            level : Sequelize.INTEGER,
        };
    },
};