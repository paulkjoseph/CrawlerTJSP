const axios = require('axios')
const cheerio = require('cheerio')
const _ = require('lodash')
const ProgressBar = require('ascii-progress')

module.exports =  async function caseFilter (id, name, hDate, lDate) {
    
    let cases = []

    const  bar = new ProgressBar({ 
        schema: 'Atual: :current Total: :total Faltam: :eta segundos  Decorrido: :elapsed segundos',
        total : name.length * id.length 
    })

    for(let n = 0; n < name.length; n++){
        for(let i = 0; i < id.length; i++){
            bar.tick()
            const url = `http://esaj.tjsp.jus.br/cpopg/search.do?conversationId=&dadosConsulta.localPesquisa.cdLocal=${id[i]}&cbPesquisa=NMPARTE&dadosConsulta.tipoNuProcesso=UNIFICADO&dadosConsulta.valorConsulta=${name[n]}&uuidCaptcha=&pbEnviar=Pesquisar`
            
            const { data, status} = await axios.get(url)

            if (!data || status != 200) {
                return 
            }

            const regex = / Atributos -->[\s]+<a href="([\w\/.?=!@#$%¨&*()]+)".+\s+([\w.-]+)\s+[\s\w<\/*-+=*&¨%$#@!\(\)>"'éáàóòíòèãõç;.ôâê:-]+[Recebido em:]<\/span>\s*(\d{2}\/\d{2}\/\d{4})/gm
           
            let matches
            
            while((matches = regex.exec(data)) !== null) {
                if (matches.index === regex.lastIndex) {
                    regex.lastIndex++
                }
                
                let caseDetail = {"path": matches[1], "document": matches[2], "date": matches[3], "client": name[n]}

                const dateReturn =  matches[3].split('/')
                const finalDate = new Date(String(dateReturn[1]+"/"+dateReturn[0]+"/"+dateReturn[2]))
                
                if (finalDate >= lDate && finalDate <= hDate) {

                    cases.push(caseDetail)
                }
            }
        }
    }
    return cases
}