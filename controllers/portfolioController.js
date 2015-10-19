function portfolioController($scope){

	// Angular vars
	var self = this;
	
	self.isScrolling = false;

	$scope.openCategory = 0;
	$scope.galleryOpen = false;
	$scope.mainCategory = "CHARACTERS";
	$scope.mainCategoryThumbChange = "CHARACTERS";
	$scope.subCategory = "projects";
	$scope.galleryTitle = "Quick View";
	$scope.defaultPreview = '../../resources/icons/headerDefault.png';
	$scope.currentPreview = $scope.defaultPreview;
	$scope.currentTemplate = "characters_projects";
	
	self.galleryAnimating = false;

	$scope.scrollToMe = function(index){
		var dest = $(".template-image-restrict").eq(index).position().left;
		var pos = dest + $( ".screen-container" ).scrollLeft() - 230;
		if(pos < 0){
			pos = 0;
		}

		$( ".screen-container" ).animate({scrollLeft: pos}, 600 );
	};
		
	$scope.toggleScroll = function(beginScroll){
		// If stopping scroll
		if(beginScroll === false){
			clearInterval(self.scrollInterval);
			self.isScrolling = false;
			return;	
		}
		
		// If already scrolling
		if(self.isScrolling === true){
			return;
		}
		
		// If starting scroll				
		self.isScrolling = true;
		
		self.scrollInterval = setInterval(function(){
			console.log("called");
			var currentLeft = $(".screen-container").scrollLeft(); // ___px
			var scrollTo = currentLeft + 1;
			
			$( ".screen-container" ).scrollLeft(scrollTo);
		}, 3);
	}
	
	self.scrollInterval = function(){};

	self.numberOfImagesPrevious = 0;
	
	// Resize the gallery to fit all loaded images.
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
		
		if (numberOfImagesCurrent > self.numberOfImagesPrevious && 
			numberOfImagesCurrent > 0){
				
			numberOfImagesPrevious = numberOfImagesCurrent;
			return false;
		}

		$(".template-container").css("width", totalWidth + "px");
		self.numberOfImagesPrevious = 0;
		return true;
	};
	
	// Resize the gallery every x milliseconds (for new images loaded).
	self.resizeGalleryAsync = function(interval){
		var resizeGalleryInterval = setInterval(function() {
			if(resizeGallery() === true){
		    	clearInterval(resizeGalleryInterval);
			}
		}, interval);
	};

	$scope.changeTemplate = function(newTemplate){
		$scope.currentTemplate = newTemplate;

		// Resize the gallery upon new template load. Try quick and late loads.
		self.resizeGalleryAsync(100);
		self.resizeGalleryAsync(500);
		self.resizeGalleryAsync(2000);
		self.resizeGalleryAsync(5000);
	};

	// Class vars
	var self = this;
	
	// Previews when hovering over submenu items.
	self.navLinkPreviews = {
		'characters':[
			'../../resources/icons/headerCharacterProjects.png',
			'../../resources/icons/headerCharacterIllustration.png',
			'../../resources/icons/headerCharacterSketches.png'
		],
		'environment':[
			'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg',
			'http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg',
			'../../resources/icons/headerEnvironmentSketches.png'
		],
		'other':[
			'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg',
			'http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg',
			'http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg'
		]
	};

	// Gallery thumbnails for a given section.
	$scope.thumbs = {
		'CHARACTERS':{
			'projects':[
				'../../resources/characters/projects/thumbs/1.png',
				'../../resources/characters/projects/thumbs/2.png',
				'../../resources/icons/comingSoonThumb.png'
			],
			'illustration':[
				'../../resources/characters/illustration/thumbs/1.png',
				'../../resources/characters/illustration/thumbs/2.png',
				'../../resources/icons/comingSoonThumb.png'
			],
			'sketches':[
				'../../resources/characters/sketches/thumbs/1.png',
				'../../resources/characters/sketches/thumbs/2.png',
				'../../resources/characters/sketches/thumbs/3.png',
				'../../resources/icons/comingSoonThumb.png'
			]
		},
		'ENVIRONMENT':{
			'projects':[
				'../../resources/icons/comingSoonThumb.png'
			],
			'illustration':[
				'../../resources/icons/comingSoonThumb.png'
			],
			'sketches':[
				'../../resources/environments/sketches/thumbs/1.png',
				'../../resources/environments/sketches/thumbs/2.png',
				'../../resources/environments/sketches/thumbs/3.png',
				'../../resources/environments/sketches/thumbs/4.png',
				'../../resources/icons/comingSoonThumb.png'
			]
		},
		'OTHER':{
			'digital':[
				'../../resources/icons/comingSoonThumb.png'
			],
			'traditional':[
				'../../resources/icons/comingSoonThumb.png'
			],
			'inktober':[
				'../../resources/icons/comingSoonThumb.png'
			]
		},
		'CONTACT':{
			'contact':[
				// No thumbs
			]
		}
	};

	$scope.chooseLink = function(linkName){
		// Change the displayed thumbs in the gallery.
		$scope.subCategory = linkName.toLowerCase();
		//$scope.galleryTitle = $scope.mainCategory + ": " + $scope.subCategory;
		$scope.mainCategoryThumbChange = $scope.mainCategory;
	};
	
	$scope.subCategoryRestore;
	$scope.mainCategoryRestore;
	
	// Show thumb preview of link when hovered over.
	$scope.showGallery = function(mainCategoryPreview, subCategoryPreview){
		$scope.subCategoryRestore = $scope.subCategory;
		$scope.mainCategoryRestore = $scope.mainCategoryThumbChange;
		
		$scope.subCategory = subCategoryPreview.toLowerCase();
		$scope.mainCategoryThumbChange = mainCategoryPreview.toUpperCase();
	};
	
	// Restore thumb navigation to active template
	$scope.restoreGallery = function(){
		$scope.subCategory = $scope.subCategoryRestore;
		$scope.mainCategoryThumbChange = $scope.mainCategoryRestore;
	};

	$scope.expandCategory = function(index, name){
		$scope.mainCategory = name.toUpperCase();
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

	$scope.toggleGallery = function(isActive){
		if(!isActive) return;

		if($scope.galleryOpen == true){
			$scope.retractGallery();
			return;
		}
		
		$( "#gallery-flyout").css("padding", "15px");
		$( "#gallery-close-button").css("opacity", "1.0");
		$( "#thumb-container").css("opacity", "1.0");

		$( "#gallery-flyout" ).animate({
			width: "390px",
			opacity: "1.0"
		  }, 200, function() {
			// Animation complete
		});

		$scope.galleryOpen = true;
	};
	
	$scope.openGallery = function(isActive){
		if(!isActive) return;		
		if(self.galleryAnimating) return;
		if($scope.galleryOpen) return;
		
		self.galleryAnimating = true;
		$( "#gallery-flyout").css("padding", "15px");
		$( "#gallery-close-button").css("opacity", "1.0");
		$( "#thumb-container").css("opacity", "1.0");

		$( "#gallery-flyout" ).animate({
			width: "390px",
			opacity: "1.0"
		  }, 200, function() {
			// Animation complete
			self.galleryAnimating = false;
			$scope.galleryOpen = true;
		});
	};

	$scope.retractGallery = function(){
		if(self.galleryAnimating) return;
		if(!$scope.galleryOpen) return;
		
		self.galleryAnimating = true;		
		$( "#gallery-flyout" ).animate({
			opacity: "0.0",
			width: "0px"
			}, 100, function() {
				// Animation complete.
				
				$( "#thumb-container" ).animate({
					opacity: "0.0"
					}, 100, function() {
						$( "#gallery-flyout").css("padding", "0px");
						$( "#gallery-close-button").css("opacity", "0.0");
						
						self.galleryAnimating = false;
						$scope.galleryOpen = false;	
				});		
		});
	};
	
	$scope.hideGallery = function(){
		$( "#gallery-flyout").css("opacity", "0.0");
		$( "#thumb-container").css("opacity", "0.0");
		$( "#gallery-flyout").css("padding", "0px");
		$( "#gallery-close-button").css("opacity", "0.0");
		
		$scope.galleryOpen = false;
	};

	$scope.selectThumb = function(index){

	};

	$scope.populateGallery = function(index){
		console.log("hello world");
	};
};