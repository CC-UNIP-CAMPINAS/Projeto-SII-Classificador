module.exports = class Calculator {
    constructor(w1 = 0.1, w2 = 0.1, wv = 0.1) {
        this.w1 = w1;
        this.w2 = w2;
        this.wv = wv;
        this.variacao = 0.2;
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
        let arrayDeltaW = [this.w1 += dw_1, this.w2 += dw_2, this.wv += dw_v];
        
        this.w1 = dw_1;
        this.w2 = dw_2;
        this.wv = dw_v;
        console.log(this.w1);
        return arrayDeltaW;
    }
}