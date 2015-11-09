function portfolioController($scope){
		
	// Class members
	var self = this;
	self.defaultHeaderImage = "../../resources/icons/headerDefault.png";
	self.openCategory = 0; // The currently expanded high level category in the side menu.
	self.thumbsOpen = false;
	self.numberOfImagesPrevious = 0; // Used for loading images and resizing the gallery container.
	self.thumbFlyoutAnimating = false; // Lock any interaction with the thumb flyout while animating.
	
	// Data
	self.sectionInfo = {
		"characters_projects" : {
			"headerPreview" : "../../resources/icons/headerCharacterProjects.png",
			"quickThumbs" : [
				"../../resources/characters/projects/thumbs/1.png",
				"../../resources/characters/projects/thumbs/2.png",
				"../../resources/icons/comingSoonThumb.png"
			]
		},
		"characters_illustrations" : {
			"headerPreview" : "../../resources/icons/headerCharacterIllustration.png",
			"quickThumbs" : [
				"../../resources/characters/illustration/thumbs/1.png",
				"../../resources/characters/illustration/thumbs/2.png",
				"../../resources/icons/comingSoonThumb.png"
			]
		},
		"characters_sketches" : {
			"headerPreview" : "../../resources/icons/headerCharacterSketches.png",
			"quickThumbs" : [
				"../../resources/characters/sketches/thumbs/1.png",
				"../../resources/characters/sketches/thumbs/2.png",
				"../../resources/characters/sketches/thumbs/3.png",
				"../../resources/icons/comingSoonThumb.png"
			]
		},
		"environments_projects" : {
			"headerPreview" : "http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg",
			"quickThumbs" : [
				"../../resources/icons/comingSoonThumb.png"
			]
		},
		"environments_illustrations" : {
			"headerPreview" : "http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg",
			"quickThumbs" : [
				"../../resources/icons/comingSoonThumb.png"
			]
		},
		"environments_sketches" : {
			"headerPreview" : "../../resources/icons/headerEnvironmentSketches.png",
			"quickThumbs" : [
				"../../resources/environments/sketches/thumbs/1.png",
				"../../resources/environments/sketches/thumbs/2.png",
				"../../resources/environments/sketches/thumbs/3.png",
				"../../resources/environments/sketches/thumbs/4.png",
				"../../resources/icons/comingSoonThumb.png"
			]
		},
		"other_digital" : {
			"headerPreview" : "http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg",
			"quickThumbs" : [
				"../../resources/icons/comingSoonThumb.png"
			]
		},
		"other_traditional" : {
			"headerPreview" : "http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg",
			"quickThumbs" : [
				"../../resources/icons/comingSoonThumb.png"
			]
		},
		"other_inktober" : {
			"headerPreview" : "http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg",
			"quickThumbs" : [
				"../../resources/icons/comingSoonThumb.png"
			]
		},
		"contact" : {
			"headerPreview" : self.defaultHeaderImage,
			"quickThumbs" : [
				
			]
		}
	}
	
	// HTML bindings
	$scope.activeCategory = "characters_projects"; // Bound to marking active tab
	$scope.activeGalleryTemplate = "templates/" + $scope.activeCategory + "_gallery.html";
	$scope.activeHeaderImage = self.defaultHeaderImage;
	$scope.activeThumbs = self.sectionInfo["characters_projects"]["quickThumbs"];
	
	///
	/// Update the preview spaces for a category.
	/// Spaces include header image and thumbs gallery.
	///
	/// params: categoryName = The name of the category to grab preview content from.
	///
	$scope.showPreview = function(categoryName){
		categoryName = categoryName.toLowerCase();
		
		// Update HTML bindings
		$scope.activeHeaderImage = self.sectionInfo[categoryName]["headerPreview"];
		$scope.activeThumbs = self.sectionInfo[categoryName]["quickThumbs"];
	};
	
	///
	/// Restore default/active content to preview spaces.
	/// Spaces incluse header image and thumbs gallery.
	///
	$scope.hidePreview = function(){
		// Update HTML bindings
		$scope.activeHeaderImage = self.defaultHeaderImage;
		$scope.activeThumbs = self.sectionInfo[$scope.activeCategory]["quickThumbs"];
	}
	
	///
	/// Show a new category or section of content. Updates the template
	/// showing the gallery and the quick-nav thumbs.
	///
	/// params: categoryName = The name of the category to grab content from.
	///
	$scope.loadGallery = function(categoryName){
		categoryName = categoryName.toLowerCase();
		
		// Update class info
		$scope.activeCategory = categoryName;
		
		// Update HTML bindings and templates to show the new gallery.
		$scope.activeGalleryTemplate = "templates/" + categoryName + "_gallery.html";
		$scope.activeThumbs = self.sectionInfo[categoryName]["quickThumbs"];
		
		// Resize the gallery upon new template load. Try quick and late loads.
		self.resizeGalleryAsync(100);
		self.resizeGalleryAsync(500);
		self.resizeGalleryAsync(2000);
		self.resizeGalleryAsync(5000);
	}
	
	///
	/// Expand the high level hierarchy in the main side menu.
	///
	/// params: index = The index (top to bottom) of this category as it lies in the main menu. 
	///
	$scope.expandCategory = function(index){
		// If already open, don't do anything.
		if(index == self.openCategory) return;
		
		// Clone the element with the auto property to see how far we should extend the height.
		var elementToClone = $('.linkHeaderContainer').eq(index);
		var elementCloneAuto = elementToClone.clone().css({"height":"auto"}).appendTo("body");
		autoHeight = elementCloneAuto.css("height");
		elementCloneAuto.remove();

		// Close the previously open category
		$( ".linkHeaderContainer" ).eq(self.openCategory).animate({
			height: "20px"
			}, 200, function() {
			// Animation complete.
		});

		self.openCategory = index;

		// Open the selected category.
		$( ".linkHeaderContainer" ).eq(self.openCategory).animate({
		    height: autoHeight
		  }, 200, function() {
		    // Animation complete.
		});
	};

	///
	/// Scroll to an element in the displayed gallery.
	///
	/// params: index = The index (left to right) of the image to scroll to.
	///
	$scope.slideTo = function(index){
		var dest = $(".template-image-restrict").eq(index).position().left;
		var pos = dest + $( ".screen-container" ).scrollLeft() - 230;
		if(pos < 0){
			pos = 0;
		}

		$( ".screen-container" ).animate({scrollLeft: pos}, 600 );
	};
	
	///
	/// Resize the gallery to fit all loaded images.
	///
	/// returns: Whether the page is finished loading or not.
	///
	self.resizeGallery = function(){
		var $images = $(".template-image-restrict");
		var numberOfImagesCurrent = $images.length;
		var totalWidth = 0;

		for(var i = 0; i < $images.length; ++i){
			var marginLeft = $images.eq(i).css("margin-left");
			var marginRight = $images.eq(i).css("margin-right");

			totalWidth += $images.eq(i).width() + parseInt(marginLeft.substring(0, marginLeft.length - 2)) + parseInt(marginRight.substring(0, marginRight.length - 2));
			totalWidth += 6;
		}
		
		// If new images have been loaded since last call, assume we're not done loading.
		if (numberOfImagesCurrent > self.numberOfImagesPrevious && 
			numberOfImagesCurrent > 0){
				
			numberOfImagesPrevious = numberOfImagesCurrent;
			return false;
		}

		// If no new images have been added since last call, assume loaded.
		$(".template-container").css("width", totalWidth + "px");
		self.numberOfImagesPrevious = 0;
		return true;
	};
	
	///
	/// Resize the gallery every x milliseconds. Allows checking for quick and late loads.
	///
	/// params: interval = How often to try reloading and resizing. 
	self.resizeGalleryAsync = function(interval){
		var resizeGalleryInterval = setInterval(function() {
			if(resizeGallery() === true){
		    	clearInterval(resizeGalleryInterval);
			}
		}, interval);
	};
	
	///
	/// Expand the thumbnail flyout.
	///
	$scope.expandThumbs = function(){	
		if(self.thumbFlyoutAnimating) return;
		if(self.thumbsOpen) return;
		
		self.thumbFlyoutAnimating = true;
		$( "#gallery-flyout").css("padding", "15px");
		$( "#gallery-close-button").css("opacity", "1.0");
		$( "#thumb-container").css("opacity", "1.0");

		$( "#gallery-flyout" ).animate({
			width: "390px",
			opacity: "1.0"
		  }, 200, function() {
			// Animation complete
			self.thumbFlyoutAnimating = false;
			self.thumbsOpen = true;
		});
	};

	/// 
	/// Close the thumbnail flyout.
	///
	$scope.retractThumbs = function(){
		if(self.thumbFlyoutAnimating) return;
		if(!self.thumbsOpen) return;
		
		self.thumbFlyoutAnimating = true;		
		$( "#gallery-flyout" ).animate({
			opacity: "0.0",
			width: "0px"
			}, 100, function() {
				// Animation complete.				
				$( "#thumb-container" ).animate({
					opacity: "0.0"
					}, 100, function() {
						// Animation complete.
						$( "#gallery-flyout").css("padding", "0px");
						$( "#gallery-close-button").css("opacity", "0.0");
						
						self.thumbFlyoutAnimating = false;
						self.thumbsOpen = false;	
				});		
		});
	};
	
	///
	/// Instantly hide the thumbs without animating.
	/// Used on contact page to not confuse the user.
	///
	$scope.hideThumbs = function(){
		$( "#gallery-flyout").css("opacity", "0.0");
		$( "#thumb-container").css("opacity", "0.0");
		$( "#gallery-flyout").css("padding", "0px");
		$( "#gallery-close-button").css("opacity", "0.0");
		
		self.thumbsOpen = false;
	};
};