function galleryController($scope){
	var self = this;

	$scope.slideIds = ["#image1", "#image2", "#image3"];
	$scope.currentSlideIndex = 0;

	self.getPreviousSlideId = function(){
		// Account for rollover
		if($scope.currentSlideIndex === 0){
			return $scope.slideIds[$scope.slideIds.length - 1];
		}

		return $scope.slideIds[$scope.currentSlideIndex - 1];
	};

	self.getNextSlideId = function(){
		// Account for rollover
		if($scope.currentSlideIndex === $scope.slideIds.length - 1){
			return $scope.slideIds[0];
		}

		return $scope.slideIds[$scope.currentSlideIndex + 1];
	};

	// TODO: try fading opacity in-out instead of sliding.
	$scope.slideOut = function(direction, imageId){
		var slideMargin = "";

		if(direction.toLowerCase() === "left"){
			slideMargin = "-100%";
		}
		else if(direction.toLowerCase() === "right"){
			slideMargin = "100%";
		}
		else{
			console.error("Parameter '" + direction + "' not a valid direction in galleryController::slideOut.");
		}

		$(imageId).animate({
	    	"left": slideMargin
			}, 500, function() {
	    	// Animation complete.
		});
	};

	$scope.slideIn = function(direction, imageId){
		var startMargin = "";

		if(direction.toLowerCase() === "left"){
			startMargin = "100%";
		}
		else if(direction.toLowerCase() === "right"){
			startMargin = "-100%";
		}
		else{
			console.error("Parameter '" + direction + "' not a valid direction in galleryController::slideIn.");
		}

		// Positon element on the side it should spawn from.
		$(imageId).css("left", startMargin);

		$(imageId).animate({
	    	"left": "0px"
			}, 500, function() {
	    	// Animation complete.
		});
	};

	self.getPreviousIndex = function(){
		var previousIndex = $scope.currentSlideIndex - 1;
		if(previousIndex < 0){
			previousIndex = $scope.slideIds.length - 1;
		}

		return previousIndex;
	};

	self.getNextIndex = function(){
		var nextIndex = $scope.currentSlideIndex + 1;
		if(nextIndex === $scope.slideIds.length){
			nextIndex = 0;
		}

		return nextIndex;
	};

	$scope.nextSlide = function(){
		// Get the id for the next and current slide image
		var nextId = self.getNextSlideId();
		var currentId = $scope.slideIds[$scope.currentSlideIndex];

		$scope.slideOut("left", currentId);
		$scope.slideIn("left", nextId);

		$scope.currentSlideIndex = self.getNextIndex();
	};

	$scope.previousSlide = function(){
		// Get the id for the previous an current slide image
		var previousId = self.getPreviousSlideId();
		var currentId = $scope.slideIds[$scope.currentSlideIndex];

		$scope.slideOut("right", currentId);
		$scope.slideIn("right", previousId);

		$scope.currentSlideIndex = self.getPreviousIndex();
	};
};