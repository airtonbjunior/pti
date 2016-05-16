angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {

  
  $scope.dataHours = {};
  $scope.buttonWhere = "all";
  $scope.buttonWhen  = "all";


  $scope.getBusHours = function () {
    
    $http.get("http://pdi.pti.org.br/onibus/horarios?local=" + $scope.buttonWhere + "&tipo=" + $scope.buttonWhen)
      .success(function(data) {
        $scope.dataHours = data.baseOnibus.horarios;
        
      })
      .error(function(data){
        alert("Erro na busca dos dados. Por favor, tente novamente!");
      })
  }


  
  /* I don't know if I need this. */
  $scope.button         = {};
    $scope.button.first   = {};
    $scope.button.first2  = {};
    $scope.button.second  = {};
    $scope.button.second2 = {};
    $scope.button.third   = {};
    $scope.button.third2  = {};

  /* Handle the clicked button (visual only) */
  $scope.click = function(button, buttonsClass, paramCall){

    if(buttonsClass == '1') {

      $scope.buttonWhere = button;

      $scope.button.first.clicked   = false;
      $scope.button.second.clicked  = false;
      $scope.button.third.clicked   = false;  

      $scope.buttonWhere = paramCall;
    }
    else {
      $scope.button.first2.clicked  = false;
      $scope.button.second2.clicked = false;
      $scope.button.third2.clicked  = false;

      $scope.buttonWhen = paramCall;
    }

    button.clicked = true;
  };

})

/* --------------------- */
/* Telephones Controller */
.controller('TelephonesCtrl', function($scope, $http) {

  $scope.dataTelephones = {};
  $scope.searchType = "nome";
  $scope.who     = "all";
  $scope.func    = "all";
  $scope.company = "all";


  $scope.getTelephones = function (param) {

    console.log(param);
    console.log($scope.searchType);

    if($scope.searchType == "nome") { $scope.who = param; } else if ($scope.searchType == "empresa") { $scope.company = param; } else { $scope.func = param;}

    console.log("http://pdi.pti.org.br/habitantes/telefones?nome=" + $scope.who + "&funcao=" + $scope.func + "&empresa=" + $scope.company);

    $http.get("http://pdi.pti.org.br/habitantes/telefones?nome=" + $scope.who + "&funcao=" + $scope.func + "&empresa=" + $scope.company)
      .success(function(data) {
        $scope.dataTelephones = data.pessoaList;
        console.log(data.pessoaList);
        
      })
      .error(function(data){
        alert("Erro na busca dos dados. Por favor, tente novamente!");
      })
  }

    /* I don't know if I need this. */
  $scope.button         = {};
    $scope.button.first   = {};
    $scope.button.second  = {};
    $scope.button.third   = {};

  /* Handle the clicked button (visual only) */
  $scope.click = function(button, paramCall){

      console.log(paramCall);

      $scope.button.first.clicked   = false;
      $scope.button.second.clicked  = false;
      $scope.button.third.clicked   = false;  

      $scope.searchType = paramCall;

      button.clicked = true;
  };

})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
