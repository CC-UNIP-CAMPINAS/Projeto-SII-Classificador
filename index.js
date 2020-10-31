const readCsv = require("./src/utils/csvUtils");
const Registro = require("./src/entities/Registro");
const Calculator = require("./src/entities/Calculator");
const round = require("./src/utils/mathUtils")

function app() {
    readCsv().then(value => {
        let arrayOfCsv = value;
        let calculadora = new Calculator();
        let arrayRegistros = [];

        arrayOfCsv.forEach(e => {
            let registro = new Registro(e.x1, e.x2, e.classe);
            arrayRegistros.push(registro);
        });

        let x_min = arrayRegistros.reduce((a, b) => {
            if (round(b.x1, 1) < round(a.x1, 1)) a = b;
            return a;
        });

        let x_max = arrayRegistros.reduce((a, b) => {
            if (round(b.x1, 1) > round(a.x1, 1)) a = b;
            return a;
        });

        let w1_comp = 0.1;
        let w2_comp = 0.1;
        let wv_comp = 0.1;

        let vezes = 1;
        while (calculadora.pontoParada) {
            let numCont = 0;
            for (let index = 0; index < arrayRegistros.length; index++) {
                let registro = arrayRegistros[index];
                let delta_w = calculadora.delta_w(registro);
                registro.setWs(delta_w[0], delta_w[1], delta_w[2])

                console.log("delta_w: " + delta_w);
                console.log("Execução: " + vezes++);
                console.log("Classe do registro: " + registro.classe);
                console.log("index: " + (index + 1));
                console.log("length: " + arrayRegistros.length);
                console.log();

                numCont += registro.comparaW(w1_comp, w2_comp, wv_comp);

                w1_comp = registro.w1;
                w2_comp = registro.w2;
                wv_comp = registro.wv;

                if ((index + 1) === arrayRegistros.length) {
                    if (numCont === arrayRegistros.length) {
                        calculadora.pontoParada = false;
                    }
                    else {
                        //calculadora.diminuiTX();
                    }
                }
            }
        }
        let pontosParaReta = calculadora.calculaReta(arrayRegistros[0], (+x_max.x1 + 5), (x_min.x1 - 5));
        console.log(pontosParaReta);
    });
}

app();