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
		vm.food = {posx: 30, posy: 30};
		vm.grow = 0;
		vm.moved = 0;

		vm.drawSnake = drawSnake;
		vm.defineSnake = defineSnake;
		vm.snakeFullLength = snakeFullLength;


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
					vm.ctx.lineTo(segment.posx, segment.posy + segment.length);
				} else if (segment.direction === 'vertical' && segment.pointing ==='down') {
					vm.ctx.lineTo(segment.posx, segment.posy - segment.length);
				}
				vm.ctx.closePath();
				vm.ctx.stroke();
			});
		}

		function defineSnake () {
			vm.snake.forEach(function (segment, index){
				if (index === 0) {
					segment.length += 2;
					if (segment.direction === 'horizontal' && segment.pointing === 'right') {
						segment.posx += 2;
					} else if (segment.direction === 'horizontal' && segment.pointing === 'left'){
						segment.posx -= 2;
					} else if (segment.direction === 'vertical' && segment.pointing === 'up') {
						segment.posy -= 2;
					} else if (segment.direction === 'vertical' && segment.pointing === 'down') {
						segment.posy += 2;
					}
				}
				if (vm.snake.length - 1 === index) {
					segment.length -= 2;
					if (segment.length <= 0) {
						vm.snake.splice(index, 1);
					}
				}
			});

			if (vm.grow >= 2) {
				if (vm.moved === vm.snakeFullLength()) {
					vm.snake[0].length += 2;
					vm.moved = 0;
				} else {
					vm.moved += 2;
				}
			}

			if (segment.posx == food.posx, segment.posy == food.posy) {
				vm.grow = true;
			}

			vm.drawSnake();		
		}

		function keyDown (key) {
			key.preventDefault();
			var newSegment = {length: 2}
			if (key.code === 'ArrowRight' && vm.snake[0].direction === 'vertical') {
				newSegment.direction = 'horizontal';
				newSegment.pointing = 'right';
				newSegment.posx = vm.snake[0].posx + 2;
				newSegment.posy = vm.snake[0].posy;
				vm.snake[0].length -= 2;
				vm.snake.unshift(newSegment);
			} else if (key.code === 'ArrowLeft' && vm.snake[0].direction === 'vertical') {
				newSegment.direction = 'horizontal';
				newSegment.pointing = 'left';
				newSegment.posx = vm.snake[0].posx - 2;
				newSegment.posy = vm.snake[0].posy;
				vm.snake[0].length -= 2;
				vm.snake.unshift(newSegment);
			} else if (key.code === 'ArrowUp' && vm.snake[0].direction === 'horizontal') {
				newSegment.direction = 'vertical';
				newSegment.pointing = 'up';
				newSegment.posx = vm.snake[0].posx;
				newSegment.posy = vm.snake[0].posy - 2;
				vm.snake[0].length -= 2;
				vm.snake.unshift(newSegment);
			} else if (key.code === 'ArrowDown' && vm.snake[0].direction === 'horizontal') {
				newSegment.direction = 'vertical';
				newSegment.pointing = 'down';
				newSegment.posx = vm.snake[0].posx;
				newSegment.posy = vm.snake[0].posy + 2;
				vm.snake[0].length -= 2;
				vm.snake.unshift(newSegment);
			}
		}

		function snakeFullLength () {
			var fullLength = 0;
			vm.snake.forEach(function (segment, index) {
				fullLength += segment.length;
			});
			return fullLength;
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

			return setInterval(defineSnake, 10);

		}
	}
})();
