const VIEWABLE_EXTENSIONS = [
	'SVG'
];

const IMAGE_EXTENSIONS = [
	'JPEG', 'JPG', 'BMP', 'GIF', 'PNG', 'TIFF', 'TIF'
];


// filedrop component
var fileDrop = {};
var fileDrop2 = {};

$.extend($.expr[':'], {
	isEmpty: function (e) {
		return e.value === '';
	}
});

// Restricts input for the set of matched elements to the given inputFilter function.
(function ($) {
	$.fn.inputFilter = function (inputFilter) {
		return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
			if (inputFilter(this.value)) {
				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			} else if (this.hasOwnProperty("oldValue")) {
				this.value = this.oldValue;
				this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			} else {
				this.value = "";
			}
		});
	};
}(jQuery));

function showLoader() {
	$('.progress > .progress-bar').html('15%');
	$('.progress > .progress-bar').css('width', '15%');
	$('#loader').removeClass("hidden");

	$('#uploadButton').addClass("disabled");
	hideAlert();
}

function hideLoader() {
	$('#loader').addClass("hidden");

	$('#uploadButton').removeClass("disabled");
}

function generateViewerLink(data) {
	var id = data.FolderName !== undefined ? data.FolderName : data.id;
	return encodeURI(o.ViewerPathWF + id + '/' + data.FileName);
	//'FileName=' +
	//data.FileName +
	//'&FolderName=' +
	//id +
	//'&CallbackURL=' +
	//o.AppURL);
}

function generateEditorLink(data) {
	var id = data.FolderName !== undefined ? data.FolderName : data.id;
	return encodeURI(o.EditorPath +
		'FileName=' +
		data.FileName +
		'&FolderName=' +
		id +
		'&CallbackURL=' +
		o.AppURL);
}

function sendPageView(url) {
	if ('ga' in window)
		try {
			var tracker = ga.getAll()[0];
			if (tracker !== undefined) {
				tracker.send('pageview', url);
			}
		} catch (e) {
			/**/
		}
}

function workSuccess(data, textStatus, xhr) {
	hideLoader();

	if (data.StatusCode === 200) {
		if (data.FileProcessingErrorCode !== undefined && data.FileProcessingErrorCode !== 0) {
			showAlert(o.FileProcessingErrorCodes[data.FileProcessingErrorCode]);
			return;
		}

		$('#WorkPlaceHolder').addClass('hidden');
		$('.appfeaturesectionlist').addClass('hidden');
		$('.howtolist').addClass('hidden');
		$('.app-features-section').addClass('hidden');
		$('.app-product-section').addClass('hidden');
		$('.app-product-overview').addClass('hidden');
		$('.app-product-overview-menu').addClass('hidden');
		$('.appvideo').addClass('hidden');

		$('#DownloadPlaceHolder').removeClass('hidden');
		$('#OtherApps').removeClass('hidden');

		$('#dvNaviBar').addClass('hidden');
		$('#dvVideoSection').addClass('hidden');
		$('#dvOverview').addClass('hidden');

		if (o.ReturnFromViewer === undefined) {
			const pos = o.AppDownloadURL.indexOf('?');
			const url = pos === -1 ? o.AppDownloadURL : o.AppDownloadURL.substring(0, pos);
			sendPageView(url);
		}

		var url = encodeURI(o.APIBasePath + `Common/DownloadFile/${data.FolderName}?file=${data.FileName}`);
		$('#DownloadButton').attr('href', url);
		o.DownloadUrl = url;

		if (o.ShowViewerButton) {
			let viewerlink = $('#ViewerLink');
			let dotPos = data.FileName.lastIndexOf('.');
			let ext = dotPos >= 0 ? data.FileName.substring(dotPos + 1).toUpperCase() : null;
			if (ext !== null && viewerlink.length && VIEWABLE_EXTENSIONS.indexOf(ext) !== -1) {
				viewerlink.on('click', function (evt) {
					evt.preventDefault();
					evt.stopPropagation();
					openIframe(generateViewerLink(data), '/html/viewer', '/html/view');
				});
			}
			else {
				viewerlink.hide();
				$(viewerlink[0].parentNode.previousElementSibling).hide(); // div.clearfix
			}
		}
	} else {
		showAlert(data.Status);
	}
}

