$(".colorebox").hide(0);
$(".cuore").hide(0);
$("#palettematerial").hide(0);
coloregiacreato=0;
nuovaurl= "";
primoclick=0;
rotazione=0;

// funzione per crea colore
function creacolore(col1, col2, col3){
if (coloregiacreato==0 && $(window).width() < 800){
	$(".varielementi").stop().fadeOut(0);
	$(".cerchi").stop().fadeIn(250);
	}
	$(".menualto").fadeIn(250);
$(".newfeatures").show(0);	
$(".bottone").fadeIn(500);
$(".container").css("background-color", "#" + col1);
$(".downloadbaloon").attr( "data-balloon", $(".downloadbaloon").attr( "data-balloon2") );
$(".sharepalette").attr( "data-balloon", $(".sharepalette").attr( "data-balloon2") );
$(".sopra .bottone").css("background-color", "#" + col1);
$(".totem").css("fill", "#" + col2);
$(".totem").css("color", "#" + col2);
$("#penna").css("fill", "#" + col3);
$(".giallo").css("color", "#" + col3);
$(".giallo1").css("background-color", "#" + col3);
$(".totem1").css("background-color", "#" + col2);
$("#colore1").css("background-color", "#" + col1);
$("#colore2").css("background-color", "#" + col2);
$("#colore3").css("background-color", "#" + col3);
$("#colore1 span").html("#" + col1);
$("#colore2 span").html("#" + col2);
$("#colore3 span").html("#" + col3);
$("#shareIcons").jsSocials("destroy");   
$("#shareIcons").hide();
$("#downloadIcons").hide();
$('html,body').stop().animate({ scrollTop: 0 }, '10');
setTimeout(function(){ $('.sopra .bottone').colourBrightness(); }, 250);
setTimeout(function(){ $('.cardsopra').colourBrightness(); }, 250);
setTimeout(function(){ $('.fab').colourBrightness(); }, 250);
setTimeout(function(){ $('.bottonematerial').colourBrightness(); }, 250);
setTimeout(function(){ $('#colore1').colourBrightness(); }, 250);
setTimeout(function(){ $('#colore2').colourBrightness(); }, 250);
setTimeout(function(){ $('#colore3').colourBrightness(); }, 250);
coloregiacreato=1;
    }
	
	
	

// funzioni per drag colori
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));
	
	if (data!=ev.target.id){
	tracinatosu=$("#"+ev.target.id);
	tracinato=$("#"+data);
	
coloretracinato=tracinato.find( "span" ).text();
coloretracinatosu=tracinatosu.find( "span" ).text();
tracinato.find( "span" ).text(coloretracinatosu);
tracinatosu.find( "span" ).text(coloretracinato);

$("#colore1").find( "span" ).text().replace("#", "");
randomColor1=$("#colore1").find( "span" ).text().replace("#", "");
randomColor2=$("#colore2").find( "span" ).text().replace("#", "");
randomColor3=$("#colore3").find( "span" ).text().replace("#", "");

$(".coloreprima").removeClass("paletteattiva");
$(".colorecliccato").html( "<div class='coloreprima paletteattiva' colore1='"+ randomColor1 +"' colore2='"+ randomColor2 +"' colore3='"+ randomColor3 +"'><div class='coloreseconda' style='background-color:#"+ randomColor1 +"'> </div><div class='coloreterza' style='background-color:#"+ randomColor2 +"'> </div><div class='colorequarta' style='background-color:#"+ randomColor3 +"'> </div> </div>" + $(".colorecliccato").html()  );
creacolore(randomColor1, randomColor2, randomColor3);
$.get( "https://www.threebu.it/random-color-palette/nuovapalette.asp" );
$( ".quantecreate" ).load( "https://www.threebu.it/random-color-palette/quantecreate.asp" );
	}

}


// funzione per copy codice
function copyToClipboard(val){
      var dummy = document.createElement("input");
      document.body.appendChild(dummy);
      dummy.setAttribute("id", "dummy_id");
      document.getElementById("dummy_id").value=val;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    }
	
	
	

	
	
