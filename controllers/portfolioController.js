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
				'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg',
				'http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg',
				'http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg',
				'http://resource.supercheats.com/library/2013/1384846394forzahorizon.jpg',
				'http://compass.xboxlive.com/assets/5e/39/5e393b30-ea3c-4443-8c89-c4be56649bfd.jpg?n=Horizon_cars_banner.jpg',
				'http://www.twinfinite.net/wp-content/uploads/2014/07/TheLastofUs_feature.jpg',
				'http://www.cinemablend.com/images/gallery/s44494/Forza_Horizon_Limited_Collector_s_Edition_13420393014891.jpg',
				'http://cdni.wired.co.uk/1920x1280/s_v/the-last-of-us.jpg',
				'http://stancewords.stanceworks.netdna-cdn.com/wp-content/uploads/2012/10/bmw-1m-forza-horizon.jpg',
				'http://ecx.images-amazon.com/images/I/71awkWHQJ6L._SL1280_.jpg'
			],
			'illustration':[
				'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg',
				'http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg',
				'http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg',
				'http://resource.supercheats.com/library/2013/1384846394forzahorizon.jpg',
				'http://compass.xboxlive.com/assets/5e/39/5e393b30-ea3c-4443-8c89-c4be56649bfd.jpg?n=Horizon_cars_banner.jpg',
				'http://www.twinfinite.net/wp-content/uploads/2014/07/TheLastofUs_feature.jpg',
				'http://www.cinemablend.com/images/gallery/s44494/Forza_Horizon_Limited_Collector_s_Edition_13420393014891.jpg',
				'http://cdni.wired.co.uk/1920x1280/s_v/the-last-of-us.jpg',
				'http://stancewords.stanceworks.netdna-cdn.com/wp-content/uploads/2012/10/bmw-1m-forza-horizon.jpg',
				'http://ecx.images-amazon.com/images/I/71awkWHQJ6L._SL1280_.jpg'
			],
			'sketches':[
				'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg'
			]
		},
		'ENVIRONMENT':{
			'projects':[
				'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg',
				'http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg',
				'http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg',
				'http://resource.supercheats.com/library/2013/1384846394forzahorizon.jpg',
				'http://compass.xboxlive.com/assets/5e/39/5e393b30-ea3c-4443-8c89-c4be56649bfd.jpg?n=Horizon_cars_banner.jpg',
				'http://www.twinfinite.net/wp-content/uploads/2014/07/TheLastofUs_feature.jpg'
			],
			'illustration':[
				'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg',
				'http://4.bp.blogspot.com/-hzVCoWekCiI/T0Oq1HCVgjI/AAAAAAAAB6A/ZcB-Zqxkpag/s1600/Brown_+Cavalier_King_Charles_Spaniel_Puppies.jpg',
				'http://i3.findthebest.com/sites/default/files/465/media/images/Cavalier_King_Charles_Spaniel_915857.jpg',
				'http://resource.supercheats.com/library/2013/1384846394forzahorizon.jpg',
				'http://compass.xboxlive.com/assets/5e/39/5e393b30-ea3c-4443-8c89-c4be56649bfd.jpg?n=Horizon_cars_banner.jpg',
				'http://www.twinfinite.net/wp-content/uploads/2014/07/TheLastofUs_feature.jpg',
				'http://www.cinemablend.com/images/gallery/s44494/Forza_Horizon_Limited_Collector_s_Edition_13420393014891.jpg',
				'http://cdni.wired.co.uk/1920x1280/s_v/the-last-of-us.jpg',
				'http://stancewords.stanceworks.netdna-cdn.com/wp-content/uploads/2012/10/bmw-1m-forza-horizon.jpg'
			],
			'sketches':[
				'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg'
			]
		},
		'OTHER':{
			'digital':[
				'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg'
			],
			'traditional':[
				'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg'
			],
			'inktober':[
				'http://www.craigspets.com/sites/default/files/imagecache/product_full/pet-for-sale/puppies_for_sale_in_pa_jlsii8653_1.jpg'
			]
		}
	};

	$scope.chooseLink = function(linkName){
		// Change the displayed thumbs in the gallery.
		$scope.subCategory = linkName.toLowerCase();
		$scope.galleryTitle = $scope.mainCategory + ": " + $scope.subCategory;
		$scope.mainCategoryThumbChange = $scope.mainCategory;
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

		if($scope.galleryOpen == true){
			return;
		}
		
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