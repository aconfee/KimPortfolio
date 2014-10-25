function portfolioController($scope){

	// Angular vars
	$scope.openCategory = -1;
	$scope.galleryOpen = false;
	$scope.defaultPreview = 'green';
	$scope.currentPreview = $scope.defaultPreview;

	// Class vars
	var self = this;
	self.navLinkPreviews = {
		'characters':[
			'black',
			'red',
			'yellow'
		]
	};

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

	// Get the preview for this link.
	$scope.getPreview = function(category, index){
		console.log('gettinng the preview');
		$scope.currentPreview = self.navLinkPreviews[category][index];
	};

	// Restore the default preview
	$scope.restorePreview = function(){
		$scope.currentPreview = $scope.defaultPreview;
	};

	$scope.toggleGallery = function(){
		if($scope.galleryOpen == true){
			$scope.retractGallery();
			return;
		}

		// Expand the gallery by default.
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

		$scope.galleryOpen = true;
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

		$scope.galleryOpen = false;
	};

	$scope.selectThumb = function(index){

	};

	$scope.populateGallery = function(index){
		console.log("hello world");
	};
};