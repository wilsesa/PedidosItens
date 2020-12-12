function SalvarPedido() {

    //Data
    var data = $("#Data").val();

    //Cliente
    var cliente = $("#Cliente").val();
        
    //Valor
    var valor = $("#Valor").val();

    var token = $('input[name="_RequestVerificationToken"]').val();
    var tokenadr = $('form[action="/Pedido/Create"] input[name="_RequestVerificationToken"]').val();
    var headers = {};   
    var headersadr = {};
    headers['_RequestVerificationToken'] = token;
    headersadr['_RequestverificationToken'] = tokenadr;

    //Gravar    
    var url = "/Pedido/Create"; 

    $.ajax({
        url: url
        , type: "Post"
        , dataType: "json"
        , headers: headersadr
        , data: { Id: 0, Data: data, Cliente: cliente, Valor: valor, _RequestVerificationToken: token }
        , success: function (data) {
            if (data.Resultado > 0) {
                ListarItens(data.Resultado);
            }
        }
    });
}

function ListarItens(idPedido) {

    var url = "/Itens/ListarItens";

    $.ajax({
        url: url
        , type: "GET"
        , data: { Id: idPedido }
        , dataType: "html"
        , success: function (data) {
            var divItens = $("#divItens");
            divItens.empty();
            divItens.show();
            divItens.html(data);
        }
    });
}

function SalvarItens() {
    var quantidade = $("#Quantidade").val();
    var produto = $("#Produto").val();
    var valorUnitario = $("#ValorUnitario").val();
    var idPedido = $("#idPedido").val();

    var url = "/Itens/SalvarItens";

    $.ajax({
        url: url
        , data: { quantidade: quantidade, produto: produto, valorUnitario: valorUnitario }
        , type: "GET"
        , dataType: "html"
        , success: function (data) {
            if (data.Resultado > 0) {
                ListarItens(idPedido);
            }
        }
    })
}