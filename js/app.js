// var config = {
//   apiKey: "AIzaSyC0pHNDB5GmFqaWd7udD6EZH4i0CcvsYGQ",
//   authDomain: "fruits-vegetables-angular.firebaseapp.com",
//   databaseURL: "https://fruits-vegetables-angular.firebaseio.com",
//   projectId: "fruits-vegetables-angular",
//   storageBucket: "fruits-vegetables-angular.appspot.com",
//   messagingSenderId: "720668971523"
// };
// firebase.initializeApp(config);



var myBasketApp = angular.module("myBasketApp", ["firebase"]);


myBasketApp.controller("BasketController", ["$scope", "$http", "$firebaseObject", function($scope, $http, $firebaseObject){
  // var ref = firebase.database().ref();
  // // download the data into a local object
  // $scope.data = $firebaseObject(ref);
  // console.log(Object.keys($scope.data));
  // this.object = $firebaseObject(ref)
  // console.log($scope)

  var canDelete = true;

  $scope.toggleCanDelete = function(){
    // canDelete = true;
    // if($scope.selectedVal.toLowerCase() === "no") canDelete = false;
    canDelete = !canDelete
    console.log(canDelete);
  }


  $http.get("http://dev.webbrand-media.net/angular-test/?fetch&table_id=rnLCWmE").then(function successCallback(response) {
  // $http.get("../data/basket.json").then(function successCallback(response) {
    console.log("success: ", response);
    if(response.status === 200){
      $scope.basketItems = response.data;

      console.log($scope.basketItems);

      // $scope.basketItems.forEach(function(ele){ele.attr2 = ""; ele.attr1 = ""})
      console.log(angular.toJson($scope.basketItems));
      // console.log($scope.basketItems.findIndex(ele => ele.attr1 == ""));

      // $scope.basketItems = $scope.basketItems.map(function(obj){
      //   obj.attr1 = null;
      //   obj.attr2 = null;
      //   return obj
      // })
      //
      // console.log(angular.toJson($scope.basketItems));
      //
      // var url = "http://dev.webbrand-media.net/angular-test/?update&table_id=rnLCWmE&data="+angular.toJson($scope.basketItems)
      // console.log(url);
      //
      // $http.get(url).then(function successCallback(response){
      //   console.log("success: ", response);
      // }, function errorCallback(response){
      //   console.log("add to veg error: ", response);
      //   alert(`ERROR!
      //         Data couldn't be updated. Please try again.
      //     `)
      // })





      this.getItemIndex = function(){
        return $scope.basketItems.findIndex(function(itemObj){
          return itemObj.attr1 === "" || itemObj.attr1 == null
        });
      }

      var itemIndex = this.getItemIndex();
      console.log(itemIndex);
      $scope.currentItem = $scope.basketItems[itemIndex];


      $scope.manageBuckets = function(item, label, bol){
        if(!bol && !canDelete){
          console.log("can't delete");
          return;
        }
        console.log("manageBuckets: ", label, item, bol);
        item.attr1 = label
        var data = '['+angular.toJson(item)+']'
        var url = "http://dev.webbrand-media.net/angular-test/?update&table_id=rnLCWmE&data="+data
        console.log(url);

        $http.get(url).then(function successCallback(response){
          console.log("success: ", response);
          if(bol){
            itemIndex = this.getItemIndex();
            $scope.currentItem = $scope.basketItems[itemIndex];
          }
        }, function errorCallback(response){
          console.log("add to veg error: ", response);
          alert(`ERROR!
                Data couldn't be updated. Please try again.
            `)
        })
      }
    }
  }, function errorCallback(response) {
    console.log("error: ", response);
    alert(`ERROR!
          JSON data couldn't be read. Please try again.
      `)
  });

}])
