(function() {
	'use strict';

	angular
		.module('hugo', ['ngRoute','ngMaterial'])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider

			.when('/', {
				templateUrl: '/views/index-canvas.html',
				controller: 'indexCanvasController',
				controllerAs: 'vm'
			});

		}]);
})();