// variabili varie
lucchetto1=0;
lucchetto2=0;
lucchetto3=0;

palettepicker="";


var colors = ['FFEBEE','FFCDD2','EF9A9A','E57373','EF5350','F44336','E53935','D32F2F','C62828','B71C1C','FF8A80','FF5252','FF1744','D50000','FCE4EC','F8BBD0','F48FB1','F06292','EC407A','E91E63','D81B60','C2185B','AD1457','880E4F','FF80AB','FF4081','F50057','C51162', 'F3E5F5','E1BEE7','CE93D8','BA68C8','AB47BC','9C27B0','8E24AA','7B1FA2','6A1B9A','4A148C','EA80FC','E040FB','D500F9','AA00FF', 'EDE7F6','D1C4E9','B39DDB','9575CD','7E57C2','673AB7','5E35B1','512DA8','4527A0','311B92','B388FF','7C4DFF','651FFF','6200EA','E8EAF6','C5CAE9','9FA8DA','7986CB','5C6BC0','3F51B5','3949AB','303F9F','283593','1A237E','8C9EFF','536DFE','3D5AFE','304FFE','E3F2FD','BBDEFB','90CAF9','64B5F6','42A5F5','2196F3','1E88E5','1976D2','1565C0','0D47A1','82B1FF','448AFF','2979FF','2962FF','E1F5FE','B3E5FC','81D4FA','4FC3F7','29B6F6','03A9F4','039BE5','0288D1','0277BD','01579B','80D8FF','40C4FF','00B0FF','0091EA','E0F7FA','B2EBF2','80DEEA','4DD0E1','26C6DA','00BCD4','00ACC1','0097A7','00838F','006064','84FFFF','18FFFF','00E5FF','00B8D4','E0F2F1','B2DFDB','80CBC4','4DB6AC','26A69A','009688','00897B','00796B','00695C','004D40','A7FFEB','64FFDA','1DE9B6','00BFA5','E8F5E9','C8E6C9','A5D6A7','81C784','66BB6A','4CAF50','43A047','388E3C','2E7D32','1B5E20','B9F6CA','69F0AE','00E676','00C853','F1F8E9','DCEDC8','C5E1A5','AED581','9CCC65','8BC34A','7CB342','689F38','558B2F','33691E','CCFF90','B2FF59','76FF03','64DD17','F9FBE7','F0F4C3','E6EE9C','DCE775','D4E157','CDDC39','C0CA33','AFB42B','9E9D24','827717','F4FF81','EEFF41','C6FF00','AEEA00','FFFDE7','FFF9C4','FFF59D','FFF176','FFEE58','FFEB3B','FDD835','FBC02D','F9A825','F57F17','FFFF8D','FFFF00','FFEA00','FFD600','FFF8E1','FFECB3','FFE082','FFD54F','FFCA28','FFC107','FFB300','FFA000','FF8F00','FF6F00','FFE57F','FFD740','FFC400','FFAB00','FFF3E0','FFE0B2','FFCC80','FFB74D','FFA726','FF9800','FB8C00','F57C00','EF6C00','E65100','FFD180','FFAB40','FF9100','FF6D00','FBE9E7','FFCCBC','FFAB91','FF8A65','FF7043','FF5722','F4511E','E64A19','D84315','BF360C','FF9E80','FF6E40','FF3D00','DD2C00','EFEBE9','D7CCC8','BCAAA4','A1887F','8D6E63','795548','6D4C41','5D4037','4E342E','3E2723','FAFAFA','F5F5F5','EEEEEE','E0E0E0','BDBDBD','9E9E9E','757575','616161','424242','212121','ECEFF1','CFD8DC','B0BEC5','90A4AE','78909C','607D8B','546E7A','455A64','37474F','263238','FFFFFF','000000'];