function sendEmail() {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var email = $('#EmailToInput').val();
	if (!email || !re.test(String(email).toLowerCase())) {
		window.alert('Please specify the valid email address!');
		return;
	}

	var data = {
		appname: o.AppName,
		email: email,
		url: o.DownloadUrl,
		title: $('#ProductTitle')[0].innerText
	};

	$('#sendEmailModal').modal('hide');
	$('#sendEmailButton').addClass('hidden');

	$.ajax({
		method: 'POST',
		url: '/svg/sendemail',
		data: data,
		dataType: 'json',
		success: (data) => {
			showMessage(data.message);
		},
		complete: () => {
			$('#sendEmailButton').removeClass('hidden');
			hideLoader();
		},
		error: (data) => {
			showAlert(data.responseJSON.message);
		}
	});
}

function sendFeedback(text) {
	var msg = (typeof text === 'string' ? text : $('#feedbackText').val());
	if (!msg || msg.match(/^\s+$/) || msg.length > 1000) {
		return;
	}

	var data = {
		appname: o.AppName,
		text: msg
	};

	if (!text) {
		if ('ga' in window) {
			try {
				var tracker = window.ga.getAll()[0];
				if (tracker !== undefined) {
					tracker.send('event', {
						'eventCategory': 'Social',
						'eventAction': 'feedback-in-download'
					});
				}
			} catch (e) { }
		}
	}

	$.ajax({
		method: "POST",
		url: '/svg/sendfeedback',
		data: data,
		dataType: "json",
		success: (data) => {
			showMessage(data.message);
			$('#feedback').hide();
		},
		error: (data) => {
			showAlert(data.responseJSON.message);
		}
	});
}

function hideAlert() {
	$('#alertMessage').addClass("hidden");
	$('#alertMessage').text("");
	$('#alertSuccess').addClass("hidden");
	$('#alertSuccess').text("");
}

