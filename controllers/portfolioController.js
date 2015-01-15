function portfolioController($scope){

	// Angular vars
	var self = this;

	$scope.openCategory = -1;
	$scope.galleryOpen = false;
	$scope.defaultPreview = 'http://www.warrenphotographic.co.uk/photography/cats/18458.jpg';
	$scope.currentPreview = $scope.defaultPreview;
	$scope.currentTemplate = "template";

	self.resizeGallery = function(){
		var $images = $(".template-image-restrict");
		var totalWidth = 0;

		for(var i = 0; i < $images.length; ++i){
			var marginLeft = $images.eq(i).css("margin-left");
			var marginRight = $images.eq(i).css("margin-right");

			console.log("margin left: " + parseInt(marginLeft.substring(0, marginLeft.length - 2)));

			totalWidth += $images.eq(i).width() + parseInt(marginLeft.substring(0, marginLeft.length - 2)) + parseInt(marginRight.substring(0, marginRight.length - 2));
		}

		totalWidth += 10;
		$(".template-container").css("width", totalWidth + "px");
	}

	$scope.changeTemplate = function(newTemplate){
		$scope.currentTemplate = newTemplate;
		$scope.$apply();

		self.resizeGallery();
	};

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
			'http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg',
			'http://resource.supercheats.com/library/2013/1384846394forzahorizon.jpg',
			'http://compass.xboxlive.com/assets/5e/39/5e393b30-ea3c-4443-8c89-c4be56649bfd.jpg?n=Horizon_cars_banner.jpg',
			'http://www.twinfinite.net/wp-content/uploads/2014/07/TheLastofUs_feature.jpg',
			'http://www.cinemablend.com/images/gallery/s44494/Forza_Horizon_Limited_Collector_s_Edition_13420393014891.jpg',
			'http://cdni.wired.co.uk/1920x1280/s_v/the-last-of-us.jpg',
			'http://stancewords.stanceworks.netdna-cdn.com/wp-content/uploads/2012/10/bmw-1m-forza-horizon.jpg',
			'http://ecx.images-amazon.com/images/I/71awkWHQJ6L._SL1280_.jpg',
			'http://cdn.arstechnica.net/wp-content/uploads/2012/10/Forza_Horizon_Press_Tour_5.jpg',
			'http://www.independent.co.uk/incoming/article9176466.ece/binary/original/2518386-the_last_of_us_ps3_game-wide.jpg',
			'http://www.junkiemonkeys.com/wp-content/uploads/2014/01/The-Last-of-Us-VGA-2012-Story-Trailer_2.jpg',
			'http://psmedia.playstation.com/is/image/psmedia/the-last-of-us-remastered-screen-15-ps4-us-28jul14?$MediaCarousel_Original$',
			'http://img1.wikia.nocookie.net/__cb20130711180104/thelastofus/images/8/84/The_las_of_us1.jpg',
			'http://gamingbolt.com/wp-content/uploads/2011/12/last-of-us-3.jpg'
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
		    width: "10px"
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