var myBasketApp = angular.module("myBasketApp", []);


myBasketApp.controller("BasketController", ["$scope", "$http", function($scope, $http){
  // console.log($scope)


  $http.get("http://dev.webbrand-media.net/angular-test/?fetch&table_id=rnLCWmE").then(function successCallback(response) {
    console.log("success: ", response);
    if(response.status === 200){
      $scope.basketItems = response.data

      var itemIndexArr = $scope.basketItems.filter(function(ele, index){
        if (!ele.attr1 && ele.attr2 !== "removed"){
          return index
        };
      })

      // console.log("itemIndexArr", itemIndexArr);

      var itemIndex = itemIndexArr[0].id;
      console.log(itemIndex);
      $scope.currentItem = $scope.basketItems[itemIndex];

       $scope.addToBucket = function(item, label){
         console.log("addToVeg: ", label, item);
         item.attr1 = label
         var data = '['+angular.toJson(item)+']'
         var url = "http://dev.webbrand-media.net/angular-test/?update&table_id=rnLCWmE&data="+data
         console.log(url);

         $http.get(url).then(function successCallback(response){
           console.log("success: ", response);
           // send next item everytime veg/fruit button is clicked
           itemIndex = itemIndex+1;
           $scope.currentItem = $scope.basketItems[itemIndex];
         }, function errorCallback(response){
           console.log("add to veg error: ", response);
           alert(`ERROR!
                 Data couldn't be updated. Please try again.
             `)
         })
       }

       $scope.removeFromBucket = function(item){
         console.log("addToVeg: ", item);
         item.attr2 = "removed";
         var data = '['+angular.toJson(item)+']'
         var url = "http://dev.webbrand-media.net/angular-test/?update&table_id=rnLCWmE&data="+data
         console.log(url);

         $http.get(url).then(function successCallback(response){
           console.log("success: ", response);
           // itemIndex = itemIndex+1;
           // $scope.currentItem = $scope.basketItems[itemIndex];
         }, function errorCallback(response){
           console.log("remove from basket error: ", response);
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