function showAlert(msg) {
	hideLoader();
	$('#alertMessage').html(msg);
	$('#alertMessage').removeClass("hidden");
	$('#alertMessage').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function showMessage(msg) {
	hideLoader();
	$('#alertSuccess').text(msg);
	$('#alertSuccess').removeClass("hidden");
}

(function ($) {
	$.QueryString = (function (paramsArray) {
		let params = {};

		for (let i = 0; i < paramsArray.length; ++i) {
			let param = paramsArray[i]
				.split('=', 2);

			if (param.length !== 2)
				continue;

			params[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
		}

		return params;
	})(window.location.search.substr(1).split('&'))
})(jQuery);

function progress(evt) {
	if (evt.lengthComputable) {
		var max = evt.total;
		var current = evt.loaded;

		var percentage = Math.round((current * 100) / max);
		percentage = (percentage < 15 ? 15 : percentage) + '%';

		$('.progress > .progress-bar').html(percentage);
		$('.progress > .progress-bar').css('width', percentage);
	}
}

function removeAllFileBlocks() {
	fileDrop.droppedFiles.forEach(function (item) {
		$('#fileupload-' + item.id).remove();
	});
	fileDrop.droppedFiles = [];
	hideLoader();
}

function openIframe(url, fakeUrl, pageViewUrl) {
	// push fake state to prevent from going back
	window.history.pushState(null, null, fakeUrl);

	// remove body scrollbar
	$('body').css('overflow-y', 'hidden');

	// create iframe and add it into body
	var div = $('<div id="iframe-wrap"></div>');
	$('<iframe>', {
		src: url,
		id: 'iframe-document',
		frameborder: 0,
		scrolling: 'yes'
	}).appendTo(div);
	div.appendTo('body');
	sendPageView(pageViewUrl);
}

function closeIframe() {
	removeAllFileBlocks();
	$('div#iframe-wrap').remove();
	$('body').css('overflow-y', 'auto');
}


function request(url, data) {
	showLoader();
	$.ajax({
		method: 'POST',
		url: url,
		data: data,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 600000,
		success: workSuccess,
		xhr: function () {
			var myXhr = $.ajaxSettings.xhr();
			if (myXhr.upload)
				myXhr.upload.addEventListener('progress', progress, false);
			return myXhr;
		},
		error: function (err) {
			if (err.data !== undefined && err.data.Status !== undefined)
				showAlert(err.data.Status);
			else
				showAlert("Error " + err.status + ": " + err.statusText);
		}
	});
}

//function requestMerger() {
//	let data = fileDrop.prepareFormData(2, o.MaximumUploadFiles);
//	if (data === null)
//		return;

//	let url = o.APIBasePath + 'AsposePdfMerger/Merge';
//	request(url, data);
//}

//function requestParser() {
//	let data = fileDrop.prepareFormData();
//	if (data === null)
//		return;

//	let url = o.APIBasePath + 'AsposePdfParser/Parse';
//	request(url, data);
//}

function AssignBtnToText_ExtraConvertion_PageSize(obj) {
	var t = $(obj).text();
	var id = $(obj)[0].id;

	$("#selectPageSize").html(t);
	$("#pgsize").val(id);

	if (t == "Custom") {
		document.getElementById("JPG_PNG_to_SVG_Settings").style.display = "block";
	}
	else {
		document.getElementById("JPG_PNG_to_SVG_Settings").style.display = "none";
	}
}


function AssignBtnToText_SaveAs(obj) {
	var t = $(obj).text();

	$("#btnSaveAs").html(t);
	$("#format").val(t);
}

function AssignBtnToText_PageSize(obj) {
	var t = $(obj).text();
	var id = $(obj)[0].id;

	$("#selectPageSize").html(t);
	$("#pgsize").val(id);
}

function AssignBtnToText_MdTheme(obj) {
	var t = $(obj).text();
	var id = $(obj)[0].id;

	$("#selectMdTheme").html(t);
	$("#mdtheme").val(id);
}

function AssignBtnToText_StackingSvg(obj) {
	var t = $(obj).text();
	var id = $(obj)[0].id;

	$("#stackingsvgView").html(t);
	$("#stackingsvg").val(id);
}

function requestConversion() {
	let data = fileDrop.prepareFormData();
	if (data === null)
		return;

	let inputType = getInputType('conversion');
	let outType = $('#btnSaveAs').text();
	let url = o.APIBasePath + 'AsposeSVGConversion/Convert?inputType=' + inputType + '&outputType=' + outType;

	if (['PDF', 'XPS', 'TIF', 'TIFF'].indexOf(outType) !== -1) {
		let mergeMult = 'false';
		var r;
		if ((r = $('#cbMergeOption').prop('checked')) !== undefined) {
			mergeMult = r.toString();
			url += '&mergeMultiple=' + mergeMult;
		}
	}

	if (outType === 'PDF') {
		var userPw = $('#txtUserPassword').val();
		var ownerPw = $('#txtOwnerPassword').val();
		if (userPw !== undefined) {
			url += '&userPassword=' + userPw;
		}
		if (ownerPw !== undefined) {
			url += '&ownerPassword=' + ownerPw;
		}
	}

	if (IMAGE_EXTENSIONS.indexOf(outType) !== -1 || outType === 'XPS') {
		var psz = $('#pgsize').val();
		if (psz !== undefined) {
			url += '&pageSize=' + psz;
		}
		if (outType !== 'XPS') {
			var bgColor = $('#favcolor').val();
			if (bgColor !== undefined) {
				url += '&bgColor=' + bgColor.replace('#', '');
			}
		}
	}

	if (outType === 'SVG') {
		var svg_size = document.getElementById("pgsize").value;

		if (svg_size !== undefined) {
			url += '&svgSize=' + svg_size;
		}

		switch (svg_size) {
			case 'original':
			case 'a4':
			case 'custom':
                var svg_width = $('#set_svg_width').val();
		        var svg_height = $('#set_svg_height').val();
		        url += '&svgWidth=' + svg_width + '&svgHeight=' + svg_height;
				break;
			default:				
		}
		
	}
	request(url, data);
}


function requestMerger() {
	let data = fileDrop.prepareFormData();
	if (data === null)
		return;

	let inputType = getInputType('merger');
	let outType = $('#btnSaveAs').text();
	let url = o.APIBasePath + 'AsposeSVGMerger/Merge?inputType=' + inputType + '&outputType=' + outType;

	var r, sep;
	if ((r = $('#cb_svg_merge_separator').prop('checked')) !== undefined) {
		sep = r.toString();
		url += '&separator=' + sep;
	}

	var stackingSvg = $('#stackingsvg').val();
	if (stackingSvg !== undefined && "v" == stackingSvg) {
		url += '&append=vertical';
	} else {
		url += '&append=horizontal';
	}

	request(url, data);
}

//function requestMetadata(data) {
//	let url = o.APIBasePath + 'AsposePdfMetadata/properties';

//	$.ajax({
//		method: 'POST',
//		url: url,
//		data: JSON.stringify(data),
//		contentType: 'application/json',
//		cache: false,
//		timeout: 600000,
//		success: (d) => {
//			$.metadata(d, data.id, data.FileName);
//		},
//		error: (err) => {
//			if (err.data !== undefined && err.data.Status !== undefined)
//				showAlert(err.data.Status);
//			else
//				showAlert("Error " + err.status + ": " + err.statusText);
//		}
//	});
//}

//function requestRedaction() {
//	if (!validateSearch())
//		return;

//	let data = fileDrop.prepareFormData();
//	if (data === null)
//		return;

//	let url = o.APIBasePath + 'AsposePdfRedaction/Redact?'+
//		'searchQuery=' + encodeURI($('#searchQuery').val()) +
//		'&replaceText=' + encodeURI($('#replaceText').val()) + 
//		'&caseSensitive=' + $('#caseSensitive').prop('checked') + 
//		'&text=' + $('#text').prop('checked') + 
//		'&comments=' + $('#comments').prop('checked') + 
//		'&metadata=' + $('#metadata').prop('checked');
//	request(url, data);
//}

//function requestViewer(data) {
//	var url = generateViewerLink(data);
//	openIframe(url, '/pdf/viewer', '/pdf/view');
//}

//function requestEditor(data) {
//	var url = generateEditorLink(data);
//	openIframe(url, '/pdf/editor', '/pdf/edit');
//}

function prepareDownloadUrl() {
	o.AppDownloadURL = o.AppURL;
	var pos = o.AppDownloadURL.indexOf(':');
	if (pos > 0)
		o.AppDownloadURL = (pos > 0 ? o.AppDownloadURL.substring(pos + 3) : o.AppURL) + '/download';
	pos = o.AppDownloadURL.indexOf('/');
	o.AppDownloadURL = o.AppDownloadURL.substring(pos);
}

function checkReturnFromViewer() {
	var query = window.location.search;
	if (query.length > 0) {
		o.ReturnFromViewer = true;
		var data = {
			StatusCode: 200,
			FolderName: $.QueryString['id'],
			FileName: $.QueryString['FileName'],
			FileProcessingErrorCode: 0
		};
		var beforeQueryString = window.location.href.split("?")[0];
		window.history.pushState({}, document.title, beforeQueryString);

		if (!o.UploadAndRedirect)
			workSuccess(data);
	}
}

function shareApp(type) {
	if (['facebook', 'twitter', 'linkedin', 'cloud', 'feedback', 'otherapp', 'bookmark'].indexOf(type) !== -1) {
		var gaEvent = function (action, category) {
			if (!category) {
				category = 'Social';
			}
			if ('ga' in window) {
				try {
					var tracker = window.ga.getAll()[0];
					if (tracker !== undefined) {
						tracker.send('event', {
							'eventCategory': category,
							'eventAction': action
						});
					}
				} catch (err) { }
			}
		};
		var appPath = window.location.pathname.split('/');
		var appURL = 'https://' + window.location.hostname + '/svg/' + appPath[2];
		var title = document.title.replace('&', 'and');
		// Google Analytics event
		gaEvent(type.charAt(0).toUpperCase() + type.slice(1));

		// perform an action
		switch (type) {
			case 'facebook':
				var a = document.createElement('a');
				a.href = 'https://www.facebook.com/sharer/sharer.php?u=#' + encodeURI(appURL);
				a.setAttribute('target', '_blank');
				a.click();
				break;
			case 'twitter':
				var a = document.createElement('a');
				a.href = 'https://twitter.com/intent/tweet?text=' + encodeURI(title) + '&url=' + encodeURI(appURL);
				a.setAttribute('target', '_blank');
				a.click();
				break;
			case 'linkedin':
				var a = document.createElement('a');
				a.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURI(appURL);
				a.setAttribute('target', '_blank');
				a.click();
				break;
			case 'feedback':
				$('#feedbackModal').modal({
					keyboard: true
				});
				break;
			case 'otherapp':
				document.location.href = 'https://products.aspose.app/svg/family';
				break;
			case 'bookmark':
				$('#bookmarkModal').modal({
					keyboard: true
				});
				break;
			case 'cloud':
				var e = e || window.event;
				e = e.target || e.srcElement;
				if (e.tagName !== "A") {
					var a = document.createElement('a');
					a.href = 'https://products.aspose.cloud/svg/family';
					a.setAttribute('target', '_blank');
					a.click();
				}
				break;
			default:
			// nothing
		}
	}
}

function sendFeedbackExtended() {
	var text = $('#feedbackBody').val();
	if (text && !text.match(/^.s+$/)) {
		$('#feedbackModal').modal('hide');
		sendFeedback(text);
	}
}

function otherAppClick(name, left = false) {
	if ('ga' in window) {
		try {
			var tracker = window.ga.getAll()[0];
			if (tracker !== undefined) {
				tracker.send('event', {
					'eventCategory': 'Other App Click' + (left ? ' Left' : ''),
					'eventAction': name
				});
			}
		} catch (e) { }
	}
}

function getInputType(app) {
	var defaultType = 'svg';
	var pathUrl = window.location.pathname.toLowerCase();
	var conversionPos = pathUrl.indexOf(app);
	if (conversionPos < 0) {
		return defaultType;
	}
	var conv = pathUrl.substring(conversionPos + app.length + 1);
	if (conv.length === 0) {
		return defaultType;
	}
	var arr = conv.split('-');
	console.log(arr[0]);
	return arr[0];
}

//========================= Functions SVG Photo Filters Effects =================

var photoEffectResponse = "";
var curentFilterName = "";
var isLoading = false;

function Apply_Photo_Effect(filter_name) {
	if (isLoading == true) {
		return;
	}

	curentFilterName = filter_name;
	if (photoEffectResponse == "") {
		photoEffectResponse.SourceId = "";
		photoEffectResponse.PreviewId = "";
	}
	let url = o.APIBasePath + 'AsposeSVGPhotoFilterEffects/ApplyPhotoEffect?sourceId=' + photoEffectResponse.SourceId + '&previewId=' + photoEffectResponse.PreviewId + '&outputType=' + 'PNG' + '&filterName=' + filter_name;

	ShowLoaderPhotoEffect();
	isLoading = true;
	$.ajax({
		method: "POST",
		url: url,
		headers: {
			"FilterName": filter_name,
			"Preview": true,
		},
		success: function (data_response) {
            photoEffectResponse = data_response;
			UploadPreviewImage(photoEffectResponse);
			isLoading = false;
		},
		error: (result) => {
			alert("bad partial_photo_effects_editor");
			isLoading = false;
		}
	});
}

function DowloadImageFile() {
	if (isLoading == true) {
		return;
	}

	var save_as = $('#btnSaveAs').text();

	if (photoEffectResponse.SourceId == undefined) {
		return;
	}

	let url = o.APIBasePath + 'AsposeSVGPhotoFilterEffects/ApplyPhotoEffect?sourceId=' + photoEffectResponse.SourceId + '&previewId=' + photoEffectResponse.PreviewId + '&outputType=' + save_as + '&filterName=' + curentFilterName;

	ShowLoaderDownload();
	$('#dowloadImage').addClass("disabled");
	isLoading = true;
	$.ajax({
		method: "POST",
		url: url,
		headers: {
			"FilterName": curentFilterName,
			"Preview": false,
		},
		processData: false,
		contentType: false,
		cache: false,
		timeout: 600000,
		success: function (data_response) {
			TransitionToDowloadPage(data_response);
		},
		error: (result) => {
			alert("bad download");
			isLoading = false;
		}
	});
}

function TransitionToDowloadPage(data_response) {

	HidenLoaderDownload();
	isLoading = false;

	if (data_response.StatusCode === 200) {
		if (data_response.FileProcessingErrorCode !== undefined && data_response.FileProcessingErrorCode !== 0) {
			showAlert(o.FileProcessingErrorCodes[data_response.FileProcessingErrorCode]);
			return;
		}

		$('#WorkPlaceHolder').addClass('hidden');
		$('.appfeaturesectionlist').addClass('hidden');
		$('.howtolist').addClass('hidden');
		$('.app-features-section').addClass('hidden');
		$('.app-product-section').addClass('hidden');
		$('.app-product-overview').addClass('hidden');
		$('.app-product-overview-menu').addClass('hidden');
		$('.appvideo').addClass('hidden');

		$('#DownloadPlaceHolder').removeClass('hidden');
		$('#OtherApps').removeClass('hidden');

		$('#dvNaviBar').addClass('hidden');
		$('#dvVideoSection').addClass('hidden');
		$('#dvOverview').addClass('hidden');

		if (o.ReturnFromViewer === undefined) {
			const pos = o.AppDownloadURL.indexOf('?');
			const url = pos === -1 ? o.AppDownloadURL : o.AppDownloadURL.substring(0, pos);
			sendPageView(url);
		}

		var url = encodeURI(o.APIBasePath + 'Common/DownloadFile/' + data_response.FolderName + '?file=' + data_response.FileName);
		$('#DownloadButton').attr('href', url);
		o.DownloadUrl = url;

		if (o.ShowViewerButton) {
			let viewerlink = $('#ViewerLink');
			let dotPos = data.FileName.lastIndexOf('.');
			let ext = dotPos >= 0 ? data.FileName.substring(dotPos + 1).toUpperCase() : null;
			if (ext !== null && viewerlink.length && VIEWABLE_EXTENSIONS.indexOf(ext) !== -1) {
				viewerlink.on('click', function (evt) {
					evt.preventDefault();
					evt.stopPropagation();
					openIframe(generateViewerLink(data), '/html/viewer', '/html/view');
				});
			}
			else {
				viewerlink.hide();
				$(viewerlink[0].parentNode.previousElementSibling).hide(); // div.clearfix
			}
		}
	} else {
		showAlert(data.Status);
	}
}


function RequestPhotoFilterEffects(data) {
	if (isLoading == true) {
		return;
	}
	let url = o.APIBasePath + 'AsposeSVGPhotoFilterEffects/UploadUserFile';

	ShowLoaderPhotoEffect();
	isLoading = true;
	$.ajax({
		method: 'POST',
		url: url,
		data: data,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 600000,
		success: function (data_response) {
            photoEffectResponse = data_response;
			UploadPreviewImage(photoEffectResponse);			
		},		
		error: function (err) {
			isLoading = false;
			HideLoaderPhotoEfferct();
			if (err.data !== undefined && err.data.Status !== undefined)
				showAlert(err.data.Status);
			else
				showAlert("Error " + err.status + ": " + err.statusText);
		}
	});

}



function UploadPreviewImage(path) {
	var url = encodeURI(o.APIBasePath + 'AsposeSVGPhotoFilterEffects/GetPreview?folder=' + path.FolderName + '&file=' + path.FileName);
    $("#preview_img").attr('src', url);
	isLoading = false;
	HideLoaderPhotoEfferct();
}


function image(data) {
	$("#preview_img").attr('src', 'data:image/png;base64,' + data);
	HideLoaderPhotoEfferct();
}


$(document.body).on('change', '#DropFile', function () {
	var file = document.getElementById("UploadFileInput").files[0];
	if (file == undefined) {
		return;
	}
	var formData = new FormData();
	formData.append('UploadFileInput', file);	
	RequestPhotoFilterEffects(formData);
});

function loadimage(e1) {
	var fr = new FileReader();
	fr.onload = imageHandler;
	fr.readAsDataURL(e1);
}

function imageHandler(e2) {	
	var store = document.getElementById('imgstore');
	store.innerHTML = '<img id="test_img" src="' + e2.target.result + '">';
}

function ShowLoaderPhotoEffect() {	
	$('#Image_loader').removeClass("hidden");
	$('#dowloadImage').addClass("disabled");
	document.getElementById("UploadFileInput").disabled = true;
	hideAlert();
}

function HideLoaderPhotoEfferct() {
	$('#Image_loader').addClass("hidden");
	$('#dowloadImage').removeClass("disabled");
	document.getElementById("UploadFileInput").disabled = false;
}

function ShowLoaderDownload() {
	$('#download_image').removeClass("hidden");	
	hideAlert();
}

function HidenLoaderDownload() {
	$('#download_image').addClass("hidden");
}

//========================= End functions SVG Photo Filters Effects =============

$(document).ready(function () {
	prepareDownloadUrl();
	checkReturnFromViewer();

	fileDrop = $('form#UploadFile').filedrop(Object.assign({
		showAlert: showAlert,
		hideAlert: hideAlert,
		showLoader: showLoader,
		progress: progress
	}, o));

	if (o.AppName === "Comparison") {
		fileDrop2 = $('form#UploadFile').filedrop(Object.assign({
			showAlert: showAlert,
			hideAlert: hideAlert,
			showLoader: showLoader,
			progress: progress
		}, o));
	}

	// close iframe if it was opened
	window.onpopstate = function (event) {
		if ($('div#iframe-wrap').length > 0) {
			closeIframe();
		}
	};

	if (!o.UploadAndRedirect) {
		$('#uploadButton').on('click', o.Method);
	}

	// social network modal
	$('#bookmarkModal').on('show.bs.modal', function (e) {
		$('#bookmarkModal').css('display', 'flex');
		$('#bookmarkModal').on('keydown', function (evt) {
			if ((evt.metaKey || evt.ctrlKey) && String.fromCharCode(evt.which).toLowerCase() === 'd') {
				$('#bookmarkModal').modal('hide');
			}
		});
	});
	$('#bookmarkModal').on('hidden.bs.modal', function (e) {
		$('#bookmarkModal').off('keydown');
	});

	// send email modal
	$('#sendEmailButton').on('click', function () {
		$('#sendEmailModal').modal({
			keyboard: true
		});
	});
	$('#sendEmailModal').on('show.bs.modal', function () {
		$('#sendEmailModal').css('display', 'flex');
	});
	$('#sendEmailModal').on('shown.bs.modal', function () {
		$('#EmailToInput').focus();
	});

	// send feedback modal
	$('#feedbackModal').on('show.bs.modal', function (e) {
		$('#feedbackModal').css('display', 'flex');
	});
	$('#feedbackModal').on('shown.bs.modal', function () {
		$('#feedbackBody').focus();
	});

	$('#sendFeedbackBtn').on('click', sendFeedback);
});
