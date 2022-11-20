const temaPadrao = {
    body_background_color: '#2A2D43',
    article_background_color: '#E4DFDA',
    aside_background_color: '#414361',

    aside_text_color: 'white',
    primary_headers_text_color: 'black',
    second_headers_text_color: '#3f3f3f',
    info_text_color: '#737373',
    text_color: 'black'
}

const temaInvertido = {
    body_background_color: 'white',
    article_background_color: '#414361',
    aside_background_color: '#E4DFDA',

    aside_text_color: '#414361',
    primary_headers_text_color: 'white',
    second_headers_text_color: '#E4DFDA',
    info_text_color: 'white',
    text_color: 'white'
}

let temaAtual = 'padrao';

$(document).ready(() => {
    $("#downloadCurriculo").click(() => {
        window.open('./Resume-Rafael-Mateus-Zimmer-Techio.pdf', '_blank');
    })

    $("#changeTema").click(() => {
        const root = $(':root');

        if(temaAtual == 'padrao') {
            temaAtual = 'invertido';
            root.css('--body-background-color', temaInvertido.body_background_color);
            root.css('--article-background-color', temaInvertido.article_background_color);
            root.css('--aside-background-color', temaInvertido.aside_background_color);

            root.css('--aside-text-color', temaInvertido.aside_text_color);
            root.css('--primary-headers-text-color', temaInvertido.primary_headers_text_color);
            root.css('--second-headers-text-color', temaInvertido.second_headers_text_color);
            root.css('--info-text-color', temaInvertido.info_text_color);
            root.css('--text-color', temaInvertido.text_color);

        } else {
            temaAtual = 'padrao';
            root.css('--body-background-color', temaPadrao.body_background_color);
            root.css('--article-background-color', temaPadrao.article_background_color);
            root.css('--aside-background-color', temaPadrao.aside_background_color);

            root.css('--aside-text-color', temaPadrao.aside_text_color);
            root.css('--primary-headers-text-color', temaPadrao.primary_headers_text_color);
            root.css('--second-headers-text-color', temaPadrao.second_headers_text_color);
            root.css('--info-text-color', temaPadrao.info_text_color);
            root.css('--text-color', temaPadrao.text_color);
        }

        $("#changeTema").html(`Tema: ${temaAtual == 'padrao' ? 'Padrão' : 'Invertido'}`)
        
    })
})