/* 

## Just for learn/teach AngularJS ##
Readability: 
  - Every controller has a click and getData function (almost the same - change the url and the parameters)
  - All controllers are in the same file 
  - Variables, often, are splited in two or more variables

Test get external data - Example PDI (Plataforma Digital de Informações PTI) - http://pdi.pti.org.br

*/

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $ionicLoading) {

  $scope.isHidden      = true; // default hidden
  $scope.isHiddenError = true;

  $scope.showHidden = function (error) {
    if (error) { 
      $scope.isHiddenError = false; 
      $scope.isHidden = true; 
    } else { 
      $scope.isHidden = false;
      $scope.isHiddenError = true;  
    }
  }


  $scope.dataHours = {};
  $scope.buttonWhere = "all";
  $scope.buttonWhen  = "all";

  $scope.getBusHours = function () {
    
    // Setup the loader (http://codepen.io/chabelly/pen/xGdqbJ)
    /* Readability - the method is copy/pasted in all controllers - Split in the final project */
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,
    });
  
    $http.get("http://pdi.pti.org.br/onibus/horarios?local=" + $scope.buttonWhere + "&tipo=" + $scope.buttonWhen)
      .success(function(data) {
        $scope.dataHours = data.baseOnibus.horarios;
        $scope.showHidden(false);
        $ionicLoading.hide();
      })
      .error(function(data){
        alert("Erro na busca dos dados. Por favor, tente novamente!");
        $scope.showHidden(true);
        $ionicLoading.hide();

      })
  }

  
  /* Readability */
  $scope.button         = {};
    $scope.button.first   = {}; 
    $scope.button.first2  = {}; 
    $scope.button.second  = {};
    $scope.button.second2 = {};
    $scope.button.third   = {}; $scope.button.third.clicked  = true;
    $scope.button.third2  = {}; $scope.button.third2.clicked = true;

  /* Handle the clicked button (visual only) */
  $scope.click = function(button, buttonsClass, paramCall) {

    if(buttonsClass == '1') {

      $scope.buttonWhere = button;

      $scope.button.first.clicked  = false;
      $scope.button.second.clicked = false;
      $scope.button.third.clicked  = false;  

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
/* --------------------- */
.controller('TelephonesCtrl', function($scope, $http, $ionicLoading) {

  $scope.dataTelephones = {};
  $scope.searchType = "nome";
  $scope.who     = "all";
  $scope.func    = "all";
  $scope.company = "all";

  $scope.getTelephones = function (param) {

      // Setup the loader (http://codepen.io/chabelly/pen/xGdqbJ)
      /* Readability - the method is copy/pasted in all controllers - Split in the final project */
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
      });

    if (param == undefined) { param = "all"; } /* When there's no parameter, search all */

    if($scope.searchType == "nome") { $scope.who = param; } else if ($scope.searchType == "empresa") { $scope.company = param; } else { $scope.func = param;}

    console.log("http://pdi.pti.org.br/habitantes/telefones?nome=" + $scope.who + "&funcao=" + $scope.func + "&empresa=" + $scope.company);

    $http.get("http://pdi.pti.org.br/habitantes/telefones?nome=" + $scope.who + "&funcao=" + $scope.func + "&empresa=" + $scope.company)
      .success(function(data) {
        $scope.dataTelephones = data.pessoaList;

        $scope.who     = "all";
        $scope.func    = "all";
        $scope.company = "all";
        $ionicLoading.hide();
      })
      .error(function(data){
        alert("Erro na busca dos dados. Por favor, tente novamente!");
        $ionicLoading.hide();
      })
  }

  /* Readability */
  $scope.button         = {};
    $scope.button.first   = {}; $scope.button.first.clicked  = true;
    $scope.button.second  = {};
    $scope.button.third   = {};

  /* Handle the clicked button (visual only) */
  $scope.click = function(button, paramCall) {

      $scope.button.first.clicked   = false; 
      $scope.button.second.clicked  = false;
      $scope.button.third.clicked   = false;  

      $scope.searchType = paramCall;

      button.clicked = true;
  };

})


