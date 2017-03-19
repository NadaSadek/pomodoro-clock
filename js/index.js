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
      _this.setState({ min: minutes, sec: seconds });
    };

    _this.switchSession = function () {
      var that = _this;
      return new Promise(function (resolve, reject) {
        that.state.switch ? that.setState({ min: that.state.breakLength }) : that.setState({ min: that.state.sessionLength });
        resolve("success!!");
      }).then(function () {
        that.setState(function (prevState) {
          return { switch: !prevState.switch };
        });
      }).then(function () {
        that.countDown();
      }).catch(function (e) {
        console.error("switchSession error", e);
      });
    };

    _this.tick = function () {
      var that = _this;
      return new Promise(function (resolve, reject) {
        that.calculateCurrentCounter();
        resolve("done!!");
      }).then(function (res) {
        console.log(res);
        if (that.state.min === 0 && that.state.sec === 0) {
          clearInterval(that.IntervalId);
          that.switchSession();
        }
      }).catch(function (error) {
        console.error('tick error', error);
      });
    };

    _this.countDown = function () {
      _this.IntervalId = setInterval(function () {
        return _this.tick();
      }, 1000);
    };

    _this.toggleTimer = function () {
      console.log("p1: " + _this.state.pause);
      _this.setState(function (prevState) {
        return { pause: !prevState.pause };
      }, function () {
        console.log("p2: " + this.state.pause);
        this.state.pause ? clearInterval(this.IntervalId) : this.countDown();
      });
    };

    _this.increaseBreak = function () {
      if (_this.state.pause) {
        _this.setState(function (prevState) {
          return { breakLength: prevState.breakLength + 1 };
        }, function () {
          !this.state.switch && this.setState({ min: this.state.breakLength });
        });
      }
    };

    _this.decreaseBreak = function () {
      if (_this.state.pause) {
        _this.state.breakLength > 1 && _this.setState(function (prevState) {
          return { breakLength: prevState.breakLength - 1 };
        }, function () {
          !this.state.switch && this.setState({ min: this.state.breakLength, sec: 0 });
        });
      }
    };

    _this.increaseSession = function () {
      console.log("pause: " + _this.state.pause);
      if (_this.state.pause) {
        _this.setState(function (prevState) {
          return { sessionLength: prevState.sessionLength + 1 };
        }, function () {
          this.state.switch && this.setState({ min: this.state.sessionLength, sec: 0 });
        });
      }
    };

    _this.decreaseSession = function () {
      if (_this.state.pause) {
        _this.state.sessionLength > 1 && _this.setState(function (prevState) {
          return { sessionLength: prevState.sessionLength - 1 };
        }, function () {
          this.state.switch && this.setState({ min: this.state.sessionLength });
        });
      }
    };

    _this.state = {
      switch: true, //switch between session (true) and break
      min: 1, //current min
      sec: 0, //current sec
      sessionLength: 1, //length of the session duration in mins
      breakLength: 2, //length of the break duration in mins
      pause: true //pause toggles when user click on the timer
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
        React.createElement("div", { className: "col-md-2" }),
        React.createElement(
          "div",
          { className: "col-md-4" },
          React.createElement(Break, { incBreak: this.increaseBreak, decBreak: this.decreaseBreak, breakLength: this.state.breakLength })
        ),
        React.createElement(
          "div",
          { className: "col-md-4" },
          React.createElement(Session, { incSession: this.increaseSession, decSession: this.decreaseSession, sessionLength: this.state.sessionLength })
        )
      ),
      React.createElement(
        "div",
        null,
        React.createElement(Timer, { changeTimer: this.toggleTimer, minutes: this.state.min, seconds: this.state.sec })
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
        { className: "timerView", onClick: this.props.changeTimer },
        (this.props.minutes < 10 ? "0" + this.props.minutes : this.props.minutes) + ":" + (this.props.seconds < 10 ? "0" + this.props.seconds : this.props.seconds)
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
      null,
      React.createElement(
        "div",
        null,
        "Break Length"
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement("div", { className: "col-md-3" }),
        React.createElement(
          "div",
          { className: "col-md-2 clickable", onClick: this.props.incBreak },
          "+"
        ),
        React.createElement(
          "div",
          { className: "col-md-2" },
          this.props.breakLength
        ),
        React.createElement(
          "div",
          { className: "col-md-2 clickable", onClick: this.props.decBreak },
          "-"
        )
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
        " Session Length "
      ),
      React.createElement(
        "div",
        { className: "row text-center" },
        React.createElement("div", { className: "col-md-3" }),
        React.createElement(
          "div",
          { className: "col-md-2 clickable", onClick: this.props.incSession },
          "+"
        ),
        React.createElement(
          "div",
          { className: "col-md-2" },
          this.props.sessionLength
        ),
        React.createElement(
          "div",
          { className: "col-md-2 clickable", onClick: this.props.decSession },
          "-"
        )
      )
    );
  };

  return Session;
}(React.Component);

ReactDOM.render(React.createElement(Clock, null), document.getElementById('container'));