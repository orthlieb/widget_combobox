/*
*   The Combobox widget provides a field that allows the user to pick from a list of items.   
*   See the documentation in the docs directory for more details.
*/

var defaults = {
	editable: false,
	rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS
};
var dimensions =  [ "left", "top", "right", "bottom", "center", "width", "height" ];
var properties = [ "choices", "id", "parentView" ];

// Allow parameters to be brought in through the parent tss file.
var args = _.defaults(arguments[0], defaults);
if (OS_IOS) {
    _.extend($.field, _.chain(args).omit(properties).omit(dimensions).value());
    _.extend($.container, _.pick(args, dimensions));
    _.extend($.dropButton, args.dropButton);
    $.field.rightButton = $.dropButton;
} else {
    _.extend($.field, _.omit(args, properties));    
}

/**
 * @method init
 * Initializes the combobox.
 * @param {TiUIWindow} [parentView] Parent view/window to display the picker in.
 */
exports.init = function (parentView) {
     $.parentView = parentView || Alloy.Globals.mainWindow;
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
                    // Do not use ===, it's probable that $._id will be treated as string, 
                    // so $._id will be different than i (integer)
                    if ($._id == i) {
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
    function ComboBoxClick (event) {
        // Debounce in case the user clicks multiple times on the dropdown button.
        if (!$.debounce && $.choices) {
            $.debounce = true;
            
            // ALLOYBUG: Would rather use createController but it is tied to the app directory and not the widget directory.
        	var pickerView = new (require("alloy/widgets/com.orthlieb.combobox/controllers/pickerview"))( { 
        		choices: $.choices, id: $.id, title: $.field.hintText, parentField: $.field, parentView: $.parentView 
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
        
        // Degenerate case, no choices yet. You still need to create a picker!
        if (!$._choices || !_.keys($._choices).length) {
            $._choices = { dg: { title: $.field.hintText || "Choose..." } };
        }
        
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
