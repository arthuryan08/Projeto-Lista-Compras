class Produto{

    constructor(){
        this.id = 0
        this.nomeProduto = ''
        this.valor = 0
    }

    adicionar(){
        alert('metodo adicionar foi chamado')
    }

    excluir(){
        alert('metodo excluir foi chamado')
    }
}
var produto = new Produto()