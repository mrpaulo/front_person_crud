class Utils {
    static retiraFormatCPF(cpfFormat) {
        let cpf = cpfFormat.replace(".", "").replace(".", "").replace("-", "");
        return cpf
    }

    static validaErroCPF(cpfFormat) {
        let strCPF = this.retiraFormatCPF(cpfFormat)
        var erro = false;
        var Soma;
        var Resto;
        Soma = 0;
        if ((strCPF == "00000000000") || (strCPF == "11111111111") || (strCPF == "22222222222") || (strCPF == "33333333333") || (strCPF == "44444444444") || (strCPF == "55555555555") || (strCPF == "66666666666") || (strCPF == "77777777777") || (strCPF == "88888888888") || (strCPF == "99999999999") ||
            (strCPF.length != 11)) erro = true;

        for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) erro = true;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) erro = true;
        

        return erro;
    }
    static formataCPF (cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    static formataData(data) {
        var dataArray = data.split("-");
        var result = dataArray[2] + "/" + dataArray[1] + "/" + dataArray[0]
        return result
    }
    static validaErroEmail(email) {
        var erro = false;
        var parse_email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

        if (email && (email.length !== 0) && (!parse_email.test(email))){
            erro = true
        }
        
        return erro
    }
    static validaErroData(dataNascimentoPar) {
        var date = this.formataData(dataNascimentoPar)
        var ardt = [];
        var ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
        ardt = date.split("/");
        var erro = false;
        var dataNascimento = new Date(dataNascimentoPar)
        var hoje = new Date()

        if (dataNascimento > hoje) {
            erro = true
        }

        if (date.search(ExpReg) === -1) {
            erro = true;
        }
        else if (((ardt[1] === 4) || (ardt[1] === 6) || (ardt[1] === 9) || (ardt[1] === 11)) && (ardt[0] > 30))
            erro = true;
        else if (ardt[1] === 2) {
            if ((ardt[0] > 28) && ((ardt[2] % 4) !== 0))
                erro = true;
            if ((ardt[0] > 29) && ((ardt[2] % 4) === 0))
                erro = true;
        }
        return erro;
    }
}
export default Utils;