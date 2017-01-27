/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _view = __webpack_require__(1);
	
	var _view2 = _interopRequireDefault(_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var view = new _view2.default();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(2);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _vars = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var View = function () {
	  function View() {
	    _classCallCheck(this, View);
	
	    var canvasEl = document.getElementById("canvas");
	    this.ctx = canvasEl.getContext("2d");
	    this.keyLeft = false;
	    this.keyRight = false;
	    this.topScore = 0;
	    this.currentScore = 0;
	    this.handleInput();
	  }
	
	  _createClass(View, [{
	    key: 'start',
	    value: function start() {
	      this.timer = 0;
	      this.game = new _game2.default(this.ctx);
	      this.player = this.game.player;
	      this.currentScore = 0;
	      this.generateRate = _vars.GENERATE_SHAPE_FRAME;
	      this.difficulty = 0;
	      requestAnimationFrame(this.frame.bind(this));
	    }
	  }, {
	    key: 'handleInput',
	    value: function handleInput() {
	      var _this = this;
	
	      var player = this.player;
	      document.addEventListener("keydown", function (e) {
	        _this.handleKeyDown(e);
	      });
	      document.addEventListener("keyup", function (e) {
	        _this.handleKeyUp(e);
	      });
	
	      document.addEventListener("keypress", function (e) {
	        e.preventDefault();
	        if (e.code === "Space") {
	          _this.handleSpace();
	        }
	      });
	    }
	  }, {
	    key: 'handleSpace',
	    value: function handleSpace() {
	      if (this.game === undefined || this.game.gameOver) {
	        document.getElementById("pre-game").style.visibility = "hidden";
	        document.getElementById("post-game").style.visibility = "hidden";
	
	        this.game = new _game2.default(this.ctx);
	        this.player = this.game.player;
	        this.start();
	      }
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(e) {
	      if (e.key === "ArrowRight") {
	        this.keyRight = true;
	      } else if (e.key === "ArrowLeft") {
	        this.keyLeft = true;
	      }
	    }
	  }, {
	    key: 'handleKeyUp',
	    value: function handleKeyUp(e) {
	      if (e.key === "ArrowRight") {
	        this.keyRight = false;
	      } else if (e.key === "ArrowLeft") {
	        this.keyLeft = false;
	      }
	    }
	  }, {
	    key: 'frame',
	    value: function frame() {
	      if (this.keyLeft) {
	        this.player.handleMove(-_vars.PLAYER_SENSITIVITY);
	      } else if (this.keyRight) {
	        this.player.handleMove(_vars.PLAYER_SENSITIVITY);
	      }
	      this.timer++;
	      if (this.timer === this.generateRate) {
	        this.game.generateShape();
	        if (this.difficulty + 30 < _vars.GENERATE_SHAPE_FRAME) {
	          this.difficulty += 1;
	        }
	        this.generateRate += _vars.GENERATE_SHAPE_FRAME - this.difficulty;
	      }
	
	      this.game.tick();
	      this.ctx.font = '20px Arial';
	      this.ctx.fillText(this.game.count, 470, 20);
	      if (this.game.gameOver) {
	        document.getElementById("post-game").style.visibility = "visible";
	        this.currentScore = this.game.count;
	        if (this.currentScore > this.topScore) {
	          this.topScore = this.currentScore;
	        }
	        document.getElementById("score").innerHTML = this.currentScore;
	        document.getElementById("top-score").innerHTML = this.topScore;
	      } else {
	        requestAnimationFrame(this.frame.bind(this));
	      }
	    }
	  }]);
	
	  return View;
	}();
	
	exports.default = View;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _player = __webpack_require__(3);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _shape = __webpack_require__(5);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	var _vars = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(ctx) {
	    _classCallCheck(this, Game);
	
	    this.ctx = ctx;
	    this.player = new _player2.default();
	    this.shapes = [];
	    this.count = 0;
	    this.gameOver = false;
	  }
	
	  _createClass(Game, [{
	    key: 'generateShape',
	    value: function generateShape() {
	      var shape = new _shape2.default();
	      this.shapes.push(shape);
	    }
	  }, {
	    key: 'handleCollision',
	    value: function handleCollision() {
	      var _this = this;
	
	      this.shapes.forEach(function (shape) {
	        if (shape.handleCollision(_this.player)) {
	          _this.gameOver = true;
	        }
	      });
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      var _this2 = this;
	
	      this.shapes.forEach(function (shape) {
	        if (shape.radius < _vars.CENTER_RADIUS) {
	          _this2.shapes.splice(_this2.shapes.indexOf(shape), 1);
	          _this2.count += 1;
	        }
	      });
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var _this3 = this;
	
	      this.ctx.clearRect(0, 0, _vars.CANVAS_WIDTH, _vars.CANVAS_HEIGHT);
	      this.shapes.forEach(function (shape) {
	        shape.draw(_this3.ctx);
	        shape.shrink(_vars.SHAPE_SHRINK_RATE);
	        shape.rotate();
	      });
	      this.player.draw(this.ctx);
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      this.draw();
	      this.handleCollision();
	      this.remove();
	      if (this.player.clockwise) {
	        this.player.handleMove(1);
	      } else {
	        this.player.handleMove(-1);
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vars = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Player = function () {
	  function Player() {
	    _classCallCheck(this, Player);
	
	    this.angle = 0;
	    this.radius = 50;
	    this.clockwise = true;
	    this.pulse = false;
	  }
	
	  _createClass(Player, [{
	    key: 'handleMove',
	    value: function handleMove(delta) {
	      if (delta > 0) {
	        this.clockwise = true;
	      } else {
	        this.clockwise = false;
	      }
	      if (this.angle + delta > 360) {
	        this.angle = delta;
	      } else if (this.angle + delta < 0) {
	        this.angle = 360 + delta;
	      } else {
	        this.angle += delta;
	      }
	    }
	  }, {
	    key: 'getPos',
	    value: function getPos() {
	      var x = _vars.CANVAS_WIDTH / 2 + this.radius * Math.cos(Math.PI * this.angle / 180);
	      var y = _vars.CANVAS_HEIGHT / 2 + this.radius * Math.sin(Math.PI * this.angle / 180);
	      return [x, y];
	    }
	  }, {
	    key: 'pulsate',
	    value: function pulsate() {
	      this.pulse = !this.pulse;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.beginPath();
	      ctx.arc(this.getPos()[0], this.getPos()[1], _vars.BALL_RADIUS, 0, 2 * Math.PI);
	      ctx.fillStyle = 'red';
	      ctx.fill();
	
	      ctx.beginPath();
	      var centerRadius = _vars.CENTER_RADIUS;
	
	      ctx.arc(_vars.CANVAS_WIDTH / 2, _vars.CANVAS_HEIGHT / 2, centerRadius, 0, 2 * Math.PI);
	      ctx.fillStyle = 'white';
	      ctx.fill();
	    }
	  }]);
	
	  return Player;
	}();
	
	exports.default = Player;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	
	var difficulty = 2;
	//canvas
	var CANVAS_HEIGHT = exports.CANVAS_HEIGHT = 500;
	var CANVAS_WIDTH = exports.CANVAS_WIDTH = 500;
	
	//player
	var BALL_RADIUS = exports.BALL_RADIUS = 7;
	var CENTER_RADIUS = exports.CENTER_RADIUS = 30;
	var PLAYER_SENSITIVITY = exports.PLAYER_SENSITIVITY = 5;
	
	//shape
	var SHAPE_ANGLE_CHANGE = exports.SHAPE_ANGLE_CHANGE = 0 + difficulty;
	var SHAPE_STARTING_RADIUS = exports.SHAPE_STARTING_RADIUS = 300;
	var SHAPE_SHRINK_RATE = exports.SHAPE_SHRINK_RATE = 0 + difficulty;
	var STARTING_ANGLES = exports.STARTING_ANGLES = [[0], [0, 180], [0, 120, 240]];
	var ARC_LENGTHS = exports.ARC_LENGTHS = [180, 80, 45];
	
	//view
	var GENERATE_SHAPE_FRAME = exports.GENERATE_SHAPE_FRAME = 120 - 20 * difficulty;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vars = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Shape = function () {
	  function Shape() {
	    _classCallCheck(this, Shape);
	
	    this.radius = _vars.SHAPE_STARTING_RADIUS;
	    this.clockwise = Math.random() > 0.5 ? true : false;
	    this.color = 'white';
	    this.generateStartAngles();
	  }
	
	  _createClass(Shape, [{
	    key: 'generateStartAngles',
	    value: function generateStartAngles() {
	      var _this = this;
	
	      var select = Math.floor(Math.random() * _vars.STARTING_ANGLES.length);
	      this.arcLength = _vars.ARC_LENGTHS[select];
	      var selectAngles = _vars.STARTING_ANGLES[select];
	      var delta = Math.random() * 360;
	      selectAngles = selectAngles.map(function (angle) {
	        return _this.handleMove(angle + delta);
	      });
	      this.startAngles = selectAngles;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      var _this2 = this;
	
	      this.startAngles.forEach(function (startAngle) {
	        ctx.beginPath();
	        ctx.arc(_vars.CANVAS_WIDTH / 2, _vars.CANVAS_HEIGHT / 2, _this2.radius, startAngle * Math.PI / 180, (startAngle + _this2.arcLength) * Math.PI / 180);
	        ctx.strokeStyle = _this2.color;
	        ctx.lineWidth = 7;
	        ctx.stroke();
	      });
	    }
	  }, {
	    key: 'shrink',
	    value: function shrink(num) {
	      this.radius -= num;
	    }
	  }, {
	    key: 'handleMove',
	    value: function handleMove(angle) {
	      if (angle > 360) {
	        angle -= 360;
	      } else if (angle < 0) {
	        angle += 360;
	      }
	      return angle;
	    }
	  }, {
	    key: 'handleCollision',
	    value: function handleCollision(other) {
	      var _this3 = this;
	
	      var collision = false;
	      this.startAngles.forEach(function (startAngle) {
	        if (other.radius - _vars.BALL_RADIUS <= _this3.radius && other.radius + _vars.BALL_RADIUS >= _this3.radius) {
	          var end = startAngle + _this3.arcLength;
	          var start = startAngle;
	          if (start >= 360 || end >= 360) {
	            end -= 360;
	            start -= 360;
	          }
	          if (other.angle > start && other.angle < end || other.angle - 360 > start && other.angle - 360 < end || other.angle + 360 > start && other.angle + 360 < end) {
	            collision = true;
	          }
	        }
	      });
	      return collision;
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate() {
	      var _this4 = this;
	
	      this.startAngles = this.startAngles.map(function (startAngle) {
	        if (_this4.clockwise) {
	          startAngle = _this4.handleMove(startAngle + _vars.SHAPE_ANGLE_CHANGE);
	        } else {
	          startAngle = _this4.handleMove(startAngle - _vars.SHAPE_ANGLE_CHANGE);
	        }
	        return startAngle;
	      });
	    }
	  }]);
	
	  return Shape;
	}();
	
	exports.default = Shape;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map