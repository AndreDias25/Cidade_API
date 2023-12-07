document.getElementById("estados").addEventListener("change", function () {
    var estadoSelecionado = this.value;
    console.log("Opção selecionada:", estadoSelecionado);
    listarporEstado(estadoSelecionado)
});

document.getElementById("procurarCidade").addEventListener("click", () => {
    valorCidade = document.getElementById("cidadeInput").value;
    console.log("Cidade:"+valorCidade);
    infoCidade(valorCidade);
})

function listar(){
    const url = "http://localhost:5500/consulta";

    const options = {
        method: 'GET'
    }

    fetch(url, options)
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error("Erro na requisição dos dados" + response.status);
            }
        }).then(data => {
            console.log("Os dados da API:", data)
            console.log("Número de registros recebidos:", data.length);
        })
        .catch(error => {
            console.log("Erro na solicitação da API: ", error)
        })
}

function listarporEstado(estado){
    const url = `http://localhost:5500/consulta/estado/${estado}`;

    const options = {
        method: 'GET'
    }

    fetch(url, options)
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error("Erro na requisição dos dados" + response.status);
            }
        }).then(data => {
            console.log("Os dados da API:", data)
            console.log("Número de registros recebidos:", data.length);

             const listaCidades = document.getElementById('listaCidades');
             listaCidades.innerHTML = '';
 
             data.forEach(cidade => {
                 adicionarCidadeNaLista(cidade['municipio-nome']);
             });
        })
        .catch(error => {
            console.log("Erro na solicitação da API: ", error)
        })

    function adicionarCidadeNaLista(nomeCidade) {
        const itemLista = document.createElement('li');
        itemLista.textContent = nomeCidade;
        document.getElementById('listaCidades').appendChild(itemLista);
    }
}

function infoCidade(cidade){
    const url = `http://localhost:5500/consulta/cidade/${cidade}`;

    const options = {
        method: 'GET'
    }

    fetch(url, options)
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error("Erro na requisição dos dados" + response.status);
            }
        }).then(data => {
            console.log("Os dados da API:", data)
            console.log("Número de registros recebidos:", data.length);

            document.getElementById('municipio').value = data[0]['municipio-nome'];
            document.getElementById('regiaoMetropolitana').value = data[0]['mesorregiao-nome'];
            document.getElementById('sigla').value = data[0]['UF-sigla'];
            document.getElementById('estado').value = data[0]['UF-nome'];
            document.getElementById('regiao').value = data[0]['regiao-nome'];
        })
        .catch(error => {
            console.log("Erro na solicitação da API: ", error)
        })
}