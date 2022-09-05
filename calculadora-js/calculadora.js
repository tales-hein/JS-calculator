let arrayInput = [];
let viewInput = [];
let expressao = [];
let result = 0;
let indexPOW = [];
let indexSQRT = [];
let indexPORCENT = [];
let indexFATORIAL = [];
let indexEXP = [];
let indexLOG = [];
let arrayBasesPOW = [];
let arrayBasesSQRT = [];
let arrayBasesPORCENT = [];
let arrayBasesFATORIAL = [];
let arrayBasesEXP = [];
let arrayBasesLOG = [];
let operadores = ["+", "-", "*", "/"];
let elmtPOW = "^(";
let elmtSQRT = "Sqrt(";
let elmtPORCENT = "%";
let elmtFATORIAL = "!";
let elmtEXP = "Exp(";
let elmtLOG = "Log(";

function pegarResult() {
    document.getElementById("result").innerHTML = "";
    document.getElementById("view").innerHTML = result;
    arrayInput.splice(0, arrayInput.length);
    arrayInput.push(result);
}

function apagaTudo() {
    arrayInput.splice(0, arrayInput.length);
    result = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("view").innerHTML = "";
}

function backspace() {
    arrayInput.pop();
    return atualizadorView();
}

function showResult(result) {
    document.getElementById("result").innerHTML = "= " + result;
}

function atualizadorView() {
    let arrayView = arrayInput;
    document.getElementById("view").innerHTML = arrayView.join('');
    return filtrarInput();
}

function lerInput(x) {
    arrayInput.push(x);
    viewInput.push(x);
    return atualizadorView();
}

function filtrarInput() {
    arrayInput.forEach((element, index) => {
        if (element == elmtPOW) indexPOW.push(index);
        if (element == elmtSQRT) indexSQRT.push(index);
        if (element == elmtPORCENT) indexPORCENT.push(index);
        if (element == elmtLOG) indexLOG.push(index);
        if (element == elmtEXP) indexEXP.push(index);
        if (element == elmtFATORIAL) indexFATORIAL.push(index);
    })
    return bases();
}

function bases() {
    let expressao = arrayInput.join('');
    
    indexPOW.forEach(index => {
        let countParenteses = 0;
        let indexAnterior = index - 1;
        let base = [];
        let isOperador = false;
        let isPotencia = false;

        while (indexAnterior >= 0) {
            if (arrayInput[indexAnterior] == ")") {
                countParenteses++;
            }
            if (arrayInput[indexAnterior] == "(") {
                countParenteses--;
            }
            operadores.forEach( operador => {
                if (arrayInput[indexAnterior] == operador) isOperador = true;
            })
            if (arrayInput[indexAnterior] == elmtPOW) {
                isPotencia = true;
            }
            if(((isOperador == true) && (countParenteses == 0)) || (isPotencia == true)) {
                break;
            }
            base.unshift(arrayInput[indexAnterior]);
            indexAnterior--;    
        }
        arrayBasesPOW.push(base.join(''));
    })

    arrayBasesPOW.forEach(base => {
        let substituir = base + elmtPOW;
        let substituto = "Math.pow(" + base + ",";
        expressao = expressao.replace(substituir, substituto);
    })

    indexSQRT.forEach(index => {
        let base = [];
        let indexPosterior = index + 1;
        let isParenteses = false;

        while (indexPosterior <= arrayInput.length) {
            if (arrayInput[indexPosterior] == ")") {
                isParenteses = true;
            }
            if(isParenteses == true) {
                break;
            }
            base.push(arrayInput[indexPosterior]);
            indexPosterior++; 
        }
        arrayBasesSQRT.push(base.join(''));
    })

    arrayBasesSQRT.forEach(base => {
        let substituir =  elmtSQRT + base;
        let substituto = "Math.sqrt(" + base;
        expressao = expressao.replace(substituir, substituto);
    })

    indexPORCENT.forEach(index => {
        let base = [];
        let indexAnterior = index - 1;
        let isOperador = false;
        
        while (indexAnterior >= 0) {
            operadores.forEach( operador => {
                if (arrayInput[indexAnterior] == operador) isOperador = true;
            })
            if(isOperador == true) {
                break;
            }
            base.unshift(arrayInput[indexAnterior]);
            indexAnterior--;
        }
        arrayBasesPORCENT.push(base.join(''));
    })

    arrayBasesPORCENT.forEach(base => {
        let substituir =  base + elmtPORCENT;
        let substituto = base + "*1/100";
        expressao = expressao.replace(substituir, substituto);
    })

    indexLOG.forEach(index => {
        let base = [];
        let indexPosterior = index + 1;
        let isParenteses = false;

        while (indexPosterior <= arrayInput.length) {
            if (arrayInput[indexPosterior] == ")") {
                isParenteses = true;
            }
            if(isParenteses == true) {
                break;
            }
            base.push(arrayInput[indexPosterior]);
            indexPosterior++; 
        }
        arrayBasesLOG.push(base.join(''));
    })

    arrayBasesLOG.forEach(base => {
        let substituir =  elmtLOG + base;
        let substituto = "Math.log(" + base;
        expressao = expressao.replace(substituir, substituto);
    })

    indexEXP.forEach(index => {
        let base = [];
        let indexPosterior = index + 1;
        let isParenteses = false;

        while (indexPosterior <= arrayInput.length) {
            if (arrayInput[indexPosterior] == ")") {
                isParenteses = true;
            }
            if(isParenteses == true) {
                break;
            }
            base.push(arrayInput[indexPosterior]);
            indexPosterior++; 
        }
        arrayBasesEXP.push(base.join(''));
    })

    arrayBasesEXP.forEach(base => {
        let substituir =  elmtEXP + base;
        let substituto = "Math.exp(" + base;
        expressao = expressao.replace(substituir, substituto);
    })

    indexFATORIAL.forEach(index => {
        let base = [];
        let indexAnterior = index - 1;
        let isParenteses = false;
        let isOperador = false;
        let isFatorial = false;

        while (indexAnterior >= 0) {
            operadores.forEach( operador => {
                if (arrayInput[indexAnterior] == operador) isOperador = true;
            })
            if (arrayInput[indexAnterior] == ")") {
                isParenteses = true;
            }
            if (arrayInput[indexAnterior] == "(") {
                isParenteses = true;
            }
            if (isOperador == true || isFatorial == true || isParenteses == true) {
                break;  
            }
            base.unshift(arrayInput[indexAnterior]);
            indexAnterior--;
        }
        arrayBasesFATORIAL.push(base.join(''));
    })

    arrayBasesFATORIAL.forEach(base => {
        let fatorial = [base];
        let substituir = base + "!";
        for (let contador = base - 1; contador > 0; contador--) {
            fatorial.push("*" + contador);
        }
        let substituto = fatorial.join('');
        expressao = expressao.replace(substituir, substituto);
    })
    result = eval(expressao);    
    return showResult(result);
}