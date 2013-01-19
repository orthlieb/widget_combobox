/*
![Header](./img/header.png)
# Combobox Widget Sample

The **Combobox** widget provides a field that allows the user to pick from a list of items.   

On iPhone, this manifests itself as field that is clicked on to produce a picker control.

![iPhone Picker](./img/Screen Shot 1.png)

On iPad, clicking on the field produces a popup with a picker inside.

![iPad Popover](./img/Screen Shot 2.png)

On Android, this is a plain picker control.

![Android Picker](./img/Screen Shot 3.png)
![Android Picker](./img/Screen Shot 4.png)

##Manifest
* Version: 1.0 (stable)
* Github: https://www.github.com/orthlieb/widget_combobox
* License: [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)
* Author: Carl Orthlieb
* Supported Platforms: iOS (iPhone/iPad), Android

## Adding the Combobox Widget to Your Alloy Project

* In your application's config.json file you will want to include the following line in your dependencies:

```
"dependencies": {
    "com.orthlieb.combobox":"1.0"
}
```

*  Create a widgets directory in your app directory if it doesn't already exist.
*  Copy the widget_combobox/widgets/com.orthlieb.combobox folder into your app/widgets directory. 

## Create a Combobox in the View
You can add a Combobox to a view by *requiring* the Combobox widget. 

    <Widget id="color" src="com.orthlieb.combobox"/>

Assign it an ID that you can use in your controller. E.g. `id="color"` You can now access the Combobox via `$.color` in your controller. 

## Initializing the Combobox in the Controller

The combobox doesn't have any choices or selection until you initialize it in your controller. Before you open your window, you will want to call the combobx with the *init* method. For example:

```
var colors = { 
    white: { title: "White", rgb: "#FFFFFF" }, 
    pink: { title: "Pink", rgb: "#FF007F" },
    red: { title: "Red", rgb: "#FF0000" },
    orange: { title: "Orange", rgb: "#FF7F00" },
    brown: { title: "Brown", rgb: "#964B00" },
    yellow: { title: "Yellow", rgb: "#FFFF00" },
    gray: { title: "Gray", rgb: "#848484" },
    green: { title: "Green", rgb: "#00FF00" },
    cyan: { title: "Cyan", rgb: "#00FFFF" },
    blue: { title: "Blue", rgb: "#0000FF" }, 
    violet: { title: "Violet", rgb: "#9400D3" }
};

$.color.init({ 
    left: 40    , 
    top: 40, 
    right: 5, 
    height: Ti.UI.SIZE, 
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED, 
    hintText: 'Select a Color'
}, colors, $.color.id);
```
### Initialization Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| properties | *object* | You can use any of the properties in the [Ti.UI.TextField](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.TextField) object to position and style the combobox. |
| choices | *object* | An object containing key/value pairs of choices to present to the user. The value is an object containing a required title and any other private data you wish access to. |
| id | *string* | *Optional.* Selected id in choices to initialize the combobox with. Default: undefined. |

## Accessible Properties and Methods
| Properties | Type | Description |
| ---------- | ---- | ----------- |
| choices | *object* | *Read/Write.* An object containing key/value pairs of choices to present to the user. The value is an object containing a required title and any other private data you wish access to. |
| id | *string* | *Read/Write.* Selected id in choices to set the combobox to. |

## Future Work

There are lots of features that can be added to the Combobox:

* Supporting multiple selection.
* Allowing the user to type in a choice in addition to the choices provided in the dropdown.
* Support for other platforms like Mobile Web and Blackberry.
*/

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
    function ComboBoxClick (event) {
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
