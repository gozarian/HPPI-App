angular.module('hp')

.controller('TestController', function($scope, $ionicModal) {
  $scope.testModal = null;

  $ionicModal.fromTemplateUrl('modal.html', function(modal) {
    $scope.testModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.showModal = function() {
    $scope.testModal.show();
  };

  $scope.hideModal = function() {
    $scope.testModal.hide();
  };
});
