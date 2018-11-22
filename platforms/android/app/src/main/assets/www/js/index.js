/*
 
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


$(document).ready(function() {
  
  var $password = $('#user-password');
  var $showPass = $('#show-password');
  
  $showPass.on('click', function() {
    $showPass.is(':checked') ? $password.prop('type', 'text') : $password.prop('type', 'password');
  });
  
  // Validate
  $('#user-login').validate({
    rules: {
      "user-email" : {
        required: true,
        email: true
      },
      "user-password" : {
        required: true
      }
    }
  });
});

*/


var banco;
document.addEventListener('deviceready', successDeviceReady, false);


function successDeviceReady(){
   
      banco = window.openDatabase("banco_bsi", "1.0", "banco_interno", 200000);
      //window.openDatabase(database_name, database_version, database_displayname, database_size);

      banco.transaction(function(ex){
          ex.executeSql("CREATE TABLE IF NOT EXISTS usuario(id, nome, login, senha)", [], success, error);
      });


    window.sessionStorage.setItem("nome", "turing"); 
    window.sessionStorage.getItem("nome");
    //window.sessionStorage.removeItem("key"); 
    //window.sessionStorage.clear();

    window.addEventListener("batterystatus", onBatteryStatus, false);

    $("#bCadastrar").click(function(){
      banco.transaction(function(ex){
        //ex.executeSql("INSERT INTO usuario(id,nome,login,senha) values (1, '"+nome+"','"+login+"','"+senha+"')", [], success, error);
        ex.executeSql("INSERT INTO usuario(id,nome,login,senha) values (1, 'bruno','bruno','123')", [], success, error);
      });
      return false;
    
    });
    
    function validaUsuario(ex, resultadoQuery){
      for (var i = 0; i<resultadoQuery.length;i++){
        if (resultadoQuery[i].login !== 'bruno'){
            alert("Usuário não encontrado!")
        } else if (resultadoQuery[i].senha !== '123'){
          alert("Senha incorreta!")
        }
      }
  }
}

function onBatteryStatus(status) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
}



/*function acessar() {
  banco.transaction(function(ex){
    ex.executeSql("select * from usuario where login ='bruno' and senha = '123' " , [], validaUsuario, error);
  });
  return false;

};*/



function success(ex, resultadoQuery){
    console.log(resultadoQuery);
}

function error(erro){
    console.log(erro);
}