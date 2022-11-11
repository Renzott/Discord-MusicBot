const birthday = require("./birthday");

function RegisterWorkers(client){
    birthday(client);
}

module.exports = {
    RegisterWorkers
}