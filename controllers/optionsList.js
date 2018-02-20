const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async function optionList() {
    let options = []

    const url = 'http://esaj.tjsp.jus.br/cpopg/search.do?conversationId=&dadosConsulta.localPesquisa.cdLocal=100&cbPesquisa=NMPARTE&dadosConsulta.tipoNuProcesso=UNIFICADO&dadosConsulta.valorConsulta=motorola&uuidCaptcha=&pbEnviar=Pesquisar'
    const { data, status } = await axios.get(url)

    if (!data || status != 200){
        return 
    }

    let $ = cheerio.load(data)

    $('#id_Foro option').each(function () {
        options.push($(this).attr('value'))
    })
    
    return options
}