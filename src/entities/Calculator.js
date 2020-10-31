module.exports = class Calculator {
    constructor(w1 = 0.1, w2 = 0.1, wv = 0.1) {
        this.w1 = w1;
        this.w2 = w2;
        this.wv = wv;
        this.variacao = 0.05; //Alterar se for preciso
        this.pontoParada = true;
    }

    net(registro) {
        let somador = 0;
        somador += this.w1 * registro.x1;
        somador += this.w2 * registro.x2;
        somador += this.wv * registro.xv;
        return somador;
    }

    y(registro) {
        return this.net(registro) <= 0 ? 0 : 1;
    }

    delta(registro) {
        return registro.classe - this.y(registro);
    }

    delta_w(registro) {
        let dw_1 = this.variacao * this.delta(registro) * registro.x1;
        let dw_2 = this.variacao * this.delta(registro) * registro.x2;
        let dw_v = this.variacao * this.delta(registro) * 1;
        this.w1 += dw_1;
        this.w2 += dw_2;
        this.wv += dw_v;
    }

    calculaReta(x_max, x_min) {
        let y_max = ((-this.w1 / this.w2) * x_max) - (this.wv / this.w2);
        let y_min = ((-this.w1 / this.w2) * x_min) - (this.wv / this.w2);
        return [{ x: x_max, y: y_max }, { x: x_min, y: y_min }];
    }

    diminuiTX() {
        this.variacao -= (this.variacao * 0.05);
    }

    comparaW(w1, w2, wv) {
        if (this.w1 == w1 && this.w2 == w2 && this.wv == wv) {
            return 1;
        }
        else {
            return 0;
        }
    }

    response(x_max, x_min) {
        let pontos = this.calculaReta(x_max, x_min)
        return `Pesos finais: \n\nw1: ${this.w1} \nw2: ${this.w2} \nwv: ${this.wv}\n\nA resta cruza os pontos: \n\n(${pontos[0].x}, ${pontos[0].y}) e (${pontos[1].x}, ${pontos[1].y})`
    }
}