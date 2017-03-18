"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock(props) {
    _classCallCheck(this, Clock);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.calculateCurrentCounter = function () {
      var currentTimeInMilliSec = _this.state.min * 1000 * 60 + _this.state.sec * 1000;
      var newTimeInMin = (currentTimeInMilliSec - 1000) / (1000 * 60);
      var minutes = Math.floor(newTimeInMin);
      var seconds = Math.round(newTimeInMin % 1 * 60);
      console.log("min " + minutes + " ,secs " + seconds);
      _this.setState({ min: minutes, sec: seconds, timerString: minutes + ":" + (seconds === 0 ? "00" : seconds) });
    };

    _this.switchSession = function () {
      _this.state.switch ? _this.setState({ min: _this.state.breakLength }) : _this.setState({ min: _this.state.sessionLength });
      _this.setState(function (prevState) {
        return { switch: !prevState.switch };
      });
    };

    _this.tick = function () {
      _this.calculateCurrentCounter();
      if (_this.state.min === 0 && _this.state.sec === 0) _this.switchSession();
    };

    _this.countDown = function () {
      _this.IntervalId = setInterval(function () {
        return _this.tick();
      }, 1000);
    };

    _this.toggleTimer = function () {
      console.log(_this.state.pause);
      _this.setState(function (prevState) {
        return { pause: !prevState.pause };
      });
      console.log(_this.state.pause + ", " + _this.state.switch);
      _this.state.pause ? clearInterval(_this.IntervalId) : _this.countDown();
    };

    _this.increaseBreak = function () {
      !_this.state.pause && _this.setState(function (prevState) {
        return { breakLength: prevState.breakLength + 1 };
      });
    };

    _this.decreaseBreak = function () {
      !_this.state.pause && _this.state.breakLength > 0 && _this.setState(function (prevState) {
        return { breakLength: prevState.breakLength - 1 };
      });
    };

    _this.increaseSession = function () {
      !_this.state.pause && _this.setState(function (prevState) {
        return { sessionLength: prevState.sessionLength + 1 };
      });
    };

    _this.decreaseSession = function () {
      !_this.state.pause && _this.state.sessionLength > 0 && _this.setState(function (prevState) {
        return { sessionLength: prevState.sessionLength - 1 };
      });
    };

    _this.state = {
      switch: true,
      timerString: "1:00",
      min: 1,
      sec: 0,
      sessionLength: 1,
      breakLength: 2,
      pause: true
    };
    return _this;
  }

  Clock.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-md-6" },
          React.createElement(Break, { incBreak: this.increaseBreak, decBreak: this.decreaseBreak, breakLength: this.state.breakLength })
        ),
        React.createElement(
          "div",
          { className: "col-md-6" },
          React.createElement(Session, { incSession: this.increaseSession, decBreak: this.decreaseSession, sessionLength: this.state.sessionLength })
        )
      ),
      React.createElement(
        "div",
        null,
        React.createElement(Timer, { changeTimer: this.toggleTimer, timerStr: this.state.timerString })
      )
    );
  };

  return Clock;
}(React.Component);

var Timer = function (_React$Component2) {
  _inherits(Timer, _React$Component2);

  function Timer(props) {
    _classCallCheck(this, Timer);

    return _possibleConstructorReturn(this, _React$Component2.call(this, props));
  }

  Timer.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "TimerView", onClick: this.props.changeTimer },
        this.props.timerStr
      )
    );
  };

  return Timer;
}(React.Component);

var Break = function (_React$Component3) {
  _inherits(Break, _React$Component3);

  function Break(props) {
    _classCallCheck(this, Break);

    return _possibleConstructorReturn(this, _React$Component3.call(this, props));
  }

  Break.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "sessionView" },
      React.createElement(
        "div",
        null,
        "Break Length"
      ),
      React.createElement(
        "div",
        { onClick: this.props.incBreak },
        "+"
      ),
      React.createElement(
        "div",
        null,
        this.props.breakLength
      ),
      React.createElement(
        "div",
        { onClick: this.props.decBreak },
        "-"
      )
    );
  };

  return Break;
}(React.Component);

var Session = function (_React$Component4) {
  _inherits(Session, _React$Component4);

  function Session(props) {
    _classCallCheck(this, Session);

    return _possibleConstructorReturn(this, _React$Component4.call(this, props));
  }

  Session.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        null,
        "Session Length"
      ),
      React.createElement(
        "div",
        { onClick: this.props.incSession },
        "+"
      ),
      React.createElement(
        "div",
        null,
        this.props.sessionLength
      ),
      React.createElement(
        "div",
        { onClick: this.props.decSession },
        "-"
      )
    );
  };

  return Session;
}(React.Component);

ReactDOM.render(React.createElement(Clock, null), document.getElementById('container'));