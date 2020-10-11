// File Upload Component
// options:
// - DropFilesPrompt (string)
// - ChooseFilePrompt (string)
// - Accept (string)
// - Multiple (boolean)
// - UseSorting (boolean)
// - ShowButtonBar (boolean)
// - MaximumUploadFiles (number)
// - FileWrongTypeMessage (string)
// - FileAmountMessage (string)
// - FileSelectMessage (string)
// - UploadOptions (array of sting) e.g ['DOCX', 'DOC', ...]
// - ApiBasePath (string)
// - Method (callback)
// - UploadAndRedirect (boolean)
// - showAlert (function (string) => void)
// - hideAlert (function () => void)
// - showLoader (function () => void)
// - progress (function () => void)


(function ($) {
	$.fn.filedrop = function (options) {
		var getRandomIntInclusive = function (min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		var randomId = getRandomIntInclusive(1, Number.MAX_SAFE_INTEGER);
		window.randomId_drop = randomId;
		var acceptExts = options.Accept.split(/\s*,\s*/).map(function (ext) {
			return ext.substring(1).toUpperCase();
		});

		var droppedFiles = [];

		var getFileExtension = function (file) {
			var pos = file.name.lastIndexOf('.');
			return pos !== -1 ? file.name.substring(pos + 1).toUpperCase() : null;
		};

		var nextFileId = function () {
			var id = 1;
			var found;
			do {
				found = false;
				for (let i = 0; i < droppedFiles.length; i++) {
					if (droppedFiles[i].id === id) {
						id += 1;
						found = true;
						break;
					}
				}
			} while (found);
			return id;
		};

		var preventFileDrop = function (evt) {
			evt = evt || event;
			evt.preventDefault();
			evt.stopPropagation();
		};

		var getPositionById = function (id) {
			var pos;
			for (pos = 0; pos < droppedFiles.length; pos++) {
				if (droppedFiles[pos].id === id) {
					return pos;
				}
			}
			return pos;
		}

		function isValidUrl(string) {
			try {
				new URL(string);
			} catch (_) {
				return false;
			}

			return true;
		}

		var showEditUrlBlock = function (id) {
			var pos = getPositionById(id);
			if (pos < droppedFiles.length) {
				var fileUploadContainer = $('#filedrop-' + randomId).find('#fileupload-' + id);

				fileUploadContainer.addClass('hidden');

				var fileBlock = $('<div id="filedrop-edit-url-' + id + '" class="fileupload file-upload-input-container"></div>');

				var spanFileName = $('\
				<span class="filename">\
				    <input type="text" class="form-control externalUrlInput" name="externalUrlEdit" placeholder="Enter file URL">\
				</span>');

				spanFileName.find('input').val(droppedFiles[pos].name);

				var fileLinkHolder = $('\
				<span class="fileLinkHolder">\
				</span>');

				var applyUrlBtn = $('\
                    <a>\
                        <i class="fa fa-check"></i>\
                    </a>');
				applyUrlBtn.find('i').on('click',
					function () {
						var urlEditContainer = $('#filedrop-' + randomId).find('#filedrop-edit-url-' + id);
						var newURL = urlEditContainer.find('.externalUrlInput').val();

						if (!isValidUrl(newURL)) {
							urlEditContainer.find('.externalUrlInput').addClass('externalUrlInputError');
							return;
						}

						fileUploadContainer.find('.custom-file-upload').text(newURL);

						var file = { name: newURL, isUrl: true };
						droppedFiles.splice(pos,
							1,
							{
								id,
								file,
								name: newURL,
								isUrl: file.isUrl
							});

						fileUploadContainer.removeClass('hidden');
						urlEditContainer.remove();
					});
				fileLinkHolder.append(applyUrlBtn);

				var cancelUrlBtn = $('\
                    <a>\
                        <i class="fa fa-times"></i>\
                    </a>');
				cancelUrlBtn.find('i').on('click',
					function () {
						fileUploadContainer.removeClass('hidden');
						$('#filedrop-' + randomId).find('#filedrop-edit-url-' + id).remove();
					});
				fileLinkHolder.append(cancelUrlBtn);

				spanFileName.append(fileLinkHolder);
				fileBlock.on('dragover', preventFileDrop);
				fileBlock.on('drop', preventFileDrop);
				fileBlock.append(spanFileName);

				$(fileBlock).insertBefore(fileUploadContainer);
				spanFileName.find('input').focus();

				spanFileName.find('input').keydown(function (e) {
					if (e.keyCode == 13) {
						e.preventDefault();
						applyUrlBtn.find('i').trigger('click');
					} else if (e.keyCode == 27) {
						cancelUrlBtn.find('i').trigger('click');
					}
				});
			}
		}

		var removeFileBlock = function (id) {
			var pos = getPositionById(id);
			if (pos < droppedFiles.length) {
				droppedFiles.splice(pos, 1);
				$('#filedrop-' + randomId).find('#fileupload-' + id).remove();
				if (droppedFiles.length === 0) { // the last file was removed
					$('#filedrop-' + randomId).find('.chooseFilesLabel').removeClass('hidden');
				}
			}
		};

		var moveUpFileBlock = function (id) {
			var pos = getPositionById(id);
			if (pos < droppedFiles.length && pos !== 0) {
				var prevId = droppedFiles[pos - 1].id;
				var flTemp = droppedFiles[pos - 1];
				droppedFiles[pos - 1] = droppedFiles[pos];
				droppedFiles[pos] = flTemp;

				var block = $('#filedrop-' + randomId + ' > #fileupload-' + id).detach();
				$('#filedrop-' + randomId + ' > #fileupload-' + prevId).before(block);
			}
		};

		var moveDownFileBlock = function (id) {
			var pos = getPositionById(id);
			if (pos < droppedFiles.length && pos !== (droppedFiles.length - 1)) {
				var nextId = droppedFiles[pos + 1].id;
				var flTemp = droppedFiles[pos + 1];
				droppedFiles[pos + 1] = droppedFiles[pos];
				droppedFiles[pos] = flTemp;

				var block = $('#filedrop-' + randomId + ' > #fileupload-' + id).detach();
				$('#filedrop-' + randomId + ' > #fileupload-' + nextId).after(block);
			}
		};

		var appendFileBlock = function (file) {
			var id = nextFileId();
			var name = file.name;
			var fileEditLink = null;
			if (file.isUrl) {
				fileEditLink = $('\
                    <a class="fileEditLink">\
                        <i class="fa fa-pencil"></i>\
                    </a>\
                ');
				fileEditLink.find('i').on('click',
					function () {
						showEditUrlBlock(id);
					});
			}
			var fileMoveUpLink = null;
			var fileMoveDownLink = null;
			if (options.UseSorting) {
				fileMoveUpLink = $('\
                    <a class="fileMoveUpLink">\
                        <i class="fa fa-arrow-up"></i>\
                    </a>\
                ');
				fileMoveDownLink = $('\
                    <a class="fileMoveDownLink">\
                        <i class="fa fa-arrow-down"></i>\
                    </a>\
                ');
				fileMoveUpLink.find('i').on('click', function () {
					moveUpFileBlock(id);
				});
				fileMoveDownLink.find('i').on('click', function () {
					moveDownFileBlock(id);
				});
			}
			var fileRemoveLink = $('\
                <a class="fileRemoveLink">\
                    <i class="fa fa-times"></i>\
                </a>\
            ');
			fileRemoveLink.find('i').on('click', function () {
				removeFileBlock(id);
			});
			var fileLinkHolder = $('\
				<span class="fileLinkHolder">\
				</span>\
			');
			if (fileEditLink !== null) {
				fileLinkHolder.append(fileEditLink);
			}
			if (fileMoveUpLink !== null && fileMoveDownLink !== null) {
				fileLinkHolder.append(fileMoveUpLink);
				fileLinkHolder.append(fileMoveDownLink);
			}
			fileLinkHolder.append(fileRemoveLink);
			var spanFileName = $('\
				<span class="filename">\
					<label class="custom-file-upload" style="display:inline">' + name + '</label>\
				</span>\
			');
			spanFileName.append(fileLinkHolder);

			var fileBlock = $('<div id="fileupload-' + id + '" class="fileupload file-upload-container"></div>');
			fileBlock.on('dragover', preventFileDrop);
			fileBlock.on('drop', preventFileDrop);
			fileBlock.append(spanFileName);


			var f = $('#filedrop-' + randomId).find('#filedrop-input-url');
			if (f.length) {
				$(fileBlock).insertBefore(f);
			} else {
				$(fileBlock).insertBefore('.filedrop-buttonbar');
			}


			// $('#filedrop-' + randomId).append(fileBlock);
			droppedFiles.push({
				id,
				file,
				name,
				isUrl: file.isUrl
			});
		};

		var prepareFormData = function (min = 1, max = undefined) {
			if (max === undefined)
				max = options.MaximumUploadFiles;

			if (droppedFiles.length) {
				if (droppedFiles.length < min || droppedFiles.length > max) {
					options.showAlert(options.FileAmountMessage);
					return null;
				}

				var data = new FormData();
				var dotPos, ext;
				var f;
				for (var i = 0; i < droppedFiles.length; i++) {
					f = droppedFiles[i];
					dotPos = f.name.lastIndexOf('.');
					ext = dotPos >= 0 ? f.name.substring(dotPos + 1).toUpperCase() : null;
					if (f.isUrl) {
						data.append(f.id, f.name);
					} else {
						if (ext !== null && options.UploadOptions.indexOf(ext) !== -1) {
							data.append(f.id, f.file, f.name);
						} else {
							options.showAlert(options.FileWrongTypeMessage + ext);
							return null;
						}
					}




				}
				return data;
			} else {
				options.showAlert(options.FileSelectMessage);
				return null;
			}
		};

		var uploadFileSelected = function (event) {
			var bError = false;
			if (event.target.files && event.target.files.length) {
				var fileCount = event.target.files.length + droppedFiles.length;
				if (fileCount <= options.MaximumUploadFiles) {
					var ext;
					options.hideAlert();
					for (var i = 0; i < event.target.files.length; i++) {
						ext = getFileExtension(event.target.files[i]);
						if (ext !== null && acceptExts.indexOf(ext) !== -1) {
							$('#filedrop-' + randomId).find('.chooseFilesLabel').addClass('hidden');
							appendFileBlock(event.target.files[i]);
						} else {
							bError = true;
							if (ext !== null)
								ext = ext.toUpperCase();
							options.showAlert(options.FileWrongTypeMessage + ext);
						}
					}
				} else {
					bError = true;
					options.showAlert(options.FileAmountMessage);
					window.setTimeout(function () {
						options.hideAlert();
					}, 5000);
				}
			}

			// clear the file input field
			$('input#UploadFileInput-' + randomId).val('');
			return !bError;
		};

		var uploadFileAndRedirect = function (event) {
			options.showLoader();
			if (uploadFileSelected(event)) {
				var data = prepareFormData();
				if (data !== null) {
					$.ajax({
						method: 'POST',
						url: options.APIBasePath + 'Common/UploadFile',
						data: data,
						processData: false,
						contentType: false,
						cache: false,
						timeout: 600000,
						success: options.Method,
						xhr: function () {
							var myXhr = $.ajaxSettings.xhr();
							if (myXhr.upload) {
								myXhr.upload.addEventListener('progress', options.progress, false);
							}
							return myXhr;
						},
						error: function (e) {
							options.showAlert(e.Status);
						}
					});
				}
			}
		};

		var toggleInputUrlBlock = function () {
			var f = $('#filedrop-' + randomId).find('#filedrop-input-url');
			if (f.length)
				f.remove();
			else
				showInputUrlBlock();
		}
		var showInputUrlBlock = function () {

			var fileBlock = $('<div id="filedrop-input-url" class="fileupload file-upload-input-container"></div>');

			// <input type="text" id="externalUrlInput" name="externalUrlInput" placeholder="Enter file URL">\
			//	<label class="custom-file-upload" style="display:inline">text</label>\
			var spanFileName = $('\
				<span class="filename">\
				    <input type="text" id="externalUrlInput" class="form-control externalUrlInput" name="externalUrlInput" placeholder="Enter file URL">\
				</span>\
			');

			var fileLinkHolder = $('\
				<span class="fileLinkHolder">\
				</span>\
			');

			var applyUrlBtn = $('\
                    <a>\
                        <i class="fa fa-check"></i>\
                    </a>');

			applyUrlBtn.find('i').on('click', function () {
				var element = $("#externalUrlInput");
				if (element.val().length) {
					if (!isValidUrl(element.val())) {
						element.addClass('externalUrlInputError');
						return;
					}

					var file = { name: element.val(), isUrl: true };
					appendFileBlock(file);
					toggleInputUrlBlock();
				}

			});
			fileLinkHolder.append(applyUrlBtn);

			var cancelUrlBtn = $('\
                    <a>\
                        <i class="fa fa-times"></i>\
                    </a>');

			cancelUrlBtn.find('i').on('click', function () {
				toggleInputUrlBlock();
			});
			fileLinkHolder.append(cancelUrlBtn);
			spanFileName.append(fileLinkHolder);
			fileBlock.on('dragover', preventFileDrop);
			fileBlock.on('drop', preventFileDrop);
			fileBlock.append(spanFileName);

			$(fileBlock).insertBefore('.filedrop-buttonbar');
			spanFileName.find('input').focus();

			spanFileName.find('input').keydown(function (e) {
				if (e.keyCode == 13) {
					e.preventDefault();
					applyUrlBtn.find('i').trigger('click');
				} else if (e.keyCode == 27) {
					cancelUrlBtn.find('i').trigger('click');
				}
			});
		};

		var twoBlocks = o.AppName === "Comparison";
		var fileDropBlockStr = '\
            <div class="filedrop filedrop-mvc fileplacement" id="filedrop-' + randomId + '"' + (twoBlocks ? 'style="padding:30px 0"' : '') + '>\
                <label for="UploadFileInput-' + randomId + '" style="margin-top: 50px;text-decoration: underline">' + options.DropFilesPrompt + '</label>\
                <input type="file" class="uploadfileinput" id="UploadFileInput-' + randomId + '" name="UploadFileInput-' + randomId + '"\
                    title="' + o.AppName + " " + options.Accept + '"\
                    accept="' + options.Accept + '"' +
			(options.Multiple ? 'multiple="' + options.Multiple + '"' : '') +
			'/>' +
			'</div>';

		if (twoBlocks) {
			fileDropBlockStr = '\
					<div class="col-md-6 col-sm-12">' +
				fileDropBlockStr + '\
					</div>';
		}
		var fileDropBlock = $(fileDropBlockStr);

		// adding file drop block
		this.prepend(fileDropBlock);

		if (options.ShowButtonBar) {
			var buttonBar = '<div class="filedrop-buttonbar"> ' +
				'<a id="externalUrlButton" class="filedrop-buttonbar-item" title="Enter the link of a file you want to use">' +
				'	<i class="fa fa-link" aria-hidden="true"></i> Enter URL' +
				'</a>' +
				'<a id="archiveButton" class="filedrop-buttonbar-item" title="Choose archive file that contains web page along with resources">' +
				'	<i class="fa fa-file-zip-o" aria-hidden="true"></i> Zip' +
				'</a>' +
				'<a id="archiveButton" class="filedrop-buttonbar-item" data-toggle="modal" data-target="#help-dialog-template" title="Choose archive file that contains web page along with resources">' +
				'	<i class="fa fa-info-circle" aria-hidden="true"></i> Help' +
				'</a>' +
				'</div>';
			$('#filedrop-' + randomId).append(buttonBar);
		}
		var openZip = false;
		// adding event handlers
		if (!options.UploadAndRedirect) {
			$('input#UploadFileInput-' + randomId).on('change', uploadFileSelected);
			$('input#UploadFileInput-' + randomId).on('click', ev => {
				if (openZip)
					ev.target.accept = ".zip";
				else
					ev.target.accept = options.Accept;
				openZip = false;
			});
		}
		else {
			$('input#UploadFileInput-' + randomId).on('change', uploadFileAndRedirect);
		}

		$('#externalUrlButton').on('click', function () {
			toggleInputUrlBlock();
		});

		$('#archiveButton').on('click', function () {

			var f = $('#UploadFileInput-' + randomId);
			openZip = true;
			f.trigger('click');
		});


		// return object with access fields
		return {
			get droppedFiles() {
				return droppedFiles;
			},
			get prepareFormData() {
				return prepareFormData;
			},
			reset: function reset() {
				droppedFiles = [];
				$('#filedrop-' + randomId).find('div[id^=fileupload-]').remove();
				$('#filedrop-' + randomId).find('.chooseFilesLabel').removeClass('hidden');
			}
		};
	};
})(jQuery);
