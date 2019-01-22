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

    var actionSheetBox = document.getElementById('actionSheetBox');
    if (!actionSheetBox) {
        actionSheetBox = document.createElement('div');
        actionSheetBox.setAttribute('id', 'actionSheetBox');
        actionSheetContainer.appendChild(actionSheetBox);
    }

    if (!actionSheetContainer.style.display
        || ('none' === actionSheetContainer.style.display)) {
        actionSheetContainer.style.zIndex = '2147483647';
        actionSheetContainer.style.display = 'block';
    }

    if (options) {
        this._clearChildren(actionSheetBox);

        if (options.title) {
            this._addTitle(options.title, actionSheetBox);
        }

        if (!options.destructiveButtonLast && options.addDestructiveButtonWithLabel) {
            var actionSheetButtonContainer = document.getElementById('actionSheetButtonContainer');
            if (!actionSheetButtonContainer) {
                actionSheetButtonContainer = document.createElement('div');
                actionSheetButtonContainer.setAttribute('id', 'actionSheetButtonContainer');
                actionSheetBox.append(actionSheetButtonContainer);
            }
            this._addDestructiveButton(options.addDestructiveButtonWithLabel, actionSheetButtonContainer, 1);
            ActionSheet.prototype._btnOffsetIndex = 2;
        } else {
            ActionSheet.prototype._btnOffsetIndex = 1;
        }

        if (options.buttonLabels) {
            var actionSheetButtonContainer = document.getElementById('actionSheetButtonContainer');
            if (!actionSheetButtonContainer) {
                actionSheetButtonContainer = document.createElement('div');
                actionSheetButtonContainer.setAttribute('id', 'actionSheetButtonContainer');
                actionSheetBox.append(actionSheetButtonContainer);
            }
            this._addbuttons(options.buttonLabels, actionSheetButtonContainer);
        }

        if (options.destructiveButtonLast && options.addDestructiveButtonWithLabel) {    //Generate Desctructive Button
            var actionSheetButtonContainer = document.getElementById('actionSheetButtonContainer');
            if (!actionSheetButtonContainer) {
                actionSheetButtonContainer = document.createElement('div');
                actionSheetButtonContainer.setAttribute('id', 'actionSheetButtonContainer');
                actionSheetBox.append(actionSheetButtonContainer);
            }
            this._addDestructiveButton(options.addDestructiveButtonWithLabel, actionSheetButtonContainer, options.buttonLabels.length + 1);
        }

        if (options.addCancelButtonWithLabel) {
            var actionSheetButtonContainer = document.getElementById('actionSheetButtonContainer');
            if (!actionSheetButtonContainer) {
                actionSheetButtonContainer = document.createElement('div');
                actionSheetButtonContainer.setAttribute('id', 'actionSheetButtonContainer');
                actionSheetBox.append(actionSheetButtonContainer);
            }
            if (options.addDestructiveButtonWithLabel)
                this._addCancelButton(options.addCancelButtonWithLabel, actionSheetButtonContainer, options.buttonLabels.length + 2);
            else
                this._addCancelButton(options.addCancelButtonWithLabel, actionSheetButtonContainer, options.buttonLabels.length + 1);
        }
    }
};

ActionSheet.prototype.hide = function (options, successCallback, errorCallback) {
    var actionSheetContainer = document.getElementById('actionSheetContainer');
    actionSheetContainer.style.zIndex = '-1';
    actionSheetContainer.style.display = 'none';
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
    var actionSheetTitle = document.createElement('p');
    actionSheetTitle.setAttribute('id', 'actionSheetTitle');
    actionSheetTitle.innerHTML = label;
    destination.appendChild(actionSheetTitle);
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

