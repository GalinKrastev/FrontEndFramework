var framework = window.framework || {}; framework.core = framework.core || {};

framework.core.Ticker = function (duration, checkInterval, listener, iteratedFunctions) {
    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    var _endsIn = duration || 1000;
    var _checkInterval = checkInterval || 250;
    var _listener = listener;
    var _iteratedFunctions = iteratedFunctions;
    var _isStarted = false;
    var _countDown = duration;
    var _timerId = null;
    var self = this;

    this.start = function () {
        if (!_isStarted) {
            _isStarted = true;

            _timerId = window.setInterval(checkIfTimeEnded, _checkInterval);
        }

        return this;
    };

    this.isStarted = function () {
        return _isStarted;
    };

    this.stop = function () {
        if(_isStarted){
            _isStarted = false;

            if (_timerId) window.clearInterval(_timerId);
        }

        return this;
    };

    this.restart = function () {
        if (_isStarted) this.stop();

        _countDown = _endsIn;

        this.start();

        return this;
    };

    this.endsIn = function () {
        return _countDown;
    };

    this.addIteratedFunction = function (functionToAdd) {
        if (isFunction(functionToAdd)) {
            _iteratedFunctions.push(functionToAdd);
        }

        return this;
    }

    var callListener = function () {
        if (_listener) _listener.call(null);
    };


    var callIteratedFunctions = function () {
        if (_iteratedFunctions) {
            for (var i = 0; i < _iteratedFunctions.length; i++) {
                if (isFunction(_iteratedFunctions[i]))
                    _iteratedFunctions[i].call(null);
            }
        }
    };

    var checkIfTimeEnded = function () {
        callIteratedFunctions();

        if (_countDown > 0) {
            _countDown -= _checkInterval;
        } else {
            this.stop();
            callListener();
        }
    }
};

var ticker =
    new Ticker(
        Number.POSITIVE_INFINITY, // after what time it should stop
        1000, // ticker interval 
        function () { console.log("ticker stopped"); }, // callback
        [ // array of iterated functions to be repeated on ticker interval
            function () { console.log("called iterated function 1") }
        ]
    ).start()