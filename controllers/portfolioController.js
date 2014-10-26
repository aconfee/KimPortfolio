function portfolioController($scope){

	// Angular vars
	$scope.openCategory = -1;
	$scope.galleryOpen = false;
	$scope.defaultPreview = 'http://www.warrenphotographic.co.uk/photography/cats/18458.jpg';
	$scope.currentPreview = $scope.defaultPreview;

	// Class vars
	var self = this;
	self.navLinkPreviews = {
		'characters':[
			'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg',
			'http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg',
			'http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg'
		],
		'environment':[
			'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg',
			'http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg',
			'http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg'
		],
		'sketches':[
			'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg',
			'http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg',
			'http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg'
		]
	};

	$scope.currentThumb = "girls";

	$scope.thumbs = {
		'girls':[
			'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg',
			'http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg',
			'http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg'
		],
		'sketches':[
			'http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg',
			'http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg'
		]
	};

	$scope.chooseLink = function(linkName){
		// Change the displayed thumbs in the gallery.
		$scope.currentThumb = linkName;
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
		$scope.currentPreview = self.navLinkPreviews[category.toLowerCase()][index];
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