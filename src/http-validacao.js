import chalk from "chalk"

function extraiLinks(arrLinks){
    var newArray = arrLinks.map((objetoLink)=> Object.values(objetoLink).join())
    return newArray
}
async function checaLinks(listaLinks){
    const arrStatus = await Promise
    .all(
    listaLinks.map(async (url)=>{
        try {
            const response = await fetch(url)
            return response.status
            
        } catch (erro) {
            return manejaErros(erro)
        }
    })
    
    )
    return arrStatus 
}

function manejaErros(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'link nao encontrado'
    }else{
        return 'ocorreu algum erro'
    }
}

export default async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks)
    const status = await checaLinks(links)
    return listaDeLinks.map((objeto,indice)=>({
        ...objeto,
        status:status[indice]
    }))
}