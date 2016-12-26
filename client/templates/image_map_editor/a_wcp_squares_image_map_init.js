/*

TO DO:

- add lots of elements (as many as possible from Bootstrap)
- create test file with empty editor
- create test file for saving/loading editor state
- create test file for editor and content side-by-side
- create how to use guide
- create API docs

*/

// Squares
// Description: Interactive and embeddable HTML content builder.
// Author: Nikolay Dyankov
// License: MIT

/*

Usage

This script is meant to be embedded in a back-end site builder or similar project.
The usage scenario is the following (for now):

1. Add a class "squares" to the containers that should have editable content
2. Call an API to get the current state of the editor to store it.
3. Call an API to get the generated HTML content for the front-end
4. Include the "squares.css" file in the front-end
5. Insert the previously generated HTML code

*/

;(function ($, window, document, undefined) {

    var editorWindow = undefined, registeredElements = new Array(), registeredControls = new Array(), editors = new Array();

    // =========================================================================
    // [API]

    // Create an editor with previously stored settings in JSON format.
    // The "host" parameter is the root element of the editor. It contains
    // (or will contain a reference to the JS class instance).
    $.squaresInitWithSettings = function(host, settings) {
        // If the host already has an editor attached, remove the editor from the editors array
        if (host.data.editor) {
            for (var i=0; i<editors.length; i++) {
                if (editors[i].id == host.data.editor.id) {
                    editors.splice(i, 1);
                }
            }
        }

        // Init the new editor
        var squaresInstance = new Squares(host, JSON.parse(settings));
        editors.push(squaresInstance);
    };

    // Gets the current state as JS object of an editor, selected by its host
    $.squaresGetCurrentSettings = function(host) {
        return host.data.editor.generateJSON();
    };

    // Called at the end to generate the final HTML code to be inserted in the
    // front-end.
    $.squaresGenerateHTML = function(host) {
        return host.data.editor.generateHTML();
    };

    /*
    Adds a new element to the catalog.
    Required options for Element registration:
    - name: sematic name for the Element
    - iconClass: complete class name from Font Awesome
    - content(): callback function which returns HTML code to be rendered
    - (optional) extendOptions - array containing additional controls for
    the element. For example:

    */
    $.squaresRegisterElement = function(options) {
        registeredElements.push(options);
    };

    /*
    Registers a control that can be added to the element settings window
    Required options for Control registration:
    - type: int, float, text, color, etc
    - getValue: getter for the value of the control
    - setValue: setter for the value of the control
    - HTML: returns the HTML of the control
    - init: create events associated with this specific control element, etc
    */

    $.squaresRegisterControl = function(options) {
        registeredControls.push(options);
    }

    $.squaresShowEditorWindow = function(x, y) {
        editorWindow.show(x, y);
    }
    $.squaresHideEditorWindow = function() {
        editorWindow.hide();
    }
    $.squaresExtendElementDefaults = function(extendedDefaults) {
        elementDefaultSettings = $.extend(true, {}, elementDefaultSettings, extendedDefaults);
    }

    // [END API]
    // =========================================================================


    $(document).ready(function() {
        // On document load, loop over all elements with the "squares" class
        // and initialize a Squares editor on them.
        $('.squares').each(function() {
            var squaresInstance = new Squares(this);
            editors.push(squaresInstance);
            $(this).data.editor = squaresInstance;
        });

        // Create the editor window


        // Test initWithSettings
        // var s = '{"containers":[{"id":"sq-container-220041","settings":{"elements":[{"settings":{"name":"Heading","iconClass":"fa fa-header"},"options":{"heading":{"heading":"h1"}}}]}},{"id":"sq-container-352351","settings":{"elements":[{"settings":{"name":"Paragraph","iconClass":"fa fa-font"},"options":{"layout":{"column_span":"6"},"text":{"font_size":"18"}}},{"settings":{"name":"Paragraph","iconClass":"fa fa-font"},"options":{"layout":{"column_span":"6"},"style":{"background_color":"#75fa00","opacity":0.6321428571428571,"border_opacity":0.8571428571428571}}},{"settings":{"name":"Button","iconClass":"fa fa-hand-pointer-o"}}]}},{"id":"sq-container-307581","settings":{"elements":[{"settings":{"name":"Image","iconClass":"fa fa-picture-o"}},{"settings":{"name":"Video","iconClass":"fa fa-video-camera"}},{"settings":{"name":"YouTube","iconClass":"fa fa-youtube"}}]}}]}';
        // var s = '{"containers":[{"id":"sq-container-229951","settings":{"elements":[{"settings":{"name":"Heading","iconClass":"fa fa-header"}}]}}]}';
        // var s = '{"containers":[{"id":"sq-container-718651","settings":{"elements":[{"settings":{"name":"Heading","iconClass":"fa fa-header"},"options":{"heading":{"text":"Lorem Ipsum31231","heading":"h2"}}},{"settings":{"name":"Paragraph","iconClass":"fa fa-font"},"options":{"text":{"text":"Pellentes2131231ue habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."}}}]}}]}';
        // var s = '{"containers":[{"id":"sq-container-298901","settings":{"elements":[{"settings":{"name":"Heading","iconClass":"fa fa-header"}},{"settings":{"name":"Image","iconClass":"fa fa-picture-o"},"options":{"layout":{"column_span":{"lg":{"class":"sq-col-lg-6"}}}}},{"settings":{"name":"Paragraph","iconClass":"fa fa-font"},"options":{"layout":{"column_span":{"lg":{"class":"sq-col-lg-6"}}}}}]}}]}';
        // var s = '{"containers":[{"id":"sq-container-335181","settings":{"elements":[{"settings":{"name":"Heading","iconClass":"fa fa-header"},"options":{"general":{"id":"element-1-id","classes":"some-class","css":"background: red;"},"layout":{"box_model":{"margin":{"top":20,"bottom":20}},"use_grid":0},"font":{"font_family":"serif","font_size":"39","font_style":"italic","line_height":"auto","text_color":"#ffffff","text_align":"center","text_decoration":"underline","text_transform":"uppercase"},"style":{"background_color":"#f5fc58","background_opacity":0.5571428571428572,"opacity":0.29642857142857143,"box_shadow":"0 0 10px black","border_width":2,"border_style":"dashed","border_color":"#00f92b","border_opacity":0.5285714285714286,"border_radius":100},"heading":{"heading":"h1"}}},{"settings":{"name":"Paragraph","iconClass":"fa fa-paragraph"},"options":{"layout":{"column_span":{"lg":{"class":"sq-col-lg-6"}}}}},{"settings":{"name":"Image","iconClass":"fa fa-camera"},"options":{"layout":{"column_span":{"lg":{"class":"sq-col-lg-6"}}}}},{"settings":{"name":"Button","iconClass":"fa fa-link"}}]}}]}';
        // $.squaresInitWithSettings($('.squares').first(), s);
        // $.squaresInitWithSettings($('.squares').first());
    });

    // The bulk of the functionality goes here.
    // Squares is the "root" class.
    var squaresDefaultSettings = {
        containers: []
    };

    function Squares(host, settings) {
        var that = this;

        // "host" is the direct parent of the embedded editor
        this.host = $(host);
        this.id = Math.floor(Math.random() * 9999) + 1;
        this.settings = $.extend(true, {}, squaresDefaultSettings);

        this.contentRoot = undefined;
        this.root = undefined;
        this.Window = undefined;

        // Drag general flags
        this.ix = 0; // initial dragged object x
        this.iy = 0; // initial dragged object x
        this.iex = 0; // initial event x
        this.iey = 0; // initial event y

        // Drag container flags
        this.shouldStartDraggingContainer = false;
        this.didStartDraggingContainer = false;
        this.draggingContainer = false;

        // Drag container vars
        this.draggedContainerIndex = 0;
        this.draggedContainer = undefined;
        this.dummyContainer = undefined;
        this.containerReorderMap = undefined;
        this.newIndexOfDraggedContainer = 0;

        // Reorder elements
        this.shouldStartDraggingElement = false;
        this.didStartDraggingElement = false;
        this.draggingElement = false;
        this.draggedElementIndex = -1;
        this.draggedElementContainerIndex = -1;
        this.elementDragMap = undefined;
        this.dummyElement = undefined;
        this.newIndexOfDraggedElement = -1;
        this.draggedElementWidth = -1;

        // Selected Element ID
        this.selectedElementID = undefined;

        this.loadSettings(settings);
        this.init();
    };
    Squares.prototype.loadSettings = function(settings) {
        // When settings are loaded, we make sure containers and elements
        // have the correct prototype.
        if (settings) {
            // Iterate over all containers
            if (settings.containers) {
                for (var i=0; i<settings.containers.length; i++) {
                    var c = settings.containers[i];

                    // Add a container and store a reference
                    var newContainer = this.appendContainer();

                    // Iterate over all elements of the container
                    if (c.settings.elements) {
                        for (var j=0; j<c.settings.elements.length; j++) {
                            var e = c.settings.elements[j];

                            // Get the catalog index of the element with the same name
                            // and insert it in the container
                            for (var k=0; k<registeredElements.length; k++) {
                                if (e.settings.name == registeredElements[k].name) {
                                    newContainer.insertElement(k, j, e.options);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Squares.prototype.init = function () {
        // Save a reference in the host to the Editor
        this.host.data.editor = this;

        // Insert a container to hold everything
        this.host.html('');
        this.host.append('<div class="sq-root-container"></div>');
        this.root = this.host.find('.sq-root-container');

        // Insert a container to hold all the user generated content
        this.host.find('.sq-root-container').append('<div class="sq-content"></div>');
        this.contentRoot = this.host.find('.sq-content');

        this.contentRoot.attr('id', 'sq-editor-' + this.id);

        this.addUI();
        this.addEvents();
        this.redraw();

        // Editor window
        editorWindow = new EditorWindow();
        editorWindow.hide();
    };
    Squares.prototype.redraw = function () {
        // This is the global redraw function.
        // It is called only when a change in hierarchy is made.
        // It is responsible for creating the root element for each
        //      container and element, telling those objects that they have a new
        //      root element, and calling the "render" function on them.

        this.contentRoot.html('');

        for (var i=0; i<this.settings.containers.length; i++) {
            var c = this.settings.containers[i];

            // Append a container
            var html = '<div class="sq-container" data-index="'+ i +'" id="'+ c.id +'"></div>';

            this.contentRoot.append(html);

            // Set the container's "root" object
            var containerRoot = $('#' + c.id);

            // Call the render() function of the container
            c.render();
            c.appendEditorControls();

            for (var j=0; j<c.settings.elements.length; j++) {
                var e = c.settings.elements[j];

                // Append an element to the container
                var html = '<div class="sq-element" data-index="' + j + '" id="'+ e.id +'"></div>';
                containerRoot.append(html);

                // Call the render() function of the element
                e.render();
                e.appendEditorControls();
            }

            containerRoot.append('<div class="squares-clear"></div>');
        }

        // If there are no containers, hide the "elements button"
        if (this.settings.containers.length == 0) {
            this.root.find('.sq-add-elements').hide();
        } else {
            this.root.find('.sq-add-elements').show();
        }

        // Re-select the currently selected element
        if (this.selectedElementID) {
            this.selectElement(this.selectedElementID);
        }
    };
    Squares.prototype.addEvents = function() {
        var self = this;

        // Button for appending a new container
        this.host.find('.sq-add-container').off('click');
        this.host.find('.sq-add-container').on('click', function() {
            self.appendContainer();
            self.redraw();
        });

        // Delete container button
        $(document).off('mouseout', '#sq-editor-' + this.id + ' .sq-container');
        $(document).on('mouseout', '#sq-editor-' + this.id + ' .sq-container', function(e) {
            if ($(e.target).closest('.sq-container-confirm-delete').length == 0 && !$(e.target).hasClass('sq-container-confirm-delete') &&
                $(e.target).closest('.sq-container-delete').length == 0 && !$(e.target).hasClass('sq-container-delete')) {
                $('.sq-container-confirm-delete').hide();
            }
        });
        $(document).off('click', '#sq-editor-' + this.id + ' .sq-container-delete');
        $(document).on('click', '#sq-editor-' + this.id + ' .sq-container-delete', function() {
            $(this).siblings('.sq-container-confirm-delete').show();
        });
        $(document).off('click', '#sq-editor-' + this.id + ' .sq-container-confirm-delete');
        $(document).on('click', '#sq-editor-' + this.id + ' .sq-container-confirm-delete', function() {
            self.deleteContainer($(this).data('container-id'));
            self.redraw();
        });

        // Reorder containers and elements functionality

        // Containers
        $(document).off('mousedown', '#sq-editor-'+ self.id +' .sq-container-move');
        $(document).on('mousedown', '#sq-editor-'+ self.id +' .sq-container-move', function(e) {
            // If there is just one container, then don't do anything
            if (self.settings.containers.length <= 1) return;

            self.iex = e.pageX;
            self.iey = e.pageY;
            self.shouldStartDraggingContainer = true;
            self.draggedContainerIndex = $(e.target).closest('.sq-container').data('index');
            self.draggedContainer = self.host.find('.sq-container[data-index='+ self.draggedContainerIndex +']');
        });


        // Elements
        $(document).off('mousedown', '#sq-editor-'+ self.id +' .sq-element');
        $(document).on('mousedown', '#sq-editor-'+ self.id +' .sq-element', function(e) {
            // If there is just one container with one element, then don't do anything
            if (self.settings.containers.length == 1 && self.settings.containers[0].settings.elements.length == 1) return;

            self.iex = e.pageX;
            self.iey = e.pageY;
            self.shouldStartDraggingElement = true;
            self.draggedElement = $(this);
            self.draggedElementIndex = $(this).data('index');
            self.draggedElementContainerIndex = $(this).closest('.sq-container').data('index');
        });

        $(document).off('mousemove.'+ self.id);
        $(document).on('mousemove.'+ self.id, function(e) {
            // Drag container
            if (self.shouldStartDraggingContainer && !self.didStartDraggingContainer) {
                self.startDraggingContainer(e);
            }

            if (self.draggingContainer) {
                self.dragContainer(e);
            }

            // Drag element
            if (self.shouldStartDraggingElement && !self.didStartDraggingElement) {
                self.startDraggingElement(e);
            }

            if (self.draggingElement) {
                self.dragElement(e);
            }
        });
        $(document).off('mouseup.'+ self.id);
        $(document).on('mouseup.'+ self.id, function(e) {
            if (self.draggingContainer) {
                self.endDraggingContainer(e);
            }
            if (self.draggingElement) {
                self.endDraggingElement(e);
            }

            // Clean up
            self.shouldStartDraggingContainer = false;
            self.didStartDraggingContainer = false;
            self.draggingContainer = false;

            self.draggedContainerIndex = 0;
            self.draggedContainer = undefined;
            self.dummyContainer = undefined;

            self.shouldStartDraggingElement = false;
            self.didStartDraggingElement = false;
            self.draggingElement = false;
            self.draggedElementIndex = -1;
            self.draggedElementContainerIndex = -1;
        });

        // [end] Reorder containers functionality

        // Delete element button
        $(document).off('click.' + this.id, '#sq-delete-element-button');
        $(document).on('click.' + this.id, '#sq-delete-element-button', function() {
            var elementID = $(this).data('element-id');

            // Search for the element
            for (var i=0; i<self.settings.containers.length; i++) {
                var c = self.settings.containers[i];

                for (var j=0; j<c.settings.elements.length; j++) {
                    if (c.settings.elements[j].id == elementID) {
                        c.removeElementAtIndex(j);
                        self.redraw();
                    }
                }
            }
        });
    };
    Squares.prototype.startDraggingContainer = function(e) {
        if (Math.abs(e.pageX - this.iex) > 5 || Math.abs(e.pageY - this.iey) > 5) {
            this.draggingContainer = true;
            this.didStartDraggingContainer = true;

            // Create a virtual map of the current containers, where
            // every possible position of the dragged container is
            // precalculated
            this.containerReorderMap = new Array();
            var draggedContainerY = this.draggedContainer.outerHeight()/2;

            for (var i=0; i<this.settings.containers.length; i++) {
                var y = draggedContainerY;

                // Add the height of all previous containers to calculate
                // the new virtual Y position of the dragged container
                // for the current index
                for (var j=i-1; j>=0; j--) {
                    var index = j;

                    // The height of the dragged container must not be
                    // included in the calculation.
                    // If the current index is the index of the dragged
                    // container, then increase the index
                    if (j >= this.draggedContainerIndex) {
                        index++;
                    }

                    var c = this.host.find('.sq-container[data-index='+ index +']');
                    y += c.outerHeight();
                }

                this.containerReorderMap.push(y);
            }

            // Position the container absolutely
            this.ix = this.draggedContainer.position().left;
            this.iy = this.draggedContainer.position().top;

            this.draggedContainer.css({
                position: 'absolute',
                left: this.ix,
                top: this.iy,
                width: this.draggedContainer.width()
            });

            this.draggedContainer.addClass('sq-dragging');

            // Insert a dummy container
            this.draggedContainer.after('<div id="sq-dummy-container"></div>');
            this.dummyContainer = $('#sq-dummy-container');
            this.dummyContainer.css({
                width: this.draggedContainer.outerWidth(),
                height: this.draggedContainer.outerHeight()
            });
        }
    }
    Squares.prototype.dragContainer = function(e) {
        this.draggedContainer.css({
            left: this.ix + e.pageX - this.iex,
            top: this.iy + e.pageY - this.iey
        });

        var y = this.draggedContainer.position().top + this.draggedContainer.outerHeight()/2;
        var closestDeltaY = 999999;
        var closestIndex = undefined;

        for (var i=0; i<this.containerReorderMap.length; i++) {
            if (Math.abs(y - this.containerReorderMap[i]) < closestDeltaY) {
                closestDeltaY = Math.abs(y - this.containerReorderMap[i]);
                closestIndex = i;
            }
        }

        // If the closest index changed, move the dummy container to the
        // new position.
        if (closestIndex != this.newIndexOfDraggedContainer) {
            this.newIndexOfDraggedContainer = closestIndex;

            this.dummyContainer.remove();

            if (this.newIndexOfDraggedContainer < this.draggedContainerIndex) {
                this.host.find('.sq-container[data-index='+ this.newIndexOfDraggedContainer +']').before('<div id="sq-dummy-container"></div>');
            } else {
                this.host.find('.sq-container[data-index='+ this.newIndexOfDraggedContainer +']').after('<div id="sq-dummy-container"></div>');
            }

            this.dummyContainer = $('#sq-dummy-container');
            this.dummyContainer.css({
                width: this.draggedContainer.outerWidth(),
                height: this.draggedContainer.outerHeight()
            });
        }
    }
    Squares.prototype.endDraggingContainer = function(e) {
        // Switch places of containers
        if (this.draggedContainerIndex != this.newIndexOfDraggedContainer) {
            var a = this.settings.containers[this.draggedContainerIndex];
            this.settings.containers.splice(this.draggedContainerIndex, 1);
            this.settings.containers.splice(this.newIndexOfDraggedContainer, 0, a);
        }

        this.redraw();
    }
    Squares.prototype.startDraggingElement = function(e) {
        if (Math.abs(e.pageX - this.iex) > 5 || Math.abs(e.pageY - this.iey) > 5) {
            this.draggingElement = true;
            this.didStartDraggingElement = true;

            // Save the starting posiiton of the draggedElement
            this.ix = this.draggedElement.offset().left;
            this.iy = this.draggedElement.offset().top;

            // Create a virtual map of all possible positions of the element
            // in each container
            this.elementDragMap = new Array();

            var draggedElementObject = this.settings.containers[this.draggedElementContainerIndex].settings.elements[this.draggedElementIndex];

            this.draggedElementWidth = getWidthOfElementInGrid(draggedElementObject.controls['layout']['column_span'].getVal());
            this.draggedElementWidth = this.draggedElement.outerWidth();

            var dummyElementHTML = '<div id="sq-dummy-element-tmp" style="width: '+ this.draggedElementWidth +'px; height: '+ this.draggedElement.outerHeight() +'px;"></div>';

            this.draggedElement.hide();
            for (var i=0; i<this.settings.containers.length; i++) {
                var c = this.settings.containers[i];

                // If the container doesn't have any elements, insert just one
                // dummy element and move on to next container
                if (c.settings.elements.length == 0) {
                    this.host.find('.sq-container[data-index='+i+']').append(dummyElementHTML);
                    var el = $('#sq-dummy-element-tmp');
                    this.elementDragMap.push({ x: el.offset().left + el.width()/2, y: el.offset().top + el.height()/2, containerIndex: i, elementIndex: 0 });
                    $('#sq-dummy-element-tmp').remove();
                }

                for (var j=0; j<c.settings.elements.length; j++) {
                    this.host.find('.sq-container[data-index='+i+']').find('.sq-element[data-index='+j+']').before(dummyElementHTML);
                    var el = $('#sq-dummy-element-tmp');
                    this.elementDragMap.push({ x: el.offset().left + el.width()/2, y: el.offset().top + el.height()/2, containerIndex: i, elementIndex: j });
                    $('#sq-dummy-element-tmp').remove();

                    if (j == c.settings.elements.length - 1) {
                        this.host.find('.sq-container[data-index='+i+']').find('.sq-element[data-index='+j+']').after(dummyElementHTML);
                        var el = $('#sq-dummy-element-tmp');
                        this.elementDragMap.push({ x: el.offset().left + el.width()/2, y: el.offset().top + el.height()/2, containerIndex: i, elementIndex: j + 1 });
                        $('#sq-dummy-element-tmp').remove();
                    }
                }
            }

            this.draggedElement.show();

            // Insert a dummy element
            this.draggedElement.after('<div id="sq-dummy-element"><div id="sq-dummy-element-inner"></div></div>');
            this.dummyElement = $('#sq-dummy-element');
            this.dummyElement.css({
                width: this.draggedElementWidth,
                height: this.draggedElement.outerHeight(),
                margin: this.draggedElement.css('margin'),
                padding: 0
            });

            // Position the element absolutely

            var draggedElementWidth = this.draggedElement.width();
            var draggedElementHeight = this.draggedElement.height();
            var draggedElementHTML = this.draggedElement.clone().attr('id', 'sq-dragged-element').wrap('<div>').parent().html();

            this.draggedElement.hide();

            $('body').prepend(draggedElementHTML);
            this.draggedElement = $('#sq-dragged-element');

            this.draggedElement.css({
                position: 'absolute',
                left: this.ix,
                top: this.iy,
                width: draggedElementWidth,
                height: draggedElementHeight
            });
            this.draggedElement.addClass('sq-dragging');
        }
    }
    Squares.prototype.dragElement = function(e) {
        this.draggedElement.css({
            left: this.ix + e.pageX - this.iex,
            top: this.iy + e.pageY - this.iey
        });

        // Find the closest virtual position to the mouse position
        var closestIndex = 0;
        var closestDistance = 999999;

        for (var i=0; i<this.elementDragMap.length; i++) {
            var d = Math.abs(e.pageX - this.elementDragMap[i].x) + Math.abs(e.pageY - this.elementDragMap[i].y);
            if (d < closestDistance) {
                closestDistance = d;
                closestIndex = i;
            }
        }

        if (closestIndex != this.newIndexOfDraggedElement) {
            this.newIndexOfDraggedElement = closestIndex;

            // Remove the current dummy element
            $('#sq-dummy-element').remove();

            // Insert a new dummy element at the container/element index
            var containerIndex = this.elementDragMap[this.newIndexOfDraggedElement].containerIndex;
            var elementIndex = this.elementDragMap[this.newIndexOfDraggedElement].elementIndex;
            var c = this.host.find('.sq-container[data-index='+ containerIndex +']');
            // If the index of the dummy element is bigger than the number
            // of elements in that container, insert the dummy at the end
            if (this.settings.containers[containerIndex].settings.elements.length == 0) {
                c.prepend('<div id="sq-dummy-element"><div id="sq-dummy-element-inner"></div></div>');
            } else if (elementIndex == this.settings.containers[containerIndex].settings.elements.length) {
                var lastElementIndex = this.settings.containers[containerIndex].settings.elements.length - 1;
                var el = c.find('.sq-element[data-index='+ lastElementIndex +']');
                el.after('<div id="sq-dummy-element"><div id="sq-dummy-element-inner"></div></div>');
            } else {
                var el = c.find('.sq-element[data-index='+ elementIndex +']');
                el.before('<div id="sq-dummy-element"><div id="sq-dummy-element-inner"></div></div>');
            }

            this.dummyElement = $('#sq-dummy-element');
            this.dummyElement.css({
                width: this.draggedElementWidth,
                height: this.draggedElement.outerHeight(),
                margin: this.draggedElement.css('margin'),
            });
        }
    }
    Squares.prototype.endDraggingElement = function(e) {
        this.draggedElement.remove();

        // Move the element to the new index
        var newContainerIndex = this.elementDragMap[this.newIndexOfDraggedElement].containerIndex;
        var newElementIndex = this.elementDragMap[this.newIndexOfDraggedElement].elementIndex;

        var oldElementIndex = this.draggedElementIndex;
        var oldContainerIndex = this.draggedElementContainerIndex;

        var el = this.settings.containers[oldContainerIndex].settings.elements[oldElementIndex];
        this.settings.containers[oldContainerIndex].settings.elements.splice(oldElementIndex, 1);
        this.settings.containers[newContainerIndex].settings.elements.splice(newElementIndex, 0, el);

        this.redraw();
    }
    Squares.prototype.addUI = function() {
        this.appendAddContainerButton();
        this.appendAddElementsButton();
    };
    Squares.prototype.appendAddContainerButton = function() {
        var addContainerButtonHTML = '<div class="sq-add-container"><i class="fa fa-plus"></i> <span>Add Container</span></div>';

        this.root.append(addContainerButtonHTML);
    };
    Squares.prototype.appendAddElementsButton = function() {
        var addElementsButtonHTML = '<div class="sq-add-elements"><i class="fa fa-cube"></i></div>';

        this.root.append(addElementsButtonHTML);
    };
    Squares.prototype.appendContainer = function() {
        var c = new Container();
        this.settings.containers.push(c);

        return c;
    };
    Squares.prototype.deleteContainer = function(id) {
        // Find out the index of the container
        var index = 0;

        for (var i=0; i<this.settings.containers.length; i++) {
            if (this.settings.containers[i].id == id) {
                index = i;
            }
        }

        this.settings.containers.splice(index, 1);
    };
    Squares.prototype.addElement = function(containerIndex, elementIndex, elementCatalogIndex, elementControlOptions) {
        var self = this;

        // Add element to container at index
        self.settings.containers[containerIndex].insertElement(elementCatalogIndex, elementIndex, elementControlOptions);

        // Redraw
        self.redraw();
    };
    Squares.prototype.generateJSON = function() {
        var settings = $.extend(true, {}, this.settings);

        // Compress element settings
        for (var i=0; i<settings.containers.length; i++) {
            var c = $.extend(true, {}, settings.containers[i]);

            for (var j=0; j<c.settings.elements.length; j++) {
                var e = $.extend(true, {}, c.settings.elements[j]);

                e.settings = subtract(e.settings, elementDefaultSettings);
                e.settings = clean(e.settings);

                // Get the current values of the controls
                var options = e.getCurrentOptions();
                options = subtract(options, e.defaults);
                options = clean(options);

                c.settings.elements[j] = {
                    settings: e.settings,
                    options: options
                };
            }

            settings.containers[i] = c;
        }

        return JSON.stringify(settings);
    }
    Squares.prototype.generateHTML = function() {
        // function generating the HTML code that will be used in the end product

        var html = '';

        for (var i=0; i<this.settings.containers.length; i++) {
            var c = this.settings.containers[i];

            html += c.generateHTML();
        }

        // Strip slashes
        html = html.replace(/\\(.)/mg, "$1");

        // Replace line breaks with <br>
        html = html.replace(/\n/mg, "<br>");

        return html;
    }
    Squares.prototype.selectElement = function(elementID) {
        this.selectedElementID = elementID;

        $('.sq-element-selected').removeClass('sq-element-selected');
        $('#' + this.selectedElementID).addClass('sq-element-selected');
    }

    // The "Container" class servs literally as a container
    // for Element objects, similar to Bootstrap's "row" class.
    // It will have settings only for layout.

    var containerDefaultSettings = {
        elements: []
    };

    function Container() {
        // this.root is the highest element in the container's hierarchy.
        // it will contain data-index attribute, used to reference this element
        this.id = 'sq-container-' + Math.floor(Math.random() * 99999) + 1;

        this.settings = $.extend(true, {}, containerDefaultSettings);
    }
    Container.prototype.insertElement = function(elementCatalogIndex, index, options) {
        var e = new Element(registeredElements[elementCatalogIndex], options);
        this.settings.elements.splice(index, 0, e);
    }
    Container.prototype.removeElementAtIndex = function(i) {
        this.settings.elements.splice(i, 1);
        editorWindow.openFirstTab();
        editorWindow.removeElementSettings();
    }
    Container.prototype.render = function() {
        // Nothing to render for now
    }
    Container.prototype.appendEditorControls = function() {
        var html = '';
        html += '     <div class="sq-container-move"></div>';
        html += '     <div class="sq-container-delete"><i class="fa fa-times" aria-hidden="true"></i></div>';
        html += '     <div class="sq-container-confirm-delete" data-container-id="'+ this.id +'">Delete</div>';

        $('#' + this.id).append(html);
    }
    Container.prototype.generateHTML = function() {
        // function generating the HTML code that will be used in the end product

        var html = '';

        html += '<div class="squares-container">';

        for (var i=0; i<this.settings.elements.length; i++) {
            var e = this.settings.elements[i];
            html += e.generateHTML();
        }

        html += '<div class="squares-clear"></div>'
        html += '</div>';

        return html;
    }

    // The element object will represent a single piece of content.
    // Image, text, video, etc.
    // It will have settings for layout and styling

    var elementDefaultSettings = {
        name: 'Untitled Element',
        iconClass: 'fa fa-cube',
        controls: [],
        defaultControls: {
            layout: {
                box_model: {
                    name: 'Box Model',
                    type: 'box model',
                    default: {
                        margin: {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        },
                        padding: {
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 10
                        }
                    }
                },
                use_grid: {
                    name: 'Use Grid System',
                    type: 'switch',
                    default: 1
                },
                column_span: {
                    name: 'Grid Settings',
                    type: 'grid system',
                    group: 'Layout Grid',
                    default: {
                        xs: {
                            use: 0,
                            class: 'sq-col-xs-12',
                            visible: 0
                        },
                        sm: {
                            use: 0,
                            class: 'sq-col-sm-12',
                            visible: 0
                        },
                        md: {
                            use: 0,
                            class: 'sq-col-md-12',
                            visible: 1
                        },
                        lg: {
                            use: 1,
                            class: 'sq-col-lg-12',
                            visible: 1
                        },
                    }
                },
                width: {
                    name: 'Width',
                    type: 'int',
                    group: 'Layout Manual',
                    default: '100'
                },
                auto_width: {
                    name: 'Auto Width',
                    type: 'switch',
                    group: 'Layout Manual',
                    default: 1
                },
                height: {
                    name: 'Height',
                    type: 'int',
                    group: 'Layout Manual',
                    default: '100'
                },
                auto_height: {
                    name: 'Auto Height',
                    type: 'switch',
                    group: 'Layout Manual',
                    default: 1
                }
            },
            style: {
                background_color: {
                    name: 'Background Color',
                    type: 'color',
                    default: '#ffffff'
                },
                background_opacity: {
                    name: 'Background Opacity',
                    type: 'slider',
                    options: {
                        min: 0,
                        max: 1
                    },
                    default: '0'
                },
                opacity: {
                    name: 'Opacity',
                    type: 'slider',
                    options: {
                        min: 0,
                        max: 1
                    },
                    default: '1'
                },
                box_shadow: {
                    name: 'Box Shadow',
                    type: 'text',
                    default: 'none'
                },
                border_width: {
                    name: 'Border Width',
                    type: 'slider',
                    options: { min: 0, max: 20, type: 'int' },
                    default: '0'
                },
                border_style: {
                    name: 'Border Style',
                    type: 'select',
                    options: [ 'none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset' ],
                    default: 'none'
                },
                border_color: {
                    name: 'Border Color',
                    type: 'color',
                    default: '#000000'
                },
                border_opacity: {
                    name: 'Border Opacity',
                    type: 'slider',
                    options: {
                        min: 0,
                        max: 1
                    },
                    default: '1'
                },
                border_radius: {
                    name: 'Border Radius',
                    type: 'slider',
                    options: { min: 0, max: 100, type: 'int' },
                    default: '0'
                },
            },
            font: {
                font_family: {
                    name: 'Font Family',
                    type: 'text',
                    default: 'sans-serif'
                },
                font_size: {
                    name: 'Font Size',
                    type: 'text',
                    format: 'int',
                    default: '14'
                },
                font_weight: {
                    name: 'Font Weight',
                    type: 'text',
                    default: 'normal'
                },
                font_style: {
                    name: 'Font Style',
                    type: 'select',
                    options: [ 'normal', 'italic', 'oblique', 'initial', 'inherit' ],
                    default: 'normal'
                },
                line_height: {
                    name: 'Line Height',
                    type: 'text',
                    format: 'int',
                    default: '22'
                },
                text_color: {
                    name: 'Text Color',
                    type: 'color',
                    default: '#000000'
                },
                text_align: {
                    name: 'Text Align',
                    type: 'select',
                    options: ['left', 'right', 'center', 'justify', 'justify-all', 'start', 'end', 'match-parent', 'inherit', 'initial', 'unset'],
                    default: 'left'
                },
                text_decoration: {
                    name: 'Text Decoration',
                    type: 'select',
                    options: ['none', 'underline'],
                    default: 'none'
                },
                text_transform: {
                    name: 'Text Transform',
                    type: 'select',
                    options: [ 'none', 'capitalize', 'uppercase', 'lowercase', 'initial', 'inherit' ],
                    default: 'none'
                },
                text_shadow: {
                    name: 'Text Shadow',
                    type: 'text',
                    default: ''
                }
            },
            general: {
                id: {
                    name: 'ID',
                    type: 'text',
                    default: ''
                },
                classes: {
                    name: 'Classes',
                    type: 'text',
                    default: ''
                },
                css: {
                    name: 'CSS',
                    type: 'text',
                    default: ''
                }
            }
        },
        defaultControlGroupIcons: {
            general: 'fa fa-wrench',
            layout: 'fa fa-th-large',
            font: 'fa fa-font',
            style: 'fa fa-paint-brush'
        },
        content: function() {
            return '';
        }
    };

    function Element(settings, options) {
        // this.root is the highest element in the container's hierarchy.
        // it will contain data-index attribute, used to reference this element
        this.id = 'sq-element-' + Math.floor(Math.random() * 99999) + 1;

        // Settings are used only for initialization
        this.settings = $.extend(true, {}, elementDefaultSettings, settings);

        // This array will contain only the default values for each option and
        // it will be used only for compressing the generated JSON
        this.defaults = new Array();

        // Array containing all control objects
        // all options of this element should be accessed from here
        this.controls = new Array();

        // Create a reference to the content() function, so 'this' within that function
        // refers to the Element object and it has access to its controls
        this.content = this.settings.content;

        // Temporary variable until a better solution is found
        this.fontStyles = '';

        this.init(options);
    }
    Element.prototype.init = function(options) {
        // Merge the custom controls with the default controls
        this.settings.controls = $.extend(true, {}, this.settings.controls, this.settings.defaultControls);

        // Merge the custom control group icons with the default control group icons
        this.settings.controlGroupIcons = $.extend(true, {}, this.settings.controlGroupIcons, this.settings.defaultControlGroupIcons);

        // Remove the default style controls if the option is specified
        if (this.settings.useStyleControls === false) {
            this.settings.controls.style = undefined;
        }
        // Remove the default text style controls if the option is specified
        if (this.settings.useFontControls === false) {
            this.settings.controls.font = undefined;
        }

        // Create associative array from this.settings.controls containing default values
        // Used only for compression
        for (var g in this.settings.controls) {
            if (this.settings.controls.hasOwnProperty(g)) {
                var group = this.settings.controls[g];

                if (!this.defaults[g]) {
                    this.defaults[g] = {};
                }

                for (var op in group) {
                    if (group.hasOwnProperty(op)) {
                        var option = group[op];

                        this.defaults[g][op] = option.default;
                    }
                }
            }
        }

        // Create controls
        for (var g in this.settings.controls) {
            if (this.settings.controls.hasOwnProperty(g)) {
                var group = this.settings.controls[g];

                for (var op in group) {
                    if (group.hasOwnProperty(op)) {
                        var option = group[op];

                        // Get a control from the registered controls
                        // of the corresponding type
                        var controlOptions = undefined;

                        for (var i=0; i<registeredControls.length; i++) {
                            if (registeredControls[i].type == option.type) {
                                controlOptions = registeredControls[i];
                            }
                        }

                        // Check if there is a value in the init options
                        var v = option.default;

                        if (options !== undefined && options[g] !== undefined && options[g][op] !== undefined) {
                            if (typeof(options[g][op]) == 'object') {
                                v = $.extend(true, {}, option.default, options[g][op]);
                            } else {
                                v = options[g][op];
                            }
                        }

                        if (this.controls[g] === undefined) {
                            this.controls[g] = {};
                        }

                        var self = this;

                        this.controls[g][op] = new SquaresControl(controlOptions, option.name, option.group, g, option.options, function() {
                            self.updateForm();
                            self.render();
                            self.appendEditorControls();
                        });

                        this.controls[g][op].setVal(v);
                    }
                }
            }
        }
    }
    Element.prototype.getSettingsForm = function() {
        // Loop over all controls and get the HTML from each control
        // Also add a label with the name of the control
        var html = '';

        // Create tabs
        html += '<div id="sq-window-settings-sidebar">';
        var groupCount = 0;
        for (var g in this.controls) {
            var icon = '<i class="fa fa-toggle-on" aria-hidden="true"></i>';

            if (this.settings.controlGroupIcons[g]) {
                icon = '<i class="'+ this.settings.controlGroupIcons[g] +'" aria-hidden="true"></i>';
            }

            html += '<div class="sq-window-settings-sidebar-button" data-tab-index="'+ groupCount +'" data-tab-group="sq-element-settings-tab-group" data-tab-button>';
            html += '   <div class="sq-window-settings-sidebar-button-icon">'+ icon +'</div>';
            html += '   <div class="sq-window-settings-sidebar-button-title">'+ g +'</div>';
            html += '</div>';
            groupCount++;
        }

        // Append delete element tab button
        html += '<div class="sq-window-settings-sidebar-button" data-tab-index="'+ groupCount +'" data-tab-group="sq-element-settings-tab-group" data-tab-button>';
        html += '   <div class="sq-window-settings-sidebar-button-icon"><i class="fa fa-trash-o" aria-hidden="true"></i></div>';
        html += '   <div class="sq-window-settings-sidebar-button-title">Delete</div>';
        html += '</div>';

        html += '</div>';


        // Create content for each tab
        html += '<div class="sq-settings-window-content-wrap">';

        var groupCount = 0;
        for (var g in this.controls) {
            html += '<div class="sq-window-content" data-tab-content data-tab-index="'+ groupCount +'" data-tab-group="sq-element-settings-tab-group">';

            var tabGroup = this.controls[g];
            groupCount++;

            for (var c in tabGroup) {
                var control = tabGroup[c];

                html += '<div class="sq-form-control '+ control.elementClass +'">';

                if (control.customLabel) {
                    html += control.HTML();
                } else {
                    html += '<label for="'+ control.elementID +'">'+ control.name +'</label>';
                    html += control.HTML();
                }

                html += '</div>';
            }

            html += '</div>';
        }

        // Create content for the delete element tab
        html += '<div class="sq-window-content" data-tab-content data-tab-index="'+ groupCount +'" data-tab-group="sq-element-settings-tab-group">';
        html += '   <div class="sq-form-control">';
        html += '       <p>Delete Element?</p>';
        html += '       <div id="sq-delete-element-button" data-element-id="'+ this.id +'">Delete</div>';
        html += '   </div>';
        html += '</div>';

        html += '</div>';

        return html;
    }
    Element.prototype.loadOptions = function() {
        // Load the current options of the element in the settings window

        for (var g in this.controls) {
            var tabGroup = this.controls[g];

            for (var c in tabGroup) {
                var control = tabGroup[c];
                control.loadVal();
            }
        }

        this.updateForm();
    }
    Element.prototype.updateForm = function() {
        if (this.controls['layout']['use_grid'].getVal() == 1) {
            $('.' + this.controls['layout']['width'].elementClass).hide();
            $('.' + this.controls['layout']['column_span'].elementClass).show();
        } else {
            $('.' + this.controls['layout']['width'].elementClass).show();
            $('.' + this.controls['layout']['column_span'].elementClass).hide();
        }
    }
    Element.prototype.generateStyles = function() {
        var css = '';
        // =====================================================================
        // Layout
        // =====================================================================

        var o = this.controls['layout'];

        // Box Model
        if (isNumeric(o['box_model'].getVal().margin.top)) {
            css += 'margin-top: ' + o['box_model'].getVal().margin.top + 'px; ';
        }
        if (isNumeric(o['box_model'].getVal().margin.bottom)) {
            css += 'margin-bottom: ' + o['box_model'].getVal().margin.bottom + 'px; ';
        }
        if (isNumeric(o['box_model'].getVal().margin.left)) {
            css += 'margin-left: ' + o['box_model'].getVal().margin.left + 'px; ';
        }
        if (isNumeric(o['box_model'].getVal().margin.right)) {
            css += 'margin-right: ' + o['box_model'].getVal().margin.right + 'px; ';
        }

        if (isNumeric(o['box_model'].getVal().padding.top)) {
            css += 'padding-top: ' + o['box_model'].getVal().padding.top + 'px; ';
        }
        if (isNumeric(o['box_model'].getVal().padding.bottom)) {
            css += 'padding-bottom: ' + o['box_model'].getVal().padding.bottom + 'px; ';
        }
        if (isNumeric(o['box_model'].getVal().padding.left)) {
            css += 'padding-left: ' + o['box_model'].getVal().padding.left + 'px; ';
        }
        if (isNumeric(o['box_model'].getVal().padding.right)) {
            css += 'padding-right: ' + o['box_model'].getVal().padding.right + 'px; ';
        }

        if (parseInt(o['use_grid'].getVal(), 10) == 1) {
            // Grid system

        } else {
            // Width
            if (parseInt(o['auto_width'].getVal(), 10) == 1) {
                css += 'width: auto; ';
            } else {
                if (o['width'].getVal() !== '' && !isNaN(o['width'].getVal())) {
                    css += 'width: '+ o['width'].getVal() +'px; ';
                }
            }

            // Height
            if (parseInt(o['auto_height'].getVal(), 10) == 1) {
                css += 'height: auto; ';
            } else {
                if (o['height'].getVal() !== '' && !isNaN(o['height'].getVal())) {
                    css += 'height: '+ o['height'].getVal() +'px; ';
                }
            }
        }

        css += 'float: left; ';

        // =====================================================================
        // Text
        // =====================================================================
        var o = this.controls['font'];

        if (o) {
            // Font Family
            if (o['font_family'].getVal() !== '') {
                css += 'font-family: ' + o['font_family'].getVal() + '; ';
                this.fontStyles += 'font-family: ' + o['font_family'].getVal() + '; ';
            }

            // Font Size
            if (isNumeric(o['font_size'].getVal())) {
                css += 'font-size: ' + o['font_size'].getVal() + 'px; ';
                this.fontStyles += 'font-size: ' + o['font_size'].getVal() + 'px; ';
            }

            // Font Weight
            if (o['font_weight'].getVal() !== '') {
                css += 'font-weight: ' + o['font_weight'].getVal() + '; ';
                this.fontStyles += 'font-weight: ' + o['font_weight'].getVal() + '; ';
            }

            // Font Style
            if (o['font_style'].getVal() !== '') {
                css += 'font-style: ' + o['font_style'].getVal() + '; ';
                this.fontStyles += 'font-style: ' + o['font_style'].getVal() + '; ';
            }

            // Line Height
            if (isNumeric(o['line_height'].getVal())) {
                css += 'line-height: ' + o['line_height'].getVal() + 'px; ';
                this.fontStyles += 'line-height: ' + o['line_height'].getVal() + 'px; ';
            }

            // Text Color
            if (o['text_color'].getVal() !== '') {
                css += 'color: ' + o['text_color'].getVal() + '; ';
                this.fontStyles += 'color: ' + o['text_color'].getVal() + '; ';
            }

            // Text Align
            if (o['text_align'].getVal() !== '') {
                css += 'text-align: ' + o['text_align'].getVal() + '; ';
                this.fontStyles += 'text-align: ' + o['text_align'].getVal() + '; ';
            }

            // Text Decoration
            if (o['text_decoration'].getVal() !== '') {
                css += 'text-decoration: ' + o['text_decoration'].getVal() + '; ';
                this.fontStyles += 'text-decoration: ' + o['text_decoration'].getVal() + '; ';
            }

            // Text Transform
            if (o['text_transform'].getVal() !== '') {
                css += 'text-transform: ' + o['text_transform'].getVal() + '; ';
                this.fontStyles += 'text-transform: ' + o['text_transform'].getVal() + '; ';
            }

            // Text Shadow
            if (o['text_shadow'].getVal() !== '') {
                css += 'text-shadow: ' + o['text_shadow'].getVal() + '; ';
                this.fontStyles += 'text-shadow: ' + o['text_shadow'].getVal() + '; ';
            }
        }

        // =====================================================================
        // Style
        // =====================================================================
        var o = this.controls['style'];

        if (o) {
            // Background Color
            var c_bg = hexToRgb(o['background_color'].getVal());
            css += 'background-color: rgba('+ c_bg.r +', '+ c_bg.g +', '+ c_bg.b +', '+ o['background_opacity'].getVal() +'); ';

            // Opacity
            if (isNumeric(o['opacity'].getVal())) {
                css += 'opacity: ' + o['opacity'].getVal() + '; ';
            }

            // Box Shadow
            if (o['box_shadow'].getVal() !== '') {
                css += 'box-shadow: ' + o['box_shadow'].getVal() + '; ';
            }

            // Border Width
            if (isNumeric(o['border_width'].getVal())) {
                css += 'border-width: ' + o['border_width'].getVal() + 'px; ';
            }

            // Border Style
            if (o['border_style'].getVal() !== '') {
                css += 'border-style: ' + o['border_style'].getVal() + '; ';
            }

            // Border Color
            var c_bg = hexToRgb(o['border_color'].getVal());
            css += 'border-color: rgba('+ c_bg.r +', '+ c_bg.g +', '+ c_bg.b +', '+ o['border_opacity'].getVal() +'); ';

            // Border Radius
            if (isNumeric(o['border_radius'].getVal())) {
                css += 'border-radius: ' + o['border_radius'].getVal() + 'px; ';
            }
        }

        return css;
    }
    Element.prototype.generateLayoutClass = function() {
        var o = this.controls['layout'];

        if (parseInt(o['use_grid'].getVal(), 10) == 1) {
            var classes = '';
            var v = o['column_span'].getVal();

            if (parseInt(v.xs.use, 10) == 1) {
                classes += v.xs.class + ' ';

                if (parseInt(v.xs.visible, 10) == 0) {
                    classes += 'sq-hidden-xs ';
                }
            }
            if (parseInt(v.sm.use, 10) == 1) {
                classes += v.sm.class + ' ';

                if (parseInt(v.sm.visible, 10) == 0) {
                    classes += 'sq-hidden-sm ';
                }
            }
            if (parseInt(v.md.use, 10) == 1) {
                classes += v.md.class + ' ';

                if (parseInt(v.md.visible, 10) == 0) {
                    classes += 'sq-hidden-md ';
                }
            }
            if (parseInt(v.lg.use, 10) == 1) {
                classes += v.lg.class + ' ';

                if (parseInt(v.lg.visible, 10) == 0) {
                    classes += 'sq-hidden-lg ';
                }
            }
            return classes;
        } else {
            return '';
        }
    }
    Element.prototype.render = function() {
        // Preserve selection
        var selected = false;
        if ($('#' + this.id).hasClass('sq-element-selected')) {
            selected = true;
        }

        // Update the element's style
        $('#' + this.id).attr('style', this.generateStyles());

        // Add layout classes to the element
        $('#' + this.id).attr('class', 'sq-element ' + this.generateLayoutClass());

        // Update the element's user set content
        $('#' + this.id).html(this.content());

        if (selected) {
            $('#' + this.id).addClass('sq-element-selected');
        }
    }
    Element.prototype.appendEditorControls = function() {
        var html = '';

        html += '     <div class="sq-element-controls">';
        html += '         <div class="sq-element-control-drag"></div>';
        html += '     </div>';

        $('#' + this.id).append(html);
    }
    Element.prototype.getCurrentOptions = function() {
        // Loop over all controls and put their values in an associative array

        var options = {};

        for (var controlGroupName in this.controls) {
            for (var controlName in this.controls[controlGroupName]) {
                var c = this.controls[controlGroupName][controlName];
                if (!options[controlGroupName]) {
                    options[controlGroupName] = {};
                }

                options[controlGroupName][controlName] = c.getVal();
            }
        }

        return options;
    }
    Element.prototype.generateHTML = function() {
        // function generating the HTML code that will be used in the end product

        var html = '';

        html += '<div id="'+ this.id +'" class="squares-element '+ this.generateLayoutClass() +'" style="'+ this.generateStyles() +'">';
        html += this.content();
        html += '</div>';

        return html;
    }

    function EditorWindow() {
        this.root = undefined;
        this.id = Math.floor(Math.random() * 10000) + 1;

        this.visible = false;

        // flags for dragging the window
        this.shouldStartDragging = false;
        this.didStartDragging = false;
        this.dragging = false;
        this.iex = 0; // initial event x
        this.iey = 0; // initial event y
        this.ix = 0; // initial window x
        this.iy = 0; // initial window y

        this.init();
        this.events();
        this.show(600, 100);
    }
    EditorWindow.prototype.init = function() {
        var WindowHTML = '';

        WindowHTML += ' <div class="sq-window" id="sq-window-'+ this.id +'">';
        WindowHTML += '     <div class="sq-window-header">';
        WindowHTML += '         <div class="sq-window-main-nav">';
        WindowHTML += '             <div id="sq-window-main-nav-button-elements" class="sq-window-main-nav-button" data-tab-group="sq-window-main-tab-group" data-tab-index="0" data-tab-button><i class="fa fa-cube" aria-hidden="true"></i></div>';
        WindowHTML += '             <div id="sq-window-main-nav-button-settings" class="sq-window-main-nav-button" data-tab-group="sq-window-main-tab-group" data-tab-index="1" data-tab-button><i class="fa fa-cog" aria-hidden="true"></i></div>';
        WindowHTML += '         </div>';
        WindowHTML += '         <div class="sq-window-close"><i class="fa fa-times"></i></div>';
        WindowHTML += '     </div>';
        WindowHTML += '     <div class="sq-window-container">';

        // Elements tab
        WindowHTML += '         <div class="sq-window-tab-content" data-tab-group="sq-window-main-tab-group" data-tab-index="0" data-tab-content id="sq-window-elements-tab-content">';
        WindowHTML += '             <div class="sq-window-main-tab-header">';
        WindowHTML += '                 <h1>Elements</h1>';
        WindowHTML += '                 <div id="sq-window-elements-search">';
        WindowHTML += '                     <i class="fa fa-search" aria-hidden="true"></i>';
        WindowHTML += '                     <input type="text" id="sq-window-elements-search-input">';
        WindowHTML += '                 </div>';
        WindowHTML += '             </div>';
        WindowHTML += '             <div class="sq-window-content">';
        WindowHTML += '                 <div id="sq-no-elements-found">No elements found.</div>';
        for (var i=0; i<registeredElements.length; i++) {
            WindowHTML += '             <div class="sq-element-thumb" data-index="' + i + '">';
            WindowHTML += '                 <div class="sq-element-thumb-icon">';
            WindowHTML += '                     <i class="' + registeredElements[i].iconClass + '"></i>';
            WindowHTML += '                 </div>';
            WindowHTML += '                 <div class="sq-element-thumb-title">';
            WindowHTML += '                     <h2>'+ registeredElements[i].name +'</h2>';
            WindowHTML += '                 </div>';
            WindowHTML += '             </div>';
        }
        WindowHTML += '                 <div class="squares-clear"></div>';
        WindowHTML += '             </div>';
        WindowHTML += '         </div>';

        // Settings tab
        WindowHTML += '         <div class="sq-window-tab-content" data-tab-group="sq-window-main-tab-group" data-tab-index="1" data-tab-content id="sq-window-settings-tab-content">';
        WindowHTML += '             <div class="sq-window-main-tab-header"><h1>Settings</h1></div>';
        WindowHTML += '             <div id="sq-window-settings-tab-inner-content"></div>';
        WindowHTML += '         </div>';

        WindowHTML += '     </div>';
        WindowHTML += ' </div>';

        if ($('.sq-windows-root').length == 0) {
            $('body').prepend('<div class="sq-windows-root"></div>');
        }

        $('.sq-windows-root').html(WindowHTML);

        this.root = $('#sq-window-' + this.id);

        this.openFirstTab();
        this.removeElementSettings();
    }
    EditorWindow.prototype.events = function() {
        var self = this;

        // Search field
        $(document).on('keyup', '#sq-window-elements-search-input', function() {
            var v = $(this).val().toLowerCase();

            var elementsFound = false;

            $('.sq-element-thumb').each(function() {
                var elementTitle = $(this).find('h2').html();

                if (elementTitle.toLowerCase().indexOf(v) >= 0) {
                    elementsFound = true;
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });

            if (!elementsFound) {
                $('#sq-no-elements-found').show();
            } else {
                $('#sq-no-elements-found').hide();
            }
        });

        // Open the editor window when click on element
        $(document).on('click', '.sq-element', function() {
            if (!self.visible) {
                var x = $(this).offset().left + $(this).closest('.sq-root-container').width() + 40;
                var y = $(this).offset().top;
                self.show(x, y);
            }

            var editor = $(this).closest('.sq-root-container').data.editor;
            var containerIndex = $(this).closest('.sq-container').data('index');
            var elementIndex = $(this).data('index');
            var el = editor.settings.containers[containerIndex].settings.elements[elementIndex];

            // Open the settings tab
            $('#sq-window-elements-tab-content').hide();
            $('#sq-window-settings-tab-content').show();

            // Highlight the settings tab
            $('.sq-window-main-nav-button').removeClass('active');
            $('#sq-window-main-nav-button-settings').addClass('active');

            // Load the element settings
            $('#sq-window-settings-tab-inner-content').html(el.getSettingsForm());
            el.loadOptions();

            // Go to the first tab of the settings
            $('[data-tab-content][data-tab-group="sq-element-settings-tab-group"]').hide();
            $('[data-tab-content][data-tab-group="sq-element-settings-tab-group"][data-tab-index="0"]').show();

            // Highlight the first tab button
            $('[data-tab-button][data-tab-group="sq-element-settings-tab-group"]').removeClass('active').first().addClass('active');

            // Select the element
            editor.selectElement(el.id);
        });

        // Open the window when clicked on the add elements button
        $(document).on('click', '.sq-add-elements', function() {
            if (!self.visible) {
                var x = $(this).closest('.sq-root-container').offset().left + $(this).closest('.sq-root-container').width() + 40;
                var y = $(this).closest('.sq-root-container').offset().top;
                self.show(x + 20, y + 20);
            }

            // Show the elements tab
            $('#sq-window-elements-tab-content').show();
            $('#sq-window-settings-tab-content').hide();

            // Tabs
            $('.sq-window-main-nav-button').removeClass('active');
            $('#sq-window-main-nav-button-elements').addClass('active');
        });

        // Generic Tab functionality
        $(document).on('click', '[data-tab-button]', function() {
            var index = $(this).data('tab-index');
            var tabGroup = $(this).data('tab-group');

            $('[data-tab-button][data-tab-group="'+ tabGroup +'"]').removeClass('active');
            $(this).addClass('active');

            $('[data-tab-content][data-tab-group="'+ tabGroup +'"]').hide();
            $('[data-tab-content][data-tab-group="'+ tabGroup +'"][data-tab-index="'+ index +'"]').show();
        });

        // Button for closing the elements window
        self.root.find('.sq-window-close').on('click', function(e) {
            self.hide();
        });

        // Move the window by dragging its header
        self.root.find('.sq-window-header').off('mousedown');
        self.root.find('.sq-window-header').on('mousedown', function(e) {
            if ($(e.target).hasClass('sq-window-close') || $(e.target).closest('.sq-window-close').length > 0) return;

            self.shouldStartDragging = true;

            self.iex = e.pageX;
            self.iey = e.pageY;

            $('.sq-window-active').removeClass('sq-window-active');
            self.root.addClass('sq-window-active');
        });
        $(document).on('mousemove.' + self.id, function(e) {
            // Start moving the window only if the user drags it by 5 pixels or
            // more, to prevent accidental drag
            if (self.shouldStartDragging && !self.didStartDragging) {
                if (Math.abs(e.pageX - self.iex) > 5 || Math.abs(e.pageY - self.iey) > 5) {
                    self.ix = self.root.offset().left;
                    self.iy = self.root.offset().top;
                    self.dragging = true;
                    self.didStartDragging = true;
                }

            }

            if (self.dragging) {
                self.root.css({
                    left: self.ix + e.pageX - self.iex,
                    top: self.iy + e.pageY - self.iey,
                });
            }
        });

        $(document).on('mouseup.' + self.id, function(e) {
            self.shouldStartDragging = false;
            self.didStartDragging = false;
            self.dragging = false;
        });

        // =====================================================================
        // Needs tidying up
        // Drag elements from window to container functionality
        var shouldStartDraggingElementToContainer = false,
        didStartDraggingElementToContainer = false,
        draggingElementToContainer = false,
        virtualIndexOfDraggedElement = -1,
        draggedElementFromWindowCatalogIndex = -1,
        thumbElWhenDraggingFromWindow = undefined,
        targetEditor = undefined,
        dummyElementAtMouse = undefined,
        elementDragMap = undefined;
        var iex = 0, iey = 0, ix = 0, iy = 0;

        $(document).off('mousedown', '.sq-element-thumb');
        $(document).on('mousedown', '.sq-element-thumb', function(e) {
            shouldStartDraggingElementToContainer = true;

            iex = e.pageX;
            iey = e.pageY;

            thumbElWhenDraggingFromWindow = $(this);
        });
        $(document).off('mousemove.elementFromWindow');
        $(document).on('mousemove.elementFromWindow', function(e) {
            if (shouldStartDraggingElementToContainer && !didStartDraggingElementToContainer) {
                if (Math.abs(e.pageX - iex) > 5 || Math.abs(e.pageY - iey) > 5) {
                    didStartDraggingElementToContainer = true;

                    // Get contents and position of the element thumb
                    draggedElementFromWindowCatalogIndex = thumbElWhenDraggingFromWindow.data('index');

                    var contents = thumbElWhenDraggingFromWindow.html();

                    ix = thumbElWhenDraggingFromWindow.offset().left;
                    iy = thumbElWhenDraggingFromWindow.offset().top;

                    // Create a copy of the thumb and place it at mouse location
                    $('body').prepend('<div id="sq-dragged-element-clone" class="sq-element-thumb">' + contents + '</div>');
                    dummyElementAtMouse = $('#sq-dragged-element-clone');
                    dummyElementAtMouse.css({
                        left: ix,
                        top: iy,
                        margin: 0
                    });

                    // Create a virtual map of all possible positions of the
                    // dragged element in all editors
                    elementDragMap = new Array();

                    for (var k=0; k<editors.length; k++) {
                        var editor = editors[k];

                        for (var i=0; i<editor.settings.containers.length; i++) {
                            var coords = { x: 0, y: 0 };
                            var c = editor.host.find('.sq-container[data-index='+ i +']');

                            // if the container has no elements, add one dummy element
                            // and move on to next container
                            if (editor.settings.containers[i].settings.elements.length == 0) {
                                c.append('<div id="sq-dummy-element-dragging-from-window-tmp"></div>');
                                var x = $('#sq-dummy-element-dragging-from-window-tmp').offset().left + $('#sq-dummy-element-dragging-from-window-tmp').outerWidth()/2;
                                var y = $('#sq-dummy-element-dragging-from-window-tmp').offset().top + $('#sq-dummy-element-dragging-from-window-tmp').outerHeight()/2;
                                elementDragMap.push({ x: x, y: y, elementIndex: 0, containerIndex: i, editorIndex: k });
                                $('#sq-dummy-element-dragging-from-window-tmp').remove();
                            }

                            for (var j=0; j<editor.settings.containers[i].settings.elements.length; j++) {
                                var el = c.find('.sq-element[data-index='+ j +']');

                                el.before('<div id="sq-dummy-element-dragging-from-window-tmp"></div>');

                                var x = $('#sq-dummy-element-dragging-from-window-tmp').offset().left + $('#sq-dummy-element-dragging-from-window-tmp').outerWidth()/2;
                                var y = $('#sq-dummy-element-dragging-from-window-tmp').offset().top + $('#sq-dummy-element-dragging-from-window-tmp').outerHeight()/2;
                                elementDragMap.push({ x: x, y: y, elementIndex: j, containerIndex: i, editorIndex: k });
                                $('#sq-dummy-element-dragging-from-window-tmp').remove();

                                // When we reach the end of the elements array, add a dummy element after the last element
                                if (j == editor.settings.containers[i].settings.elements.length - 1) {
                                    el.after('<div id="sq-dummy-element-dragging-from-window-tmp"></div>');
                                    var x = $('#sq-dummy-element-dragging-from-window-tmp').offset().left + $('#sq-dummy-element-dragging-from-window-tmp').outerWidth()/2;
                                    var y = $('#sq-dummy-element-dragging-from-window-tmp').offset().top + $('#sq-dummy-element-dragging-from-window-tmp').outerHeight()/2;
                                    elementDragMap.push({ x: x, y: y, elementIndex: j+1, containerIndex: i, editorIndex: k });
                                    $('#sq-dummy-element-dragging-from-window-tmp').remove();
                                }
                            }
                        }
                    }

                    if (elementDragMap.length == 0) {
                        // no valid containers found
                        dummyElementAtMouse.remove();
                        didStartDraggingElementToContainer = false;
                        shouldStartDraggingElementToContainer = false;
                        didStartDraggingElementToContainer = false;
                        draggingElementToContainer = false;
                        virtualIndexOfDraggedElement = -1;
                    }
                }
            }

            if (didStartDraggingElementToContainer) {
                // Update dummy element at mouse position
                dummyElementAtMouse.css({
                    left: ix + e.pageX - iex,
                    top: iy + e.pageY - iey
                });

                // Find the closest virtual position to the mouse position
                var closestIndex = 0;
                var closestDistance = 999999;

                for (var i=0; i<elementDragMap.length; i++) {
                    var d = Math.abs(e.pageX - elementDragMap[i].x) + Math.abs(e.pageY - elementDragMap[i].y);
                    if (d < closestDistance) {
                        closestDistance = d;
                        closestIndex = i;
                    }
                }

                // If the closest index is different than the current index,
                // remove the dummy element and insert a new one and the new index
                if (closestIndex != virtualIndexOfDraggedElement) {
                    virtualIndexOfDraggedElement = closestIndex;

                    // Remove the current dummy element
                    $('#sq-dummy-element-dragging-from-window').remove();

                    // Insert a new dummy element at the container/element index
                    var containerIndex = elementDragMap[virtualIndexOfDraggedElement].containerIndex;
                    var elementIndex = elementDragMap[virtualIndexOfDraggedElement].elementIndex;
                    var editorIndex = elementDragMap[virtualIndexOfDraggedElement].editorIndex;
                    var c = editors[editorIndex].host.find('.sq-container[data-index='+ containerIndex +']');

                    // If the index of the dummy element is bigger than the number
                    // of elements in that container, insert the dummy at the end
                    if (editors[editorIndex].settings.containers[containerIndex].settings.elements.length == 0) {
                        c.prepend('<div id="sq-dummy-element-dragging-from-window"><div id="sq-dummy-element-dragging-from-window-inner"></div></div>');
                    } else if (elementIndex == editors[editorIndex].settings.containers[containerIndex].settings.elements.length) {
                        var lastElementIndex = editors[editorIndex].settings.containers[containerIndex].settings.elements.length - 1;
                        var e = c.find('.sq-element[data-index='+ lastElementIndex +']');
                        e.after('<div id="sq-dummy-element-dragging-from-window"><div id="sq-dummy-element-dragging-from-window-inner"></div></div>');
                    } else {
                        var e = c.find('.sq-element[data-index='+ elementIndex +']');
                        e.before('<div id="sq-dummy-element-dragging-from-window"><div id="sq-dummy-element-dragging-from-window-inner"></div></div>');
                    }
                }
            }

        });
        $(document).off('mouseup.elementFromWindow');
        $(document).on('mouseup.elementFromWindow', function() {
            if (didStartDraggingElementToContainer) {
                // Remove element clone (at mouse position)
                dummyElementAtMouse.remove();

                var containerIndex = elementDragMap[virtualIndexOfDraggedElement].containerIndex;
                var elementIndex = elementDragMap[virtualIndexOfDraggedElement].elementIndex;
                var editorIndex = elementDragMap[virtualIndexOfDraggedElement].editorIndex;

                editors[editorIndex].addElement(containerIndex, elementIndex, draggedElementFromWindowCatalogIndex);
            }

            shouldStartDraggingElementToContainer = false;
            didStartDraggingElementToContainer = false;
            draggingElementToContainer = false;
            virtualIndexOfDraggedElement = -1;
        });

        // [end] Drag elements from window to container functionality
    }
    EditorWindow.prototype.show = function(x, y) {
        this.visible = true;
        this.root.show();

        if (x !== undefined && y !== undefined) {
            this.root.css({
                left: x,
                top: y
            });
        }
    }
    EditorWindow.prototype.hide = function() {
        this.visible = false;
        this.root.hide();
    }
    EditorWindow.prototype.openFirstTab = function() {
        // Open the first tab
        $('.sq-window-main-nav-button').removeClass('active');
        $('#sq-window-main-nav-button-elements').addClass('active');
        $('[data-tab-content][data-tab-group="sq-window-main-tab-group"]').hide();
        $('[data-tab-content][data-tab-group="sq-window-main-tab-group"][data-tab-index="0"]').show();
    }
    EditorWindow.prototype.removeElementSettings = function() {
        $('#sq-window-settings-tab-inner-content').html('<div id="sq-window-settings-tab-no-element">No element selected. To create an element, open the Elements tab and drag an element into a container.</div>');
    }

    function SquaresControl(s, name, group, tabGroup, options, valueUpdated) {
        // The 's' argument is the array coming from the registeredControls array
        // Automatically generated at the time of object creation
        this.id = Math.floor(Math.random() * 9999) + 1;
        this.elementID = 'sq-control-' + this.id;
        this.elementClass = 'sq-element-option-group';

        // Settings coming from the registered controls catalog
        // referenced in the 'this' variable, so 'this' can be accessed within
        // those functions (in case of validate(), HTML(), events(), etc)
        // These settings are also common in all controls
        this.type = s.type;
        this.getValue = s.getValue;
        this.setValue = s.setValue;
        this.HTML = s.HTML;

        // These variables are specific for each individual control
        this.name = name;
        this.options = options;
        this.group = group;
        this.tabGroup = tabGroup;

        // Private property, must be accessed only via setter and getter
        this._value = undefined;

        // Update this.elementClass
        if (this.group !== undefined) {
            this.elementClass = 'sq-element-option-group-' + this.group.toLowerCase().replace(/\s/g, '-');
        }

        // Launch the events provided from the settings
        this.init = s.init;
        this.init();

        // Create a callback function for when the control updates its value
        this.valueUpdated = valueUpdated;

        // Inline label flag
        this.customLabel = s.customLabel;
    }
    SquaresControl.prototype.getVal = function() {
        return this._value;
    }
    SquaresControl.prototype.setVal = function(v) {
        this._value = v;

        try {
            this.setValue(v);
        } catch (err) {

        }
    }
    SquaresControl.prototype.loadVal = function(v) {
        this.setValue(this._value);
    }
    SquaresControl.prototype.valueChanged = function() {
        // Re-sets the control to its stored value
        this._value = this.getValue();
        this.valueUpdated();
    }

    // Utility
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    function subtract(a, b) {
        var r = {};

        // For each property of 'b'
        // if it's different than the corresponding property of 'a'
        // place it in 'r'
        for (var key in b) {
            if (typeof(b[key]) == 'object') {
                if (!a[key]) a[key] = {};
                r[key] = subtract(a[key], b[key]);
            } else {
                if (b[key] != a[key]) {
                    r[key] = a[key];
                }
            }
        }

        return r;
    }
    function clean(a) {
        var r = undefined;

        // Check if 'a' is an object
        if (typeof(a) == 'object') {
            // If 'a' is an object, check if it's empty and set to undefined if true
            if (isEmpty(a)) {
                r = undefined;
            } else {
                // If 'a' is NOT empty, iterate over each of its properties
                // and recursively clean
                for (var key in a) {
                    var cleaned = clean(a[key]);

                    if (cleaned !== undefined) {
                        if (r === undefined) r = {};

                        r[key] = cleaned;
                    }
                }
            }
        } else {
            r = a;
        }

        return r;
    }
    function isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
            return false;
        }

        return true && JSON.stringify(obj) === JSON.stringify({});
    }
    function getWidthOfElementInGrid(span) {
        var columnWidth = 8.33333333;
        var elementWidth = columnWidth * span;

        return elementWidth + '%';
    }
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

})(jQuery, window, document);

// to do:

/*
    - add error message when image URL is wrong
*/

;(function ( $, window, document, undefined ) {
    var editor = undefined;
    var settings = undefined;
    var sliderDragging = false;
    var copiedStyles = undefined;
    var indexOfShapeToDelete = 0;

    // Preview settings, Used when the tour launches
    var preview_settings = {"id":4333,"editor":{"previewMode":0,"selected_shape":"spot-8364","tool":"poly"},"general":{"name":"Demo","width":1280,"height":776,"responsive":1,"sticky_tooltips":0,"constrain_tooltips":1,"image_url":"https://webcraftplugins.com/uploads/image-map-pro/demo.jpg","tooltip_animation":"grow","pageload_animation":"none","fullscreen_tooltips":"none","late_initialization":0},"spots":[{"id":"spot-8364","type":"spot","x":26,"y":19.8,"width":44,"height":44,"actions":{"mouseover":"show-tooltip","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#000000","fill_opacity":0.4,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":1,"icon_type":"library","icon_svg_path":"M409.81,160.113C409.79,71.684,338.136,0,249.725,0C161.276,0,89.583,71.684,89.583,160.113     c0,76.325,119.274,280.238,151.955,334.638c1.72,2.882,4.826,4.641,8.178,4.641c3.351,0,6.468-1.759,8.168-4.631     C290.545,440.361,409.81,236.438,409.81,160.113z M249.716,283.999c-68.303,0-123.915-55.573-123.915-123.895     c0-68.313,55.592-123.895,123.915-123.895s123.876,55.582,123.876,123.895S318.029,283.999,249.716,283.999z","icon_svg_viewbox":"0 0 499.392 499.392","icon_fill":"#000000","icon_url":"","icon_is_pin":1,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffffff","fill_opacity":0.4,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#ffcd00"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"left","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Mouseover the building below!","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[],"vs":[]},{"id":"poly-2893","type":"poly","x":15.75744680851064,"y":22.26270172030207,"width":22.844376899696048,"height":65.97720051389715,"actions":{"mouseover":"show-tooltip","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":450,"auto_width":0},"tooltip_content":{"content_type":"content-builder","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-359931\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Heading\",\"iconClass\":\"fa fa-header\"},\"options\":{\"heading\":{\"text\":\"Content Builder for the Tooltips\"}}},{\"settings\":{\"name\":\"Image\",\"iconClass\":\"fa fa-camera\"},\"options\":{\"layout\":{\"column_span\":{\"lg\":{\"class\":\"col-lg-6\"}}}}},{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"},\"options\":{\"text\":{\"text\":\"Image Map Pro 3.0 comes with a fully featured content builder that allows you to add rich content to your tooltips. Images, video, buttons, responsive grid system - it has it all!\"},\"layout\":{\"column_span\":{\"lg\":{\"class\":\"col-lg-6\"}}}}},{\"settings\":{\"name\":\"Button\",\"iconClass\":\"fa fa-link\"},\"options\":{\"button\":{\"text\":\"Example Button!\",\"display\":\"block\"}}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-273621\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><h3 id=\"\" style=\"\" class=\"\">Content Builder for the Tooltips</h3></div><div id=\"sq-element-241571\" class=\"squares-element col-lg-6 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><img src=\"https://webcraftplugins.com/uploads/placeholder_image.png\" id=\"\" style=\"\" class=\"\"></div><div id=\"sq-element-574821\" class=\"squares-element col-lg-6 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Image Map Pro 3.0 comes with a fully featured content builder that allows you to add rich content to your tooltips. Images, video, buttons, responsive grid system - it has it all!</p></div><div id=\"sq-element-33221\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><div id=\"\" style=\"\" class=\"\"><a href=\"#\" style=\"display: block; height: 44px; line-height: 44px; background-color: #2196f3; color: #ffffff; border-radius: 10px; padding-left: 20px; padding-right: 20px; \"  class=\"squares-button\">Example Button!</a></div></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":2.8712844939993056,"y":100},{"x":3.536549668697936,"y":95.06062700400813},{"x":0.8754889699034004,"y":95.06062700400813},{"x":0,"y":47.12265849973005},{"x":0.7847960076976461,"y":23.53692508155694},{"x":3.9088248123944527,"y":17.15586649440026},{"x":12.222274912965194,"y":15.76484496015944},{"x":15.056281433779493,"y":7.219083609526608},{"x":19.502913861465178,"y":6.533930832820084},{"x":19.502913861465178,"y":4.254220219285366},{"x":26.155565608451525,"y":1.9745096057506475},{"x":33.47348253013651,"y":0.8346542989832882},{"x":38.79560392772559,"y":0.4547025300608352},{"x":44.78299050001331,"y":0},{"x":52.766172596396935,"y":1.8997588446122655},{"x":59.41882434338327,"y":0.7599035378449062},{"x":64.49612815668326,"y":2.2028938646528204},{"x":70.93855610846484,"y":3.267998410281798},{"x":70.30788472285052,"y":9.951430765378646},{"x":85.60898374091914,"y":7.900104410746106},{"x":100,"y":12.231141378913366},{"x":99.33473482530137,"y":71.50361733081603},{"x":94.67787860241093,"y":71.1236655618936},{"x":94.67787860241093,"y":73.02342440650584},{"x":74.71992336145188,"y":73.02342440650584},{"x":74.71992336145188,"y":99.62004823107758}],"vs":[[210.09118541033433,684.7416413373859],[212.03647416413372,659.4528875379939],[204.25531914893617,659.4528875379939],[201.69531914893616,414.0186018237082],[203.99012564995655,293.2636383750531],[213.12503655683665,260.593698339942],[237.43423174842115,253.4719035012826],[245.72109422492397,209.7190516717325],[258.7234042553191,206.21118541033434],[258.7234042553191,194.53945288753798],[278.17629179331306,182.86772036474164],[299.57446808510633,177.03185410334345],[315.1367781155015,175.08656534954406],[332.64437689969606,172.75856534954406],[355.9878419452888,182.48500911854103],[375.44072948328267,176.64914285714283],[390.2871732522796,184.03700911854102],[409.12534954407295,189.49016413373857],[407.2812158054711,223.70820668693008],[452.0228571428571,213.20576291793313],[494.10334346504555,235.37993920972644],[492.15805471124617,538.8449848024316],[478.54103343465044,536.8996960486323],[478.54103343465044,546.6261398176291],[420.18237082066867,546.6261398176291],[420.18237082066867,682.7963525835867]]},{"id":"poly-974","type":"poly","x":41.03343465045592,"y":2.50681540438066,"width":19.908814589665656,"height":84.47967912762823,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":3.0534351145038165,"y":91.98813056379822},{"x":0,"y":10.979228486646884},{"x":11.450381679389313,"y":7.71513353115727},{"x":11.450381679389313,"y":6.528189910979229},{"x":3.0534351145038165,"y":3.857566765578635},{"x":29.00763358778626,"y":0},{"x":55.72519083969466,"y":5.934718100890208},{"x":60.30534351145038,"y":5.341246290801187},{"x":72.51908396946564,"y":8.605341246290802},{"x":73.2824427480916,"y":9.792284866468842},{"x":93.12977099236642,"y":14.540059347181009},{"x":93.12977099236642,"y":28.18991097922849},{"x":100,"y":30.267062314540063},{"x":98.47328244274809,"y":100},{"x":58.01526717557252,"y":100},{"x":57.25190839694656,"y":91.3946587537092},{"x":25.190839694656486,"y":91.0979228486647},{"x":25.190839694656486,"y":89.31750741839762},{"x":10.687022900763358,"y":89.02077151335311},{"x":10.687022900763358,"y":90.80118694362018}],"vs":[[533.0091185410333,622.4924012158053],[525.2279635258358,91.4285714285714],[554.4072948328267,70.0303951367781],[554.4072948328267,62.24924012158054],[533.0091185410333,44.741641337386014],[599.1489361702127,19.45288753799392],[667.2340425531914,58.358662613981764],[678.9057750759878,54.46808510638297],[710.030395136778,75.86626139817629],[711.9756838905774,83.64741641337383],[762.5531914893617,114.77203647416411],[762.5531914893617,204.25531914893614],[780.0607902735562,217.8723404255319],[776.1702127659574,675.0151975683889],[673.0699088145896,675.0151975683889],[671.1246200607902,618.6018237082064],[589.4224924012158,616.6565349544071],[589.4224924012158,604.9848024316108],[552.4620060790272,603.0395136778113],[552.4620060790272,614.7112462006078]]},{"id":"poly-225","type":"poly","x":64.74164133738601,"y":16.043618588036225,"width":18.84498480243161,"height":71.4442390248488,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":1.6129032258064515,"y":92.28070175438596},{"x":0,"y":25.6140350877193},{"x":2.4193548387096775,"y":25.6140350877193},{"x":2.4193548387096775,"y":12.982456140350877},{"x":15.32258064516129,"y":11.578947368421053},{"x":15.32258064516129,"y":5.964912280701754},{"x":31.451612903225808,"y":4.912280701754386},{"x":30.64516129032258,"y":2.807017543859649},{"x":54.03225806451613,"y":1.7543859649122806},{"x":54.83870967741935,"y":3.1578947368421053},{"x":77.41935483870968,"y":0},{"x":91.12903225806451,"y":5.614035087719298},{"x":91.93548387096774,"y":21.75438596491228},{"x":98.38709677419355,"y":25.6140350877193},{"x":100,"y":81.05263157894737},{"x":98.38709677419355,"y":89.47368421052632},{"x":86.29032258064517,"y":89.47368421052632},{"x":85.48387096774194,"y":99.64912280701755},{"x":3.225806451612903,"y":100}],"vs":[[832.5835866261398,636.1094224924011],[828.693009118541,266.5045592705167],[834.5288753799392,266.5045592705167],[834.5288753799392,196.47416413373858],[865.6534954407294,188.69300911854103],[865.6534954407294,157.56838905775075],[904.5592705167173,151.73252279635258],[902.6139817629179,140.06079027355622],[959.0273556231002,134.22492401215806],[960.9726443768997,142.0060790273556],[1015.4407294832827,124.4984802431611],[1048.5106382978722,155.62310030395136],[1050.4559270516718,245.1063829787234],[1066.018237082067,266.5045592705167],[1069.9088145896656,573.8601823708206],[1066.018237082067,620.547112462006],[1036.838905775076,620.547112462006],[1034.8936170212764,676.9604863221883],[836.4741641337386,678.9057750759878]]},{"id":"poly-1879","type":"poly","x":88.14589665653494,"y":53.14448657286999,"width":11.854103343465045,"height":35.09541566132924,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":5.128205128205128,"y":99.28571428571429},{"x":3.8461538461538463,"y":19.28571428571429},{"x":0,"y":13.571428571428571},{"x":8.974358974358974,"y":13.571428571428571},{"x":10.256410256410255,"y":10},{"x":14.102564102564102,"y":9.285714285714286},{"x":15.384615384615385,"y":5.714285714285714},{"x":98.71794871794873,"y":0},{"x":100,"y":100}],"vs":[[1136.0486322188447,682.7963525835867],[1134.1033434650453,464.9240121580547],[1128.267477203647,449.36170212765956],[1141.8844984802429,449.36170212765956],[1143.8297872340422,439.6352583586626],[1149.6656534954404,437.6899696048632],[1151.6109422492398,427.9635258358662],[1278.0547112462002,412.4012158054711],[1279.9999999999995,684.741641337386]]},{"id":"poly-5080","type":"poly","x":3.1914893617021276,"y":57.15539121987905,"width":12.613981762917934,"height":31.08451101432018,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":1.2048192771084338,"y":100},{"x":0,"y":92.74193548387096},{"x":13.253012048192772,"y":90.32258064516128},{"x":14.457831325301203,"y":87.09677419354838},{"x":28.915662650602407,"y":87.09677419354838},{"x":32.53012048192771,"y":50},{"x":38.55421686746988,"y":41.12903225806452},{"x":45.78313253012048,"y":41.12903225806452},{"x":44.57831325301205,"y":20.967741935483872},{"x":66.26506024096386,"y":15.32258064516129},{"x":67.46987951807229,"y":2.4193548387096775},{"x":83.13253012048193,"y":0},{"x":98.79518072289156,"y":4.838709677419355},{"x":100,"y":99.19354838709677}],"vs":[[42.796352583586625,684.741641337386],[40.85106382978723,667.2340425531914],[62.24924012158054,661.3981762917932],[64.19452887537993,653.6170212765958],[87.53799392097264,653.6170212765958],[93.37386018237082,564.1337386018237],[103.10030395136778,542.7355623100304],[114.77203647416414,542.7355623100304],[112.82674772036475,494.10334346504555],[147.8419452887538,480.48632218844983],[149.7872340425532,449.36170212765956],[175.07598784194528,443.5258358662614],[200.3647416413374,455.1975683890577],[202.31003039513678,682.7963525835866]]},{"id":"poly-3579","type":"poly","x":33.586626139817625,"y":69.9401497822204,"width":7.598784194528875,"height":18.55043399241688,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":100,"y":0},{"x":0,"y":9.45945945945946},{"x":4,"y":97.2972972972973},{"x":84,"y":100},{"x":80,"y":56.75675675675676},{"x":100,"y":52.702702702702695}],"vs":[[527.1732522796352,542.7355623100303],[429.9088145896656,556.3525835866261],[433.7993920972644,682.7963525835866],[511.61094224924005,686.6869300911853],[507.7203647416413,624.4376899696048],[527.1732522796352,618.6018237082067]]},{"id":"poly-919","type":"poly","x":39.66565349544073,"y":77.71127753580045,"width":12.917933130699089,"height":10.277943157960705,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":96.47058823529412,"y":100},{"x":100,"y":26.82926829268293},{"x":50.588235294117645,"y":17.073170731707318},{"x":50.588235294117645,"y":12.195121951219512},{"x":44.70588235294118,"y":0},{"x":28.235294117647058,"y":0},{"x":27.058823529411764,"y":14.634146341463413},{"x":0,"y":24.390243902439025},{"x":1.1764705882352942,"y":97.5609756097561}],"vs":[[667.2340425531916,682.7963525835866],[673.0699088145897,624.4376899696048],[591.3677811550152,616.6565349544072],[591.3677811550152,612.7659574468084],[581.6413373860182,603.0395136778114],[554.4072948328268,603.0395136778114],[552.4620060790273,614.7112462006078],[507.72036474164133,622.4924012158053],[509.6656534954407,680.8510638297871]]},{"id":"poly-9983","type":"poly","x":60.334346504559264,"y":73.95105442922947,"width":4.86322188449848,"height":14.038166264531696,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":15.625,"y":0},{"x":84.375,"y":0},{"x":96.875,"y":10.714285714285714},{"x":100,"y":96.42857142857143},{"x":0,"y":100},{"x":0,"y":16.071428571428573}],"vs":[[782.0060790273557,573.8601823708207],[824.8024316109422,573.8601823708207],[832.5835866261398,585.531914893617],[834.5288753799392,678.9057750759879],[772.2796352583587,682.7963525835867],[772.2796352583587,591.3677811550152]]},{"id":"poly-9416","type":"poly","x":80.69908814589665,"y":74.20173596966752,"width":8.054711246200611,"height":13.78748472409363,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":0,"y":98.18181818181819},{"x":0,"y":47.27272727272727},{"x":30.188679245282955,"y":41.81818181818181},{"x":33.962264150943305,"y":0.029659090909091627},{"x":84.90566037735844,"y":0},{"x":98.11320754716974,"y":10.909090909090908},{"x":100,"y":100}],"vs":[[1032.9483282674773,680.8510638297872],[1032.9483282674773,626.3829787234042],[1064.0729483282676,620.547112462006],[1067.9635258358662,575.8372036474163],[1120.48632218845,575.80547112462],[1134.1033434650458,587.4772036474163],[1136.0486322188451,682.7963525835866]]}]};
    var tmp_settings = undefined;

    // For safe keeping only
    var demo_drawing_shapes_settings = {"id":8264,"editor":{"previewMode":1,"selected_shape":"poly-3332","tool":"poly"},"general":{"name":"Demo - Drawing Shapes","width":5245,"height":4428,"image_url":"img/demo_2.jpg"},"spots":[{"id":"poly-3332","type":"poly","x":3.409,"y":21.12,"width":94.279,"height":33.12,"actions":{"mouseover":"no-action"},"default_style":{"fill":"#ffffff","fill_opacity":0},"mouseover_style":{"fill":"#209ee8","fill_opacity":0.6533864541832669},"tooltip_style":{"auto_width":1},"points":[{"x":0,"y":76.44927536231886},{"x":0.5675485690757941,"y":100},{"x":39.6814667832578,"y":63.28502415458939},{"x":47.56156019637138,"y":57.97101449275364},{"x":51.28669526438871,"y":57.00483091787441},{"x":56.01475131225687,"y":58.454106280193265},{"x":60.169709657353124,"y":62.318840579710155},{"x":100,"y":99.03381642512075},{"x":99.71345114861406,"y":69.56521739130436},{"x":60.026435231660145,"y":5.797101449275358},{"x":55.58492803517794,"y":1.4492753623188424},{"x":52.86271394701143,"y":0.4830917874396141},{"x":48.707755601915174,"y":0},{"x":44.122973979739996,"y":1.4492753623188424},{"x":42.11713202003835,"y":3.864734299516913},{"x":40.11129006033671,"y":6.763285024154586}],"vs":[[178.81136000000004,2056.3632],[206.87616000000003,2401.7471999999993],[2141.0265600000002,1863.3023999999998],[2530.69056,1785.3696],[2714.89536,1771.1999999999998],[2948.69376,1792.4544],[3154.15296,1849.1327999999999],[5123.72736,2387.577599999999],[5109.55776,1955.4047999999998],[3147.06816,1020.2111999999998],[2927.43936,956.448],[2792.82816,942.2783999999999],[2587.3689600000002,935.1936],[2360.6553599999997,956.448],[2261.46816,991.872],[2162.2809599999996,1034.3808]]},{"id":"poly-3432","type":"poly","x":3.809,"y":40.16,"width":93.744,"height":25.92,"actions":{"mouseover":"no-action"},"default_style":{"fill":"#ffffff","fill_opacity":0},"mouseover_style":{"fill":"#209ee8","fill_opacity":0.6533864541832669},"tooltip_style":{"auto_width":1},"points":[{"x":0,"y":100},{"x":37.89625360230547,"y":93.20987654320986},{"x":48.84726224783862,"y":94.44444444444446},{"x":60.37463976945246,"y":91.35802469135804},{"x":100,"y":95.67901234567906},{"x":99.85590778097982,"y":53.086419753086425},{"x":60.61982514337632,"y":6.249999999999992},{"x":56.77233429394812,"y":2.4691358024691383},{"x":53.7463976945245,"y":0.6172839506172709},{"x":51.44092219020173,"y":0},{"x":48.559077809798275,"y":1.2345679012345692},{"x":45.38904899135447,"y":2.4691358024691383},{"x":42.65129682997118,"y":4.320987654320978},{"x":39.62536023054755,"y":6.790123456790117},{"x":0.14409221902017288,"y":53.703703703703724}],"vs":[[199.79136,2926.0224],[2063.0937599999997,2848.0895999999993],[2601.5385600000004,2862.2592],[3168.3225600000005,2826.8352],[5116.64256,2876.4288000000006],[5109.55776,2387.5776],[3180.3779600000003,1850.0184],[2991.20256,1806.6240000000003],[2842.42176,1785.3696],[2729.06496,1778.2848000000001],[2587.3689600000002,1792.4544],[2431.50336,1806.6240000000003],[2296.8921600000003,1827.8784],[2148.1113600000003,1856.2176],[206.87616,2394.6624]]},{"id":"poly-1676","type":"poly","x":3.269,"y":63.84,"width":94.149,"height":25.1,"actions":{"mouseover":"no-action"},"default_style":{"fill":"#ffffff","fill_opacity":0},"mouseover_style":{"fill":"#209ee8","fill_opacity":0.6533864541832669},"tooltip_style":{"auto_width":1},"points":[{"x":0.573888091822095,"y":57.370517928286844},{"x":40.45911047345766,"y":92.43027888446213},{"x":42.71904594344843,"y":98.64541832669322},{"x":46.162374494380984,"y":99.60159362549803},{"x":49.78087548391025,"y":99.36254980079683},{"x":53.39381968664259,"y":100},{"x":56.85773507962243,"y":94.18326693227088},{"x":60.54519368723099,"y":88.60557768924303},{"x":70.01434720229557,"y":78.40637450199203},{"x":77.18794835007174,"y":71.39442231075694},{"x":85.5093256814921,"y":62.47011952191235},{"x":93.974175035868,"y":55.45816733067726},{"x":100,"y":49.08366533864542},{"x":100,"y":4.4621513944223},{"x":60.83213773314202,"y":0},{"x":57.53228120516497,"y":1.2749003984063756},{"x":39.45480631276901,"y":1.2749003984063756},{"x":1.0043041606886653,"y":7.649402390438224},{"x":0.1434720229555236,"y":8.286852589641455},{"x":0,"y":12.111553784860554},{"x":0.573888091822095,"y":18.486055776892403}],"vs":[[199.79135999999997,3464.4672],[2169.365759999999,3854.1312],[2280.9637599999996,3923.2079999999996],[2450.998959999999,3933.8352000000004],[2629.684359999999,3931.1784000000002],[2808.09536,3938.2632000000003],[2979.1471599999995,3873.6143999999995],[3161.23776,3811.6224],[3628.8345600000007,3698.2656],[3983.0745599999996,3620.3327999999997],[4393.99296,3521.1456],[4811.99616,3443.2128],[5109.55776,3372.3648000000003],[5109.55776,2876.4287999999997],[3175.407359999999,2826.8352],[3012.4569599999986,2841.0048],[2119.77216,2841.0048],[221.04575999999994,2911.8527999999997],[178.53695999999997,2918.9376],[171.45215999999996,2961.4464],[199.79135999999997,3032.2943999999998]]}]};

    // Default settings
    var default_settings = {
        id: 0,
        editor: {
            previewMode: 0,
            selected_shape: -1,
            tool: 'spot'
        },
        general: {
            name: '',
            shortcode: '',
            width: 1050,
            height: 700,
            responsive: 1,
            sticky_tooltips: 0,
            constrain_tooltips: 1,
            image_url: 'https://webcraftplugins.com/uploads/image-map-pro/demo.jpg',
            tooltip_animation: 'grow',
            pageload_animation: 'none',
            fullscreen_tooltips: 'none', // none / mobile / always,
            late_initialization: 0
        }, spots: [
            // type (spot, rect, ellipse, poly), x, y, width, height, points(arr)
            // default styles, mouseover styles
        ]
    };
    var default_spot_settings = {
        id: 'spot-0',
        type: 'spot',
        x: -1,
        y: -1,
        width: 44,
        height: 44,
        actions: {
            mouseover: 'show-tooltip',
            click: 'no-action',
            link: '#',
            open_link_in_new_window: 1
        },
        default_style: {
            opacity: 1,
            border_radius: 50,
            background_color: '#000000',
            background_opacity: 0.4,
            border_width: 0,
            border_style: 'solid',
            border_color: '#ffffff',
            border_opacity: 1,

            // poly-specific
            fill: '#000000',
            fill_opacity: 0.4,
            stroke_color: '#ffffff',
            stroke_opacity: 0.75,
            stroke_width: 0,
            stroke_dasharray: '10 10',
            stroke_linecap: 'round',

            // spot-specific
            use_icon: 0,
            icon_type: 'library', // or 'custom'
            icon_svg_path: 'M409.81,160.113C409.79,71.684,338.136,0,249.725,0C161.276,0,89.583,71.684,89.583,160.113     c0,76.325,119.274,280.238,151.955,334.638c1.72,2.882,4.826,4.641,8.178,4.641c3.351,0,6.468-1.759,8.168-4.631     C290.545,440.361,409.81,236.438,409.81,160.113z M249.716,283.999c-68.303,0-123.915-55.573-123.915-123.895     c0-68.313,55.592-123.895,123.915-123.895s123.876,55.582,123.876,123.895S318.029,283.999,249.716,283.999z',
            icon_svg_viewbox: '0 0 499.392 499.392',
            icon_fill: '#000000',
            icon_url: '',
            icon_is_pin: 0,
            icon_shadow: 0
        },
        mouseover_style: {
            opacity: 1,
            border_radius: 50,
            background_color: '#ffffff',
            background_opacity: 0.4,
            border_width: 0,
            border_style: 'solid',
            border_color: '#ffffff',
            border_opacity: 1,

            // poly-specific
            fill: '#ffffff',
            fill_opacity: 0.4,
            stroke_color: '#ffffff',
            stroke_opacity: 0.75,
            stroke_width: 0,
            stroke_dasharray: '10 10',
            stroke_linecap: 'round',

            // spot-specific
            icon_fill: '#000000'
        },
        tooltip_style: {
            border_radius: 5,
            padding: 20,
            background_color: '#000000',
            background_opacity: 0.9,
            position: 'top',
            width: 300,
            auto_width: 0
        },
        tooltip_content: {
            content_type: 'plain-text',
            plain_text: 'Lorem Ipsum',
            plain_text_color: '#ffffff',
            squares_json: '{"containers":[{"id":"sq-container-403761","settings":{"elements":[{"settings":{"name":"Paragraph","iconClass":"fa fa-paragraph"}}]}}]}',
            squares_content: '<div class="squares-container"><div id="sq-element-725001" class="squares-element col-lg-12 " style="margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; "><p id="" style="" class="">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class="squares-clear"></div></div>',
        },
        points: [],
        vs: []
    }

    $.imageMapProDefaultSettings = $.extend(true, {}, default_settings);
    $.imageMapProDefaultSpotSettings = $.extend(true, {}, default_spot_settings);

    // SQUARES API =============================================================
    $.squaresExtendElementDefaults({
        defaultControls: {
            font: {
                text_color: {
                    name: 'Text Color',
                    type: 'color',
                    default: '#ffffff'
                },
            }
        }
    });
    // =========================================================================

    // WCP EDITOR API ==========================================================

    // WCP TOUR API ============================================================
    $.wcpTourCoordinatesForTipForStep = function(step) {
        if (step == 0) {
            return {
                x: $('#wcp-editor-toolbar').offset().left,
                y: $('#wcp-editor-toolbar').offset().top + $('#wcp-editor-toolbar').height()/2
            }
        }
        if (step == 1) {
            return {
                x: $('[data-wcp-main-tab-button-name="Shape"]').offset().left + 20,
                y: $('[data-wcp-main-tab-button-name="Shape"]').offset().top + 40
            }
        }
        if (step == 2) {
            return {
                x: $('#wcp-editor-right').offset().left - 20,
                y: $('#wcp-editor-right').offset().top + 50
            }
        }
        if (step == 3) {
            return {
                x: $('[data-wcp-form-tab-button-name="icon"]').offset().left + 64,
                y: $('[data-wcp-form-tab-button-name="icon"]').offset().top + 28
            }
        }
        if (step == 4) {
            return {
                x: $('[data-wcp-form-tab-button-name="tooltip_content"]').offset().left + 64,
                y: $('[data-wcp-form-tab-button-name="tooltip_content"]').offset().top + 28
            }
        }
        if (step == 5) {
            return {
                x: $('[data-wcp-main-tab-button-name="Image Map"]').offset().left + 150,
                y: $('[data-wcp-main-tab-button-name="Image Map"]').offset().top + 40
            }
        }
        if (step == 6) {
            return {
                x: $('#wcp-editor-button-preview').offset().left + 64,
                y: $('#wcp-editor-button-preview').offset().top + 32
            }
        }
        if (step == 7) {
            return {
                x: $('#wcp-editor-button-load').offset().left + 64,
                y: $('#wcp-editor-button-load').offset().top + 32
            }
        }
        if (step == 8) {
            return {
                x: $('[data-wcp-editor-extra-main-button-name="export"]').offset().left + 64,
                y: $('[data-wcp-editor-extra-main-button-name="export"]').offset().top + 32
            }
        }
        if (step == 9) {
            return {
                x: $('[data-wcp-editor-extra-main-button-name="code"]').offset().left + 64,
                y: $('[data-wcp-editor-extra-main-button-name="code"]').offset().top + 32
            }
        }
    }
    $.wcpTourCoordinatesForHighlightRect = function(step) {
        if (step == 0) {
            return {
                x: $('#wcp-editor-toolbar').offset().left,
                y: $('#wcp-editor-toolbar').offset().top,
                width: $('#wcp-editor-toolbar').outerWidth(),
                height: $('#wcp-editor-toolbar').outerHeight(),
            }
        }
        if (step == 1) {
            return {
                x: $('[data-wcp-main-tab-button-name="Shape"]').offset().left,
                y: $('[data-wcp-main-tab-button-name="Shape"]').offset().top,
                width: $('[data-wcp-main-tab-button-name="Shape"]').outerWidth(),
                height: $('[data-wcp-main-tab-button-name="Shape"]').outerHeight(),
            }
        }
        if (step == 2) {
            return {
                x: $('#wcp-editor-right').offset().left,
                y: $('#wcp-editor-right').offset().top,
                width: $('#wcp-editor-right').outerWidth(),
                height: $('#wcp-editor-right').outerHeight(),
            }
        }
        if (step == 3) {
            return {
                x: $('[data-wcp-form-tab-button-name="icon"]').offset().left,
                y: $('[data-wcp-form-tab-button-name="icon"]').offset().top,
                width: $('[data-wcp-form-tab-button-name="icon"]').outerWidth(),
                height: $('[data-wcp-form-tab-button-name="icon"]').outerHeight(),
            }
        }
        if (step == 4) {
            return {
                x: $('[data-wcp-form-tab-button-name="tooltip_content"]').offset().left,
                y: $('[data-wcp-form-tab-button-name="tooltip_content"]').offset().top,
                width: $('[data-wcp-form-tab-button-name="tooltip_content"]').outerWidth(),
                height: $('[data-wcp-form-tab-button-name="tooltip_content"]').outerHeight(),
            }
        }
        if (step == 5) {
            return {
                x: $('[data-wcp-main-tab-button-name="Image Map"]').offset().left,
                y: $('[data-wcp-main-tab-button-name="Image Map"]').offset().top,
                width: $('[data-wcp-main-tab-button-name="Image Map"]').outerWidth(),
                height: $('[data-wcp-main-tab-button-name="Image Map"]').outerHeight(),
            }
        }
        if (step == 6) {
            return {
                x: $('#wcp-editor-button-preview').offset().left,
                y: $('#wcp-editor-button-preview').offset().top,
                width: $('#wcp-editor-button-preview').outerWidth(),
                height: $('#wcp-editor-button-preview').outerHeight(),
            }
        }
        if (step == 7) {
            return {
                x: $('#wcp-editor-button-save').offset().left,
                y: $('#wcp-editor-button-save').offset().top,
                width: $('#wcp-editor-button-save').outerWidth() + $('#wcp-editor-button-load').outerWidth(),
                height: $('#wcp-editor-button-save').outerHeight(),
            }
        }
        if (step == 8) {
            return {
                x: $('[data-wcp-editor-extra-main-button-name="import"]').offset().left,
                y: $('[data-wcp-editor-extra-main-button-name="import"]').offset().top,
                width: $('[data-wcp-editor-extra-main-button-name="import"]').outerWidth() + $('[data-wcp-editor-extra-main-button-name="export"]').outerWidth(),
                height: $('[data-wcp-editor-extra-main-button-name="import"]').outerHeight(),
            }
        }
        if (step == 9) {
            return {
                x: $('[data-wcp-editor-extra-main-button-name="code"]').offset().left,
                y: $('[data-wcp-editor-extra-main-button-name="code"]').offset().top,
                width: $('[data-wcp-editor-extra-main-button-name="code"]').outerWidth(),
                height: $('[data-wcp-editor-extra-main-button-name="code"]').outerHeight(),
            }
        }
    }
    $.wcpTourEventStarted = function() {
        tmp_settings = settings;
        settings = preview_settings;
        editor.shapesFormSpotIndex = -1; // Force redraw of the form
        editor.redraw();
        $.wcpEditorOpenMainTabWithName('Shape');
    }
    $.wcpTourEventFinished = function() {
        settings = tmp_settings;
        editor.redraw();
    }

    // [data source] Called on initialization:
    $.wcpEditorGetContentForTabWithName = function(tabName) {
        if (tabName == 'Image Map') {
            return $.wcpEditorGetHTMLForFormWithName('Image Map Settings');
        }
        if (tabName == 'Shape') {
            return $.wcpEditorGetHTMLForFormWithName('Shape Settings');
        }
    }
    $.wcpEditorGetContentForCanvas = function() {
        return '';
    }
    $.wcpEditorGetListItems = function() {
        var items = [];

        // Returns an array of objects in the format { id: 'id', title: 'title' }
        for (var i=0; i<settings.spots.length; i++) {
            var s = settings.spots[i];
            items.push({ id: s.id, title: s.id });
        }

        return items;
    }
    // [data source] Get a list of saves
    $.wcpEditorGetSaves = function(callback) {
        $.imp_editor_storage_get_saves_list(function(savesList) {
            var list = new Array();

            for (var i=0; i<savesList.length; i++) {
                var listItem = {
                    name: savesList[i].meta.name,
                    id: savesList[i].id
                };

                list.push(listItem);
            }

            callback(list);
        });
    }
    // [data source] Provide encoded JSON for export
    $.wcpEditorGetExportJSON = function() {
        return JSON.stringify(editor.getCompressedSettings());
    }

    // Form events
    $.wcpEditorEventFormUpdated = function(formName, controlName) {
        if (formName == 'Image Map Settings') {
            var m = $.wcpEditorGetModelOfFormWithName(formName);

            // Did the image URL change?
            if (m.image.image_url && m.image.image_url.length > 0 && settings.general.image_url !== m.image.image_url) {
                settings.general.image_url = m.image.image_url;
                editor.canvasImage.src = m.image.image_url;

                loadImage(editor.canvasImage, function() {
                    // Image is loading
                    // Show loader
                    $.wcpEditorPresentLoadingScreen('Loading Image...');
                }, function() {
                    // Image has loaded
                    // init canvas events
                    editor.canvas_events();

                    // Hide loader
                    $.wcpEditorHideLoadingScreen();

                    settings.general.width = editor.canvasImage.naturalWidth;
                    settings.general.height = editor.canvasImage.naturalHeight;

                    $.wcpEditorSetControlValue('Image Map Settings', 'image_map_width', settings.general.width);
                    $.wcpEditorSetControlValue('Image Map Settings', 'image_map_height', settings.general.height);
                    $.wcpEditorUpdateForm('Image Map Settings');

                    editor.redraw();
                    editor.addAction();
                }, function() {
                    $.wcpEditorHideLoadingScreenWithMessage('Error Loading Image!', true);
                });
            } else {
                settings.general.name = m.general.image_map_name;
                if (m.general.image_map_shortcode) {
                    settings.general.shortcode = m.general.image_map_shortcode.replace(/[\[\]']+/g,'');
                }
                settings.general.width = m.general.image_map_width;
                settings.general.height = m.general.image_map_height;
                settings.general.responsive = m.general.responsive;
                settings.general.sticky_tooltips = m.general.sticky_tooltips;
                settings.general.constrain_tooltips = m.general.constrain_tooltips;
                settings.general.image_url = m.image.image_url;
                settings.general.tooltip_animation = m.general.tooltip_animation;
                settings.general.pageload_animation = m.general.pageload_animation;
                settings.general.fullscreen_tooltips = m.general.fullscreen_tooltips;
                settings.general.late_initialization = m.general.late_initialization;

                editor.redraw();
                editor.addAction();
            }
        }
        if (formName == 'Shape Settings' && editor.selectedSpot !== undefined) {
            var s = editor.selectedSpot;
            var model = $.wcpEditorGetModelOfFormWithName('Shape Settings');

            // General
            s.x = model.general.x;
            s.y = model.general.y;
            s.width = model.general.width;
            s.height = model.general.height;

            // Actions
            s.actions.mouseover = model.actions.mouseover;
            s.actions.click = model.actions.click;
            s.actions.link = model.actions.link;
            s.actions.open_link_in_new_window = model.actions.open_link_in_new_window;

            // Default style
            s.default_style.opacity = model.default_style.opacity;
            s.default_style.icon_fill = model.default_style.icon_fill;
            s.default_style.border_radius = model.default_style.border_radius;
            s.default_style.background_color = model.default_style.background_color;
            s.default_style.background_opacity = model.default_style.background_opacity;
            s.default_style.border_width = model.default_style.border_width;
            s.default_style.border_style = model.default_style.border_style;
            s.default_style.border_color = model.default_style.border_color;
            s.default_style.border_opacity = model.default_style.border_opacity;
            s.default_style.fill = model.default_style.fill;
            s.default_style.fill_opacity = model.default_style.fill_opacity;
            s.default_style.stroke_color = model.default_style.stroke_color;
            s.default_style.stroke_opacity = model.default_style.stroke_opacity;
            s.default_style.stroke_width = model.default_style.stroke_width;
            s.default_style.stroke_dasharray = model.default_style.stroke_dasharray;
            s.default_style.stroke_linecap = model.default_style.stroke_linecap;
            s.default_style.use_icon = model.icon.use_icon;
            s.default_style.icon_type = model.icon.icon_type;
            s.default_style.icon_svg_path = model.icon.icon_svg_path;
            s.default_style.icon_svg_viewbox = model.icon.icon_svg_viewbox;
            s.default_style.icon_url = model.icon.icon_url;
            s.default_style.icon_is_pin = model.icon.icon_is_pin;
            s.default_style.icon_shadow = model.icon.icon_shadow;

            // Mouseover style
            s.mouseover_style.opacity = model.mouseover_style.mouseover_opacity;
            s.mouseover_style.icon_fill = model.mouseover_style.mouseover_icon_fill;
            s.mouseover_style.border_radius = model.mouseover_style.mouseover_border_radius;
            s.mouseover_style.background_color = model.mouseover_style.mouseover_background_color;
            s.mouseover_style.background_opacity = model.mouseover_style.mouseover_background_opacity;
            s.mouseover_style.border_width = model.mouseover_style.mouseover_border_width;
            s.mouseover_style.border_style = model.mouseover_style.mouseover_border_style;
            s.mouseover_style.border_color = model.mouseover_style.mouseover_border_color;
            s.mouseover_style.border_opacity = model.mouseover_style.mouseover_border_opacity;
            s.mouseover_style.fill = model.mouseover_style.mouseover_fill;
            s.mouseover_style.fill_opacity = model.mouseover_style.mouseover_fill_opacity;
            s.mouseover_style.stroke_color = model.mouseover_style.mouseover_stroke_color;
            s.mouseover_style.stroke_opacity = model.mouseover_style.mouseover_stroke_opacity;
            s.mouseover_style.stroke_width = model.mouseover_style.mouseover_stroke_width;
            s.mouseover_style.stroke_dasharray = model.mouseover_style.mouseover_stroke_dasharray;
            s.mouseover_style.stroke_linecap = model.mouseover_style.mouseover_stroke_linecap;

            // Tooltip style
            s.tooltip_style.border_radius = model.tooltip_settings.tooltip_border_radius;
            s.tooltip_style.padding = model.tooltip_settings.tooltip_padding;
            s.tooltip_style.background_color = model.tooltip_settings.tooltip_background_color;
            s.tooltip_style.background_opacity = model.tooltip_settings.tooltip_background_opacity;
            s.tooltip_style.position = model.tooltip_settings.tooltip_position;
            s.tooltip_style.width = model.tooltip_settings.tooltip_width;
            s.tooltip_style.auto_width = model.tooltip_settings.tooltip_auto_width;

            // Tooltip content
            s.tooltip_content.content_type = model.tooltip_content.tooltip_content_type;
            s.tooltip_content.plain_text = model.tooltip_content.plain_text;
            s.tooltip_content.plain_text_color = model.tooltip_content.plain_text_color;
            s.tooltip_content.squares_json = model.tooltip_content.squares_json;
            s.tooltip_content.squares_content = model.tooltip_content.squares_content;

            editor.redraw();
            if (!sliderDragging) { editor.addAction(); }
        }
    }

    // Main button events
    $.wcpEditorEventNewButtonPressed = function() {}
    $.wcpEditorEventSaveButtonPressed = function() {
        $.wcpEditorPresentLoadingScreen('Saving...');

        $.imp_editor_storage_store_save(editor.getCompressedSettings(), function(progress) {
            if (progress) {
                $.wcpEditorUpdateLoadingScreenMessage('Saving... ' + progress + '%');
            } else {
                $.imp_editor_storage_set_last_save(settings.id, function() {
                    $.wcpEditorHideLoadingScreenWithMessage('Saved!', false);
                });
            }
        });
    }
    $.wcpEditorEventLoadButtonPressed = function() {}
    $.wcpEditorEventUndoButtonPressed = function() {
        editor.undo();
    }
    $.wcpEditorEventRedoButtonPressed = function() {
        editor.redo();
    }
    $.wcpEditorEventPreviewButtonPressed = function() {}
    $.wcpEditorEventEnteredPreviewMode = function() {
        settings.editor.previewMode = 1;
        editor.redraw();
    }
    $.wcpEditorEventExitedPreviewMode = function() {
        settings.editor.previewMode = 0;
        editor.redraw();
    }

    // List events
    $.wcpEditorEventListItemMouseover = function(itemID) {
        if (parseInt(settings.editor.previewMode, 10) == 1) {
            $.imageMapProHighlightShape(settings.general.name, itemID);
        }
    }
    $.wcpEditorEventListItemSelected = function(itemID) {
        editor.selectSpot(itemID);
        editor.redraw();

        if (parseInt(settings.editor.previewMode, 10) == 1) {
            $.imageMapProHighlightShape(settings.general.name, itemID);

            if (editor.selectedSpot.actions.mouseover == 'show-tooltip' || editor.selectedSpot.actions.click == 'show-tooltip') {
                $.imageMapProOpenTooltip(settings.general.name, itemID);
            }
        }
    }
    $.wcpEditorEventListItemMoved = function(itemID, oldIndex, newIndex) {
        // Example of how to handle an item reorder

        // Move the item with itemID from listItems to the new index
        if (newIndex > settings.spots.length - 1) {
            newIndex = settings.spots.length - 1;
        }

        settings.spots.splice(newIndex, 0, settings.spots.splice(oldIndex, 1)[0]);

        // Send the new list items to the editor
        var listItems = [];

        // Returns an array of objects in the format { id: 'id', title: 'title' }
        for (var i=0; i<settings.spots.length; i++) {
            var s = settings.spots[i];
            listItems.push({ id: s.id, title: s.id });
        }
        $.wcpEditorSetListItems(listItems);

        // Re-select the selected item (it's not the editor's responsibility to remember that)
        $.wcpEditorSelectListItem(settings.editor.selected_shape);
    }
    $.wcpEditorEventListItemButtonPressed = function(itemID, buttonName) {
        if (buttonName == 'duplicate') {
            var i = editor.getIndexOfSpotWithId(itemID);
            var s = $.extend(true, {}, settings.spots[i]);

            if (s.type == 'spot') s.id = editor.createIdForSpot();
            if (s.type == 'rect') s.id = editor.createIdForRect();
            if (s.type == 'oval') s.id = editor.createIdForOval();
            if (s.type == 'poly') s.id = editor.createIdForPoly();

            settings.spots.push(s);

            editor.redraw();
            editor.addAction();
        }

        if (buttonName == 'copy') {
            var i = editor.getIndexOfSpotWithId(itemID);
            copiedStyles = {
                default_style: $.extend(true, {}, settings.spots[i].default_style),
                mouseover_style: $.extend(true, {}, settings.spots[i].mouseover_style),
                tooltip_style: $.extend(true, {}, settings.spots[i].tooltip_style),
                tooltip_content: {
                    plain_text_color: settings.spots[i].tooltip_content.plain_text_color
                }
            }
        }

        if (buttonName == 'paste') {
            var i = editor.getIndexOfSpotWithId(itemID);
            settings.spots[i].default_style = $.extend(true, {}, copiedStyles.default_style);
            settings.spots[i].mouseover_style = $.extend(true, {}, copiedStyles.mouseover_style);
            settings.spots[i].tooltip_style = $.extend(true, {}, copiedStyles.tooltip_style);
            settings.spots[i].tooltip_content.plain_text_color = copiedStyles.tooltip_content.plain_text_color;

            editor.redraw();
            editor.addAction();
        }

        if (buttonName == 'delete') {
            indexOfShapeToDelete = editor.getIndexOfSpotWithId(itemID);

            $.wcpEditorPresentModal({
                name: 'confirm-delete-shape',
                title: 'Confirm Delete',
                buttons: [
                    {
                        name: 'cancel',
                        title: 'Cancel',
                        class: ''
                    },
                    {
                        name: 'delete',
                        title: 'Delete',
                        class: 'danger'
                    }
                ],
                body: 'Delete this shape?'
            });
        }
    }

    // Tool events
    $.wcpEditorEventSelectedTool = function(toolName) {
        settings.editor.tool = toolName;
    }

    // Extra main button events
    $.wcpEditorEventExtraMainButtonClick = function(buttonName) {
        if (buttonName == 'code') {
            var html = '';

            html += '<div id="imp-generated-code-wrap">';
            html += '<div class="generated-code-help">';
            html += '    This is a sample HTML document, showing how to install the plugin in your website.';
            html += '</div>';

            html += '<pre>';
            html += '&lt;!doctype html&gt;<br>';
            html += '&lt;html&gt;<br>';
            html += '&lt;head&gt;<br>';
            html += '    <strong><span class="em-code">&lt;link rel=&quot;stylesheet&quot; href=&quot;css/image-map-pro.min.css&quot;&gt;</span></strong><br>';
            html += '    <strong><span class="em-code">&lt;link rel=&quot;stylesheet&quot; href=&quot;css/squares.min.css&quot;&gt;</span></strong><br>';
            html += '&lt;/head&gt;<br>';
            html += '&lt;body&gt;<br>';
            html += '    &lt;div id=&quot;<strong><span class="em-code">image-map-pro-container</span></strong>&quot;&gt;&lt;/div&gt;<br><br>';

            html += '    &lt;script src=&quot;js/jquery.min.js&quot;&gt;&lt;/script&gt;<br>';
            html += '    <strong><span class="em-code">&lt;script src=&quot;js/image-map-pro.min.js&quot;&gt;&lt;/script&gt;</span></strong><br>';
            html += '    &lt;script type=&quot;text/javascript&quot;&gt;<br>';
            html += '        ;(function ($, window, document, undefined) {<br>';
            html += '            $(document).ready(function() {<br>';
            html += '</pre>';
            html += '<div class="generated-code-help">The code that contains all settings and initializes the plugin:</div>';

            html += '<textarea id="textarea-generated-code" rows="4"></textarea>';

            html += '    <pre>';
            html += '            });<br>';
            html += '        })(jQuery, window, document);<br>';
            html += '    &lt;/script&gt;<br>';
            html += '&lt;/body&gt;<br>';
            html += '&lt;/html&gt;<br>';
            html += '</pre>';
            html += '</div>';

            $.wcpEditorPresentModal({
                name: 'code',
                title: 'Code',
                buttons: [
                    {
                        name: 'done',
                        title: 'Done',
                        class: 'primary'
                    }
                ],
                body: html
            });

            $('#textarea-generated-code').val("$('#image-map-pro-container').imageMapPro("+ JSON.stringify(editor.getCompressedSettings()) +");");
        }
    }

    // Modal events
    $.wcpEditorEventModalButtonClicked = function(modalName, buttonName) {
        if (modalName == 'create_new') {
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'modal-choose-icon') {
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'load') {
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'confirm-delete-shape') {
            if (buttonName == 'delete') {
                // If the deleted spot was selected, deselect it
                if (settings.editor.selected_shape == settings.spots[indexOfShapeToDelete].id) {
                    editor.deselectSpot();
                }

                settings.spots.splice(indexOfShapeToDelete, 1);

                $.wcpEditorCloseModal();

                editor.redraw();
                editor.addAction();
            }
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'code') {
            if (buttonName == 'done') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'export') {
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'import') {
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
    }
    $.wcpEditorEventModalClosed = function(modalName) {}

    // Create new event
    $.wcpEditorEventCreatedNewInstance = function(instanceName) {
        settings = $.extend(true, {}, default_settings);

        settings.id = Math.round(Math.random() * 10000) + 1;
        settings.general.name = instanceName;

        $.wcpEditorPresentLoadingScreen('Creating...');

        $.imp_editor_storage_store_save(editor.getCompressedSettings(), function() {
            $.imp_editor_storage_set_last_save(settings.id, function() {
                // Launch editor
                editor.launch();

                $.wcpEditorHideLoadingScreenWithMessage('Created!', false);
            });
        });
    }

    // Event for loading a save
    $.wcpEditorEventLoadSaveWithID = function(saveID) {
        $.wcpEditorPresentLoadingScreen('Loading Image Map...');

        $.imp_editor_storage_get_save(saveID, function(save) {
            if (!save) {
                $.wcpEditorHideLoadingScreenWithMessage('Error loading image map.', true);
            } else {
                settings = save;

                $.imp_editor_storage_set_last_save(settings.id, function() {
                    $.wcpEditorHideLoadingScreen();
                    editor.launch();
                });
            }
        });
    }

    // Event for deleting a save
    $.wcpEditorEventDeleteSaveWithID = function(saveID, cb) {
        $.imp_editor_storage_delete_save(saveID, function() {
            cb();
        });
    }

    // Event for importing
    $.wcpEditorEventImportedJSON = function(parsedJSON) {
        // Preserve the map name and ID to avoid conflicts
        var mapName = settings.general.name;
        var mapID = settings.id;

        // Set the settings
        settings = $.extend(true, {}, parsedJSON);

        // Set the map name
        settings.general.name = mapName;
        settings.id = mapID;

        editor.launch();
    }

    // Event for help button
    $.wcpEditorEventHelpButtonPressed = function() {
        $.wcpTourRestart('Image Map Pro Editor Tour');
    }

    // CONTROLS API ============================================================
    $.wcpEditorSliderStartedDragging = function() {
        sliderDragging = true;
    }
    $.wcpEditorSliderFinishedDragging = function() {
        sliderDragging = false;
    }

    // IMAGE MAP PRO EDITOR API ================================================

    $.image_map_pro_default_spot_settings = function() {
        return default_spot_settings;
    }

    $.image_map_pro_init_editor = function(initSettings, wcpEditorSettings) {
        editor = new Editor();
        editor.init(initSettings, wcpEditorSettings);
    }

    $.image_map_pro_editor_current_settings = function() {
        return settings;
    }

    $.image_map_pro_editor_compressed_settings = function() {
        return editor.getCompressedSettings();
    }

    $.image_map_pro_user_uploaded_image = function() {}


    // EDITOR CLASS ============================================================

    function Editor() {
        this.wcpEditorSettings = undefined;

        // undo/redo
        this.actionStack = new Array();
        this.actionIndex = 0;

        // canvas
        this.canvasImage = new Image();
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.canvas = undefined;

        this.ix = 0; // in pixels, canvas space
        this.iy = 0;
        this.x = 0;
        this.y = 0;
        this.dx = 0; // in percentage, canvas space
        this.dy = 0;

        this.drawRectWidth = 0;
        this.drawRectHeight = 0;

        this.transformX = 0;
        this.transformY = 0;
        this.transformWidth = 0;
        this.transformHeight = 0;

        this.eventSpotId = undefined;
        this.redrawEl = undefined;
        this.redrawSvgEl = undefined;
        this.redrawPolygonEl = undefined;

        this.tempControlPoint = undefined;
        this.tempControlPointLine = undefined;
        this.tempControlPointIndex = undefined;

        this.controlPointInsertionPointX = 0;
        this.controlPointInsertionPointY = 0;

        this.translatedPointIndex = 0;
        this.translatedPoint = undefined;

        this.translatedPointX = 0;
        this.translatedPointY = 0;

        this.polyPoints = new Array();

        // flags
        this.startedSelecting = false;
        this.startedMoving = false;
        this.startedTransforming = false;
        this.transformDirection = 0;

        this.startedDrawingSpot = false;

        this.startedDrawingRect = false;
        this.createdDrawingRect = false;

        this.startedDrawingOval = false;
        this.createdDrawingOval = false;

        this.startedDrawingPoly = false;
        this.drawingPoly = false;
        this.finishedDrawingPoly = false;
        this.mouseDownWhileDrawingPoly = false;

        this.startedTranslatingControlPoint = false;
        this.translatingControlPoint = false;

        this.didDeleteControlPoint = false;

        this.shouldDeselectSpot = false;

        // vars
        this.selectedSpot = undefined;
        this.eventSpot = undefined;
        this.shapesFormSpotIndex = undefined;
        this.iconsHTML = undefined;
    }
    Editor.prototype.init = function(initSettings, wcpEditorSettings) {
        var self = this;

        // events & other
        self.events();
        self.loadIconLibrary();

        // Initialize the editor
        self.wcpEditorSettings = wcpEditorSettings;
        settings = $.extend(true, {}, default_settings);
        $.wcpEditorInit(this.wcpEditorSettings);

        // If settings were passed with initialization, use them and don't look for saves
        if (initSettings) {
            settings = initSettings;

            // launch
            self.launch();
        } else {
            // Load last save
            $.imp_editor_storage_get_last_save(function(lastSaveID) {
                if (lastSaveID && parseInt(lastSaveID, 10) != 0 && !isNaN(parseInt(lastSaveID, 10))) {
                    $.wcpEditorPresentLoadingScreen('Loading Image Map...');
                    $.imp_editor_storage_get_save(parseInt(lastSaveID, 10), function(save) {
                        if (!save) {
                            $.wcpEditorHideLoadingScreenWithMessage('Error loading image map.', true);
                        } else {
                            settings = save;
                            editor.launch();
                        }
                    });
                } else {
                    // Get a list of saves
                    $.imp_editor_storage_get_saves_list(function(savesList) {
                        if (savesList.length > 0) {
                            // Launch with defaults
                            settings = $.extend(true, {}, default_settings);
                            settings.general.name = 'Untitled';
                            settings.id = Math.round(Math.random() * 10000) + 1;
                            self.launch();

                            // Display saves modal
                            $.wcpEditorPresentLoadModal();
                        } else {
                            // If no saves are available, launch with default settings
                            settings = $.extend(true, {}, default_settings);
                            settings.general.name = 'Untitled';
                            settings.id = Math.round(Math.random() * 10000) + 1;
                            self.launch();
                        }
                    });
                }
            });
        }
    };
    Editor.prototype.launch = function() {
        var self = this;

        // Initialize the editor
        $.wcpEditorInit(this.wcpEditorSettings);

        // Reset vars
        this.selectedSpot = undefined;
        this.eventSpot = undefined;
        this.shapesFormSpotIndex = undefined;

        this.parseSettings();

        // If there is an image URL entered, show the loader and start redraw
        if (settings.general.image_url && settings.general.image_url.length > 0) {
            self.canvasImage.src = settings.general.image_url;

            loadImage(self.canvasImage, function() {
                // Image is loading
                // Show loader
                $.wcpEditorPresentLoadingScreen('Loading Image...');
            }, function() {
                // Image has loaded
                // Hide loader

                // init canvas events
                self.canvas_events();

                settings.general.width = self.canvasImage.naturalWidth;
                settings.general.height = self.canvasImage.naturalHeight;

                self.redraw();
                self.selectSpot(settings.editor.selected_shape);

                $.wcpEditorHideLoadingScreen();
            }, function() {
                $.wcpEditorHideLoadingScreenWithMessage('Error Loading Image!', true);
            });
        } else {
            $.wcpEditorHideLoadingScreen();
            $.wcpEditorOpenMainTabWithName('Image Map');
            $.wcpEditorFormOpenTab('Image Map Settings', 'image');
        }

        // Variables
        this.actionIndex = -1;
        this.actionStack = new Array();
        this.addAction();
        this.canvas = $('#wcp-editor-canvas');

        // Select the active tool
        $.wcpEditorSelectTool(settings.editor.tool);

        // Init general settings form
        this.updateImageMapForm();

        // Present guided tour
        $.wcpTourStart('Image Map Pro Editor Tour');
    }
    Editor.prototype.parseSettings = function() {

        // Make sure spot coordinates are numbers
        for (var i=0; i<settings.spots.length; i++) {
            var s = settings.spots[i];

            s.x = parseFloat(s.x);
            s.y = parseFloat(s.y);

            if (s.width) {
                s.width = parseFloat(s.width);
            }
            if (s.height) {
                s.height = parseFloat(s.height);
            }

            if (s.type == 'poly') {
                if (s.points) {
                    for (var j=0; j<s.points.length; j++) {
                        s.points[j].x = parseFloat(s.points[j].x);
                        s.points[j].y = parseFloat(s.points[j].y);
                    }
                }
                if (s.vs) {
                    for (var j=0; j<s.vs.length; j++) {
                        for (var k=0; k<s.vs[j].length; k++) {
                            s.vs[j][0] = parseFloat(s.vs[j][0]);
                            s.vs[j][1] = parseFloat(s.vs[j][1]);
                        }
                    }
                }
            }
        }

        settings.general.width = parseInt(settings.general.width);
        settings.general.height = parseInt(settings.general.height);

        // Uncompress and update legacy spot options
        for (var i=0; i<settings.spots.length; i++) {
            settings.spots[i] = $.extend(true, {}, default_spot_settings, settings.spots[i]);

            // Migrate the title and text to the plain_text setting
            if (settings.spots[i].tooltip_content.title || settings.spots[i].tooltip_content.text) {
                var plainText = '';

                if (settings.spots[i].tooltip_content.title) {
                    plainText += '<h3>' + settings.spots[i].tooltip_content.title + '</h3>';
                }
                if (settings.spots[i].tooltip_content.text) {
                    plainText += '<p>' + settings.spots[i].tooltip_content.text + '</p>';
                }

                settings.spots[i].tooltip_content.plain_text = plainText;

                settings.spots[i].tooltip_content = {
                    content_type: settings.spots[i].tooltip_content.content_type,
                    plain_text: settings.spots[i].tooltip_content.plain_text,
                    plain_text_color: settings.spots[i].tooltip_content.plain_text_color,
                    squares_json: settings.spots[i].tooltip_content.squares_json,
                    squares_content: settings.spots[i].tooltip_content.squares_content
                };
            }
        }
        // Update legacy general options
        settings.general = $.extend(true, {}, default_settings.general, settings.general);
        settings.editor = $.extend(true, {}, default_settings.editor, settings.editor);
    }
    Editor.prototype.redraw = function() {
        var self = this;

        // Calculate canvas dimentions
        var canvasBackgroundWidth = $('#wcp-editor-center').width() - 80;
        var canvasBackgroundHeight = $('#wcp-editor-center').height() - 80;

        if (settings.general.width > canvasBackgroundWidth || settings.general.height > canvasBackgroundHeight) {
            // Canvas needs to be resized to fit the editor's background
            var imageRatio = settings.general.width / settings.general.height;
            var backgroundRatio = canvasBackgroundWidth / canvasBackgroundHeight;

            if (imageRatio <= backgroundRatio) {
                // Fit to height
                self.canvasWidth = canvasBackgroundHeight * imageRatio;
                self.canvasHeight = $('#wcp-editor-center').height() - 80;
            } else {
                // Fit to width
                self.canvasWidth = $('#wcp-editor-center').width() - 80;
                self.canvasHeight = canvasBackgroundWidth/imageRatio;
            }
        } else {
            // Canvas does not need to be resized
            self.canvasWidth = settings.general.width;
            self.canvasHeight = settings.general.height;
        }

        // Fit canvas to editor
        $('#wcp-editor-canvas').css({
            width: self.canvasWidth,
            height: self.canvasHeight
        });

        if (parseInt(settings.editor.previewMode, 10) == 0) {
            // Edit mode
            // Redraw editor
            $('#wcp-editor-canvas').html($.image_map_pro_editor_content());

            $('#imp-editor-image').css({
                width: self.canvasWidth,
                height: self.canvasHeight
            });

            $.wcpEditorSetPreviewModeOff();
        } else {
            // Preview mode
            // Redraw plugin
            $('#wcp-editor-canvas').imageMapPro(settings);

            $.wcpEditorSetPreviewModeOn();
        }

        // Redraw spot selection in canvas
        self.redrawSpotSelection();

        // Update shapes form values
        self.updateShapesForm();

        // Update the state of the form
        this.updateShapesFormState();

        // Update Shapes list
        self.updateShapesList();
    }
    Editor.prototype.redrawSpotSelection = function() {
        var self = this;

        // deselect
        $('.imp-editor-shape').removeClass('selected');

        // select
        if (settings.editor.selected_shape != -1) {
            // set a reference to the selected spot
            var i = self.getIndexOfSpotWithId(settings.editor.selected_shape);

            // No such spot found
            if (i == undefined) {
                settings.editor.selected_shape = -1;
                return;
            }

            $('.imp-editor-shape[data-id="'+ settings.editor.selected_shape +'"]').addClass('selected');

            self.selectedSpot = settings.spots[i];

            // Save a reference to the SVG if it's a poly for quick redraw
            if (self.selectedSpot.type == 'poly') {
                self.tempControlPoint = $('.imp-editor-poly[data-id="'+ settings.editor.selected_shape +'"]').find('.imp-editor-poly-svg-temp-control-point');
                self.tempControlPointLine = $('.imp-editor-poly[data-id="'+ settings.editor.selected_shape +'"]').find('.imp-editor-poly-svg-temp-control-point-line');
            }
        } else {
            self.selectedSpot = undefined;
        }
    }

    Editor.prototype.events = function() {
        var self = this;

        // Button Controls events
        $(document).off('button-choose-icon-clicked');
        $(document).on('button-choose-icon-clicked', function() {
            $.wcpEditorPresentModal({
                name: 'modal-choose-icon',
                title: 'Choose Icon',
                buttons: [
                    {
                        name: 'cancel',
                        title: 'Cancel',
                        class: 'default',
                        id: 'imp-editor-button-cancel-choose-icon'
                    },
                ],
                body: self.iconsHTML
            });
        });

        // Copy styles from default to mouseover
        $(document).off('button-copy-from-default-styles-clicked');
        $(document).on('button-copy-from-default-styles-clicked', function() {
            self.selectedSpot.mouseover_style.opacity = self.selectedSpot.default_style.opacity;
            self.selectedSpot.mouseover_style.border_radius = self.selectedSpot.default_style.border_radius;
            self.selectedSpot.mouseover_style.background_color = self.selectedSpot.default_style.background_color;
            self.selectedSpot.mouseover_style.background_opacity = self.selectedSpot.default_style.background_opacity;
            self.selectedSpot.mouseover_style.border_width = self.selectedSpot.default_style.border_width;
            self.selectedSpot.mouseover_style.border_style = self.selectedSpot.default_style.border_style;
            self.selectedSpot.mouseover_style.border_color = self.selectedSpot.default_style.border_color;
            self.selectedSpot.mouseover_style.border_opacity = self.selectedSpot.default_style.border_opacity;

            self.selectedSpot.mouseover_style.fill = self.selectedSpot.default_style.fill;
            self.selectedSpot.mouseover_style.fill_opacity = self.selectedSpot.default_style.fill_opacity;
            self.selectedSpot.mouseover_style.stroke_color = self.selectedSpot.default_style.stroke_color;
            self.selectedSpot.mouseover_style.stroke_opacity = self.selectedSpot.default_style.stroke_opacity;
            self.selectedSpot.mouseover_style.stroke_width = self.selectedSpot.default_style.stroke_width;
            self.selectedSpot.mouseover_style.stroke_dasharray = self.selectedSpot.default_style.stroke_dasharray;
            self.selectedSpot.mouseover_style.stroke_linecap = self.selectedSpot.default_style.stroke_linecap;

            self.selectedSpot.mouseover_style.icon_fill = self.selectedSpot.default_style.icon_fill;

            self.redraw();
            self.addAction();
        });

        // Launch content builder
        $(document).off('button-launch-content-builder-clicked');
        $(document).on('button-launch-content-builder-clicked', function() {
            self.launchTooltipContentBuilder();
        });

        // Choose Icon modal events
        $(document).off('click', '.imp-spot-icon');
        $(document).on('click', '.imp-spot-icon', function() {
            $.wcpEditorCloseModal();
            self.selectedSpot.default_style.icon_svg_path = $(this).data('path');
            self.selectedSpot.default_style.icon_svg_viewbox = $(this).data('viewbox');
            self.redraw();
            self.addAction();
        });

        // Tooltip content builder done event
        $(document).off('click', '#imp-editor-done-editing-tooltip, #imp-editor-tooltip-content-builder-close');
        $(document).on('click', '#imp-editor-done-editing-tooltip, #imp-editor-tooltip-content-builder-close', function() {
            $('#imp-editor-tooltip-content-builder-wrap').removeClass('imp-visible');

            setTimeout(function() {
                $('#imp-editor-tooltip-content-builder-wrap').hide();
            }, 250);

            self.doneEditingTooltip();
            $.squaresHideEditorWindow();
        });
    }
    Editor.prototype.canvas_events = function() {
        var self = this;

        $(window).off('resize.imp-redraw');
        $(window).on('resize.imp-redraw', function() {
            self.redraw();
        });

        $(document).off('mousedown', '#wcp-editor-center');
        $(document).on('mousedown', '#wcp-editor-center', function(e) {
            self.handleMouseDown(e);
        });
        $(document).off('mousemove', '#wcp-editor');
        $(document).on('mousemove', '#wcp-editor', function(e) {
            self.handleMouseMove(e);
        });
        $(document).off('mouseup', '#wcp-editor');
        $(document).on('mouseup', '#wcp-editor', function(e) {
            self.handleMouseUp(e);
        });
        $(document).off('keyup.canvasEvents');
        $(document).on('keyup.canvasEvents', function(e) {
            // Abort drawing poly
            if (e.keyCode == 27 && self.drawingPoly) {
                self.drawingPoly = false;
                self.startedDrawingPoly = false;
                self.mouseDownWhileDrawingPoly = false;
                $('#temp-poly').remove();
            }
        });
        // Disable the context menu when deleting control point
        $('body').on('contextmenu', function(e) {
            if (self.didDeleteControlPoint) {
                self.didDeleteControlPoint = false;
                return false;
            }
        });
    }
    Editor.prototype.addAction = function() {
        var self = this;
        if (self.actionIndex < self.actionStack.length - 1) {
            self.actionStack.splice(self.actionIndex + 1, self.actionStack.length);
        }

        self.actionStack.push($.extend(true, {}, settings));
        self.actionIndex++;

        if (self.actionStack.length > 100) {
            self.actionStack.splice(0, 1);
            self.actionIndex--;
        }

        $('#button-save').html('<span class="glyphicon glyphicon-hdd"></span> Save');
    }
    Editor.prototype.undo = function() {
        var self = this;
        if (self.actionIndex > 0) {
            self.actionIndex--;
        }

        settings = $.extend(true, {}, self.actionStack[self.actionIndex]);

        self.redraw();

        // to do: Update forms
    }
    Editor.prototype.redo = function() {
        var self = this;
        if (self.actionIndex < self.actionStack.length - 1) {
            self.actionIndex++;
        }

        settings = $.extend(true, {}, self.actionStack[self.actionIndex]);

        self.redraw();

        // to do: Update forms
    }
    Editor.prototype.loadIconLibrary = function() {
        var self = this;

        var html = '';
        for (var i=0; i<$.webcraft_icon_library.length; i++) {
            html += '<div class="imp-spot-icon" data-path="'+ $.webcraft_icon_library[i][1] +'" data-viewbox="'+ $.webcraft_icon_library[i][0] +'">';
            html += '   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="'+ $.webcraft_icon_library[i][0] +'" xml:space="preserve" width="40px" height="40px">';
            html += '       <path style="fill:#000000" d="'+ $.webcraft_icon_library[i][1] +'"></path>';
            html += '   </svg>';
            html += '</div>';
        }

        // $('#imp-spot-icons-container').html(html);
        this.iconsHTML = html;
    }

    Editor.prototype.handleMouseDown = function(e) {
        var self = this;

        // If the event occurred on a UI element of the editor, ignore event
        if ($(e.target).attr('id') == 'wcp-editor-toolbar' || $(e.target).closest('#wcp-editor-toolbar').length == 1) {
            return;
        }
        if ($(e.target).attr('id') == 'wcp-editor-extra-main-buttons' || $(e.target).closest('#wcp-editor-extra-main-buttons').length == 1) {
            return;
        }

        // === If preview mode, return
        if (parseInt(settings.editor.previewMode, 10) == 1) return;

        // === If a modal is open, ignore
        // to do: Add this class to WCPEditor
        if ($('body').hasClass('modal-open')) return;

        var point = screenToCanvasSpace(e.pageX, e.pageY, self.canvas);
        self.ix = point.x;
        self.iy = point.y;

        // === Drawing a poly?
        if (self.drawingPoly) {
            // close the loop
            if ($(e.target).is('circle') && $(e.target).data('index') == 0) {
                self.drawingPoly = false;
                self.finishedDrawingPoly = true;
                return;
            }

            // or create a new point
            self.placePointForTempPoly(self.ix, self.iy);
            self.redrawTempPoly();
            self.mouseDownWhileDrawingPoly = true;

            return;
        }

        // === Did user click on a control point?
        if (self.selectedSpot && self.selectedSpot.type == 'poly' && $(e.target).hasClass('imp-poly-control-point')) {
            $(e.target).addClass('active');

            self.translatedPointIndex = $(e.target).data('index');

            if (e.button == 2) {
                // Remove the control point
                self.selectedSpot.points.splice(self.translatedPointIndex, 1);
                self.updateBoundingBoxForPolygonSpot(self.selectedSpot);
                self.redraw();
                self.addAction();
                self.didDeleteControlPoint = true;
                return;
            }

            self.translatingControlPoint = true;

            self.translatedPointX = self.selectedSpot.points[self.translatedPointIndex].x;
            self.translatedPointY = self.selectedSpot.points[self.translatedPointIndex].y;

            // Cache
            self.translatedPoint = $(e.target);
            self.redrawPolygonEl = $(e.target).closest('.imp-editor-shape').find('.imp-editor-poly-svg polygon');

            return;
        }

        // === Did user click on a poly line?
        if (self.selectedSpot && self.selectedSpot.type == 'poly' && $(e.target).hasClass('imp-editor-poly-svg-temp-control-point')) {
            self.selectedSpot.points.splice(self.tempControlPointIndex + 1, 0, { x: self.controlPointInsertionPointX, y: self.controlPointInsertionPointY });
            self.redraw();

            // Same code as from the "click on control point action"
            var point = $('.imp-editor-shape[data-id="'+ self.selectedSpot.id +'"]').find('.imp-poly-control-point[data-index="'+ (self.tempControlPointIndex+1) +'"]');
            point.addClass('active');

            self.translatedPointIndex = point.data('index');
            self.translatingControlPoint = true;

            self.translatedPointX = self.selectedSpot.points[self.translatedPointIndex].x;
            self.translatedPointY = self.selectedSpot.points[self.translatedPointIndex].y;

            // Cache
            self.translatedPoint = point;
            self.redrawPolygonEl = point.closest('.imp-editor-shape').find('.imp-editor-poly-svg polygon');

            return;
        }

        // === Did the event happen on a transform box?
        if ($(e.target).hasClass('imp-selection-translate-box')) {
            self.startedTransforming = true;
            self.transformDirection = $(e.target).data('transform-direction');
            self.redrawEl = $(e.target).closest('.imp-editor-shape');

            if (self.selectedSpot.type == 'poly') {
                // Reference for quick redrawing
                self.redrawSvgEl = self.redrawEl.find('.imp-editor-poly-svg');
                self.redrawPolygonEl = self.redrawSvgEl.find('polygon');

                // Save the original coordinates of the poly's points
                self.polyPoints = new Array();
                for (var i=0; i<self.selectedSpot.points.length; i++) {
                    self.polyPoints.push({
                        x: self.selectedSpot.points[i].x,
                        y: self.selectedSpot.points[i].y
                    });
                }
            }

            return;
        }



        // === Did user try to select a polygon?
        for (var i=settings.spots.length - 1; i>=0; i--) {
            if (settings.spots[i].type != 'poly') continue;

            if (self.shouldSelectPoly(settings.spots[i].id)) {
                self.eventSpotId = settings.spots[i].id;
                self.startedSelecting = true;
                return;
            }
        }

        // === Did the event happen on a spot?
        if ($(e.target).hasClass('imp-editor-shape') || $(e.target).closest('.imp-editor-shape').length > 0) {
            // Make sure it's not a polygon
            if (!$(e.target).hasClass('imp-editor-poly') && $(e.target).closest('.imp-editor-poly').length == 0) {
                self.eventSpotId = $(e.target).data('id') || $(e.target).closest('.imp-editor-shape').data('id');
                self.startedSelecting = true;
                return;
            }
        }

        // === Create spots

        // === If the event is outside canvas, ignore
        if (e.pageX > self.canvas.offset().left && e.pageX < self.canvasWidth + self.canvas.offset().left && e.pageY > self.canvas.offset().top && e.pageY < self.canvasHeight + self.canvas.offset().top) {
            // Spot tool
            if (settings.editor.tool == 'spot') {
                self.startedDrawingSpot = true;
                return;
            }

            // Rect tool
            if (settings.editor.tool == 'rect') {
                self.startedDrawingRect = true;
                return;
            }

            // Ellipse tool
            if (settings.editor.tool == 'oval') {
                self.startedDrawingOval = true;
                return;
            }

            // Poly tool
            if (settings.editor.tool == 'poly') {
                self.startedDrawingPoly = true;

                // deselect and redraw
                self.deselectSpot();
                self.redraw();

                // create a temp array of points
                self.polyPoints = new Array();

                // create a temp poly
                $('#imp-editor-shapes-container').append('<svg id="temp-poly" width="'+ self.canvasWidth +'px" height="'+ self.canvasHeight +'px" viewBox="0 0 '+ self.canvasWidth +' '+ self.canvasHeight +'" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>')

                // place the first point
                self.placePointForTempPoly(self.ix, self.iy);
                self.redrawTempPoly();
                self.mouseDownWhileDrawingPoly = true;

                self.drawingPoly = true;
                return;
            }
        }

        // If event happened outside the canvas, set the flag to deselect spot
        if ($(e.target).attr('id') == 'wcp-editor-center' && this.selectedSpot) {
            this.shouldDeselectSpot = true;
        }
        // self.deselectSpot();
        // self.redraw();
        // self.addAction();
    }
    Editor.prototype.handleMouseMove = function(e) {
        var self = this;

        // === If preview mode, return
        if (parseInt(settings.editor.previewMode, 10) == 1) return;

        var point = screenToCanvasSpace(e.pageX, e.pageY, self.canvas);

        self.x = point.x;
        self.y = point.y;

        self.dx = ((self.x - self.ix)/self.canvasWidth) * 100;
        self.dy = ((self.y - self.iy)/self.canvasHeight) * 100;

        self.dx = Math.round(self.dx * 10) / 10;
        self.dy = Math.round(self.dy * 10) / 10;

        // Select
        if (self.startedSelecting) {
            self.selectSpot(self.eventSpotId);
            self.redrawEl = $('.imp-editor-shape[data-id="'+ self.eventSpotId +'"]');

            // Manually select the spot
            self.redrawSpotSelection();

            self.startedMoving = true;
            self.startedSelecting = false;
        }

        // Move
        if (self.startedMoving) {
            var c = limitToCanvas(self.selectedSpot.x + self.dx, self.selectedSpot.y + self.dy);

            if (self.selectedSpot.type == 'rect' || self.selectedSpot.type == 'oval' || self.selectedSpot.type == 'poly') {
                if (c.x + self.selectedSpot.width > 100) {
                    c.x = 100 - self.selectedSpot.width;
                }
                if (c.y + self.selectedSpot.height > 100) {
                    c.y = 100 - self.selectedSpot.height;
                }
            }

            self.redrawEl.css({
                left: c.x + '%',
                top: c.y + '%'
            });

            return;
        }

        // Transform
        if (self.startedTransforming) {
            var c, d;

            if (self.transformDirection == 1) {
                c = { x: self.selectedSpot.x + self.dx, y: self.selectedSpot.y + self.dy };
                d = { x: self.selectedSpot.width - self.dx, y: self.selectedSpot.height - self.dy };
            }
            if (self.transformDirection == 2) {
                c = { x: self.selectedSpot.x, y: self.selectedSpot.y + self.dy };
                d = { x: self.selectedSpot.width, y: self.selectedSpot.height - self.dy };
            }
            if (self.transformDirection == 3) {
                c = { x: self.selectedSpot.x, y: self.selectedSpot.y + self.dy };
                d = { x: self.selectedSpot.width + self.dx, y: self.selectedSpot.height - self.dy };
            }
            if (self.transformDirection == 4) {
                c = { x: self.selectedSpot.x, y: self.selectedSpot.y };
                d = { x: self.selectedSpot.width + self.dx, y: self.selectedSpot.height };
            }
            if (self.transformDirection == 5) {
                c = { x: self.selectedSpot.x, y: self.selectedSpot.y };
                d = { x: self.selectedSpot.width + self.dx, y: self.selectedSpot.height + self.dy };
            }
            if (self.transformDirection == 6) {
                c = { x: self.selectedSpot.x, y: self.selectedSpot.y };
                d = { x: self.selectedSpot.width, y: self.selectedSpot.height + self.dy };
            }
            if (self.transformDirection == 7) {
                c = { x: self.selectedSpot.x + self.dx, y: self.selectedSpot.y };
                d = { x: self.selectedSpot.width - self.dx, y: self.selectedSpot.height + self.dy };
            }
            if (self.transformDirection == 8) {
                c = { x: self.selectedSpot.x + self.dx, y: self.selectedSpot.y };
                d = { x: self.selectedSpot.width - self.dx, y: self.selectedSpot.height };
            }

            // Canvas bounds
            if (c.x < 0) {
                d.x = self.selectedSpot.x + self.selectedSpot.width;
                c.x = 0;
            }
            if (c.y < 0) {
                c.y = 0;
                d.y = self.selectedSpot.y + self.selectedSpot.height;
            }
            if (d.x + c.x > 100) d.x = 100 - c.x;
            if (d.y + c.y > 100) d.y = 100 - c.y;

            // Negative width/height
            if (c.x > self.selectedSpot.x + self.selectedSpot.width) c.x = self.selectedSpot.x + self.selectedSpot.width;
            if (c.y > self.selectedSpot.y + self.selectedSpot.height) c.y = self.selectedSpot.y + self.selectedSpot.height;
            if (d.x < 0) d.x = 0;
            if (d.y < 0) d.y = 0;

            self.transformX = c.x;
            self.transformY = c.y;
            self.transformWidth = d.x;
            self.transformHeight = d.y;

            self.redrawEl.css({
                left: c.x + '%',
                top: c.y + '%',
                width: d.x + '%',
                height: d.y + '%'
            });

            // Update the SVG viewbox property
            if (self.selectedSpot.type == 'poly') {
                var shapeWidthPx = settings.general.width * (d.x/100);
                var shapeHeightPx = settings.general.height * (d.y/100);
                self.redrawSvgEl[0].setAttribute('viewBox', '0 0 ' + shapeWidthPx + ' ' + shapeHeightPx);

                // Redraw the shape
                var coords = '';
                for (var j=0; j<self.selectedSpot.points.length; j++) {
                    var p = self.selectedSpot.points[j];
                    var x = self.selectedSpot.default_style.stroke_width + (p.x/100) * (shapeWidthPx - self.selectedSpot.default_style.stroke_width*2);
                    var y = self.selectedSpot.default_style.stroke_width + (p.y/100) * (shapeHeightPx - self.selectedSpot.default_style.stroke_width*2);
                    coords += x +','+ y +' ';
                }

                self.redrawPolygonEl.attr('points', coords);
            }


            return;
        }

        // Draw rect
        if (self.startedDrawingRect) {
            var point = screenToCanvasSpace(e.pageX, e.pageY, self.canvas);

            if (!self.createdDrawingRect) {
                self.createdDrawingRect = true;

                // create a rect
                self.eventSpot = self.createRect();

                // set position
                self.eventSpot.x = (self.x/self.canvasWidth)*100;
                self.eventSpot.y = (self.y/self.canvasHeight)*100;

                self.eventSpot.x = Math.round(self.eventSpot.x * 10)/10;
                self.eventSpot.y = Math.round(self.eventSpot.y * 10)/10;

                // redraw once
                self.redraw();

                self.redrawEl = $('.imp-editor-shape[data-id="'+ self.eventSpot.id +'"]');
            }

            // fast redraw rect
            var d = { x: self.dx, y: self.dy };

            if (self.eventSpot.x + d.x > 100) {
                d.x = 100 - self.eventSpot.x;
            }
            if (self.eventSpot.y + d.y > 100) {
                d.y = 100 - self.eventSpot.y;
            }

            self.drawRectWidth = d.x;
            self.drawRectHeight = d.y;

            self.redrawEl.css({
                width: d.x + '%',
                height: d.y + '%'
            });

            return;
        }

        // Draw oval
        if (self.startedDrawingOval) {
            var point = screenToCanvasSpace(e.pageX, e.pageY, self.canvas);

            if (!self.createdDrawingOval) {
                self.createdDrawingOval = true;

                // create a rect
                self.eventSpot = self.createOval();

                // set position
                self.eventSpot.x = (self.x/self.canvasWidth)*100;
                self.eventSpot.y = (self.y/self.canvasHeight)*100;

                self.eventSpot.x = Math.round(self.eventSpot.x * 10)/10;
                self.eventSpot.y = Math.round(self.eventSpot.y * 10)/10;

                // redraw once
                self.redraw();

                self.redrawEl = $('.imp-editor-shape[data-id="'+ self.eventSpot.id +'"]');
            }

            // fast redraw rect
            var d = { x: self.dx, y: self.dy };

            if (self.eventSpot.x + d.x > 100) {
                d.x = 100 - self.eventSpot.x;
            }
            if (self.eventSpot.y + d.y > 100) {
                d.y = 100 - self.eventSpot.y;
            }

            self.drawRectWidth = d.x;
            self.drawRectHeight = d.y;

            self.redrawEl.css({
                width: d.x + '%',
                height: d.y + '%'
            });

            return;
        }

        // Draw poly
        if (self.mouseDownWhileDrawingPoly) {
            self.polyPoints[self.polyPoints.length - 1].x = self.x;
            self.polyPoints[self.polyPoints.length - 1].y = self.y;

            self.redrawTempPoly();

            return;
        }

        // Move control point
        if (self.translatingControlPoint) {
            // Scale up the SVG and redraw the points
            if (!self.startedTranslatingControlPoint) {
                self.startedTranslatingControlPoint = true;

                // Hide transform boxes
                $(e.target).closest('.imp-editor-shape').find('.imp-selection').hide();

                // Scale up the shape
                $(e.target).closest('.imp-editor-shape').css({
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%'
                });

                // Change the SVG viewbox
                $(e.target).closest('.imp-editor-shape').find('.imp-editor-poly-svg')[0].setAttribute('viewBox', '0 0 ' + settings.general.width + ' ' + settings.general.height);

                // Redraw the control points
                for (var i=0; i<self.selectedSpot.points.length; i++) {
                    $('.imp-editor-shape[data-id="'+ self.selectedSpot.id +'"]').find('.imp-poly-control-point[data-index="'+ i +'"]').css({
                        left: relLocalToRelCanvasSpace(self.selectedSpot.points[i], self.selectedSpot).x + '%',
                        top: relLocalToRelCanvasSpace(self.selectedSpot.points[i], self.selectedSpot).y + '%'
                    });
                }
            }

            // Limit to canvas bounds
            if (relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).x + self.dx < 0) {
                self.dx = -relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).x;
            }
            if (relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).x + self.dx > 100) {
                self.dx = 100 - relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).x;
            }
            if (relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).y + self.dy < 0) {
                self.dy = -relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).y;
            }
            if (relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).y + self.dy > 100) {
                self.dy = 100 - relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).y;
            }

            // convert self.dx from canvas rel. to poly rel.
            var dx = self.dx / (((self.selectedSpot.width/100)*self.canvasWidth)/self.canvasWidth);
            var dy = self.dy / (((self.selectedSpot.height/100)*self.canvasHeight)/self.canvasHeight);

            // Update the coordinates of the translated point
            self.selectedSpot.points[self.translatedPointIndex].x = self.translatedPointX + dx;
            self.selectedSpot.points[self.translatedPointIndex].y = self.translatedPointY + dy;

            // Redraw the control point
            self.translatedPoint.css({
                left: relLocalToRelCanvasSpace(self.selectedSpot.points[self.translatedPointIndex], self.selectedSpot).x + '%',
                top: relLocalToRelCanvasSpace(self.selectedSpot.points[self.translatedPointIndex], self.selectedSpot).y + '%',
            });

            // Redraw the polygon shape
            var coords = '';
            for (var j=0; j<self.selectedSpot.points.length; j++) {
                var p = relLocalToRelCanvasSpace(self.selectedSpot.points[j], self.selectedSpot);
                var x = self.selectedSpot.default_style.stroke_width + (p.x/100) * (settings.general.width - self.selectedSpot.default_style.stroke_width*2);
                var y = self.selectedSpot.default_style.stroke_width + (p.y/100) * (settings.general.height - self.selectedSpot.default_style.stroke_width*2);
                // var x = (p.x/100) * (settings.general.width);
                // var y = (p.y/100) * (settings.general.height);
                coords += x +','+ y +' ';
            }

            self.redrawPolygonEl.attr('points', coords);

            return;
        }

        // Place temporary control point
        if (self.selectedSpot && self.selectedSpot.type == 'poly') {
            self.redrawSelectedPolyTempPoint();
            return;
        }
    }
    Editor.prototype.handleMouseUp = function(e) {
        var self = this;

        // === If preview mode, return
        if (parseInt(settings.editor.previewMode, 10) == 1) return;

        if (self.startedDrawingSpot) {
            // Draw spot
            var s = self.createSpot();
            s.x = (self.ix/self.canvasWidth)*100;
            s.y = (self.iy/self.canvasHeight)*100;

            s.x = Math.round(s.x * 10)/10;
            s.y = Math.round(s.y * 10)/10;

            self.selectSpot(s.id);
            self.redraw();
            self.addAction();
        } else if (self.startedDrawingRect && self.createdDrawingRect) {
            // Draw rect
            var o = limitToCanvas(self.dx, self.dy);
            self.eventSpot.width = Math.round(self.drawRectWidth * 10)/10;
            self.eventSpot.height = Math.round(self.drawRectHeight * 10)/10;

            self.selectSpot(self.eventSpot.id);
            self.redraw();
            self.addAction();
        } else if (self.startedDrawingOval && self.createdDrawingOval) {
            // Draw oval
            var o = limitToCanvas(self.dx, self.dy);
            self.eventSpot.width = Math.round(self.drawRectWidth * 10)/10;
            self.eventSpot.height = Math.round(self.drawRectHeight * 10)/10;

            self.selectSpot(self.eventSpot.id);
            self.redraw();
            self.addAction();
        } else if (self.finishedDrawingPoly) {
            // Finish drawing poly

            // Delete temp poly
            $('#temp-poly').remove();

            // Create the final poly
            // Dimentions are created in the createPoly() function
            var p = self.createPoly(self.polyPoints);

            // Select it
            self.selectSpot(p.id);

            // Redraw
            self.addAction();
            self.redraw();

        } else if (self.startedMoving) {
            // Move
            var o = limitToCanvas(self.selectedSpot.x + self.dx, self.selectedSpot.y + self.dy);

            if (self.selectedSpot.type == 'rect' || self.selectedSpot.type == 'oval' || self.selectedSpot.type == 'poly') {
                if (o.x + self.selectedSpot.width > 100) {
                    o.x = 100 - self.selectedSpot.width;
                }
                if (o.y + self.selectedSpot.height > 100) {
                    o.y = 100 - self.selectedSpot.height;
                }
            }

            self.selectedSpot.x = Math.round(o.x * 10)/10;
            self.selectedSpot.y = Math.round(o.y * 10)/10;

            self.redraw();
            self.addAction();

        } else if (self.startedTransforming) {
            // Transform
            self.selectedSpot.x = Math.round(self.transformX * 10)/10;
            self.selectedSpot.y = Math.round(self.transformY * 10)/10;
            self.selectedSpot.width = Math.round(self.transformWidth * 10)/10;
            self.selectedSpot.height = Math.round(self.transformHeight * 10)/10;

            self.redraw();
            self.addAction();

        } else if (self.translatingControlPoint) {
            var dx = self.dx / (((self.selectedSpot.width/100)*self.canvasWidth)/self.canvasWidth);
            var dy = self.dy / (((self.selectedSpot.height/100)*self.canvasHeight)/self.canvasHeight);

            // Update the bounding box of the poly
            self.updateBoundingBoxForPolygonSpot(self.selectedSpot);

            self.redraw();
            self.addAction();
        } else if (self.startedSelecting) {
            // Select
            if (self.selectedSpot && self.selectedSpot.id != self.eventSpotId) {
                self.deselectSpot();
            }
            self.selectSpot(self.eventSpotId);

            self.redraw();
            self.addAction();
        } else if (self.shouldDeselectSpot) {
            self.deselectSpot();
            self.redraw();
            self.addAction();
        }

        // Reset flags
        self.startedSelecting = false;
        self.startedMoving = false;
        self.startedTransforming = false;
        self.transformDirection = 0;

        self.startedDrawingSpot = false;

        self.startedDrawingRect = false;
        self.createdDrawingRect = false;

        self.startedDrawingOval = false;
        self.createdDrawingOval = false;

        self.startedDrawingPoly = false;
        self.finishedDrawingPoly = false;
        self.mouseDownWhileDrawingPoly = false;

        self.translatingControlPoint = false;
        self.startedTranslatingControlPoint = false;

        self.shouldDeselectSpot = false;
    }

    Editor.prototype.getIndexOfSpotWithId = function(id) {
        for (var i=0; i<settings.spots.length; i++) {
            if (settings.spots[i].id == id) {
                return i;
            }
        }
    }
    Editor.prototype.selectSpot = function(id) {
        settings.editor.selected_shape = id;
    }
    Editor.prototype.deselectSpot = function() {
        settings.editor.selected_shape = -1;
    }

    Editor.prototype.createIdForSpot = function() {
        return 'spot-' + Math.floor(Math.random() * 9999);
    }
    Editor.prototype.createIdForRect = function() {
        return 'rect-' +  + Math.floor(Math.random() * 9999);
    }
    Editor.prototype.createIdForOval = function() {
        return 'oval-' +  + Math.floor(Math.random() * 9999);
    }
    Editor.prototype.createIdForPoly = function() {
        return 'poly-' +  + Math.floor(Math.random() * 9999);
    }

    Editor.prototype.createSpot = function() {
        var self = this;

        var s = $.extend(true, {}, default_spot_settings);
        s.type = 'spot';
        s.id = self.createIdForSpot();

        settings.spots.push(s);

        return s;
    }
    Editor.prototype.createRect = function() {
        var self = this;

        var s = $.extend(true, {}, default_spot_settings);
        s.type = 'rect';
        s.default_style.border_radius = 10;
        s.mouseover_style.border_radius = 10;
        s.id = self.createIdForRect();

        settings.spots.push(s);

        return s;
    }
    Editor.prototype.createOval = function() {
        var self = this;

        var s = $.extend(true, {}, default_spot_settings);
        s.type = 'oval';
        s.id = self.createIdForOval();

        settings.spots.push(s);

        return s;
    }
    Editor.prototype.createPoly = function() {
        var self = this;

        var s = $.extend(true, {}, default_spot_settings);
        s.type = 'poly';
        s.id = self.createIdForPoly();

        // Set dimentions
        var minX=99999, minY=99999, maxX=0, maxY=0;
        for (var i=0; i<self.polyPoints.length; i++) {
            var p = self.polyPoints[i];

            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        }

        var pixelWidth = maxX - minX;
        var pixelHeight = maxY - minY;

        // percentage, relative to the canvas width/height
        s.x = (minX/self.canvasWidth)*100;
        s.y = (minY/self.canvasHeight)*100;
        s.width = (pixelWidth/self.canvasWidth)*100;
        s.height = (pixelHeight/self.canvasHeight)*100;

        for (var i=0; i<self.polyPoints.length; i++) {
            // coordinates are in percentage, relative to the current pixel dimentions of the shape box
            s.points.push({
                x: ((self.polyPoints[i].x - minX)/pixelWidth)*100,
                y: ((self.polyPoints[i].y - minY)/pixelHeight)*100
            });
        }

        settings.spots.push(s);

        return s;
    }

    Editor.prototype.shouldSelectPoly = function(id) {
        var self = this;
        var s;

        for (var i=0; i<settings.spots.length; i++) {
            if (settings.spots[i].id == id) {
                s = settings.spots[i];
            }
        }

        // Coordinates in shape pixel space
        var x = self.ix - (s.x/100)*self.canvasWidth;
        var y = self.iy - (s.y/100)*self.canvasHeight;

        // Spot dimentions in pixels
        var spotWidth = (s.width/100)*self.canvasWidth;
        var spotHeight = (s.height/100)*self.canvasHeight;

        // Convert to shape percentage space
        x = (x / spotWidth) * 100;
        y = (y / spotHeight) * 100;

        var testPoly = new Array();
        for (var i=0; i<s.points.length; i++) {
            testPoly.push([s.points[i].x, s.points[i].y]);
        }

        if (isPointInsidePolygon({ x: x, y: y }, testPoly)) {
            return true;
        } else {
            return false;
        }
    }
    Editor.prototype.placePointForTempPoly = function(x, y) {
        var self = this;

        self.polyPoints.push({
            x: x,
            y: y
        });
    }
    Editor.prototype.redrawTempPoly = function() {
        var self = this;

        // Draw polygon
        var html = '<polygon points="'
        for (var i=0; i<self.polyPoints.length; i++) {
            html += self.polyPoints[i].x + ',' + self.polyPoints[i].y + ' ';
        }
        html += '" />';

        // Draw points

        for (var i=0; i<self.polyPoints.length; i++) {
            html += '<circle cx="'+ self.polyPoints[i].x +'" cy="'+ self.polyPoints[i].y +'" r="4" data-index="'+ i +'" />';
        }

        // Insert HTML
        $('#temp-poly').html(html);
    }
    Editor.prototype.redrawSelectedPolyTempPoint = function() {
        var self = this;

        // Convert canvas space pixel coordinates to percentage space polygon space
        var polygonPixelWidth = (self.selectedSpot.width/100)*self.canvasWidth;
        var polygonPixelHeight = (self.selectedSpot.height/100)*self.canvasHeight;
        var xPolygonPixelSpace = self.x - ((self.selectedSpot.x/100) * self.canvasWidth);
        var yPolygonPixelSpace = self.y - ((self.selectedSpot.y/100) * self.canvasHeight);
        var xPolygonPerSpace = (xPolygonPixelSpace/polygonPixelWidth) * 100;
        var yPolygonPerSpace = (yPolygonPixelSpace/polygonPixelHeight) * 100;

        var p;
        if (p = self.shouldShowTempControlPoint(xPolygonPerSpace, yPolygonPerSpace, self.selectedSpot.points)) {
            // Show
            self.tempControlPoint.show();
            self.tempControlPointLine.show();

            self.tempControlPoint.css({
                left: p.x + '%',
                top: p.y + '%'
            });

            self.controlPointInsertionPointX = p.x;
            self.controlPointInsertionPointY = p.y;
        } else {
            // Hide
            self.tempControlPoint.hide();
            self.tempControlPointLine.hide();
        }
    }
    Editor.prototype.shouldShowTempControlPoint = function(x, y, points) {
        var self = this;
        var p1 = { x: x, y: y };

        // Test for each line
        for (var i=0; i<points.length; i++) {
            var p2 = { x: points[i].x, y: points[i].y };
            var p3 = undefined;

            if (points[i+1]) {
                p3 = { x: points[i+1].x, y: points[i+1].y };
            } else {
                p3 = { x: points[0].x, y: points[0].y };
            }

            var t = pointLineSegmentParameter([p1.x, p1.y], [p2.x, p2.y], [p3.x, p3.y]);
            var d = distanceFromLineToPoint(p2.x, p2.y, p3.x, p3.y, p1.x, p1.y);

            var x10 = p3.x - p2.x;
            var y10 = p3.y - p2.y;

            if (Math.abs(t - 0.5) < 0.45 && d < 5) {
                self.tempControlPointIndex = i;
                return { x: p2.x + t * x10, y: p2.y + t * y10};
            }
        }

        return false;
    }
    Editor.prototype.updateBoundingBoxForPolygonSpot = function(s) {
        var minX=99999, minY=99999, maxX=-99999, maxY=-99999;
        for (var i=0; i<s.points.length; i++) {
            var p = s.points[i];

            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        }

        // Calculate new bounding box
        var o = relLocalToRelCanvasSpace({ x: minX, y: minY }, s);
        var o2 = relLocalToRelCanvasSpace({ x: maxX, y: maxY }, s);

        // Update the coordinates of the points
        for (var i=0; i<s.points.length; i++) {
            var p = s.points[i];

            // to canvas space
            var p1 = relLocalToRelCanvasSpace(p, s);
            // to local space
            var p2 = relCanvasToRelLocalSpace(p1, { x: o.x, y: o.y, width: o2.x - o.x, height: o2.y - o.y });
            // debugger;
            p.x = p2.x;
            p.y = p2.y;
        }

        // Set new values
        s.x = o.x;
        s.y = o.y;
        s.width = o2.x - o.x;
        s.height = o2.y - o.y;

        // debugger;
    }

    Editor.prototype.updateShapesList = function() {
        // Create a list of items
        var listItems = [];
        for (var i=0; i<settings.spots.length; i++) {
            var s = settings.spots[i];
            listItems.push({ id: s.id, title: s.id });
        }

        // Set items
        $.wcpEditorSetListItems(listItems);

        // Select item
        $.wcpEditorSelectListItem(settings.editor.selected_shape);
    }
    Editor.prototype.updateShapesForm = function() {
        // This function needs to be called only when a shape is created, selected or deselected

        var i = this.getIndexOfSpotWithId(settings.editor.selected_shape);
        var s = settings.spots[i];

        if (s) {
            // General
            $.wcpEditorSetControlValue('Shape Settings', 'x', s.x);
            $.wcpEditorSetControlValue('Shape Settings', 'y', s.y);
            $.wcpEditorSetControlValue('Shape Settings', 'width', s.width);
            $.wcpEditorSetControlValue('Shape Settings', 'height', s.height);

            // Actions
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover', s.actions.mouseover);
            $.wcpEditorSetControlValue('Shape Settings', 'click', s.actions.click);
            $.wcpEditorSetControlValue('Shape Settings', 'link', s.actions.link);
            $.wcpEditorSetControlValue('Shape Settings', 'open_link_in_new_window', s.actions.open_link_in_new_window);

            // Icon
            $.wcpEditorSetControlValue('Shape Settings', 'use_icon', s.default_style.use_icon);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_type', s.default_style.icon_type);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_svg_path', s.default_style.icon_svg_path);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_svg_viewbox', s.default_style.icon_svg_viewbox);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_url', s.default_style.icon_url);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_is_pin', s.default_style.icon_is_pin);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_shadow', s.default_style.icon_shadow);

            // Default Style
            $.wcpEditorSetControlValue('Shape Settings', 'opacity', s.default_style.opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_fill', s.default_style.icon_fill);
            $.wcpEditorSetControlValue('Shape Settings', 'border_radius', s.default_style.border_radius);
            $.wcpEditorSetControlValue('Shape Settings', 'background_color', s.default_style.background_color);
            $.wcpEditorSetControlValue('Shape Settings', 'background_opacity', s.default_style.background_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'border_width', s.default_style.border_width);
            $.wcpEditorSetControlValue('Shape Settings', 'border_style', s.default_style.border_style);
            $.wcpEditorSetControlValue('Shape Settings', 'border_color', s.default_style.border_color);
            $.wcpEditorSetControlValue('Shape Settings', 'border_opacity', s.default_style.border_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'fill', s.default_style.fill);
            $.wcpEditorSetControlValue('Shape Settings', 'fill_opacity', s.default_style.fill_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'stroke_color', s.default_style.stroke_color);
            $.wcpEditorSetControlValue('Shape Settings', 'stroke_opacity', s.default_style.stroke_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'stroke_width', s.default_style.stroke_width);
            $.wcpEditorSetControlValue('Shape Settings', 'stroke_dasharray', s.default_style.stroke_dasharray);
            $.wcpEditorSetControlValue('Shape Settings', 'stroke_linecap', s.default_style.stroke_linecap);

            // Mouseover Style
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_opacity', s.mouseover_style.opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_icon_fill', s.mouseover_style.icon_fill);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_border_radius', s.mouseover_style.border_radius);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_background_color', s.mouseover_style.background_color);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_background_opacity', s.mouseover_style.background_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_border_width', s.mouseover_style.border_width);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_border_style', s.mouseover_style.border_style);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_border_color', s.mouseover_style.border_color);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_border_opacity', s.mouseover_style.border_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_fill', s.mouseover_style.fill);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_fill_opacity', s.mouseover_style.fill_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_stroke_color', s.mouseover_style.stroke_color);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_stroke_opacity', s.mouseover_style.stroke_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_stroke_width', s.mouseover_style.stroke_width);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_stroke_dasharray', s.mouseover_style.stroke_dasharray);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_stroke_linecap', s.mouseover_style.stroke_linecap);

            // Tooltip Settings
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_border_radius', s.tooltip_style.border_radius);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_padding', s.tooltip_style.padding);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_background_color', s.tooltip_style.background_color);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_background_opacity', s.tooltip_style.background_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_position', s.tooltip_style.position);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_width', s.tooltip_style.width);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_auto_width', s.tooltip_style.auto_width);

            // Tooltip Content (to do)
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_content_type', s.tooltip_content.content_type);
            $.wcpEditorSetControlValue('Shape Settings', 'plain_text', s.tooltip_content.plain_text);
            $.wcpEditorSetControlValue('Shape Settings', 'squares_json', s.tooltip_content.squares_json);
            $.wcpEditorSetControlValue('Shape Settings', 'squares_content', s.tooltip_content.squares_content);

            // Do a "redraw update" of the form only when the selection changes
            // To show/hide shape-specific controls
            if (i == this.shapesFormSpotIndex) return;
            this.shapesFormSpotIndex = i;

            var form = $.wcpEditorGetHTMLForFormWithName('Shape Settings');
            $.wcpEditorSetContentForTabWithName('Shape', form);

            $.wcpEditorUpdateForm('Shape Settings');

            // Open Shape Settings tab
            $.wcpEditorOpenMainTabWithName('Shape');

            // Show/hide controls
            this.updateShapesFormStateMaster();
        } else {
            this.shapesFormSpotIndex = -1;
            $.wcpEditorSetContentForTabWithName('Shape', '<div class="wcp-editor-form-tabs-content-wrap">No shape selected.</div>');
        }
    }
    Editor.prototype.updateShapesFormState = function() {
        // Show/hide controls, depending on current settings of the selected shape

        var i = this.getIndexOfSpotWithId(settings.editor.selected_shape);
        var s = settings.spots[i];

        if (!s) return;

        if (s.type == 'spot') {
            // Show/hide icon controls, if the spot is an icon or not
            if (parseInt(s.default_style.use_icon, 10) == 1) {
                // Icon tab
                $.wcpEditorFormShowControl('Shape Settings', 'icon_type');

                if (s.default_style.icon_type == 'library') {
                    $.wcpEditorFormHideControl('Shape Settings', 'icon_url');
                    $.wcpEditorFormShowControl('Shape Settings', 'choose_icon_from_library');
                }

                if (s.default_style.icon_type == 'custom') {
                    $.wcpEditorFormShowControl('Shape Settings', 'icon_url');
                    $.wcpEditorFormHideControl('Shape Settings', 'choose_icon_from_library');
                }

                $.wcpEditorFormShowControl('Shape Settings', 'icon_is_pin');
                $.wcpEditorFormShowControl('Shape Settings', 'icon_shadow');

                // Default style tab
                $.wcpEditorFormShowControl('Shape Settings', 'icon_fill');

                $.wcpEditorFormHideControl('Shape Settings', 'border_radius');
                $.wcpEditorFormHideControl('Shape Settings', 'background_color');
                $.wcpEditorFormHideControl('Shape Settings', 'background_opacity');
                $.wcpEditorFormHideControl('Shape Settings', 'border_width');
                $.wcpEditorFormHideControl('Shape Settings', 'border_style');
                $.wcpEditorFormHideControl('Shape Settings', 'border_color');
                $.wcpEditorFormHideControl('Shape Settings', 'border_opacity');

                // Mouseover style tab
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_icon_fill');

                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_radius');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_background_color');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_background_opacity');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_width');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_style');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_color');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_opacity');
            } else {
                // Icon tab
                $.wcpEditorFormHideControl('Shape Settings', 'choose_icon_from_library');
                $.wcpEditorFormHideControl('Shape Settings', 'icon_type');
                $.wcpEditorFormHideControl('Shape Settings', 'icon_url');
                $.wcpEditorFormHideControl('Shape Settings', 'icon_is_pin');
                $.wcpEditorFormHideControl('Shape Settings', 'icon_shadow');

                // Default style tab
                $.wcpEditorFormHideControl('Shape Settings', 'icon_fill');

                $.wcpEditorFormShowControl('Shape Settings', 'border_radius');
                $.wcpEditorFormShowControl('Shape Settings', 'background_color');
                $.wcpEditorFormShowControl('Shape Settings', 'background_opacity');
                $.wcpEditorFormShowControl('Shape Settings', 'border_width');
                $.wcpEditorFormShowControl('Shape Settings', 'border_style');
                $.wcpEditorFormShowControl('Shape Settings', 'border_color');
                $.wcpEditorFormShowControl('Shape Settings', 'border_opacity');

                // Mouseover style tab
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_icon_fill');

                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_radius');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_color');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_opacity');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_width');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_style');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_color');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_opacity');
            }
        }

        // Tooltip content type
        if (s.tooltip_content.content_type == 'plain-text') {
            $.wcpEditorFormShowControl('Shape Settings', 'plain_text');
            $.wcpEditorFormHideControl('Shape Settings', 'launch_content_builder');
            $.wcpEditorFormShowControl('Shape Settings', 'plain_text_color');
        } else {
            $.wcpEditorFormHideControl('Shape Settings', 'plain_text');
            $.wcpEditorFormShowControl('Shape Settings', 'launch_content_builder');
            $.wcpEditorFormHideControl('Shape Settings', 'plain_text_color');
        }
    }
    Editor.prototype.updateShapesFormStateMaster = function() {
        // Show/hide controls, depending on the type of the current selected shape
        var i = this.getIndexOfSpotWithId(settings.editor.selected_shape);
        var s = settings.spots[i];

        if (!s) return;

        if (s.type == 'spot') {
            // Show the Icon tab
            $.wcpEditorFormShowControlsGroup('Shape Settings', 'icon');

            // Show icon specific controls
            $.wcpEditorFormShowControl('Shape Settings', 'icon_fill');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_icon_fill');

            // Show common controls
            $.wcpEditorFormShowControl('Shape Settings', 'opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'border_opacity');

            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_opacity');

            // Hide polygon-specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'fill');
            $.wcpEditorFormHideControl('Shape Settings', 'fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_linecap');

            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_linecap');
        }
        if (s.type == 'rect') {
            // Hide the Icon tab
            $.wcpEditorFormHideControlsGroup('Shape Settings', 'icon');

            // Hide icon specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'icon_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_icon_fill');

            // Show common controls
            $.wcpEditorFormShowControl('Shape Settings', 'opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'border_opacity');

            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_opacity');

            // Hide polygon-specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'fill');
            $.wcpEditorFormHideControl('Shape Settings', 'fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_linecap');

            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_linecap');
        }
        if (s.type == 'oval') {
            // Hide the Icon tab
            $.wcpEditorFormHideControlsGroup('Shape Settings', 'icon');

            // Hide icon specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'icon_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_icon_fill');

            // Show common controls
            $.wcpEditorFormShowControl('Shape Settings', 'opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'border_opacity');

            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_opacity');

            // Hide polygon-specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'fill');
            $.wcpEditorFormHideControl('Shape Settings', 'fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_linecap');

            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_linecap');
        }
        if (s.type == 'poly') {
            // Hide the Icon tab
            $.wcpEditorFormHideControlsGroup('Shape Settings', 'icon');

            // Hide icon specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'icon_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_icon_fill');

            // Hide common controls
            $.wcpEditorFormHideControl('Shape Settings', 'opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'border_radius');
            $.wcpEditorFormHideControl('Shape Settings', 'background_color');
            $.wcpEditorFormHideControl('Shape Settings', 'background_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'border_width');
            $.wcpEditorFormHideControl('Shape Settings', 'border_style');
            $.wcpEditorFormHideControl('Shape Settings', 'border_color');
            $.wcpEditorFormHideControl('Shape Settings', 'border_opacity');

            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_radius');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_background_color');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_background_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_width');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_style');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_color');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_opacity');

            // Show polygon-specific controls
            $.wcpEditorFormShowControl('Shape Settings', 'fill');
            $.wcpEditorFormShowControl('Shape Settings', 'fill_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'stroke_color');
            $.wcpEditorFormShowControl('Shape Settings', 'stroke_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'stroke_width');
            $.wcpEditorFormShowControl('Shape Settings', 'stroke_dasharray');
            $.wcpEditorFormShowControl('Shape Settings', 'stroke_linecap');

            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_fill');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_fill_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_stroke_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_stroke_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_stroke_width');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_stroke_dasharray');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_stroke_linecap');
        }

        // Hide controls which should be always hidden
        $.wcpEditorFormHideControl('Shape Settings', 'icon_svg_path');
        $.wcpEditorFormHideControl('Shape Settings', 'icon_svg_viewbox');
        $.wcpEditorFormHideControl('Shape Settings', 'squares_json');
        $.wcpEditorFormHideControl('Shape Settings', 'squares_content');
    }
    Editor.prototype.updateImageMapForm = function() {
        $.wcpEditorSetControlValue('Image Map Settings', 'image_map_name', settings.general.name);
        $.wcpEditorSetControlValue('Image Map Settings', 'image_map_shortcode', settings.general.shortcode);
        $.wcpEditorSetControlValue('Image Map Settings', 'image_map_width', settings.general.width);
        $.wcpEditorSetControlValue('Image Map Settings', 'image_map_height', settings.general.height);
        $.wcpEditorSetControlValue('Image Map Settings', 'responsive', settings.general.responsive);
        $.wcpEditorSetControlValue('Image Map Settings', 'sticky_tooltips', settings.general.sticky_tooltips);
        $.wcpEditorSetControlValue('Image Map Settings', 'constrain_tooltips', settings.general.constrain_tooltips);
        $.wcpEditorSetControlValue('Image Map Settings', 'image_url', settings.general.image_url);
        $.wcpEditorSetControlValue('Image Map Settings', 'tooltip_animation', settings.general.tooltip_animation);
        $.wcpEditorSetControlValue('Image Map Settings', 'pageload_animation', settings.general.pageload_animation);
        $.wcpEditorSetControlValue('Image Map Settings', 'fullscreen_tooltips', settings.general.fullscreen_tooltips);
        $.wcpEditorSetControlValue('Image Map Settings', 'late_initialization', settings.general.late_initialization);

        $.wcpEditorUpdateForm('Image Map Settings');
    }

    Editor.prototype.launchTooltipContentBuilder = function() {
        if ($('#imp-editor-tooltip-content-builder-wrap').length == 0) {
            // add HTML
            var html = '';

            html += '<div id="imp-editor-tooltip-content-builder-wrap">';
            html += '   <div id="imp-editor-tooltip-content-builder-background"></div>';
            html += '   <div id="imp-editor-tooltip-content-builder-close"><i class="fa fa-times" aria-hidden="true"></i></div>';
            html += '   <div id="imp-editor-tooltip-content-builder-tooltip-wrap" class="squares">';
            html += '       <div id="imp-editor-tooltip-content-builder" class="squares"></div>';
            html += '   </div>';
            html += '   <div id="imp-editor-tooltip-content-builder-description">';
            html += '       <p>Press the Done button when you are done editing, or click the Close button in the upper-right corner.</p>';
            html += '   </div>';
            html += '   <div class="wcp-editor-control-button" id="imp-editor-done-editing-tooltip">Done</div>';
            html += '</div>';

            $('body').append(html);
        } else {
            $('#imp-editor-tooltip-content-builder-wrap').show();
        }

        setTimeout(function() {
            $('#imp-editor-tooltip-content-builder-wrap').addClass('imp-visible');
        }, 10);

        // Set width of the content root
        var tooltipWidth = this.selectedSpot.tooltip_style.width;
        var tooltipBackgroundRGB = hexToRgb(this.selectedSpot.tooltip_style.background_color);
        var tooltipBackground = 'rgba('+ tooltipBackgroundRGB.r +', '+ tooltipBackgroundRGB.g +', '+ tooltipBackgroundRGB.b +', '+ this.selectedSpot.tooltip_style.background_opacity +')';

        $('#imp-editor-tooltip-content-builder-tooltip-wrap').css({
            width: tooltipWidth,
            background: tooltipBackground
        });

        // initialize content builder
        $.squaresInitWithSettings($('#imp-editor-tooltip-content-builder'), this.selectedSpot.tooltip_content.squares_json);
        $.squaresShowEditorWindow(20, 20);
    }
    Editor.prototype.doneEditingTooltip = function() {
        var json = $.squaresGetCurrentSettings($('#imp-editor-tooltip-content-builder'));
        var html = $.squaresGenerateHTML($('#imp-editor-tooltip-content-builder'));

        this.selectedSpot.tooltip_content.squares_json = json;
        this.selectedSpot.tooltip_content.squares_content = html;

        this.redraw();
    }

    Editor.prototype.getCompressedSettings = function() {
        var compressed = $.extend(true, {}, settings);
        var compressedSpots = [];

        for (var i=0; i<compressed.spots.length; i++) {
            compressedSpots[i] = $.wcpCompress(compressed.spots[i], default_spot_settings);

            compressedSpots[i].x = Math.round(compressedSpots[i].x * 1000) / 1000;
            compressedSpots[i].y = Math.round(compressedSpots[i].y * 1000) / 1000;

            if (compressedSpots[i].width) {
                compressedSpots[i].width = Math.round(compressedSpots[i].width * 1000) / 1000;
            }
            if (compressedSpots[i].height) {
                compressedSpots[i].height = Math.round(compressedSpots[i].height * 1000) / 1000;
            }
        }

        compressed = $.wcpCompress(settings, default_settings);
        compressed.spots = compressedSpots;

        return compressed;
    }

    function loadImage(image, cbLoading, cbComplete, cbError) {
        if (!image.complete || image.naturalWidth === undefined || image.naturalHeight === undefined) {
            cbLoading();
            $(image).on('load', function() {
                $(image).off('load');
                cbComplete();
            });
            $(image).on('error', function() {
                $(image).off('error');
                cbError();
            });
        } else {
            cbComplete();
        }
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    function abs_to_rel(val, min, max) {
        return ((min + max) / val) * 100;
    }
    function rel_to_abs(val, min, max) {
        return ((min + max) * val) * 100;
    }
    function screenToCanvasSpace(x, y, canvas) {
        return {
            x: Math.round((x - canvas.offset().left)*10)/10,
            y: Math.round((y - canvas.offset().top)*10)/10
        }
    }
    function relLocalToRelCanvasSpace(p, localSpace) {
        return {
            x: (localSpace.width)*(p.x / 100) + localSpace.x,
            y: (localSpace.height)*(p.y / 100) + localSpace.y
        }
    }
    function relCanvasToRelLocalSpace(p, localSpace) {
        return {
            x: ((p.x - localSpace.x)/(localSpace.width))*100,
            y: ((p.y - localSpace.y)/(localSpace.height))*100
        }
    }

    function limitToCanvas(x, y) {
        if (x < 0) x = 0;
        if (x > 100) x = 100;
        if (y < 0) y = 0;
        if (y > 100) y = 100;

        return {
            x: Math.round(x*10)/10,
            y: Math.round(y*10)/10
        }
    }
    function isPointInsidePolygon(point, vs) {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        var x = point.x, y = point.y;

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];

            var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    }
    function distanceFromLineToPoint(lx1, ly1, lx2, ly2, px, py) {
        return Math.abs((ly2 - ly1)*px - (lx2 - lx1)*py + lx2*ly1 - ly2*lx1)/(Math.sqrt(Math.pow(ly2 - ly1, 2) + Math.pow(lx2 - lx1, 2)));
    }
    function pointLineSegmentParameter(p2, p0, p1) { // p0, p1 - line
        var x10 = p1[0] - p0[0], y10 = p1[1] - p0[1],
        x20 = p2[0] - p0[0], y20 = p2[1] - p0[1];
        return (x20 * x10 + y20 * y10) / (x10 * x10 + y10 * y10);
    }

})( jQuery, window, document );

// Webcraft Plugins Ltd.
// Author: Nikolay Dyankov

/*
Class hierarchy and descriptions:

- WCPEditor
The main class.

- WCPEditorForm
An abstract class, containing a list of controls, grouped in tabs.
It will get/set values for the controls in bulk.
It will generate its own HTML code.

- WCPEditorControl
An object, representing a single control. It will have a getter
and a setter.
*/

;(function ($, window, document, undefined) {
    var wcpEditor = undefined;
    var wcpForms = [];
    var registeredControls = [];

    function WCPEditor() {
        this.host = $('#wcp-editor');
        this.forms = {};

        this.tooltip = undefined;
        this.modal = undefined;
        this.modalTimeout = undefined;

        this.loadingScreen = undefined;
        this.loadingScreenTimeout = undefined;

        // Temp vars
        this.saveToDeleteID = undefined;
    }
    WCPEditor.prototype.init = function(options) {
        this.options = options;

        // Build UI
        var html = '';

        var canvasClass = '';
        if (this.options.canvasFill) {
            canvasClass = 'wcp-editor-canvas-fill';
        }

        var canvasStyle = '';
        if (!this.options.canvasFill) {
            canvasStyle += 'width: ' + this.options.canvasWidth + 'px; height: ' + this.options.canvasHeight + 'px;';
        }

        html += '<div id="wcp-editor-left">';

        // Save, Load, Code, Preview buttons

        html += '   <div id="wcp-editor-main-buttons">';
        if (this.options.newButton) {
            html += '       <div id="wcp-editor-button-new" class="wcp-editor-main-button">';
            html += '           <div class="wcp-editor-main-button-icon"><i class="fa fa-file" aria-hidden="true"></i></div>';
            html += '           <div class="wcp-editor-main-button-text">New</div>';
            html += '       </div>';
        }
        html += '       <div id="wcp-editor-button-save" class="wcp-editor-main-button">';
        html += '           <div class="wcp-editor-main-button-icon"><i class="fa fa-floppy-o" aria-hidden="true"></i></div>';
        html += '           <div class="wcp-editor-main-button-text">Save</div>';
        html += '       </div>';
        html += '       <div id="wcp-editor-button-load" class="wcp-editor-main-button">';
        html += '           <div class="wcp-editor-main-button-icon"><i class="fa fa-sign-out" aria-hidden="true"></i></div>';
        html += '           <div class="wcp-editor-main-button-text">Load</div>';
        html += '       </div>';
        html += '       <div id="wcp-editor-button-undo" class="wcp-editor-main-button">';
        html += '           <div class="wcp-editor-main-button-icon"><i class="fa fa-undo" aria-hidden="true"></i></div>';
        html += '           <div class="wcp-editor-main-button-text">Undo</div>';
        html += '       </div>';
        html += '       <div id="wcp-editor-button-redo" class="wcp-editor-main-button">';
        html += '           <div class="wcp-editor-main-button-icon"><i class="fa fa-repeat" aria-hidden="true"></i></div>';
        html += '           <div class="wcp-editor-main-button-text">Redo</div>';
        html += '       </div>';
        html += '       <div id="wcp-editor-button-preview" class="wcp-editor-main-button">';
        html += '           <div class="wcp-editor-main-button-icon"><i class="fa fa-eye" aria-hidden="true"></i></div>';
        html += '           <div class="wcp-editor-main-button-text">Preview</div>';
        html += '       </div>';

        html += '   </div>';

        // Main toolbar tab buttons
        html += '<div id="wcp-editor-main-tab-buttons">';
        for (var i=0; i<this.options.mainTabs.length; i++) {
            html += '<div class="wcp-editor-main-tab-button" data-wcp-main-tab-button-name="'+ this.options.mainTabs[i].name +'">';
            html += '   <div class="wcp-editor-main-tab-button-icon"><i class="'+ this.options.mainTabs[i].icon +'" aria-hidden="true"></i></div>';
            html += '   <div class="wcp-editor-main-tab-button-text">'+ this.options.mainTabs[i].name +'</div>';
            html += '</div>';
        }
        html += '</div>';

        // Main toolbar tab content
        html += '<div id="wcp-editor-main-tab-contents">';
        for (var i=0; i<this.options.mainTabs.length; i++) {
            html += '<div class="wcp-editor-main-tab-content" data-wcp-main-tab-content-name="'+ this.options.mainTabs[i].name +'">';
            html += '   <div class="wcp-editor-main-tab-content-title">'+ this.options.mainTabs[i].title +'</div>';
            html += '   <div class="wcp-editor-main-tab-content-inner-wrap">'+ $.wcpEditorGetContentForTabWithName(this.options.mainTabs[i].name) +'</div>';
            html += '</div>';
        }
        html += '</div>';

        html += '</div>';
        html += '<div id="wcp-editor-center">';

        // Help button
        if (this.options.newButton) {
            html += '<div id="wcp-editor-help-button"><i class="fa fa-question" aria-hidden="true"></i></div>';
        }

        // Extra main buttons
        html += '    <div id="wcp-editor-extra-main-buttons">';
        for (var i=0; i<this.options.extraMainButtons.length; i++) {
            var b = this.options.extraMainButtons[i];

            html += '       <div class="wcp-editor-extra-main-button" data-wcp-editor-extra-main-button-name="'+ b.name +'">';
            html += '           <div class="wcp-editor-extra-main-button-icon"><i class="'+ b.icon +'" aria-hidden="true"></i></div>';
            html += '           <div class="wcp-editor-extra-main-button-title">'+ b.title +'</div>';
            html += '       </div>';
        }
        html += '    </div>';

        // Toolbar
        html += '    <div id="wcp-editor-toolbar">';
        for (var i=0; i<this.options.toolbarButtons.length; i++) {
            var b = this.options.toolbarButtons[i];

            var icon = '';

            if (b.customIcon != undefined) {
                icon = b.customIcon;
            } else {
                icon = '<i class="'+ b.icon +'" aria-hidden="true"></i>';
            }

            html += '       <div class="wcp-editor-toolbar-button" data-wcp-editor-toolbar-button-name="'+ b.name +'" data-wcp-tooltip="'+ b.title +'" data-wcp-tooltip-position="right">';
            html += '           <div class="wcp-editor-toolbar-button-icon">'+ icon +'</div>';
            html += '           <div class="wcp-editor-toolbar-button-title">'+ b.title +'</div>';
            html += '       </div>';
        }
        html += '    </div>';

        // Canvas
        html += '    <div id="wcp-editor-canvas" class="'+ canvasClass +'" style="'+ canvasStyle +'">'+ $.wcpEditorGetContentForCanvas() +'</div>';
        html += '</div>';

        // Editor-right
        html += '<div id="wcp-editor-right">';
        html += '</div>';

        this.host.html(html);

        // Set the list items
        this.setListItems($.wcpEditorGetListItems());

        // Show the first main tab
        this.openMainTabWithName(this.options.mainTabs[0].name);

        this.events();
    };
    WCPEditor.prototype.events = function () {
        var self = this;

        // Main tab functionality
        $('[data-wcp-main-tab-button-name]').on('click', function() {
            var name = $(this).data('wcp-main-tab-button-name');
            self.openMainTabWithName(name);
        });

        // Main buttons events

        // New
        $(document).off('click', '#wcp-editor-button-new');
        $(document).on('click', '#wcp-editor-button-new', function() {
            $.wcpEditorEventNewButtonPressed();
            self.presentCreateNewModal();
        });

        // Save
        $(document).off('click', '#wcp-editor-button-save');
        $(document).on('click', '#wcp-editor-button-save', function() {
            $.wcpEditorEventSaveButtonPressed();
        });

        // Load
        $(document).off('click', '#wcp-editor-button-load');
        $(document).on('click', '#wcp-editor-button-load', function() {
            $.wcpEditorEventLoadButtonPressed();
            self.presentLoadModal();
        });

        // Undo
        $(document).off('click', '#wcp-editor-button-undo');
        $(document).on('click', '#wcp-editor-button-undo', function() {
            $.wcpEditorEventUndoButtonPressed();
        });

        // Redo
        $(document).off('click', '#wcp-editor-button-redo');
        $(document).on('click', '#wcp-editor-button-redo', function() {
            $.wcpEditorEventRedoButtonPressed();
        });

        // Preview
        $(document).off('click', '#wcp-editor-button-preview');
        $(document).on('click', '#wcp-editor-button-preview', function() {
            $.wcpEditorEventPreviewButtonPressed();

            if (self.options.previewToggle) {
                if ($(this).hasClass('wcp-active')) {
                    $(this).removeClass('wcp-active');

                    $.wcpEditorEventExitedPreviewMode();
                } else {
                    $(this).addClass('wcp-active');
                    $.wcpEditorEventEnteredPreviewMode();
                }
            }
        });

        // Extra main buttons events
        $(document).off('click', '.wcp-editor-extra-main-button');
        $(document).on('click', '.wcp-editor-extra-main-button', function(e) {
            var buttonName = $(this).data('wcp-editor-extra-main-button-name');
            $.wcpEditorEventExtraMainButtonClick(buttonName);

            // Import button
            if (buttonName == 'import') {
                self.presentImportModal();
            }

            // Export button
            if (buttonName == 'export') {
                self.presentExportModal();
            }
        });

        // Tools events
        $(document).off('click', '.wcp-editor-toolbar-button');
        $(document).on('click', '.wcp-editor-toolbar-button', function(e) {
            $('.wcp-editor-toolbar-button').removeClass('wcp-active');
            $(this).addClass('wcp-active');
            $.wcpEditorEventSelectedTool($(this).data('wcp-editor-toolbar-button-name'));
        });

        // Help button event
        $(document).off('click', '#wcp-editor-help-button');
        $(document).on('click', '#wcp-editor-help-button', function(e) {
            $.wcpEditorEventHelpButtonPressed();
        });


        // List items events
        $(document).off('mouseover', '.wcp-editor-list-item');
        $(document).on('mouseover', '.wcp-editor-list-item', function(e) {
            $.wcpEditorEventListItemMouseover($(this).data('wcp-editor-list-item-id'));
        });

        $(document).off('click', '.wcp-editor-list-item');
        $(document).on('click', '.wcp-editor-list-item', function(e) {
            if ($(e.target).closest('.wcp-editor-list-item-buttons').length == 0) {
                self.selectListItem($(this).data('wcp-editor-list-item-id'));

                $.wcpEditorEventListItemSelected($(this).data('wcp-editor-list-item-id'));
            }
        });
        $(document).off('click', '.wcp-editor-list-item-button');
        $(document).on('click', '.wcp-editor-list-item-button', function() {
            var itemID = $(this).closest('.wcp-editor-list-item').data('wcp-editor-list-item-id');
            var buttonName = $(this).data('wcp-editor-list-item-button-name');
            $.wcpEditorEventListItemButtonPressed(itemID, buttonName);
        });

        // Tooltip functionality
        $(document).off('mouseover', '[data-wcp-tooltip]');
        $(document).on('mouseover', '[data-wcp-tooltip]', function(e) {
            self.showTooltip($(this), $(this).data('wcp-tooltip'), $(this).data('wcp-tooltip-position'));
        });
        $(document).off('mouseout', '[data-wcp-tooltip]');
        $(document).on('mouseout', '[data-wcp-tooltip]', function(e) {
            self.hideTooltip($(this));
        });

        // Modal events
        $(document).off('click', '#wcp-editor-modal');
        $(document).on('click', '#wcp-editor-modal', function(e) {
            if ($(e.target).attr('id') == 'wcp-editor-modal') {
                self.closeModal();
                var modalName = $('#wcp-editor-modal').data('wcp-editor-modal-name');
                $.wcpEditorEventModalClosed(modalName);
            }
        });
        $(document).off('click', '.wcp-editor-modal-close');
        $(document).on('click', '.wcp-editor-modal-close', function(e) {
            self.closeModal();
            var modalName = $('#wcp-editor-modal').data('wcp-editor-modal-name');
            $.wcpEditorEventModalClosed(modalName);
        });
        $(document).off('click', '.wcp-editor-modal-button');
        $(document).on('click', '.wcp-editor-modal-button', function(e) {
            var modalName = $('#wcp-editor-modal').data('wcp-editor-modal-name');
            var buttonName = $(this).data('wcp-editor-modal-button-name');
            $.wcpEditorEventModalButtonClicked(modalName, buttonName);
        });
        $(document).off('click', '#wcp-editor-confirm-import');
        $(document).on('click', '#wcp-editor-confirm-import', function(e) {
            // Validate JSON
            var json = $('#wcp-editor-textarea-import').val();
            var parsedJSON = undefined;

            try {
                parsedJSON = JSON.parse(json);
            } catch (err) {
                console.log('error decoding JSON!');
            }

            if (parsedJSON === undefined) {
                // Show error text
                $('#wcp-editor-import-error').show();
            } else {
                // No error
                $('#wcp-editor-import-error').hide();

                // Fire event
                $.wcpEditorEventImportedJSON(parsedJSON);

                // Close modal
                self.closeModal();
            }
        });


        // Create new instance button
        $(document).off('click', '#wcp-editor-button-create-new-instance');
        $(document).on('click', '#wcp-editor-button-create-new-instance', function(e) {
            // validate
            if ($('#wcp-editor-input-create-new').val().length == 0) {
                // show error
                $('#wcp-editor-create-new-error').show();
            } else {
                // hide error, send event and close modal
                $('#wcp-editor-create-new-error').hide();

                var instanceName = $('#wcp-editor-input-create-new').val();
                $.wcpEditorEventCreatedNewInstance(instanceName);
                self.closeModal();
            }
        });
        // Load modal list item
        $(document).off('click', '.wcp-editor-save-list-item');
        $(document).on('click', '.wcp-editor-save-list-item', function() {
            var saveID = $(this).parent().data('wcp-editor-save-list-item-id');
            $.wcpEditorEventLoadSaveWithID(saveID);
            self.closeModal();
        });
        // Load modal delete button
        $(document).off('click', '.wcp-editor-save-list-item-delete-button');
        $(document).on('click', '.wcp-editor-save-list-item-delete-button', function() {
            self.saveToDeleteID = $(this).parent().data('wcp-editor-save-list-item-id');

            self.closeModal();

            // Present delete save confirmation modal
            self.presentDeleteSaveConfirmationModal();
        });
        // Save delete modal cancel
        $(document).off('click', '#wcp-editor-cancel-delete-save');
        $(document).on('click', '#wcp-editor-cancel-delete-save', function() {
            self.presentLoadModal();
        });
        // Save delete modal confirm
        $(document).off('click', '#wcp-editor-confirm-delete-save');
        $(document).on('click', '#wcp-editor-confirm-delete-save', function() {
            $.wcpEditorEventDeleteSaveWithID(self.saveToDeleteID, function() {
                self.presentLoadModal();
            });
        });

        // Press Enter to trigger the primary modal button
        $(document).off('keyup', '#wcp-editor-input-create-new');
        $(document).on('keyup', '#wcp-editor-input-create-new', function(e) {
            if (e.keyCode == 13 && $('#wcp-editor-modal').length > 0 && $('#wcp-editor-modal').hasClass('wcp-editor-modal-visible')) {
                if ($('.wcp-editor-modal-button-primary').length == 1) {
                    $('.wcp-editor-modal-button-primary').click();
                }
                if ($('.wcp-editor-modal-button-danger').length == 1) {
                    $('.wcp-editor-modal-button-danger').click();
                }
            }
        });

        // List items reorder
        var iex = 0, iey = 0, ix = 0, iy = 0;
        var shouldStartDragging = false, didStartDragging = false, dragThreshold = 5;
        var dragMap = [], startingItemIndex = -1, currentItemIndex = -1;
        var draggedListItem = undefined, listItemCopy = undefined;
        var draggedListItemWidth = 0;
        var draggedListItemHeight = 0;
        var listScroll = 0;

        $(document).off('mousedown', '.wcp-editor-list-item');
        $(document).on('mousedown', '.wcp-editor-list-item', function(e) {
            iex = e.pageX;
            iey = e.pageY;

            shouldStartDragging = true;
            draggedListItem = $(this);

            // Set the startingItemIndex
            startingItemIndex = draggedListItem.data('wcp-editor-list-item-index');

            // Cache some variables
            draggedListItemWidth = draggedListItem.outerWidth();
            draggedListItemHeight = draggedListItem.outerHeight();

            // Cache the list scroll
            listScroll = $('#wcp-editor-right').scrollTop();
        });

        $(document).off('mousemove.wcp-editor-list-item-reorder');
        $(document).on('mousemove.wcp-editor-list-item-reorder', function(e) {
            var dx = Math.abs(e.pageX - iex);
            var dy = Math.abs(e.pageY - iey);

            if (!didStartDragging && shouldStartDragging && (dx > dragThreshold || dy > dragThreshold)) {
                didStartDragging = true;

                // Create a copy of the list item at the current mouse position
                listItemCopy = draggedListItem.clone();
                listItemCopy.addClass('wcp-editor-dragged-list-item');
                listItemCopy.css({
                    width: draggedListItemWidth,
                    left: draggedListItem.offset().left,
                    top: draggedListItem.offset().top
                });

                ix = draggedListItem.offset().left;
                iy = draggedListItem.offset().top;

                $('body').prepend(listItemCopy);

                // Wrap the listItemCopy in an element to prevent it from going
                // beyond the boundaries of the document
                listItemCopy.wrap('<div class="wcp-editor-dragged-list-item-wrap"></div>');

                // Create a virtual map of every possible position of the item
                // using an invisible dummy item of the same dimentions
                var tempElHtml = '<div id="wcp-editor-list-item-invisible-tmp" style="width: '+ draggedListItemWidth +'px; height: '+ draggedListItemHeight +'px; position: relative;"></div>';

                var numberOfListItems = $('#wcp-editor-right .wcp-editor-list-item').length;
                for (var i=0; i<numberOfListItems; i++) {
                    // Insert temp el
                    $('#wcp-editor-right .wcp-editor-list-item[data-wcp-editor-list-item-index="'+ i +'"]').before(tempElHtml);

                    // Store its position
                    dragMap.push($('#wcp-editor-list-item-invisible-tmp').offset().top + draggedListItemHeight/2);

                    // Delete it
                    $('#wcp-editor-list-item-invisible-tmp').remove();
                }

                // Hide the draggedListItem
                draggedListItem.hide();
            }

            if (didStartDragging) {
                clearSelection();

                // Update the position of the listItemCopy
                listItemCopy.css({
                    left: ix - (iex - e.pageX),
                    top: iy - (iey - e.pageY)
                });

                // Check which is the closest map point from the virtual map
                var closestIndex = -1;
                var smallestDistance = 99999;
                var listItemCopyOffsetTop = listItemCopy.offset().top + draggedListItemHeight/2;

                for (var i=0; i<dragMap.length; i++) {
                    var distance = Math.abs(listItemCopyOffsetTop - dragMap[i]);

                    if (distance < smallestDistance) {
                        smallestDistance = distance;
                        closestIndex = i;
                    }
                }

                // If the map point has a different index from the currentItemIndex,
                // then insert a visible dummy element at that position
                if (currentItemIndex != closestIndex) {
                    // Remove the current temp element
                    $('#wcp-editor-list-item-visible-tmp').remove();

                    var visibleDummyElementHTML = '<div id="wcp-editor-list-item-visible-tmp" style="width: '+ draggedListItemWidth +'px; height: '+ draggedListItemHeight +'px;"><div id="wcp-editor-list-item-visible-tmp-inner"></div></div>';

                    if (closestIndex < startingItemIndex) {
                        $('#wcp-editor-right .wcp-editor-list-item[data-wcp-editor-list-item-index="'+ closestIndex +'"]').before(visibleDummyElementHTML);
                    } else {
                        $('#wcp-editor-right .wcp-editor-list-item[data-wcp-editor-list-item-index="'+ closestIndex +'"]').after(visibleDummyElementHTML);
                    }

                    // Set the currentItemIndex to the new index
                    currentItemIndex = closestIndex;
                }

                // Preserve the list scroll
                $('#wcp-editor-right').scrollTop(listScroll);
            }
        });

        $(document).off('mouseup.wcp-editor-list-item-reorder');
        $(document).on('mouseup.wcp-editor-list-item-reorder', function() {
            if (didStartDragging) {
                // Delete temporary items
                $('.wcp-editor-dragged-list-item-wrap').remove();
                $('#wcp-editor-list-item-visible-tmp').remove();

                // Show the hidden original list item
                draggedListItem.show();

                // Send an event that the order of the items changed
                $.wcpEditorEventListItemMoved(draggedListItem.attr('id'), startingItemIndex, currentItemIndex);
            }

            // Clean up
            shouldStartDragging = false;
            didStartDragging = false;
            startingItemIndex = -1;
            currentItemIndex = -1;
            dragMap = [];
        });
    };
    WCPEditor.prototype.openMainTabWithName = function(tabName) {
        $('.wcp-editor-main-tab-content').hide();
        $('[data-wcp-main-tab-content-name="'+ tabName +'"]').show();

        $('.wcp-editor-main-tab-button').removeClass('wcp-active');
        $('[data-wcp-main-tab-button-name="'+ tabName +'"]').addClass('wcp-active');
    };
    WCPEditor.prototype.presentModal = function(options) {
        clearTimeout(this.modalTimeout);

        if ($('#wcp-editor-modal').length == 0) {
            var html = '';

            html += '<div id="wcp-editor-modal">';
            html += '   <div class="wcp-editor-modal-body">';
            html += '       <div class="wcp-editor-modal-close"><i class="fa fa-times" aria-hidden="true"></i></div>';
            html += '       <div class="wcp-editor-modal-header"></div>';
            html += '       <div class="wcp-editor-modal-content"></div>';
            html += '       <div class="wcp-editor-modal-footer"></div>';
            html += '       </div>';
            html += '   </div>';
            html += '</div>';

            $('body').append(html);
            this.modal = $('#wcp-editor-modal');
        }
        if (!this.modal) {
            this.modal = $('#wcp-editor-modal');
        }

        // Set the data-name
        this.modal.data('wcp-editor-modal-name', options.name);

        // Set the title
        this.modal.find('.wcp-editor-modal-header').html(options.title);

        // Set the body
        this.modal.find('.wcp-editor-modal-content').html(options.body);

        // Set the buttons
        var buttonHtml = '';
        for (var i=0; i<options.buttons.length; i++) {
            var buttonClass = '';
            var buttonId = '';

            if (options.buttons[i].class == 'primary') {
                buttonClass = 'wcp-editor-modal-button-primary';
            }
            if (options.buttons[i].class == 'danger') {
                buttonClass = 'wcp-editor-modal-button-danger';
            }

            if (options.buttons[i].id) {
                buttonId = options.buttons[i].id;
            }

            buttonHtml += '<div class="wcp-editor-modal-button '+ buttonClass +'" id="'+ buttonId +'" data-wcp-editor-modal-button-name="'+ options.buttons[i].name +'">'+ options.buttons[i].title +'</div>'
        }

        this.modal.find('.wcp-editor-modal-footer').html(buttonHtml);

        // Show modal
        var self = this;
        self.modal.css({ display: 'flex' });
        setTimeout(function() {
            self.modal.addClass('wcp-editor-modal-visible');
        }, 10);
    };
    WCPEditor.prototype.closeModal = function() {
        var self = this;

        this.modal.removeClass('wcp-editor-modal-visible');

        this.modalTimeout = setTimeout(function() {
            self.modal.hide();
        }, 330);
    };
    WCPEditor.prototype.presentCreateNewModal = function() {
        var modalBody = '';
        modalBody += '<div class="wcp-editor-form-control">';
        modalBody += '  <label for="wcp-editor-input-create-new">Name: </label>';
        modalBody += '  <input type="text" id="wcp-editor-input-create-new">';
        modalBody += '  <div id="wcp-editor-create-new-error">Please enter a name!</div>';
        modalBody += '</div>';

        var modalOptions = {
            name: 'create_new',
            title: 'Create New',
            buttons: [
                {
                    name: 'cancel',
                    title: 'Cancel',
                    class: '',
                },
                {
                    name: 'create',
                    title: 'Create',
                    class: 'primary',
                    id: 'wcp-editor-button-create-new-instance'
                },
            ],
            body: modalBody
        };

        this.presentModal(modalOptions);

        // Focus the name input
        $('#wcp-editor-input-create-new').get(0).focus();
    };
    WCPEditor.prototype.presentLoadModal = function() {
        var self = this;

        this.presentLoadingScreenWithText('Loading Saves...');

        $.wcpEditorGetSaves(function(savesList) {
            var modalBody = '';

            for (var i=0; i<savesList.length; i++) {
                modalBody += '  <div class="wcp-editor-save-list-item-wrap" data-wcp-editor-save-list-item-name="'+ savesList[i].name +'" data-wcp-editor-save-list-item-id="'+ savesList[i].id +'">';
                modalBody += '      <div class="wcp-editor-save-list-item">'+ savesList[i].name +'</div>';
                modalBody += '      <div class="wcp-editor-save-list-item-delete-button"><i class="fa fa-trash-o" aria-hidden="true"></i></div>';
                modalBody += '  </div>';
            }

            var modalOptions = {
                name: 'load',
                title: 'Load',
                buttons: [
                    {
                        name: 'cancel',
                        title: 'Cancel',
                        class: '',
                    },
                ],
                body: modalBody
            };

            self.hideLoadingScreen();
            self.presentModal(modalOptions);
        });
    };
    WCPEditor.prototype.presentDeleteSaveConfirmationModal = function() {
        var modalOptions = {
            name: 'confirmation',
            title: 'Delete Save',
            buttons: [
                {
                    name: 'cancel',
                    title: 'Cancel',
                    class: '',
                    id: 'wcp-editor-cancel-delete-save'
                },
                {
                    name: 'delete',
                    title: 'Delete',
                    class: 'danger',
                    id: 'wcp-editor-confirm-delete-save'
                },
            ],
            body: 'Are you sure you want to permanently delete this save?'
        };

        this.presentModal(modalOptions);
    };
    WCPEditor.prototype.presentImportModal = function() {
        var html = '';

        html += '<div class="wcp-editor-form-control">';
        html += '   <label for="wcp-editor-textarea-import">Paste code to import:</label>';
        html += '   <textarea id="wcp-editor-textarea-import"></textarea>';
        html += '  <div id="wcp-editor-import-error">Invalid code!</div>';
        html += '</div>';

        var modalOptions = {
            name: 'import',
            title: 'Import',
            buttons: [
                {
                    name: 'cancel',
                    title: 'Cancel',
                    class: '',
                },
                {
                    name: 'import',
                    title: 'Import',
                    class: 'primary',
                    id: 'wcp-editor-confirm-import'
                },
            ],
            body: html
        };

        this.presentModal(modalOptions);

        // Focus the textarea
        $('#wcp-editor-textarea-import').get(0).focus();
    };
    WCPEditor.prototype.presentExportModal = function() {
        var html = '';

        html += '<div class="wcp-editor-form-control">';
        html += '   <label for="wcp-editor-textarea-export">Copy this code to import it later:</label>';
        html += '   <textarea id="wcp-editor-textarea-export">'+ $.wcpEditorGetExportJSON() +'</textarea>';
        html += '</div>';

        var modalOptions = {
            name: 'export',
            title: 'Export',
            buttons: [
                {
                    name: 'cancel',
                    title: 'Done',
                    class: 'primary',
                }
            ],
            body: html
        };

        this.presentModal(modalOptions);

        // Select the text
        $('#wcp-editor-textarea-export').get(0).select();
    };
    WCPEditor.prototype.setContentForTabWithName = function(tabName, content) {
        $('.wcp-editor-main-tab-content[data-wcp-main-tab-content-name="'+ tabName +'"]').find('.wcp-editor-main-tab-content-inner-wrap').html(content);
    };
    WCPEditor.prototype.setContentForCanvas = function(content) {
        $('#wcp-editor-canvas').html(content);
    };
    WCPEditor.prototype.setListItems = function(listItems) {
        var buttonsHTML = '';

        for (var i=0; i<this.options.listItemButtons.length; i++) {
            var b = this.options.listItemButtons[i];

            buttonsHTML += '<div class="wcp-editor-list-item-button" data-wcp-editor-list-item-button-name="'+ b.name +'" data-wcp-tooltip="'+ b.title +'" data-wcp-tooltip-position="bottom">';
            buttonsHTML += '    <i class="'+ b.icon +'" aria-hidden="true"></i>';
            buttonsHTML += '</div>';
        }

        var html = '';

        for (var i=0; i<listItems.length; i++) {
            html += '<div class="wcp-editor-list-item" id="wcp-editor-list-item-'+ listItems[i].id +'" data-wcp-editor-list-item-index="'+ i +'" data-wcp-editor-list-item-id="'+ listItems[i].id +'">';
            html += '   <div class="wcp-editor-list-item-title">'+ listItems[i].title +'</div>';
            html += '   <div class="wcp-editor-list-item-buttons">'+ buttonsHTML +'</div>';
            html += '</div>';
        }

        $('#wcp-editor-right').html(html);
    };
    WCPEditor.prototype.selectListItem = function(listItemId) {
        $('.wcp-editor-list-item').removeClass('wcp-active');
        $('#wcp-editor-list-item-' + listItemId).addClass('wcp-active');
    };
    WCPEditor.prototype.showTooltip = function(element, text, tooltipPosition) {
        if ($('#wcp-editor-tooltip').length == 0) {
            $('body').append('<div id="wcp-editor-tooltip"></div>');
            this.tooltip = $('#wcp-editor-tooltip');
        }
        if (!this.tooltip) {
            this.tooltip = $('#wcp-editor-tooltip');
        }

        // Set the text
        this.tooltip.html(text);

        // Show (invisible)
        this.tooltip.show();

        // Set the position
        var x = 0;
        var y = 0;
        var tooltipSpacing = 12;

        if (tooltipPosition == 'left') {
            x = element.offset().left - this.tooltip.outerWidth() - tooltipSpacing;
            y = element.offset().top + element.outerHeight()/2 - this.tooltip.outerHeight()/2;
        }
        if (tooltipPosition == 'right') {
            x = element.offset().left + element.outerWidth() + tooltipSpacing;
            y = element.offset().top + element.outerHeight()/2 - this.tooltip.outerHeight()/2;
        }
        if (tooltipPosition == 'top') {
            x = element.offset().left + element.outerWidth()/2 - this.tooltip.outerWidth()/2;
            y = element.offset().top - this.tooltip.outerHeight() - tooltipSpacing;
        }
        if (tooltipPosition == 'bottom') {
            x = element.offset().left + element.outerWidth()/2 - this.tooltip.outerWidth()/2;
            y = element.offset().top + element.outerHeight() + tooltipSpacing;
        }

        this.tooltip.css({
            left: x,
            top: y
        });

        // Set tooltip position class
        if (tooltipPosition == 'left') {
            this.tooltip.removeClass('wcp-editor-tooltip-left');
            this.tooltip.removeClass('wcp-editor-tooltip-right');
            this.tooltip.removeClass('wcp-editor-tooltip-top');
            this.tooltip.removeClass('wcp-editor-tooltip-bottom');

            this.tooltip.addClass('wcp-editor-tooltip-left');
        }
        if (tooltipPosition == 'right') {
            this.tooltip.removeClass('wcp-editor-tooltip-left');
            this.tooltip.removeClass('wcp-editor-tooltip-right');
            this.tooltip.removeClass('wcp-editor-tooltip-top');
            this.tooltip.removeClass('wcp-editor-tooltip-bottom');

            this.tooltip.addClass('wcp-editor-tooltip-right');
        }
        if (tooltipPosition == 'top') {
            this.tooltip.removeClass('wcp-editor-tooltip-left');
            this.tooltip.removeClass('wcp-editor-tooltip-right');
            this.tooltip.removeClass('wcp-editor-tooltip-top');
            this.tooltip.removeClass('wcp-editor-tooltip-bottom');

            this.tooltip.addClass('wcp-editor-tooltip-top');
        }
        if (tooltipPosition == 'bottom') {
            this.tooltip.removeClass('wcp-editor-tooltip-left');
            this.tooltip.removeClass('wcp-editor-tooltip-right');
            this.tooltip.removeClass('wcp-editor-tooltip-top');
            this.tooltip.removeClass('wcp-editor-tooltip-bottom');

            this.tooltip.addClass('wcp-editor-tooltip-bottom');
        }

        // Constrain to window
        if (this.tooltip.offset().left + this.tooltip.outerWidth() > window.innerWidth) {
            this.tooltip.css({
                left: window.innerWidth - this.tooltip.outerWidth()
            });
        }
        if (this.tooltip.offset().left < 0) {
            this.tooltip.css({
                left: 0
            });
        }
        if (this.tooltip.offset().top + this.tooltip.outerHeight() > window.innerHeight) {
            this.tooltip.css({
                top: window.innerHeight - this.tooltip.outerHeight()
            });
        }
        if (this.tooltip.offset().top < 0) {
            this.tooltip.css({
                top: 0
            });
        }

        // Show (visible)
        this.tooltip.addClass('wcp-editor-tooltip-visible');
    }
    WCPEditor.prototype.hideTooltip = function() {
        this.tooltip.hide();
        this.tooltip.removeClass('wcp-editor-tooltip-visible');
    }
    WCPEditor.prototype.presentLoadingScreenWithText = function(text) {
        clearTimeout(this.loadingScreenTimeout);

        if ($('#wcp-editor-loading-screen').length == 0) {
            var html = '';

            html += '<div id="wcp-editor-loading-screen">';
            html += '   <div id="wcp-editor-loading-screen-icon"><i class="fa fa-circle-o-notch fa-spin"></i></div>';
            html += '   <div id="wcp-editor-loading-screen-text"></div>';
            html += '</div>';

            $('body').append(html);

            this.loadingScreen = $('#wcp-editor-loading-screen');
        }
        if (!this.loadingScreen) {
            this.loadingScreen = $('#wcp-editor-loading-screen');
        }

        this.loadingScreen.css({ display: 'flex' });

        // Change icon
        $('#wcp-editor-loading-screen-icon').html('<i class="fa fa-circle-o-notch fa-spin"></i>');

        // Change text
        $('#wcp-editor-loading-screen-text').html(text);

        var self = this;
        setTimeout(function() {
            self.loadingScreen.addClass('wcp-editor-loading-screen-visible');
        }, 10);
    }
    WCPEditor.prototype.updateLoadingScreenMessage = function(text) {
        $('#wcp-editor-loading-screen-text').html(text);
    };
    WCPEditor.prototype.hideLoadingScreen = function() {
        if (!this.loadingScreen) {
            this.loadingScreen = $('#wcp-editor-loading-screen');
        }
        this.loadingScreen.removeClass('wcp-editor-loading-screen-visible');

        var self = this;
        this.loadingScreenTimeout = setTimeout(function() {
            self.loadingScreen.hide();
        }, 250);
    }
    WCPEditor.prototype.hideLoadingScreenWithText = function(text, error) {
        var self = this;

        // Change text
        $('#wcp-editor-loading-screen-text').html(text);

        // Change icon
        if (error) {
            $('#wcp-editor-loading-screen-icon').html('<i class="fa fa-times"></i>');
        } else {
            $('#wcp-editor-loading-screen-icon').html('<i class="fa fa-check"></i>');
        }

        setTimeout(function() {
            self.hideLoadingScreen();
        }, 1000);
    }
    WCPEditor.prototype.selectTool = function(toolName) {
        $('.wcp-editor-toolbar-button').removeClass('wcp-active');
        $('[data-wcp-editor-toolbar-button-name="'+ toolName +'"]').addClass('wcp-active');

        $.wcpEditorEventSelectedTool(toolName);
    }
    WCPEditor.prototype.setPreviewModeOn = function() {
        $('#wcp-editor-button-preview').addClass('wcp-active');
    }
    WCPEditor.prototype.setPreviewModeOff = function() {
        $('#wcp-editor-button-preview').removeClass('wcp-active');
    }

    function WCPEditorForm(options) {
        this.options = options;

        this.id = 'wcp-form-' + (Math.floor(Math.random() * 9999) + 1);

        // Contains a reference to each WCPEditorControl object
        this.controls = [];

        // Callback function for when a control changes its value
        this.formUpdated = undefined;

        // Assoc array of all control values
        this.model = {};

        this.selectedTab = 0;
    };
    WCPEditorForm.prototype.init = function() {
        // Create WCPEditorControl objects
        // Iterate over control groups
        for (var i=0; i<this.options.controlGroups.length; i++) {

            // Iterate over controls in each group
            for (var j=0; j<this.options.controlGroups[i].controls.length; j++) {
                var controlOptions = this.options.controlGroups[i].controls[j];
                var controlRegisteredSettings = $.extend(true, {}, registeredControls[controlOptions.type]);

                var self = this;
                var c = new WCPEditorControl(controlOptions, controlRegisteredSettings, function() {
                    self.controlUpdated(this.name);
                });

                c.setVal(controlOptions.value);

                this.controls[controlOptions.name] = c;
            }
        }

        // Create events
        this.events();
    };
    WCPEditorForm.prototype.events = function(controls) {
        var self = this;

        // Tab functionality
        $(document).on('click', '#' + this.id + ' [data-wcp-form-tab-button-name]', function() {
            var name = $(this).data('wcp-form-tab-button-name');
            self.openFormTabWithName(name);
        });
    }
    WCPEditorForm.prototype.openFormTabWithName = function(tabName) {
        var formRoot = $('#' + this.id);

        formRoot.find('.wcp-editor-form-tab-content').hide();
        formRoot.find('[data-wcp-form-tab-content-name="'+ tabName +'"]').show();

        formRoot.find('.wcp-editor-form-tab-button').removeClass('wcp-active');
        formRoot.find('[data-wcp-form-tab-button-name="'+ tabName +'"]').addClass('wcp-active');

        this.updateForm();

        this.selectedTab = formRoot.find('[data-wcp-form-tab-button-name="'+ tabName +'"]').data('wcp-form-tab-button-index');
    };
    WCPEditorForm.prototype.getFormHTML = function() {
        var html = '';
        var tabsHTML = '';
        var tabsContentsHTML = '';

        tabsHTML += '<div class="wcp-editor-form-tabs-wrap">';
        tabsContentsHTML += '<div class="wcp-editor-form-tabs-content-wrap">';

        // Iterate over control groups
        for (var i=0; i<this.options.controlGroups.length; i++) {
            var controlGroup = this.options.controlGroups[i];
            var buttonClass = '';

            if (i == this.selectedTab) buttonClass = 'wcp-active';

            // Add a tab button
            tabsHTML += '<div class="wcp-editor-form-tab-button '+ buttonClass +'" data-wcp-form-tab-button-name="'+ controlGroup.groupName +'" data-wcp-form-tab-button-index="'+ i +'">';
            tabsHTML += '   <div class="wcp-editor-form-tab-button-icon"><i class="'+ controlGroup.groupIcon +'" aria-hidden="true"></i></div>';
            tabsHTML += '   <div class="wcp-editor-form-tab-button-text">'+ controlGroup.groupTitle +'</div>';
            tabsHTML += '</div>';

            // Create a tab container for the controls
            var contentStyle = 'display: none;';

            if (i == this.selectedTab) contentStyle = '';

            tabsContentsHTML += '<div class="wcp-editor-form-tab-content" data-wcp-form-tab-content-name="'+ controlGroup.groupName +'" style="'+ contentStyle +'">';

            // Iterate over controls in each group
            for (var j=0; j<controlGroup.controls.length; j++) {
                var control = controlGroup.controls[j];

                var tooltipAttributes = '';
                if (control.tooltip) {
                    tooltipAttributes = 'data-wcp-tooltip="'+ control.tooltip.text +'" data-wcp-tooltip-position="'+ control.tooltip.position +'"';
                }

                tabsContentsHTML += '<div class="wcp-editor-form-control" id="wcp-editor-form-control-'+ control.name +'" '+ tooltipAttributes +'>';

                if (!this.controls[control.name].customLabel) {
                    tabsContentsHTML += '   <label>'+ control.title +'</label>';
                }
                tabsContentsHTML += this.controls[control.name].HTML();
                tabsContentsHTML += '</div>';
            }

            // Close the tab container
            tabsContentsHTML += '</div>';
        }

        tabsContentsHTML += '</div>';
        tabsHTML += '</div>';

        html = '<div class="wcp-editor-form-wrap" id="'+ this.id +'">' + tabsHTML + tabsContentsHTML + '</div>';

        return html;
    };
    WCPEditorForm.prototype.controlUpdated = function(controlName) {
        $.wcpEditorEventFormUpdated(this.options.name, controlName);
    }
    WCPEditorForm.prototype.updateForm = function() {
        for (var c in this.controls) {
            this.controls[c].loadVal();
        }
    }
    WCPEditorForm.prototype.getModel = function() {
        var model = {};

        for (var i=0; i<this.options.controlGroups.length; i++) {
            var controlGroupName = this.options.controlGroups[i].groupName;

            model[controlGroupName] = {};

            // Iterate over controls in each group
            for (var j=0; j<this.options.controlGroups[i].controls.length; j++) {
                var controlName = this.options.controlGroups[i].controls[j].name;
                var controlValue = this.controls[controlName].getVal();

                model[controlGroupName][controlName] = controlValue;
            }
        }

        return model;
    }
    WCPEditorForm.prototype.setControlValue = function(controlName, v) {
        if (this.controls[controlName] && this.controls[controlName].getVal() !== v) {
            this.controls[controlName].setVal(v);
        }
    }
    WCPEditorForm.prototype.showControlsGroup = function(groupName) {
        var formRoot = $('#' + this.id);

        $('[data-wcp-form-tab-button-name="'+ groupName +'"]').show();
    }
    WCPEditorForm.prototype.hideControlsGroup = function(groupName) {
        var formRoot = $('#' + this.id);

        formRoot.find('[data-wcp-form-tab-button-name="'+ groupName +'"]').hide();

        if (this.selectedTab == formRoot.find('[data-wcp-form-tab-button-name="'+ groupName +'"]').data('wcp-form-tab-button-index')) {
            this.selectedTab = 0;

            this.openFormTabWithName(formRoot.find('[data-wcp-form-tab-button-index="0"]').data('wcp-form-tab-button-name'));
        }
    }
    WCPEditorForm.prototype.showControl = function(controlName) {
        var formRoot = $('#' + this.id);

        formRoot.find('#wcp-editor-form-control-' + controlName).show();
    }
    WCPEditorForm.prototype.hideControl = function(controlName) {
        var formRoot = $('#' + this.id);

        formRoot.find('#wcp-editor-form-control-' + controlName).hide();
    }
    WCPEditorForm.prototype.addControl = function(controlGroupName, controlOptions) {
        // Add the control to the form's options
        for (var i=0; i<this.options.controlGroups.length; i++) {
            var controlGroup = this.options.controlGroups[i];

            if (controlGroup.groupName == controlGroupName) {
                controlGroup.controls.push(controlOptions);
                break;
            }
        }

        // Create the WCPEditorControl object and add it to this.controls
        var controlRegisteredSettings = $.extend(true, {}, registeredControls[controlOptions.type]);

        var self = this;
        var c = new WCPEditorControl(controlOptions, controlRegisteredSettings, function() {
            self.controlUpdated(this.name);
        });

        c.setVal(controlOptions.value);

        this.controls[controlOptions.name] = c;
    };
    WCPEditorForm.prototype.removeControl = function(controlName) {
        // Delete it from the list of Controls
        delete this.controls[controlName];

        // Delete it from the options array
        for (var i=0; i<this.options.controlGroups.length; i++) {
            var controlGroup = this.options.controlGroups[i];
            var done = false;
            for (var j=0; j<controlGroup.controls.length; j++) {
                var control = controlGroup.controls[j];

                if (control.name == controlName) {
                    controlGroup.controls.splice(j, 1);
                    done = true;
                    break;
                }
            }

            if (done) break;
        }
    };

    function WCPEditorControl(controlOptions, controlRegisteredSettings, valueUpdated) {
        // The 's' argument is the array coming from the registeredControls array
        // Automatically generated at the time of object creation
        this.id = Math.floor(Math.random() * 9999) + 1;
        this.elementID = 'wcp-editor-control-' + this.id;
        this.elementClass = 'sq-element-option-group';

        // Settings coming from the registered controls catalog
        // referenced in the 'this' variable, so 'this' can be accessed within
        // those functions (in case of validate(), HTML(), events(), etc)
        // These settings are also common in all controls
        this.type = controlRegisteredSettings.type;
        this.getValue = controlRegisteredSettings.getValue;
        this.setValue = controlRegisteredSettings.setValue;
        this.HTML = controlRegisteredSettings.HTML;

        // These variables are specific for each individual control
        this.name = controlOptions.name;
        this.title = controlOptions.title;
        this.options = controlOptions.options;

        // Private property, must be accessed only via setter and getter
        this._value = undefined;

        // Launch the events provided from the settings
        this.init = controlRegisteredSettings.init;
        this.init();

        // Create a callback function for when the control updates its value
        this.valueUpdated = valueUpdated;

        // Inline label flag
        this.customLabel = controlRegisteredSettings.customLabel;
    }
    WCPEditorControl.prototype.getVal = function() {
        return this._value;
    }
    WCPEditorControl.prototype.setVal = function(v) {
        this._value = v;

        try {
            this.setValue(v);
        } catch (err) {
            console.log(err);
        }
    }
    WCPEditorControl.prototype.loadVal = function() {
        this.setValue(this._value);
    }
    WCPEditorControl.prototype.valueChanged = function() {
        // Re-sets the control to its stored value
        this._value = this.getValue();
        this.valueUpdated();
    }

    // Utility
    function clearSelection() {
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }

    // API =====================================================================

    // Basic initialization of the editor. Builds UI.
    $.wcpEditorInit = function(options) {
        var defaultOptions = {
            canvasFill: false,
            canvasWidth: 800,
            canvasHeight: 600,
            mainTabs: [], // Objects { name: 'Name', icon: 'fa fa-icon-name', title: 'The Title' }
            toolbarButtons: [], // Objects { name: 'Name', icon: 'fa fa-icon-name', title: 'The Title' }
            extraMainButtons: [], // Objects { name: 'Name', icon: 'fa fa-icon-name', title: 'The Title' }
            listItemButtons: [], // Objects { name: 'Name', icon: 'fa fa-icon-name', title: 'The Title' }
            newButton: true,
            previewToggle: true
        };
        wcpEditor = new WCPEditor();
        wcpEditor.init($.extend(true, {}, defaultOptions, options));
    };

    // Provide a declaration for a control that can later be used in a form
    // as a WCPEditorControl object
    $.wcpEditorRegisterControl = function(options) {
        registeredControls[options.type] = options;
    };

    // A form is created only as an object, does not exist in the DOM
    // It initializes its own WCPEditorControl objects
    $.wcpEditorCreateForm = function(options) {
        wcpForms[options.name] = new WCPEditorForm(options);
        wcpForms[options.name].init();
    };

    // The form will try to re-set the values of all its controls
    $.wcpEditorUpdateForm = function(formName) {
        wcpForms[formName].updateForm();
    };

    // Add/remove controls from a form
    $.wcpEditorFormAddControl = function(formName, controlGroupName, controlOptions) {
        wcpForms[formName].addControl(controlGroupName, controlOptions);
    }
    $.wcpEditorFormRemoveControl = function(formName, controlName) {
        wcpForms[formName].removeControl(controlName);
    }

    // Opens a specific form tab
    $.wcpEditorFormOpenTab = function(formName, tabName) {
        wcpForms[formName].openFormTabWithName(tabName);
    };

    // Generates HTML code for a form with formName
    $.wcpEditorGetHTMLForFormWithName = function(formName) {
        return wcpForms[formName].getFormHTML();
    };

    // Returns an assoc array containing control values
    $.wcpEditorGetModelOfFormWithName = function(formName) {
        return wcpForms[formName].getModel();
    }

    // Sets a new value for a control with controlName in a form with formName
    $.wcpEditorSetControlValue = function(formName, controlName, v) {
        wcpForms[formName].setControlValue(controlName, v);
    }

    // Functions to show/hide controls or control groups(tabs)
    $.wcpEditorFormShowControlsGroup = function(formName, groupName) {
        wcpForms[formName].showControlsGroup(groupName);
    }
    $.wcpEditorFormHideControlsGroup = function(formName, groupName) {
        wcpForms[formName].hideControlsGroup(groupName);
    }
    $.wcpEditorFormShowControl = function(formName, controlName) {
        wcpForms[formName].showControl(controlName);
    }
    $.wcpEditorFormHideControl = function(formName, controlName) {
        wcpForms[formName].hideControl(controlName);
    }

    // Inserts content in a main tab
    $.wcpEditorSetContentForTabWithName = function(tabName, content) {
        wcpEditor.setContentForTabWithName(tabName, content);
    };

    // Opens a main tab with tabName
    $.wcpEditorOpenMainTabWithName = function(tabName) {
        wcpEditor.openMainTabWithName(tabName);
    };

    // Inserts content in the canvas
    $.wcpEditorSetContentForCanvas = function(content) {
        wcpEditor.setContentForCanvas(content);
    };

    // Updates list items
    $.wcpEditorSetListItems = function(listItems) {
        wcpEditor.setListItems(listItems);
    }

    // Selects a list item
    $.wcpEditorSelectListItem = function(listItemId) {
        wcpEditor.selectListItem(listItemId);
    }

    // Selects a tool
    $.wcpEditorSelectTool = function(toolName) {
        wcpEditor.selectTool(toolName);
    }

    // Present loading screen
    $.wcpEditorPresentLoadingScreen = function(text) {
        wcpEditor.presentLoadingScreenWithText(text);
    }
    $.wcpEditorUpdateLoadingScreenMessage = function(text) {
        wcpEditor.updateLoadingScreenMessage(text);
    }
    $.wcpEditorHideLoadingScreen = function() {
        wcpEditor.hideLoadingScreen();
    }
    $.wcpEditorHideLoadingScreenWithMessage = function(text, error) {
        wcpEditor.hideLoadingScreenWithText(text, error);
    }

    // Present load modal
    $.wcpEditorPresentLoadModal = function() {
        wcpEditor.presentLoadModal();
    }

    // Present modal
    $.wcpEditorPresentModal = function(options) {
        var modalDefaults = {
            title: '',
            buttons: [

            ],
            body: ''
        };

        wcpEditor.presentModal($.extend(true, {}, modalDefaults, options));
    }

    // Close modal
    $.wcpEditorCloseModal = function() {
        wcpEditor.closeModal();
    }

    // Set preview mode
    $.wcpEditorSetPreviewModeOn = function() {
        wcpEditor.setPreviewModeOn();
    }
    $.wcpEditorSetPreviewModeOff = function() {
        wcpEditor.setPreviewModeOff();
    }

    // BOILERPLATE CODE FOR IMPLEMENTING REQUIRED API FUNCTIONS ****************
    // *************************************************************************

    // [data source] Called on initialization:
    $.wcpEditorGetContentForTabWithName = function(tabName) {

    }
    $.wcpEditorGetContentForCanvas = function() {

    }
    $.wcpEditorGetListItems = function() {
        // Returns an array of objects in the format { id: 'id', title: 'title' }
    }
    // [data source] Get a list of saves
    $.wcpEditorGetSaves = function(callback) {
        // Format: [ { name: 'name', id: 'id' }, ... ]

    }
    // [data source] Provide encoded JSON for export
    $.wcpEditorGetExportJSON = function() {
        return '{}';
    }

    // Form events
    $.wcpEditorEventFormUpdated = function(formName, controlName) {

    }

    // Main button events
    $.wcpEditorEventNewButtonPressed = function() {

    }
    $.wcpEditorEventSaveButtonPressed = function() {

    }
    $.wcpEditorEventLoadButtonPressed = function() {

    }
    $.wcpEditorEventUndoButtonPressed = function() {

    }
    $.wcpEditorEventRedoButtonPressed = function() {

    }
    $.wcpEditorEventPreviewButtonPressed = function() {

    }
    $.wcpEditorEventEnteredPreviewMode = function() {

    }
    $.wcpEditorEventExitedPreviewMode = function() {

    }

    // List events
    $.wcpEditorEventListItemMouseover = function(itemID) {

    }
    $.wcpEditorEventListItemSelected = function(itemID) {

    }
    $.wcpEditorEventListItemMoved = function(itemID, oldIndex, newIndex) {

    }
    $.wcpEditorEventListItemButtonPressed = function(itemID, buttonName) {

    }

    // Tool events
    $.wcpEditorEventSelectedTool = function(toolName) {

    }

    // Extra main button events
    $.wcpEditorEventExtraMainButtonClick = function(buttonName) {

    }

    // Modal events
    $.wcpEditorEventModalButtonClicked = function(modalName, buttonName) {

    }
    $.wcpEditorEventModalClosed = function(modalName) {

    }

    // Create new event
    $.wcpEditorEventCreatedNewInstance = function(instanceName) {

    }

    // Event for loading a save
    $.wcpEditorEventLoadSaveWithID = function(saveID) {

    }

    // Event for deleting a save
    $.wcpEditorEventDeleteSaveWithID = function(saveID) {

    }

    // Event for importing
    $.wcpEditorEventImportedJSON = function(parsedJSON) {

    }

    // Event for help button
    $.wcpEditorEventHelpButtonPressed = function() {

    }

})(jQuery, window, document);

// Webcraft Plugins Ltd.
// Author: Nikolay Dyankov

;(function ($, window, document, undefined) {
    $.wcpEditorRegisterControl({
        type: 'int',
        getValue: function() {
            return parseInt($('#' + this.elementID).val(), 10);
        },
        setValue: function(v) {
            $('#' + this.elementID).val(parseInt(v, 10));
        },
        HTML: function() {
            return '<input type="text" id="'+ this.elementID +'">';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                var parsedValue = parseInt($(this).val(), 10);

                if (isNaN(parsedValue)) {
                    parsedValue = 0;
                }

                $(this).val(parsedValue);

                self.valueChanged();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'float',
        getValue: function() {
            return parseFloat($('#' + this.elementID).val());
        },
        setValue: function(v) {
            $('#' + this.elementID).val(parseFloat(v));
        },
        HTML: function() {
            return '<input type="text" id="'+ this.elementID +'">';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                var parsedValue = parseFloat($(this).val());

                if (isNaN(parsedValue)) {
                    parsedValue = 0;
                }

                $(this).val(parsedValue);

                self.valueChanged();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'text',
        getValue: function() {
            return $('#' + this.elementID).val();
        },
        setValue: function(v) {
            $('#' + this.elementID).val(v);
        },
        HTML: function() {
            return '<input type="text" id="'+ this.elementID +'">';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'textarea',
        getValue: function() {
            return $('#' + this.elementID).val();
        },
        setValue: function(v) {
            $('#' + this.elementID).val(v);
        },
        HTML: function() {
            return '<textarea id="'+ this.elementID +'" rows="5"></textarea>';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'checkbox',
        getValue: function() {
            if ($('#' + this.elementID).get(0).checked == true) {
                return 1;
            } else {
                return 0;
            }
        },
        setValue: function(v) {
            if (parseInt(v, 10) === 1) {
                $('#' + this.elementID).get(0).checked = true;
            } else {
                $('#' + this.elementID).get(0).checked = false;
            }
        },
        HTML: function() {
            return '<input type="checkbox" id="'+ this.elementID +'">';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'color',
        getValue: function() {
            return $('#' + this.elementID).val();
        },
        setValue: function(v) {
            $('#' + this.elementID).val(v);
        },
        HTML: function() {
            return '<input type="color" id="'+ this.elementID +'">';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'select',
        getValue: function() {
            return $('#' + this.elementID).val();
        },
        setValue: function(v) {
            $('#' + this.elementID).val(v);
        },
        HTML: function() {
            var html = '';

            html += '<select id="'+ this.elementID +'">';

            for (var i=0; i<this.options.length; i++) {
                html += '<option value="'+ this.options[i].value +'">'+ this.options[i].title +'</option>';
            }

            html += '</select>';

            return html;
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'box model',
        getValue: function() {
            return {
                margin: {
                    top: parseInt($('#wcp-editor-element-option-boxmodel-margin-top').val(), 10),
                    bottom: parseInt($('#wcp-editor-element-option-boxmodel-margin-bottom').val(), 10),
                    left: parseInt($('#wcp-editor-element-option-boxmodel-margin-left').val(), 10),
                    right: parseInt($('#wcp-editor-element-option-boxmodel-margin-right').val(), 10)
                },
                padding: {
                    top: parseInt($('#wcp-editor-element-option-boxmodel-padding-top').val(), 10),
                    bottom: parseInt($('#wcp-editor-element-option-boxmodel-padding-bottom').val(), 10),
                    left: parseInt($('#wcp-editor-element-option-boxmodel-padding-left').val(), 10),
                    right: parseInt($('#wcp-editor-element-option-boxmodel-padding-right').val(), 10)
                }
            }
        },
        setValue: function(v) {
            $('#wcp-editor-element-option-boxmodel-margin-top').val(v.margin.top);
            $('#wcp-editor-element-option-boxmodel-margin-bottom').val(v.margin.bottom);
            $('#wcp-editor-element-option-boxmodel-margin-left').val(v.margin.left);
            $('#wcp-editor-element-option-boxmodel-margin-right').val(v.margin.right);

            $('#wcp-editor-element-option-boxmodel-padding-top').val(v.padding.top);
            $('#wcp-editor-element-option-boxmodel-padding-bottom').val(v.padding.bottom);
            $('#wcp-editor-element-option-boxmodel-padding-left').val(v.padding.left);
            $('#wcp-editor-element-option-boxmodel-padding-right').val(v.padding.right);
        },
        HTML: function() {
            var html = '';

            html += '<div class="wcp-editor-boxmodel-margin" id="'+ this.elementID +'">';
            html += '   <div id="wcp-editor-boxmodel-label-margin">margin</div>';
            html += '   <input type="text" class="wcp-editor-boxmodel-input" id="wcp-editor-element-option-boxmodel-margin-top">';
            html += '   <input type="text" class="wcp-editor-boxmodel-input" id="wcp-editor-element-option-boxmodel-margin-bottom">';
            html += '   <input type="text" class="wcp-editor-boxmodel-input" id="wcp-editor-element-option-boxmodel-margin-left">';
            html += '   <input type="text" class="wcp-editor-boxmodel-input" id="wcp-editor-element-option-boxmodel-margin-right">';
            html += '   <div class="wcp-editor-boxmodel-padding">';
            html += '       <div id="wcp-editor-boxmodel-label-padding">padding</div>';
            html += '       <input type="text" class="wcp-editor-boxmodel-input" id="wcp-editor-element-option-boxmodel-padding-top">';
            html += '       <input type="text" class="wcp-editor-boxmodel-input" id="wcp-editor-element-option-boxmodel-padding-bottom">';
            html += '       <input type="text" class="wcp-editor-boxmodel-input" id="wcp-editor-element-option-boxmodel-padding-left">';
            html += '       <input type="text" class="wcp-editor-boxmodel-input" id="wcp-editor-element-option-boxmodel-padding-right">';
            html += '   </div>';
            html += '</div>';

            return html;
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID + ' input', function() {
                self.valueChanged();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'slider',
        getValue: function() {
            var v = 0;

            // Get the ball position
            var ball = $('#' + this.elementID).find('.wcp-editor-control-slider-ball');
            var ballPosition = ball.position().left;

            // Get the track width
            var track = $('#' + this.elementID).find('.wcp-editor-control-slider-track');
            var trackWidth = track.outerWidth();

            // Calculate value
            var progress = ballPosition / trackWidth;
            v = this.options.min + (this.options.max - this.options.min) * progress;

            if (this.options.type == 'int') v = Math.round(v);

            return v;
        },
        setValue: function(v) {
            if (this.options.type == 'int') v = Math.round(v);

            var progress = (v - this.options.min) / (this.options.max - this.options.min);

            var ball = $('#' + this.elementID).find('.wcp-editor-control-slider-ball');

            // Get the track width
            var track = $('#' + this.elementID).find('.wcp-editor-control-slider-track');
            var trackWidth = track.outerWidth();

            ball.css({
                left: trackWidth * progress
            });
        },
        HTML: function() {
            var html = '';

            html += '<div class="wcp-editor-control-slider" id="'+ this.elementID +'">';
            html += '   <div class="wcp-editor-control-slider-bubble"></div>';
            html += '   <div class="wcp-editor-control-slider-track"></div>';
            html += '   <div class="wcp-editor-control-slider-ball"></div>';
            html += '</div>';

            return html;
        },
        init: function() {
            var self = this;
            var ix = 0, iex = 0, dragging = false, ball = undefined, track = undefined, bubble = undefined;

            // Ball dragging
            $(document).on('mousedown', '#' + self.elementID + ' .wcp-editor-control-slider-ball', function(e) {
                ball = $('#' + self.elementID).find('.wcp-editor-control-slider-ball');
                track = $('#' + self.elementID).find('.wcp-editor-control-slider-track');
                bubble = $('#' + self.elementID).find('.wcp-editor-control-slider-bubble');
                ix = ball.position().left;
                iex = e.pageX;

                dragging = true;

                if ($.wcpEditorSliderStartedDragging) {
                    $.wcpEditorSliderStartedDragging();
                }

                // Show value bubble
                bubble.show();
            });
            $(document).on('mousemove.' + this.elementID, function(e) {
                if (dragging) {
                    var o = ix - iex + e.pageX;

                    if (o < 0) o = 0;
                    if (o > track.outerWidth()) o = track.outerWidth();

                    if (self.options.type == 'int') {
                        var step = track.outerWidth() / (self.options.max + 1);

                        o = o - (o % step);
                    }

                    ball.css({
                        left: o
                    });

                    self.valueChanged();

                    // Update value bubble
                    var rounded = Math.round(self.getValue() * 10)/10;

                    if (self.options.type == 'int') {
                        rounded = self.getValue();
                    }

                    bubble.html(rounded);
                    bubble.css({
                        left: o
                    });
                }
            });
            $(document).on('mouseup.' + this.elementID, function(e) {
                if (dragging) {
                    if ($.wcpEditorSliderFinishedDragging) {
                        $.wcpEditorSliderFinishedDragging();
                    }

                    dragging = false;
                    self.valueChanged();

                    // Hide value bubble
                    bubble.hide();
                }
            });

            // Click on the track
            $(document).on('mousedown', '#' + self.elementID + ' .wcp-editor-control-slider-track', function(e) {
                ball = $('#' + self.elementID).find('.wcp-editor-control-slider-ball');
                track = $('#' + self.elementID).find('.wcp-editor-control-slider-track');
                bubble = $('#' + self.elementID).find('.wcp-editor-control-slider-bubble');

                // Set the ball to the mouse position
                var o = e.pageX - track.offset().left;

                if (o < 0) o = 0;
                if (o > track.outerWidth()) o = track.outerWidth();

                ball.css({
                    left: o
                });

                // Start dragging
                ix = ball.position().left;
                iex = e.pageX;

                dragging = true;

                // Show value bubble
                bubble.show();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'grid system',
        getValue: function() {
            // tmp
            var res = {
                xs: {
                    use: 1,
                    class: 'col-xs-1',
                    visible: 1
                },
                sm: {
                    use: 1,
                    class: 'col-sm-1',
                    visible: 1
                },
                md: {
                    use: 1,
                    class: 'col-md-1',
                    visible: 1
                },
                lg: {
                    use: 1,
                    class: 'col-lg-1',
                    visible: 1
                },
            };

            var root = $('#' + this.elementID);

            // XS ---------
            var xsGroup = root.find('.wcp-editor-grid-system-control-res-group-xs');

            // Use
            if (xsGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked) {
                res.xs.use = 1;
            } else {
                res.xs.use = 0;
            }

            // Class
            res.xs.class = xsGroup.find('.wcp-editor-grid-system-control-select-colspan').val();

            // Visible
            if (xsGroup.find('.wcp-editor-grid-system-control-visible').hasClass('wcp-editor-grid-system-control-visible-not')) {
                res.xs.visible = 0;
            } else {
                res.xs.visible = 1;
            }

            // SM ---------
            var smGroup = root.find('.wcp-editor-grid-system-control-res-group-sm');

            // Use
            if (smGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked) {
                res.sm.use = 1;
            } else {
                res.sm.use = 0;
            }

            // Class
            res.sm.class = smGroup.find('.wcp-editor-grid-system-control-select-colspan').val();

            // Visible
            if (smGroup.find('.wcp-editor-grid-system-control-visible').hasClass('wcp-editor-grid-system-control-visible-not')) {
                res.sm.visible = 0;
            } else {
                res.sm.visible = 1;
            }

            // MD ---------
            var mdGroup = root.find('.wcp-editor-grid-system-control-res-group-md');

            // Use
            if (mdGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked) {
                res.md.use = 1;
            } else {
                res.md.use = 0;
            }

            // Class
            res.md.class = mdGroup.find('.wcp-editor-grid-system-control-select-colspan').val();

            // Visible
            if (mdGroup.find('.wcp-editor-grid-system-control-visible').hasClass('wcp-editor-grid-system-control-visible-not')) {
                res.md.visible = 0;
            } else {
                res.md.visible = 1;
            }

            // LG ---------
            var lgGroup = root.find('.wcp-editor-grid-system-control-res-group-lg');

            // Use
            if (lgGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked) {
                res.lg.use = 1;
            } else {
                res.lg.use = 0;
            }

            // Class
            res.lg.class = lgGroup.find('.wcp-editor-grid-system-control-select-colspan').val();

            // Visible
            if (lgGroup.find('.wcp-editor-grid-system-control-visible').hasClass('wcp-editor-grid-system-control-visible-not')) {
                res.lg.visible = 0;
            } else {
                res.lg.visible = 1;
            }

            return res;
        },
        setValue: function(v) {
            var root = $('#' + this.elementID);

            // XS ---------
            var xsGroup = root.find('.wcp-editor-grid-system-control-res-group-xs');

            // Use
            if (parseInt(v.xs.use, 10) == 1) {
                xsGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked = true;
                xsGroup.find('select').removeAttr('disabled');
                xsGroup.find('.wcp-editor-grid-system-control-visible').removeClass('wcp-editor-control-disabled');
            } else {
                xsGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked = false;
                xsGroup.find('select').attr('disabled', 'disabled');
                xsGroup.find('.wcp-editor-grid-system-control-visible').addClass('wcp-editor-control-disabled');
            }

            // Class
            xsGroup.find('.wcp-editor-grid-system-control-select-colspan').val(v.xs.class);

            // Visible
            if (parseInt(v.xs.visible, 10) == 1) {
                xsGroup.find('.wcp-editor-grid-system-control-visible').removeClass('wcp-editor-grid-system-control-visible-not');
            } else {
                xsGroup.find('.wcp-editor-grid-system-control-visible').addClass('wcp-editor-grid-system-control-visible-not');
            }

            // SM ---------
            var smGroup = root.find('.wcp-editor-grid-system-control-res-group-sm');

            // Use
            if (parseInt(v.sm.use, 10) == 1) {
                smGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked = true;
                smGroup.find('select').removeAttr('disabled');
                smGroup.find('.wcp-editor-grid-system-control-visible').removeClass('wcp-editor-control-disabled');
            } else {
                smGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked = false;
                smGroup.find('select').attr('disabled', 'disabled');
                smGroup.find('.wcp-editor-grid-system-control-visible').addClass('wcp-editor-control-disabled');
            }

            // Class
            smGroup.find('.wcp-editor-grid-system-control-select-colspan').val(v.sm.class);

            // Visible
            if (parseInt(v.sm.visible, 10) == 1) {
                smGroup.find('.wcp-editor-grid-system-control-visible').removeClass('wcp-editor-grid-system-control-visible-not');
            } else {
                smGroup.find('.wcp-editor-grid-system-control-visible').addClass('wcp-editor-grid-system-control-visible-not');
            }

            // MD ---------
            var mdGroup = root.find('.wcp-editor-grid-system-control-res-group-md');

            // Use
            if (parseInt(v.md.use, 10) == 1) {
                mdGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked = true;
                mdGroup.find('select').removeAttr('disabled');
                mdGroup.find('.wcp-editor-grid-system-control-visible').removeClass('wcp-editor-control-disabled');
            } else {
                mdGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked = false;
                mdGroup.find('select').attr('disabled', 'disabled');
                mdGroup.find('.wcp-editor-grid-system-control-visible').addClass('wcp-editor-control-disabled');
            }

            // Class
            mdGroup.find('.wcp-editor-grid-system-control-select-colspan').val(v.md.class);

            // Visible
            if (parseInt(v.md.visible, 10) == 1) {
                mdGroup.find('.wcp-editor-grid-system-control-visible').removeClass('wcp-editor-grid-system-control-visible-not');
            } else {
                mdGroup.find('.wcp-editor-grid-system-control-visible').addClass('wcp-editor-grid-system-control-visible-not');
            }

            // LG ---------
            var lgGroup = root.find('.wcp-editor-grid-system-control-res-group-lg');

            // Use
            if (parseInt(v.lg.use, 10) == 1) {
                lgGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked = true;
                lgGroup.find('select').removeAttr('disabled');
                lgGroup.find('.wcp-editor-grid-system-control-visible').removeClass('wcp-editor-control-disabled');
            } else {
                lgGroup.find('.wcp-editor-grid-system-control-res-use-checkbox').get(0).checked = false;
                lgGroup.find('select').attr('disabled', 'disabled');
                lgGroup.find('.wcp-editor-grid-system-control-visible').addClass('wcp-editor-control-disabled');
            }

            // Class
            lgGroup.find('.wcp-editor-grid-system-control-select-colspan').val(v.lg.class);

            // Visible
            if (parseInt(v.lg.visible, 10) == 1) {
                lgGroup.find('.wcp-editor-grid-system-control-visible').removeClass('wcp-editor-grid-system-control-visible-not');
            } else {
                lgGroup.find('.wcp-editor-grid-system-control-visible').addClass('wcp-editor-grid-system-control-visible-not');
            }
        },
        HTML: function() {
            var html = '';

            html += '<div class="wcp-editor-grid-system-control" id="'+ this.elementID +'">';

            // LG
            html += '   <div class="wcp-editor-grid-system-control-res-group wcp-editor-grid-system-control-res-group-lg">';
            html += '       <div class="wcp-editor-grid-system-control-res-name">LG</div>';
            html += '       <div class="wcp-editor-grid-system-control-res-use">';
            html += '           <input type="checkbox" class="wcp-editor-grid-system-control-res-use-checkbox">';
            html += '       </div>';
            html += '       <div class="wcp-editor-grid-system-control-colspan">';
            html += '           <select class="wcp-editor-grid-system-control-select-colspan">';
            html += '               <option value="col-lg-1">1 Column</option>';
            html += '               <option value="col-lg-2">2 Columns</option>';
            html += '               <option value="col-lg-3">3 Columns</option>';
            html += '               <option value="col-lg-4">4 Columns</option>';
            html += '               <option value="col-lg-5">5 Columns</option>';
            html += '               <option value="col-lg-6">6 Column</option>';
            html += '               <option value="col-lg-7">7 Columns</option>';
            html += '               <option value="col-lg-8">8 Columns</option>';
            html += '               <option value="col-lg-9">9 Columns</option>';
            html += '               <option value="col-lg-10">10 Columns</option>';
            html += '               <option value="col-lg-11">11 Columns</option>';
            html += '               <option value="col-lg-12">12 Columns</option>';
            html += '           </select>';
            html += '       </div>';
            html += '       <div class="wcp-editor-grid-system-control-visible">';
            html += '           <i class="fa fa-eye" aria-hidden="true"></i>';
            html += '           <i class="fa fa-eye-slash" aria-hidden="true"></i>';
            html += '       </div>';
            html += '   </div>';

            // MD
            html += '   <div class="wcp-editor-grid-system-control-res-group wcp-editor-grid-system-control-res-group-md">';
            html += '       <div class="wcp-editor-grid-system-control-res-name">MD</div>';
            html += '       <div class="wcp-editor-grid-system-control-res-use">';
            html += '           <input type="checkbox" class="wcp-editor-grid-system-control-res-use-checkbox">';
            html += '       </div>';
            html += '       <div class="wcp-editor-grid-system-control-colspan">';
            html += '           <select class="wcp-editor-grid-system-control-select-colspan">';
            html += '               <option value="col-md-1">1 Column</option>';
            html += '               <option value="col-md-2">2 Columns</option>';
            html += '               <option value="col-md-3">3 Columns</option>';
            html += '               <option value="col-md-4">4 Columns</option>';
            html += '               <option value="col-md-5">5 Columns</option>';
            html += '               <option value="col-md-6">6 Column</option>';
            html += '               <option value="col-md-7">7 Columns</option>';
            html += '               <option value="col-md-8">8 Columns</option>';
            html += '               <option value="col-md-9">9 Columns</option>';
            html += '               <option value="col-md-10">10 Columns</option>';
            html += '               <option value="col-md-11">11 Columns</option>';
            html += '               <option value="col-md-12">12 Columns</option>';
            html += '           </select>';
            html += '       </div>';
            html += '       <div class="wcp-editor-grid-system-control-visible">';
            html += '           <i class="fa fa-eye" aria-hidden="true"></i>';
            html += '           <i class="fa fa-eye-slash" aria-hidden="true"></i>';
            html += '       </div>';
            html += '   </div>';

            // SM
            html += '   <div class="wcp-editor-grid-system-control-res-group wcp-editor-grid-system-control-res-group-sm">';
            html += '       <div class="wcp-editor-grid-system-control-res-name">SM</div>';
            html += '       <div class="wcp-editor-grid-system-control-res-use">';
            html += '           <input type="checkbox" class="wcp-editor-grid-system-control-res-use-checkbox">';
            html += '       </div>';
            html += '       <div class="wcp-editor-grid-system-control-colspan">';
            html += '           <select class="wcp-editor-grid-system-control-select-colspan">';
            html += '               <option value="col-sm-1">1 Column</option>';
            html += '               <option value="col-sm-2">2 Columns</option>';
            html += '               <option value="col-sm-3">3 Columns</option>';
            html += '               <option value="col-sm-4">4 Columns</option>';
            html += '               <option value="col-sm-5">5 Columns</option>';
            html += '               <option value="col-sm-6">6 Column</option>';
            html += '               <option value="col-sm-7">7 Columns</option>';
            html += '               <option value="col-sm-8">8 Columns</option>';
            html += '               <option value="col-sm-9">9 Columns</option>';
            html += '               <option value="col-sm-10">10 Columns</option>';
            html += '               <option value="col-sm-11">11 Columns</option>';
            html += '               <option value="col-sm-12">12 Columns</option>';
            html += '           </select>';
            html += '       </div>';
            html += '       <div class="wcp-editor-grid-system-control-visible">';
            html += '           <i class="fa fa-eye" aria-hidden="true"></i>';
            html += '           <i class="fa fa-eye-slash" aria-hidden="true"></i>';
            html += '       </div>';
            html += '   </div>';

            // XS
            html += '   <div class="wcp-editor-grid-system-control-res-group wcp-editor-grid-system-control-res-group-xs">';
            html += '       <div class="wcp-editor-grid-system-control-res-name">XS</div>';
            html += '       <div class="wcp-editor-grid-system-control-res-use">';
            html += '           <input type="checkbox" class="wcp-editor-grid-system-control-res-use-checkbox">';
            html += '       </div>';
            html += '       <div class="wcp-editor-grid-system-control-colspan">';
            html += '           <select class="wcp-editor-grid-system-control-select-colspan">';
            html += '               <option value="col-xs-1">1 Column</option>';
            html += '               <option value="col-xs-2">2 Columns</option>';
            html += '               <option value="col-xs-3">3 Columns</option>';
            html += '               <option value="col-xs-4">4 Columns</option>';
            html += '               <option value="col-xs-5">5 Columns</option>';
            html += '               <option value="col-xs-6">6 Column</option>';
            html += '               <option value="col-xs-7">7 Columns</option>';
            html += '               <option value="col-xs-8">8 Columns</option>';
            html += '               <option value="col-xs-9">9 Columns</option>';
            html += '               <option value="col-xs-10">10 Columns</option>';
            html += '               <option value="col-xs-11">11 Columns</option>';
            html += '               <option value="col-xs-12">12 Columns</option>';
            html += '           </select>';
            html += '       </div>';
            html += '       <div class="wcp-editor-grid-system-control-visible">';
            html += '           <i class="fa fa-eye" aria-hidden="true"></i>';
            html += '           <i class="fa fa-eye-slash" aria-hidden="true"></i>';
            html += '       </div>';
            html += '   </div>';

            // end
            html += '   <div class="wcp-editor-controls-clear"></div>';
            html += '</div>';

            return html;
        },
        init: function() {
            var self = this;
            // self.valueChanged();

            // "Use" checkboxes
            $(document).on('change', '#' + this.elementID + ' .wcp-editor-grid-system-control-res-use-checkbox', function() {
                // Enable/disable the other inputs from this resolution group

                if ($(this).get(0).checked) {
                    $(this).closest('.wcp-editor-grid-system-control-res-group').find('select').removeAttr('disabled');
                    $(this).closest('.wcp-editor-grid-system-control-res-group').find('.wcp-editor-grid-system-control-visible').removeClass('wcp-editor-control-disabled');
                } else {
                    $(this).closest('.wcp-editor-grid-system-control-res-group').find('select').attr('disabled', 'disabled');
                    $(this).closest('.wcp-editor-grid-system-control-res-group').find('.wcp-editor-grid-system-control-visible').addClass('wcp-editor-control-disabled');
                }

                self.valueChanged();
            });

            // Toggle visibility
            $(document).on('click', '#' + this.elementID + ' .wcp-editor-grid-system-control-visible', function() {
                $(this).toggleClass('wcp-editor-grid-system-control-visible-not');
                self.valueChanged();
            });

            // Select colspan
            $(document).on('change', '#' + this.elementID + ' .wcp-editor-grid-system-control-select-colspan', function() {
                self.valueChanged();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'switch',
        customLabel: true,
        getValue: function() {
            var v = 0;

            if ($('#' + this.elementID).hasClass('active')) {
                v = 1;
            }

            return v;
        },
        setValue: function(v) {
            if (parseInt(v, 10) == 1) {
                $('#' + this.elementID).addClass('active');
            } else {
                $('#' + this.elementID).removeClass('active');
            }
        },
        HTML: function() {
            var html = '';

            html += '<div class="wcp-editor-control-switch" id="'+ this.elementID +'">';
            html += '   <div class="wcp-editor-control-switch-ball"></div>';
            html += '</div>';

            html += '<div class="wcp-editor-control-switch-label" id="'+ this.elementID +'-label">'+ this.title +'</div>';
            html += '<div class="wcp-editor-controls-clear"></div>';

            return html;
        },
        init: function() {
            var self = this;

            $(document).on('click', '#' + this.elementID, function() {
                $(this).toggleClass('active');
                self.valueChanged();
            });
            $(document).on('click', '#' + this.elementID + '-label', function() {
                $('#' + self.elementID).toggleClass('active');
                self.valueChanged();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'button group',
        getValue: function() {
            var v = $('#' + this.elementID).find('.active[data-button-value]').data('button-value');

            return v;
        },
        setValue: function(v) {
            $('#' + this.elementID).find('[data-button-value]').removeClass('active');
            $('#' + this.elementID).find('[data-button-value="'+ v +'"]').addClass('active');

            $('#' + this.elementID).find('[data-button-value="'+ v +'"]').siblings().removeClass('no-border-right');
            $('#' + this.elementID).find('[data-button-value="'+ v +'"]').prev().addClass('no-border-right');
        },
        HTML: function() {
            var html = '';

            html += '<div class="wcp-editor-control-button-group" id="'+ this.elementID +'">';

            for (var i=0; i<this.options.length; i++) {
                html += '<div class="wcp-editor-control-button-group-button" data-button-value="'+ this.options[i].value +'">'+ this.options[i].title +'</div>';
            }

            html += '</div>';

            return html;
        },
        init: function() {
            var self = this;

            $(document).on('click', '#' + this.elementID + ' .wcp-editor-control-button-group-button', function() {
                $(this).siblings().removeClass('active').removeClass('no-border-right');
                $(this).prev().addClass('no-border-right');
                $(this).addClass('active');
                self.valueChanged();
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'button',
        customLabel: true,
        getValue: function() {
            return undefined;
        },
        setValue: function() {

        },
        HTML: function() {
            return '<div id="'+ this.elementID +'" class="wcp-editor-control-button">'+ this.title +'</div>';
        },
        init: function() {
            var self = this;

            $(document).on('click', '#' + this.elementID, function() {
                self.valueChanged();
                $(document).trigger(self.options.event_name);
            });
        }
    });
    $.wcpEditorRegisterControl({
        type: 'wp media upload',
        getValue: function() {
            return $('#' + this.elementID + ' input').val();
        },
        setValue: function(v) {
            $('#' + this.elementID + ' input').val(v);
        },
        HTML: function() {
            return '<div class="wcp-editor-input-with-button" id="'+ this.elementID +'"><input type="text"><div class="wcp-editor-control-button">Choose Image</div></div>';
        },
        init: function() {
            var self = this;

            var inputSelector = '#' + this.elementID + ' input';
            var buttonSelector = '#' + this.elementID + ' .wcp-editor-control-button';

            $.wcpWPMedia(inputSelector, buttonSelector, function() {
                self.valueChanged();
            });

            $(document).on('change', inputSelector, function() {
                self.valueChanged();
            });
        }
    });
})(jQuery, window, document);



// Squares
// Description: Interactive and embeddable HTML content builder.
// Author: Nikolay Dyankov
// License: MIT

;(function ($, window, document, undefined) {
    // Register built-in elements using the public API
    $.squaresRegisterElement({
        name: "Paragraph",
        iconClass: "fa fa-paragraph",
        controls: {
            text: {
                text: {
                    name: 'Text',
                    type: 'textarea',
                    default: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
                }
            }
        },
        controlGroupIcons: {
            text: 'fa fa-ellipsis-h'
        },
        content: function() {
            return '<p id="'+ this.controls.general.id.getVal() +'" style="'+ this.controls.general.css.getVal() + this.fontStyles +' margin: 0; padding: 0;" class="'+ this.controls.general.classes.getVal() +'">'+ this.controls.text.text.getVal() +'</p>';
        }
    });
    $.squaresRegisterElement({
        name: "Heading",
        iconClass: "fa fa-header",
        controls: {
            heading: {
                text: {
                    name: 'Text',
                    type: 'text',
                    default: 'Lorem Ipsum'
                },
                heading: {
                    name: 'Heading',
                    type: 'select',
                    options: ['h1', 'h2', 'h3'],
                    default: 'h3'
                }
            }
        },
        controlGroupIcons: {
            heading: 'fa fa-header'
        },
        content: function() {
            return '<'+ this.controls['heading']['heading'].getVal() +' id="'+ this.controls['general']['id'].getVal() +'" style="'+ this.controls['general']['css'].getVal() + this.fontStyles +' margin: 0; padding: 0;" class="'+ this.controls['general']['classes'].getVal() +'">'+ this.controls.heading.text.getVal() +'</'+ this.controls['heading']['heading'].getVal() +'>';
        }
    });
    $.squaresRegisterElement({
        name: "Image",
        iconClass: "fa fa-camera",
        controls: {
            image: {
                url: {
                    name: 'Image URL',
                    type: 'text',
                    default: 'https://webcraftplugins.com/uploads/placeholder_image.png'
                },
                image_is_a_link: {
                    name: 'Image is a Link',
                    type: 'switch',
                    default: 0
                },
                link_to: {
                    name: 'Link to',
                    type: 'text',
                    default: '#'
                }
            }
        },
        controlGroupIcons: {
            image: 'fa fa-camera'
        },
        useFontControls: false,
        content: function() {
            var html = '';

            if (parseInt(this.controls.image.image_is_a_link.getVal(), 10) == 1) {
                html += '<a href="'+ this.controls.image.link_to.getVal() +'">';
            }

            html += '<img src="'+ this.controls.image.url.getVal() +'" id="'+ this.controls.general.id.getVal() +'" style="'+ this.controls.general.css.getVal() +'" class="'+ this.controls.general.classes.getVal() +'">';

            if (parseInt(this.controls.image.image_is_a_link.getVal(), 10) == 1) {
                html += '</a>';
            }

            return html;
        }
    });
    $.squaresRegisterElement({
        name: "Video",
        iconClass: "fa fa-video-camera",
        controls: {
            video: {
                mp4_url: {
                    name: 'MP4 URL',
                    type: 'text',
                    default: 'http://webcraftplugins.com/uploads/example_video.mp4'
                },
                webm_url: {
                    name: 'WEBM URL',
                    type: 'text',
                    default: 'http://webcraftplugins.com/uploads/example_video.webm'
                },
                ogv_url: {
                    name: 'OGV URL',
                    type: 'text',
                    default: 'http://webcraftplugins.com/uploads/example_video.ogv'
                },
                video_is_a_link: {
                    name: 'Video is a Link',
                    type: 'switch',
                    default: 0
                },
                link_to: {
                    name: 'Link to',
                    type: 'text',
                    default: '#'
                },
                autoplay: {
                    name: 'Autoplay',
                    type: 'switch',
                    default: 0
                },
                loop: {
                    name: 'Loop',
                    type: 'switch',
                    default: 0
                },
                controls: {
                    name: 'Controls',
                    type: 'switch',
                    default: 0
                }
            }
        },
        useFontControls: false,
        controlGroupIcons: {
            video: 'fa fa-video-camera'
        },
        content: function() {
            var html = '';

            if (parseInt(this.controls.video.video_is_a_link.getVal(), 10) == 1) {
                html += '<a href="'+ this.controls.video.link_to.getVal() +'">';
            }

            var videoTagAtts = '';

            if (parseInt(this.controls.video.autoplay.getVal(), 10) == 1) {
                videoTagAtts += ' autoplay ';
            }
            if (parseInt(this.controls.video.loop.getVal(), 10) == 1) {
                videoTagAtts += ' loop ';
            }
            if (parseInt(this.controls.video.controls.getVal(), 10) == 1) {
                videoTagAtts += ' controls ';
            }

            html += '<video '+ videoTagAtts +' id="'+ this.controls.general.id.getVal() +'" style="'+ this.controls.general.css.getVal() +'" class="'+ this.controls.general.classes.getVal() +'"><source src="'+ this.controls.video.mp4_url.getVal() +'" type="video/mp4"><source src="'+ this.controls.video.webm_url.getVal() +'" type="video/webm"><source src="'+ this.controls.video.ogv_url.getVal() +'" type="video/ogv"></video>';

            if (parseInt(this.controls.video.video_is_a_link.getVal(), 10) == 1) {
                html += '</a>';
            }

            return html;
        }
    });
    $.squaresRegisterElement({
        name: "YouTube",
        iconClass: "fa fa-youtube",
        useStyleControls: false,
        useFontControls: false,
        controls: {
            youtube: {
                embed_code: {
                    name: 'Embed Code',
                    type: 'textarea',
                    default: '<iframe width="560" height="315" src="https://www.youtube.com/embed/6NC_ODHu5jg" frameborder="0" allowfullscreen></iframe>'
                },
                allow_fullscreen: {
                    name: 'Allow Fullscreen',
                    type: 'switch',
                    default: 1
                },
                iframe_width: {
                    name: 'iframe Width',
                    type: 'int',
                    default: 320
                },
                iframe_auto_width: {
                    name: 'iframe Auto Width',
                    type: 'switch',
                    default: 1
                },
                iframe_height: {
                    name: 'iframe Height',
                    type: 'int',
                    default: 320
                }
            }
        },
        controlGroupIcons: {
            youtube: 'fa fa-youtube'
        },
        content: function() {
            // to do:
            // get the embed code from the controls, wrap it in a div, apply ID, CSS and classes to the DIV and set the iframe to 100% width and height
            // also implement the "allow fullscreen" option

            var embedCode = this.controls.youtube.embed_code.getVal();
            var html = '';

            html += '<div id="'+ this.controls.general.id.getVal() +'" style="'+ this.controls.general.css.getVal() +'" class="'+ this.controls.general.classes.getVal() +'">';

            // Allow fullscreen
            embedCode = embedCode.replace('allowfullscreen', '');
            if (parseInt(this.controls.youtube.allow_fullscreen.getVal(), 10) == 1 && embedCode.indexOf('allowfullscreen') == -1) {
                embedCode = embedCode.replace('></iframe>', ' allowfullscreen></iframe>');
            }

            // Set width
            if (parseInt(this.controls.youtube.iframe_auto_width.getVal(), 10) == 1) {
                embedCode = embedCode.replace(/width="\d+"/g, 'width="100%"');
            } else {
                embedCode = embedCode.replace(/width="\d+"/g, 'width="'+ this.controls.youtube.iframe_width.getVal() +'px"');
            }

            // Set height
            embedCode = embedCode.replace(/height="\d+"/g, 'height="'+ this.controls.youtube.iframe_height.getVal() +'px"');

            html += embedCode;

            html += '</div>';

            return html;
        }
    });
    $.squaresRegisterElement({
        name: "Button",
        iconClass: "fa fa-link",
        controls: {
            button: {
                text: {
                    name: 'Text',
                    type: 'text',
                    default: 'Button'
                },
                link_to: {
                    name: 'Link to',
                    type: 'text',
                    default: '#'
                },
                new_tab: {
                    name: 'Open in New Tab',
                    type: 'switch',
                    default: 0
                },
                display: {
                    name: 'Display',
                    type: 'button group',
                    options: ['inline-block', 'block'],
                    default: 'inline-block'
                },
                height: {
                    name: 'Height',
                    type: 'int',
                    default: 44
                },
                bg_color: {
                    name: 'Background Color',
                    type: 'color',
                    default: '#2196f3'
                },
                text_color: {
                    name: 'Text Color',
                    type: 'color',
                    default: '#ffffff'
                },
                border_radius: {
                    name: 'Border Radius',
                    type: 'int',
                    default: 10
                },
                padding: {
                    name: 'Padding Left/Right',
                    type: 'int',
                    default: 20
                },
            }
        },
        controlGroupIcons: {
            button: 'fa fa-link'
        },
        content: function() {
            var buttonStyle = '';

            buttonStyle += 'display: ' + this.controls.button.display.getVal() + '; ';
            buttonStyle += 'height: ' + this.controls.button.height.getVal() + 'px; ';
            buttonStyle += 'line-height: ' + this.controls.button.height.getVal() + 'px; ';
            buttonStyle += 'background-color: ' + this.controls.button.bg_color.getVal() + '; ';
            buttonStyle += 'color: ' + this.controls.button.text_color.getVal() + '; ';
            buttonStyle += 'border-radius: ' + this.controls.button.border_radius.getVal() + 'px; ';
            buttonStyle += 'padding-left: ' + this.controls.button.padding.getVal() + 'px; ';
            buttonStyle += 'padding-right: ' + this.controls.button.padding.getVal() + 'px; ';

            var newTab = '';

            if (parseInt(this.controls.button.new_tab.getVal(), 10) == 1) {
                newTab = 'target="_blank"';
            }

            return '<div id="'+ this.controls.general.id.getVal() +'" style="'+ this.controls.general.css.getVal() +'" class="'+ this.controls.general.classes.getVal() +'"><a href="'+ this.controls.button.link_to.getVal() +'" style="'+ buttonStyle +'" '+ newTab +' class="squares-button">'+ this.controls.button.text.getVal() +'</a></div>';
        }
    });
})(jQuery, window, document);

// Squares
// Description: Interactive and embeddable HTML content builder.
// Author: Nikolay Dyankov
// License: MIT

;(function ($, window, document, undefined) {
    $.squaresRegisterControl({
        type: 'int',
        getValue: function() {
            return parseInt($('#' + this.elementID).val(), 10);
        },
        setValue: function(v) {
            $('#' + this.elementID).val(parseInt(v, 10));
        },
        HTML: function() {
            return '<input type="text" id="'+ this.elementID +'">';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'float',
        getValue: function() {
            return parseFloat($('#' + this.elementID).val());
        },
        setValue: function(v) {
            $('#' + this.elementID).val(parseFloat(v));
        },
        HTML: function() {
            return '<input type="text" id="'+ this.elementID +'">';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'text',
        getValue: function() {
            return $('#' + this.elementID).val();
        },
        setValue: function(v) {
            $('#' + this.elementID).val(v);
        },
        HTML: function() {
            return '<input type="text" id="'+ this.elementID +'">';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'textarea',
        getValue: function() {
            return $('#' + this.elementID).val();
        },
        setValue: function(v) {
            $('#' + this.elementID).val(v);
        },
        HTML: function() {
            return '<textarea id="'+ this.elementID +'" rows="5"></textarea>';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'checkbox',
        getValue: function() {
            if ($('#' + this.elementID).get(0).checked == true) {
                return 1;
            } else {
                return 0;
            }
        },
        setValue: function(v) {
            if (parseInt(v, 10) === 1) {
                $('#' + this.elementID).get(0).checked = true;
            } else {
                $('#' + this.elementID).get(0).checked = false;
            }
        },
        HTML: function() {
            return '<input type="checkbox" id="'+ this.elementID +'">';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'color',
        getValue: function() {
            return $('#' + this.elementID).val();
        },
        setValue: function(v) {
            $('#' + this.elementID).val(v);
        },
        HTML: function() {
            return '<input type="color" id="'+ this.elementID +'">';
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'select',
        getValue: function() {
            return $('#' + this.elementID).val();
        },
        setValue: function(v) {
            $('#' + this.elementID).val(v);
        },
        HTML: function() {
            var html = '';

            html += '<select id="'+ this.elementID +'">';

            for (var i=0; i<this.options.length; i++) {
                html += '<option value="'+ this.options[i] +'">'+ this.options[i] +'</option>';
            }

            html += '</select>';

            return html;
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID, function() {
                self.valueChanged();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'box model',
        getValue: function() {
            return {
                margin: {
                    top: parseInt($('#sq-element-option-boxmodel-margin-top').val(), 10),
                    bottom: parseInt($('#sq-element-option-boxmodel-margin-bottom').val(), 10),
                    left: parseInt($('#sq-element-option-boxmodel-margin-left').val(), 10),
                    right: parseInt($('#sq-element-option-boxmodel-margin-right').val(), 10)
                },
                padding: {
                    top: parseInt($('#sq-element-option-boxmodel-padding-top').val(), 10),
                    bottom: parseInt($('#sq-element-option-boxmodel-padding-bottom').val(), 10),
                    left: parseInt($('#sq-element-option-boxmodel-padding-left').val(), 10),
                    right: parseInt($('#sq-element-option-boxmodel-padding-right').val(), 10)
                }
            }
        },
        setValue: function(v) {
            $('#sq-element-option-boxmodel-margin-top').val(this._value.margin.top);
            $('#sq-element-option-boxmodel-margin-bottom').val(this._value.margin.bottom);
            $('#sq-element-option-boxmodel-margin-left').val(this._value.margin.left);
            $('#sq-element-option-boxmodel-margin-right').val(this._value.margin.right);

            $('#sq-element-option-boxmodel-padding-top').val(this._value.padding.top);
            $('#sq-element-option-boxmodel-padding-bottom').val(this._value.padding.bottom);
            $('#sq-element-option-boxmodel-padding-left').val(this._value.padding.left);
            $('#sq-element-option-boxmodel-padding-right').val(this._value.padding.right);
        },
        HTML: function() {
            var html = '';

            html += '<div class="sq-boxmodel-margin" id="'+ this.elementID +'">';
            html += '   <div id="sq-boxmodel-label-margin">margin</div>';
            html += '   <input type="text" class="sq-boxmodel-input" id="sq-element-option-boxmodel-margin-top">';
            html += '   <input type="text" class="sq-boxmodel-input" id="sq-element-option-boxmodel-margin-bottom">';
            html += '   <input type="text" class="sq-boxmodel-input" id="sq-element-option-boxmodel-margin-left">';
            html += '   <input type="text" class="sq-boxmodel-input" id="sq-element-option-boxmodel-margin-right">';
            html += '   <div class="sq-boxmodel-padding">';
            html += '       <div id="sq-boxmodel-label-padding">padding</div>';
            html += '       <input type="text" class="sq-boxmodel-input" id="sq-element-option-boxmodel-padding-top">';
            html += '       <input type="text" class="sq-boxmodel-input" id="sq-element-option-boxmodel-padding-bottom">';
            html += '       <input type="text" class="sq-boxmodel-input" id="sq-element-option-boxmodel-padding-left">';
            html += '       <input type="text" class="sq-boxmodel-input" id="sq-element-option-boxmodel-padding-right">';
            html += '   </div>';
            html += '</div>';

            return html;
        },
        init: function() {
            var self = this;
            $(document).on('change', '#' + this.elementID + ' input', function() {
                self.valueChanged();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'slider',
        getValue: function() {
            var v = 0;

            // Get the ball position
            var ball = $('#' + this.elementID).find('.sq-control-slider-ball');
            var ballPosition = ball.position().left;

            // Get the track width
            var track = $('#' + this.elementID).find('.sq-control-slider-track');
            var trackWidth = track.outerWidth();

            // Calculate value
            var progress = ballPosition / trackWidth;
            v = this.options.min + (this.options.max - this.options.min) * progress;

            if (this.options.type == 'int') v = Math.round(v);

            return v;
        },
        setValue: function(v) {
            if (this.options.type == 'int') v = Math.round(v);

            var progress = (v - this.options.min) / (this.options.max - this.options.min);

            var ball = $('#' + this.elementID).find('.sq-control-slider-ball');

            // Get the track width
            var track = $('#' + this.elementID).find('.sq-control-slider-track');
            var trackWidth = track.outerWidth();

            ball.css({
                left: trackWidth * progress
            });
        },
        HTML: function() {
            var html = '';

            html += '<div class="sq-control-slider" id="'+ this.elementID +'">';
            html += '   <div class="sq-control-slider-bubble"></div>';
            html += '   <div class="sq-control-slider-track"></div>';
            html += '   <div class="sq-control-slider-ball"></div>';
            html += '</div>';

            return html;
        },
        init: function() {
            var self = this;
            var ix = 0, iex = 0, dragging = false, ball = undefined, track = undefined, bubble = undefined;

            // Ball dragging
            $(document).on('mousedown', '#' + self.elementID + ' .sq-control-slider-ball', function(e) {
                ball = $('#' + self.elementID).find('.sq-control-slider-ball');
                track = $('#' + self.elementID).find('.sq-control-slider-track');
                bubble = $('#' + self.elementID).find('.sq-control-slider-bubble');
                ix = ball.position().left;
                iex = e.pageX;

                dragging = true;

                if ($.wcpEditorSliderStartedDragging) {
                    $.wcpEditorSliderStartedDragging();
                }

                // Show value bubble
                bubble.show();
            });
            $(document).on('mousemove.' + this.elementID, function(e) {
                if (dragging) {
                    var o = ix - iex + e.pageX;

                    if (o < 0) o = 0;
                    if (o > track.outerWidth()) o = track.outerWidth();

                    if (self.options.type == 'int') {
                        var step = track.outerWidth() / (self.options.max + 1);

                        o = o - (o % step);
                    }

                    ball.css({
                        left: o
                    });

                    self.valueChanged();

                    // Update value bubble
                    var rounded = Math.round(self.getValue() * 10)/10;

                    if (self.options.type == 'int') {
                        rounded = self.getValue();
                    }

                    bubble.html(rounded);
                    bubble.css({
                        left: o
                    });
                }
            });
            $(document).on('mouseup.' + this.elementID, function(e) {
                if (dragging) {
                    if ($.wcpEditorSliderFinishedDragging) {
                        $.wcpEditorSliderFinishedDragging();
                    }

                    dragging = false;
                    self.valueChanged();

                    // Hide value bubble
                    bubble.hide();
                }
            });

            // Click on the track
            $(document).on('mousedown', '#' + self.elementID + ' .sq-control-slider-track', function(e) {
                ball = $('#' + self.elementID).find('.sq-control-slider-ball');
                track = $('#' + self.elementID).find('.sq-control-slider-track');
                bubble = $('#' + self.elementID).find('.sq-control-slider-bubble');

                // Set the ball to the mouse position
                var o = e.pageX - track.offset().left;

                if (o < 0) o = 0;
                if (o > track.outerWidth()) o = track.outerWidth();

                ball.css({
                    left: o
                });

                // Start dragging
                ix = ball.position().left;
                iex = e.pageX;

                dragging = true;

                // Show value bubble
                bubble.show();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'grid system',
        getValue: function() {
            // tmp
            var res = {
                xs: {
                    use: 1,
                    class: 'sq-col-xs-1',
                    visible: 1
                },
                sm: {
                    use: 1,
                    class: 'sq-col-sm-1',
                    visible: 1
                },
                md: {
                    use: 1,
                    class: 'sq-col-md-1',
                    visible: 1
                },
                lg: {
                    use: 1,
                    class: 'sq-col-lg-1',
                    visible: 1
                },
            };

            var root = $('#' + this.elementID);

            // XS ---------
            var xsGroup = root.find('.sq-grid-system-control-res-group-xs');

            // Use
            if (xsGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked) {
                res.xs.use = 1;
            } else {
                res.xs.use = 0;
            }

            // Class
            res.xs.class = xsGroup.find('.sq-grid-system-control-select-colspan').val();

            // Visible
            if (xsGroup.find('.sq-grid-system-control-visible').hasClass('sq-grid-system-control-visible-not')) {
                res.xs.visible = 0;
            } else {
                res.xs.visible = 1;
            }

            // SM ---------
            var smGroup = root.find('.sq-grid-system-control-res-group-sm');

            // Use
            if (smGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked) {
                res.sm.use = 1;
            } else {
                res.sm.use = 0;
            }

            // Class
            res.sm.class = smGroup.find('.sq-grid-system-control-select-colspan').val();

            // Visible
            if (smGroup.find('.sq-grid-system-control-visible').hasClass('sq-grid-system-control-visible-not')) {
                res.sm.visible = 0;
            } else {
                res.sm.visible = 1;
            }

            // MD ---------
            var mdGroup = root.find('.sq-grid-system-control-res-group-md');

            // Use
            if (mdGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked) {
                res.md.use = 1;
            } else {
                res.md.use = 0;
            }

            // Class
            res.md.class = mdGroup.find('.sq-grid-system-control-select-colspan').val();

            // Visible
            if (mdGroup.find('.sq-grid-system-control-visible').hasClass('sq-grid-system-control-visible-not')) {
                res.md.visible = 0;
            } else {
                res.md.visible = 1;
            }

            // LG ---------
            var lgGroup = root.find('.sq-grid-system-control-res-group-lg');

            // Use
            if (lgGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked) {
                res.lg.use = 1;
            } else {
                res.lg.use = 0;
            }

            // Class
            res.lg.class = lgGroup.find('.sq-grid-system-control-select-colspan').val();

            // Visible
            if (lgGroup.find('.sq-grid-system-control-visible').hasClass('sq-grid-system-control-visible-not')) {
                res.lg.visible = 0;
            } else {
                res.lg.visible = 1;
            }

            return res;
        },
        setValue: function(v) {
            var root = $('#' + this.elementID);

            // XS ---------
            var xsGroup = root.find('.sq-grid-system-control-res-group-xs');

            // Use
            if (parseInt(v.xs.use, 10) == 1) {
                xsGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked = true;
                xsGroup.find('select').removeAttr('disabled');
                xsGroup.find('.sq-grid-system-control-visible').removeClass('sq-control-disabled');
            } else {
                xsGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked = false;
                xsGroup.find('select').attr('disabled', 'disabled');
                xsGroup.find('.sq-grid-system-control-visible').addClass('sq-control-disabled');
            }

            // Class
            xsGroup.find('.sq-grid-system-control-select-colspan').val(v.xs.class);

            // Visible
            if (parseInt(v.xs.visible, 10) == 1) {
                xsGroup.find('.sq-grid-system-control-visible').removeClass('sq-grid-system-control-visible-not');
            } else {
                xsGroup.find('.sq-grid-system-control-visible').addClass('sq-grid-system-control-visible-not');
            }

            // SM ---------
            var smGroup = root.find('.sq-grid-system-control-res-group-sm');

            // Use
            if (parseInt(v.sm.use, 10) == 1) {
                smGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked = true;
                smGroup.find('select').removeAttr('disabled');
                smGroup.find('.sq-grid-system-control-visible').removeClass('sq-control-disabled');
            } else {
                smGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked = false;
                smGroup.find('select').attr('disabled', 'disabled');
                smGroup.find('.sq-grid-system-control-visible').addClass('sq-control-disabled');
            }

            // Class
            smGroup.find('.sq-grid-system-control-select-colspan').val(v.sm.class);

            // Visible
            if (parseInt(v.sm.visible, 10) == 1) {
                smGroup.find('.sq-grid-system-control-visible').removeClass('sq-grid-system-control-visible-not');
            } else {
                smGroup.find('.sq-grid-system-control-visible').addClass('sq-grid-system-control-visible-not');
            }

            // MD ---------
            var mdGroup = root.find('.sq-grid-system-control-res-group-md');

            // Use
            if (parseInt(v.md.use, 10) == 1) {
                mdGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked = true;
                mdGroup.find('select').removeAttr('disabled');
                mdGroup.find('.sq-grid-system-control-visible').removeClass('sq-control-disabled');
            } else {
                mdGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked = false;
                mdGroup.find('select').attr('disabled', 'disabled');
                mdGroup.find('.sq-grid-system-control-visible').addClass('sq-control-disabled');
            }

            // Class
            mdGroup.find('.sq-grid-system-control-select-colspan').val(v.md.class);

            // Visible
            if (parseInt(v.md.visible, 10) == 1) {
                mdGroup.find('.sq-grid-system-control-visible').removeClass('sq-grid-system-control-visible-not');
            } else {
                mdGroup.find('.sq-grid-system-control-visible').addClass('sq-grid-system-control-visible-not');
            }

            // LG ---------
            var lgGroup = root.find('.sq-grid-system-control-res-group-lg');

            // Use
            if (parseInt(v.lg.use, 10) == 1) {
                lgGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked = true;
                lgGroup.find('select').removeAttr('disabled');
                lgGroup.find('.sq-grid-system-control-visible').removeClass('sq-control-disabled');
            } else {
                lgGroup.find('.sq-grid-system-control-res-use-checkbox').get(0).checked = false;
                lgGroup.find('select').attr('disabled', 'disabled');
                lgGroup.find('.sq-grid-system-control-visible').addClass('sq-control-disabled');
            }

            // Class
            lgGroup.find('.sq-grid-system-control-select-colspan').val(v.lg.class);

            // Visible
            if (parseInt(v.lg.visible, 10) == 1) {
                lgGroup.find('.sq-grid-system-control-visible').removeClass('sq-grid-system-control-visible-not');
            } else {
                lgGroup.find('.sq-grid-system-control-visible').addClass('sq-grid-system-control-visible-not');
            }
        },
        HTML: function() {
            var html = '';

            html += '<div class="sq-grid-system-control" id="'+ this.elementID +'">';

            // LG
            html += '   <div class="sq-grid-system-control-res-group sq-grid-system-control-res-group-lg">';
            html += '       <div class="sq-grid-system-control-res-name">LG</div>';
            html += '       <div class="sq-grid-system-control-res-use">';
            html += '           <input type="checkbox" class="sq-grid-system-control-res-use-checkbox">';
            html += '       </div>';
            html += '       <div class="sq-grid-system-control-colspan">';
            html += '           <select class="sq-grid-system-control-select-colspan">';
            html += '               <option value="sq-col-lg-1">1 Column</option>';
            html += '               <option value="sq-col-lg-2">2 Columns</option>';
            html += '               <option value="sq-col-lg-3">3 Columns</option>';
            html += '               <option value="sq-col-lg-4">4 Columns</option>';
            html += '               <option value="sq-col-lg-5">5 Columns</option>';
            html += '               <option value="sq-col-lg-6">6 Column</option>';
            html += '               <option value="sq-col-lg-7">7 Columns</option>';
            html += '               <option value="sq-col-lg-8">8 Columns</option>';
            html += '               <option value="sq-col-lg-9">9 Columns</option>';
            html += '               <option value="sq-col-lg-10">10 Columns</option>';
            html += '               <option value="sq-col-lg-11">11 Columns</option>';
            html += '               <option value="sq-col-lg-12">12 Columns</option>';
            html += '           </select>';
            html += '       </div>';
            html += '       <div class="sq-grid-system-control-visible">';
            html += '           <i class="fa fa-eye" aria-hidden="true"></i>';
            html += '           <i class="fa fa-eye-slash" aria-hidden="true"></i>';
            html += '       </div>';
            html += '   </div>';

            // MD
            html += '   <div class="sq-grid-system-control-res-group sq-grid-system-control-res-group-md">';
            html += '       <div class="sq-grid-system-control-res-name">MD</div>';
            html += '       <div class="sq-grid-system-control-res-use">';
            html += '           <input type="checkbox" class="sq-grid-system-control-res-use-checkbox">';
            html += '       </div>';
            html += '       <div class="sq-grid-system-control-colspan">';
            html += '           <select class="sq-grid-system-control-select-colspan">';
            html += '               <option value="sq-col-md-1">1 Column</option>';
            html += '               <option value="sq-col-md-2">2 Columns</option>';
            html += '               <option value="sq-col-md-3">3 Columns</option>';
            html += '               <option value="sq-col-md-4">4 Columns</option>';
            html += '               <option value="sq-col-md-5">5 Columns</option>';
            html += '               <option value="sq-col-md-6">6 Column</option>';
            html += '               <option value="sq-col-md-7">7 Columns</option>';
            html += '               <option value="sq-col-md-8">8 Columns</option>';
            html += '               <option value="sq-col-md-9">9 Columns</option>';
            html += '               <option value="sq-col-md-10">10 Columns</option>';
            html += '               <option value="sq-col-md-11">11 Columns</option>';
            html += '               <option value="sq-col-md-12">12 Columns</option>';
            html += '           </select>';
            html += '       </div>';
            html += '       <div class="sq-grid-system-control-visible">';
            html += '           <i class="fa fa-eye" aria-hidden="true"></i>';
            html += '           <i class="fa fa-eye-slash" aria-hidden="true"></i>';
            html += '       </div>';
            html += '   </div>';

            // SM
            html += '   <div class="sq-grid-system-control-res-group sq-grid-system-control-res-group-sm">';
            html += '       <div class="sq-grid-system-control-res-name">SM</div>';
            html += '       <div class="sq-grid-system-control-res-use">';
            html += '           <input type="checkbox" class="sq-grid-system-control-res-use-checkbox">';
            html += '       </div>';
            html += '       <div class="sq-grid-system-control-colspan">';
            html += '           <select class="sq-grid-system-control-select-colspan">';
            html += '               <option value="sq-col-sm-1">1 Column</option>';
            html += '               <option value="sq-col-sm-2">2 Columns</option>';
            html += '               <option value="sq-col-sm-3">3 Columns</option>';
            html += '               <option value="sq-col-sm-4">4 Columns</option>';
            html += '               <option value="sq-col-sm-5">5 Columns</option>';
            html += '               <option value="sq-col-sm-6">6 Column</option>';
            html += '               <option value="sq-col-sm-7">7 Columns</option>';
            html += '               <option value="sq-col-sm-8">8 Columns</option>';
            html += '               <option value="sq-col-sm-9">9 Columns</option>';
            html += '               <option value="sq-col-sm-10">10 Columns</option>';
            html += '               <option value="sq-col-sm-11">11 Columns</option>';
            html += '               <option value="sq-col-sm-12">12 Columns</option>';
            html += '           </select>';
            html += '       </div>';
            html += '       <div class="sq-grid-system-control-visible">';
            html += '           <i class="fa fa-eye" aria-hidden="true"></i>';
            html += '           <i class="fa fa-eye-slash" aria-hidden="true"></i>';
            html += '       </div>';
            html += '   </div>';

            // XS
            html += '   <div class="sq-grid-system-control-res-group sq-grid-system-control-res-group-xs">';
            html += '       <div class="sq-grid-system-control-res-name">XS</div>';
            html += '       <div class="sq-grid-system-control-res-use">';
            html += '           <input type="checkbox" class="sq-grid-system-control-res-use-checkbox">';
            html += '       </div>';
            html += '       <div class="sq-grid-system-control-colspan">';
            html += '           <select class="sq-grid-system-control-select-colspan">';
            html += '               <option value="sq-col-xs-1">1 Column</option>';
            html += '               <option value="sq-col-xs-2">2 Columns</option>';
            html += '               <option value="sq-col-xs-3">3 Columns</option>';
            html += '               <option value="sq-col-xs-4">4 Columns</option>';
            html += '               <option value="sq-col-xs-5">5 Columns</option>';
            html += '               <option value="sq-col-xs-6">6 Column</option>';
            html += '               <option value="sq-col-xs-7">7 Columns</option>';
            html += '               <option value="sq-col-xs-8">8 Columns</option>';
            html += '               <option value="sq-col-xs-9">9 Columns</option>';
            html += '               <option value="sq-col-xs-10">10 Columns</option>';
            html += '               <option value="sq-col-xs-11">11 Columns</option>';
            html += '               <option value="sq-col-xs-12">12 Columns</option>';
            html += '           </select>';
            html += '       </div>';
            html += '       <div class="sq-grid-system-control-visible">';
            html += '           <i class="fa fa-eye" aria-hidden="true"></i>';
            html += '           <i class="fa fa-eye-slash" aria-hidden="true"></i>';
            html += '       </div>';
            html += '   </div>';

            // end
            html += '   <div class="squares-clear"></div>';
            html += '</div>';

            return html;
        },
        init: function() {
            var self = this;
            // self.valueChanged();

            // "Use" checkboxes
            $(document).on('change', '#' + this.elementID + ' .sq-grid-system-control-res-use-checkbox', function() {
                // Enable/disable the other inputs from this resolution group

                if ($(this).get(0).checked) {
                    $(this).closest('.sq-grid-system-control-res-group').find('select').removeAttr('disabled');
                    $(this).closest('.sq-grid-system-control-res-group').find('.sq-grid-system-control-visible').removeClass('sq-control-disabled');
                } else {
                    $(this).closest('.sq-grid-system-control-res-group').find('select').attr('disabled', 'disabled');
                    $(this).closest('.sq-grid-system-control-res-group').find('.sq-grid-system-control-visible').addClass('sq-control-disabled');
                }

                self.valueChanged();
            });

            // Toggle visibility
            $(document).on('click', '#' + this.elementID + ' .sq-grid-system-control-visible', function() {
                $(this).toggleClass('sq-grid-system-control-visible-not');
                self.valueChanged();
            });

            // Select colspan
            $(document).on('change', '#' + this.elementID + ' .sq-grid-system-control-select-colspan', function() {
                self.valueChanged();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'switch',
        customLabel: true,
        getValue: function() {
            var v = 0;

            if ($('#' + this.elementID).hasClass('active')) {
                v = 1;
            }

            return v;
        },
        setValue: function(v) {
            if (parseInt(v, 10) == 1) {
                $('#' + this.elementID).addClass('active');
            } else {
                $('#' + this.elementID).removeClass('active');
            }
        },
        HTML: function() {
            var html = '';

            html += '<div class="sq-control-switch" id="'+ this.elementID +'">';
            html += '   <div class="sq-control-switch-ball"></div>';
            html += '</div>';

            html += '<div class="sq-control-switch-label" id="'+ this.elementID +'-label">'+ this.name +'</div>';
            html += '<div class="squares-clear"></div>';

            return html;
        },
        init: function() {
            var self = this;

            $(document).on('click', '#' + this.elementID, function() {
                $(this).toggleClass('active');
                self.valueChanged();
            });
            $(document).on('click', '#' + this.elementID + '-label', function() {
                $('#' + self.elementID).toggleClass('active');
                self.valueChanged();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'button group',
        getValue: function() {
            var v = $('#' + this.elementID).find('.active[data-button-value]').data('button-value');

            return v;
        },
        setValue: function(v) {
            $('#' + this.elementID).find('[data-button-value]').removeClass('active');
            $('#' + this.elementID).find('[data-button-value="'+ v +'"]').addClass('active');
        },
        HTML: function() {
            var html = '';

            html += '<div class="sq-control-button-group" id="'+ this.elementID +'">';

            for (var i=0; i<this.options.length; i++) {
                html += '<div class="sq-control-button-group-button" data-button-value="'+ this.options[i] +'">'+ this.options[i] +'</div>';
            }

            html += '</div>';

            return html;
        },
        init: function() {
            var self = this;

            $(document).on('click', '#' + this.elementID + ' .sq-control-button-group-button', function() {
                $(this).siblings().removeClass('active').removeClass('no-border-right');
                $(this).prev().addClass('no-border-right');
                $(this).addClass('active');
                self.valueChanged();
            });
        }
    });
    $.squaresRegisterControl({
        type: 'wp media upload',
        getValue: function() {
            return $('#' + this.elementID + ' input').val();
        },
        setValue: function(v) {
            $('#' + this.elementID + ' input').val(v);
        },
        HTML: function() {
            return '<div class="sq-input-with-button" id="'+ this.elementID +'"><input type="text"><div class="sq-control-button">Choose Media</div></div>';
        },
        init: function() {
            var self = this;

            var inputSelector = '#' + this.elementID + ' input';
            var buttonSelector = '#' + this.elementID + ' .sq-control-button';

            $.wcpWPMedia(inputSelector, buttonSelector, function() {
                self.valueChanged();
            });
        }
    });
})(jQuery, window, document);

/////

;(function ($, window, document, undefined) {

    var tours = [];

    // API

    $.wcpTourRegister = function(options) {
        var t = new WCPTour(options);
        tours[options.name] = t;
    }
    $.wcpTourStart = function(tourName) {
        tours[tourName].start();
    }
    $.wcpTourRestart = function(tourName) {
        tours[tourName].restart();
    }

    // API Events

    $.wcpTourEventStepChanged = function(stepIndex) {

    }
    $.wcpTourEventStarted = function() {

    }
    $.wcpTourEventFinished = function() {

    }
    $.wcpTourCoordinatesForTipForStep = function(stepIndex) {
        return undefined;
    }
    $.wcpTourCoordinatesForHighlightRect = function(stepIndex) {
        return undefined;
    }

    function WCPTour(options) {
        this.id = Math.floor(Math.random() * 99999) + 1;
        this.options = options;
        this.currentStep = -1;
        this.reachedStep = -1;

        // DOM
        this.root = undefined;

        this.init();
    }
    WCPTour.prototype.init = function() {
        if (!localStorage[this.options.name]) {
            localStorage[this.options.name] = -1;
        }
    };
    WCPTour.prototype.start = function() {
        if (localStorage[this.options.name] == 'finished') {
            // Tour finished
            return;
        } else if (localStorage[this.options.name] >= 0) {
            // Tour is still active
            this.reachedStep = -1;
            this.currentStep = -1;
            this.drawContent();
            this.presentStep(localStorage[this.options.name]);

            // Send event
            $.wcpTourEventStarted();
        } else {
            // Tour has not started yet
            this.reachedStep = -1;
            this.drawContent();
            this.presentWelcomeScreen();

            // Send event
            $.wcpTourEventStarted();
        }
    };
    WCPTour.prototype.restart = function() {
        localStorage[this.options.name] = -1;
        this.start();
    };
    WCPTour.prototype.drawContent = function() {
        if (this.root) this.root.remove();

        var html = '';

        html += '<div id="wcp-tour-'+ this.id +'" class="wcp-tour-root">';
        html += '   <div class="wcp-tour-background">';
        html += '       <div class="wcp-tour-highlight-rect" id="wcp-tour-highlight-rect-1"></div>';
        html += '       <div class="wcp-tour-highlight-rect" id="wcp-tour-highlight-rect-2"></div>';
        html += '       <div class="wcp-tour-highlight-rect" id="wcp-tour-highlight-rect-3"></div>';
        html += '       <div class="wcp-tour-highlight-rect" id="wcp-tour-highlight-rect-4"></div>';
        html += '   </div>';

        // welcome screen

        html += '   <div class="wcp-tour-welcome-screen wcp-tour-centered-content">';
        html += '       <img class="wcp-tour-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAFD9JREFUeJzt3XmUVNWdB/DvvbV1VXdVvW5omoaW1rAKIcYFoyYScSQH4zajROKCxyST6GhyNKtZJ4tG0RAnzsQkY5wzY5w5yZhJOGcMQjQR4wQMisSWIDvI0g10A13V1VXdXcu98wdK6HpVgND13qu6389/3Pse74fH96233XsBIiIiIiIiIiIiqmnC7QIqIRaLNeW0niz8/iZRKES1EA1ayuAxdxIioJV6jwQKGlgHIQoOlVv1hNbNWuuI23WMJAH0Cq3f1D5fSufzh4JSbk4mk71u1zXSqj8AWlsj9ZnMRQDmaK0v1lKeKYHRbpdFtUcBPUKpN4QQLwJ4Pm1Zf8LOnYNu13UqqjUAAmHLmieAhQK4GkDI7YLIQEoNKCGWCK1/lunr+x2AqrtqrKoAiMfjVk6IOzRwlwTGuF0P0RFKdUKI76fr6h7D/v1pt8s5UdURAIcv8+9RWt8tpYy5XQ5ROQo4ILR+KJNMPgIg63Y9x+P1ABDhePwaqfUjkHLCieygpQ86HIEKhaGDIWjpB/x+6GPsI/uTCBzqHtZ2xpw5aJ4+41Rqr3nd6/+CN194YVhbQEo0R6rzjixbUDgwMDSsbdy55yIYjSLV2Ynknj3IDwyc0N+ltN4ogTvSyeSKStQ6UvxuF1BOU1NTbFCpxwSwAOLYOVWIWijEmlCIWlDhehxv+2J+ACgKgObpMzDpQx96h1WbRStlC4ApTTH86uqL3SnoFP3lQALz//f/hrW1XXDhkf8PtFLo3bED+zs60LnmFXSvX1/275JCTAPwfH08/pO0ZX3Wqw8LPRkAkXj8nEGlnhLAxHLbaH8AuTHjkW9qgQ5W5y8OVRchJZomTkTTxIk489pr0d/djR0rVmDLM0sxmEiU2UncXt/be6GMRj+SSqW2OFvx8Um3CygWtqyrBLCy3MmvA0FkJ0xGZuYFyI2dwJOfXNMwZgxmLliAq3/6OM771KcQtqzSG0p5Vl6IVxosy3OXRp4KgEg8fqsElkCIOlunEMi1tGFgxizkRre+48t8okrxB4OYcsWVuPLHP8HUq66CkPbTSkoZ11o/G7asq10osSzPBEAkHr9VCPHvAHzFfTpUh4Gp70V2/Lugpa2byBMCkQjO/ftPYu6iB1HfXOIttRB1ElgStqxrnK+uNE8EQNiyrhJCPF6qr2CNxsC0c6AiUafLIjopo6dOxeU/+AHGzzq/VLeUWv+iobHxA07XVYrrARCJx8+RWj+FEr/8ueZxGDzjTGifJ59VEpUVbGjA7K9+FZPnzbN3ClFX0PrpaDQ62fnKhnM1AJqammIQ4qlS9/y5sROQPW0S7/WpagkpMev2f8CM+fNtfRKwlM/332hvtz/vcpCbASDees9ve9qfax6H7LjTXSiJaIQJgbNuXlj6SgA4O5JILHa6pKO5FgBhy7paAAuK2wvWKGTbyr7+J6o+QuC8227H+FmzSnSJOxssa7YLVQFwKwBaWyNSqUeKm3WoDkPtU3nZTzVHSIkL77ob9c3Ntr6CUo8CCDhflUsBUJ/J3AMp24c1CsEHflTTgtEoLvril2w/cFLKd9db1h1u1OR4AMTjcUtpfXdxe27MeL7qo5rXPHUqJl9+ub1D6y+78UDQ8QDICXFH8ZBeHQgi19pebheimvLemxeirvizYSHGNiSTH3e6FqcDIKCBu4obc63t/MKPjBGor8f0a6+ztWvgi3D4nHT0YGHLmlc8k4/2B5AbNdbJMohcN2nePIRitrltTq+Pxx19I+BoAAhgYXFbbsx4PvUn4/hDIUwp9SxACNs5UknOBUBra+StCTyHyTe1OFYCkZecMedSW5tSaj4cfCXoWAC8NXX3sMH7hajF8fxkrIbWVjRPnTqsTUoZq2tsPM+pGpy8BZhT3FCINTl4eCLvGXe+fcSg1Np2rlSKYwGgtbbNhlKIlplBhcgQLe95j61NAB906vjOBYCUZw7/s+/wBJ5EBmuaOAn+YNGqdUpNd+r4jgRALBZrKl6uS4cjfPpPxpM+H6Ljxxc1yja0tDjy6+hIAOS0tk18oEJhJw5N5Hm2AAAQGRx0ZLIQRwJA+P22p318+k90WP0Y+/yBAhjlxLGdCYBCwTbKR0uO+iMCAH+d/WpYAY6MjHMkALQQDbZGPwOACACCkYitTQhRQwEgZdDW5sSBiaqADJT48E9rR+6RXZ8VmIjcwwAgMhgDgMhgfBJHVeHx17fip+u2IZsv4G8nteGrF7wbAR9/v04VA4A8TQP4zqp1+PnGN4+0/XzTTuzsz+CHfzMLET9nkjoVjFDyrLxS+MILrw47+d+2qrMHH1+2CsmhrPOF1RAGAHnSYEHhzt+9gqXbu8pu81pPAjctXYXuzJCDldUWBgB5Tn82j48vfwl/2NN93G23JlK4cekfsasv7UBltYcBQJ5ycGAINz+zEmv3H7L11VmWfTptAHtSGdywdCU2HupzosSawgAgz+jsL38iN7S04EOLHsTcBxahocTgmYMDQ1j4zCqs7bYHB5XHACBP2JpI4YbflL6Ut9rbMffBh9DQ2orouHGY++BDiE+YYNsulc3hE8v+hBdP4NaBDmMAkOs6unvLPswbPW0aLrv/AYQbG4+0hZuaMPeBRbYJNQFgoFDAHcd5eEh/xQAgV63q6sHHlr9U8nXeuHPOxaXfuRfBBvtg0mBDA+bcex/GnX2OrS+vFL74h7UlXx/ScAwAcs2zb+7Fbc+9jEy+YOs7ffZszP7a1+APlR8U5w+FMPvrX0f7xbb5ZqG0xrdXrcOPXts8ojXXGgYAueKXm3bhsyteRa6gbH1TrrgSF33u85AnMGeE9Ptx0ec+j8kf/nDJ/n9euwkPrF7P4edl8FNgctzjr2/F4jUbSvbNvPFGzFzw0Xf09wkpMeu221EXi2PdL35u639i/Xb0DeVw38VnwceJaIdhAJCjFq/ZgMdf32prF1LivNtuw+R5JdbLO0Ezb7gBoVgMa376GKCH/+Yv2bobfdkcHp5zLkIcRHQE/0uQI5TW+MbKjpInv/T78f7Pff6UTv63TbniirK3D7/ftQ+ffPZPSOfyp3ycWsEAoIrLFRQ++8Ja/HLTLlufPxTCB7/+DUwo8SDvZB3rAeLLew/ilmUvoXeQg4gABgBVWCZfwG2/exm/3WF/Lx+MRnHpvfeh9eyzR/y4x3qFuP5AAjctXYm96YERP261YQDQSZMlxuIPHHV5nRzK4mPLX8Kqzh7bdpGmUZj7wCKMLvExz0gZPW0a5j6wCOEm+yK025P9uPE3K7Ej2X+kbVui37adbdmuGsMAoJMWbR1na9ue7Mcjr27Eys5u3LR0FTq6e+37jR+PuQ89iPhpp1W8xviECZi76EE0tLba+vamB3DT0lV47s29eGrTTnx71eu2bUrtV0v4FoBO2uipUxGKxTDUN3zwzo87tgAdpfdpmjQJc/7xmwjF4w5UeNjbA4lWfOtb6N2xfVjfocEhfOb5NSX3Czc2YtRkR1bocg2vAOikSb8f06+97oS3b5k5E5fd911HT/631VkWLrv/foyZMeOE95l+3XwIWdunSG3/66jipl1zDcbPmnXc7U674EJc8s1vwR92b1HYQCSCOd/+DsbPOv+42552wYWYcsUVDlTlLgYAnRIhJS7+8lcwY/5H4Cuxwo0vEMDMBQvwgXvuKdnvNF8ggIu/8hXMmD+/5Io8/mAQMxd8FO//0pdq/tcf4DMAGgHS78dZCxdi2jXXYM/Lq5HctQtaa8Tb2tD2vgtKzuLjJunz4ayFt2DKlVdhz+rV6NuzG0JKWO3taDv/fQhGHVmWzxMYADRiQrEYJl421+0yTli4sRGT581zuwxX1f41DhGVxQAgMhgDgMhgDAAigzEAiAzGACAyGAOAyGAMACKDMQCIDMYAIDIYA4DIYAwAIoMxAIgMxgAgMhgDgMhgDAAigzEAiAzGACAyGAOAyGAMACKDMQCIDMYAIDIYA4DIYAwAIoMxAIgMxgAgMhgDgMhgDAAigzEAiAzGACAyGAOAyGAMACKD+d0ugI6vMRTCB8a24F2xGBr8AbfLqWoaGslsDhsSvVi1bz8GCwW3S3IVA8Dj2urrccOkiQhKn9ul1AQBASsYxIVjWjDNsvDk5i1I5XJul+Ua3gJ4WEBKXHfGGTz5K6QxGMKV7RPcLsNVDAAPm2ZZaAjwkr+S3hWNuV2CqxgAHjY2EnG7BKpxDAAigzEAPGxfJuN2CVTjGAAetjGRMPoJtRM2JhJul+AqBoCH5ZTCr3bsMP5ddaXsHxjAM7t3u12Gq/gdgMd1ptP4t40b8f6xYzEpFuNbgVOkodE7lMW6Q4ewursbOaXcLslVDIAqkMhmsXTXLrfLoBrEWwAigzEAiAzGACAyGAOAyGAMACKDMQCIDMYAIDIYA4DIYAwAIoMxAIgMxgAgMhgDgMhgDAAigzEAiAzGACAyGAOAyGAMACKDMQCIDMYAIDIY5wSsAlwdeORwdeDhGAAex9WBRxZXBx6OtwAextWBK4urAzMAPI2rA1ceVwcmz+LqwFRpDAAigzEAPIyrA1OlMQA8jKsDVx5XBybP4urAlcXVgfkdgOdxdeCRxdWBh2MAVAGuDkyVwlsAIoMxAIgMxgAgMhgDgMhgDAAigzEAiAzGACAyGAOAyGAMACKDMQCIDMYAIDIYA4DIYAwAIoMxAIgMxgAgMhgDgMhgDAAigzEAiAzGACAyGAOAyGAMACKDMQCIDMYAIDIYA4DIYAwAIoMxAIgMxgAgMhgDgMhgDAAigzEAiAzGACAyGAOAyGAMACKDMQCIDMYAIDIYA4DIYAwAIoMxAIgMxgAgMhgDgMhgDAAigzEAiAzGACAyGAOAyGAMACKDMQCIDMYAIDIYA4DIYAwAIoMxAIgMxgAgMhgDgMhgDAAigzEAiAzGACAyGAOAyGAMACKDMQCIDMYAIDIYA4DIYAwAIoMxAIgMxgAgMhgDgMhgDAAigzEAiAzGACAyGAOAyGAMACKDMQCIDMYAIDIYA4DIYAwAIoMxAIgMxgAgMhgDgMhgDAAigzEAiAzmSAAIpbK2NicOTFQFVC5nbxTCds5UgjMBoHW/rTGfd+LQRJ6XzWRsbVrrlBPHdiQAtM9n+8cIxQAgAoD84ICtTQI1FACFwsHiNpEdcuLQRJ6X7u62tWnAds5UgiMBEBRis+3AQ/bUIzJR3549trb6YHCLE8d2JACSyWRCAcNiTgxkAK2dODyRZ6l8HqnOzqJG1dXT02N/blYBTr4GXH/0H4QqQA6kHTw8kfcc3LYNhaK3AErKDU4d37EAkFq/WNzmS/U6dXgiT9rf0WFrE4DtXKkUxwJACPF8cZsvecipwxN5UteaV2xtssS5UimOBUB/IrEaSg275vf1JyGyg06VQOQpqc5OHNi0aXijUun+3t6XnarByWcAQxDi18WN/kP2VyBEJtixYoWtTQmxBIAjXwECzo8F+FlxQ6CnC9DK4TKI3JUfHMTm5cts7ULrJ52sw9EASCeTK6DU7qPbRC6LwIF9TpZB5Loty5cjmyr62E+prkxf3++drMPpK4ACpFxc3BjYuxOiwE+DyQzZVApv/Op/7B1CPAyg4GQtjg8HTofDjyug5+g2kc8hsHen06UQuaLjP5/EUF/fsDYFHIoEg//qdC3Ozwewd29Gar2ouDnQ0wWZ7iu1B1HN6NnwBrb89re2dgEsdurrv6O5MiFIOpn8F6X1G8MatUbdjo28FaCaNZRKYeX3vmf7BF4DWzOJxMNu1OTWjEA5CdxZ3Ciygwi9uYljBKjmqEIBLz38MDIHSwzyU+rTAFwZHuvalGDpZPIFrfWjxe2+5EGEdm91oySiytAar/z4R+ha+6q9T6knMn199nsCh7g6J2DGsr4A4LXidv+BvQh27nChIqIRpjX+/MR/YNtzz9m6lNYb0uGw7UrYSe5OCrpz56AsFK5XQKK4K7B/9+ErAd4OUJVShQJWP/pDbFiypESnSkspr8f+/a4OiXV9VuBUKrXFJ8SV0No2KMDf04W67esh8iUmTSTysKG+Prx4770lf/kB5DVwbbq39y9O11XM9QAAgP7e3pVKiOtR4iMIX/IQwhvXQqYdmSKN6JT1bHgDy+6+C11/Xltuk1szfX3POllTOX63C3jbQCLxdNiy/k5q/RSEqDu6T2SHEN78GnKjW5Ebdzq0zzNlEx2R7e9Hx5M/O/yev/Stax7ArelE4r8cLq0sT51JA4nE0w2NjXMLWj8tAWtYp9YI9HTBnziAXEsbcqPHAdITFzBkuPzgILYsW4Y3lvwaQ8lk6Y2USmvgWq/88r/NUwEAAP29vX+MxWKzClI+BeDs4n6RyyK4ZzsC+3YjP7oV+VEtUKGwC5WS6VKdndixYgU2L19mH9hzFKX1BunzXZ/xwD1/Mc8FAAD09fVtRXv7RZFEYrEQouRrEpHPIbBvFwL7dkHVR5GPj0YhZkGFGwDBdYdo5Kl8Hge3bcP+jg50rXnFPplHyZ3UEwPh8J1uP+0vx/NnSoNlzS4o9SMp5YwT2kFIqLowVF0EOlgH7fMB0gd9jNsF2Z9EoGhikvZLLsGYM6efUu1UvVQuh2wmg/zgANLd3ejbswepzk7bBJ7laGALlPqMmx/5nAjPB8BbAvXx+KeVEPdIoMXtYojKUcBBIcTiTG/vP8Glz3vfiWoJgMPa2sL1/f2fgFJfgJTtbpdDdIRSXRDi+5Fg8DE3RvWdrOoKgL+S9fH4ByHELUqp66SUUbcLIgMplVZCLBFaP/nWTD6OTuYxEqo1AI4WiDY2zipofakGZkulzoSUbW4XRTVIqS4l5QYBvCiFeP6t2Xsdm8CzEmohAGyam5sb0tnsJAGMUkBUCBGF1qFj7aO19gshZgIQWoh1Qmt+f2wyIbJa65QEUho4WB8MbqmmS3siIiIiIiIiIiIiAMD/A8Oh+BmC1xJEAAAAAElFTkSuQmCC">';
        html += '       <div class="wcp-tour-title">' + this.options.welcomeScreen.title + '</div>';
        html += '       <div class="wcp-tour-text">' + this.options.welcomeScreen.text + '</div>';
        html += '       <div class="wcp-tour-begin">' + this.options.welcomeScreen.startButtonTitle + '</div>';
        html += '       <div class="wcp-tour-skip">' + this.options.welcomeScreen.cancelButtonTitle + '</div>';
        html += '   </div>';

        // step
        html += '   <div class="wcp-tour-step wcp-tour-centered-content">';
        html += '       <div class="wcp-tour-step-nav"></div>';
        html += '       <div class="wcp-tour-step-title"></div>';
        html += '       <div class="wcp-tour-step-text"></div>';
        html += '       <div class="wcp-tour-step-click-anywhere">Click anywhere to continue</div>';
        html += '       <div class="wcp-tour-step-skip">Or skip this guide</div>';
        html += '   </div>';

        html += '</div>';

        $('body').append(html);

        if (!$('body').hasClass('wcp-tour-active')) {
            $('body').addClass('wcp-tour-active');
        }

        this.root = $('#wcp-tour-' + this.id);

        this.events();
    };
    WCPTour.prototype.events = function() {
        var self = this;

        this.root.find('.wcp-tour-begin').on('click', function() {
            // go to step 0
            self.presentStep(0);
        });
        this.root.find('.wcp-tour-skip').on('click', function() {
            // end tour
            self.endTour();
        });
        this.root.find('.wcp-tour-step-skip').on('click', function() {
            // end tour
            self.endTour();
        });
        $(document).off('click.' + this.id);
        $(document).on('click.' + this.id, function(e) {
            if ($(e.target).hasClass('wcp-tour-step') || $(e.target).hasClass('wcp-tour-step-title') || $(e.target).hasClass('wcp-tour-step-text') || $(e.target).hasClass('wcp-tour-step-click-anywhere')) {
                self.nextStep();
            }
        });
        $(document).off('click.' + this.id, '.wcp-tour-step-circle');
        $(document).on('click.' + this.id, '.wcp-tour-step-circle', function() {
            i = $(this).data('wcp-tour-circle-index');
            self.presentStep(i);
        });
        var visibleContainer = undefined;
        $(document).off('mouseover.' + this.id, '.wcp-tour-tip-media-button');
        $(document).on('mouseover.' + this.id, '.wcp-tour-tip-media-button', function() {
            visibleContainer = $(this).siblings('.wcp-tour-tip-media-container');
            visibleContainer.show();
            self.limitMediaContainer(visibleContainer);

            if (visibleContainer.find('video').length > 0) {
                visibleContainer.find('video').get(0).play();
            }
        });
        $(document).off('mousemove.' + this.id);
        $(document).on('mousemove.' + this.id, function(e) {
            if (visibleContainer && $(e.target).closest('.wcp-tour-tip-media-button').length == 0 && $(e.target).closest('.wcp-tour-tip-media-container').length == 0) {
                visibleContainer.hide();

                if (visibleContainer.find('video').length > 0) {
                    visibleContainer.find('video').get(0).pause();
                }

                visibleContainer = undefined;
            }
        });
        $(window).off('resize.wcp-tour');
        $(window).on('resize.wcp-tour', function() {
            $('.wcp-tour-highlight-rect').addClass('wcp-tour-highlight-rect-no-transition');
            self.updateHighlightRect();
            setTimeout(function() {
                $('.wcp-tour-highlight-rect').removeClass('wcp-tour-highlight-rect-no-transition');
            }, 10);
        });
    };
    WCPTour.prototype.nextStep = function() {
        if (parseInt(this.currentStep, 10) == this.options.steps.length - 1) {
            // done
            this.endTour();
        } else {
            // next step
            this.presentStep(parseInt(this.currentStep, 10) + 1);
        }
    };
    WCPTour.prototype.presentStep = function(stepIndex) {
        // is the step different?
        if (parseInt(this.currentStep, 10) == parseInt(stepIndex, 10)) return;

        if (this.currentStep == -1) {
            var self = this;

            // Hide welcome screen
            this.root.find('.wcp-tour-welcome-screen').css({ opacity: 0 });
            setTimeout(function() {
                self.root.find('.wcp-tour-welcome-screen').hide();
            }, 330);

            // Show step screen
            this.root.find('.wcp-tour-step').css({ display: 'flex' });
            setTimeout(function() {
                self.root.find('.wcp-tour-step').css({ opacity: 1 });
            }, 10);
        }


        localStorage[this.options.name] = stepIndex;
        this.currentStep = stepIndex;

        // Update navigation
        this.updateNav();

        // Set step content
        this.updateStep();

        // Update tip
        this.updateTip();

        // Send event
        $.wcpTourEventStepChanged(stepIndex);
    };
    WCPTour.prototype.presentWelcomeScreen = function(stepIndex) {
        // Set current step to welcome screen
        localStorage[this.options.name] = -1;
        this.currentStep = -1;

        // Set the initial position of the highlight rects
        $('.wcp-tour-highlight-rect').addClass('wcp-tour-highlight-rect-no-transition');
        var rect = $.wcpTourCoordinatesForHighlightRect(0);

        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        $('#wcp-tour-highlight-rect-1').css({
            left: 0,
            top: 0,
            width: '100%',
            height: rect.y + rect.height/2
        });
        $('#wcp-tour-highlight-rect-2').css({
            left: rect.x + rect.width/2,
            top: rect.y + rect.height/2,
            width: windowWidth - rect.x - rect.width/2,
            height: 0
        });
        $('#wcp-tour-highlight-rect-3').css({
            left: 0,
            top: rect.y + rect.height/2,
            width: '100%',
            height: windowHeight - rect.y - rect.height/2
        });
        $('#wcp-tour-highlight-rect-4').css({
            left: 0,
            top: rect.y + rect.height/2,
            width: rect.x + rect.width/2,
            height: 0
        });

        setTimeout(function() {
            $('.wcp-tour-highlight-rect').removeClass('wcp-tour-highlight-rect-no-transition');
        }, 50);
    };
    WCPTour.prototype.endTour = function(stepIndex) {
        // Set current step to welcome screen
        localStorage[this.options.name] = 'finished';
        this.currentStep = -1;

        // Send event
        $.wcpTourEventFinished();

        // Fade out root
        this.root.addClass('wcp-tour-hidden');
        var self = this;
        setTimeout(function() {
            self.root.remove();
            $('body').removeClass('wcp-tour-active');
        }, 330);
    };

    WCPTour.prototype.updateNav = function() {
        // does the number of circles need to be updated?
        while (parseInt(this.currentStep, 10) > this.reachedStep) {
            // this.reachedStep = parseInt(this.currentStep, 10);
            this.reachedStep++;

            // Add a new circle
            var html = '<div class="wcp-tour-step-circle" data-wcp-tour-circle-index="'+ this.reachedStep +'"><div class="wcp-tour-step-circle-inner">'+ (this.reachedStep + 1) +'</div></div>';
            this.root.find('.wcp-tour-step-nav').append(html);

            // Present the circle
            var self = this;
            setTimeout(presentCircle.bind(null, this.reachedStep), 10);
        }

        function presentCircle(index) {
            $('.wcp-tour-step-circle[data-wcp-tour-circle-index="'+ index +'"]').addClass('wcp-tour-circle-presented');
        }

        // set the currently active circle
        $('.wcp-tour-step-circle').removeClass('wcp-tour-circle-active');
        $('.wcp-tour-step-circle[data-wcp-tour-circle-index="'+ parseInt(this.currentStep, 10) +'"]').addClass('wcp-tour-circle-active');
    };
    WCPTour.prototype.updateStep = function() {
        this.root.find('.wcp-tour-step-title').html(this.options.steps[this.currentStep].title);
        this.root.find('.wcp-tour-step-text').html(this.options.steps[this.currentStep].text);
    };
    WCPTour.prototype.updateTip = function() {
        if (this.root.find('.wcp-tour-tip[data-wcp-tip-index='+ parseInt(this.currentStep, 10) +']').length == 0) {
            // Add HTML
            var html = '';

            html += '   <div class="wcp-tour-tip" data-wcp-tip-index="'+ parseInt(this.currentStep, 10) +'">';

            if (this.options.steps[this.currentStep].tip.position == 'bottom-left' || this.options.steps[this.currentStep].tip.position == 'bottom-right') {
                html += '       <div class="wcp-tour-tip-arrow"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAADTCAYAAABKv9f/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDQ0OUMxRjMxREE5MTFFNkIxNDlGNTZEN0E0QkIzQkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDQ0OUMxRjQxREE5MTFFNkIxNDlGNTZEN0E0QkIzQkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNDQ5QzFGMTFEQTkxMUU2QjE0OUY1NkQ3QTRCQjNCRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNDQ5QzFGMjFEQTkxMUU2QjE0OUY1NkQ3QTRCQjNCRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvBYhb8AAAxKSURBVHja7J15dFXVFcZPBhpCVMYoSLWggoBKmyjiUJXBgcG21tah2tF21dVWsdS2/9jVyipW/9GuWHWxSieg0uLQ1laFEhkFIbVIEEiEVghiVQg1GIGQSPK6d+9O+7i5956XlzfcffJ9a31L4Bxfbs7v7TOfcwsSiYRxXCXk08XDyCeTB5NPJPcj9yE/SH7VxV++2KHf5UPkceQK8rnkc8hjBGyB5f/9HQDHB+Ip5L3kU8mXiicK2BIDqQXMIBdINbufPAL4dAEuJ/9Q/jyLPJA8iTyVfJ1EbKfSgcudjX3kt8mN5IPkw+Q28huuAi6IQSerrwD9gfydOz5vpth2BukYuY5cS95Krif/g9wgMHuV8gW4UDpAd5I/Ty5LE6aRqFxHfom8QcC2oHLuWkUXSDVm0+ckMvYIqGLp3LBLySfIEGSQDEnOIB8hbyafT55AvkjypKN3yKvEayQ6E0BpB3wP+Uzy++Q/C8C3pJ3q1GzyQym0dW1SVXaOQ3vS1nNbuZq8krxCqlwA7WYVPZy8U9o/v46Sm2RCYAj5APldaTs5/0kyfMmUWsnryS+QqyXy24GqZ4B5+PHFPD0DR/rfkqL0JbShmQVcSf/dlMOfyVVujYB8Uf58BCiyB5ir1+/JGDSTVW1ChiZ10imrlS/S62hD8zNM4vnbx8njA/J1CJimpN52m0Tee9Im75dJBJ402E3eJe03FKNxMEfwXInoID1MvjuphwwpneiYTl5kvGU1v5aSbyY3o/j0AmbxVOEfZHLCr23kmcbhOVxXVBiRxvA+LkMov7i93kiuRBHqBdw5yfEV8ncCer68bMdThVehGHVW0X5xlfx74801J+sD8peMtysCUhbByXpOqux/+f6dpzAXG2/JD1IMmLXFeNtjtgakVZHnmPSX/aA8V9HJ6k9+nnxJQNoj5LuMNzkCKQXM4mVAnq06NSBtIfmrJr0JEW7jefsOr1QdMt4GO3xZ8gC4M5LrpUft19PkW4x9m8wwqQk+KR7gS+dp0GVSY/B//w1suQPcCWiHCd6h8Sz5BpP6nDR/xpXkacabTTvNl86RXCOwudO3GQizD5h1ofGW/4oC0paTP23SWxLk7T2fEZ8VkM67Tp4S1xisUmUNsJGx8G+kkP09ad4/9Qlz/Paf7mp8EuxzAtL3SrPwpPE23wG2yfyuSt6v9e3Oz/al8azXtdJx6qkY9pfJtxpvY59fPM26QL5wuwA4cyqW9vFS6WX7q+x10rYeyuDPmy61B9cQ/g0L/MutJf9aqvHDANxz8YmEjdJhKjddd1Qy5BnG272ZSfE2Xd5Xdofxdof6xV+qJeSfyYQNAPdAo6XTw1XlWONNZybrRYm8bERUoXyBZkmPPGhmjZsLnnnj7cFu79hkwFnyFPIH5GXktkRXrSL3y+LPZ48hP0o+lAjWbvJ3yQOy/Bx5c7Z/wNelIH8ZAnk5uW8OftFy8gPk90NAN5N/Qh4MwN33Q+QO8n0S0X49xzs7c/QLDxaQzb0FdC5+SBH5GfJh8vfJxwIK9mlycQ5/8UHkH0dU3Rzp90s+AE7BJ5A3kd8m30FuDyjUxfJlyGUBDCcvlBomSO+S78rxl08lYPYwcgN5O/mbIQU6n1yYh4KYQF6XCFc9eQYA2z2O3EReTb4zpDB/Si7IU4HcRH4jAvRS8lgAjvYV5FbyEhmiBGlOHgvlRPK8iGqbRwM/IvcB4HDfIAX4MPnekIKcnefCmUx+PSKaa8kVABzuWVJQ95AfDCnE2/JcQGXkqpBOYUKGfXNzOMxTBdhI4bBuJ/8ioAC5YK+PQUFNlhFAmLZJ/wKAfS5Iau9uJj8VUHitMu2Z72cdKtOrYeJx/hcAOHgiZIl0Xj4l05dBEw8TYvKs90V0wDqHen0B+HhzG/Ys+Sj5WnJNQME1kkfH5HmnkQ9YOmCjAPh487e+Wqq6mTK54FeDTJjE4Xn5y7YrAnKTDAkBOMm8fLhSquTrQiYdtpD7x+R5TyG/HAH5qEyeALAP8gqBfKvMBwetJZfE5HnLZEUsTB0yoQPAPshLpbrmyf6WgIJ7Ik/z1mGdr/mJaFXl43njPAtTIhBbZY22PWTeOk7PPM8CeUGuIcd9LpUj4xGB+9uQQrs7Rs/L4/pfWSDPz+ViioYVkQKppttDhk8JmduOy/NyhC6yQH4sV88Th/uiUxXvkFwse539m935fku+OHx9TJ6V94PznWM3ReSpSjokkDUVKtoAypeTnif7qv1bXUtkC+yomDwrPx/fg10dkYfPUM/Vui8627rGePeF+I+a/tN4d1HH5YjpADkEcLblTNdCAO4qPlrKt9QO9f374xI9cdEoOQQwMCSdz09PyVbzUmj0ik8TzpT2N/lYzOyYPSffSP9ZE37bAZ+n+qPJ0ltkNANmvWK8A+YJOWDGHbHGGD7nSjkzFSY+w/UXk/5rDpysopN1vsCO+y/DzcctEel8tvlGANYrvtOk1lId3ya1EQArFZ+dXmOCr7tg8THXChkR9Po2WKO4t3x/RDpfI8UTOsUArFdzZHwcpgmSB1W0YvHBeL5poE9IOl8ZdbGM9RHBCsUXyFVZ2DzaU0aI4PyK29vXjPdisjB9gzwPgPWK338Rddc2X+XIc9kHUEXrFC+arIpI59uDHkAE69Y48qsRY+OEdLhqEME6VSeRHBqIJs21Y0RwfDRaQBdF5LnceHeMIYIVaqexv9jkXkSw+1E8yXhz2YhgpVG82JJnDiJYfxS/ZqLfXjPZeC/URgQrjeJqS56U31EFwPHUY5Z0fnnJhwFYr/hlJnsj0rkTdjsA6xVvnP+5Jc/XTPhSIwAr0HzjvfgzTLwf/HoA1qt9xntBd5S+BcC6tciSfhl5JADrFQ+XDlry3AjAesXnlp4BYLf1hCW90gS/9g+AFVXTTelGMQDHXzxU+hMAu60nLekfNd4iBQAr1Wpz/DnoIE0DYL1qMd77maM0FYB1a4UlfZIJ2AkCwO4APol8AQDr1cvk9yx5rgRgveIlRNtmu6kA7HY1fQm5FID1yhbBfOPfRADWq7oUxsMVAKxXPG253ZKnEoB16xVEsNvabEkfk9zRAmD3APNs1nkArFd8M09Hqu0wAOvTEfKOVNthANapnZb00QCsWw2W9JEArFu7Lel8MK0YgN2NYO5JnwbA7gJmjQBgd6vo/7XDAKxTzca+VxqAlWuPJf10ANYt28u/BgOwbtmq6IEADMAQAEMADOUFMG/AKwVgdwGzBgGwXh1KIU8ZAOtVewp5igAYgCEAhgAYyrg6ABgRXAjAqKKhmKokhTxtAKxXpSnkOQLAetUvhTwtAOw2YEQwAEMADMWyk8XXPbQDsF6VWdL/u5wIwHpVbklvBGDdOhmAe3cE7wdgRDCENhjKh/j0/kBU0W5HbwEi2F0NSyHPWwCsVyNSyLMHgN0FzLs93gRgvfqIJZ3hHgNgdyO4ofMPAOxmBO8BYEQwFFP1FwOwozo7hTw7AFivxqWQpx6A9WqsJX2fSTr9D8DuAa5L/gsAuwe4HoD1is8jjQRgt3vQRQDcu3vQ2wFYryos6e+IAdhRwF3eigbAuvQxAHZX/KqccgDuvdUzADsOmF/UsQuA3QVcS04AsF5dYEn/e9A/ArAODZdOVpQ2ArBeXZxCHgBWrIss6XyKYS8Auwt4Y1gCAMdffJKw0pJnAwDrFU9PliKCe2/1zNclbQJgvbrMks5wWwDYXcBroxIBON46y9gPewOwYl1uSef3NqwHYHcBbyUfBGB3Aa+1fQAAx1e8wDASgN3VFZb0BADr1lRL+jYjl50BsJuAV6byIQAcT51p7PdwrABgvZpiSed7sNYAsLvVM++/agZgneJLRidnonoG4HjqXGO/7BuAFesqSzovDa4HYL262pLOkxutAKxTfEWDbf55eXc+EIDjJV7cLwXg3ls98/7nbQDsLuDq7n4gAMdHPDQan8nqGYDjF71Rb1JJIIJ1a7olnbfHNgKwTnHk2iY4lqXzwQAcD/HhbtsFK0sB2N3qma8HrgFgvZpmSX/BeGvAAKxQ/JLJC7NRPQNwPMSdK9sNsn8FYL2aYUnfYuRFkwCsc3h0jSXP8z35AQCcX/HlZkOz1f4CcPyrZz5YtgGA3R3/8tzzMQDWqUHkidmsnlnFKOe8abwMf/qShxjvJP8Q8/8VpUQmABckEgkUdXzUx3jrwgPIh03SSybT1X8EGABF4u6wyXDEhgAAAABJRU5ErkJggg=="></div>';
                html += '       <div class="wcp-tour-clear"></div>';
            }

            html += '       <div class="wcp-tour-tip-media-button"></div>';
            html += '       <div class="wcp-tour-tip-title-wrap">';
            html += '           <div class="wcp-tour-tip-title"></div>';
            html += '           <div class="wcp-tour-tip-subtitle"></div>';
            html += '       </div>';

            if (this.options.steps[this.currentStep].tip.position == 'top-left' || this.options.steps[this.currentStep].tip.position == 'top-right') {
                html += '       <div class="wcp-tour-clear"></div>';
                html += '       <div class="wcp-tour-tip-arrow"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAADTCAYAAABKv9f/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDQ0OUMxRjMxREE5MTFFNkIxNDlGNTZEN0E0QkIzQkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDQ0OUMxRjQxREE5MTFFNkIxNDlGNTZEN0E0QkIzQkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNDQ5QzFGMTFEQTkxMUU2QjE0OUY1NkQ3QTRCQjNCRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNDQ5QzFGMjFEQTkxMUU2QjE0OUY1NkQ3QTRCQjNCRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvBYhb8AAAxKSURBVHja7J15dFXVFcZPBhpCVMYoSLWggoBKmyjiUJXBgcG21tah2tF21dVWsdS2/9jVyipW/9GuWHWxSieg0uLQ1laFEhkFIbVIEEiEVghiVQg1GIGQSPK6d+9O+7i5956XlzfcffJ9a31L4Bxfbs7v7TOfcwsSiYRxXCXk08XDyCeTB5NPJPcj9yE/SH7VxV++2KHf5UPkceQK8rnkc8hjBGyB5f/9HQDHB+Ip5L3kU8mXiicK2BIDqQXMIBdINbufPAL4dAEuJ/9Q/jyLPJA8iTyVfJ1EbKfSgcudjX3kt8mN5IPkw+Q28huuAi6IQSerrwD9gfydOz5vpth2BukYuY5cS95Krif/g9wgMHuV8gW4UDpAd5I/Ty5LE6aRqFxHfom8QcC2oHLuWkUXSDVm0+ckMvYIqGLp3LBLySfIEGSQDEnOIB8hbyafT55AvkjypKN3yKvEayQ6E0BpB3wP+Uzy++Q/C8C3pJ3q1GzyQym0dW1SVXaOQ3vS1nNbuZq8krxCqlwA7WYVPZy8U9o/v46Sm2RCYAj5APldaTs5/0kyfMmUWsnryS+QqyXy24GqZ4B5+PHFPD0DR/rfkqL0JbShmQVcSf/dlMOfyVVujYB8Uf58BCiyB5ir1+/JGDSTVW1ChiZ10imrlS/S62hD8zNM4vnbx8njA/J1CJimpN52m0Tee9Im75dJBJ402E3eJe03FKNxMEfwXInoID1MvjuphwwpneiYTl5kvGU1v5aSbyY3o/j0AmbxVOEfZHLCr23kmcbhOVxXVBiRxvA+LkMov7i93kiuRBHqBdw5yfEV8ncCer68bMdThVehGHVW0X5xlfx74801J+sD8peMtysCUhbByXpOqux/+f6dpzAXG2/JD1IMmLXFeNtjtgakVZHnmPSX/aA8V9HJ6k9+nnxJQNoj5LuMNzkCKQXM4mVAnq06NSBtIfmrJr0JEW7jefsOr1QdMt4GO3xZ8gC4M5LrpUft19PkW4x9m8wwqQk+KR7gS+dp0GVSY/B//w1suQPcCWiHCd6h8Sz5BpP6nDR/xpXkacabTTvNl86RXCOwudO3GQizD5h1ofGW/4oC0paTP23SWxLk7T2fEZ8VkM67Tp4S1xisUmUNsJGx8G+kkP09ad4/9Qlz/Paf7mp8EuxzAtL3SrPwpPE23wG2yfyuSt6v9e3Oz/al8azXtdJx6qkY9pfJtxpvY59fPM26QL5wuwA4cyqW9vFS6WX7q+x10rYeyuDPmy61B9cQ/g0L/MutJf9aqvHDANxz8YmEjdJhKjddd1Qy5BnG272ZSfE2Xd5Xdofxdof6xV+qJeSfyYQNAPdAo6XTw1XlWONNZybrRYm8bERUoXyBZkmPPGhmjZsLnnnj7cFu79hkwFnyFPIH5GXktkRXrSL3y+LPZ48hP0o+lAjWbvJ3yQOy/Bx5c7Z/wNelIH8ZAnk5uW8OftFy8gPk90NAN5N/Qh4MwN33Q+QO8n0S0X49xzs7c/QLDxaQzb0FdC5+SBH5GfJh8vfJxwIK9mlycQ5/8UHkH0dU3Rzp90s+AE7BJ5A3kd8m30FuDyjUxfJlyGUBDCcvlBomSO+S78rxl08lYPYwcgN5O/mbIQU6n1yYh4KYQF6XCFc9eQYA2z2O3EReTb4zpDB/Si7IU4HcRH4jAvRS8lgAjvYV5FbyEhmiBGlOHgvlRPK8iGqbRwM/IvcB4HDfIAX4MPnekIKcnefCmUx+PSKaa8kVABzuWVJQ95AfDCnE2/JcQGXkqpBOYUKGfXNzOMxTBdhI4bBuJ/8ioAC5YK+PQUFNlhFAmLZJ/wKAfS5Iau9uJj8VUHitMu2Z72cdKtOrYeJx/hcAOHgiZIl0Xj4l05dBEw8TYvKs90V0wDqHen0B+HhzG/Ys+Sj5WnJNQME1kkfH5HmnkQ9YOmCjAPh487e+Wqq6mTK54FeDTJjE4Xn5y7YrAnKTDAkBOMm8fLhSquTrQiYdtpD7x+R5TyG/HAH5qEyeALAP8gqBfKvMBwetJZfE5HnLZEUsTB0yoQPAPshLpbrmyf6WgIJ7Ik/z1mGdr/mJaFXl43njPAtTIhBbZY22PWTeOk7PPM8CeUGuIcd9LpUj4xGB+9uQQrs7Rs/L4/pfWSDPz+ViioYVkQKppttDhk8JmduOy/NyhC6yQH4sV88Th/uiUxXvkFwse539m935fku+OHx9TJ6V94PznWM3ReSpSjokkDUVKtoAypeTnif7qv1bXUtkC+yomDwrPx/fg10dkYfPUM/Vui8627rGePeF+I+a/tN4d1HH5YjpADkEcLblTNdCAO4qPlrKt9QO9f374xI9cdEoOQQwMCSdz09PyVbzUmj0ik8TzpT2N/lYzOyYPSffSP9ZE37bAZ+n+qPJ0ltkNANmvWK8A+YJOWDGHbHGGD7nSjkzFSY+w/UXk/5rDpysopN1vsCO+y/DzcctEel8tvlGANYrvtOk1lId3ya1EQArFZ+dXmOCr7tg8THXChkR9Po2WKO4t3x/RDpfI8UTOsUArFdzZHwcpgmSB1W0YvHBeL5poE9IOl8ZdbGM9RHBCsUXyFVZ2DzaU0aI4PyK29vXjPdisjB9gzwPgPWK338Rddc2X+XIc9kHUEXrFC+arIpI59uDHkAE69Y48qsRY+OEdLhqEME6VSeRHBqIJs21Y0RwfDRaQBdF5LnceHeMIYIVaqexv9jkXkSw+1E8yXhz2YhgpVG82JJnDiJYfxS/ZqLfXjPZeC/URgQrjeJqS56U31EFwPHUY5Z0fnnJhwFYr/hlJnsj0rkTdjsA6xVvnP+5Jc/XTPhSIwAr0HzjvfgzTLwf/HoA1qt9xntBd5S+BcC6tciSfhl5JADrFQ+XDlry3AjAesXnlp4BYLf1hCW90gS/9g+AFVXTTelGMQDHXzxU+hMAu60nLekfNd4iBQAr1Wpz/DnoIE0DYL1qMd77maM0FYB1a4UlfZIJ2AkCwO4APol8AQDr1cvk9yx5rgRgveIlRNtmu6kA7HY1fQm5FID1yhbBfOPfRADWq7oUxsMVAKxXPG253ZKnEoB16xVEsNvabEkfk9zRAmD3APNs1nkArFd8M09Hqu0wAOvTEfKOVNthANapnZb00QCsWw2W9JEArFu7Lel8MK0YgN2NYO5JnwbA7gJmjQBgd6vo/7XDAKxTzca+VxqAlWuPJf10ANYt28u/BgOwbtmq6IEADMAQAEMADOUFMG/AKwVgdwGzBgGwXh1KIU8ZAOtVewp5igAYgCEAhgAYyrg6ABgRXAjAqKKhmKokhTxtAKxXpSnkOQLAetUvhTwtAOw2YEQwAEMADMWyk8XXPbQDsF6VWdL/u5wIwHpVbklvBGDdOhmAe3cE7wdgRDCENhjKh/j0/kBU0W5HbwEi2F0NSyHPWwCsVyNSyLMHgN0FzLs93gRgvfqIJZ3hHgNgdyO4ofMPAOxmBO8BYEQwFFP1FwOwozo7hTw7AFivxqWQpx6A9WqsJX2fSTr9D8DuAa5L/gsAuwe4HoD1is8jjQRgt3vQRQDcu3vQ2wFYryos6e+IAdhRwF3eigbAuvQxAHZX/KqccgDuvdUzADsOmF/UsQuA3QVcS04AsF5dYEn/e9A/ArAODZdOVpQ2ArBeXZxCHgBWrIss6XyKYS8Auwt4Y1gCAMdffJKw0pJnAwDrFU9PliKCe2/1zNclbQJgvbrMks5wWwDYXcBroxIBON46y9gPewOwYl1uSef3NqwHYHcBbyUfBGB3Aa+1fQAAx1e8wDASgN3VFZb0BADr1lRL+jYjl50BsJuAV6byIQAcT51p7PdwrABgvZpiSed7sNYAsLvVM++/agZgneJLRidnonoG4HjqXGO/7BuAFesqSzovDa4HYL262pLOkxutAKxTfEWDbf55eXc+EIDjJV7cLwXg3ls98/7nbQDsLuDq7n4gAMdHPDQan8nqGYDjF71Rb1JJIIJ1a7olnbfHNgKwTnHk2iY4lqXzwQAcD/HhbtsFK0sB2N3qma8HrgFgvZpmSX/BeGvAAKxQ/JLJC7NRPQNwPMSdK9sNsn8FYL2aYUnfYuRFkwCsc3h0jSXP8z35AQCcX/HlZkOz1f4CcPyrZz5YtgGA3R3/8tzzMQDWqUHkidmsnlnFKOe8abwMf/qShxjvJP8Q8/8VpUQmABckEgkUdXzUx3jrwgPIh03SSybT1X8EGABF4u6wyXDEhgAAAABJRU5ErkJggg=="></div>';
            }

            if (this.options.steps[this.currentStep].tip.media != undefined) {
                html += '       <div class="wcp-tour-tip-media-container">';

                if (this.options.steps[this.currentStep].tip.media.type == 'video') {
                    html += '<video loop>';
                    html += '   <source src="'+ this.options.steps[this.currentStep].tip.media.url_mp4 +'" type="video/mp4">';
                    html += '   <source src="'+ this.options.steps[this.currentStep].tip.media.url_webm +'" type="video/webm">';
                    html += '   <source src="'+ this.options.steps[this.currentStep].tip.media.url_ogv +'" type="video/ogv">';
                    html += '</video>';
                }
                if (this.options.steps[this.currentStep].tip.media.type == 'image') {
                    html += '<img src="'+ this.options.steps[this.currentStep].tip.media.url +'">';
                }
            }

            html += '       </div>';
            html += '   </div>';

            this.root.append(html);
        }

        var tip = this.root.find('.wcp-tour-tip[data-wcp-tip-index='+ parseInt(this.currentStep, 10) +']');

        tip.find('.wcp-tour-tip-title').html(this.options.steps[this.currentStep].tip.title);
        tip.find('.wcp-tour-tip-subtitle').html(this.options.steps[this.currentStep].tip.subtitle);

        // Set media
        if (this.options.steps[this.currentStep].tip.media != undefined) {
            tip.find('.wcp-tour-tip-media-button').show();

            if (this.options.steps[this.currentStep].tip.media.type == 'video') {
                tip.find('.wcp-tour-tip-media-button').html('<i class="fa fa-play" aria-hidden="true"></i>');
            }
            if (this.options.steps[this.currentStep].tip.media.type == 'image') {
                tip.find('.wcp-tour-tip-media-button').html('<i class="fa fa-camera" aria-hidden="true"></i>');
            }
        } else {
            tip.find('.wcp-tour-tip-media-button').hide();
        }

        // Position tip
        var c = this.options.steps[this.currentStep].tip.coordinates;

        if (c == undefined) {
            c = $.wcpTourCoordinatesForTipForStep(parseInt(this.currentStep, 10));
        }

        var x, y;
        if (this.options.steps[this.currentStep].tip.position == 'bottom-right') {
            x = c.x;
            y = c.y;
        }
        if (this.options.steps[this.currentStep].tip.position == 'bottom-left') {
            x = c.x - tip.width();
            y = c.y;
        }
        if (this.options.steps[this.currentStep].tip.position == 'top-right') {
            x = c.x;
            y = c.y - tip.height();
        }
        if (this.options.steps[this.currentStep].tip.position == 'top-left') {
            x = c.x - tip.width();
            y = c.y - tip.height();
        }

        tip.css({
            left: x,
            top: y
        });

        // position arrow
        if (this.options.steps[this.currentStep].tip.position == 'bottom-left') {
            tip.find('.wcp-tour-tip-arrow').css({
                transform: 'scaleX(-1)',
                float: 'right'
            });
        }
        if (this.options.steps[this.currentStep].tip.position == 'bottom-right') {
            tip.find('.wcp-tour-tip-arrow').css({
                transform: 'scaleX(1)',
            });
        }
        if (this.options.steps[this.currentStep].tip.position == 'top-left') {
            tip.find('.wcp-tour-tip-arrow').css({
                transform: 'scale(-1, -1)',
                float: 'right'
            });
        }
        if (this.options.steps[this.currentStep].tip.position == 'top-right') {
            tip.find('.wcp-tour-tip-arrow').css({
                transform: 'scaleY(-1)',
            });
        }

        // Apply extra arrow styles
        if (this.options.steps[this.currentStep].tip.arrowStyle) {
            tip.find('.wcp-tour-tip-arrow').attr('style', tip.find('.wcp-tour-tip-arrow').attr('style') + ' ' + this.options.steps[this.currentStep].tip.arrowStyle);
        }

        // Highlight rect
        this.updateHighlightRect();

        // If this is the first step, blink the media button
        if (this.currentStep == 0 && this.options.steps[this.currentStep].tip.media) {
            setTimeout(function() {
                $('.wcp-tour-tip-media-button').addClass('wcp-tour-tip-media-button-blink');
            }, 1000);
        }

        // Update tip classes
        for (var i=0; i<=parseInt(this.reachedStep, 10); i++) {
            var t = this.root.find('.wcp-tour-tip[data-wcp-tip-index='+ i +']');
            if (i == parseInt(this.currentStep, 10)) {
                t.addClass('wcp-tour-tip-visible');
                var animatedTip = t;
                setTimeout(function() {
                    animatedTip.addClass('wcp-tour-tip-animated');
                }, 10);
            } else {
                t.removeClass('wcp-tour-tip-animated');
                t.removeClass('wcp-tour-tip-visible');
            }
        }
    };
    WCPTour.prototype.updateHighlightRect = function() {
        if (this.currentStep >= 0 && this.options.steps[this.currentStep].tip.highlightRect) {
            var rect = $.wcpTourCoordinatesForHighlightRect(this.currentStep);

            var windowWidth = $(window).width();
            var windowHeight = $(window).height();

            $('#wcp-tour-highlight-rect-1').css({
                left: 0,
                top: 0,
                width: '100%',
                height: rect.y
            });
            $('#wcp-tour-highlight-rect-2').css({
                left: rect.x + rect.width,
                top: rect.y,
                width: windowWidth - rect.x - rect.width,
                height: rect.height
            });
            $('#wcp-tour-highlight-rect-3').css({
                left: 0,
                top: rect.y + rect.height,
                width: '100%',
                height: windowHeight - rect.y - rect.height
            });
            $('#wcp-tour-highlight-rect-4').css({
                left: 0,
                top: rect.y,
                width: rect.x,
                height: rect.height
            });
        } else {
            // Set the initial position of the highlight rects
            $('.wcp-tour-highlight-rect').addClass('wcp-tour-highlight-rect-no-transition');
            var rect = $.wcpTourCoordinatesForHighlightRect(0);

            var windowWidth = $(window).width();
            var windowHeight = $(window).height();

            $('#wcp-tour-highlight-rect-1').css({
                left: 0,
                top: 0,
                width: '100%',
                height: rect.y + rect.height/2
            });
            $('#wcp-tour-highlight-rect-2').css({
                left: rect.x + rect.width/2,
                top: rect.y + rect.height/2,
                width: windowWidth - rect.x - rect.width/2,
                height: 0
            });
            $('#wcp-tour-highlight-rect-3').css({
                left: 0,
                top: rect.y + rect.height/2,
                width: '100%',
                height: windowHeight - rect.y - rect.height/2
            });
            $('#wcp-tour-highlight-rect-4').css({
                left: 0,
                top: rect.y + rect.height/2,
                width: rect.x + rect.width/2,
                height: 0
            });

            setTimeout(function() {
                $('.wcp-tour-highlight-rect').removeClass('wcp-tour-highlight-rect-no-transition');
            }, 50);
        }
    };
    WCPTour.prototype.limitMediaContainer = function(container) {
        var dx = 0, dy = 0;

        container.css({ transform: 'translate('+ dx +'px, '+ dy +'px)' });

        if (container.offset().left < 0) {
            dx = container.offset().left;
        }
        if (container.offset().left + container.width() > $(window).width()) {
            dx = $(window).width() - (container.offset().left + container.width());
        }
        if (container.offset().top < 0) {
            dy = container.offset().left;
        }
        if (container.offset().top + container.height() > $(window).height()) {
            dy = $(window).height() - (container.offset().top + container.height());
        }

        container.css({ transform: 'translate('+ dx +'px, '+ dy +'px)' });
    }
})(jQuery, window, document);


;(function ( $, window, document, undefined) {
    // Register Forms
    $.wcpEditorCreateForm({
        name: 'Image Map Settings',
        controlGroups: [
            {
                groupName: 'general',
                groupTitle: 'General',
                groupIcon: 'fa fa-cog',
                controls: [
                    {
                        type: 'text',
                        name: 'image_map_name',
                        title: 'Image Map Name',
                        value: $.imageMapProDefaultSettings.general.name
                    },
                    {
                        type: 'int',
                        name: 'image_map_width',
                        title: 'Width',
                        value: $.imageMapProDefaultSettings.general.width
                    },
                    {
                        type: 'int',
                        name: 'image_map_height',
                        title: 'Height',
                        value: $.imageMapProDefaultSettings.general.height
                    },
                    {
                        type: 'switch',
                        name: 'responsive',
                        title: 'Responsive',
                        value: $.imageMapProDefaultSettings.general.responsive,
                    },
                    {
                        type: 'switch',
                        name: 'sticky_tooltips',
                        title: 'Sticky Tooltips',
                        value: $.imageMapProDefaultSettings.general.sticky_tooltips,
                    },
                    {
                        type: 'switch',
                        name: 'constrain_tooltips',
                        title: 'Constrain Tooltips',
                        value: $.imageMapProDefaultSettings.general.constrain_tooltips,
                    },
                    {
                        type: 'select',
                        name: 'tooltip_animation',
                        title: 'Tooltip Animation',
                        options: [
                            { value: 'none', title: 'None' },
                            { value: 'grow', title: 'Grow' },
                            { value: 'fade', title: 'Fade' },
                        ],
                        value: $.imageMapProDefaultSettings.general.tooltip_animation
                    },
                    {
                        type: 'select',
                        name: 'pageload_animation',
                        title: 'Page Load Animation',
                        options: [
                            { value: 'none', title: 'None' },
                            { value: 'grow', title: 'Grow' },
                            { value: 'fade', title: 'Fade' },
                        ],
                        value: $.imageMapProDefaultSettings.general.pageload_animation
                    },
                    {
                        type: 'select',
                        name: 'fullscreen_tooltips',
                        title: 'Fullscreen Tooltips',
                        options: [
                            { value: 'none', title: 'None' },
                            { value: 'mobile-only', title: 'Mobile Only' },
                            { value: 'always', title: 'Always' },
                        ],
                        value: $.imageMapProDefaultSettings.general.fullscreen_tooltips
                    },
                    {
                        type: 'switch',
                        name: 'late_initialization',
                        title: 'Late Initialization',
                        value: $.imageMapProDefaultSettings.general.late_initialization,
                    },
                ]
            },
            {
                groupName: 'image',
                groupTitle: 'Image',
                groupIcon: 'fa fa-photo',
                controls: [
                    {
                        type: 'text',
                        name: 'image_url',
                        title: 'Image URL',
                        value: $.imageMapProDefaultSettings.general.image_url
                    },
                ]
            },
        ]
    });
    $.wcpEditorCreateForm({
        name: 'Shape Settings',
        controlGroups: [
            {
                groupName: 'general',
                groupTitle: 'General',
                groupIcon: 'fa fa-cog',
                controls: [
                    {
                        type: 'float',
                        name: 'x',
                        title: 'X',
                        value: $.imageMapProDefaultSpotSettings.x
                    },
                    {
                        type: 'float',
                        name: 'y',
                        title: 'Y',
                        value: $.imageMapProDefaultSpotSettings.y
                    },
                    {
                        type: 'float',
                        name: 'width',
                        title: 'Width',
                        value: $.imageMapProDefaultSpotSettings.width
                    },
                    {
                        type: 'float',
                        name: 'height',
                        title: 'Height',
                        value: $.imageMapProDefaultSpotSettings.height
                    },
                ]
            },
            {
                groupName: 'actions',
                groupTitle: 'Actions',
                groupIcon: 'fa fa-bolt',
                controls: [
                    {
                        type: 'select',
                        name: 'mouseover',
                        title: 'Mouseover Action',
                        options: [
                            { value: 'no-action', title: 'No Action' },
                            { value: 'show-tooltip', title: 'Show Tooltip' },
                        ],
                        value: $.imageMapProDefaultSpotSettings.actions.mouseover
                    },
                    {
                        type: 'select',
                        name: 'click',
                        title: 'Click Action',
                        options: [
                            { value: 'no-action', title: 'No Action' },
                            { value: 'show-tooltip', title: 'Show Tooltip' },
                            { value: 'follow-link', title: 'Follow Link' },
                        ],
                        value: $.imageMapProDefaultSpotSettings.actions.click
                    },
                    {
                        type: 'text',
                        name: 'link',
                        title: 'Link URL',
                        value: $.imageMapProDefaultSpotSettings.actions.link
                    },
                    {
                        type: 'switch',
                        name: 'open_link_in_new_window',
                        title: 'Open Link in New Window',
                        value: $.imageMapProDefaultSpotSettings.actions.open_link_in_new_window
                    },
                ]
            },
            {
                groupName: 'icon',
                groupTitle: 'Icon',
                groupIcon: 'fa fa-map-marker',
                controls: [
                    {
                        type: 'switch',
                        name: 'use_icon',
                        title: 'Use Icon',
                        value: $.imageMapProDefaultSpotSettings.default_style.use_icon
                    },
                    {
                        type: 'button group',
                        name: 'icon_type',
                        title: 'Icon Type',
                        options: [
                            { value: 'library', title: 'Library' },
                            { value: 'custom', title: 'Custom' },
                        ],
                        value: $.imageMapProDefaultSpotSettings.default_style.icon_type
                    },
                    {
                        type: 'button',
                        name: 'choose_icon_from_library',
                        title: 'Choose from Library',
                        options: { event_name: 'button-choose-icon-clicked' },
                        value: undefined
                    },
                    {
                        type: 'text',
                        name: 'icon_svg_path',
                        title: 'Icon SVG Path',
                        value: $.imageMapProDefaultSpotSettings.default_style.icon_svg_path
                    },
                    {
                        type: 'text',
                        name: 'icon_svg_viewbox',
                        title: 'Icon SVG Viewbox',
                        value: $.imageMapProDefaultSpotSettings.default_style.icon_svg_viewbox
                    },
                    {
                        type: 'text',
                        name: 'icon_url',
                        title: 'Icon URL',
                        value: $.imageMapProDefaultSpotSettings.default_style.icon_url
                    },
                    {
                        type: 'switch',
                        name: 'icon_is_pin',
                        title: 'Icon is a Pin',
                        value: $.imageMapProDefaultSpotSettings.default_style.icon_is_pin
                    },
                    {
                        type: 'switch',
                        name: 'icon_shadow',
                        title: 'Icon Shadow',
                        value: $.imageMapProDefaultSpotSettings.default_style.icon_shadow
                    },
                ]
            },
            {
                groupName: 'default_style',
                groupTitle: 'Default Style',
                groupIcon: 'fa fa-paint-brush',
                controls: [
                    {
                        type: 'slider',
                        name: 'opacity',
                        title: 'Opacity',
                        options: { min: 0, max: 1 },
                        value: $.imageMapProDefaultSpotSettings.default_style.opacity
                    },
                    {
                        type: 'color',
                        name: 'icon_fill',
                        title: 'SVG Icon Fill Color',
                        value: $.imageMapProDefaultSpotSettings.default_style.icon_fill
                    },
                    {
                        type: 'int',
                        name: 'border_radius',
                        title: 'Border Radius',
                        value: $.imageMapProDefaultSpotSettings.default_style.border_radius
                    },
                    {
                        type: 'color',
                        name: 'background_color',
                        title: 'Background Color',
                        value: $.imageMapProDefaultSpotSettings.default_style.background_color
                    },
                    {
                        type: 'slider',
                        name: 'background_opacity',
                        title: 'Background Opacity',
                        options: { min: 0, max: 1 },
                        value: $.imageMapProDefaultSpotSettings.default_style.background_opacity
                    },
                    {
                        type: 'slider',
                        name: 'border_width',
                        title: 'Border Width',
                        options: { min: 0, max: 20, type: 'int' },
                        value: $.imageMapProDefaultSpotSettings.default_style.border_width
                    },
                    {
                        type: 'select',
                        name: 'border_style',
                        title: 'Border Style',
                        options: [
                            { value: 'none', title: 'None' },
                            { value: 'hidden', title: 'Hidden' },
                            { value: 'solid', title: 'Solid' },
                            { value: 'dotted', title: 'Dotted' },
                            { value: 'dashed', title: 'Dashed' },
                            { value: 'double', title: 'Double' },
                            { value: 'groove', title: 'Groove' },
                            { value: 'inset', title: 'Inset' },
                            { value: 'outset', title: 'Outset' },
                        ],
                        value: $.imageMapProDefaultSpotSettings.default_style.border_style
                    },
                    {
                        type: 'color',
                        name: 'border_color',
                        title: 'Border Color',
                        value: $.imageMapProDefaultSpotSettings.default_style.border_color
                    },
                    {
                        type: 'slider',
                        name: 'border_opacity',
                        title: 'Border Opacity',
                        options: { min: 0, max: 1 },
                        value: $.imageMapProDefaultSpotSettings.default_style.border_opacity
                    },
                    {
                        type: 'color',
                        name: 'fill',
                        title: 'Fill',
                        value: $.imageMapProDefaultSpotSettings.default_style.fill
                    },
                    {
                        type: 'slider',
                        name: 'fill_opacity',
                        title: 'Fill Opacity',
                        options: { min: 0, max: 1 },
                        value: $.imageMapProDefaultSpotSettings.default_style.fill_opacity
                    },
                    {
                        type: 'color',
                        name: 'stroke_color',
                        title: 'Stroke Color',
                        value: $.imageMapProDefaultSpotSettings.default_style.stroke_color
                    },
                    {
                        type: 'slider',
                        name: 'stroke_opacity',
                        title: 'Stroke Opacity',
                        options: { min: 0, max: 1 },
                        value: $.imageMapProDefaultSpotSettings.default_style.stroke_opacity
                    },
                    {
                        type: 'slider',
                        name: 'stroke_width',
                        title: 'Stroke Width',
                        options: { min: 0, max: 20, type: 'int' },
                        value: $.imageMapProDefaultSpotSettings.default_style.stroke_width
                    },
                    {
                        type: 'text',
                        name: 'stroke_dasharray',
                        title: 'Stroke Dasharray',
                        value: $.imageMapProDefaultSpotSettings.default_style.stroke_dasharray
                    },
                    {
                        type: 'select',
                        name: 'stroke_linecap',
                        title: 'Stroke Linecap',
                        options: [
                            { value: 'butt', title: 'Butt' },
                            { value: 'round', title: 'Round' },
                            { value: 'square', title: 'Square' },
                        ],
                        value: $.imageMapProDefaultSpotSettings.default_style.stroke_linecap
                    },
                ]
            },
            {
                groupName: 'mouseover_style',
                groupTitle: 'Mouseover Style',
                groupIcon: 'fa fa-paint-brush',
                controls: [
                    {
                        type: 'button',
                        name: 'copy_from_default_styles',
                        title: 'Copy from Default Styles',
                        options: { event_name: 'button-copy-from-default-styles-clicked' },
                        value: undefined
                    },
                    {
                        type: 'slider',
                        name: 'mouseover_opacity',
                        title: 'Opacity',
                        options: { min: 0, max: 1 },
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.opacity
                    },
                    {
                        type: 'color',
                        name: 'mouseover_icon_fill',
                        title: 'SVG Icon Fill Color',
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.icon_fill
                    },
                    {
                        type: 'int',
                        name: 'mouseover_border_radius',
                        title: 'Border Radius',
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.border_radius
                    },
                    {
                        type: 'color',
                        name: 'mouseover_background_color',
                        title: 'Background Color',
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.background_color
                    },
                    {
                        type: 'slider',
                        name: 'mouseover_background_opacity',
                        title: 'Background Opacity',
                        options: { min: 0, max: 1 },
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.background_opacity
                    },
                    {
                        type: 'slider',
                        name: 'mouseover_border_width',
                        title: 'Border Width',
                        options: { min: 0, max: 20, type: 'int' },
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.border_width
                    },
                    {
                        type: 'select',
                        name: 'mouseover_border_style',
                        title: 'Border Style',
                        options: [
                            { value: 'none', title: 'None' },
                            { value: 'hidden', title: 'Hidden' },
                            { value: 'solid', title: 'Solid' },
                            { value: 'dotted', title: 'Dotted' },
                            { value: 'dashed', title: 'Dashed' },
                            { value: 'double', title: 'Double' },
                            { value: 'groove', title: 'Groove' },
                            { value: 'inset', title: 'Inset' },
                            { value: 'outset', title: 'Outset' },
                        ],
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.border_style
                    },
                    {
                        type: 'color',
                        name: 'mouseover_border_color',
                        title: 'Border Color',
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.border_color
                    },
                    {
                        type: 'slider',
                        name: 'mouseover_border_opacity',
                        title: 'Border Opacity',
                        options: { min: 0, max: 1 },
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.border_opacity
                    },
                    {
                        type: 'color',
                        name: 'mouseover_fill',
                        title: 'Fill',
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.fill
                    },
                    {
                        type: 'slider',
                        name: 'mouseover_fill_opacity',
                        title: 'Fill Opacity',
                        options: { min: 0, max: 1 },
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.fill_opacity
                    },
                    {
                        type: 'color',
                        name: 'mouseover_stroke_color',
                        title: 'Stroke Color',
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.stroke_color
                    },
                    {
                        type: 'slider',
                        name: 'mouseover_stroke_opacity',
                        title: 'Stroke Opacity',
                        options: { min: 0, max: 1 },
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.stroke_opacity
                    },
                    {
                        type: 'slider',
                        name: 'mouseover_stroke_width',
                        title: 'Stroke Width',
                        options: { min: 0, max: 20, type: 'int' },
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.stroke_width
                    },
                    {
                        type: 'text',
                        name: 'mouseover_stroke_dasharray',
                        title: 'Stroke Dasharray',
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.stroke_dasharray
                    },
                    {
                        type: 'select',
                        name: 'mouseover_stroke_linecap',
                        title: 'Stroke Linecap',
                        options: [
                            { value: 'butt', title: 'Butt' },
                            { value: 'round', title: 'Round' },
                            { value: 'square', title: 'Square' },
                        ],
                        value: $.imageMapProDefaultSpotSettings.mouseover_style.stroke_linecap
                    },
                ]
            },
            {
                groupName: 'tooltip_settings',
                groupTitle: 'Tooltip Settings',
                groupIcon: 'fa fa-comment',
                controls: [
                    {
                        type: 'int',
                        name: 'tooltip_border_radius',
                        title: 'Border Radius',
                        value: $.imageMapProDefaultSpotSettings.tooltip_style.border_radius
                    },
                    {
                        type: 'int',
                        name: 'tooltip_padding',
                        title: 'Padding',
                        value: $.imageMapProDefaultSpotSettings.tooltip_style.padding
                    },
                    {
                        type: 'color',
                        name: 'tooltip_background_color',
                        title: 'Background Color',
                        value: $.imageMapProDefaultSpotSettings.tooltip_style.background_color
                    },
                    {
                        type: 'slider',
                        name: 'tooltip_background_opacity',
                        title: 'Background Opacity',
                        options: { min: 0, max: 1 },
                        value: $.imageMapProDefaultSpotSettings.tooltip_style.background_opacity
                    },
                    {
                        type: 'select',
                        name: 'tooltip_position',
                        title: 'Position',
                        options: [
                            { value: 'top', title: 'Top' },
                            { value: 'bottom', title: 'Bottom' },
                            { value: 'left', title: 'Left' },
                            { value: 'right', title: 'Right' },
                        ],
                        value: $.imageMapProDefaultSpotSettings.tooltip_style.position
                    },
                    {
                        type: 'int',
                        name: 'tooltip_width',
                        title: 'Width',
                        value: $.imageMapProDefaultSpotSettings.tooltip_style.width
                    },
                    {
                        type: 'switch',
                        name: 'tooltip_auto_width',
                        title: 'Auto Width',
                        value: $.imageMapProDefaultSpotSettings.tooltip_style.auto_width
                    },
                ]
            },
            {
                groupName: 'tooltip_content',
                groupTitle: 'Tooltip Content',
                groupIcon: 'fa fa-paragraph',
                controls: [
                    {
                        type: 'button group',
                        name: 'tooltip_content_type',
                        title: 'Tooltip Content',
                        options: [
                            { value: 'plain-text', title: 'Plain Text' },
                            { value: 'content-builder', title: 'Content Builder' },
                        ]
                    },
                    {
                        type: 'textarea',
                        name: 'plain_text',
                        title: 'Tooltip Content',
                        value: $.imageMapProDefaultSpotSettings.tooltip_content.plain_text
                    },
                    {
                        type: 'color',
                        name: 'plain_text_color',
                        title: 'Text Color',
                        value: $.imageMapProDefaultSpotSettings.tooltip_content.plain_text_color
                    },
                    {
                        type: 'textarea',
                        name: 'squares_json',
                        title: 'Squares JSON',
                        value: $.imageMapProDefaultSpotSettings.tooltip_content.content_json
                    },
                    {
                        type: 'textarea',
                        name: 'squares_content',
                        title: 'Squares Content',
                        value: $.imageMapProDefaultSpotSettings.tooltip_content.content_json
                    },
                    {
                        type: 'button',
                        name: 'launch_content_builder',
                        title: 'Launch Content Builder',
                        options: { event_name: 'button-launch-content-builder-clicked' },
                        value: undefined
                    },
                ]
            },
        ]
    });

    // Register Tour
    $.wcpTourRegister({
        name: 'Image Map Pro Editor Tour',
        welcomeScreen: {
            title: 'Welcome!',
            text: 'This is a guided tour to get you started quickly with Image Map Pro.<br>Click the button below to begin!',
            startButtonTitle: 'Take the Tour',
            cancelButtonTitle: 'Or skip this guide',
        },
        steps: [
            {
                title: 'Drawing Shapes',
                text: 'Use the toolbar on the left to draw different kinds of shapes.<br>Choose between Spots/Icons, Ellipses, Rectangles or polygons.',
                tip: {
                    title: 'Toolbar',
                    subtitle: 'Watch Video',
                    media: {
                        type: 'video',
                        url_mp4: 'https://webcraftplugins.com/uploads/image-map-pro/videos/01-drawing-shapes.mp4',
                        url_webm: 'https://webcraftplugins.com/uploads/image-map-pro/videos/01-drawing-shapes.mp4',
                        url_ogv: 'https://webcraftplugins.com/uploads/image-map-pro/videos/01-drawing-shapes.mp4',
                    },
                    position: 'bottom-left',
                    highlightRect: true
                },
            },
            {
                title: 'Customize Your Shapes',
                text: 'Change how the shapes look by selecting a shape <br>and clicking “Shape” on the left, and then “Default Style” or “Mouseover Style”.',
                tip: {
                    title: 'Shape Styles',
                    subtitle: 'Watch Video',
                    media: {
                        type: 'video',
                        url_mp4: 'https://webcraftplugins.com/uploads/image-map-pro/videos/02-customizing-shapes.mp4',
                        url_webm: 'https://webcraftplugins.com/uploads/image-map-pro/videos/02-customizing-shapes.mp4',
                        url_ogv: 'https://webcraftplugins.com/uploads/image-map-pro/videos/02-customizing-shapes.mp4',
                    },
                    position: 'bottom-right',
                    arrowStyle: 'transform: scaleX(-1);',
                    highlightRect: true
                }
            },
            {
                title: 'Edit and Delete Shapes',
                text: 'From the list on the right you can do various things with your shapes, like <br>copy-pasting styles, reordering them, or deleting the shapes.',
                tip: {
                    title: 'Shapes List',
                    subtitle: 'Watch Video',
                    media: {
                        type: 'video',
                        url_mp4: 'https://webcraftplugins.com/uploads/image-map-pro/videos/03-list.mp4',
                        url_webm: 'https://webcraftplugins.com/uploads/image-map-pro/videos/03-list.mp4',
                        url_ogv: 'https://webcraftplugins.com/uploads/image-map-pro/videos/03-list.mp4',
                    },
                    position: 'bottom-left',
                    highlightRect: true
                }
            },
            {
                title: 'Use Icons',
                text: 'To have an icon, place a Spot shape on the image, then open the “Icon” tab on the left to customize it.<br>Choose from 150 built-in SVG icons, or use your own!',
                tip: {
                    title: 'Icon Settings',
                    subtitle: 'Watch Video',
                    media: {
                        type: 'video',
                        url_mp4: 'https://webcraftplugins.com/uploads/image-map-pro/videos/04-icons.mp4',
                        url_webm: 'https://webcraftplugins.com/uploads/image-map-pro/videos/04-icons.mp4',
                        url_ogv: 'https://webcraftplugins.com/uploads/image-map-pro/videos/04-icons.mp4',
                    },
                    position: 'bottom-right',
                    highlightRect: true
                }
            },
            {
                title: 'Tooltip Content Builder',
                text: 'Use a fully featured content builder to add rich content to the tooltips. <br>You can launch the content builder by selecting a shape and opening the "Tooltip Content" settings tab.',
                tip: {
                    title: 'Tooltip Content Settings',
                    subtitle: 'Watch Video',
                    media: {
                        type: 'video',
                        url_mp4: 'https://webcraftplugins.com/uploads/image-map-pro/videos/05-content-builder.mp4',
                        url_webm: 'https://webcraftplugins.com/uploads/image-map-pro/videos/05-content-builder.mp4',
                        url_ogv: 'https://webcraftplugins.com/uploads/image-map-pro/videos/05-content-builder.mp4',
                    },
                    position: 'top-right',
                    highlightRect: true
                }
            },
            {
                title: 'Responsive &amp; Fullscreen Tooltips',
                text: 'Image Map Pro is fully optimized for mobile devices. It\'s responsive, <br>and you even have the option for fullscreen tooltips on mobile. To change these settings, open the "General" settings tab.',
                tip: {
                    title: 'Image Map Settings',
                    subtitle: 'Watch Video',
                    media: {
                        type: 'video',
                        url_mp4: 'https://webcraftplugins.com/uploads/image-map-pro/videos/06-responsive.mp4',
                        url_webm: 'https://webcraftplugins.com/uploads/image-map-pro/videos/06-responsive.mp4',
                        url_ogv: 'https://webcraftplugins.com/uploads/image-map-pro/videos/06-responsive.mp4',
                    },
                    position: 'bottom-right',
                    highlightRect: true
                }
            },
            {
                title: 'Preview Mode',
                text: 'See how your image map will look like by entering Preview Mode. <br>You can continue to tweak settings and see the changes live!',
                tip: {
                    title: 'Preview Mode Button',
                    subtitle: 'Watch Video',
                    media: {
                        type: 'video',
                        url_mp4: 'https://webcraftplugins.com/uploads/image-map-pro/videos/07-preview-mode.mp4',
                        url_webm: 'https://webcraftplugins.com/uploads/image-map-pro/videos/07-preview-mode.mp4',
                        url_ogv: 'https://webcraftplugins.com/uploads/image-map-pro/videos/07-preview-mode.mp4',
                    },
                    position: 'bottom-right',
                    highlightRect: true
                }
            },
            {
                title: 'Save and Load',
                text: 'This editor uses Local Storage to save your work. You can have <br>as many image maps as you want, and switch between them any time. No database needed!',
                tip: {
                    title: 'Save/Load Buttons',
                    subtitle: 'Watch Video',
                    media: {
                        type: 'video',
                        url_mp4: 'https://webcraftplugins.com/uploads/image-map-pro/videos/08-save-load.mp4',
                        url_webm: 'https://webcraftplugins.com/uploads/image-map-pro/videos/08-save-load.mp4',
                        url_ogv: 'https://webcraftplugins.com/uploads/image-map-pro/videos/08-save-load.mp4',
                    },
                    position: 'bottom-right',
                    highlightRect: true
                }
            },
            {
                title: 'Import and Export',
                text: 'You can also import and export your data, <br>in case you need to switch devices, or save your work somewhere else.',
                tip: {
                    title: 'Import/Export Buttons',
                    subtitle: 'Watch Video',
                    media: {
                        type: 'video',
                        url_mp4: 'https://webcraftplugins.com/uploads/image-map-pro/videos/09-import-export.mp4',
                        url_webm: 'https://webcraftplugins.com/uploads/image-map-pro/videos/09-import-export.mp4',
                        url_ogv: 'https://webcraftplugins.com/uploads/image-map-pro/videos/09-import-export.mp4',
                    },
                    position: 'bottom-right',
                    highlightRect: true
                }
            },
            {
                title: 'Easy Installation',
                text: 'When you are ready to add the image map to your site, simply click the <br>"Code" button and follow the instructions.',
                tip: {
                    title: 'Code Button',
                    subtitle: 'Watch Video',
                    media: {
                        type: 'video',
                        url_mp4: 'https://webcraftplugins.com/uploads/image-map-pro/videos/10-install.mp4',
                        url_webm: 'https://webcraftplugins.com/uploads/image-map-pro/videos/10-install.mp4',
                        url_ogv: 'https://webcraftplugins.com/uploads/image-map-pro/videos/10-install.mp4',
                    },
                    position: 'bottom-right',
                    highlightRect: true
                }
            },
        ]
    });

    var WCPEditorSettings = {
        mainTabs: [
            {
                name: 'Image Map',
                icon: 'fa fa-cog',
                title: 'Image Map Settings'
            },
            {
                name: 'Shape',
                icon: 'fa fa-object-ungroup',
                title: 'Selected Shape Settings'
            }
        ],
        toolbarButtons: [
            {
                name: 'spot',
                icon: 'fa fa-map-marker',
                title: 'Icon'
            },
            {
                name: 'oval',
                customIcon: '<div style="width: 14px; height: 14px; border: 2px solid #222; border-radius: 50px;"></div>',
                title: 'Ellipse'
            },
            {
                name: 'rect',
                customIcon: '<div style="width: 20px; height: 14px; border: 2px solid #222; border-radius: 5px;"></div>',
                title: 'Rectangle'
            },
            {
                name: 'poly',
                customIcon: '<svg width="24px" height="24px" viewport="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" style="stroke: black; stroke-width: 2px;" points="20,20 18,4 7,7 4,20"></polygon><ellipse cx="20" cy="20" rx="3" ry="3"></ellipse><ellipse cx="18" cy="4" rx="3" ry="3"></ellipse><ellipse cx="7" cy="7" rx="3" ry="3"></ellipse><ellipse cx="4" cy="20" rx="3" ry="3"></ellipse></svg>',
                title: 'Polygon'
            },
        ],
        extraMainButtons: [
            {
                name: 'code',
                icon: 'fa fa-code',
                title: 'Code'
            },
            {
                name: 'import',
                icon: 'fa fa-arrow-down',
                title: 'Import'
            },
            {
                name: 'export',
                icon: 'fa fa-arrow-up',
                title: 'Export'
            }
        ],
        listItemButtons: [
            {
                name: 'copy',
                icon: 'fa fa-files-o',
                title: 'Copy Style'
            },
            {
                name: 'paste',
                icon: 'fa fa-clipboard',
                title: 'Paste Style'
            },
            {
                name: 'duplicate',
                icon: 'fa fa-clone',
                title: 'Duplicate'
            },
            {
                name: 'delete',
                icon: 'fa fa-trash-o',
                title: 'Delete'
            },
        ],
        newButton: true,
        helpButton: true,
        previewToggle: true
    };

    // Init Editor
    $(document).ready(function() {
        $.image_map_pro_init_editor(undefined, WCPEditorSettings);
    });
})( jQuery, window, document );
