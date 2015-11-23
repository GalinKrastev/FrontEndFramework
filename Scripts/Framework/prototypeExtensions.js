/*
 * Object extenshions
 */
(!Object.prototype.getType && (Object.prototype.getType = function getType(propertyOrFunction, isOwnProperty) {
    if (!propertyOrFunction && propertyOrFunction !== 0) {
        throw new Error([
            "Parameter propertyOrFunction is required ",
            "and cannot be null, undefined or false"
        ]);
    }

    if (this.type) {
        return this.type;
    }

    if (
        isOwnProperty === true &&
        this.prototype[propertyOrFunction]
    ) {
        return;
    }

    return typeof this[propertyOrFunction];
}));

(!Object.prototype.extendWith && (Object.prototype.extendWith = function extend(object) {
    if (typeof object !== "object") {
        throw new Error(["Type of object parameter is not an object."]);
    }

    for (var propName in object) {
        if (
            object.hasOwnProperty(propName) && 
            object[propName] !== null && 
            object[propName] !== undefined
        ) {
            switch (object[propName].constructor) {
                case Number:
                case String:
                case Boolean:
                case Symbol:
                    this[propName] = object[propName];
                    break;

                case Function:
                    this[propName] = object[propName];
                    break;

                default: //object
                    this[propName] = this[propName] ?
                        this[propName].extend(object[propName]) :
                        {}.extend(object[propName]);
                    break;
            }
        }
    }

    if (object.prototype) {
        this.prototype.extend(object.prototype);
    }

    return this;
}));

(!Object.prototype.tryToSetProperties && (Object.prototype.tryToSetProperties = function tryToSetProperties(objWithProps) {
    for (var prop in objWithProps) {
        var addProps = true;
        if (
            objWithProps.hasOwnProperty(prop) &&
            !this[prop] === undefined
        ) {
            addProps = false;
        }
    }

    if (addProps) {
        this.extend(objWithProps);
    }

    return addProps;
}));

(!Object.prototype.toArray && (Object.prototype.toArray = function () {
    var array = [];

    for (var p in this)
        if(this.hasOwnProperty(p))
            array.push(this[p])

    return array;
}));

/*
 * String extensions
 */
(!String.prototype.contains && (String.prototype.contains = function (text) {
    return this.indexOf(text) > -1;
}));

String.prototype.toDashSeparated = function () {
    var letter, newString = [];
    for (var i = 0, len = this.length; i < len; i++) {
        letter = this.charAt(i);
        newString.push(
			letter === letter.toLowerCase() ?
            letter :
				"-" + letter.toLowerCase()
		);
    }

    return newString.join("");
}

String.prototype.toCamelCase = function () {
    var letter, newString = [];

    for (var i = 0, len = this.length; i < len; i++) {
        letter = this.charAt(i);

        if (letter === "-") {
            letter = this.charAt(++i).toUpperCase();
        }

        newString.push(letter);
    }

    return newString.join("");
}