
(function (global) {

  "use strict";

	// 工具类
	var tool = {
	  // 获取元素
	  getElement: function(opts) {
	  	return document.querySelector(opts);
	  },
	  // 检查非空
	  isEmpty: function(val) {

	    return val != '' && val != null && val != undefined ? false : true;

	  },
	  /**
	   * @method 配置
	   * @param opts { object } 用户提供的参数，在没有提供参数的情况下使用默认参数 
	   * @param options { object } 默认参数
	   * @return options { object } 返回一个配置对象
	   */
	  config: function(opts, options) {
	    //默认参数
	    if (!opts) return options;

	    for (var key in opts) {

	      if (!!opts[key]) {

	        options[key] = opts[key];

	      }
	    }
	    
	    return options;

	  }	
    };

	// 日历方法相关 功能函数类
	var dateFn = {
		initmodle: function(_initdate) {

			var oneDay = this.myFunction(_initdate),        // 获取当月1号星期几
				dayCount = this.getmonthday(_initdate),     // 获取当月有几天
				upMonthDay = this.getupmonthday(_initdate), // 获取上月有几天
				t = 1,
				l = 0,										// 用l代替y
				datemodle = [								// 点击即初始化数据模型
					[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0]
				];

			for ( var x = 0; x < 7; x++ ) {

				for ( var y = 0; y < 7; y++ ) {

					if ( x === 0 && l == 0 ) {

						y = oneDay;

						l = 1;

					}

					if ( t > dayCount ) {

						t = 1;

					}

					if ( x === 0) {
						datemodle[0][y] = t++;
					} 
					else if ( x === 1) {
						datemodle[1][y] = t++;
					} 	
					else if ( x === 2) {
						datemodle[2][y] = t++;
					} 
					else if ( x === 3) {
						datemodle[3][y] = t++;
					} 
					else if ( x === 4) {
						datemodle[4][y] = t++;
					} 
					else {
						datemodle[5][y] = t++;
					} 
				}
			}		

			// 填充上月在 当前页面的 日期
			for ( let u = oneDay - 1; u >= 0; u-- ){

				datemodle[0][u] = upMonthDay--;

			}	

			return [oneDay, dayCount, datemodle, _initdate]

		},

		// 生成静态部分html
		staticRender: function (opts){

			var d = new Date(),
				initdate = [],
				contd = document.getElementsByClassName("dateForm"),
				contentt = document.getElementsByClassName("Datecontent");

			// 初始化静态部分html模块
			(function(){
				var di = document.createElement("div"),
					el = tool.getElement(opts),    		// 用户挂载对象
					at,
					xuanRan1 = '<div class="calendar-container" id="calendar-container">' +
									"<form action='#' id='datecha' class='dateForm'>" +
										'<input type="text"  id="inputYear" value="' + new Date().getFullYear() + '">' +
										'<input type="text"  id="inputMonth" value="' +  (new Date().getMonth() + 1) + '">' +
										'<button id="datebtn">查询</button>' +
									'</form>' +
									'<div class="calendar-container-show">'+
										'<div class="titledate">' +
											'<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>'+
										'</div>' +
										'<ul id="content" class="Datecontent">' +
										'</ul>' +
									'</div>' +
								'</div>';

				di.innerHTML = xuanRan1;

				el.style.position = "relative";

				el.append(di);

				// 初始化日期 并渲染
				initdate[0] = d.getFullYear();

				initdate[1] = d.getMonth() + 1;

				initdate[2] = d.getDate();

		 		at = dateFn.initmodle(initdate);

				dateFn.render(at[0],at[1],at[2],at[3]);	 // 调用渲染函数

			})();


 			// 事件绑定模块  统一处理
			(function(){

				contd = contd[contd.length - 1]; 
				
				contentt = contentt[contentt.length - 1];

			    // button 事件绑定
				contd[2].addEventListener("click", function(event) {

					var at;

					contentt.innerHTML = ""; // 闭包引用 contentt

					initdate[0] = contd[0].value;   // 收集输入的 年

					initdate[1] = contd[1].value;	// 收集输入的 月

			 		at = dateFn.initmodle(initdate);

					dateFn.render(at[0],at[1],at[2],at[3], contentt);	 // 调用渲染函数

				}); 

			})();	
		},

		render: function(dday, dmonth, _datemodle, _initdate, _contentt) {

			var l=0, // 用l代替y
				nt,
				xuanRan1="",
				contentt = _contentt || document.getElementsByClassName("Datecontent");	// 

			for ( let x = 0; x < _datemodle.length; x++ ) {

				xuanRan1 = '<li>';

				for ( let y = 0; y < 7; y++ ){

					if ( x == 0 && y >= dday || x > 0 && l < dmonth ){

						nt = "nt";

						l++;

					} else {

						nt = "";

					}

					if ( l == _initdate[2] ){

						nt = "dangtian"

					}

					xuanRan1 += "<span class=" + nt + ">" + _datemodle[x][y] + "</span>";

					if ( y == 6 ) {

						xuanRan1 += "</li>";

						if (_contentt) {

							contentt.innerHTML += xuanRan1;

						} else {

							contentt[contentt.length-1].innerHTML += xuanRan1;	

						}

					}
				}
		    }
		},

		// 获取当月1号 星期几
		myFunction: function(option) {

			var date = new Date();

			date.setFullYear(option[0],option[1]-1,"1");

			return date.getDay();
		},

		// 获取当月有几天
		getmonthday: function(option) {

			var date = new Date();

			date.setFullYear(option[0],option[1],"0");

			return date.getDate();
		},

		// 获取上一个月有几天
		getupmonthday: function(option) {

			var date = new Date();

			date.setFullYear(option[0],option[1]-1,"0");

			return date.getDate();
		}
	};

  	/*
  	 * 初始化插件 入口
  	*/
    function DateJs(option) { 
    	this.el = option.el;
		this.init(this.el)
  	};

  	/*
  	 * 插件提供的 方法
  	*/
    DateJs.prototype = {

	  	constructor:"DateJs",

	    init: function (opts) {

			dateFn.staticRender(opts); 		 			 // 执行初始化渲染

	    }
 	}


  	/*
  	 * 初始化插进   出口
  	*/
    global.DateJs = DateJs;		//注册到全局中， 届时可以直接new datejs() 实例化对象

})(this);





