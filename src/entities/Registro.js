class Registro {
    constructor(x1, x2, classe) {
        this.x1 = x1;
        this.x2 = x2;
        this.xv = 1;
        this.w1 = 0.1;
        this.w2 = 0.1;
        this.wv = 0.1;
        this.classe = classe;
    }

    setWs(w1, w2, wv) {
        this.w1 = w1;
        this.w2 = w2;
        this.wv = wv;
    }

    comparaW(w1, w2, wv) {
        if (this.w1 == w1 && this.w2 == w2 && this.wv == wv) {
            return 1;
        }
        else {
            return 0;
        }
    }
}

module.exports = Registro;