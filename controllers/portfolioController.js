function portfolioController($scope){

	$scope.openCategory = -1;

	$scope.expandCategory = function(index){
		// Clone the element with the auto property to see how far we should extend the height.
		var elementToClone = $('.linkHeaderContainer').eq(index);
		var elementCloneAuto = elementToClone.clone().css({"height":"auto"}).appendTo("body");
		autoHeight = elementCloneAuto.css("height");
		elementCloneAuto.remove();

		// Close the previously open category
		if($scope.openCategory > -1){
			$( ".linkHeaderContainer" ).eq($scope.openCategory).animate({
			    height: "20px"
			  }, 200, function() {
			    // Animation complete.
			  });
		}

		// If the clicked item was already open and we just shut it, 
		// don't open and reset $scope.openCategory.
		if($scope.openCategory == index){
			$scope.openCategory = -1;
			return;
		}

		$scope.openCategory = index;

		// Open the selected category.
		$( ".linkHeaderContainer" ).eq($scope.openCategory).animate({
		    height: autoHeight
		  }, 200, function() {
		    // Animation complete.
		  });
	};

	$scope.expandGallery = function(){
		// Open the gallery.
		$( "#gallery-flyout" ).animate({
		    width: "700px"
		  }, 200, function() {
		    // Animation complete.
		  });

		$( "#thumb-container" ).animate({
		    opacity: "1.0"
		  }, 800, function() {
		    // Animation complete.
		  });

		$( "#gallery-title" ).animate({
		    opacity: "1.0"
		  }, 600, function() {
		    // Animation complete.
		  });
	};

	$scope.retractGallery = function(){
		$( "#gallery-flyout" ).animate({
		    width: "30px"
		  }, 200, function() {
		    // Animation complete.
		  });

		$( "#thumb-container" ).animate({
		    opacity: "0.0"
		  }, 400, function() {
		    // Animation complete.
		  });

		$( "#gallery-title" ).animate({
		    opacity: "0.0"
		  }, 400, function() {
		    // Animation complete.
		  });
	};

	$scope.selectThumb = function(index){
		$scope.retractGallery();
	};

	$scope.populateGallery = function(index){
		console.log("hello world");
	};
};