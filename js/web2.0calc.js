/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b="length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){
return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba=/<([\w:]+)/,ca=/<|&#?\w+;/,da=/<(?:script|style|link)/i,ea=/checked\s*(?:[^=]|=\s*.checked.)/i,fa=/^$|\/(?:java|ecma)script/i,ga=/^true\/(.*)/,ha=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ia={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option,ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead,ia.th=ia.td;function ja(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function ka(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function la(a){var b=ga.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function ma(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function na(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function oa(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pa(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=oa(h),f=oa(a),d=0,e=f.length;e>d;d++)pa(f[d],g[d]);if(b)if(c)for(f=f||oa(a),g=g||oa(h),d=0,e=f.length;e>d;d++)na(f[d],g[d]);else na(a,h);return g=oa(h,"script"),g.length>0&&ma(g,!i&&oa(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(ca.test(e)){f=f||k.appendChild(b.createElement("div")),g=(ba.exec(e)||["",""])[1].toLowerCase(),h=ia[g]||ia._default,f.innerHTML=h[1]+e.replace(aa,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=oa(k.appendChild(e),"script"),i&&ma(f),c)){j=0;while(e=f[j++])fa.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(oa(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&ma(oa(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(oa(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!da.test(a)&&!ia[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(aa,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(oa(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(oa(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&ea.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(oa(c,"script"),ka),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,oa(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,la),j=0;g>j;j++)h=f[j],fa.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(ha,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qa,ra={};function sa(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function ta(a){var b=l,c=ra[a];return c||(c=sa(a,b),"none"!==c&&c||(qa=(qa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qa[0].contentDocument,b.write(),b.close(),c=sa(a,b),qa.detach()),ra[a]=c),c}var ua=/^margin/,va=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wa=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xa(a,b,c){var d,e,f,g,h=a.style;return c=c||wa(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),va.test(g)&&ua.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function ya(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var za=/^(none|table(?!-c[ea]).+)/,Aa=new RegExp("^("+Q+")(.*)$","i"),Ba=new RegExp("^([+-])=("+Q+")","i"),Ca={position:"absolute",visibility:"hidden",display:"block"},Da={letterSpacing:"0",fontWeight:"400"},Ea=["Webkit","O","Moz","ms"];function Fa(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Ea.length;while(e--)if(b=Ea[e]+c,b in a)return b;return d}function Ga(a,b,c){var d=Aa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ha(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ia(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wa(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xa(a,b,f),(0>e||null==e)&&(e=a.style[b]),va.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ha(a,b,c||(g?"border":"content"),d,f)+"px"}function Ja(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",ta(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xa(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fa(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ba.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fa(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xa(a,b,d)),"normal"===e&&b in Da&&(e=Da[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?za.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Ca,function(){return Ia(a,b,d)}):Ia(a,b,d):void 0},set:function(a,c,d){var e=d&&wa(a);return Ga(a,c,d?Ha(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=ya(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ua.test(a)||(n.cssHooks[a+b].set=Ga)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wa(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Ja(this,!0)},hide:function(){return Ja(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Ka(a,b,c,d,e){return new Ka.prototype.init(a,b,c,d,e)}n.Tween=Ka,Ka.prototype={constructor:Ka,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ka.propHooks[this.prop];return a&&a.get?a.get(this):Ka.propHooks._default.get(this)},run:function(a){var b,c=Ka.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ka.propHooks._default.set(this),this}},Ka.prototype.init.prototype=Ka.prototype,Ka.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Ka.propHooks.scrollTop=Ka.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Ka.prototype.init,n.fx.step={};var La,Ma,Na=/^(?:toggle|show|hide)$/,Oa=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pa=/queueHooks$/,Qa=[Va],Ra={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Oa.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Oa.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sa(){return setTimeout(function(){La=void 0}),La=n.now()}function Ta(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ua(a,b,c){for(var d,e=(Ra[b]||[]).concat(Ra["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Va(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||ta(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Na.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?ta(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ua(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wa(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xa(a,b,c){var d,e,f=0,g=Qa.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=La||Sa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:La||Sa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wa(k,j.opts.specialEasing);g>f;f++)if(d=Qa[f].call(j,a,k,j.opts))return d;return n.map(k,Ua,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xa,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Ra[c]=Ra[c]||[],Ra[c].unshift(b)},prefilter:function(a,b){b?Qa.unshift(a):Qa.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xa(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pa.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ta(b,!0),a,d,e)}}),n.each({slideDown:Ta("show"),slideUp:Ta("hide"),slideToggle:Ta("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(La=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),La=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ma||(Ma=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Ma),Ma=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Ya,Za,$a=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Za:Ya)),
void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Za={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$a[b]||n.find.attr;$a[b]=function(a,b,d){var e,f;return d||(f=$a[b],$a[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$a[b]=f),e}});var _a=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_a.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ab=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ab," ").indexOf(b)>=0)return!0;return!1}});var bb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cb=n.now(),db=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var eb=/#.*$/,fb=/([?&])_=[^&]*/,gb=/^(.*?):[ \t]*([^\r\n]*)$/gm,hb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ib=/^(?:GET|HEAD)$/,jb=/^\/\//,kb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lb={},mb={},nb="*/".concat("*"),ob=a.location.href,pb=kb.exec(ob.toLowerCase())||[];function qb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rb(a,b,c,d){var e={},f=a===mb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function ub(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ob,type:"GET",isLocal:hb.test(pb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sb(sb(a,n.ajaxSettings),b):sb(n.ajaxSettings,a)},ajaxPrefilter:qb(lb),ajaxTransport:qb(mb),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gb.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||ob)+"").replace(eb,"").replace(jb,pb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kb.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pb[1]&&h[2]===pb[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pb[3]||("http:"===pb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rb(lb,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ib.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(db.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fb.test(d)?d.replace(fb,"$1_="+cb++):d+(db.test(d)?"&":"?")+"_="+cb++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nb+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rb(mb,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tb(k,v,f)),u=ub(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vb=/%20/g,wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&").replace(vb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bb=0,Cb={},Db={0:200,1223:204},Eb=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cb)Cb[a]()}),k.cors=!!Eb&&"withCredentials"in Eb,k.ajax=Eb=!!Eb,n.ajaxTransport(function(a){var b;return k.cors||Eb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cb[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Db[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cb[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fb=[],Gb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fb.pop()||n.expando+"_"+cb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gb,"$1"+e):b.jsonp!==!1&&(b.url+=(db.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hb)return Hb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ib=a.document.documentElement;function Jb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ib;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ib})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jb(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=ya(k.pixelPosition,function(a,c){return c?(c=xa(a,b),va.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kb=a.jQuery,Lb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lb),b&&a.jQuery===n&&(a.jQuery=Kb),n},typeof b===U&&(a.jQuery=a.$=n),n});

/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.2.0",d.prototype.close=function(b){function c(){f.detach().trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",c).emulateTransitionEnd(150):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.2.0",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),d[e](null==f[b]?this.options[b]:f[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b).on("keydown.bs.carousel",a.proxy(this.keydown,this)),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.2.0",c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},c.prototype.keydown=function(a){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.to=function(b){var c=this,d=this.getItemIndex(this.$active=this.$element.find(".item.active"));return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=e[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:g});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,f&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(e)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:g});return a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one("bsTransitionEnd",function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger(m)),f&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(b=!b),e||d.data("bs.collapse",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};c.VERSION="3.2.0",c.DEFAULTS={toggle:!0},c.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},c.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var c=a.Event("show.bs.collapse");if(this.$element.trigger(c),!c.isDefaultPrevented()){var d=this.$parent&&this.$parent.find("> .panel > .in");if(d&&d.length){var e=d.data("bs.collapse");if(e&&e.transitioning)return;b.call(d,"hide"),e||d.data("bs.collapse",null)}var f=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[f](0),this.transitioning=1;var g=function(){this.$element.removeClass("collapsing").addClass("collapse in")[f](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return g.call(this);var h=a.camelCase(["scroll",f].join("-"));this.$element.one("bsTransitionEnd",a.proxy(g,this)).emulateTransitionEnd(350)[f](this.$element[0][h])}}},c.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},c.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var d=a.fn.collapse;a.fn.collapse=b,a.fn.collapse.Constructor=c,a.fn.collapse.noConflict=function(){return a.fn.collapse=d,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(c){var d,e=a(this),f=e.attr("data-target")||c.preventDefault()||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),g=a(f),h=g.data("bs.collapse"),i=h?"toggle":e.data(),j=e.attr("data-parent"),k=j&&a(j);h&&h.transitioning||(k&&k.find('[data-toggle="collapse"][data-parent="'+j+'"]').not(e).addClass("collapsed"),e[g.hasClass("in")?"addClass":"removeClass"]("collapsed")),b.call(g,i)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.2.0",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f+', [role="menu"], [role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.2.0",c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(c.$body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one("bsTransitionEnd",function(){c.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(300):c.$element.trigger("focus").trigger(e)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;if(this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;e?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(150):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var f=function(){c.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",f).emulateTransitionEnd(150):f()}else b&&b()},c.prototype.checkScrollbar=function(){document.body.clientWidth>=window.innerWidth||(this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar())},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.2.0",c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var c=a.contains(document.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!c)return;var d=this,e=this.tip(),f=this.getUID(this.type);this.setContent(),e.attr("id",f),this.$element.attr("aria-describedby",f),this.options.animation&&e.addClass("fade");var g="function"==typeof this.options.placement?this.options.placement.call(this,e[0],this.$element[0]):this.options.placement,h=/\s?auto?\s?/i,i=h.test(g);i&&(g=g.replace(h,"")||"top"),e.detach().css({top:0,left:0,display:"block"}).addClass(g).data("bs."+this.type,this),this.options.container?e.appendTo(this.options.container):e.insertAfter(this.$element);var j=this.getPosition(),k=e[0].offsetWidth,l=e[0].offsetHeight;if(i){var m=g,n=this.$element.parent(),o=this.getPosition(n);g="bottom"==g&&j.top+j.height+l-o.scroll>o.height?"top":"top"==g&&j.top-o.scroll-l<0?"bottom":"right"==g&&j.right+k>o.width?"left":"left"==g&&j.left-k<o.left?"right":g,e.removeClass(m).addClass(g)}var p=this.getCalculatedOffset(g,j,k,l);this.applyPlacement(p,g);var q=function(){d.$element.trigger("shown.bs."+d.type),d.hoverState=null};a.support.transition&&this.$tip.hasClass("fade")?e.one("bsTransitionEnd",q).emulateTransitionEnd(150):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=k.left?2*k.left-e+i:2*k.top-f+j,m=k.left?"left":"top",n=k.left?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(l,d[0][n],m)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one("bsTransitionEnd",b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName;return a.extend({},"function"==typeof c.getBoundingClientRect?c.getBoundingClientRect():null,{scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop(),width:d?a(window).width():b.outerWidth(),height:d?a(window).height():b.outerHeight()},d?{top:0,left:0}:b.offset())},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.2.0",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").empty()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.2.0",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.2.0",c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.closest("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},c.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one("bsTransitionEnd",e).emulateTransitionEnd(150):e(),f.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(c){c.preventDefault(),b.call(a(this),"show")})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.2.0",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=a(document).height(),d=this.$target.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=b-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){null!=this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:b-this.$element.height()-h}))}}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},d.offsetBottom&&(d.offset.bottom=d.offsetBottom),d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);

// end of bootstrap license

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);

/* end of modernizr license */


// (c) 2006-2020 Andre Massow britnex@gmail.com ,    
var displayoptions = {precision:0, scientific:0};





function hasBlocker(){
	if (typeof adsbygoogle != "undefined" && typeof adsbygoogle.loaded != "undefined")
		return false;
	
	if (typeof window.__google_ad_urls != "undefined") 
		return false;
	
	if (typeof window.google_iframe_oncopy != "undefined")
		return false;
	
	if (typeof window.google_jobrunner != "undefined")
		return false;
	
	if (typeof window.google_sa_impl != "undefined")
		return false;
	
	return true;
}

    
var Calc = function(){
	this.input = null;
	this.syntax = null;
	this.display = null;
	this.btns = null;
	this.preview = null;
	this.result = null;
	this.graph = null;
	this.trigodeg = null;
	this.trigorad = null;
	this.btns = null;
	this.popbtns = null;
	this.initcompleted = false;
	this.longclicktimer = null;
	this.looptime = new Date();
	this.lastbtn = null;
	this.ismobile = false;
	this.history = null;	
	this.axisbounds = [-360,360,-2,2];
	this.graphinputs = [];
	this.iswidget = false;
	this.lastinputs = [];
	this.constants = null;
	this.code = "";
	this.symbolic = null;
};



Calc.prototype.activatebutton = function(btn){
	
	var self = this;
	
	 if (this.lastbtn != null)
		 this.lastbtn.removeClass("active");
	 btn.addClass("active");
	 this.lastbtn = btn; 
	 
	 
	 if ((!this.ismobile) && (this.longclicktimer == null))
		 this.longclicktimer = window.setTimeout(function () {
		 	if (!btn.hasClass("noshift")) {
			 if (btn.hasClass("shift")) {
				 btn.unshift();
			 }
			 else {
				 btn.shift();
				 btn.addClass("removeshift");
			 }
			} 
			 this.longclicktimer = null;
		 }, 400);
};

Calc.prototype.deactivatebutton = function(btn){
	
	var self = this;
	
	 if (this.lastbtn != null)
		 this.lastbtn.removeClass("active");
	btn.removeClass("active");
	this.lastbtn=null;
	if (this.longclicktimer!=null){
		window.clearTimeout(this.longclicktimer);
		this.longclicktimer = null;
	} 	
	if (btn.hasClass("removeshift")) {
		btn.removeClass("shift");
		btn.unshift();
		btn.removeClass("removeshift");
	}
};




Calc.prototype.loopAnim = function() {
	var self = this;
	
	var now = new Date();
	var timediff = (now.getTime() - this.looptime.getTime());
	this.looptime=now;
	
	this.loop(timediff);
	
	if (window.requestAnimFrame) {
	
		if (!self.loopAnimCounter)
			self.loopAnimCounter=1;
		else
			self.loopAnimCounter++;
	
		if ((self.loopAnimCounter%2)==0)
			window.setTimeout(function(){self.loopAnim();}, 66); 
		else
			window.requestAnimFrame(function(){self.loopAnim();});  // requestAnimFrame only runs if tab has focus
	} else {
		window.setTimeout(function(){self.loopAnim();}, 66); 
	}
 
};


Calc.prototype.loopInterval = function() {	
	var self = this;
	
	var now = new Date();
	var timediff = (now.getTime() - this.looptime.getTime());
	this.looptime=now;
	
	this.loop(timediff);
	 
	window.setTimeout(function(){self.loopInterval();}, 50);	 
}; 

var const_preview_timeout = 500;

Calc.prototype.updatesharebtns = function(inputstr) {
	try {
		// update share links
		var query = (inputstr.length>0)?("?q="+encodeURIComponent( inputstr )):"";
		var canonical = $("link[rel='canonical']").attr("href");
		var text = encodeURIComponent( inputstr );
		if (text.length==0)
			text = encodeURIComponent($.trim($('title').text()));
		
		$("#sharetwitter").attr("href","https://twitter.com/intent/tweet?text="+ text +"&url="+ canonical + query );
		$("#sharefacebook").attr("href","https://www.facebook.com/sharer/sharer.php?u="+ canonical + query );
	} catch (e) {
		 
	}
}

