function myController($scope){
	$scope.phrase = "";
	$scope.myOutput = "";

	$scope.reversePhrase = function(){
		$scope.phrase = $('#phraseInput').val();
		$scope.myOutput = $scope.phrase.split('').reverse().join('');
	};
};