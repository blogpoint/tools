"use strict";

function setCookie(name,value,days,domain,samesite) {
    var expires = "";
    if (days===0) {
    	expires = "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } else
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    try {
    	document.cookie = name + "=" + (value || "")  + expires + (domain?("; domain="+domain):"") + "; path=/; SameSite="+(samesite?samesite:"Lax")+";";
    } catch (e) {}
}

function getCookie(cookiename) {
	if (document.cookie && document.cookie != '') {
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++) {
            var namevalue = split[i].split("=");
            if (namevalue.length==2) {
            	var name = namevalue[0].replace(/^ /, '');
            	if (cookiename==name) {
            		return decodeURIComponent(namevalue[1]);
            	}
            }
        }
    }
	return false;
}

function deleteCookie(name) {
	try {
		document.cookie=name+"=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		document.cookie=name+"=; path=/; domain="+window.location.hostname.substring(window.location.hostname.indexOf(".")+1)+"; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	} catch (e){}
}



function isquantcastloaded() {
	if ((typeof(window.qtrack) === "function"))
		return true;
	
	if ($("#qc-cmp2-persistent-link, #qc-cmp2-ui, #qc-cmp2-main").length>0)
		return true;
	
	return false;
}


function saveconsent(essential, ads, personalads) {
	var data = {};
	if (essential)
		data.essential = true;
	if (ads)
		data.ads = true;
	if (personalads)
		data.personalads = true;
	if ($("html").hasClass("eea"))
		data.eea = true;
	
	try {
		$.ajax({
			  type: "POST",
			  url: "/cmp/protocol",
			  data: data,
			  async:false,
			  dataType:'text'
			});
	} catch (e){}
}

function loadalternativeads() {
	
	$("html").removeClass("adsenseloaded");
	
	$(".px1").html('<iframe class="vert" src="/cratr/?size=300x600"></iframe></div>');
	$(".px2").html('<iframe class="horz" src="/cratr/?size=728x130"></iframe></div>');
	$(".px3").hide();
	
}

function loadads(personalised) {
	
	if ($("html").hasClass("adsenseloaded"))
		return;
	
	$("html").addClass("adsenseloaded");
	
	if (!personalised) {
		for (var i=0;i<window.adsbygoogle.length;i++) {
			window.adsbygoogle[i].requestNonPersonalizedAds=1;
		}
	}
	
	try {
	    var adsbygoogle_script = document.createElement('script');
        adsbygoogle_script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        adsbygoogle_script.async = true;
        document.head.appendChild(adsbygoogle_script);
	} catch (ade) {
		$.getScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
	}
	
}

function loadalternativecmp() {
	
	try {
		$("#cmploadingnotify").show();
		
		if ($("html").hasClass("alternativecmploaded")) {
			$("#alternativecmpmodal").modal('show');
			return;
		}
			
		var modal = $('<div></div>');
		modal.load("/cmp/alternative/dialog", function(req,status,xhr){
			
			if (status=="success") {
				
				$("#cmploadingnotify").hide();
				modal.appendTo($("body"));
			
				if (modal.find("button").length>0) {
					$("html").addClass("alternativecmploaded");
					
					if ($("html").hasClass("eea")==false) {
						modal.find("button.disagree, button.moreinfo").removeClass("btn-primary").addClass("btn-default");
					}
				
					$("#showcookieconsentbtn").fadeOut();
					$(".openconsentdialog").find("img").remove();
					
					modal.find("button.agree").click(function(){
						saveconsent(true,true,true);
						$("#alternativecmpmodal").modal('hide');
						setCookie("consent", "necessary-ads-personalads", 7);
						
						loadads(true);
			    		
						if ($("html").hasClass("calc")) {
			        		$("#input").removeClass("disabled");
			        	} else {
							window.location.href = window.location.protocol +'//'+ window.location.host + window.location.pathname;
							return;
						}
						
					});
					modal.find("button.disagree").click(function(){
						saveconsent(false,false,false);
						$("#alternativecmpmodal").modal('hide');
						setCookie("consent", "none", 7);
						
						
						if ($("html").hasClass("calc")) {
			        		$("#input").removeClass("disabled");
			        	}
			        	
			        	if ($("html").hasClass("questions") || html.hasClass("question")) {
							window.location.href = window.location.protocol +'//'+ window.location.host + window.location.pathname;
							return;
						}
			        	
					});
					modal.find("button.moreinfo").click(function(){
						modal.find("div.moreinfo").fadeIn();
						if ($(this).hasClass("btn-lg"))
							$(this).fadeOut();
						modal.find("div.moreinfo .partners").load("/cmp/partners");
					});
					
					$("#alternativecmpmodal").modal('show');
				}
			}
		});
	
		window.setTimeout(function(){
			if (modal.find("button").length==0) {
				loadfallbackcmp();
			}
		}, 3789);
		
		window.setInterval(function(){
			if ($("#qc-cmp2-container").length>0) {
				$("#qc-cmp2-container").remove();
			}
		}, 250);
	} catch (e1) {
		sendErrorReport("cmpalternative.load",e1);
	}
}



