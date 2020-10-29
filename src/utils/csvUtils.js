const { rejects } = require("assert");
const fs = require("fs");
const neatCsv = require('neat-csv');

function readCsv() {
    return new Promise((resolve, reject) => {
        fs.readFile("./src/data/data.csv", async (err, data) => {
            if (err) {
                console.error(err)
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