function atividade1() {
    const optionSelected = $('input[name=tipo]:checked').val()
    const value = $(".form1 #valor").val()
    const periodo = $(".form1 #periodo").val()
    const porcentagem = $(".form1 #porcentagem").val()
    const divResposta = $(".form1 .resposta");
    let resposta;
    if(optionSelected == 'calculaPV'){
        resposta = (value / Math.pow((1 + (porcentagem / 100)), periodo)).toFixed(2)
    } else {
        resposta = (value * Math.pow((1 + porcentagem / 100), periodo)).toFixed(2);
    }

    divResposta.html(resposta)
}

function atividade2() {
    const capital = $('.form2 #capital').val();
    const periodo = $('.form2 #periodo').val();
    const taxaJuros = $('.form2 #taxaJuros').val();

    const divResposta = $(".form2 .resposta");
    
    divResposta.html(capital * (1 + ((taxaJuros / 100) * periodo)).toFixed(2))
}

function atividade3() {
    const texto = $('.form3 #texto').val();

    const divResposta = $(".form3 .resposta");

    divResposta.html(texto.split('').map((letter, index) => {
        let spaces = "";
        for(let i = 0; i<index; i++){
            spaces = spaces.concat("&nbsp;&nbsp;");
        }

        return `${spaces}${letter}<br>`
    }).join(""))

}

function atividade4() {
    let number = Number($('.form4 #number').val());
    const divResposta = $(".form4 .resposta");

    let binario = "";
    let currentBase = Math.pow(2, 100);
    for(currentBase; currentBase >= 1; currentBase = currentBase / 2){
        if(number >= currentBase){
            binario = `${binario}1`;
            number = number - currentBase;
        }else {
            if(binario.length>=1){
                binario = `${binario}0`;
            }
        }
    }

    divResposta.html(binario);

}

$(document).ready(() => {
    $("button").click(function (event) {
        event.preventDefault()
        const className = $(this).parent().attr('class');
        const number = className[className.length - 1]
        
        switch(number) {
            case '1':
                atividade1()
                break;
            case '2':
                atividade2()
                break;
            case '3':
                atividade3()
                break;
            case '4':
                atividade4()
                break;
        }


    })
})