function loadquantcast(show) {
	
	if (window.loadquantcastmux)
		return;
	window.loadquantcastmux = true;
	
	try {
		$("#cmploadingnotify").show();
		
		if ($("html").hasClass("eea")==false) {
			loadalternativecmp();
			
			window.loadquantcastmux = false;
			return;
		}
		
		if ($("html").hasClass("quantcastloaded")) {
			if ($("#qc-cmp2-persistent-link").length==1)
				$("#qc-cmp2-persistent-link").click();
			else
				loadalternativecmp();
			
			window.loadquantcastmux = false;
			return;
		}
		
		var start = new Date();
		window.setInterval(function(){
			var span = $("#cmploadingnotify .progress");
			if (span.length==1) {
				var d =(new Date().getTime() - start.getTime());
				var p = parseInt(100*d / 8000);
				if (p>99)
					p=99;
				span.text(p+"%");
			}
		},250);
		
		$("html").addClass("quantcastloaded");
			
		$.getScript("https://web2.0calc.com/js/qc.js");
		
		window.setTimeout(function(){
			if (isquantcastloaded()==false) {
				loadalternativecmp();
			}
		}, 6789);
		
		if (show) {
			var timeout = 12;
			window.wloadquantcasttimer=window.setInterval(function(){
				if ($("#qc-cmp2-ui").length==1 && $("#qc-cmp2-ui").is(":visible")) {
					window.clearInterval(window.wloadquantcasttimer);
					return;
				}
				timeout--;
				if (timeout<=0) {
					window.clearInterval(window.wloadquantcasttimer);
					return;
				}
				if (isquantcastloaded()) {
					if ($("#qc-cmp2-persistent-link").length==1) {
						$("#qc-cmp2-persistent-link").click();
						window.clearInterval(window.wloadquantcasttimer);
					}
				}
			},500);
		}
		
		window.cmploadedtimer=window.setInterval(function(){
			if (isquantcastloaded()) {
				$("#editprivacysettingsbtn").remove();
				$("#cmploadingnotify").hide();
				window.clearInterval(window.cmploadedtimer);
			}
		},250);
		
		
	} catch (e1) {
		sendErrorReport("quantcast.load",e1);
	}
	window.loadquantcastmux = false;
}


