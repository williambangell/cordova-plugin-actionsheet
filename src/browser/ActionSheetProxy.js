function ActionSheet() {
}

ActionSheet.prototype.show = function (options, successCallback, errorCallback) {

    if (successCallback) {
        ActionSheet.prototype.successCallBack = successCallback;
    }

    var actionSheetContainer = document.getElementById('actionSheetContainer');
    if (!actionSheetContainer) {
        var body = document.getElementById('allBody');
        actionSheetContainer = document.createElement('div');
        actionSheetContainer.setAttribute('id', 'actionSheetContainer');
        body.appendChild(actionSheetContainer);
    }

    if (actionSheetContainer.hidden) {
        actionSheetContainer.hidden = false;
    }

    if (options) {
        this._clearChildren(actionSheetContainer);

        if (options.title) {
            this._addTitle(options.title, actionSheetContainer);
        }

        if (!options.destructiveButtonLast && options.addDestructiveButtonWithLabel) {
            this._addDestructiveButton(options.addDestructiveButtonWithLabel, actionSheetContainer, 1);
            ActionSheet.prototype._btnOffsetIndex = 2;
        } else {
            ActionSheet.prototype._btnOffsetIndex = 1;
        }

        if (options.buttonLabels) {
            this._addbuttons(options.buttonLabels, actionSheetContainer);
        }

        if (options.destructiveButtonLast && options.addDestructiveButtonWithLabel) {    //Generate Desctructive Button
            this._addDestructiveButton(options.addDestructiveButtonWithLabel, actionSheetContainer, options.buttonLabels.length + 1);
        }

        if (options.addCancelButtonWithLabel) {
            if (options.addDestructiveButtonWithLabel)
                this._addCancelButton(options.addCancelButtonWithLabel, actionSheetContainer, options.buttonLabels.length + 2);
            else
                this._addCancelButton(options.addCancelButtonWithLabel, actionSheetContainer, options.buttonLabels.length + 1);
        }
    }
};

ActionSheet.prototype.hide = function (options, successCallback, errorCallback) {
    var actionSheetContainer = document.getElementById('actionSheetContainer');
    actionSheetContainer.hidden = true;
};

ActionSheet.prototype.install = function () {
    if (!window.plugins) {
        window.plugins = {};
    }
    window.plugins.actionsheet = new ActionSheet();

    return window.plugins.actionsheet;
};

cordova.addConstructor(ActionSheet.prototype.install);
cordova.commandProxy.add('ActionSheet', ActionSheet);

//Helpers
ActionSheet.prototype._addTitle = function (label, destination) {
    var title = document.createElement('h3');
    title.setAttribute('id', 'actionSheetTitle');
    title.innerHTML = label;
    destination.appendChild(title);
};


ActionSheet.prototype._addDestructiveButton = function (label, destination, position) {
    var btn = document.createElement('div');
    btn.setAttribute('value', position);
    btn.setAttribute('class', 'actionSheetButton actionSheetDestructiveButton');
    btn.innerHTML = label;
    btn.onclick = ActionSheet.prototype._onclick;
    destination.appendChild(btn);
};

ActionSheet.prototype._addCancelButton = function (label, destination, position) {
    var btn = document.createElement('div');
    btn.setAttribute('value', position);
    btn.setAttribute('class', 'actionSheetButton actionSheetCancelButton');
    btn.innerHTML = label;
    btn.onclick = ActionSheet.prototype._onclick;
    destination.appendChild(btn);
};

ActionSheet.prototype._addbuttons = function (labels, destination) {
    for (var i = 0; i < labels.length; i++) {
        var btn = document.createElement('div');
        btn.setAttribute('value', i + ActionSheet.prototype._btnOffsetIndex);
        btn.setAttribute('class', 'actionSheetButton actionSheetNormalButton');
        btn.innerHTML = labels[i];
        btn.onclick = ActionSheet.prototype._onclick;
        destination.appendChild(btn);
    }
};

ActionSheet.prototype._onclick = function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    ActionSheet.prototype.hide();
    if (ActionSheet.prototype.successCallBack) {
        ActionSheet.prototype.successCallBack(parseInt(ev.target.value, 10));
    }
};

ActionSheet.prototype._clearChildren = function (element) {
    if (element && element.hasChildNodes) {
        while (element.hasChildNodes()) {
            element.removeChild(element.lastChild);
        }
    }
};

ActionSheet.prototype.ANDROID_THEMES = {
    THEME_TRADITIONAL: 1, // default
    THEME_HOLO_DARK: 2,
    THEME_HOLO_LIGHT: 3,
    THEME_DEVICE_DEFAULT_DARK: 4,
    THEME_DEVICE_DEFAULT_LIGHT: 5
};