for (i = 0; i < colors.length; i++) {
	
    palettepicker += "<div class='colorepick' colore='"+ colors[i] +"' style='background-color:#"+ colors[i] +"; color:#"+ colors[i] +"'></div>";
	
	
}
$("#palettematerial").html(palettepicker);

colorecliccato=0;

staicambiando=0;



$(document).ready(function() {
						   
			// funzione per evitare cambio colore   
			$('body').on('click', '.bottone', function () { colorecliccato=1;});
			$('body').on('click', '.colorebox', function () { colorecliccato=1;});
			
			
			// funzione per aprire picker colore
	$('body').on('click', '.pickcolore', function () {
				colorecliccato=1;
				$("#palettematerial").fadeIn(250);
				staicambiando=$( ".pickcolore" ).index( this )+1;
				daiattuale=$("#colore"+staicambiando).find( "span" ).text().replace("#", "");
				$(".colorepick").removeClass("attuale");
				
				setTimeout(function(){ $(".colorepick[colore='"+daiattuale+"']").addClass("attuale"); }, 260);
				
				 });
	
	
	// funzione per  picker colore
	$('body').on('click', '.colorepick', function () {
				colorecliccato=1;
				$("#palettematerial").fadeOut(250);
$("#colore"+staicambiando).find( "span" ).text("#"+$(this).attr("colore"));
randomColor1=$("#colore1").find( "span" ).text().replace("#", "");
randomColor2=$("#colore2").find( "span" ).text().replace("#", "");
randomColor3=$("#colore3").find( "span" ).text().replace("#", "");
$(".coloreprima").removeClass("paletteattiva");
$(".colorecliccato").html( "<div class='coloreprima paletteattiva' colore1='"+ randomColor1 +"' colore2='"+ randomColor2 +"' colore3='"+ randomColor3 +"'><div class='coloreseconda' style='background-color:#"+ randomColor1 +"'> </div><div class='coloreterza' style='background-color:#"+ randomColor2 +"'> </div><div class='colorequarta' style='background-color:#"+ randomColor3 +"'> </div> </div>" + $(".colorecliccato").html()  );

creacolore(randomColor1, randomColor2, randomColor3);
$.get( "https://www.threebu.it/random-color-palette/nuovapalette.asp" );
$( ".quantecreate" ).load( "https://www.threebu.it/random-color-palette/quantecreate.asp" );
				 });
	
	// funzioni per like palette
	$('body').on('click', '.likepalette', function () {
				$(".paletteattiva").addClass("palettapiaciuta");
				$(".paletteattiva").append("<i class='fa fa-heart piaciuta' aria-hidden='true'></i>");
				$(".cuore").fadeIn(500).fadeOut(400);
				$.get( "https://www.threebu.it/random-color-palette/palettepiaciuta.asp?colore1="+ randomColor1 +"&colore2="+ randomColor2 +"&colore3="+ randomColor3 );
				
															 });
	
				
				
			
			// funzioni per scelta esempio
			$('body').on('click', '.sceltatitoli', function () {
				$(".varielementi").stop().fadeOut(250);
				setTimeout(function(){ $(".scritta").stop().fadeIn(250); }, 260);
				
															 });
			
			$('body').on('click', '.sceltasvg', function () {
				$(".varielementi").stop().fadeOut(250);
				setTimeout(function(){ $(".svg").stop().fadeIn(250); }, 260);
				
															 });
			
			$('body').on('click', '.sceltaorizzontali', function () {
				$(".varielementi").stop().fadeOut(250);
				setTimeout(function(){ $(".orizzontali").stop().fadeIn(250); }, 260);
				
															 });
			
			$('body').on('click', '.sceltaverticali', function () {
				$(".varielementi").stop().fadeOut(250);
				setTimeout(function(){ $(".verticali").stop().fadeIn(250); }, 260);
				
															 });
			
			$('body').on('click', '.sceltacerchi', function () {
				$(".varielementi").stop().fadeOut(250);
				setTimeout(function(){ $(".cerchi").stop().fadeIn(250); }, 260);
				
															 });
			
			$('body').on('click', '.sceltacard', function () {
				$(".varielementi").stop().fadeOut(250);
				setTimeout(function(){ $(".card").stop().fadeIn(250); }, 260);
				
															 });
				// funzioni per copia codice	   
				$('body').on('click', '.colorebox span', function () {
				colorecliccato=1;
				copyToClipboard($(this).html());
				alert("Paste color code "+nuovaurl+" wherever you want :)");
				
															 });	
				
				
				// funzioni per blocco colore
						$('body').on('click', '.lucchetto', function () { 
							colorecliccato=1;										  
							numeroluc="lucchetto"+($( ".lucchetto" ).index( this )+1);
							
							if (window[numeroluc]==0){
							window[numeroluc]=1;
							$(this).addClass("fa-lock");
							$(this).removeClass("fa-unlock-alt");}
							
							else
							
							{
							window[numeroluc]=0;
							$(this).removeClass("fa-lock");
							$(this).addClass("fa-unlock-alt");}
							
							
							
							});
			
			
			// funzioni per richiamare colori vecchi
		$('body').on('click', '.coloreprima', function () {
		colorecliccato=1;
		randomColor1=$(this).attr("colore1");
		randomColor2=$(this).attr("colore2");
		randomColor3=$(this).attr("colore3");
		creacolore($(this).attr("colore1"), $(this).attr("colore2"), $(this).attr("colore3"));
		$(".coloreprima").removeClass("paletteattiva");
		$(this).addClass("paletteattiva");
      });
		
		

		// funzioni per cambio colore random
		
		
		function creacolore1(){
			if (lucchetto1==0) {randomColor1 = colors[Math.floor(Math.random() * colors.length)]};
			}
			
			function creacolore2(){
			if (lucchetto2==0) {randomColor2 = colors[Math.floor(Math.random() * colors.length)]}
			if (randomColor2==randomColor1) {creacolore2()}
			}
			
			function creacolore3(){
			if (lucchetto3==0) {randomColor3 = colors[Math.floor(Math.random() * colors.length)]};
			if (randomColor3==randomColor1 || randomColor3==randomColor2) {creacolore3()}
			}
		
		
		$("body").on('click', function () {
		if (primoclick==0){(adsbygoogle = window.adsbygoogle || []).push({});}
		primoclick=1;
$(".colorebox").fadeIn(500);
$(".clicktostart").fadeOut(500);

if (colorecliccato==0 && (lucchetto1+lucchetto2+lucchetto3)!=3){
	
//randomColor1 = Math.floor(Math.random()*16777215).toString(16);
//randomColor2 = Math.floor(Math.random()*16777215).toString(16);
//randomColor3 = Math.floor(Math.random()*16777215).toString(16);

creacolore1();
creacolore2();
creacolore3();



$(".coloreprima").removeClass("paletteattiva");
$(".colorecliccato").html( "<div class='coloreprima paletteattiva' colore1='"+ randomColor1 +"' colore2='"+ randomColor2 +"' colore3='"+ randomColor3 +"'><div class='coloreseconda' style='background-color:#"+ randomColor1 +"'> </div><div class='coloreterza' style='background-color:#"+ randomColor2 +"'> </div><div class='colorequarta' style='background-color:#"+ randomColor3 +"'> </div> </div>" + $(".colorecliccato").html()  );

if (nuemerorandomads==1){ 
	if (rotazione==0){ 
	$(".colorecliccatoadsbygoogle").html(  $(".colorecliccatoadsbygoogle").html()  );}
	rotazione=rotazione+1;
	if (rotazione==3){ rotazione=0}
}
console.log(nuemerorandomads);


creacolore(randomColor1, randomColor2, randomColor3);
$.get( "https://www.threebu.it/random-color-palette/nuovapalette.asp" );
$( ".quantecreate" ).load( "https://www.threebu.it/random-color-palette/quantecreate.asp" );

}
colorecliccato=0;

});
							

});