$(document).ready(function(){

	try {
		
		if ($("html").hasClass("mobile")) {
			$(".px1").remove();
			$(".px3").remove();
		}
		
		window.adsbygoogle = [];
		$(".px1, .px2, .px3").each(function(){
			window.adsbygoogle.push({});
		});
		
		var tzo = new Date().getTimezoneOffset();
		if (tzo>=-180 && tzo<=180) {
			$("html").addClass("eea");
		}
		if ($("html").hasClass("eu")) {
			$("html").addClass("eea");
		}
		if (navigator && navigator.language && typeof(navigator.language)==='string' && navigator.language.indexOf('de')==0 ) {
			$("html").addClass("eea");
		}
		 
		var consentstring = getCookie("consent");
		var tcstring = getCookie("euconsent-v2");
		
		if (consentstring!==false && consentstring==="none") {
			$("#input").removeClass("disabled");
			loadalternativeads();
		} else
		if (consentstring!==false && tcstring===false && consentstring.indexOf("ads")>=0) {
			
			if (consentstring.indexOf("personalads")==-1) { 
				loadads(false);
			} else {
				loadads(true);
			}
			
		    $("#input").removeClass("disabled");
		} 
		 
		while (tcstring && tcstring.length>4) {
			
			var gdprapplies = getCookie("gdprapplies");
			if (gdprapplies === false) {
				loadquantcast();
				break;
			}

			if (typeof (window.sessionStorage) == 'undefined') {
				loadquantcast();
				break;
			}

			var tcData = window.sessionStorage.getItem('tcf2.tcdata');
			if (!tcData) {
				loadquantcast();
				break;
			}
			try {
				tcData = JSON.parse(tcData);
			} catch (jsone) {
				loadquantcast();
				break;
			}

			if (tcData.tcString != tcstring) {
				loadquantcast();
				break;
			}
			
			tcData.gdprApplies = ("0"===gdprapplies)?false:true;
			if ($("html").hasClass("eea")) {
				tcData.gdprApplies=true;
			}
			
			tcData.eventStatus= "tcloaded";
			
			window.__tceventlisteners=[];
			window.__tcfapi = function(command, version, callback, parameter){
				if (command=="getTCData") {
					if (tcData.listenerId)
						delete tcData.listenerId;
					callback(tcData, true);
					return;
				} else
				if (command=="ping") {
					callback({"cmpId":tcData.cmpId,"cmpVersion":tcData.cmpVersion,"gdprApplies":tcData.gdprApplies,"tcfPolicyVersion":tcData.tcfPolicyVersion,"cmpLoaded":true,"cmpStatus":"loaded","displayStatus":"hidden","apiVersion":"2","gvlVersion":62}, true);
					return;
				} else
				if (command=="addEventListener") {
					window.__tceventlisteners.push(callback);
					tcData.listenerId=window.__tceventlisteners.length;
					callback(tcData, true);
					return;
				} else
				if (command="removeEventListener") {
					if (parameter>=0 && parameter<window.__tceventlisteners.length) {
						window.__tceventlisteners[parameter]=null;
					}
					callback(true);
					return;
				}
			}
			
			var iframe = $('<iframe name="__tcfapiLocator"></iframe>');
			iframe.appendTo($("body"));
			iframe.hide();
				
			try {
				var postMessageEventHandler = function (event) {
			      var json = {};
			      try {
			        if (typeof event.data === 'string') {
			          json = JSON.parse(event.data);
			        } else {
			          json = event.data;
			        }
			      } catch (jpe) {}
			     
			      if (json.__tcfapiCall) {
			        if (window.__tcfapi) {
				    	window.__tcfapi(
				          json.__tcfapiCall.command,
				          json.__tcfapiCall.version,
				          function(val, success) {
				            var ret = {
				              __tcfapiReturn: {
				                returnValue: val,
				                success: success,
				                callId: json.__tcfapiCall.callId
				              }
				            };
				            if (typeof event.data === 'string') {
				              ret = JSON.stringify(ret);
				            }
				            if (event.source && typeof event.source.postMessage === 'function') {
				            	event.source.postMessage(ret, '*');
				            }
				          },
				          json.__tcfapiCall.parameter
				        );
			        }
			      }
			    };
			    
			    window.__tcfapi.msgHandler = postMessageEventHandler;        
			    if (window.addEventListener)
		            window.addEventListener('message', postMessageEventHandler, false);
		        else
		            window.attachEvent('onmessage', postMessageEventHandler);
			} catch (wae) {}
			
			var hasStoreOnDeviceConsent = tcData.purpose.consents[1] || false;
			var hasBasicAdsConsent = tcData.purpose.consents[2] || false;
			var hasPersonalAdsProfileConsent = tcData.purpose.consents[3] || false;
	        var hasPersonalAdsConsent = tcData.purpose.consents[4] || false;
			
		    if (hasStoreOnDeviceConsent && hasBasicAdsConsent) {
		    	
		    	var hasVendorGoogleConsent = tcData.vendor.consents[755] || false;
	        	if (hasVendorGoogleConsent) {
		    	
			    	if (hasPersonalAdsProfileConsent && hasPersonalAdsConsent) {
			    		loadads(true);
			    	} else {
			    		loadads(false);
			    	}
			    	
	        	} else {
	        		loadalternativeads();
	        	}
		    } else {
		    	loadalternativeads();
		    }
		     
			$("#input").removeClass("disabled");
			break;
		} 
		

		/*
		var inputctl = $("#input");
		if (inputctl.hasClass("disabled")) {
		
			$("#calccontainer .center .btn, #calccontainer .center button").bind("mouseup", function(event){
				if (inputctl.hasClass("disabled")) {
					event.stopPropagation();
					event.preventDefault();
					loadquantcast();
				}
			});
				
			$("#calccontainer input").click(function(event){
				if (inputctl.hasClass("disabled")) {
					event.stopPropagation();
					event.preventDefault();
					loadquantcast();
				}
			});
		}
		*/
		
		 $(".openconsentdialog").click(function(){
	    	var btn = $(this);
	    	if (btn.hasClass("btn")) {
	    		$("<img style=\"margin-left: 5px;\" src=\"/img/loading.gif\" />").appendTo(btn);
	    		window.setTimeout(function(){
	    			btn.find("img").remove();
	    		}, 2000);
	    	}
			loadquantcast(true);
		});
		 
		$("<button type=\"button\" id=\"editprivacysettingsbtn\" class=\"btn btn-sm btn-primary pull-right\"><span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span><span>&#160;Edit Privacy Settings</span></button>").appendTo($("body"));
		$("#editprivacysettingsbtn").click(function(){
			loadquantcast(true);
		});
		
		$(window).unload(function() {
			deleteCookie("__qca");
	    });
		 
		$("#withdrawconsentbtn").click(function(){
			deleteCookie("gdprapplies");
			deleteCookie("consent");
			deleteCookie("euconsent-v2");
		});
		
		if (consentstring===false && tcstring===false) {
			loadquantcast(true);
		}
		
		 
	} catch (e) {
		sendErrorReport("tcf2.init",e);
	}
	
});
