function calcularExercicio1(){
    const base =  Number(document.getElementById('base').value);
    let comeco = Number(document.getElementById('comeco').value);
    let fim = Number(document.getElementById('fim').value);

    let contas = [];

    if(fim < comeco){
        for(let i = comeco; i >= fim; i--){
            contas.push(`${base} x ${i} = ${base * i}`)
        }
    }else{
        for(let i = comeco; i <= fim; i++){
            contas.push(`${base} x ${i} = ${base * i}`)
        }
    }
    
    document.getElementById('resultado').innerHTML = contas.join("<br>")

    return false;
}

function calcularExercicio2(){
    const base =  String(document.getElementById('base').value);
    
    const divResultado = document.getElementById('resultado');

    if(!base || base.length == 1){
        divResultado.innerHTML = 'Número possui um único ou nenhum dígito'
    }else{
        const numeroNormal = Number(base);
        const numeroInvertido = Number(base.split('').reverse().join(""));

        if(numeroInvertido == numeroNormal){
            divResultado.innerHTML = "O número é palíndromo";
        }else{
            divResultado.innerHTML = "O número não é palíndromo";
        }
    }

    return false;
}

function calcularExercicio3(){
    const base =  Number(document.getElementById('base').value);

    let numeros = [];

    for(let i = 1; i < base; i++) {
        numeros.push(i);

        if(i % 3 == 0){
            numeros.push('PI');
        }
    }

    document.getElementById('resultado').innerHTML = numeros.join(" - ")

    return false;
}


function calcularExercicio4(){
    const alturaAzulejo =  Number(document.getElementById('AlturaAzulejo').value);
    const larguraAzulejo =  Number(document.getElementById('LarguraAzulejo').value);
    const alturaParede =  Number(document.getElementById('AlturaParede').value);
    const larguraParede =  Number(document.getElementById('LarguraParede').value);

    const areaAzulejo = alturaAzulejo * larguraAzulejo;
    const areaParede = alturaParede * larguraParede;

    let numeroAzulejos = areaParede / areaAzulejo;

    numeroAzulejos += numeroAzulejos * 0.05;
    numeroAzulejos = Math.ceil(numeroAzulejos)

    document.getElementById('resultado').innerHTML = `
        Área da parede: ${areaParede} cm<br>
        Área do azulejo: ${areaAzulejo} cm<br>
        Quantidade necessária + 5%: ${numeroAzulejos}<br>
    `

    return false;
}