const axios = require('axios')
const ProgressBar = require('ascii-progress')

module.exports = async function caseReader(caseList) {

    let cases = []

    const  bar = new ProgressBar({ 
        schema: 'Atual: :current Total: :total Faltam: :eta segundos  Decorrido: :elapsed segundos',
        total : caseList.length 
    })

    for(let i = 0 ; i < caseList.length; i++ ) {
        
        const url = `http://esaj.tjsp.jus.br${caseList[i].path}`
        const { data, status } = await axios.get(url)
        
        if ( !data || status != 200 ) {
            return 
        }

        const classRegex = />((Reclamação|Procedimento|Teste|Carta|Homologação|Busca|Consignação|Execução|Embargos|Requerimento|Tutela|Cumprimento|Recuperação|Produção|Usucapião|Reintegração|Monitória|Alvará)[\s\wéáàóòíòèãõ-]*)/gi
        const areaRegex = /(Área|Area):<\/span>\s*([\wéáàóòíòèãõ-]+)/gi
        const subjectRegex = /Assunto:<\/label>\s*[\s<\/\w>="]+<span id="" class="">([\wçãõíáéóôâ\s\/\\]+)/gi
        const divisionRegex  = /Distribuição:<\/label.\s*[\w\s<>\/\\=""]+<span id="" class="">([\w\s\/\\àásóòôíôâ:\(\).ºªê-]+)<\/span>\s*[\w\s<>\/\\=""]+<span id="" class="">([\s\wúáóíéàèìòùãõâçôîªºûê\(\)=":&;-]+)/gi
        const controlRegex = /\d{4}\/\d{6}/
        const judgeRegex = /Juiz:<\/label>\s*[\w<\/\\>\s="]+<span id="" class="">([\w\sóáéíúãõâôêîç]+)/gi
        const valueRegex = /Valor da ação:<\/label>\s*[\w\sç<>\/\\="$]+\s+([\d.,]*)/gi
        const applicantRegex = /(Reqte:&nbsp;|Exeqte:&nbsp;|Embargte:&nbsp;|Autor:&nbsp;|Reclamante:&nbsp;|Autora:&nbsp;|Imptte:&nbsp;|Apelte:&nbsp;)[\w\s<\/\\>="*:-]*>\s+([\w \/\\ãàásóÉÍòôíéêôâ:\(\).ºªê)+]+)/g
        //const appLawRegex = /(Reqte:&nbsp;|Exeqte:&nbsp;|Embargte:&nbsp;)[\w\s<\/\\>="*:-]*>[\s\wúáóíéàèìòùãõâçôîûê<\/\\>=":&;]+<\/span>\s*([\wz ásóòôãíôâ]*)/g
        const requiredRegex = /(Reqda:&nbsp;|Reqdo:&nbsp;|Exectdo:&nbsp;|Exectda:&nbsp;|Embargda:&nbsp;|Ré:&nbsp;|Réu:&nbsp;|Reclamado:&nbsp;|Reclamada:&nbsp;|Imptdo:&nbsp;|Apeldo:&nbsp;)<\/span>\s+<\/td>\s+<td width="\*" align="left" style="padding-bottom: 5px">\s+([\wz áúáóíéàèìòùãõâçôîûê\/\\ç]+)/g
        
        const classFinal = classRegex.exec(data)  
        const areaFinal = areaRegex.exec(data)
        const subjectFinal = subjectRegex.exec(data)
        const divisionFinal = divisionRegex.exec(data)
        const constrolFinal = controlRegex.exec(data)
        const judgeFinal = judgeRegex.exec(data)
        const valueFinal = valueRegex.exec(data)
        const applicantFinal = applicantRegex.exec(data)
        //const appLawFinal = appLawRegex.exec(data)
        const requiredFinal= requiredRegex.exec(data)
        let juiz = ""
        let valor = ""
        let requerinte = ""

        if(judgeFinal != null ) {
            juiz = judgeFinal[1]
        } else {
            juiz = "não encontrado"
        }

        if(valueFinal != null) {
            valor = valueFinal[1]
        } else {
            valor = "não encontrado"
        }

        if(requiredFinal != null ) {
            requerinte = requiredFinal[2]
        } else {
            requerinte = "não encontrado"
        }




        let  readCase = {
            "document": caseList[i].document,
            "class": classFinal[1],
            "area": areaFinal[2],
            "subject": subjectFinal[1],
            "division": divisionFinal[1] ,
            "details": divisionFinal[2],
            "control": constrolFinal[0],
            "judge": juiz,
            "value": `R$ ${valor}` ,
            "applicant": applicantFinal[2],
            "appLawyer": "desenvolvimento",
            "required": requerinte,
            "client": caseList[i].client
        } 
        console.log(readCase)
        cases.push(readCase)
        bar.tick()
    }

    return cases
    
}