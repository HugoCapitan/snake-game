(function(){
	'use strict';
	
	angular.module('hugo')
		   .config(hugoRouter);

	hugoRouter.$inject = ['$routeProvider'];

	function hugoRouter($routeProvider) {
		$routeProvider

		.when('/', {
			templateUrl: '/views/index-canvas.html',
			controller: 'indexCanvasController',
			controllerAs: 'vm'
		})

	}

})();
