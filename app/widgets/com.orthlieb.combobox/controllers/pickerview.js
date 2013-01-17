// Load up the picker. We also populate an id entry to allow for easy back mapping on the trigger.
var choices = arguments[0].choices, id = arguments[0].id;
$.title = arguments[0].title;
$.parent = arguments[0].parent;
var rows = [], i, count = -1, selected = -1;
for (i in choices) {
	choices[i].id = i;
    rows.push(Ti.UI.createPickerRow(choices[i]));
    if (id) {	// Goofy stuff to map key to index.
    	count++;
    	if (id === i)
    		selected = count;
    }
}
$.picker.add(rows);

if (!Alloy.isTablet) {
	$.pickerview.bottom = -Ti.Platform.displayCaps.platformHeight;	// Offscreen
} else {
	$.popover.title = $.title;
	$.popover.rightNavButton = $.done;
	$.popover.leftNavButton = $.cancel;
	$.popover.width = Ti.Platform.displayCaps.platformHeight * 0.5;
}

if (selected != -1)
	$.picker.setSelectedRow(0, selected, true);

exports.open = function (choices, id) {
    function PickerButtonClick(event) {
        if (event.source.id == 'done') {
            // Trigger a change event for the picker.
            var selectedRow = $.picker.getSelectedRow(0);
            $.trigger('change', { 
                source: $, 
                type: 'change', 
                value: selectedRow.title, 
                id: selectedRow.id 
            });
        }
        // Trigger a done event for the picker.
        $.trigger('done', {
            source: $,
            type: 'done'
        });
        if (!Alloy.isTablet) {
            $.pickerview.animate({ bottom: -Ti.Platform.displayCaps.platformHeight, duration: 500 });   
            Alloy.Globals.mainWindow.remove($.pickerview);
        } else {
            $.popover.hide({ animated:true });
        }
    }

    $.cancel.on("click", PickerButtonClick);
    $.done.on("click", PickerButtonClick);
    
	if (!Alloy.isTablet) {
		Alloy.Globals.mainWindow.add($.pickerview);
		$.pickerview.animate({ bottom: 0, duration: 500 });
	} else {
		$.popover.show({ 
			animated:true,
			view: $.parent 
		 });
	}
	$.picker.selectionIndicator = true;
};


