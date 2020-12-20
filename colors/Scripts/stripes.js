$(document).ready(function () {

    var stylecraftColours = [
        { name: "Soft peach", value: "fbe5eb" },
        { name: "Apricot", value: "f7d2ca" },
        { name: "Candy floss", value: "fed6de" },
        { name: "Clematis", value: "dbb1c9" },
        { name: "Pale rose", value: "dba8bb" },
        { name: "Fondant", value: "fc9fbe" },

        { name: "Parma violet", value: "ddd6de" },
        { name: "Wisteria", value: "caafd8" },
        { name: "Lavender", value: "a69fd2" },
        { name: "Bluebell", value: "8f90c9" },
        { name: "Violet", value: "978bb1" },
        { name: "Grape", value: "b67c92" },

        { name: "Shrimp", value: "ff8276" },
		
        { name: "Vintage Peach", value: "fbb6a3" },
        { name: "Blush", value: "e5a7ad" },
		
       { name: "Boysenberry", value: "f3569b" },
		{ name: "Fiesta", value: "ff53b1" },
		{ name: "Bright pink", value: "dd1f69" },
		{ name: "Pomegranate", value: "e93f5a" },
        { name: "Lipstick", value: "c41323" },
        { name: "Claret", value: "6a0b1f" },
        { name: "Burgundy", value: "63282e" },
        
		{ name: "Raspberry", value: "df6481" },
       
		{ name: "Fuschia Purple", value: "dc437d" },
        { name: "Magenta", value: "cf68b1" },
		 { name: "Plum", value: "97456d" },
        { name: "Emperor", value: "4a2958" },

        { name: "Aspen", value: "7dddc1" },
        { name: "Grass green", value: "92d375" },
        { name: "Bright green", value: "83e986" },
        { name: "Spring green", value: "c3e4b9" },
        { name: "Kelly green", value: "369960" },
        { name: "Green", value: "08834d" },
        { name: "Bottle", value: "26372f" },
               
        { name: "Sage", value: "84b1aa" },
        { name: "Lincoln", value: "afbba7" },
		
        { name: "Cypress", value: "8fa387" },
        { name: "Khaki", value: "857d56" },
        
        { name: "Teal", value: "429991" },       

        { name: "Duck egg", value: "c3d7d8" },
        { name: "Sherbert", value: "a6cfef" },
        { name: "Cloud blue", value: "d8ecf5" },
        { name: "Turquoise", value: "60c3da" },
        { name: "Empire", value: "1791c0" },
        { name: "Petrol", value: "3c7789" },
        { name: "Storm blue", value: "7098a2" },
        { name: "Denim", value: "8394ae" },
        { name: "Aster", value: "6094cd" },
        { name: "Lobelia", value: "434b8a" },
        { name: "Royal", value: "273075" },
        { name: "Midnight", value: "202342" },

        { name: "White", value: "ffffff" },
        { name: "Cream", value: "fbf6f0" },

         { name: "Pistachio", value: "cec671" },
        { name: "Lime", value: "d7bf2b" },
        { name: "Meadow", value: "a5ab65" },
        { name: "Lemon", value: "f7f9a1" },
        { name: "Citron", value: "faf081" },
        { name: "Saffron", value: "fbcd77" },
		
        { name: "Buttermilk", value: "f7eaae" },
        { name: "Sunshine", value: "fbb91d" },
        { name: "Mustard", value: "efc137" },
        { name: "Gold", value: "e1882e" },
        { name: "Spice", value: "de4b18" },
        { name: "Jaffa", value: "ff9041" },
        { name: "Tomato", value: "b23322" },
        { name: "Copper", value: "bf4c31" },
        { name: "Matador", value: "e3181b" },       
        
        { name: "Camel", value: "e3be7a" },
        { name: "Mocha", value: "c6a592" },
        { name: "Walnut", value: "6c4c3f" },
        { name: "Dark brown", value: "3f2723" },
      
        { name: "Stone", value: "f5ecdf" },
        { name: "Parchment", value: "e7decf" },
		
        { name: "Mushroom", value: "cec3c1" },
        { name: "Silver", value: "c2c2c2" },
        { name: "Grey", value: "b0b0b2" },
        { name: "Graphite", value: "767674" },
        { name: "Black", value: "0a0a0a" },
		
				
		
    ];

    var deramoresColours = [
    { name: "Rose", value: "fcc6c4" },
    { name: "Lavender", value: "d7c6d0" },
    { name: "Heather", value: "c69aa9" },
    { name: "Dusky lilac", value: "b8899b" },
    { name: "Peony", value: "c871a4" },
    { name: "Blush", value: "d15a6d" },
    { name: "Fuchsia", value: "f25598" },
    { name: "Raspberry", value: "b9162b" },
    { name: "Ruby", value: "cd1c14" },
    { name: "Aubergine", value: "632f53" },
    { name: "Purple", value: "512b5c" },
    { name: "Wine", value: "75252e" },
    { name: "Amethyst", value: "351c18" },
    { name: "Sky", value: "c3d7e2" },
    { name: "Topaz", value: "abc0b7" },
    { name: "Lapis", value: "3a50a3" },
    { name: "Blue velvet", value: "2a3143" },
    { name: "Indigo", value: "252237" },
    { name: "Jade", value: "34a19c" },
    { name: "Malachite", value: "2d8575" },
    { name: "Peridot", value: "a7bf29" },
    { name: "Fir", value: "7aa124" },
    { name: "Olive", value: "58623f" },
    { name: "Citrine", value: "e6be1e" },
    { name: "Mustard", value: "e3a51e" },
    { name: "Burnt orange", value: "f8701c" },
    { name: "Pearl", value: "ebe4c8" },
    { name: "Oatmeal", value: "cab57e" },
    { name: "Chocolate", value: "271f14" },
    { name: "Frost", value: "ffffff" },
    { name: "Mist", value: "cbcdb5" }, 
    { name: "Smoke", value: "848670" },
    { name: "Ebony", value: "000000" }
    ];

    var colourBrands = {
        "stylecraft": stylecraftColours,
        "deramores" : deramoresColours
    }
    
    var brands = {
        "stylecraft": 1,
        "deramores": 2
    };

    var selectedBrand = brands.stylecraft;

    var rowTypes = {
        "stripes": 1,
        "squares": 2
    };

    var selectedRowType = rowTypes.stripes;

    var colourHashes = {};

    var coloursHash = {};
    // TODO: make sure this has completed before setting the palette colours
    $.each(stylecraftColours, function () {
        coloursHash[this.name] = this.value;
    });
    colourHashes[brands.stylecraft] = coloursHash;

    coloursHash = {};

    $.each(deramoresColours, function () {
        coloursHash[this.name] = this.value;
    });
    colourHashes[brands.deramores] = coloursHash;

    var paletteCount = $('.paletteContainer').length;

    var palettes = [
			{ name: "Winter is coming", palette: ['Cloud blue', 'Duck egg', 'Sherbert', 'Sage', 'Parmaviolet', 'Pale rose', 'Petrol', 'Silver', 'White', 'Cream'] },
			{ name: "Christmas", palette: ['Cream', 'Stone', 'Parchment', 'Mocha', 'Pomegranate', 'Matador', 'Lipstick', 'Grass green', 'Kelly green', 'Green'] },
			
           { name: 'Cosy autumn', palette: ['Claret', 'Burgundy', 'Plum', 'Tomato', 'Copper', 'Spice', 'Gold', 'Walnut', 'Meadow', 'Pistachio', 'Mustard'] },
           { name: 'Cool autumn', palette: ['Spice', 'Denim', 'Walnut', 'Mocha', 'Cypress', 'Camel'] },
           //{ palette: ["Bluebell", "Clematis", "Duck egg", "Pistachio", "Raspberry"] },
           
           //{ palette: ["Walnut", "Lime", "Cream", "Soft peach", "Pale rose", "Sherbert", "Aster"] },
           { name: "Vintage rose", palette: ["Pistachio", "Meadow", "Khaki", "Mocha", "Parchment", "Cream", "Candy floss", "Pale rose", "Raspberry", "Wisteria", "Clematis", "Plum"] },
           { name: "Attic24 classic *", palette: ["Aster", "Cloud blue", "Sherbert", "Plum", "Meadow", "Turquoise", "Saffron", "Pomegranate", "Magenta", "Shrimp", "Lavender", "Fondant", "Lipstick", "Spring green", "Clematis", "Aspen", "Wisteria"] },
           { name: "Sunny *", palette: ["Aster", "Plum", "Meadow", "Turquoise", "Magenta", "Claret", "Shrimp", "Fondant", "Lipstick", "Citron", "Violet", "Wisteria", "Bright Pink", "Petrol", "Gold", "Spice", "Lime", "Sage"] },
           { name: "Coast *", palette: ["Aster", "Cloud blue", "Khaki", "Sherbert", "Teal", "Meadow", "Turquoise", "Bluebell", "Grey", "Silver", "Parchment", "Denim", "Camel", "Aspen", "Petrol"] },
           { name: "Kingfisher", palette: ["Lipstick", "Sage", "Parchment", "Saffron", "Gold", "Cloud blue", "Storm blue"] },
           { name: "Cherry blossom", palette: ["Denim", "Pale rose", "Cream", "Meadow", "Grape", "Parchment", "Violet", "Raspberry", "Mocha"] },
           { name: "Harmony *", palette: ["Parma violet", "Aster", "Cloud Blue", "Raspberry", "Plum", "Meadow", "Turquoise", "Pale rose", "Lavender", "Violet", "Clematis", "Petrol", "Lime", "Storm blue", "Sage"] },
			{ name: "Flowers", palette: ['Aster', 'Sage', 'Storm blue', 'Petrol', 'Meadow', 'Lime', 'Citron', 'Cream', 'Parma violet', 'Candy floss', 'Pale rose', 'Magenta', 'Raspberry'] },
			
			{ name: "Halloween party!", palette: ["Jaffa", "Mustard", "Boysenberry", "Fondant", "Cream", "White", "Black", "Silver"] },
			{ name: "Halloween contemporary", palette: ["Cypress", "Lobelia", "Emperor", "Midnight", "Gold", "Camel", "Parma violet"] },
			{ name: "Frankenstein", palette: ["Silver", "Parma violet", "Emperor", "Midnight", "Black", "Bright green", "Green"] },
			{ name: "Nightmare before Christmas", palette: ["Midnight", "Emperor", "Lobelia", "Mustard", "Black", "White", "Sherbert", "Spice"] },	
           { name: "Halloween pastel", palette: ["Parchment", "Grass green", "Jaffa", "Spice", "Violet", "Emperor", "Midnight"] }
			
    ];

    var paletteDeramores = [
          { name: 'Jack o lantern', palette: ['Mustard', 'Burnt orange', 'Raspberry', 'Fir', 'Ebony'] },
          { name: 'Autumn leaves', palette:['Chocolate','Aubergine', 'Wine','Raspberry','Ruby','Burnt orange', 'Mustard','Peridot','Fir']},
          { name: 'Rainbow', palette: ['Aubergine', 'Rose', 'Sky', 'Fuchsia', 'Lapis', 'Lavender', 'Malachite', 'Peridot', 'Ruby', 'Burnt orange', 'Citrine'] },
          { name: 'Seascape', palette: ['Sky', 'Topaz', 'Malachite', 'Oatmeal', 'Fir', 'Peridot', 'Lapis', 'Pearl', 'Mist', 'Smoke', 'Chocolate'] }
    ];

    var paletteBrands = {
        "stylecraft": palettes,
        "deramores" : paletteDeramores
    }

    setSwatches(brands.stylecraft);
    setPalettes(brands.stylecraft);
    addColourSwatchHandler();
    addGenerateStripesHandler();
    addPaletteSelectHandlers();
    addClearButtonHandler();
    addCreatePaletteButtonHandler();
    //addPaletteDeleteHandler();
    addSlidePaletteHandler();
    
    function setSwatches(brand) {
               
        var tableRow = $("<tr></tr>");
        var tableDataHtml = "";
        var table = $('#colour-selection table tbody');
        
        var colours;

        switch (brand) {
            case brands.stylecraft:
                colours = colourBrands.stylecraft;
                break;
            case brands.deramores:
                colours = colourBrands.deramores;
                break;
            default:
                colours = colourBrands.stylecraft;
        }

        for (i = 0; i <= colours.length-1; i++) {
            var colour = colours[i];            
            tableDataHtml = "<td style=\"background: #" + colour.value + "\" class=\"colourSwatch col-md-2\"><label class=\"colourLabel\"><input type=\"checkbox\" name=\"colourCheckbox\" value=\"" + colour.value + "\" data-colourName=\"" + colour.name + "\" \/>" + colour.name + "<\/label><\/td>";
            tableRow.append(tableDataHtml);

            var colourNumber = i + 1;
            if ((colourNumber % 6 === 0) || (colourNumber === colours.length)) {
                table.append(tableRow);
                tableRow = $("<tr></tr>");
            } 
        }
                                    
        var colourSwatches = $(":checkbox[name='colourCheckbox']");

        $.each(colourSwatches, function () {
            var hexColour = $(this).val();
            var textColour = getTextColour(hexColour);
            $(this).parent().css("color", textColour);

        });
    }

    function getTextColour(c)
    {
        var c = c.replace("#","");      // strip #
        var rgb = parseInt(c, 16);   // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff;  // extract red
        var g = (rgb >>  8) & 0xff;  // extract green
        var b = (rgb >>  0) & 0xff;  // extract blue

        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

        if(luma > 100)
        {
            return '#000000';
        }
        return '#ffffff';
    }

    function setPalettes(brand) {

        var palettes;

        switch (brand) {
            case brands.stylecraft:
                palettes = paletteBrands.stylecraft;
                break;
            case brands.deramores:
                palettes = paletteBrands.deramores;
                break;
            default:
                palettes = paletteBrands.stylecraft;
        }

        paletteCount = 0;

        var coloursHash = colourHashes[selectedBrand];

        $.each(palettes, function () {

            paletteCount++;
            var newPaletteNo = paletteCount;
            var paletteName = this.name;
            if (paletteName == undefined) {
                paletteName = "Palette: " + newPaletteNo;
            }
            var newPalette = $("<div class=\"row col-md-12 col-sm-12 paletteContainer\"><div class=\"col-md-2 col-sm-12 col-xs-12\">" + paletteName + "</div></div>");

            var colourSwatches = $("<div class=\"col-md-8 col-sm-12 col-xs-12\"></div>");
            var selectedColours = this.palette;

            $.each(selectedColours, function () {
                var colourName = this.toString();
                var colourValue = coloursHash[colourName];
                if (colourValue != undefined) {
                    colourSwatches.append("<div class=\"col-md-2 col-sm-1 col-xs-1 palette-col\" data-colourname=\"" + colourName + "\" style=\"background:#" + colourValue + ";\"></div>");
                }
            });

            newPalette.append(colourSwatches);

            var buttons = $("<div class=\"col-md-2 col-sm-12 col-xs-12\"></div>");
            
            var selectBtn = $('<button type="button" class="btn btn-primary paletteSelect" id="palette' + newPaletteNo + '">Select Palette</button>');
            //var deleteBtn = $('<button type="button" class="btn btn-danger paletteDel" >X</button>');
            buttons.append(selectBtn);// .append(deleteBtn);

            newPalette.append(buttons);
            //$('#palettes .container').append(newPalette);
            $('#palettes').append(newPalette);
        });
    }

    function addGenerateStripesHandler() {
        $('#stripeBtn').on('click', function (e) {
            e.preventDefault();
            
            ga('send', 'event', 'GenerateStripes', 'click', 'Try - Generate Stripes');
            var selectedCheckboxes = $('.selected-col');

            var isRandom = $('#random').is(':checked');
            if (selectedCheckboxes.length > 1) {
                var numberOfStripes = parseInt($('#stripesCount').val());
                var rowHeights = $('.rowHeightCheck:checked');
                if (selectedRowType == rowTypes.stripes) {
                    if (!isNaN(numberOfStripes) && numberOfStripes > 1 && numberOfStripes <= 1000 && rowHeights.length > 0) {
                        generateStripes(selectedCheckboxes, numberOfStripes, isRandom, rowHeights);                        
                    }
                    else {
                        $('.squaresError').hide();
                        $('.stripesError').show();
                        $("#myModal").modal();                                               
                    }
                }
                else {
                    var width = parseInt($('#squaresWidth').val());
                    var height = parseInt($('#squaresHeight').val());

                    if (!isNaN(width) && width > 0 && width <= 100 && !isNaN(height) && height > 0 && height <= 100) {
                        generateSquares(selectedCheckboxes, numberOfStripes, isRandom, rowHeights);
                    }
                    else {
                        $('.stripesError').hide();            
                        $('.squaresError').show();
                        $("#myModal").modal();                        
                    }
                }                
            }
            else {
                $("#myModal").modal();
            }

            ga('send', 'event', 'GenerateStripes', 'click', 'Ok - Generate Stripes');
        });
    }

    function generateStripes(selectedCheckboxes, totalNoOfStripes, isRandom, rowHeightsChecked) {
        
        $('.generated').hide();

        var selectedColours = selectedCheckboxes;
        var rowHeights = [];
        $.each(rowHeightsChecked, function () {
            rowHeights.push(parseInt($(this).val()));
        });
            
        var stripesHtml = "";
        var namesList = "";
        var colourIndex;
        var colourIndexMax = selectedColours.length;
        var colour;
        var previousColourIndex;

        var rowCount = 0;
        var rowHeight;
        var rowIndexMax = rowHeights.length;

        var coloursHash = colourHashes[selectedBrand];

        for (var i = 0; i <= totalNoOfStripes-1; i++) {

            // get the new row height if we have fulfilled the row height
            if (rowCount === rowHeight || rowHeight === undefined) {
                rowHeight = rowHeights[Math.floor(Math.random() * rowIndexMax)];
                rowCount = 0;
            }

            // get the next colour if we have fulfilled the row height or is the first row
            if (rowCount === 0) {
                if (isRandom) {
                    // get a random colour
                    colourIndex = Math.floor(Math.random() * colourIndexMax);

                    if (previousColourIndex != undefined) {

                        while (colourIndex === previousColourIndex) {
                            // get a new colour
                            colourIndex = Math.floor(Math.random() * colourIndexMax);
                        }
                    }
                }
                else {
                    if (colourIndex === selectedColours.length || colourIndex === undefined) { // start from the beginning
                        colourIndex = 0;
                    }
                }
            }

            colour = $(selectedColours[colourIndex]);

            var colourValue = coloursHash[colour.data('colourname')];
                        
            stripesHtml += "<tr class=\"stripe\" ><td style=\"background:#" + colourValue + "\"></td></tr>";
            namesList += colour.data("colourname") + ", ";

            previousColourIndex = colourIndex;
            rowCount++;

            if (!isRandom) {
                if (rowCount === rowHeight) { // if is not random and we have fulfilled the row height
                    if (colourIndex > selectedColours.length) {
                        colourIndex = 0;
                    }
                    else {
                        colourIndex++;
                    } 
                }
            }         
           
        }
    
        $('#stripes').html(stripesHtml);
        namesList = namesList.trim().slice(0, -1);
        $('#colourNames').html(namesList);
        $('#randomMessage').show();
        $('#stripesGenerated').show();

    }


    function generateSquares(selectedCheckboxes, totalNoOfStripes, isRandom, rowHeightsChecked) {

        $('.generated').hide();

        $('#squares').html("");
        var selectedColours = selectedCheckboxes;

        var squaresWidth = parseInt($('#squaresWidth').val());
        var squaresHeight = parseInt($('#squaresHeight').val());
        var squaresHtml = "";
        var colourIndex;
        var colourIndexMax = selectedColours.length;
        var colour;
        var previousColourIndex;
        var namesList = "";
        var namesListRow = "";

        //var rows = [];
        var squareColoursRow = [];
        var squareColourRows = [];
        var coloursHash = colourHashes[selectedBrand];
        var rows = $("<div class=\"squaresRow\" style=\"border: #494f6f 2px solid;\"></div>");
        for (var i = 0; i <= squaresHeight - 1; i++) {
            squaresHtml = $('<tr class="squareRow"></tr>');
            for (var j = 0; j <= squaresWidth - 1; j++) {
                // get the next colour            
                //if (isRandom) {
                    // get a random colour
                    colourIndex = Math.floor(Math.random() * colourIndexMax);

                    if (previousColourIndex != undefined)

                    var aboveColourIndex = previousColourIndex;
                    if (i > 0) {
                        aboveColourIndex = squareColourRows[i - 1][j];
                    }
                    while (colourIndex === previousColourIndex || colourIndex === aboveColourIndex) {
                        // get a new colour
                        colourIndex = Math.floor(Math.random() * colourIndexMax);
                    }
                //}
                //else {
                //    if (colourIndex === selectedColours.length || colourIndex === undefined) { // start from the beginning
                //        colourIndex = 0;
                //    }
                //}

                colour = $(selectedColours[colourIndex]);

                var colourValue = coloursHash[colour.data('colourname')];
                var colourName = colour.data("colourname");
                squareColoursRow.push(colourIndex);

                squaresHtml.append('<td class="square" data-colourname="' + colourName + '" style="background:#' + colourValue + ';"></td>');
                //squaresHtml.append('<td draggable="true" ondragenter="dragenter(event)" ondragstart="dragstart(event)" class="square" data-colourname="' + colourName + '" style="background:#' + colourValue + ';"></td>');
                namesListRow += colour.data("colourname") + ", ";

                if (j == (squaresWidth - 1)) {
                    rows.append(squaresHtml);
                    squaresHtml = $('<tr class="squareRow"></tr>');
                    squareColourRows.push(squareColoursRow);
                    squareColoursRow = [];

                    namesListRow = '<span style="font-weight: bold;">[ </span>' + namesListRow.trim().slice(0, -1) + '<span style="font-weight: bold;"> ] </span><br/>';
                    namesList += namesListRow;
                    namesListRow = "";

                }

                previousColourIndex = colourIndex;
            }

        }

        //var rowsHtml = "";
        //var rowHtml;
        //$.each(rows, function () {
        //    rowHtml = "<div class=\"squaresRow\">" + this + "</div>";
        //    rowsHtml += rowHtml;
        //});

        $('#squares').append(rows);
        //namesList = namesList.trim().slice(0, -1);
        $('#colourSquaresNames').html(namesList);

        $('#squaresGenerated').show();

    }

    function getRandomNextColour(selectedColours, previousColourIndex, colourIndexMax) {
                
        // get a random colour
        colourIndex = Math.floor(Math.random() * colourIndexMax);

        if (previousColourIndex != undefined) {

            while (colourIndex == previousColourIndex) {
                // get a new colour
                colourIndex = Math.floor(Math.random() * colourIndexMax);
            }
        }

        return selectedColours[colourIndex];
    }

    function addColourSwatchHandler() {
        
        // need this to get the checkbox to work as the div has a click event
        //$(":checkbox[name='colourCheckbox']").click( function(e) {
        $('body').on('click',":checkbox[name='colourCheckbox']", function(){
            colourSwatchEvent($(this));
        });

        // need this to get the label click to work as the div has a click event
        $('body').on('click','.colourLabel', function (e) {
            e.stopPropagation();
            return true;
        });
    }

    function colourSwatchEvent(thisCheckbox) {
        var colourName = thisCheckbox.data('colourname');
        if (!thisCheckbox.is(':checked')) {

            thisCheckbox.prop('checked', false);
            var selectedColours = $('.selected-colours .selected-col');
            var selectedColoursCount = selectedColours.length;
            $.each(selectedColours, function () {
                if ($(this).data('colourname') == colourName) {
                    $(this).remove();
                    if ((selectedColoursCount - 1) == 0) {
                        $('.no-cols-seleced-msg').show();
                    }
                }
            });
        }
        else {
            if (!$('.no-cols-seleced-msg').is(':hidden')) {
                $('.no-cols-seleced-msg').hide();
            }

            thisCheckbox.prop('checked', true);
            // add the colour swatch to the selected colours panel
            var value = thisCheckbox.val();
            $('.selected-colours').append('<div draggable="true" ondragenter="dragenter(event)" ondragstart="dragstart(event)" class="col-md-2 col-sm-1 col-xs-1 selected-col" data-colourname="' + colourName + '" style="background:#' + value + ';"></div>');
        }
        ga('send', 'event', 'ColourSwatch', 'click', 'Colour swatch ' + colourName);
    }
    
    function addPaletteSelectHandlers() {

        $('body').on('click', '.paletteSelect', function () {
            $('input[name="colourCheckbox"]').prop('checked', false);
            clearSelectedColours();

            var thisPalette = $(this).closest('.row');
            var paletteColours = thisPalette.find('.palette-col');
            var coloursHash = colourHashes[selectedBrand];

            $.each(paletteColours, function () {
                var colourName = $(this).data('colourname');
                $("input[type=checkbox][data-colourname='" + colourName + "']").prop("checked", true);
                
                // update the selected colours panel
                var colourValue = coloursHash[colourName];
                if (colourValue != undefined) {
                    $('.selected-colours').append('<div draggable="true" ondragenter="dragenter(event)" ondragstart="dragstart(event)" class="col-md-2 col-sm-1 col-xs-1 selected-col" data-colourname="' + colourName + '" style="background:#' + colourValue + ';"></div>');
                }
            });
            ga('send', 'event', 'ColourPaletteSelect', 'click', 'Colour palette select ' + $(this).attr('id'));
        });

    }

    function addClearButtonHandler() {
        $('body').on('click', '#clearBtn', function (e) {
            e.preventDefault();
            $('input[name="colourCheckbox"]').prop('checked', false);
            $('.selected-colours .selected-col').remove();
            $('.no-cols-seleced-msg').show();
            ga('send', 'event', 'ClearColourSelection', 'click', 'Clear colours');
        });
    }

    function addCreatePaletteButtonHandler() {
        $('#createPaletteBtn').on('click', function () {
            var selectedCheckboxes = $('input[name="colourCheckbox"]:checked');
            if (selectedCheckboxes.length > 1) {
                createPalette(selectedCheckboxes);
            }
            else {
                alert("A palette must have more than one colour");
                //$("#myModal").modal();
            }
        });
    }

    function createPalette(selectedColours) {

       paletteCount++;
       var newPaletteNo = paletteCount;

       var newPalette = $("<div class=\"row col-md-12 col-sm-12 paletteContainer\"><div class=\"col-md-1 col-sm-12 col-xs-12\">Palette " + newPaletteNo + "</div></div>");

        var colourSwatches = $("<div class=\"col-md-8 col-sm-12 col-xs-12\"></div>");
        $.each(selectedColours, function () {
            colourSwatches.append("<div class=\"col-md-2 col-sm-1 col-xs-1 palette-col\" data-colourname=\"" + $(this).data('colourname') + "\" style=\"background:#" + $(this).val() + ";\"></div>");
        });

        newPalette.append(colourSwatches);
         
        var buttons = $("<div class=\"col-md-3 col-sm-12 col-xs-12\"></div>");
        var selectBtn = $('<button type="button" class="btn btn-primary paletteSelect" >Select Palette '+newPaletteNo+'</button>');
        //var deleteBtn =$('<button type="button" class="btn btn-danger paletteDel" >X</button>');
        buttons.append(selectBtn); //.append(deleteBtn);

        newPalette.append(buttons);
        //$('#palettes .container').append(newPalette);
        $('#palettes').append(newPalette);
        $('#palettesContainer').slideDown();
    }

    //function addPaletteDeleteHandler() {

    //    $('body').on('click', '.paletteDel', function () {
    //        var ans = confirm("Are you sure");
    //        if (ans) {
    //            $(this).closest('.paletteContainer').remove()
    //        }
    //    });
    //}

    function addSlidePaletteHandler() {
        $('#slideBtn').on('click', function () {
            $('#palettes').slideToggle();
        });
    }

    function clearCurrentBrand() {
        //clear the table
        $('#colour-selection table tbody').html("");
        // clear the palettes
        $('#palettes').html("");
    }

    function clearSelectedColours() {
        $('.selected-colours .selected-col').remove();
        if (!$('.no-cols-seleced-msg').is(':hidden')) {
            $('.no-cols-seleced-msg').hide();
        }

    }

	$('#palette-tab-select').on('click', function(e){
		e.preventDefault();
		$('#palette-select-tab-link').click();
		$('.select-a-colour-panel')[0].scrollIntoView({behavior: "smooth"});
	});
	
    //$('.brandRadio').on('click', function () {
    //    var brandSelected = $(this).val();
    //    var brand = brands[brandSelected];
    //    clearCurrentBrand();

    //    setSwatches(brand);

    //    setPalettes(brand);

    //    ga('send', 'event', 'Brand', 'change', 'Brand change: ' + brandSelected);
    //});


    $('.brandPill').on('click', function (e) {
        e.preventDefault();
        $('.brandPill').removeClass('active');
        $(this).addClass('active');
        var brandSelected = $(this).attr('value');
        var brand = brands[brandSelected];
        clearCurrentBrand();
        clearSelectedColours();

        selectedBrand = brand;

        setSwatches(brand);
        setPalettes(brand);
        ga('send', 'event', 'Brand', 'change', 'Brand change: ' + brandSelected);
    });

    $('.rowTypePill').on('click', function (e) {
        e.preventDefault();
        $('.rowTypePill').removeClass('active');
        $(this).addClass('active');
        var typeSelected = $(this).attr('value');
        var rowType = rowTypes[typeSelected];

        selectedRowType = rowType;

        if (selectedRowType == rowTypes.squares)
        {
            jQuery("#stripes-form").hide();
            jQuery("#squares-form").show();
            jQuery('#generateText').text("Generate Squares!");
        }
        else
        {
            jQuery("#stripes-form").show();
            jQuery("#squares-form").hide();
            jQuery('#generateText').text("Generate Stripes!");
        }
        
        ga('send', 'event', 'RowType', 'change', 'Row type change: ' + typeSelected);
    });

    $('body').on('click', '#gotoGenStripes', function () {
        $('.stripe-extras')[0].scrollIntoView();
    });

    $('body').on('click','.paletteSelect', function() {
        var offset = $('.panel-footer').offset();
        offset.top -= 20;
        $('html, body').animate({
            scrollTop: offset.top
        },1000);
    });

    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

	
     $('body').on('click','#palette-select-tab', function () {
        ga('send', 'event', 'ColourPalette', 'click', 'Colour palette tab');
    });

    $('#colour-select-tab').on('click', function () {
        ga('send', 'event', 'ColourSelection', 'click', 'Colour selection tab');
    });

    //$('#makeRandom').on('click', function () {
    //    var isRandom = $(this).is(':checked');
    //    ga('send', 'event', 'MakeRandom', 'click', 'Random checkbox - ' + isRandom);
    //});


    $('#random').on('change', function () {
       ga('send', 'event', 'MakeRandom', 'change', 'Random');
    });

    $('#ordered').on('change', function () {
        ga('send', 'event', 'MakeOrdered', 'change', 'Ordered');
    });

    $('.rowHeightCheck').on('change', function () {
        var checked = $(this).is(':checked');
        var isChecked = "un-checked";
        if (checked) {
            isChecked = "is checked";
        }
        ga('send', 'event', 'RowHeight', 'change', 'height: ' + $(this).val() + ' - ' + isChecked);
    });

});

var source;

function isbefore(a, b) {
    if (a.parentNode == b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) {
                return true;
            }
        }
    }
    return false;
}

function dragenter(e) {
    e.target;
    if (isbefore(source, e.target)) {
        e.target.parentNode.insertBefore(source, e.target);
    }
    else {
        e.target.parentNode.insertBefore(source, e.target.nextSibling);
    }
}

function dragstart(e) {
    source = e.target;
    e.dataTransfer.effectAllowed = 'move';
}

///////////////////

//var jqxhr = $.ajax( "example.php" )
//  .done(function() {
//    alert( "success" );
//  })
