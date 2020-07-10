var _pagination = {
	limit : 4,
	count : 0,
	length : null,
	max_id : null,
	obj_attach : null,
	pagination_created : false,
	url : null,
	type : null,
	define : function (obj) {
		_pagination.obj_attach = obj
	},
	reset : function () {
		_pagination.count = 0;
		_pagination.pagination_created = false;
		$(_pagination.obj_attach).html("");
		$(_pagination.obj_attach).parent().find("ul.pagination").remove();
	},
	pagination : function () {
		var base = Math.round(_pagination.length / _pagination.limit);
		var nav = "";

		console.log(base);
		//nav += '<nav aria-label="">';
		  nav += '<ul class="pagination">';
		  /*
		    nav += '<li class="page-item">';
		      nav += '<a href="#" aria-label="Previous">';
		        nav += '<span aria-hidden="true">&laquo;</span>';
		      nav += '</a>';
		    nav += '</li>';
		    */
		    for (var i = 1; i <= base; i++) {
		    	c = ((i-1) * _pagination.limit);
		    	nav += '<li class="page-item"><a href="#" class="page-link" onclick="_pagination.count = ' + c + '; _pagination.run(\''+_pagination.url+'\', \''+_pagination.type+'\')">'+i+'</a></li>';
		    }

		    /*
		    
		    nav += '<li>';
		      nav += '<a href="#" aria-label="Next">';
		        nav += '<span aria-hidden="true">&raquo;</span>';
		      nav += '</a>';
		    nav += '</li>';
		    */
		  nav += '</ul>';

		$(_pagination.obj_attach).parent().append(nav);

		_pagination.pagination_created = true;
	},
	run : function (url, type, highlight) {
		console.log("Pagination.run");
		if (_pagination.obj_attach) {
			$(_pagination.obj_attach).find('li a').parent().remove();
			$(_pagination.obj_attach).append('<img src="img/loader.gif" id="loader-pagination" width=64 height=64>');
		}

		$.ajax({
			url : './downloader/index.php',
			type : 'post',
			data : 'url=' + url + 
			'&type=' + type + 
			'&count=' + _pagination.count + 
			'&limit=' + _pagination.limit + 
			'&highlight=' + (highlight ? highlight : "") + 
			'&max_id=' + (_pagination.max_id ? _pagination.max_id : "")
			,
			success : function (returned) {
				data = returned.split("|");
				html = data[0];
				length = data[1];

				_pagination.url = url;
				_pagination.type = type;

				_pagination.length = length;

				if (!_pagination.pagination_created) {
					_pagination.pagination();		
				}

				if (type == 'insta') {
					_pagination.max_id = returned[2];
				}

				console.log("Pagination.success");				
				console.log(_pagination.length);				
				if (_pagination.obj_attach) {
					$("#loader-pagination").remove();
					$(_pagination.obj_attach).html(html);
				}
			}
		});
	}
}
