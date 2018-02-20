/*
*
Crawler Mediação Online - By Guilherme Caruso
*
*/
const fs = require('fs')
const { Search } = require('./models')

//Funções de retorno
const optionList = require('./controllers/optionsList')
const caseFilter = require('./controllers/caseFilter')
const caseReader = require('./controllers/caseReader')

//Definição do periodo (mm/dd/aaaa)
const lDate = new Date('02/01/2018')
const hDate = new Date('02/16/2018')

//Definição de buscas
const urlPath = [
    'EMS'
]

//Função de busca
async function crawler() {
    const optionsList = await optionList()
    const caseList = await caseFilter(optionsList, urlPath, hDate, lDate )
    console.log(caseList)
    return await caseReader(caseList)
}

//Run
crawler().then(r => {
    Search.bulkCreate(r)
 })