if (faipartire==1) {
$(".colorebox").fadeIn(500);


$(".coloreprima").removeClass("paletteattiva");
$(".colorecliccato").html( "<div class='coloreprima paletteattiva' colore1='"+ randomColor1 +"' colore2='"+ randomColor2 +"' colore3='"+ randomColor3 +"'><div class='coloreseconda' style='background-color:#"+ randomColor1 +"'> </div><div class='coloreterza' style='background-color:#"+ randomColor2 +"'> </div><div class='colorequarta' style='background-color:#"+ randomColor3 +"'> </div> </div>" + $(".colorecliccato").html()  );

creacolore(randomColor1, randomColor2, randomColor3);
$.get( "https://www.threebu.it/random-color-palette/nuovapalette.asp" );
$( ".quantecreate" ).load( "https://www.threebu.it/random-color-palette/quantecreate.asp" );
}







  $(document).ready(function(){
    // Target your element
    $('.sopra .bottone').colourBrightness()
	$('.colorebox').colourBrightness();
  });




// per aprire menu download
$('body').on('click', '.download', function () {
  $("#downloadIcons").toggle();
  if ($("#downloadIcons").is(":visible"))
  {$(".downloadbaloon").removeAttr( "data-balloon" );}
  else
  {$(".downloadbaloon").attr( "data-balloon", $(".downloadbaloon").attr( "data-balloon2") );}
  $(".sharepalette").attr( "data-balloon", $(".sharepalette").attr( "data-balloon2") );
  $("#shareIcons").hide();
});

    // per generare il pdf e downlodare

