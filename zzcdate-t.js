
(function (global) {

  "use strict";

    var datejs = function (option) {

	  	this.contd = document.getElementById("datecha");

		this.content = document.getElementById("content");

		this.initdate = []; // 实际参数,一开始默认是当天数据	

	  	// 日历表数据模型
	  	this.datemodle = [
			[0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0]
		]; 
  	};

  	// 初始化API   入口
  	// 有必要调用到插件本身this的， 就放在prototype上边， 功能函数尽量放在下方工具中
    datejs.prototype = {
	  	constructor:"datejs",
	    /**
	     * @method 初始化
	     * @param { object } 由@method config() 提供的配置参数
	     */
	    init: function (opts) {
	        var _this = this;
	        // var option = config(opts, this.options);//用户配置
	        // var _elems = document.getElementsByClassName(option.elem);
	        // var _elemsLength = _elems.length;
	        // var index = null;

			// 初始化 参数选项  initdate 默认当天
			(function(_this) {

				var d = new Date();

				_this.initdate[0] = d.getFullYear();

				_this.initdate[1] = d.getMonth()+1;

				_this.initdate[2] = d.getDate();

				// input 默认值
				_this.contd[0].value = _this.initdate[0];

				_this.contd[1].value = _this.initdate[1];

				tianchong(_this.initdate, _this.datemodle, _this.initdate)  // 执行初始化渲染

			})(this);

		    // 事件绑定
			this.contd[2].addEventListener("click", function(event) {

				_this.initdate[0] = _this.contd[0].value;

				_this.initdate[1] = _this.contd[1].value;

				_this.content.innerHTML = "";

				_this.datemodle = [
					[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0]
				];

		 		tianchong(_this.initdate, _this.datemodle, _this.initdate)

			});   
	    }
 	}

	function tianchong(option, _datemodle, _initdate) {

		var dday = myFunction(option);        // 获取当月1号星期几

		var dmonth = getmonthday(option);     // 获取当月有几天

		var dupmonth = getupmonthday(option); // 获取上月有几天

		var t = 1; 

		var l = 0; 							// 用l代替y

		var arr;

		for ( var x = 0; x < 7; x++ ) {

			
			for ( var y = 0; y < 7; y++ ) {

				if( x === 0 && l == 0 ) {

					y = dday;

					l = 1;

				}

				if( t > dmonth ) {

					t = 1;

				}

				// // 需要将代码改为
				// 这里会报 datemodle[x] is undefined
				// datemodle[x][y] = t++;
				// datemodle[x][y] = t++;  // 这里l 代替y 的原因是 用y在做上面判断的时候 浏览器会崩溃 ，而且 会爆i不存在的错误
				// 
				// 
				if( x === 0) {
					_datemodle[0][y] = t++;
				} 
				if( x === 1) {
					_datemodle[1][y] = t++;
				} 
				if( x === 2) {
					_datemodle[2][y] = t++;
				} 
				if( x === 3) {
					_datemodle[3][y] = t++;
				} 
				if( x === 4) {
					_datemodle[4][y] = t++;
				} 
				if( x === 5) {
					_datemodle[5][y] = t++;
				} 
			}
		}		

		// 填充上月在 当前页面的 日期
		for ( let u = dday-1; u >= 0; u-- ){

			// datemodle[0] = {};
			_datemodle[0][u] = dupmonth--;

		}

		xuanran(dday, dmonth, _datemodle, _initdate)	 // 调用渲染函数
	}

	// 渲染函数
	function xuanran(dday, dmonth, _datemodle, _initdate) {

		var l=0; // 用l代替y

		var nt;

		var xuanran1;

		for ( var x = 0; x < _datemodle.length; x++ ) {

			xuanran1 = "<li>";

			for ( var y = 0; y < 7; y++ ){

				if ( x == 0 && y >= dday || x > 0 && l < dmonth ){
					nt = "nt";

					l++;

				} else {

					nt = "";

				}

				if ( l == _initdate[2] ){

					nt = "dangtian"

				}

				xuanran1 += "<span class=" + nt + ">" + _datemodle[x][y] + "</span>";

				if ( y == 6 ) {

					xuanran1 += "</li>";

					content.innerHTML += xuanran1;	

				}
			}
	    }
	}

	// 获取当月1号 星期几
	function myFunction(option) {

		var date = new Date();

		date.setFullYear(option[0],option[1]-1,"1");

		return date.getDay();
	}

	// 获取当月有几天
	function getmonthday(option) {

		var date = new Date();

		date.setFullYear(option[0],option[1],"0");

		return date.getDate();
	}

	// 获取上一个月有几天
	function getupmonthday(option) {

		var date = new Date();

		date.setFullYear(option[0],option[1]-1,"0");

		return date.getDate();
	}


  // 工具函数
  // 检查非空
  function isEmpty(val) {

    return val != '' && val != null && val != undefined ? false : true;

  }

  /**
   * @method 配置
   * @param opts { object } 用户提供的参数，在没有提供参数的情况下使用默认参数 
   * @param options { object } 默认参数
   * @return options { object } 返回一个配置对象
   */
  function config(opts, options) {
    //默认参数
    if (!opts) return options;

    for (var key in opts) {

      if (!!opts[key]) {

        options[key] = opts[key];

      }
    }
    
    return options;
  }

  global.datejs = datejs;//注册到全局中， 届时可以直接new datejs() 实例化对象

})(this);





