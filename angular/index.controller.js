(function() {
	'use strict';

	angular
		.module('hugo')
		.controller('indexCanvasController', indexCanvasController);

	indexCanvasController.$inject = ['$window'];

	/* @ngInject */
	function indexCanvasController($window) {
		var vm = this;
		vm.title = 'indexCanvasController';

		vm.canvas = undefined;
		vm.ctx = undefined;
		vm.snake = []; // <- each value in the array will be a length of the snake

		vm.drawSnake = drawSnake;
		vm.defineSnake = defineSnake;


		activate();

		////////////////

		function drawSnake () {
			vm.ctx.clearRect(0, 0, vm.width, vm.height);
			vm.ctx.style = '#000000';
			vm.ctx.lineWidth = 2;
			vm.snake.forEach(function (segment, index){
				vm.ctx.beginPath();
				vm.ctx.moveTo(segment.posx, segment.posy);
				if (segment.direction === 'horizontal' && segment.pointing === 'right') {
					vm.ctx.lineTo(segment.posx - segment.length, segment.posy);
				} else if (segment.direction === 'horizontal' && segment.pointing === 'left') { 
					vm.ctx.lineTo(segment.posx + segment.length, segment.posy);
				} else if (segment.direction === 'vertical' && segment.pointing === 'up') {
					vm.ctx.lineTo(segment.posx, segment.posy - segment.length);
				} else if (segment.direction === 'vertical' && segment.pointing ==='down') {
					vm.ctx.lineTo(segment.posx, segment.posy + segment.length);
				}
				vm.ctx.closePath();
				vm.ctx.stroke();
			});
		}

		function defineSnake () {
			vm.snake.forEach(function (segment, index){
				if (index === 0) {
					segment.length++;
					if (segment.direction === 'horizontal' && segment.pointing === 'right') {
						segment.posx++;
					} else if (segment.direction === 'horizontal' && segment.pointing === 'left'){
						segment.posx--;
					} else if (segment.direction === 'vertical' && segment.pointing === 'up') {
						segment.posy--;
					} else if (segment.direction === 'vertical' && segment.pointing === 'down') {
						segment.posy++;
					}
				}
				if (vm.snake.length - 1 === index) {
					segment.length--;
					if (segment.length === 0) {
						vm.snake.splice(index, 1);
					}
				}
			});

			vm.drawSnake();		
		}

		function keyDown (key) {
			console.log(key);
		}


		function activate() {
			// Set canvas height and width and get canvas and context

			vm.height = $window.innerHeight;
			vm.width = $window.innerWidth;

			var canvas = angular.element('#index-canvas');

			vm.canvas = document.getElementById('index-canvas');
			vm.ctx = vm.canvas.getContext('2d');

			canvas.css('height', vm.height + 'px');
			canvas.css('width', vm.width + 'px');

			vm.ctx.canvas.height = vm.height;
			vm.ctx.canvas.width = vm.width;

			window.addEventListener('keydown', keyDown, false);

			vm.snake = [{length: 50, direction: 'horizontal', pointing: 'right', posx: parseInt(vm.width/2), posy: parseInt(vm.height/2)}];

			return setInterval(defineSnake, 1);

		}
	}
})();
