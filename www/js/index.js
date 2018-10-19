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
        ex.executeSql("CREATE TABLE IF NOT EXISTS usuario(id, nome)", [], success, error);
    });

    window.sessionStorage.setItem("nome", "turing"); 
    window.sessionStorage.getItem("nome");
    //window.sessionStorage.removeItem("key"); 
    //window.sessionStorage.clear();

    window.addEventListener("batterystatus", onBatteryStatus, false);

    insertExemplo();
    

}

function onBatteryStatus(status) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

function insertExemplo(){
    $("#bAcessar").click(function(){
      banco.transaction(function(ex){
        ex.executeSql("INSERT INTO usuario(id,nome) values (1, 'Bruno')", [], success, error);
        selectExemplo();
      });
      return false;

    });
}

function selectExemplo(){
      banco.transaction(function(ex){
        ex.executeSql("select * from usuario", [], success, error);
      });
      return false;
}

function success(ex, resultadoQuery){
    console.log(resultadoQuery);
}

function error(erro){
    console.log(erro);
}