/* -------------- */
/* Menu Controller*/
/* -------------- */
.controller('MenuCtrl', function($scope, $http, $filter, $ionicLoading) {

  $scope.restaurant = "all";
  $scope.beginDate = '10/05/2016';
  $scope.endDate = '11/05/2016';

  $scope.dataRestaurants = [];
  $scope.resultRestaurants;

  $scope.getMenu = function (param) {

    // Setup the loader (http://codepen.io/chabelly/pen/xGdqbJ)
    /* Readability - the method is copy/pasted in all controllers - Split in the final project */
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,
    });

    $scope.beginDate = $filter('date')($scope.beginDate, "dd/MM/yyyy"); /* $filter see: https://docs.angularjs.org/api/ng/filter/date */
    $scope.endDate   = $filter('date')($scope.endDate  , "dd/MM/yyyy"); /* example see: http://stackoverflow.com/questions/29231840/angular-format-date-ionic */

    $http.get("http://pdi.pti.org.br/restaurantes/cardapios.json?dataInicial=" + $scope.beginDate + "&dataFinal=" + $scope.endDate + "&restaurante=" + $scope.restaurant)
      .success(function(data) {
        $scope.dataMenu = data;

        if ($scope.restaurant == 'all') {
          for (i=0; i<data.length; i++) {
            $scope.dataRestaurants[i] = data[i];
          }
        }
        else {
          $scope.dataRestaurants[0] = data[0];
        }
        $ionicLoading.hide();
      })
      .error(function(data){
        alert("Erro na busca dos dados. Por favor, tente novamente!");
        $ionicLoading.hide();
      })
  }

  /* Readability */
  $scope.button         = {};
    $scope.button.first   = {}; 
    $scope.button.second  = {};
    $scope.button.third   = {};
    $scope.button.fourth  = {}; $scope.button.fourth.clicked = true;

  /* Handle the clicked button (visual only) */
  $scope.click = function(button, paramCall) {

      console.log(paramCall);

      $scope.button.first.clicked   = false; 
      $scope.button.second.clicked  = false;
      $scope.button.third.clicked   = false;
      $scope.button.fourth.clicked  = false;  

      $scope.restaurant = paramCall;

      button.clicked = true;
  };

})

/* ------------------- */
/* Services Controller */
/* ------------------- */
.controller('ServicesCtrl', function($scope, $http, $ionicLoading) {
   
  $scope.services = [];
  $scope.serviceParam = "nome";
  
  $scope.nameService  = "all";
  $scope.category     = "all";
  $scope.localization = "all";


   $scope.getServices = function (param) {

    // Setup the loader (http://codepen.io/chabelly/pen/xGdqbJ)
    /* Readability - the method is copy/pasted in all controllers - Split in the final project */
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,
    });

    if ($scope.serviceParam == "nome") { $scope.nameService = param; } else if ($scope.serviceParam == "categoria") { $scope.category = param; } else { $scope.localization = param } 
    
    $http.get("http://pdi.pti.org.br/entidades/servicos?categoria=" + $scope.category + "&busca=" + $scope.nameService + "&localizacao=" + $scope.localization)
      .success(function(data) {

        console.log("http://pdi.pti.org.br/entidades/servicos?categoria=" + $scope.category + "&busca=" + $scope.nameService + "&localizacao=" + $scope.localization);

        $scope.services = data.empresaList;

        console.log($scope.services);
        $scope.nameService  = "all";
        $scope.category     = "all";
        $scope.localization = "all";
        $ionicLoading.hide();
        
      })
      .error(function(data){
        alert("Erro na busca dos dados. Por favor, tente novamente!");
        $ionicLoading.hide();
      })
  }

    /* Readability */
  $scope.button         = {};
    $scope.button.first   = {}; $scope.button.first.clicked  = true;
    $scope.button.second  = {};
    $scope.button.third   = {};

      /* Handle the clicked button (visual only) */
  $scope.click = function(button, paramCall) {

      $scope.button.first.clicked   = false; 
      $scope.button.second.clicked  = false;
      $scope.button.third.clicked   = false;

      $scope.serviceParam = paramCall;

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