$('body').on('click', '.pdf', function () {
  var doc = new jsPDF();

  doc.setFontSize(115);
  doc.setTextColor("#"+randomColor1);
  doc.text(25, 35, "#"+randomColor1);
  doc.setTextColor("#"+randomColor2);
  doc.text(25, 70, "#"+randomColor2);
  doc.setTextColor("#"+randomColor3);
  doc.text(25, 105, "#"+randomColor3);
  doc.setTextColor("#2F2D32");
  doc.setFontSize(12);
  doc.text(25, 115, "https://www.threebu.it/random-material-palette/"+ randomColor1 +"/"+ randomColor2 +"/"+ randomColor3 +"");
  doc.setFontSize(16);
  doc.text(25, 205, "Random Material Palette Generator");
  doc.setFontSize(14);
  doc.text(25, 211, "Made in Threebų");
  doc.setFontSize(12);
  doc.text(25, 215, "https://www.threebu.it/");
  doc.save('randompalette.pdf');
  $.get( "https://www.threebu.it/random-color-palette/palettescaricata.asp?colore1="+ randomColor1 +"&colore2="+ randomColor2 +"&colore3="+ randomColor3 +"&tipo=pdf");
});

 // per copiare la palette
$('body').on('click', '.copiapalette', function () {
copyToClipboard("#"+randomColor1+", #"+randomColor2+", #"+randomColor3);
alert("Paste palette wherever you want :)");
});




// per aprire png

$('body').on('click', '.png', function () {
  $.get( "https://www.threebu.it/random-color-palette/palettescaricata.asp?colore1="+ randomColor1 +"&colore2="+ randomColor2 +"&colore3="+ randomColor3 +"&tipo=png");
  window.open("https://www.threebu.it/random-color-palette/immaginecolore.aspx?colore1="+randomColor1+"&colore2="+randomColor2+"&colore3="+randomColor3);	

});

 // per aprire html

$('body').on('click', '.html', function () {
  $.get( "https://www.threebu.it/random-color-palette/palettescaricata.asp?colore1="+ randomColor1 +"&colore2="+ randomColor2 +"&colore3="+ randomColor3 +"&tipo=html");
window.open("https://www.threebu.it/random-color-palette/random_color_palette_all.asp?colore1="+randomColor1+"&colore2="+randomColor2+"&colore3="+randomColor3);	
});


