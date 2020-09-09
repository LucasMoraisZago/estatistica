 const nome = document.querySelector('#nome-var')
const nome2 = document.querySelector('#nome-var2')
const dados = document.getElementById("dados")
const resultado = document.getElementById("button")
const tabela = document.getElementById("tabelasvariaveis")
let vetor_final2 = []
let total = 0 
let tira_espaco = /\s*;\s*/; // Tira os espaços entre os ";"


function botaoClique() {

    // COLOCA O NOME DA VARIÁVEL NA TABELA
    nome2.innerHTML = nome.value

    // CRIANDO O VETOR            
    let dados_valores = dados.value            
    let vetor1 = dados_valores.split(tira_espaco)  // Tira os espaços entre os ";"         
    let vetor_final = vetor1.filter(x => x.trim()) // Remove itens vazios do vetor
     // Coloca em ordem
    let conta_numero = 0
    let conta_string = 0
    let organizar_string =[]
    let organizar_numero = []
    for(conteudo of vetor_final){
     let descubra =  parseFloat(conteudo)
        
        if(isNaN(descubra)){
            conta_string ++
            organizar_string.push(conteudo)
        }
        else{
            conta_numero ++
            organizar_numero.push(conteudo)
        }

    }
    if(conta_string == 0){
        vetor_final.sort(function(a, b) {
            return a - b;
          });
          vetor_final
    }
    else if (conta_string > 0 && conta_numero > 0){
        organizar_numero.sort(function(a, b) {
            return a - b;
          });
          organizar_numero
          organizar_string.sort()
         let aux = vetor_final.length
         vetor_final.splice(0,aux)
         for(dado of organizar_string){
             vetor_final.push(dado)
         }
         for(dado of organizar_numero){
            vetor_final.push(dado)
        }
    }
    else{
        vetor_final.sort() 
    }

    // Contando as ocorrências de cada item no vetor 
         
    for (let i = 0; i < vetor_final.length; i++) {
        let valido = true

        if (vetor_final[i] == vetor_final[i-1]) {
            valido = false
        }

        if (valido) {
            let indices = []
            let item = vetor_final[i] 
            let idx = vetor_final.indexOf(item)
            while (idx != -1) {
                indices.push(idx); 
                idx = vetor_final.indexOf(item, idx + 1);
            }

            total += parseInt(indices.length)

            inserir_obj(item, indices.length)
        }
    }

   
    for (let i = 0; i < vetor_final2.length; i++) {
    frequencias(i)
        }
        for (let i = 0; i < vetor_final2.length; i++) {
        //CRIAR LINHA NA TABELA
            let linha = document.createElement('tr')
            tabela.appendChild(linha)
            //CRIAR CÉLULA COM O NOME DO PRIMEIRO ITEM
            let cel1 = document.createElement('td')
            cel1.id = 'celula1'
            cel1.innerText = vetor_final2[i]['nome']
            linha.appendChild(cel1)
            //CRIAR CÉLULA COM A QUANTIDADE ENCONTRADA
            let cel2 = document.createElement('td')
            cel2.id = 'celula2'
            cel2.innerText = vetor_final2[i]['valor']
            linha.appendChild(cel2) 
             //CRIAR CÉLULA COM A Frequencia Relativa
            let cel3 = document.createElement('td')
            cel3.id = 'celula3'
            cel3.innerText = vetor_final2[i]['Frequencia relativa']
            linha.appendChild(cel3)
            //CRIAR CÉLULA COM A Frequencia Acumulativa
            let cel4 = document.createElement('td')
            cel4.id = 'celula4'
            cel4.innerText = vetor_final2[i]['Frequencia acumulada']
            linha.appendChild(cel4)
            //CRIAR CÉLULA COM A Frequencia relativa Acumulativa
            let cel5 = document.createElement('td')
            cel5.id = 'celula5'
            cel5.innerText = vetor_final2[i]['Frequencia relativa acumulada']
            linha.appendChild(cel5)
        }
    }
    


resultado.addEventListener('click', botaoClique)

function inserir_obj(dado,quantidade){
let obj = {
nome:  dado,
valor: quantidade
}
vetor_final2.push(obj)
}
function frequencias (i){
let  aux = (i - 1)
        if(aux < 0 ){
        let a = (vetor_final2[i].valor/total) * 100
        vetor_final2[i]['Frequencia relativa'] = a
        let b = vetor_final2[i].valor
        vetor_final2[i]['Frequencia acumulada'] = b 
        let c = vetor_final2[i]['Frequencia relativa'] 
        vetor_final2[i]['Frequencia relativa acumulada'] = c
        }
        else{
        let a = (vetor_final2[i].valor/total) * 100
        vetor_final2[i]['Frequencia relativa'] = a
        let b = (vetor_final2[i].valor) + (vetor_final2[aux]['Frequencia acumulada'])
        vetor_final2[i]['Frequencia acumulada'] = b; 
        let c = (vetor_final2[i]['Frequencia relativa']) + (vetor_final2[aux]['Frequencia relativa acumulada'])
        vetor_final2[i]['Frequencia relativa acumulada'] = c
}
}
