var framework = window.framework || {}; framework.core = framework.core || {};

/*
 * Static Class containing helper methods
 * for manipulating dom elements
 */
framework.core.domHelper = (function () {
    return {
        attachTemplateTo: function (view, template) {
            if (!view || view.constructor !== String)
                throw new Error(["please provide the name of the view (String)"]);

            if (
                !template ||
                !(
                    template.constructor === DocumentFragment ||
                    template.constructor === String || 
                    template instanceof HTMLElement
                )
            ) throw new Error(["template must be html parsable text or html fragment"]);

            var templateElement,
                viewElement = document.querySelector("[view='" + view + "']");

            if (!viewElement)
                throw new Error(["Specified view: " + view + " was not fount"]);

            if (template.constructor === String) {
                templateElement = document.createDocumentFragment(templete);
            }

            // TODO add attribute for controller + controllerName to it, so it could be fount/located later
            viewElement.appendChild(templateElement || template);
        },

        findController: function (controllerName) {
            if (!controllerName || !controllerName.constructor === String)
                throw new Error(["Wrong type of missing value for parameter controllerName"]);

            // finding a controller by attribute fm-controller, which is will not return it becuase for now the attribute is not set when adding the element to the dom
            var controllerElement = document.querySelector("[fm-controller='" + controllerName + "']");
            
            return controllerElement ? controllerElement :
                (function () {
                    throw new Error(["Requested controller not fount in DOM."]);
                }());
        }
    }
}());