// per sherare palette attiva - per ora apre pagina con immagine
  

    $('body').on('click', '.sharepalette', function () {
		$(".downloadbaloon").attr( "data-balloon", $(".downloadbaloon").attr( "data-balloon2") );											 
	nuovaurl= "https://www.threebu.it/random-material-palette/"+randomColor1+"/"+randomColor2+"/"+randomColor3;
	nuovaimmagine= "https://www.threebu.it/random-color-palette/immaginecolore.aspx?colore1="+randomColor1+"&colore2="+randomColor2+"&colore3="+randomColor3;
	 $("#shareIcons").toggle();
	 $("#downloadIcons").hide();
	 if ($("#shareIcons").is(":visible"))
  {$(".sharepalette").removeAttr( "data-balloon" );}
  else
  {$(".sharepalette").attr( "data-balloon", $(".sharepalette").attr( "data-balloon2") );}
  $("#shareIcons").jsSocials({
    showLabel: false,
    showCount: false,
	url: nuovaurl,
	 shareIn: "popup",
    shares: ["email", "twitter", "facebook", "googleplus", { share: "pinterest", media: nuovaimmagine }]
});
 $("#shareIcons .jssocials-shares").prepend("<div class='jssocials-share  copialink' data-balloon='Copy link'><a href='#' class='jssocials-share-link'><i class='fa fa-clipboard jssocials-share-logo'></i></a></div>");
 
  $("#shareIcons .jssocials-share-email").attr( "data-balloon","Mail");
   $("#shareIcons .jssocials-share-twitter").attr( "data-balloon","Twitter");
    $("#shareIcons .jssocials-share-facebook").attr( "data-balloon","Facebook");
	 $("#shareIcons .jssocials-share-googleplus").attr( "data-balloon","Google Plus");
	  $("#shareIcons .jssocials-share-pinterest").attr( "data-balloon","Pinterest");

  
});
	
	  // per copiare link diretto
$('body').on('click', '.copialink', function () {
copyToClipboard(nuovaurl);
alert("Paste "+nuovaurl+" wherever you want :)");
});
	
	
	// per aprire i pių visti
  
 $('body').on('click', '.bestpalette', function () {
	 $(".ipiuvotati").show();
	 $( ".ipiuvotati" ).load( "https://www.threebu.it/random-color-palette/palettepiaciute.asp?colore1="+ randomColor1 +"&colore2="+ randomColor2 +"&colore3="+ randomColor3 );
	  $(".colorecliccato").hide();
});
 
 	// per aprire i miei
  
 $('body').on('click', '.miepalette', function () {
	 $(".colorecliccato").show();
	 $(".ipiuvotati").hide();
});
    // per aprire info
  
 $('body').on('click', '.istruzioni', function (event) {
	 $(".tutteleinfo").show();
}); 
 
 // per chiudere info
  
 $('body').on('click', '.tutteleinfo', function () {
												 colorecliccato=1;
	 if(event.target.nodeName != 'A') {
     $(".tutteleinfo").hide();
    }
});
 
 
 // per aprire questionario
  
 $('body').on('click', '.newfeatures', function () {
		colorecliccato=1;
	 $(".questionario").show();
});
 
  $('body').on('click', 'input', function () {
		colorecliccato=1;
});
  
   $('body').on('click', 'textarea', function () {
		colorecliccato=1;
});
   
      $('body').on('click', '.questionario', function () {
		colorecliccato=1;
});
	  
	  
	  // per invio questionario
	  
	  $( "#inviaquestionario" ).submit(function( event ) {
 	colorecliccato=1;
  // Stop form from submitting normally
  event.preventDefault();
 
  $.post( "https://www.threebu.it/random-color-palette/questionario.asp", $( "#inviaquestionario" ).serialize(), function( data ) {
  $( ".rispostaquestionario" ).html( data );
} );
  
});
	  
	  
	  
	// chiudi testi
	
	$('body').on('click', '.chiudipop', function () {
	colorecliccato=1;
     $(".tutteleinfo").hide();
	  $(".questionario").hide();
});
