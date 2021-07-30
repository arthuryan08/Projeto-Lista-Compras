class Produto{

    constructor(){
        this.id = 1
        this.arrayProdutos = []
        this.editId = null
    }

    salvar(){
        let produto = this.lerDados()

        if (this.validaCampos(produto) == true) {
            if(this.editId == null){
                this.adicionar(produto);
            } else{
                this.atualizar(this.editId,produto)
            }
        }
        this.listaTabela()
        this.cancelar()
    }

    listaTabela(){
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for(let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_preco = tr.insertCell()
            let td_acao = tr.insertCell()

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_preco.innerText = this.arrayProdutos[i].preco;

            td_id.classList.add('center')        //Aqui colocando uma classe dinamicamente dentro da minha coluna

            let imgEdit = document.createElement('img') //criando a tag img
            imgEdit.src = 'img/edit.png'           //escolhendo o que vai ser a imagem
            imgEdit.setAttribute('onclick', 'produto.preparaEdicao('+ JSON.stringify(this.arrayProdutos[i]) +')')
            td_acao.appendChild(imgEdit) //colocando onde vai ficar essa tag img, no caso <td><img></td>
            
            let imgDel = document.createElement('img')
            imgDel.src = 'img/delete.png'
            imgDel.setAttribute('onclick','produto.deletar('+ this.arrayProdutos[i].id +')')   //Comando setAttribute('evento','ação')
            td_acao.appendChild(imgDel)
        }
    }
    adicionar(produto){
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto)
    }

    atualizar(id, produto){
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].preco = produto.preco
            }
            
        }
    }

    preparaEdicao(dados){
        this.editId = dados.id
        document.getElementById('produto').value = dados.nomeProduto
        document.getElementById('preco').value = dados.preco
    
        document.getElementById('btn1').innerText = 'Atualizar'
    }

    lerDados(){
        let produto = {}
        produto.id = this.id++;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;
        return produto
    }

    validaCampos(produto){
        let msg = ''
        if (produto.nomeProduto == '') {
            msg += '- Informe o nome do produto\n'
        }
        if (produto.preco == '') {
            msg += '- Informe o preço do produto\n'
        }
        if (msg != '') {
            alert(msg)
            return false
        }
        return true;
    }

    cancelar(){
        document.getElementById('produto').value = ''
        document.getElementById('preco').value = ''

        document.getElementById('btn1').innerText = 'Salvar'
        this.editId = null
    }

    deletar(id){
        if (confirm(`Deseja realmente deletar o produto de ID: ${id}?`)){ 
            let tbody = document.getElementById('tbody')
    
            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
        }
    }
}
var produto = new Produto() 