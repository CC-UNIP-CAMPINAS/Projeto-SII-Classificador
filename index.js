const readCsv = require("./src/utils/csvUtils");
const Registro = require("./src/entities/Registro");
const Calculator = require("./src/entities/Calculator")

function app() {
    readCsv().then(value => {
        let arrayOfCsv = value;
        let calculadora = new Calculator();
        let arrayRegistros = [];
        arrayOfCsv.forEach(e => {
            let registro = new Registro(e.x1, e.x2, e.classe);
            arrayRegistros.push(registro);
        });

        let w1_comp = 0.1;
        let w2_comp = 0.1;
        let wv_comp = 0.1;
        let numCont = 0;
        while (calculadora.pontoParada) {
            for (let index = 0; index < arrayRegistros.length; index++) {
                let registro = arrayRegistros[index];
                let delta_w = calculadora.delta_w(registro);
                registro.setWs(delta_w[0], delta_w[1], delta_w[2])
                console.log("delta_w: " + delta_w);
                console.log();

                numCont += registro.comparaW(w1_comp, w2_comp, wv_comp);

                if (index + 1 === arrayRegistros.length) {
                    if (numCont === arrayRegistros.length) {
                        calculadora.pontoParada = false;
                    }
                    else{
                        w1_comp = registro.w1;
                        w2_comp = registro.w2;
                        wv_comp = registro.wv;
                    }
                }
            }
        }
    });
}

app();