const fs = require("fs");
const neatCsv = require('neat-csv');

function readCsv() {
    return new Promise((resolve, reject) => {
        fs.readFile("./src/data/data.csv", async (err, data) => {
            if (err) {
                console.error("Provavelmente o arquivo CSV está em falta, ou com o nome diferente de: 'data.csv'. Tente colocar o arquivo na pasta data, ou altere seu nome")
                return
            }
            await neatCsv(data).then(result => {
                resolve(result);
            }).catch(erro => {
                reject(erro);
            });
        })
    })
}

module.exports = readCsv