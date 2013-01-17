var defaults = {
	editable: false,
	rightButtonMode:Ti.UI.INPUT_BUTTONMODE_ALWAYS
};

/**
 * @method init
 * Initializes the combobox.
 * @param {Object} comboBoxArgs Standard properties for a Ti.UI.TextField.
 * @param {Object} choices Dictionary of entries where the key is a selectable id and the value is an object suitable for use in a TiUIPickerRow. Must have a title entry for each item.
 * @param {String} [id] Key of the selected item in the combobox.
 */
exports.init = function (comboBoxArgs, choices, id) {
	comboBoxArgs = _.defaults(comboBoxArgs, defaults);
	_.extend($.field, comboBoxArgs);
    
    $.choices = choices;
    $.id = id;	
    
    if (OS_IOS) {
        // In IOS the combobox is a text field with a right drop down button.
        $.dropbutton.transform = Ti.UI.create2DMatrix().rotate(90);
        $.field.rightButton = $.dropbutton;
     }
};

// id is currently selected item in the combobox.	
Object.defineProperty($, "id", {
    get: function() { 
    	return $._id; 
    },
    set: function(id) { 
    	$._id = id;
    	if (OS_IOS) {
    	    // Keep text field in sync with the id change.
    		$.field.value = ($._id && $._choices && $._choices[$._id]) ? $._choices[$._id].title : ""; 		
    	} else {
    	    // Loop through the entries and convert the id based selector to an integer one.
    	    // Update the picker accordingly.
    	    if ($.picker) {
                var rows = [], i, count = -1, selected = -1;
                for (i in $.choices) {
                    count++;
                    if ($._id === i) {
                        // Found the selected item.
                        selected = count;
                    }
                }
                if (selected != -1)
                    $.picker.setSelectedRow(0, selected, true);
            }
    	}
    }
});

// Choices holds the valid choices for the combobox.
Object.defineProperty($, "choices", {
	get: function () {
		return $._choices;
	},
	set: function(choices) {
		$._choices = choices;
		if (OS_IOS) {
    		$.field.value = ($._id && $._choices && $._choices[$._id]) ? $._choices[$._id].title : ""; // Keep text field in sync.		
        } else {
            // Pickers must be destroyed and then recreated if you change their choices.
	       if ($.picker) 
	           $.field.remove($.picker);
	       $.picker = null;
	       CreatePicker(); 
	   }
	}
});

if (OS_IOS) {
    function DropButtonClick (event) {
        // Debounce in case the user clicks multiple times on the dropdown button.
        if (!$.debounce) {
            $.debounce = true;
            
            // ALLOYBUG: Would rather use createController but it is tied to the app directory and not the widget directory.
        	var pickerView = new (require("alloy/widgets/com.orthlieb.combobox/controllers/pickerview"))( { 
        		choices: $.choices, id: $.id, title: $.field.hintText, parent: $.field 
            });
        	pickerView.on('change', function (e) {
        		$.id = e.id;
        		// Trigger a change event for the combobox.
        		$.trigger('change', { 
        			source: $, 
        			type: 'change', 
        			value: e.value, 
        			id: e.id 
        		});	
        	});
        	pickerView.on('done', function(e) {
        	    $.debounce = false;
        	});
        	pickerView.open();
        }
    }
} else {
    function CreatePicker() {
        // Pickers are slightly bizarre. You can't change the choices once they are instantiated. So we
        // create the picker on the fly and destroy/recreate when the choices change.
        $.picker = Ti.UI.createPicker({ left: 0, top: 0, width: Ti.UI.FILL, height: Ti.UI.FILL });
        
        // Load up the picker. We also populate an id entry to allow for easy back mapping on the trigger.
        var rows = [], i, count = -1, selected = -1;
        for (i in $.choices) {
            $.choices[i].id = i;
            rows.push(Ti.UI.createPickerRow($.choices[i]));
            // Goofy stuff to map key to index.
            count++;
            if ($.id === i) {
                selected = count;
            }
        }
        $.picker.add(rows);

        if (selected != -1)
            $.picker.setSelectedRow(0, selected, true);

        $.picker.addEventListener('change', function(event) {
            // Trigger a change event for the picker.
            var selectedRow = $.picker.getSelectedRow(0);
            $.trigger('change', { 
                source: $, 
                type: 'change', 
                value: selectedRow.title, 
                id: selectedRow.id 
            });
        });

        $.field.add($.picker);
    }
}