Calc.prototype.loop = function(dt){
	var self = this;
	
	try{
	
		if (self.preview.input!=null){
			
			if (self.preview.timeout<=0) {		
				self.preview.timeout = const_preview_timeout;
				 
				
				if (self.input.request==null){
					
					if (self.error.error!=null) {
						self.error.hide();
						self.error.error = null;
			 		}
					
					if (self.preview.request!=null) {
						try{
							self.preview.request.abort();
						}catch(Exception) {}
					}
					
					var parameters = {"in": [ self.preview.input ], trig:(self.trigodeg.is(':checked')?"deg":"rad"), "code":self.code };
					
					
					self.preview.time = new Date().getTime();
					
					
					
					
		        	self.preview.request = $.ajax({
		                 url: (window.location.protocol + "//api." + window.location.hostname+"/preview"),
		                 dataType: 'json',
		                 data: parameters,
		                 async: true,
		                 type: 'POST',
		                 
		                 success: function (json) {
		                	 
		                	 try{
			                	 if (self.preview.request!=null){
			                		 
				                	 var results = json.results;
				                	 for (var i=0;i<results.length;i++)
				    	    		 {
				    	        		 var r = results[i];
				    	        		 switch (r.status) {
				    	        		 
				    	        		 	case "parseerror":
				    	        		 		
				    	        		 		if (r.img64) {
				    	        		 			var src = "data:image/png;base64,"+ r.img64;
				    	        		 			self.preview.attr("src",src);	
				    	        		 			    	        		 			
				    	        		 		}
				    	        		 		if (r.img) {
				    	        		 			var src = r.img;
				    	        		 			self.preview.attr("src",src);		    	        		 			
				    	        		 		}
				    	        		 		
				    	        		 		if (r["in"]) {
				 	    	        		 		//self.input.val( r["in"] );	    	        		 		
					    	        		 		var errindex = r.index;
					    	        		 		if (errindex<r["in"].length) {
						    	        		 		var s = r["in"].substring(0, errindex);
						    	        		 		if (self.input.val().indexOf(s)==0)
						    	        		 			self.syntax.val( s+"_" );
						    	        		 		
						    	        		 		/*
						    	        		 		error.error = r["in"];
						    	        		 		error.html( r["in"].slice(0, errindex) + "<i>" + r["in"].slice(errindex)+"</i>" );
						    	        		 		error.show();
						    	        		 		*/
					    	        		 		}
				    	        		 		}
				    	        		 		
				    	        		 		
				    	        		 		
				    	        		 		break;
				    	        		 
				    	        		 	case "ok":
				    	        		 		
				    	        		 		{
				    	        		 			var btndiv = $("#BtnCalc").parents(".btns:first");
				    	        		 			if (!btndiv.hasClass("programmer")) {
						    	        		 		if (r.bases=="yes") {
						    	        		 			btndiv.removeClass("graph");
						    	        		 			btndiv.addClass("bases");		    	        		 			
						    	        		 		} else
						    	        		 			btndiv.removeClass("bases");
				    	        		 			}
					    	        		 		
					    	        		 		if (r.graph=="yes") {
					    	        		 			btndiv.removeClass("bases");
					    	        		 			btndiv.addClass("graph");		    	        		 			
					    	        		 		} else
					    	        		 			btndiv.removeClass("graph");
				    	        		 		}
				    	        		 		
				    	        		 		    	        		 		    	        		 		
				    	        		 		if (r.img64) {
				    	        		 			var src = "data:image/png;base64,"+ r.img64;
				    	        		 			self.preview.attr("src",src);	 
				    	        		 		
				    	        		 			self.updatesharebtns( self.preview.input );    		 			
				    	        		 		}
				    	        		 		if (r.img) {
				    	        		 			var src = r.img;
				    	        		 			self.preview.attr("src",src);
				    	        		 		}
				    	        		 		
				    	        		 		
				    	        		 		    	        		 		
				    	        		 	break;
				    	        		 }
				    	    		 }
			                	 } 
			                	 
			                	 self.preview.request=null;
			                	 
			                	 
		                	 } catch (e) {
			 	             	sendErrorReport("precalc.success:", e);
			 	             }
			                	 
		                 },
		                 error: function (xhr, status, err) {                	 
		                	 self.preview.request=null;     	 
		                 }
		                 
		        	 });
				}
				
				self.preview.input = null;
			} else
				self.preview.timeout -= dt;
			
		}
		
	} catch (er) {
  		sendErrorReport("precalc:", er);
  	}
	
};




