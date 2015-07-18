//	window.loadApp = {};
	function isWeixin(){
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	};

	var browser = {
		versions : function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {
				trident : u.indexOf('Trident') > -1,
				presto : u.indexOf('Presto') > -1,
				webKit : u.indexOf('AppleWebKit') > -1,
				gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
				mobile : !!u.match(/AppleWebKit.*Mobile.*/),
				ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
				iPhone : u.indexOf('iPhone') > -1,
				iPad : u.indexOf('iPad') > -1,
				webApp : u.indexOf('Safari') == -1
			}
		}(),
		language : (navigator.browserLanguage || navigator.language)
				.toLowerCase()
	};
	
	function load(){
		alert(0);
		if(loadApp.isWeixin()){
	        //weixin为提示使用浏览器打开的div
	        $("#dlog").show();
	        if(browser.versions.ios || browser.versions.iPhone || browser.versions.iPad){
	        	//设备为iphone类版
	        	$("#step").html("在Safari中打开");
	           
	        }else{
	        	$("#step").html("在浏览器中打开");
	        }
	    }else{
	        //下载页div
	    	alert(1);
	        location.href="http://edu.189.cn/eip-platform-file-server/repo/apkfile/rrt/rrtim.apk";
	    }
	};