Calc.prototype.done = function() { 
	var self = this;
	
	
	if (!self.input.hasClass("urlinput"))
		self.input.val("");
	
	self.syntax.val("");
	
	
	
	
	if (self.iswidget==false && self.ismobile==false)
		self.input.focus();
		
		
	
	try {
		if (Modernizr.touchevents) {
			var html = $("html");
			html.addClass("softkeyboard");
			html.addClass("mobile");
			$(".px1").remove();
			var body = $("body");
			body.removeClass("axleft");
			body.removeClass("axright");
		}
	} catch (r1) {}
	
	if ($("html").hasClass("softkeyboard")) {
		self.input.prop('readonly', true);
		
		$("#keyboardbtn").click(function(){
			var label = $(this);
			var cb = label.find("input");
			
			if (cb.is(":checked")) {
				cb.prop("checked", false);
				self.input.prop('readonly', true);
				
			} else {
				cb.prop("checked", true);
				$("textarea").focus();
				self.input.prop('readonly', false);
				window.setTimeout(function(){
					self.input.focus();
				}, 500);
			}
			
		});
		
	}
	 
	if (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
	{
	 window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
	 window.setTimeout( function(){ self.loopAnim(); }, 500 );
	} else
	{
	 window.setTimeout( function(){ self.loopInterval(); }, 500 );
	}
		
	
	if ($("html").hasClass("calc"))
	{
		if (window.location) {
			var location = ""+window.location.href;
			 
			if (location.indexOf("#")>0) {
				var urlinput = location.substring((""+window.location).indexOf("#")+1);
				if (urlinput.match("[0-9]")) {
					
					if (urlinput.indexOf("%")>=0)
						urlinput=decodeURIComponent( urlinput );
					
					 			
					 self.input.val( urlinput );		
					 self.input.calc();		
					  
				}
			} else
			
			if (location.indexOf("?q=")>0) {
				var urlinput = location.substring((""+window.location).indexOf("?q=")+3);
				if (urlinput.match("[0-9]")) {
					
					if (urlinput.indexOf("%")>=0)
						urlinput=decodeURIComponent( urlinput );
					
					 self.input.val( urlinput );	
					 self.input.calc();			
					  
					
				}
			}
			
			
			
		}		
	}
	
	
	self.preview.show();
	
	this.initcompleted = true;
};

Calc.prototype.autoresize = function() {
	var self = this;
	
	if (!this.initcompleted)
		return;
	
	var h = 20;
	
	if (self.result.parents("body").hasClass("minimal"))
		h = 5;
	
	if (self.result.is(':visible'))
		h += self.result.height();
	
	if (self.preview.is(':visible'))
		h += self.preview.height();
	
	if (self.graph.is(':visible'))
		h += self.graph.height();
	
	if (h>self.display.height) {
		self.display.height = h;
		self.display.css({minHeight:(self.display.height+"px")});
	}
};

Calc.prototype.init = function(){
	var self = this;
	
	if (self.display.length==0)
		return false;
	
	this.display = self.display.extend({minheight:60,height:60, time:0});
	this.preview = self.preview.extend({input:null, timeout:-1, time:0});
	this.result = self.result.extend({visible:false});
	this.error = this.error.extend({error:null});
	this.graph = self.graph.extend({visible:false});
	
	

	
	self.trigodeg.click(function(){
		self.preview.input = self.input.val();	
	});
	self.trigorad.click(function(){
		self.preview.input = self.input.val();	
	});
	
	
	self.graph.load(function(){
		if (!self.initcompleted || self.graph.attr("src").indexOf("/empty")>0)
			return;
		
		self.graph.css({display:"block"});
		self.graph.visible = true;
				
		var img = $("<img src=\"img/zoomin.png\" />");		
		img.css({left:((self.graph.offset().left+self.graph.width()-40)+"px"), top: ((self.display.offset().top+10)+"px"), position:"fixed"});		
		window.setTimeout(function(){
			img.appendTo("body");
			window.setTimeout(function(){
				img.remove();
			}, 1500);
		}, 500);		

		self.autoresize();
	});
	
	self.preview.load(function(){
		if (!self.initcompleted || self.preview.attr("src").indexOf("/empty")>0)
			return;
		
		if (self.preview.time < self.result.time)
			return;
	
		self.preview.timeout = -1;
		if (self.result.visible) {
			self.result.hide();
			self.result.visible=false;
			self.preview.show();
		}
		if (self.graph.visible)
		{
			self.graph.hide();
			self.graph.visible = false;	
		}
		
		self.autoresize();
	  });
	
	self.result.load(function(){
		if (!self.initcompleted  || self.result.attr("src").indexOf("/empty")>0)
			return;
			
		if (self.result.time < self.preview.time)
			return;
		
		self.preview.timeout = -1;
		self.preview.hide();
		self.result.show();
		self.result.visible = true;		
		
		self.autoresize();
	  });
	
	self.result.click(function(){
		
		if (self.input.histories.length>0) {
		
			if (window.mathField)
	        	window.mathField.latex( self.input.histories[0][1].replace(/ /g, "\\ ") );
		
		
			self.input.val( self.preview.input=self.input.histories[0][1] );
			self.preview.timeout = -1;
		}
		
	});
	
	
	this.input = self.input.extend( {undobuf:[], request:null, history_index:-1, history_backup:null, histories:[], calcretries:0 } );
	
	self.input.bind("focus", function(){
		//input.addClass("focus");
	});
	self.input.bind("blur", function(){
		//input.removeClass("focus");
	});
	
	
	
	this.initBtns( this.btns );
	this.initPopupBtns( this.popbtns );
		
	this.input = this.initInput( this.input );
	
	
	window.setInterval(function(){
		self.autoresize();
	}, 1000);
	
	
	$("#calccontainer .container.symbolic .input a").click(function(event){
		var a = $(this);
		self.input.val( a.text() );
		self.preview.input = self.input.val();	
		event.stopPropagation();
		event.preventDefault();
	});
	$("#calccontainer .container.symbolic .output img").click(function(){
		var img = $(this);
		self.input.val( img.attr("title") );
		self.preview.input = self.input.val();	
	});
	
	return true;
};




Calc.prototype.clickbutton = function(event, btn) {
	var self = this;
	
	var id = btn.attr("id");
	var shift = btn.hasClass("shift");
	
	var inpb = self.input.val();
	
	switch(id){
		case "Btn2nd":
			
			var tmp = $(".btns");
			if (tmp.hasClass("shift")) {
				for (var i=self.btns.length-1;i>=0;i--)
					self.btns[i].unshift();
				tmp.removeClass("shift");
			}
			else {
				for (var i=self.btns.length-1;i>=0;i--)
					self.btns[i].shift();
				tmp.addClass("shift");
			}		
			
		break;
		case "BtnSin": self.input.cmd(shift?"asin":"sin", btn); break;
		case "BtnCos": self.input.cmd(shift?"acos":"cos", btn); break;
		case "BtnTan": self.input.cmd(shift?"atan":"tan", btn); break;		
		case "BtnSinH": self.input.cmd(shift?"asinh":"sinh", btn); break;
		case "BtnCosH": self.input.cmd(shift?"acosh":"cosh", btn); break;
		case "BtnTanH": self.input.cmd(shift?"atanh":"tanh", btn); break;
		case "BtnCot": self.input.cmd(shift?"acot":"cot", btn); break;
		case "BtnSec": self.input.cmd(shift?"asec":"sec", btn); break;
		case "BtnCsc": self.input.cmd(shift?"acsc":"csc", btn); break;
		case "Btn0": self.input.ins("0", btn); break;
		case "Btn1": self.input.ins("1", btn); break;
		case "Btn2": self.input.ins("2", btn); break;
		case "Btn3": self.input.ins("3", btn); break;
		case "Btn4": self.input.ins("4", btn); break;
		case "Btn5": self.input.ins("5", btn); break;
		case "Btn6": self.input.ins("6", btn); break;
		case "Btn7": self.input.ins("7", btn); break;
		case "Btn8": self.input.ins("8", btn); break;
		case "Btn9": self.input.ins("9", btn); break;
		case "BtnPlus": self.input.setoperation('+'); break;
		case "BtnMinus": self.input.setoperation('-'); break;
		case "BtnMult": shift?self.input.ins(" # "): self.input.setoperation('*'); break;
		case "BtnDiv": 
		
			if ((self.input.val().length==0) && window.mathField)
				window.mathField.typedText("\\frac ");
			else
				shift?self.input.ins(" mod "): self.input.setoperation('/');
			
		break;
		case "BtnPowXY": self.input.setoperation('^'); break;
		case "BtnDot": self.input.ins(".", btn); break;
		case "BtnSign": 
			
			if (window.mathField) {
				window.mathField.keystroke("Home");
				window.mathField.typedText("-");
			} else 
				self.input.sign(); 
				
		break;
		case "BtnPow10": self.input.cmd('10^x', btn ); break;
		case "BtnLog10": self.input.cmd('log', btn ); break;
		case "BtnFactorial": self.input.ins("!", btn); break;
		case "BtnNcR": self.input.cmd('ncr', btn ); break;
		case "BtnNpR": self.input.cmd('npr', btn ); break;
		case "BtnPow2_1":
		case "BtnPow2": self.input.cmd('x^2', btn ); break;
		case "Button2X_1":
		case "Button2X": self.input.cmd('2^x', btn ); break;
		case "ButtonLg2_1":
		case "ButtonLg2": self.input.cmd('log2', btn ); break;
		case "ButtonExp": self.input.cmd('exp', btn ); break;
		case "ButtonLn_1":
		case "ButtonLn": self.input.cmd('ln', btn ); break;
		case "BtnFrac":
			if (window.mathField) {
				window.mathField.typedText("\\frac ");
			} else 
				self.input.setoperation('/');
		break;
		case "BtnSqrt": 
		
			if (window.mathField) {
				window.mathField.typedText("\\sqrt ");
			} else 
				self.input.cmd('sqrt', btn);
		break;
		case "BtnClear": 
		
			if (window.mathField) {
				window.mathField.latex('');
			}
		
			self.input.clearall();
			
		break;
		case "BtnSqrtY": self.input.cmd('sqrty', btn); break;
		case "BtnSqrt3": self.input.cmd('sqrt3', btn); break;
		case "BtnPow3": self.input.cmd('x^3', btn); break;
		case "BtnBack": 
			if (window.mathField)
				window.mathField.keystroke("Backspace");
			else
				self.input.back();
		break;
		case "BtnLeft": 
		
			if (window.mathField)
			{
				if ((event.pageX-btn.offset().left)>btn.width()/2)
					window.mathField.keystroke("Right");
				else
					window.mathField.keystroke("Left");
			}
			else
				self.input.movecaret((event.pageX-btn.offset().left)>btn.width()/2);
			
		break;
		case "BtnMatrix":
		
			var btnmatrix = $("#BtnMatrix");
			
			var left = btnmatrix.offset().left;
			var top = btnmatrix.offset().top;
			
			var matrixhelper = $("#matrixhelper");
			if (!matrixhelper.hasClass("loaded")) {
				matrixhelper.addClass("loaded");
				matrixhelper.mouseup(function(){
					matrixhelper.hide();
					self.input.ins( matrixhelper.data("input") );
				});
				
				matrixhelper.mousemove(function(e){
					matrixhelper.find("span").removeClass("hover");
					var x = (e.pageX - btnmatrix.offset().left)/24;
					var y = (e.pageY - btnmatrix.offset().top)/24;
					if (x<1)x=1;
					if (y<1)y=1;
					if (x>5)x=5;
					if (y>5)y=5;
					
					var divs = matrixhelper.find("div");
					for (var i=0;i<y;i++) {
						var div = divs.eq(i);
						var spans = div.find("span");
						for (var j=0;j<x;j++) {
							spans.eq(j).addClass("hover");
						}
					}
					 
					var matrix = "";
					if (x==1) {
						for (var i=0;i<y;i++)
							matrix+="0, ";
						
						matrix = "("+matrix.slice(0,-2)+")";
					} else {
						for (var j=0;j<y;j++) {
							var row = "";
							for (var i=0;i<x;i++)
								row+="0, ";
								
							matrix += "["+row.slice(0,-2)+"],";
						}
						matrix = "["+matrix.slice(0,-1)+"]";
					}
					matrixhelper.data("input", matrix);
				});
			}
			
			matrixhelper.css({"left":(left+"px"), "top":(top+"px")});
			matrixhelper.show();
		break;
		case "BtnE": self.input.ins(shift?"i":"e", btn); break;
		case "BtnPi": if (shift) self.constants.show(); else self.input.ins('pi', btn); break;
		case "BtnParanL": shift?self.input.ins('[', btn):self.input.ins('(', btn); break;
		case "BtnParanR": shift?self.input.ins(']', btn):self.input.ins(')', btn); break;
		case "BtnColon": self.input.ins(', ', btn); break; 
		case "Btn1X": shift?self.input.ins('%', btn):self.input.cmd('1/x', btn); break;
		case "BtnPer": shift?self.input.ins("!"):self.input.ins("%"); break;
		case "Btn0b": self.input.ins("0b"); break;
		case "Btn0x": self.input.ins("0x"); break;
		case "BtnHexA": self.input.ins("A"); self.input.checkhex(); break;
		case "BtnHexB": self.input.ins("B"); self.input.checkhex(); break;
		case "BtnHexC": self.input.ins("C"); self.input.checkhex(); break;
		case "BtnHexD": self.input.ins("D"); self.input.checkhex(); break;		
		case "BtnHexE": self.input.ins("E"); self.input.checkhex(); break;
		case "BtnHexF": self.input.ins("F"); self.input.checkhex(); break;
		case "BtnXor": self.input.ins(" xor "); break;
		case "BtnOr": self.input.ins(" or "); break;
		case "BtnAnd": self.input.ins(" and "); break;
		case "BtnLsh": shift?self.input.ins(" rol "):self.input.ins(" lsh "); break;
		case "BtnRsh": shift?self.input.ins(" ror "):self.input.ins(" rsh "); break;
		case "BtnVar": 
			if (shift){
				self.input.ins('=');		
			} else
				self.input.ins('x', btn);
		break;
		
		
		case "BtnCalc": self.input.calc(); return; break;
		
		case "BtnCalcDec": self.input.calc({base:10}); return; break;
		case "BtnCalcHex_1":
		case "BtnCalcHex": self.input.calc({base:16}); return; break;
		case "BtnCalcBin_1":
		case "BtnCalcBin": self.input.calc({base:2}); return; break;		
		case "BtnCalcEqual": self.input.ins("="); return; break;
	}
	
	
	var inpa = self.input.val();
	
	if (inpa.length<30) {
		var title = btn.attr("title");
		if (title && title.indexOf(" ")!=0) {
			self.syntax.val( inpa+" "+title );
		} else
			self.syntax.val("");
	} else
		self.syntax.val("");
		 
	
	if (inpb!=inpa) { 
		self.preview.input = inpa;	
		self.preview.timeout = -1;
		
	}
	
	if (self.result.visible) 
		self.result.hide();
	
	if (self.graph.visible)
		self.graph.hide();
	
	//syntax.val("");
};


Calc.prototype.initBtns = function(btns) {
	
	var self = this;
	
	var tmp = [];
	
	 
	
		
		self.btns.each(function(index){
			var btn = $(this);			
			
			
			if (calc.isipad) {
				
			 	
				if (btn.children("span").length>1) {
					btn.bind("touchstart",function(event){self.activatebutton(btn);event.stopPropagation();event.preventDefault();});
					btn.bind("touchend", function(event){self.clickbutton(event, btn);self.deactivatebutton(btn);event.stopPropagation();event.preventDefault();});
				} else {
					btn.bind("touchstart",function(event){self.activatebutton(btn);self.clickbutton(event, btn);event.stopPropagation();event.preventDefault();});
					btn.bind("touchend", function(event){self.deactivatebutton(btn);event.stopPropagation();event.preventDefault();});
				}
				
				
			} else {
			
				if (btn.children("span").length>1) {
					btn.mousedown(function(event){self.activatebutton(btn);event.stopPropagation();event.preventDefault();});
					btn.mouseup(function(event){self.clickbutton(event, btn);self.deactivatebutton(btn);event.stopPropagation();event.preventDefault();});
				} else {
					btn.mousedown(function(event){self.activatebutton(btn);self.clickbutton(event, btn);event.stopPropagation();event.preventDefault();});
					btn.mouseup(function(event){self.deactivatebutton(btn);event.stopPropagation();event.preventDefault();});
				}
				
			}
					
			tmp.push( btn.extend({
				shift : function(){
					var btn = $(this);
					btn.addClass("shift");					
					var span = btn.children("span");
					if (span.length>1) {
						var title = btn.attr("title");
						span.eq(0).attr("title", (title !== undefined)?title:"" );
						title = span.eq(1).attr("title");
						btn.attr("title", (title !== undefined)?title:"" );
					}
				},
				unshift : function(){
					var btn = $(this);
					btn.removeClass("shift");
					var span = btn.children("span");
					if (span.length>1) {
						var title = span.eq(0).attr("title");
						btn.attr("title", (title !== undefined)?title:"" );						
					}
				}
			}));
						
		});
		this.btns = tmp;		
	
};


Calc.prototype.initPopupBtns = function( popbtns ){
	var self = this;
	
	var lastbtntimeout = null;
			
	var opspopouttimeout = null;
	var opspopout = function(){
	
		$("div.center").css({overflow:"visible"});
		
		if (opspopouttimeout!=null) {
			window.clearTimeout(opspopouttimeout);
			opspopouttimeout=null;
		}
		
		var log10 = $("#BtnLog10");
				
		var w = log10.outerWidth();
		var h = log10.outerHeight();
		var dx = w*0.05;
		var dy = 4;
		var y = log10.offset().top-2;
		var x = log10.offset().left-5.0;
		
		y -= $(document).scrollTop();
		
		popbtns.each(function(index){
			var btn = $(this);
			btn.css({zIndex:12,position:"fixed",width:((w)+"px"),height:((h)+"px"),left:((x+(index%2)*(w+dx))+"px"),top:((y+Math.floor(index/2+1)*(h+dy))+"px") });
			btn.show();
		});
		
	};		
	

	var evtbtns = $("#BtnLog10,#BtnPow10,#ButtonLn,#ButtonExp,#ButtonLg2,#Button2X,#BtnOpD2,#BtnOpD1");
	
	evtbtns.mouseenter(function(){
		
		if (opspopouttimeout)
			window.clearTimeout(opspopouttimeout);
		
		lastbtntimeout = window.setTimeout(function(){
			lastbtntimeout = null;
			opspopout();
		}, 150);
	});
	evtbtns.mouseleave(function(){
		if (lastbtntimeout)
			window.clearTimeout(lastbtntimeout);
					
		opspopouttimeout = window.setTimeout(function(){
			opspopouttimeout = null;
			popbtns.each(function(index){
				var btn = $(this);
				btn.hide();
									 
				lastbtntimeout = null;
				
			});
			$("div.center").css({overflow:"hidden"});
			
		}, 500);			
	});
			
	$("#BtnOpD2,#BtnOpD1").click(opspopout);
	
};


Calc.prototype.initInput = function( input ){
	var self = this;
	
	
	
	input.keydown(function(event){
		
		self.syntax.val(""); 
		
		if (event.keyCode==13) {
			input.calc();
			event.stopPropagation();
			event.preventDefault();
			return;
		}
		
		if (event.keyCode==110) {
			event.stopPropagation();
			event.preventDefault();
		}
		
		if (event.keyCode==27) 
			input.clearall();
		
		if (!event.shiftKey) { 
			if ((event.keyCode==40 || event.keyCode==38)) 
				input.historyScroll(event.keyCode==40); 
		} else {
			
			
			var tmp = $(".btns");
			if (!tmp.hasClass("shift") && "input"==input.attr("id")) {
			 
				for (var i=self.btns.length-1;i>=0;i--)
					self.btns[i].shift();
				tmp.addClass("shift");
				input.addClass("shiftkeydown");
			}		
			
		}
		
		input.undobuf.push( { input:input.getInput(), selectionstart:input.getCaretPosition(), selectionlength:input.getSelectionLength() } );
		if (self.result.visible) 
			self.result.hide();
	});
	
	
	 
	input.keyup(function(event){
	
		if (input.hasClass("disabled")) {
			event.stopPropagation();
			event.preventDefault();
			loadcms();
			return;
		}
	
		if (event.keyCode==110) {
			input.ins('.');
			event.stopPropagation();
			event.preventDefault();
		}
		
		if (event.keyCode==13) {
			event.stopPropagation();
			event.preventDefault();
			return;
		}
		
		if (!event.shiftKey && input.hasClass("shiftkeydown")) { 
			
			var tmp = $(".btns");
			if ( tmp.hasClass("shift")) {
			 
				for (var i=self.btns.length-1;i>=0;i--)
					self.btns[i].unshift();
				tmp.removeClass("shift");
				input.removeClass("shiftkeydown");
			}		
			
		}
		
		self.preview.input = input.val();
		self.preview.timeout = -1;
		
		input.changed();
	});
	
	
	return input.extend({
	    getSelectionLength: function() {
	    	var element = (this);
	        if (element.is('input')) {
	            var pos = element.val().length;
	            try {
	                if (document.selection) {
	                    try {
	                    	if (self.ismobile==false)
	                    	element.focus();
	                    } catch (e) {
	                    }
	                    var Sel = document.selection.createRange();
	                    pos = Sel.text.length;
	                } else if (element[0].selectionEnd || element[0].selectionEnd == '0')
	                    pos = element[0].selectionEnd - element[0].selectionStart;
	            } catch (ee) {
	            }
	        	return pos;
	        } 
	        return 0;
	    },
	    
	    
	    movecaret : function(right){
	    	
	    	var element = (this);
	        if (element.is('input')) {
	    	
		    	element.undobuf = [];
		    	
		    	if (right==false)
		    	{
		    		var pos = element.getCaretPosition();				
		    		pos--;
		    		if (pos < 0)
		    			pos = 0;
		    		element.setCaretPosition(pos);
		    	} else
		    	{	
		    		var pos = element.getCaretPosition();
		    		var max =  element.getInput().length;
		    		pos++;
		    		if (pos > max)
		    			pos = max;
		    		element.setCaretPosition(pos);
		    	}
		    	if (self.ismobile==false)
		    	element.focus();
		    	
	        }	    	
	    	
	    },
	    
	    sign : function(){
	    	var element = (this);
	        if (element.is('input')) {
	    	
	        	var inputval = element.val();
	    	    for (var i = inputval.length - 1; i >= 0; i--) {
	    	        var ch = inputval.substring(i, i + 1);
	    	        if ("0123456789e.".indexOf(ch) >= 0) {
	    	        } else if (ch == "-") {
	    	            inputval = inputval.substring(0, i) + inputval.substring(i + 1);
	    	            break;
	    	        } else {
	    	            inputval = inputval.substring(0, i + 1) + "-"
	    						+ inputval.substring(i + 1);
	    	            break;
	    	        }
	    	        if (i == 0)
	    	            inputval = "-" + inputval;
	    	    }
	    	    	    	    
	    	    element.setInput(inputval);	    	    
	        }	    	
	    },
	    
	    getCaretPosition: function(){
	    	var element = (this);
	        if (element.is('input')) {
	        	var pos = element.val().length;
        	    if (document.selection) {
        	        try {
        	        	if (self.ismobile==false)
        	        	element.focus();
        	        } catch (e) {
        	        }
        	        var Sel = document.selection.createRange();
        	        Sel.moveStart('character', -element.val().length);
        	        pos = Sel.text.length;
        	    } else {
        	        try {
        	            if (element[0].selectionStart || element[0].selectionStart == '0')
        	                pos = element[0].selectionStart;
        	        } catch (e) {
        	        }
        	    }
        	    if ($.browser.msie || $.browser.opera)
        	        pos -= element.getSelectionLength();
        	    return (pos);
	        }
	        return 0;	    	
	    },
	    
	    setCaretPosition : function (pos) {
	    	
	    	var element = (this);
	        if (element.is('input')) {

		        if (element[0].setSelectionRange) {
		            try {
		            	if (self.ismobile==false)
		            	element.focus();
		            } catch (e) {
		            }
		            try {
		                if ($.browser.webkit) {
		                    window.setTimeout(function () {
		                        var _pos = pos;
		                        element[0].selectionEnd = input[0].selectionStart = _pos;
		                    }, 10);
		                } else
		                	element[0].setSelectionRange(pos, pos);
		            } catch (e) {
		            }
		        } else if (element[0].createTextRange) {
		            var range = element[0].createTextRange();
		            range.collapse(true);
		            range.moveEnd('character', pos);
		            range.moveStart('character', pos);
		            range.select();
		        }
	        }
	    },
	    
	    setInput: function(s) {
	    	var element = (this);
	        if (element.is('input')) {
	        	
	        	element.undobuf.push( { input:element.getInput(), selectionstart:element.getCaretPosition(), selectionlength:element.getSelectionLength() } );	        	
	        	element.val( s );
	        }
	        
	    },
	    
	    getInput: function(s) {
	    	var element = (this);
	        if (element.is('input')) {
	        	return element.val();
	        }
	        return "";
	    },
	    
	    clearall : function(){
	    
	    	if (window.mathField)
	    		window.mathField.clearSelection();
	    
	    	var element = (this);
	        if (element.is('input')) {
	        	
	        	self.graph.hide();
	        	self.graph.visible = false;
	        	
	        	self.preview.hide();
	        	self.result.hide();
	        	self.result.visible = true;
	        	
	        	
	        	{
	        		var btndiv = $(".btns"); 
		 			btndiv.removeClass("graph");
		 			btndiv.removeClass("bases");
		 		}
	        	
	        	if (element.val().length==0) {
	        		if (self.display.height!=self.display.minheight)
		        		$("#BtnClear").removeClass("active");
	        		self.display.css({minHeight:((self.display.height=self.display.minheight)+"px")});
	        		
	        		var tmp = $(".btns");
	    			if (tmp.hasClass("shift")) {
	    				for (var i=self.btns.length-1;i>=0;i--)
	    					self.btns[i].unshift();
	    				tmp.removeClass("shift");
	    			}
	    				        		
	        	}
	        	
	        	element.undobuf=[];
	        	
	        	var value = "";
        	    var len = 0;
        	    if ($.browser.webkit || $.browser.mozilla
        				|| $.browser.msie) {
        	        len = element.getSelectionLength();
        	        var pos = element.getCaretPosition();
        	        if (len > 0 && pos >= 0)
        	            value = element.val().substring(0, pos)
        						+ element.val().substring(pos + len);
        	        else {
        	            value = "";
        	        }
        	    } else {
        	        value = "";
        	    }
        	    if (len <= 0) {
        	        //result.attr("src", "img/loading.gif");
        	    }
        	    element.val(value);
        	//    setLoadingImg(false);
        	    if (self.ismobile==false)
        	    element.focus();
	        
        	    
        	   
	        }
	        
	        element.changed();
	        
	        $("#calccontainer").find(".container.symbolic").hide();
	        $("#symbolics").css({"minHeight":"0px"});
	    },
	    
	    smartinsert : function(val, parameters){
	    	
	    	var element = (this);
	    	
	    	
	    	if (window.mathField)
	    		window.mathField.typedText(val+"(");
	    	else
	    	
	        if (element.is('input')) {
	    	
		    	var sellen = 0;
		    	if ((sellen = element.getSelectionLength()) > 0) {
		    		var inp = element.getInput();
		    		var selpos = element.getCaretPosition();
		    		element.setInput(((inp.substring(0, selpos) + val + "("
		    				+ inp.substring(selpos, selpos+sellen)
		    				+ (parameters == 1 ? "" : ", ") + ")" + inp
		    					.substring(selpos + sellen))));
		    		if (parameters == 1)
		    			element.setCaretPosition(val.length + selpos + sellen + 2);
		    		else
		    			element.setCaretPosition(val.length + selpos + sellen + 3);
		    	} else {
		    		
		    		
		    		if (element.getInput().length==0)
		    		{
		    			var newinput = "";
		    			element.setInput(newinput=( val + "("));
		    			element.setCaretPosition( newinput.length );
		    		} else
		    		{
		    			
		    			// regex = /^[-]?[0-9.abcdef]+$/;
		    			var pattern = /^[-]?[0-9.abcdef]+$/;
		    						
		    			var patternmatrix = /^[-]\\Q[[\\E.*\\Q]]\\E?$"/;
		    			
		    			var inp = element.getInput();
		    			
		    			if ((pattern.test(inp)) && (patternmatrix.test(inp))) {
		    				var newinput = "";
		    				
		    				if (parameters == 1)
		    					element.setInput(newinput=(val + "(" + inp + ")"));
		    				else
		    					element.setInput(newinput=(val + "(" + inp + ", "));
		    				
		    				element.setCaretPosition( newinput.length );
		    			} else
		    			{
		    				var lastchar = '_';
		    				var inp = element.getInput();
		    				
		    				if (inp.length>0)
		    					lastchar = inp.charAt( inp.length-1 );
		    								
		    				switch(lastchar)
		    				{
		    				  case '*':
		    				  case '/':
		    				  case '^':
		    				  case '-':
		    				  case '+':
		    				  case '#':
		    				  case '(':
		    				  case '[':
		    				  case '{':
		    					
		    					if (parameters == 1)
		    						element.ins(val + "(");
		    					else
		    						element.ins(val + "(");
		    					
		    				  break;
		    				  default:
		    					  var newinput = "";
		    						
		    						if (parameters == 1)
		    							element.setInput(newinput=(val + "(" + element.getInput() + ")"));
		    						else
		    							element.setInput(newinput=(val + "(" + element.getInput() + ", "));
		    						
		    						element.setCaretPosition( newinput.length );
		    				  break;	
		    				} 
		    						    					
		    			}
		    			
		    		}	    		
		    	}
	    	}
	    },
	    
	    cmd : function(name, btn){
	    	
	    	var element = (this);
	        if (element.is('input')) {
	    	
		   		if (name==("exp"))
		   			element.smartinsert("exp", 1);
		   		else if (name==("logyx")) {
		   			element.smartinsert("log", 2);
	
		   			 
		   			return false;
		   		} else if (name==("sqrty")) {
		   			element.smartinsert("sqrt", 2);
			   			
		   			return false;
		   		} else if (name==("x^2") || name==("x^3")) {
		   			var sellen = 0;
		   			if ((sellen = element.getSelectionLength()) > 0) {
		   				var inp = element.getInput();
		   				var selpos = element.getCaretPosition();
		   				element.setInput(((inp.substring(0, selpos) + "("
		   						+ inp.substring(selpos, sellen) + ")"
		   						+ name.substring(1) + inp.substring(selpos + sellen))));
		   				element.setCaretPosition(selpos + sellen + 4);
		   			} else
		   				element.ins( ((name==("x^2"))) ? "^2" : "^3");
		   		} else if (name==( "1/x"))
		   			element.smartinsert("1/", 1);
		   		else if (name==( "10^x"))
		   			element.smartinsert("10^", 1);
		   		else
		   		if (name==( "2^x"))
		   			element.smartinsert("2^", 1);
		   		else
		   		if (name==( "ncr"))
		   			element.smartinsert("nCr", 2);
		   		else
		   		if (name==( "npr"))
		   			element.smartinsert("nPr", 2);
		   		else if (name==("faculty")||name==("factorial"))
		   			element.ins("!");
		   		else
		   			element.smartinsert(name, 1);
		   				   	 
	        }
	    	
	        element.changed();
	    },
	    
	    ins : function(s, btn) {
	    
	    	if (window.mathField)
	    		window.mathField.typedText(s);
	    	else {
	        
		    	var element = (this);
		        if (element.is('input')) {
			        var inputval = element.val();
			        
			        if ($.browser.mozilla || $.browser.webkit
			    			|| $.browser.opera || $.browser.msie) {
			          
			            var len = element.getSelectionLength();
			            var pos = element.getCaretPosition();
			            if ($.browser.msie && pos == 0 && len == 0)
			                pos = inputval.length;
			            if (len > 0)
			                inputval = inputval.substring(0, pos)
			    					+ inputval.substring(pos + len);
			            element.setInput((inputval.substring(0, pos) + s + inputval.substring(pos)));
			            if (s == "\n" && $.browser.opera)
			                pos++;
			            var insertposition = pos + s.length;
			            		            
			            element.setCaretPosition(insertposition);
			        } else
			            element.setInput(inputval.value + s);
			        
			        //operation = "";   
			        
			        
		        } 	
		        element.changed();
	        }
	        
	       
	    },
	    
	    checkhex : function(){
	    	
	    	var element = (this);
	        if (element.is('input')) {
		        var inputval = element.val();
		        
		        var pos = element.getCaretPosition();
		        if (pos<0 || pos>=inputval.length)
		        	pos=inputval.length-1;
	        
		        if (inputval.match(/^[0-9A-F]+$/))
		        	inputval = "0x"+ inputval;
		        else
		        	if (!inputval.match(/0x[0-9A-F]+$/))
		        		inputval = inputval.replace(/([0-9A-F]+)$/, "0x$1" );
		        
		        element.val( inputval );		        
		        		        
		        
	        }
	    	
	    },
	    
	    back : function() {
	    	var element = (this);
	        if (element.is('input')) {
	        		         
		    	if (element.getSelectionLength() > 1) {
		    		element.clearall();	
		    		return;
		    	}
		    			   
		    	
		    	if (element.undobuf.length>0)
		    	{
		    		var undo = element.undobuf.pop();
		    		
		    		self.syntax.val("");
		    		self.input.val(undo.input);
		    		
		    		if (undo.selectionlength==0)
		    			element.setCaretPosition(  undo.selectionstart );
		    		else{
		    			element.setCaretPosition( undo.selectionstart );
		    			element.setSelectionLength( undo.selectionlength );
		    		}
		    				
		    		return;
		    	}
		    	
		    	var pos = element.getCaretPosition();
		    	var inputval = element.getInput();
		    	if (pos < 0)
		    		return;
		    	if (pos > inputval.length)
		    		return;
		    	if (pos == 0 && inputval.length > 0)
		    		pos = 1;
		    	inputval = (pos > 0 ? inputval.substring(0, pos - 1) : "")
		    			+ inputval.substring(pos);
		    	self.input.val(inputval);
		    	element.setCaretPosition(pos > 0 ? pos - 1 : 0);
	        }
	        
	        element.changed();
	    },
	    
	    setoperation:function(op) {
	    	var element = (this);
	        if (element.is('input')) {
	        	element.ins(op);
	        	element.operation = op;
	        }
	    } ,
	    
	    
	    historyScroll : function (down) {
	    	
	    	var element = (this);
	    	
	    	element.undobuf = [];
	    	
	    	var latex = undefined;
	    	
	        if (down && element.history_index == -1) {
	        	element.history_backup = element.val();
	        }

	        if (down) {

	            if (element.history_index + 1 < element.histories.length) {
	            	element.history_index++;
	                element.val(element.histories[element.history_index][1]);
	                
	                if (element.histories[element.history_index].length>=3)
	                	latex = element.histories[element.history_index][2];
	            }
	        } else {
	        	element.history_index--;

	            if (element.history_index <= -1) {
	            	element.history_index = -1;
	                if (element.history_backup != null)
	                    element.val(element.history_backup);
	            } else {

	                if (element.history_index < element.histories.length) {
	                    element.val(element.histories[element.history_index][1]);
	                    
	                    if (element.histories[element.history_index].length>=3)
	                    	latex = element.histories[element.history_index][2];
	                }
	            }

	        }
	        
	        if (window.mathField) {
	        	
	        	window.mathField.latex( latex?latex:element.val().replace(/ /g, "\\ ") );
	        }
	     
	    },
	    
	    changed : function() {
	    	
	    },
	    
	    calc : function(options){
	    	var element = (this);
	        if (element.is('input')) {
	        	
	        	try{
		        		        	
		        	element.addClass("loading");
		        		        	
		        	
		        	if (element.request!=null){
		        		try{
		        			element.request.abort();
		        		}catch(Exception){}
		        	}
		        	
		        	self.preview.input = null;
	           	 	if (self.preview.request!=null) {
	           	 		try{
	           	 			self.preview.request.abort();
	           	 		} catch (Exception) {}
	           	 	}
		        	
		        	
		        	var inp = $.trim( element.val() );
		        	
		        	if (inp=="") {
		        		self.input.removeClass("loading");
		        		return;
		        	}
		        	
		        	
		        	var inptex = false;
		        	if (window.mathField)
		        		inptex = window.mathField.latex();
		        	 
		        	var parameters = {"in": [inp], trig:(self.trigodeg.is(':checked') ?"deg":"rad"), p:displayoptions.precision, s:displayoptions.scientific, "code":self.code };
		        	
		        	if (self.lastinputs.length>3) {
	        			for (var i=self.lastinputs.length-1, j=0;i>=0;i--,j++) {
	        				if (self.lastinputs[i]!=inp)
	        					break;
	        				if (j==6) {
	        					self.input.removeClass("loading");	        					
	        					return;
	        				}
	        			}	        			
		        	}
		        	self.lastinputs.push( inp );
		        	
		        	
		        	
		        	if (options) {
		        		for (var option in options)	        			
		        			parameters[option] = options[option];
		        	}
		        	
		        	self.result.time = new Date().getTime();
		        	
		        	element.request = $.ajax({
		                 url: "/calc",
		                 dataType: 'json',
		                 data: parameters,
		                 async: true,
		                 type: 'POST',
		                 
		                 success: function (json) {
		                	 
		                	
		                 
		                	 try{
		                	 	                	
			                	 self.preview.input = null;
			                	 self.syntax.val("");
			                	 
			                	 self.input.removeClass("loading");
			                	 
			                	 
			                	 var results = json.results;
			                	 
			                	 
			                	
			                	 
			                	 for (var i=0;i<results.length;i++)
			    	    		 {
			    	        		 var r = results[i];
			    	        		 
			    	        		  
			    	        		 if (r.inputs) {
			    	        			 
			    	        			 while (self.graphinputs.length>0)
			    	        				 self.graphinputs.pop();
			    	        			 
			    	        			 for (var i=0;i<r.inputs.length;i++)
			    	        				 self.graphinputs.push( r.inputs[i] );
			    	        		 }
			    	        		 if (r.bounds && r.bounds.length==4) {
			    	        			 
			    	        			 while (self.axisbounds.length>0)
			    	        				 self.axisbounds.pop();
			    	        			 
			    	        			 for (var i=0;i<r.bounds.length;i++)
			    	        				 self.axisbounds.push( r.bounds[i] );
			    	        			 
			    	        		 }
			    	        		 if (r.graph) {
			         		 			var src = r.graph;	         		 			
			         		 			self.graph.attr("src",src);	         		 			
			         		 			self.graph.attr("title", inp);
			         		 		 }
			    	        		 
			    	        		 switch (r.status) {
			    	        		 
			    	        		 	case "overloaderror":
			    	        		 		self.result.attr("src","img/empty.png");	 
			    	        		 		alert("Error: Too many requests from your ip. Please wait 1 minute.");
			    	        			 break;
			    	        		 
			    	        		 	case "parseerror":
			    	        		 		
			    	        		 		if (r.img64) {
			    	        		 			var src = "data:image/png;base64,"+ r.img64;
			    	        		 			self.result.attr("src",src);	   
			    	        		 		}	  
			    	        		 		if (r.img) {
			    	        		 			var src = r.img;
			    	        		 			self.result.attr("src",src);
			    	        		 		}
			    	        		 		if (r["in"]) {
			    	        		 			self.input.val( r["in"] );	    	        		 		
				    	        		 		var errindex = r.index;	    	        		 		
				    	        		 		self.syntax.val( r["in"].substring(0, errindex)+"_" );
			    	        		 		}
			    	        		 		
			    	        		 		break;
			    	        		 
			    	        		 	case "ok":
			    	        		 		
			    	        		 		try {
			    	        		 			
			    	        		 			if ($("#nocreditsmodal").length>0) {
				    	        		 			$.ajax({
									                 url: "/api/updatecredit",
									                 dataType: 'json',
									                 data: {"ok":1},
									                 async: true,
									                 type: 'POST',
									                 success: function (credit) {
									                 	if (credit) {
									                 		//console.log("calculations:"+credit.calculations);
									                 		
									                 		if (credit.calculations<0) {
									                 			$("#nocreditsmodal").modal("show");
									                 			
									                 			if (credit.wait) {
									                 			
										                 			var waituntil = credit.wait + (new Date().getTime() / 1000);
										                 			
										                 			window.nocredittimeout = window.setInterval(function(){
										                 				var wait = waituntil - (new Date().getTime() / 1000);
										                 				
										                 				if (wait<=0) {
										                 					 location.reload();
										                 					 window.clearInterval(window.nocredittimeout);
										                 				}
										                 				
										                 				if (wait>3600)
										                 					wait = 3600;
										                 				
											                 			var minutes = parseInt(wait / 60);
											                 			var seconds = parseInt(wait % 60);
											                 			if (minutes<10)
											                 			 minutes = "0"+minutes;
											                 			if (seconds<10)
											                 			 seconds = "0"+seconds;
											                 			$("#nocreditswaittime").text( minutes+":"+seconds );
											                 		},1000);
										                 			
										                 		}
									                 		}
									                 		
									                 	}
									                 }
									                });
								                }
			    	        		 			
			    	        		 		} catch (e32) {}
			    	        		 		
			    	        		 		
		    	        		 			try {
		    	        		 				if ($("html").hasClass("adsenseloaded")) {
													var adblockmodal = $("#abmodal");
													if (adblockmodal.length>0) {
														 
														if (hasBlocker()) {
															if (adblockmodal.hasClass("show")==false) {
																window.setTimeout(function(){
																	adblockmodal.find("img.ayblock").attr("src", "/img/block2.jpg");
																	adblockmodal.find(".modal-footer").fadeIn();
																}, 3200);
																
																adblockmodal.find(".modal-footer").hide();
																adblockmodal.modal("show");
																adblockmodal.addClass("show");
															}
														} 
												 		 
													}
												}
											} catch (e33){}	
											
			    	        		 		
			    	        		 		if (r.img64) {
			    	        		 			var src = "data:image/png;base64,"+ r.img64;
			    	        		 			self.result.attr("src",src);	  
			    	        		 			
			    	        		 			self.updatesharebtns(inp); 	        		
			    	        		 			
			    	        		 		}
			    	        		 		if (r.img) {
			    	        		 			var src = r.img;
			    	        		 			
			    	        		 			self.result.attr("src",src);
			    	        		 		}
			    	        		 		
			    	        		 		
			    	        		 		
			    	        		 		if (r.out) {
			    	        		 			self.input.val( r.out );
			    	        		 				    	       
			    	        		 			self.result.attr("title", inp);
			    	        		 			
			    	        		 			if (inptex)
			    	        		 				self.history.add( inp, r.out, "", inptex );
												else
			    	        		 				self.history.add( inp, r.out );
			    	        		 			
			    	        		 			window.setTimeout(function(){
			    	        		 				self.history.save();
			    	        		 			}, 10);	    	        		 			
				    	        		 		
				    	        		 		
				    	        		 		if (window.mathField) {
				    	        		 			var l = self.input.val().replace(/ /g, "\\ ");
			    	        		 				window.mathField.disable = true;
	        										window.mathField.latex( l ); 	
	        										break;
			    	        		 			}
			    	        		 		}
			    	        		 		
			    	        		 		
			    	        		 		 try {
			    	        		 		 
			    	        		 		 	if (window.mathField)
			    	        		 		 	{
			    	        		 		 	
			    	        		 		 	} else
			    	        		 		 
			    	        		 			 if (i==0) {
			    	        		 				 
			    	        		 				  
							    	        		 $("#calccontainer").find(".container.symbolic").hide();
							    	        		 
							    	        		 self.symbolic = r.symbolic?r.symbolic:null;
								                	 if (self.symbolic) {
								                		 
								                		$.each( self.symbolic, function( name, newinp )
								                		{
								                			try {
									                		 var symbolic = $("#symbolic_"+name);
									                		 if (symbolic.length==0)
									                			 return;
									                		  
									                		 var symbolic_input = symbolic.find("p.input a");
									                		 symbolic_input.text(newinp);
									                		 symbolic_input.attr("href","#"+newinp);
									                		 
									                		 var symbolic_result = symbolic.find("p.output img");
									                		 symbolic_result.attr("src","/img/loading.gif");
									                		 symbolic_result.attr("title",newinp);
									                		 
									                		 var trig = (self.trigodeg.is(':checked') ?"deg":"rad");
									                		 if (name=="exponentialize")
									                			 trig = "rad";
									                		 
									                		 $.ajax({
									    		                 url: "/calc",
									    		                 dataType: 'json',
									    		                 data: {"in": [newinp], trig:trig, p:displayoptions.precision, s:displayoptions.scientific, "code":self.code, symbolic:1 },
									    		                 async: true,
									    		                 type: 'POST',
									    		                 
									    		                 success: function (json1) {
									    		                	 
									    		                	 var results = json1.results;
												                	 for (var i=0;i<results.length;i++)
												    	    		 {
												    	        		 var r = results[i];
										    		                	 switch (r.status) {
												    	        		  
												    	        		 	case "ok":
												    	        		 		 
												    	        		 		
												    	        		 		if (r.img64) {
												    	        		 			var src = "data:image/png;base64,"+ r.img64;
												    	        		 			symbolic_result.attr("src",src);	    	        		 			
												    	        		 		}
												    	        		 		if (r.img) {
												    	        		 			var src = r.img;
												    	        		 			
												    	        		 			symbolic_result.attr("src",src);
												    	        		 		}
												    	        		 		
												    	        		 		symbolic.show();
												    	        		 		
												    	        		 		var symbolics = $("#symbolics");
												    	        		 		symbolics.css({"minHeight":( symbolics.height()+ "px")});
												    	        		 	 
												    	        		 	break;	
												    	        		 	default:
												    	        		 		symbolic.hide();
												    	        		 	break;
										    		                	 }		
												    	    		 }
									    		                	 
									    		                 },
									    		                 error: function (xhr, status, err) {
									    		                	 symbolic.hide();
									    		                 }
									                		 });
								                			} catch (e1) {}
								                		});     
								                		 
								                	 }
								                	 
								                	 
			    	        		 			 }
					    	        		 } catch (e) {} 
			    	        		 		
			    	        		 		
			    	        		 	break;
			    	        		 }
			    	    		 }
			                	 
			                	 
			                	 element.request = null;
			                	 element.calcretries=0;
			                	 
			                	 
		                	} catch (e) {
		 	             		sendErrorReport("calc.success:", e);
		 	             	}
			                	 
		                 },
		                 error: function (xhr, status, err) {
		                	 
		                	 try{
		                		 
			                	 if (status=="abort" && element.calcretries<5) {
			                		 
			                		 element.calcretries++;
			                			 
									 window.setTimeout(function(){
			                	 	 	element.calc();
			                	 	 }, 1000);
 
			                		 
			                	 } else {
			                	 
			                	 
			                	 	 if ((element.calcretries++) < 5) {
			                	 	 
			                	 	 	window.setTimeout(function(){
			                	 	 		element.calc();
			                	 	 	}, 1000);
			                			 
			                		 } else {
			                	 		 
				                		 element.calcretries=0;
				                		
				                		 self.syntax.val("");
					                	 element.request = null;
					                	 
					                	 if (xhr.status==500)
					                	 alert("internal server error! (please try again later)");
					                	 else {
					                		 if ("de"==$("html").attr("lang"))
					                		 alert("Fehler: Server nicht erreichbar! (Internet Verbindung vorhanden?)");
					                		 else
					                		 alert("internal server error! (check your internet connection)");
					                	 }
					                	 
					                	 self.preview.hide();
					                	 self.input.removeClass("loading");
					                	 
					                }
			                	 }
			                	 
		                	 } catch (e) {
			 	             	sendErrorReport("calc.error:", e);
			 	             
			 	             }
		                	 
		                 }
		                 
		        	 });
		        	
	        	} catch (er) {
	             	sendErrorReport("calc.calc:", er);
	             		 
	            }
		        	
	        }
	    }
	  
	    
	});
	
};




function getLocalStorage() {
  try {
    if ('localStorage' in window && window['localStorage'] !== null)
    	return localStorage;
  } catch (e) {
  }
  return null;
}


var History1 = function() {
	this.histories = null;
	this.input = null;
	this.syntax = null;
	this.frame = null;
	this.initcompleted = false;
	this.calc = null;
};

History1.prototype.done = function(){	
	this.load();	
	this.initcompleted = true;
};

History1.prototype.save = function(){
	var self = this;
	try{
		if (!('localStorage' in window && window['localStorage'] !== null))
	    	return;
		
	    if (!localStorage)
	    	return;
	    
	    var value = JSON.stringify(self.input.histories);
	
	    if (!value)
	    	return;    
	    
	    localStorage.setItem("histories", value);
    
	} catch (error) {
	}
	
};

History1.prototype.load = function() {
	var self = this;
	try{
		if (!('localStorage' in window && window['localStorage'] !== null))
	    	return;
		
	    if (!localStorage)
	    	return;
	    
	    var value = localStorage.getItem("histories");
	    if (!value)
	    	return;
	    
	    var arr = JSON.parse(value);
	    for (var i=arr.length-1;i>=0;i--) {
	    	var h = arr[i];
	    	if (h.length==3)
	    	 self.add( h[1], h[0], "local", h[2] );
			else
	    	 self.add( h[1], h[0], "local" );
	    }
    
	} catch (error) {
	}
	
};


History1.prototype.last = function() {
	
	if (this.input.histories && this.input.histories.length>0)
		return this.input.histories[0][1];
	return "";
};

History1.prototype.add = function(_in, _out, cl, _latex) {
	var self = this;
	
	if (!(typeof _in == 'string' || _in instanceof String))
		return;
	if (!(typeof _out == 'string' || _out instanceof String))
		return;

	self.input.history_index = -1;
	
	if (self.input.histories.length>0) {
		if (self.input.histories[0][0]==_out && self.input.histories[0][1]==_in)
			return;
	}
	
	if (_latex) 
		self.input.histories.unshift([_out, _in, _latex]);
	else
		self.input.histories.unshift([_out, _in]);
	
	while (self.input.histories.length>60)
		self.input.histories.pop();
	
	if (self.initcompleted) {
		var last = self.histories.find(".last");
		last.attr("title", _in);
		last.text(_in.length>19?(_in.substring(0,17)+".."):_in);
		
		last.data("inp", _in);
		if (_latex) 
			last.data("tex", _latex );
		else
			last.removeData("tex");
	}
	
	var tex = "";
	if (_latex) 
		tex = " data-tex=\""+ _latex.replace('"','')+ "\"";
	
	var inp = "";
	if (_in)
		inp = " data-inp=\""+ _in.replace('"','')+ "\"";
	
	
	_in = _in.replace('"','');
	_out = _out.replace('"','');
	var l = _in.length>30?(_in.substring(0,28)+".."):_in; 
	var r = "=&#160;"+(_out.length>30?(_out.substring(0,28)+".."):_out);
	var li = $("<li"+(cl?" class=\""+cl+"\"":"")+"><p title=\""+_out+"\" class=\"r\">"+r+"</p><p"+tex+inp+" title=\""+_in+"\" class=\"l\">"+l+"</p></li>");
	var ul = self.frame.find("ul");
	if (ul.children("li").length==0)
		li.appendTo(ul);
	else
		li.insertBefore(ul.children().eq(0) );
};

History1.prototype.clear = function() {
	var self = this;
	
	var ul = self.frame.find("ul");
	ul.empty();
	
	self.input.histories=[];
	self.save();
	
 	$.ajax({
        url: "/calc",
        dataType: 'json',
        data: {"clearhistory":1},
        async: true,
        type: 'POST',
        
        success: function (json) {
        	
        }
 	});
	
};

History1.prototype.init = function() {
	var self = this;
			
	var button = this.histories.parent().children("button");
	if (button.length>1)
	{
		button.eq(0).click( function(){ self.syntax.val(""); self.input.historyScroll(true); });
		button.eq(1).click( function(){ self.syntax.val(""); self.input.historyScroll(false); });
	}
	
	this.frame = $("#histframe");
	
	//this.frame.remove();
	//this.frame.appendTo($("body"));
	
	this.frame.find("li").each(function(){
		var p = $(this).children("p");
		if (p.length>1) {
			var _in = p.eq(1).attr("title"); 
			var _out = p.eq(0).attr("title");
			self.input.histories.push([_out, _in]);
		}
	});
	
	
	this.frame.find("button").click(function(event){
		self.histories.removeClass("open");
		self.frame.removeClass("open");
	});
	
	this.frame.click(function(event){
	
		var target = $(event.target);
			
		if (target.hasClass("r")) {
			self.input.ins( target.attr("title") );							
		} else if (target.hasClass("l")){
		
		 
			if (window.mathField && (target.data("tex")!==undefined)) {
			 self.input.setInput( "" );
			 window.mathField.latex( target.data("tex") );
			} else {
			
				if (target.data("inp")!==undefined)
				 self.input.setInput( target.data("inp") );
				else
				 self.input.setInput( target.attr("title") );
				
				if (window.mathField) {
		        	window.mathField.latex( target.attr("title").replace(/ /g, "\\ ") );
		        }
		    
		    } 
			 
		}  

	});
	
	this.frame = this.frame.extend({
		toggle:function(){
			
			/*
			if (self.frame.hasClass("init")){
				self.frame.removeClass("init");
				self.frame.css({width:( ($("div.center").width()*0.65)+ "px")});
			}
			
			var y = self.histories.offset().top+self.histories.height()+3;
			var x = self.histories.offset().left;
			
			if (self.calc.iswidget) {
				x = 0;
				y = 0;
			}
			
			self.frame.css({left:(x+"px"),top:(y+"px")});
			 
			
			if (self.histories.hasClass("open")) {
				$(document).unbind( "click" );
			} else {
				$(document).bind( "click", function(event){
					var target = $(event.target);
					if (target.parents(".center").length>0)
						return;
					if (target.parents("#histframe").length>0) {
						
						if (target.hasClass("r")) {
							self.input.ins( target.attr("title") );							
						} else if (target.hasClass("l")){
						
						
						 
							if (window.mathField && (target.data("tex")!==undefined)) {
							 self.input.setInput( "" );
							 window.mathField.latex( target.data("tex") );
							} else {
							
								if (target.data("inp")!==undefined)
								 self.input.setInput( target.data("inp") );
								else
								 self.input.setInput( target.attr("title") );
								
								if (window.mathField) {
						        	window.mathField.latex( target.attr("title").replace(/ /g, "\\ ") );
						        }
						    
						    } 
							
							
							self.frame.toggle();
						} else
							self.frame.toggle();
						
						return;
					}
					if (target.attr("id")=="histframe")
						return;
					
					self.frame.toggle();
				} );
			}
			
			
			*/
			
			
			self.histories.toggleClass("open");
			self.frame.toggleClass("open");
		}
	});
	
	this.histories.find(".last").click(function(event){
	
		var last = $(this);
	
		if (window.mathField && (last.data("tex")!==undefined)) {
			self.input.val( "" );
			window.mathField.latex( last.data("tex") );
		}
		else {
			if (last.data("inp")!==undefined)
				self.input.val( last.data("inp") );
			
			 if (window.mathField)
		        window.mathField.latex( self.input.val().replace(/ /g, "\\ ") );
		}
		
		
		event.stopPropagation();
		event.preventDefault();
	});
	//histories.find("span").mouseup(frame.toggle);		
	this.histories.click(self.frame.toggle);
	
	if (this.frame.find("li").length==0)
		this.histories.load();
	 
};
var Accordion = function(){
	this.accordion = null;
};

Accordion.prototype.init = function(){
	
	if (this.accordion.length>0)
	{			
		this.accordion.find("a.toggle").mouseup(function(){
			var img = $(this).parents(".panel-default").find("img[data-src]");
			if (img)
				img.attr("src", img.data("src"));
		});
		
		$('#carousel-teaser').carousel({
			pause: true,
			interval: false
			});
	}
	
};
var Displaycontextmenu = function() {
	this.input = null;
	this.menu = null;
	this.displayoptions = null;
	this.result = null;
	this.preview = null;
	this.history = null;
	this.calc = null;
};



 

Displaycontextmenu.prototype.init = function() {
	
	var self = this;
	
	
				
	this.menu.find("a").click(function(event){
		var a = $(this);	
		
		if (a.hasClass("permalink")) {
			
			var div = $("<div></div>");
			div.load("js/templates/permalink.jsp", function(){
				
				var last = $("#hist .last").attr("title");
				
				var m = div.find(".modal:first");
				m.appendTo($("body"));
				m.find("input.url").val( window.location + (last?("#"+ last):"")  );
				m.modal({});

				
			});
			
			//window.open( "#" + $("#hist .last").attr("title") );
			
		} else
		
		if (a.hasClass("precision")) {				
			self.menu.find("a.precision span.glyphicon").remove();
			$("<span class=\"glyphicon glyphicon-ok\"></span>").appendTo(a);
			self.displayoptions.precision = parseInt(a.attr("title"));
			self.input.val( self.history.last() );
			self.input.calc();
			self.calc.lastinputs=[];
		} else
			if (a.hasClass("scientific")) {	
				self.displayoptions.scientific = a.hasClass("yes")?1:0;
				self.menu.find("a.scientific span.glyphicon").remove();
				$("<span class=\"glyphicon glyphicon-ok\"></span>").appendTo(a);
				self.input.val( self.history.last() );
				self.input.calc();
				self.calc.lastinputs=[];
			}
		
		$(document).unbind("click");
		self.menu.hide();
		event.stopPropagation();
		event.preventDefault();
	});
	
	var menufunc = function (e){	  		
	 	 
		self.menu.css({"left":((e.pageX-10)+"px"),"top":((e.pageY-10)+"px")});		  	  
		self.menu.show();
		
		e.stopPropagation();
		e.preventDefault();
		
		$(document).bind("click", function(event){
			if (event.which==1 && !$(event.target).parent("ul").hasClass("dropdown-menu"))
  			{
				$(document).unbind("click");
				self.menu.hide();
  			}
		});
	};
	this.result.bind("contextmenu", menufunc );
	this.preview.bind("contextmenu", menufunc );
};
var Socialbar = function(){
	this.socialbar = null;
};


Socialbar.prototype.init = function() {
	
	var self = this;
		
	var socialbarimg = this.socialbar.find("img");
	
	var socialbarimgtimeout = null;
	
	socialbarimg.bind("mouseleave", function(){
		if (socialbarimgtimeout!=null) {
			window.clearTimeout( socialbarimgtimeout );
			socialbarimgtimeout = null;
		}
	});
	
	socialbarimg.bind("mouseenter", function(){
		
		socialbarimgtimeout = window.setTimeout(function(){
			socialbarimgtimeout = null;
			
			socialbarimg.unbind("mouseleave");
			socialbarimg.unbind("mousemove");
			self.socialbar.find("img").attr("src","/img/loading.gif");
		
			try {
				var title = $(document).attr("title");
				if (title.indexOf("-")>0)
					$(document).attr("title", $.trim( title.substring( title.indexOf("-")+1 ) ) );
					
				var imagesrc = $('meta[property="og:image"]').attr('content');
				if (imagesrc && imagesrc.length>0)
					$("<img style='width: 0px; height: 0px;' src='"+imagesrc+"' />").appendTo($("body"));
					
			}catch (e){}
			
			
		
			self.socialbar.load("/share.html?v1", function(){
				 
			});
		
				
			
		}, 150);
		
	});		
};
var Ad = function() {
	this.gad = null;
};

Ad.prototype.init = function(){
	
	var self = this;
	 

};
var InputHelper = function(){
	this.inputhelpermenu = null;
	this.inputhelper = null;
};



function cleanparans(a) {
	var paran = 0;
	for (var i=0;i<a.length;i++)
	{
		if (a.charAt(i)=='(')
			paran++;
		if (a.charAt(i)==')')
			paran--;
	}
	while (paran>0) {
		a+=")";
		paran--;
	}
	while (paran<0) {
		a="("+a;
		paran++;
	}
	
	var regex = /([0-9]),([0-9])/g;
	a = a.replace(regex, "$1.$2");
	
	var i=0;
	for (i=a.length-1;i>=0;i--) {
		var ch = a.charAt(i);
		if (!(ch=="-" || ch=="+" || ch=="^" || ch=="." || ch==";" || ch=="/" || ch=="#" || ch=="*"))
			break;
	}
	a = a.substring(0, i+1);
	
	return a;
}

InputHelper.prototype.init = function() {
	
		var self = this;
				 
		 this.inputhelpermenu.find("a").click(function(event){
			 $(document).unbind("click");
			 self.inputhelpermenu.hide();
			 
			 
			 
			 if (window.mathField)
			 	hideMathQuill();
			 	
			 
			 self.inputhelpermenu.find("li").removeClass("active");
			 
			 
			 /*
			 try {
				 ga('send', 'event', 'link', 'click', 'inputhelper');
			 }catch (e) {}
			 */
			 
			 var a = $(this);
			 var btnsdiv = $(".btns");
			 
			 var helperdiv = btnsdiv.parent().find("div.helper");
			 
			 a.parent().addClass("active");
			 
			 if (a.hasClass("programmer")) {
				 btnsdiv.addClass("programmer");
			 }
			 else
				 btnsdiv.removeClass("programmer");
			 
			 if (a.hasClass("graph"))
				 btnsdiv.addClass("graph");
			 else
				 btnsdiv.removeClass("graph");
			 
			 if (a.hasClass("unit"))
				 btnsdiv.addClass("unit");
			 else
				 btnsdiv.removeClass("unit");
			 
			 
			 if (a.hasClass("unit")) {
				 btnsdiv.addClass("unit");
				 
				 if (helperdiv.hasClass("unit")) {
					 helperdiv.show();
				 } else
				 helperdiv.load("/js-tmpl/unit.html", function(){
					 helperdiv.show();
					 helperdiv.addClass("unit");
					 
					  
					 var selectedtab = helperdiv.find("#bits");
					 
				 
					 var precalcfunc = function() {
						 
						 var a = selectedtab.find("input.text").val();
						 if (a)
							 a = $.trim(a);
						 else
							 a="";
						 if (a.length==0)
							 a = "1";
						 var b = selectedtab.find("select:first").val();
						 var c = selectedtab.find("select:last").val();
						 
						 $("#input").val(  a+b+" in "+c );
					 };
					 
					 helperdiv.find('#unittabs a').click(function (e) {
						  e.preventDefault();
						  selectedtab = helperdiv.find( $(this).attr("href") );
						  $(this).tab('show');
						  
						  
						  precalcfunc();
						});
					 
					 var calcfunc = function(){
						 precalcfunc();
						 
						 calc.reinit();
						 calc.input.focus();
						 calc.input.calc();
					 };
					 
					 
					 helperdiv.find("select").click(function(){
						 precalcfunc();
					 });
					 
					 helperdiv.find("input.text").each(function(){
						 var inp = $(this);
						 inp= inp.extend( {undobuf:[], request:null, history_index:-1, history_backup:null, histories:[], calcretries:0 } );
					     inp = calc.initInput( inp );
						 inp.calc = calcfunc;
						 inp.changed = precalcfunc;
							
						 var i = 0;
						 inp.focus(function(){
							
							calc.input = inp;
							calc.syntax = inp.parent().find( "input.syntax" ); 
							calc.preview.input = calc.input.val();
							
							 i++;
						 });
					 });
					 
				 });
			 } else {
				 helperdiv.hide();
				 btnsdiv.removeClass("unit");
				 helperdiv.removeClass("unit");
				 calc.reinit();
			 }
			 
			 if (a.hasClass("fraction")) {
				 btnsdiv.addClass("fraction");
				 
				 if (helperdiv.hasClass("fraction")) {
					 helperdiv.show();
				 } else
				 helperdiv.load("/js-tmpl/fraction.html", function(){
					 helperdiv.show();
					 helperdiv.addClass("fraction");
					 
					 
					 var precalcfunc = function() {
					
						 var inps = helperdiv.find("input.text");
						 
						 var a = cleanparans(inps.eq(0).val());
						 var b = cleanparans(inps.eq(1).val());
						 var c = cleanparans(inps.eq(2).val());
						 var d = cleanparans(inps.eq(3).val());
						 var e = cleanparans(inps.eq(4).val());
						 var f = cleanparans(inps.eq(5).val());
						 
						 var op = helperdiv.find("select.op").val();
						
						
					 
						 
						 
						 
						 if ((a.length>0 && !a.match(/^[0-9\.]+$/))  )
							 a ="("+a+")";
						 if ((d.length>0 && !d.match(/^[0-9\.]+$/)) )
							 d ="("+d+")";
						 
						 var A = "";
						 var B = "";
						 
						 if (a.length>0) {
							 if (b.length>0 ||c.length>0) {
								 if (b.length==0)
									 b = "0";
								 A+=a+"+";
							 }
							 else
								 A+=a;
						 }
						 
						 if (b.length>0 && !b.match(/^[0-9\.]+$/) )
							 b ="("+b+")";
						 
						 if (c.length>0) {
							 
							 if (!c.match(/^[0-9\.]+$/) )
								 c ="("+c+")";
							 
							  A+= b+"/"+c 
						 }
						 else
							 A+=b;
						 
						 
						 if (d.length>0) {
							 if (e.length>0 || f.length>0) {
								 if (e.length==0)
									 e = "0";
								 B+=d+"+";
							 }
							 else
								 B+=d;
						 }
						 
						 
						 
						 if (e.length>0 && !e.match(/^[0-9\.]+$/) )
							 e ="("+e+")";
						 
						 if (f.length>0) {
							
							 if (!f.match(/^[0-9\.]+$/) )
								 f ="("+f+")";
							 
							 B+= e+"/"+f ;
						 }
						 else
							B+=e;
						 
						 if (a.length>0)
							 A= "("+ A + ")";
						 
						 if (d.length>0)
							 B= "("+ B + ")";
						 
						 if (!A.contains("(")  && ((op=="*") || (op=="/")) )
						   A= "("+ A + ")";
				
						 if (!B.contains("(")  && ((op=="*") || (op=="/")) )
							   B= "("+ B + ")";
					 
						 
						 $("#input").val(  A + " " +op +" "+B  );
						 
					 };
					 var calcfunc = function(){
						 precalcfunc();
						 
						 calc.reinit();
						 calc.input.focus();
						 calc.input.calc();
					 };
					 
					 
					 helperdiv.find("select.op").click(function(){
						 precalcfunc();
					 });
					 
					 helperdiv.find("input.text").each(function(){
						 var inp = $(this);
						 inp= inp.extend( {undobuf:[], request:null, history_index:-1, history_backup:null, histories:[], calcretries:0 } );
					     inp = calc.initInput( inp );
						 inp.calc = calcfunc;
						 inp.changed = precalcfunc;
							
						 var i = 0;
						 inp.focus(function(){
							
							calc.input = inp;
							calc.syntax = inp.parent().find( "input.syntax" ); 
							calc.preview.input = calc.input.val();
							
							 i++;
						 });
					 });
					 
				 });
				 
				 
			 }
			 else {
				 helperdiv.hide();
				 btnsdiv.removeClass("fraction");
				 helperdiv.removeClass("fraction");
				 calc.reinit();
			 }
			 
			 
			 if (a.hasClass("solver")) {
				 btnsdiv.addClass("solver");
				 
				 if (helperdiv.hasClass("solver")) {
					 helperdiv.show();
				 } else
				 helperdiv.load("/js-tmpl/solver.html", function(){
					 helperdiv.show();
					 helperdiv.addClass("solver");
					 
					 var varcount = helperdiv.find(".varcount");
					 var varcountfunc = function(){
						 var maxindex = parseInt(varcount.val());
						 
						 helperdiv.find("input.text").each(function(){
							 var inp = $(this);
							 
								 var placeholder = inp.data("ph"+maxindex );
								 if (placeholder!==undefined) {
									 inp.attr("placeholder", placeholder);
								 }
							 
						 });
						 
						 helperdiv.find(".inputrow").each(function(index){
							 var inputrow = $(this);
							 if (index<maxindex)
								 inputrow.show();
							 else
								 inputrow.hide();
						 });
					 };
					 varcount.click( varcountfunc );
					 varcount.bind("change", varcountfunc );
					
					 var precalcfunc = function() {
						 var arr = [];
						 helperdiv.find(".inputrow").each(function(){
							var inputrow = $(this);
							if (inputrow.is(':visible'))
							{ 
								var a = inputrow.find("input.text:first").val();
								var b = inputrow.find("input.text:last").val();
								
								a = cleanparans( a );
								b = cleanparans( b );
								 
								if (b=="")
									b= "0";
								if (a=="")
									a = "x";
								
								arr.push(  a+"="+b  );
							}
						 });
						  
							 var tmp = "solve(";
							 for (var i=0;i<arr.length;i++) 
								 tmp+=arr[i]+((i<arr.length-1)?", ":"");
							 $("#input").val( tmp+")" );
						 
					 };
					 var calcfunc = function(){
						 precalcfunc();
						 
						 calc.reinit();
						 calc.input.focus();
						 calc.input.calc();
					 };
					 
					 
					 helperdiv.find("input.text").each(function(){
						 var inp = $(this);
						 inp= inp.extend( {undobuf:[], request:null, history_index:-1, history_backup:null, histories:[], calcretries:0 } );
					     inp = calc.initInput( inp );
						 inp.calc = calcfunc;
						 inp.changed = precalcfunc;
							
						 var i = 0;
						 inp.focus(function(){
							
							calc.input = inp;
							calc.syntax = inp.parent().find( "input.syntax" ); 
							calc.preview.input = calc.input.val();
							
							 i++;
						 });
					 });
					 
				 });
				 
				 
			 }
			 else {
				 helperdiv.hide();
				 btnsdiv.removeClass("solver");
				 helperdiv.removeClass("solver");
				 calc.reinit();
			 }
			 
			 
			 
			 if (a.hasClass("vector")) {
				 btnsdiv.addClass("vector");
				 
				 if (helperdiv.hasClass("vector")) {
					 helperdiv.show();
				 } else
				 helperdiv.load("/js-tmpl/vector.html", function(){
					 helperdiv.show();
					 helperdiv.addClass("vector");
					 
					 
					 var getVector = function( input ) {
						 var A= "";
						 var count = parseInt( input.find("select.vector").val() );
							input.find("div.vector.texts").find("div.form-group").each(function(index){
								if (index<count) {
									var text = $.trim( $(this).find("input.text").val() );
									text = cleanparans(text);
									if (text.length==0)
										text = "0";
									
									A += text;
									if (index<count-1)
										A+=", ";
								}
							}); 
							return A;
					 };
					 
					 var getMatrix = function( input ) {
						 var A= "[";


						 var y = parseInt( input.find("select.matrix:first").val() );
						 var x = parseInt( input.find("select.matrix:last").val() );
						 
							input.find("div.matrix.texts").find("tr").each(function(index){
								if (index<y) {
									var tr = $(this);
									
									tr.find("td").each(function(index1){
										if (index1<x) {
											var text = $.trim( $(this).find("input.text").val() );
											text = cleanparans(text);
											if (text.length==0)
												text = "0";
											
											A += text;
											
												if (index1<x-1)
													A+=", ";
										}
									});
									if (index<y-1)
										A+="], [";
								}
							}); 
							return A+"]";
					 };
					 
					 var precalcfunc = function() {
						 
							var inputA = helperdiv.find(".inputA");
							var inputB = helperdiv.find(".inputB");
							
							var typeA = inputA.find("select.type").val();
							var typeB = inputB.find("select.type").val();
							
							var A = "";
							var B = "";
							
							
							var opaa  = helperdiv.find("select.opaa");
							var opbb = helperdiv.find("select.opbb");
							
							if (typeA=="v" && typeB=="v") {
								helperdiv.find("select.op.vec").show();
								helperdiv.find("select.op.mat").hide();
								helperdiv.find("select.op.vecmat").hide();
							} else
								if (typeA=="m" && typeB=="m") {
									helperdiv.find("select.op.vec").hide();
									helperdiv.find("select.op.mat").show();
									helperdiv.find("select.op.vecmat").hide();
								} else
									 {
										helperdiv.find("select.op.vec").hide();
										helperdiv.find("select.op.mat").hide();
										helperdiv.find("select.op.vecmat").show();
									}
							
							if (typeA=="v") {
								A = "(" + getVector( inputA ) + ")";
								opaa.hide();
								opaa = "";
							}
							else {
								A = "[" + getMatrix( inputA ) + "]";
								opaa.show();
								opaa = opaa.val();
							}
							if (typeB=="v") {
								B = "(" + getVector( inputB ) + ")";
								opbb.hide();
								opbb = "";
							}
							else {
								B = "[" + getMatrix( inputB ) + "]";
								opbb.show();
								opbb = opbb.val();
							}
						
							
							if (opaa=="^-1" || opaa=="^T") {
								A = "("+A;
								opaa+=")";
							}
							
							if (opbb=="^-1" || opbb=="^T") {
								B = "("+B;
								opbb+=")";
							}
							 
							var op = helperdiv.find("select.op:visible").val();
							var opa = helperdiv.find("select.opa").val();
							var opb = helperdiv.find("select.opb").val();
							
							$("#input").val(opa+ A+ opaa+ op + opb+ B+opbb );
							 
						 };
					 var calcfunc = function(){
						 precalcfunc();
						 calc.reinit();
						 calc.input.focus();
						 calc.input.calc();
					 };
				
					 var updatevector = function( parent ) {
							
						 var val = parseInt( parent.find("select.vector").val() );
						 
						 parent.parent().parent().find("div.vector").find("div.form-group").each(function(index){
							 var row = $(this);
							 if (index<val)
								 row.show();
							 else
								 row.hide();
						 });
						 
						 precalcfunc();
					 };
					 var updatematrix = function( parent ) {
						 
						 var y = parseInt( parent.find("select.matrix:first").val() );
						 var x = parseInt( parent.find("select.matrix:last").val() );
						 
						 parent.parent().parent().find("div.matrix").find("tr").each(function(index){
							 var row = $(this);
							 if (index<y) {
								 row.find("td").each(function(index1){
									 var td = $(this);
									 if (index1<x) 
										 td.show();
									 else
										 td.hide();
								 });
								 row.show();
							 }
							 else
								 row.hide();
						 });
						 
						 precalcfunc();	
					 };
						
					 
					 var changetype = function( select ){
							 
							var parent = select.parent();
							var gparent = parent.parent().parent();
							
							if (select.val()=="m") {
								gparent.removeClass( "vector" );
								gparent.addClass( "matrix" );
								updatematrix( parent );
							} 
							if (select.val()=="v") {
								gparent.removeClass( "matrix" );
								gparent.addClass( "vector" );
								updatevector( parent  );
							} 
							 precalcfunc();
					 };
					 
					 helperdiv.find("select.op").bind("click mouseup change", function(){
						 precalcfunc();
						});
					 helperdiv.find("select.opa").bind("click mouseup change", function(){
						 precalcfunc();
						});
					 helperdiv.find("select.opb").bind("click mouseup change", function(){
						 precalcfunc();
						});
					 helperdiv.find("select.opaa").bind("click mouseup change", function(){
						 precalcfunc();
						});
					 helperdiv.find("select.opbb").bind("click mouseup change", function(){
						 precalcfunc();
						});
					 
					helperdiv.find("select.type").bind("click mouseup change", function(){
						changetype( $(this) );
					});
					
					 helperdiv.find("select.vector").bind("click mouseup change", function(){
						 updatevector( $(this).parent() );
					 });
					 helperdiv.find("select.matrix").bind("click mouseup change", function(){
						 updatematrix( $(this).parent() );
					 });
					 
					 
					
					 
					
					 
					 helperdiv.find("input.text").each(function(){
						 var inp = $(this);
						 inp= inp.extend( {undobuf:[], request:null, history_index:-1, history_backup:null, histories:[], calcretries:0 } );
					     inp = calc.initInput( inp );
						 inp.calc = calcfunc;
						 inp.changed = precalcfunc;
							
						 var i = 0;
						 inp.focus(function(){
							
							calc.input = inp;
							calc.syntax = inp.parent().find( "input.syntax" ); 
							calc.preview.input = calc.input.val();
							
							 i++;
						 });
					 });
					
				 });
				 
				 
			 }
			 else {
				 helperdiv.hide();
				 btnsdiv.removeClass("vector");
				 helperdiv.removeClass("vector");
				 calc.reinit();
			 }
			 
			 if (a.hasClass("unit"))
				 btnsdiv.addClass("unit");
			 else
				 btnsdiv.removeClass("unit");
			 
			 			 
			 $("#inputhelper span.title").html( a.html() );
			 
			 event.stopPropagation();
				event.preventDefault();
		 });
		 
		 
		 this.inputhelper.click(function(event){
			 
			 var glyphicon = $(this).find("span.glyphicon");
			 var pos = glyphicon.offset();
			 self.inputhelpermenu.css({left:((pos.left-self.inputhelpermenu.width()+glyphicon.width())+"px"),top:((pos.top)+"px")});
			 self.inputhelpermenu.show();
			 
			 $(document).bind("click", function(event){
				if ($(event.target).parents(".center").length==0)
		  		{
					$(document).unbind("click");
					self.inputhelpermenu.hide();
		  		}					
			 });	
			 
			 event.stopPropagation();
			 event.preventDefault();
		 });
		
		
	};
function Quicklinks(){
	this.quicklink = null;
	this.quicklinkframe = null;
	this.graph = null;
	this.calclet = null;
	this.sketch = null;
}



Quicklinks.prototype.init = function(){

	var self = this;
		
		var ul = this.quicklinkframe;
		
		ul.remove();
		ul.appendTo($("body"));
		
		ul.find("li").each(function(){
			var li = $(this);
			li.mouseenter(function(){
				ul.find("img").hide();
				if (li.data("over"))
					ul.find("img."+li.data("over") ).show();
			});
		});
		
		self.quicklink.find(".dropdown-toggle").click(function(){
			
			var btn = $(this);
			
			if (!btn.hasClass("loaded")) {
				btn.addClass("loaded");
				
				ul.find("img").each(function(){
					var img = $(this);
					if (img.data("src"))
						img.attr("src", img.data("src"));
				});
			}
			
			self.quicklink.toggleClass("open");
			if (self.quicklink.hasClass("open")) {
				
				$(document).click(function(event){
					var target = $(event.target);
					if (target.parents(".center").length>0)
						return;
					if (target.parents("#quicklinkframe").length>0)
						return;					
					
					self.quicklink.removeClass("open");
					$(document).unbind("click");
					ul.hide();	
				});
				
				var pos = self.quicklink.offset();
				ul.css({left:(pos.left+"px"),top:((8+pos.top+btn.height())+"px")});
				
				ul.show();
			}else {
				self.quicklink.removeClass("open");
				$(document).unbind("click");
				ul.hide();				
			}
			
		});
		ul.find("a").click(function(event){
			var a = $(this);
			var li = a.parent("li");
			ul.find("li").removeClass("active");
			li.addClass("active");
			self.quicklink.find(".btn:first").html( a.html() );
			event.stopPropagation();
			event.preventDefault();
			self.quicklink.removeClass("open");
		});
		
		/*
		$("#quicklink .btn:first, #quicklinkframe a").click(function(event){
			ul.find("li").each(function(){
				var li = $(this);				 
				if (li.hasClass("active")) {
				 
				  if (li.hasClass("graph"))
					 self.graph.show();
				  if (li.hasClass("calclet"))
					  self.calclet.show();
				  if (li.hasClass("sketch"))
					  self.sketch.show();
					
				}
			});
			event.stopPropagation();
			event.preventDefault();
			
			self.quicklink.removeClass("open");
			ul.hide();
		});
		*/
		
};
	
function Login() {
	this.loginbtn = null;
	this.visible = false;
	 
}

Login.prototype.show = function(){
	var self = this;	
	self.visible = true;
	 
	 
		
	self.loginbtn.parent().addClass("open");
	$(document).click(function(event){
		
		var target = $(event.target);
		if (target.parents("#logindropmenu").length>0)
			return;
		if (target.parents(".modal").length>0)
			return;
		
		if (target.hasClass("loginbtn"))
			return;
		
		self.hide();
	});
	
	
	$("#logindropmenu").find("input:first").focus();
	
};

Login.prototype.hide = function(){
	var self = this;
	self.visible = false;
	
	self.loginbtn.parent().removeClass("open");
	$(document).unbind("click");
};


Login.prototype.init = function(){
	var self = this;
	if (this.loginbtn.length>0)
	{		
		this.loginbtn.click(function(event){
			
			event.stopPropagation();
			event.preventDefault();	
			
			if (self.visible)
				self.hide();
			else 
				self.show();
		});
		
		
		var signinbtn = $("#signinbtn");
		signinbtn.click(function(){
			try{
				if (!('localStorage' in window && window['localStorage'] !== null))
			    	return;
				
			    if (!localStorage)
			    	return;
			    
			    $("#logindropmenu").find("input[type=radio]").each(function(){
			    	var rb = $(this);
			    
			    	if (rb.is(':checked'))
			    		localStorage.setItem("login_rb", rb.attr("name") );
			    });		    
			} catch (e) {}
		});
		
		
		
	}
};
function Navbar(){
	
}
Navbar.prototype.init = function() {
	
		var lastul = null;
		
		var timeout=[];
		var entertimeout=[];
		
		
		var ignoreOvertoggle=function(){
			return $("div.navbar-collapse").hasClass("in");
		};
		
		$("nav ul.overtoggle li.dropdown").each(function(index){
			var li = $(this);
			
			if (li.hasClass("nohover"))
				return;
						
			li.find(".dropdown-toggle").click(function(event){
				
				$(this).css({cursor:"wait"});
								
				window.location = $(this).attr("href");				
			}); 
			
			li.mouseenter(function(){
				
				if (ignoreOvertoggle()) 
					return;
				
				//if (li.parent(".makeright").css("float")!="right")
					//return;
				
				entertimeout[index]=window.setTimeout(function(){
					entertimeout[index]=null;
					if (li.hasClass("dropdown")){
						
						if (timeout[index]!=null)
						{
							window.clearTimeout(timeout[index]);
							timeout[index]=null;
						}
						
						var ul=li.children("ul.dropdown-menu");
						if (lastul!=null)
							lastul.hide();
						lastul=ul;
						ul.show();
					}
				}, 500);
			});
			
			li.mouseleave(function(){	
				
				if (ignoreOvertoggle()) 
					return;
				
				//if (li.parent(".makeright").css("float")!="right")
					//return;
				
				if (entertimeout[index]!=null)
				{
					var ul=li.children("ul.dropdown-menu");
					window.clearTimeout(entertimeout[index]);
					if (ul!=undefined)
						ul.hide();
					entertimeout[index]=null;
				}
				
				if (li.hasClass("dropdown")){
					var ul=li.children("ul.dropdown-menu");
					
					timeout[index]=window.setTimeout(function() {
						 ul.hide();
					 }, 500);
					
				}
			});
		});
		
		
		
		
		
};
function Disclaimer(){
	this.disclaimer = null;
}


Disclaimer.prototype.init = function() {
	
	var self = this;

	self.disclaimer.find("a").click(function(event){
		window.open( $(this).attr("href") );
		event.stopPropagation();
		event.preventDefault();		
		self.disclaimer.alert("close");
	}); 
	var timeout = window.setTimeout(function(){
		self.disclaimer.alert("close");
	}, 3500);
	self.disclaimer.mouseenter(function(){
		if (timeout) {
			window.clearTimeout(timeout);
			timeout = window.setTimeout(function(){
				self.disclaimer.alert("close");
			}, 8000);
		}
	});  
};


function Constants() {
	this.loadurl = "/js-tmpl/constants.html";
	this.calc = null;
	this.modal = null;
}

Constants.prototype.init =function() {
	
};

Constants.prototype.show = function() {
	
	var self = this;
	
	
	if (self.modal!=null) {
		self.modal.modal({show:true,keyboard:true});
		return;
	}
	
	var div = $("<div></div>");
	div.load( self.loadurl, function(){
		
		self.modal = div.find(".modal");
		self.modal.addClass("constants");
	 
		
		self.modal.appendTo($("body"));
		
		
		self.modal.find("select").click(function(){
	 
			$(this).parent().find('input.name').val(this.options[this.selectedIndex].text);
			$(this).parent().find('input.value').val($.trim(this.options[this.selectedIndex].value.split('[')[0]));
			$(this).parent().find('input.unit').val('['+this.options[this.selectedIndex].value.split('[')[1]);
		
		} );
		
		self.modal.find(".insert").click(function(){
			
			self.calc.input.ins($(this).parent().find('input.value').val());
			self.modal.modal('hide');
				
		});
		
		
		var search = function( text ) {
			var search = $.trim( text.val().toLowerCase() );
			var list = self.modal.find("#constantslist");
			list.find("option").each(function(index){
				var td = $(this);
				if (td.text().toLowerCase().indexOf(search)>-1)
				{
					td.show();
				} else
					td.hide();
			});
			
		};
		self.modal.find("input.name").keyup( function(){
			search( $(this) );
		} );
		self.modal.find("input.name").mouseup( function(){
			search( $(this) );
		} );
		self.modal.find(".search").click( function(){
			search( $(this) );
		} );
		
		
		
		
		self.modal.modal({show:true,keyboard:true});
		
		self.modal.on('shown.bs.modal', function (e) {
		//	self.refresh();
		});
		
		self.modal.on('hide.bs.modal', function (e) {
		//	self.savetemp();
		});
		

		 
		
		
	});		
	
	
};




function Variables() {
	this.loadurl = "/js-tmpl/variables.html";
	this.calc = null;
	this.modal = null;
}

Variables.prototype.init =function() {
	
};

Variables.prototype.show = function() {
	
	var self = this;
	
	
	if (self.modal!=null) {
		self.modal.modal({show:true,keyboard:true});
		return;
	}
	
	var div = $("<div></div>");
	div.load( self.loadurl, function(){
		
		self.modal = div.find(".modal");
		self.modal.addClass("Variables");
	 
		
		self.modal.appendTo($("body"));
		
		
		self.modal.find(".insert").click(function(){
			
			try {
				var v = $('#variableslist option:selected').text();
				self.calc.input.ins(v);
				self.modal.modal('hide');
			} catch (e) {
			 console.log(e);
			}
				
		});
				
		
		self.modal.modal({show:true,keyboard:true});
		
		self.modal.on('shown.bs.modal', function (e) {
		//	self.refresh();
		});
		
		self.modal.on('hide.bs.modal', function (e) {
		//	self.savetemp();
		});
			
	});		
	
};



function CheckCookie () {
	
}


CheckCookie.prototype.init = function(){
	
	
	var self = this;
	var checkcookie = $("#checkcookie");
	if (checkcookie.length>0) {
		
		$.ajax({
	        url: "/checkcookie",
	        dataType: 'json',
	        data: { "sid":checkcookie.data("sid") },
	        async: true,
	        type: 'POST',
	        
	        error : function( jqXHR, textStatus, errorThrown) {
	        	checkcookie.show();
	        	 
	        },
	
	        success: function (json) {
	        	if (json && json.status=="OK" && json.sid && json.sid.length==32) {
	           		return;
	        	}
	        	
	        	if (json && json.status=="AUTH" && json.sid && json.sid.length==32 && json.user && json.user.length>0) {
	           		
		        	$("body").css({opacity:0.5});	
		        	
		        	var form = $("<form method=\"post\"><input type=\"hidden\" name=\"login\" value=\"auth\" /></form>");
		        	form.appendTo($("body"));
		        	form.attr("action", "http://"+ json.user+":"+json.sid+"@"+window.location.href.substring(window.location.protocol.length+2) );
		       		form.submit();
	       			
	       			return;
	       		}
	       		
	       		checkcookie.show();
	       			 
	        }
		});
		
		
	}
}



function Update() {
	 this.nr = 0;
}

Update.prototype.update = function(){
	
	try {
	
		var self = this;
		
		var time = 0;
		try {
			time = $("html").data("time");
		} catch (e){}
		
		var params = {"nr":self.nr++, "time":time};
		
		if ((self.nr<6*60) || (self.nr % 60 ==0))
	  	$.ajax({
	        url: "/api/status",
	        dataType: 'json',
	        data: params,
	        async: true,
	        type: 'POST',
	        
	        
	        error: function (xhr, status, err) {      
	       
	       	//	alert("err"+status);
	       
	        },
	        
	        success: function (json) {
	        	
	        	
	        		if (json.questions && json.questions>0)
	        		{
	        			var n = $("#newquestioncount, #newquestioncountheadline, #newquestioncountback");
	        			if (n.length>0) {
	        			 n.text("+"+json.questions);
	        			 n.fadeIn();
	        			}
	        			
	        			
	        			try {
							var title = $(document).attr("title");
							if (title.indexOf(":")<0)
								$(document).attr("title", ("+"+(json.questions))+" : "+title  );
							else
								$(document).attr("title", ("+"+(json.questions))+" : "+$.trim( title.substring( title.indexOf(":")+1 ) ) );
							
						} catch (e) {}
	        			
	        		}
	        		
	        		if (json.answers && json.answers>0)
	        		{
	        			var n = $("#newanswerscount");
	        			n.text("+"+json.answers);
	        			n.fadeIn();
	        		}
	        		
	        	
	        	
	        		if (json.messages>-1) {
	        			
	        			var n = $("#newmessagecount");
	        			if (n.length>0) {
		        			n.find(".num").text( "+"+json.messages );
		        			
		        			if (json.messages>0)
		        				n.fadeIn();
		        			else
		        				n.fadeOut();
	        			}
	        		 
	        		}
	        	
	        }
	  	});
	  	
	} catch (e) {
	
	}
	
};

Update.prototype.init = function(){
	
	var self = this;
	
	var userbtn = $("#userbtn, html.questions, html.question");
	if (userbtn.length>0) 
	{	
		window.setInterval(function(){
			self.update();
		} , 10 * 1000);
		
		self.update();
	}
	
};

function init_btn_leftright(){
	var btnleft = $("#BtnLeft");
	btnleft.mousemove(function(event) {
		if ((event.pageX-btnleft.offset().left)>btnleft.width()/2) {
			btnleft.removeClass("left");
			btnleft.addClass("right");
		} else {
			btnleft.removeClass("right");
			btnleft.addClass("left");
		}
	});
	
	btnleft.mouseout(function(){
		btnleft.removeClass("left");
		btnleft.removeClass("right");		
	});
}


function Clipboard() {
}

Clipboard.prototype.init = function() {
	var self = this;
	
	$("#clipboardframe button").click(function(){
		self.toggle();
	});
	
	$("#addclipboard").click(function(event){
		
		if (!$(this).hasClass("loaded")) {
			$(this).addClass("loaded");
			self.load();
		}
		
		self.toggle();
	});
	
	
	$("#clipboardframe textarea").bind("blur onkeyup onmouseup resize", function(){
		self.save();
	} );
	
};

Clipboard.prototype.toggle = function() {

	 $("#clipboardframe").toggleClass("open");

};

 

Clipboard.prototype.save = function(){
	var self = this;
	try{
		if (!('localStorage' in window && window['localStorage'] !== null))
	    	return;
		
	    if (!localStorage)
	    	return;
	    
	    var textarea = $("#clipboardframe textarea");
	    
	    var value = JSON.stringify( {"text":textarea.val(), "w":textarea.width(), "h":textarea.height() } );
	
	    if (!value)
	    	return;    
	    
	    localStorage.setItem("clipboard", value);
    
	} catch (error) {
	}
	
};

Clipboard.prototype.load = function() {
	var self = this;
	try{
		if (!('localStorage' in window && window['localStorage'] !== null))
	    	return;
		
	    if (!localStorage)
	    	return;
	    
	    var value = JSON.parse( localStorage.getItem("clipboard") );
	    if (!value)
	    	return;
	    
	    var textarea = $("#clipboardframe textarea");
	    
	    textarea.val( value.text );
	    textarea.css({"width":( value.w+ "px"), "height":( value.h+ "px")});
    
	} catch (error) {
	}
	
};



function sendErrorReport(msg, e) {
  //console.log("Error: "+msg+", "+e);
		        	
  $.ajax({
       url: "/api/reporterror",
       dataType: 'json',
       data: { emsg:(""+e), msg:msg},
       async: true,
       type: 'POST',       
       success: function (json) {
       }
  });
	
}


function captchaokcallback() {
	/*
	try {
		 
		var recaptcha = $(".g-recaptcha");
		if (recaptcha.length>0) {
			var form = recaptcha.parents("form:first");
			if (form.length==1) {
				var btn = form.find(".captchasubmit");
				if (btn.length==1) {
					
					form.find("button").hide();
					btn.html("<img src=\"/img/loading.gif\" />");
					btn.click();
				}
			}
		}
	} catch(e) {}
	*/
}


function postInitLatexFormulas() {
	
	MathJax.Hub.Queue(["setRenderer",MathJax.Hub,"SVG"],["Typeset",MathJax.Hub]);
	MathJax.Hub.Queue(function(){
		$("svg").attr("class","img-reponsive");
		
		var location = ""+window.location;
		if (location.indexOf("#r")>0) {
		 
			var anchor = $("a[name='"+ window.location.href.substring(window.location.href.indexOf("#r")+1) +"']");
			$('html,body').animate({scrollTop: anchor.offset().top},'slow');
		}
		
	}); 
	
}

function initLatexFormulas() {
	
	//if ($("#editor").length==0) 
	{
	
		$("<script type=\"text/x-mathjax-config\">MathJax.Hub.Config({ tex2jax: { inlineMath: [ ['$','$'], ['\\\\$','\\\\$'], ['\\\\(','\\\\)'] ], preview: \"none\"}, jax: [\"input/TeX\",\"output/SVG\"], skipStartupTypeset:true, TeX: { extensions: [ \"color.js\"] }});MathJax.Hub.Register.StartupHook('End',function () { postInitLatexFormulas(); });</script>").appendTo($("head"));
		
		
		var maths = $("span.math-tex");
		//if (maths.length>0)
		if ((maths.length>0) || $("html").hasClass("question"))
		{
			$("<script src=\"/mathjax/MathJax.js?config=TeX-AMS_HTML\"></script>").appendTo($("head"));
		} 
	}
	
	window.setTimeout(function(){
		$("svg").addClass("img-responsive");
	}, 1000);
	
}



var calc;
var graph;
var calclet;
var sketch;
var login;

function initCalc() {
	calc = new Calc();
	calc.ismobile = false;
	calc.display = $("#display");
	calc.input = $("#input");
	calc.syntax = $("#syntax");
	calc.preview= $("#preview");
	calc.result= $("#result");
	calc.error = $("#error");
	calc.graph = $("#graph");
	calc.trigodeg = $("#trigodeg");
	calc.trigorad = $("#trigorad");
	calc.btns = $(".btns button, .btns a");
	calc.popbtns = $("#ButtonLn, #ButtonExp, #ButtonLg2, #Button2X");
	calc.iswidget = $("html").hasClass("widget");
	calc.ismobile = $("html").hasClass("mobile");
	calc.isipad = $("html").hasClass("ipad");
	calc.code = $("#code").val();
	

	if (!calc.init())
		return;
	
	calc._input = calc.input;
	calc._syntax = calc.syntax;
	calc._changed = calc.changed;
	 
	calc.reinit = function() {
		calc.input = calc._input;
		calc.syntax = calc._syntax; 
		calc.changed = calc._changed;
		calc.preview.input = calc.input.val();
		
		calc.input.unbind("focus");
	};
	calc.input.focus(calc.reinit);
	
	try {
		calc.history = new History1();
		calc.history.calc = calc;
		calc.history.histories = $("#hist");
		calc.history.input = calc.input;
		calc.history.syntax = calc.syntax;
		calc.history.init();
		calc.history.done();
		
		$("#clearhistory").click(function(event){
			if ( confirm( $(this).text()+"?" ) ) {
				calc.history.clear();
			}
			event.stopPropagation();
			event.preventDefault();
		});
	} catch (e) {
		sendErrorReport("history.init:", e);
	}
	
	

	calc.done();	
	
	 
/*
	try{
		var ad = new Ad();
		var gad = $("#calccontainer").prev();
		if (gad.attr("id")) {
			if (!calc.ismobile) {
				ad.gad = gad;
				ad.init();
			}
		}
	} catch (e) {
		sendErrorReport("ad.init:", e);
	}
*/
	
	try{
		var inputhelper = new InputHelper();
		inputhelper.inputhelpermenu = $("#inputhelpermenu");
		inputhelper.inputhelper = $("#inputhelper");
		inputhelper.init();
	} catch (e) {
		sendErrorReport("inputhelper.init:", e);
	}
	
	try{
		var inputhelper = new InputHelper();
		inputhelper.inputhelpermenu = $("#inputhelpermenu");
		inputhelper.inputhelper = $("#inputhelper1");
		inputhelper.init();
	} catch (e) {
		sendErrorReport("inputhelper.init:", e);
	}
	
	
	/*
	try{
		calclet = new Calclet();
		calclet.trigodeg = calc.trigodeg;
		calclet.trigorad = calc.trigorad;
		calclet.axisbounds = calc.axisbounds;
		calclet.init();
		//calclet.show();
	} catch (e){
		sendErrorReport("calclet.init:", e);
	}	
	*/
	
	/*
	
	try{
		sketch = new Sketch();
		sketch.trigodeg = calc.trigodeg;
		sketch.trigorad = calc.trigorad;
		//sketch.axisbounds = calc.axisbounds;
		sketch.init();
		//sketch.show();
	} catch (e){
		sendErrorReport("sketch.init:", e);
	}	
	*/	
	
	try{ 
		var quicklink = new Quicklinks();
		quicklink.graph = graph;
		quicklink.calclet = calclet;
		quicklink.sketch = sketch;
		quicklink.quicklink = $("#quicklink");
		quicklink.quicklinkframe = $("#quicklinkframe");
		quicklink.init();
	} catch (e) {
		sendErrorReport("quicklinks.init:", e);
	}
	
	try {
		var constants = new Constants();
		constants.calc = calc;
		constants.init();
		calc.constants = constants;
	} catch (e) {
	}
	

	try {
		var variables = new Variables();
		variables.calc = calc;
		variables.init();
		calc.variables = variables;
	} catch (e) {
	}
		

	try{
		init_btn_leftright();
	} catch(e){
		sendErrorReport("leftright.init:", e);
	}
	
	
	try{
		var disclaimer = new Disclaimer();
		disclaimer.disclaimer = $("#disclaimer");
		disclaimer.init();
	} catch (e) {
		sendErrorReport("disclaimer:", e);
	}
	
	try{
		var displaycontextmenu = new Displaycontextmenu();
		displaycontextmenu.menu = $("#displaycontextmenu");
		displaycontextmenu.calc = calc;
	 
		displaycontextmenu.input = calc.input;
		displaycontextmenu.result = calc.result;
		displaycontextmenu.preview = calc.preview;
		displaycontextmenu.history = calc.history;
		displaycontextmenu.displayoptions = displayoptions;
		displaycontextmenu.init();
	} catch (e) {
		sendErrorReport("display context menu.init:", e);
	}
	
	
	try {
	
		calc.input.attr("autocorrect", "off");
		calc.input.attr("autocapitalize", "off");
		
	} catch (e) {}
	

	try {
		var clipboard = new Clipboard();
		clipboard.init();
	} catch (e) {}

	var html = $("html");
	if (html.hasClass("calc") && html.hasClass("mathquill"))
	{	
		try {	
			initMathQuill();
		} catch (e) {
		
			sendErrorReport("mathquill.init:", e);
		
			try {
				hideMathQuill();
			} catch (e1) {}
		
		}
	}
	
}


var func_resize = function(){
	
		
	if ($("html").hasClass("widget")) {
	
		window.setTimeout(function(){
			
			var wh = $(window).height();
			if (wh<0 || wh>2000) {
				return;
			}
			
			var h = wh - $(".center:first").height() -$(".calccontainer:first").offset().top-10;
		
			if (h<0 || h>2000) {
				return;
			}
		
			calc.display.minheight = calc.display.height = h;
			$("div#display:first").css({height:((h)+"px")});
			
		}, 500);
			
	}
	
	
	var menubar = $("#menubar");
	if (menubar.length>0) {
	
		window.setTimeout(function(){
	
			menubar.children("li").removeClass("minimize");
		
			for (var prio=4;prio>=1;prio--) {
			
				var offsettop = menubar.offset().top;
				
				if (offsettop < 30)
					break;
				
				menubar.children("li").each(function(){
					var li = $(this);
					if (li.data("prio") && parseInt(li.data("prio"))==prio) {
						
						li.addClass("minimize");
						
					}
				});
			
			}
		}, 500 );
		
	}
	
	
};



function hideMathQuill() 
{
	$("div.formula").hide();
	$("div.inputs").show();
	window._mathField = window.mathField;
	window.mathField = undefined;
}

function initMathQuill() {


	if (!$("div.formula").hasClass("loaded")) {	
		$("div.formula").addClass("loaded");
 
		//$("<link/>",{rel:"stylesheet",type:"text/css",href:"https://web2.0calc.com/mathquill/mathquill.css?v1"}).appendTo("head");
		
		//$.getScript("https://web2.0calc.com/mathquill/mathquill.js?v1",
		//	function() 
			{
			
				var mathFieldSpan = document.getElementById('math-field');
				var inp = $("#input");
				
				var MQ = MathQuill.getInterface(2);
				window.mathField = MQ.MathField(mathFieldSpan, {
				  spaceBehavesLikeTab: false,
				  handlers: {
				  	
				    edit: function() {
				    	 
				    	var text = mathField.text();
				    	 
				    	if (window.mathField.disable) {
				    		window.mathField.disabletext = text;
				    		window.mathField.disable = false;
				    	} 
				    	 
				    	if ( window.mathField.disabletext != text ) {
					     	//console.log("edit:"+text);
					     	inp.val( text );
					     	calc.preview.input = text;
					     	calc.preview.timeout = -1;
					     	window.mathField.disable = false;
					     	window.mathField.disabletext = 'abc123';
				     	} 
				     		
				    },
				    enter: function() {
				    	calc.input.calc();
				    }
				    ,
				    upOutOf: function(mathField) { 
				    	calc.input.historyScroll(false); 
				    },
    				downOutOf: function(dir, mathField) { 
    					calc.input.historyScroll(true); 
    				}
    				
				  }
				});		
				
				window.mathField.disable = false;
				window.mathField.disabletext = "abc123";
				
				$("div.inputs").hide();
				$("div.formula").show();
				
				window.mathfieldfocus = function(){
				
					if (!$("#math-field").hasClass("mq-focused")) {
						window.mathField.focus();
						window.setTimeout(window.mathfieldfocus, 100);
					}
				
				};
				window.setTimeout(function(){
					window.mathfieldfocus();
				}, 200);
				
				
				//$(mathFieldSpan).focus();
			}
		//);
	
	} else {
		$("div.inputs").hide();
		$("div.formula").show();
		window.mathField = window._mathField;
	}
	
}






$(document).ready(function(){
	
	
	var starttime = new Date();
	
	var html = $("html:first");
	html.addClass("js");
	
	
	try{
		var navbar = new Navbar();
		navbar.init();
	} catch (e) {
		sendErrorReport("navbar.init:", e);
	}
	
	try{
		login = new Login(); 
		login.loginbtn = $("button.loginbtn");
		login.init();		
	} catch (e) {
		sendErrorReport("login.init:", e);
	}
	
	
	/*
	try{ 
		if (html.hasClass("socialbar")) {
			var socialbar = new Socialbar();
			socialbar.socialbar = $("#socialbar");
			socialbar.init();
		}
	} catch (e) {
		sendErrorReport("socilabar.init:", e);
	}
	*/
	
	try{
		if (html.hasClass("accordion")) {
			var accordion = new Accordion();
			accordion.accordion = $("#accordion");
			accordion.init();
		}
	} catch (e) {
		sendErrorReport("accordion.init:", e);
	}
	
	try {
		var checkcookie = new CheckCookie();
		checkcookie.init();
	}catch (e) {
		sendErrorReport("checkcookie.init:", e);
	}
	
	
	$("button.navbar-toggle").mouseup(function(){
		var navbar = $("ul.navbar-nav.autosize");
		navbar.children("li").show();
	});

	
	if (html.hasClass("calc"))
		initCalc();

	 
	window.setTimeout(function(){
		$(".alert").each(function(){
			var d = $(this);
			if (!d.hasClass("permanent"))
				d.fadeOut();
		});
	}, 5000);  
	
	try {
		var update = new Update();
		update.init(); 
	} catch (e) {
	}
	
	
	try {
		$(window).resize( func_resize );
		func_resize();
	} catch (e) {
		sendErrorReport("resize.init:", e);
	}
	
	/*
	try {
		
		var securelogin = $("#securelogin");
		if (securelogin.length>0) {
			var form = securelogin.parents("form:first");
			securelogin.click(function(){
			
				var action = form.attr("action");
				action = action.substring(action.indexOf(":"));
				if (securelogin.is(':checked')) {
					action = "https"+action;
				} else {
					action = "http"+action;
				}
				 form.attr("action", action)
				
			});
			
		}
		 
	}catch (e) {
		
	}
	*/
	
	/*
	try {
	
		var carouselquestions = $('#carouselquestions');
		if (carouselquestions.length>0) {
		
			carouselquestions.carousel({
				pause: false,
				interval: 8000
			});
			carouselquestions.mousemove(function(){
				carouselquestions.carousel('pause');
			});
			window.setTimeout(function(){
				carouselquestions.carousel('pause');
			}, 50000);
		}
	} catch (e) {}
	*/


	tryÂ {
	
	
		var captchabox = $(".captchabox");
		
		var check = captchabox.find("span.checkbox");
		check.click(function(){
			
			check.find(".glyphicon").fadeIn();
			 	
			var hash = function(str) {
			    for (var i = 0, len = str.length, s1 = 1, s2 = 0; i < len; i++) {
			        s1 = (s1 + str.charCodeAt(i)) % 65521;
			        s2 = (s2 + s1) % 65521;
		    		}
			    return (s2 << 16) + s1;
			}
			
			var pow = function(str) {
				var i = 0;
				while (true) {
					var rnd = Math.random().toString(36).substr(2, 5)+Math.random().toString(36).substr(2, 5)+i;
					var h = hash( rnd+str );
					if ((h & 0xff) == 0x23) 
						return rnd;
						
					i++;
				}
			}
			
			if ($(".challengerequest").length>0 && $(".challengeresponse").length>0) {
				var request = $(".challengerequest").val();
				$(".challengeresponse").val( pow(request) );
			}
				
		});
	
		
		var btns = $("button.g-recaptcha");
		btns.click(function(event){
		
			var btn = $(this);
			try{
				if (btn.data("callback")) {
					window[ btn.data("callback") ]();
				}
			} catch (e){}
	
		});
				
	
	} catch (e) {}
	
	
	 
	try {
	
		$("#cookieconsentform").each(function(){
			var form = $(this);
			form.find("button").each(function(){
				var button = $(this);
				button.click(function(event){
				
					button.html("<img src=\"/img/loading.gif\" alt=\"loading..\" />");
			
				 	$.ajax({
	                 url: "/cookieconsent",
	                 dataType: 'json',
	                 data: {"cookies":button.attr("value")},
	                 async: false,
	                 type: 'GET',
	                 
	                 success: function (json) {
	            
						if (button.attr("value")=="yes" && $("html").hasClass("calc")) {
							//$(".vectorizer").hide();
							//$.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
						} else {
						
						
							event.stopPropagation();
							event.preventDefault();
						}
						
						form.parents(".alert:first").fadeOut();
						
				     
	                 }
	                });
	                 
				
				});
			});
		});
	
	} catch (e) {}
	 
	
	
	try {
		func_resize();
		
		window.addEventListener('load', function(){
		  func_resize();
		});
		
	} catch (e) {
		sendErrorReport("resize.init:", e);
	}
	
	
	
	try {
		
		$("input.optional").each(function(){
			var inp =  $(this);
			inp.prop( "checked", false );
		});
		
		$("input.optional").change(function(){
			if ($(this).is(":checked"))
			$(this).addClass("userselected");
			else
			$(this).removeClass("userselected");
		});
		
		$("#cookieconsentallowselected").mousemove(function(){
			$("input.optional").each(function(){
				var inp =  $(this);
				if (!inp.hasClass('userselected'))
					inp.prop( "checked", false );
			});
			
			
		});
		
		$("#cookieconsentallowall").mousemove(function(){
			$("input.optional").prop( "checked", true );
			
			
		});
		
		$("#cookieconsentallowall").mouseleave(function(){
			$("input.optional").each(function(){
				var inp =  $(this);
				if (!inp.hasClass('userselected'))
					inp.prop( "checked", false );
			});
		});
		
		$("#consentcheckboxads").change( function(){
			if($("#consentcheckboxads").is(':checked')) {
				$("#consentnoads").hide();
				$("#consentads").show();
			} else {
				$("#consentads").hide();
				$("#consentnoads").show();
			}
		} );


		$("#cookieconsentmodal .close").click(function(){
			$("#cookieconsentmodal").fadeOut();
		});
		
		
		$("#age16orolder").change(function(){
		
			if($("#age16orolder").is(':checked')) {
				$("#cookieconsentmodal span.personalized").show();
			} else {
				$("#cookieconsentmodal span.personalized").hide();
			}
		
		});
		
		/*
		$("#cookieconsentsettings").click(function(){
			$(this).hide();
			$(".nocookiesettings").hide();
			$(".cookiesettings").show();
			$("#consentads").hide();
			$("#consentnoads").show();
		});
		*/
		
	} catch (e){}
	

	try {
		var adblockmodal = $("#abmodal");
		if (adblockmodal.length>0) {
			window.setInterval(function() {
				if (hasBlocker()==false) {
					adblockmodal.modal("hide");
					adblockmodal.removeClass("show");
				} else {
				
					if (window.location.href.indexOf("checkadblock")>0) {
						
						if (adblockmodal.hasClass("show")==false) {
							adblockmodal.find("img.ayblock").attr("src", "/img/block2.jpg");
							adblockmodal.find(".modal-footer").fadeIn();
						}
						adblockmodal.modal("show");
						adblockmodal.addClass("show");
					
					}
				}
				
			},500 );
			
			 
			
		}
	} catch (e){}	
	
	/*
	try {
	
		var donationmodal = $("#donationmodal");
		if (donationmodal.length>0) {
			donationmodal.modal("show");
		}
	
	} catch (e){}
	*/
	
	
	
	
	/*
	try {
	
		var cookieconsentmodal = $("#cookieconsentmodal");
		if (cookieconsentmodal.length>0) {
		
			$("#calccontainer .center .btn, #calccontainer .center button").bind("click mousedown mouseup", function(event){
			
				event.stopPropagation();
				event.preventDefault();
				cookieconsentmodal.modal('show');
				
				window.setTimeout(function(){
			
					var heights = {};
					$(".sameheight").each(function(){
						var div = $(this);
						if (heights[div.data("height")]) {
							if (div.outerHeight()>parseInt(heights[div.data("height")]))
								heights[div.data("height")] = div.outerHeight();
						} else {
							heights[div.data("height")] = div.outerHeight();
						}
					});
					$(".sameheight").each(function(){
						var div = $(this);
						$(this).css("min-height",heights[div.data("height")]);
					});
				}, 1000);	
					
				
			});
			 
			
			$("#calccontainer input").addClass("disabled");
			
			$("#calccontainer input").click(function(event){
				event.stopPropagation();
				event.preventDefault();
				cookieconsentmodal.modal('show');
			});
			
			
			$(".cookieinfobtn").click(function(){
				$(".cookieinfobtn").hide();
				$(".cookieinfo").fadeIn();
			});
			
		
			
	
			
		}	
	
	} catch (e) {}
	*/
	
	
	var endtime = new Date();
	var timediff = (endtime.getTime() - starttime.getTime());
	
	//console.log((timediff)+"ms");

	
});





 
if ( !jQuery.browser ) {
	
	
	jQuery.uaMatch = function( ua ) {
		ua = ua.toLowerCase();

		var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
			/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
			/(msie) ([\w.]+)/.exec( ua ) ||
			ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
			[];

		return {
			browser: match[ 1 ] || "",
			version: match[ 2 ] || "0"
		};
	};
	
	matched = jQuery.uaMatch( navigator.userAgent );
	browser = {};

	if ( matched.browser ) {
		browser[ matched.browser ] = true;
		browser.version = matched.version;
	}
 
	if ( browser.chrome ) {
		browser.webkit = true;
	} else if ( browser.webkit ) {
		browser.safari = true;
	}

	jQuery.browser = browser;
}
