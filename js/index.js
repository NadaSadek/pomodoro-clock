'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock(props) {
    _classCallCheck(this, Clock);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.tick = function () {
      _this.setState(function (prevState) {
        return { timer: prevState.timer - 1000 };
      });
    };

    _this.countDown = function () {
      setInterval(function () {
        return _this.tick();
      }, 1000);
    };

    _this.stopTimer = function () {
      setTimeout(function () {
        return _this.countDown();
      }, _this.state.breakLength);
    };

    _this.toggleTimer = function () {
      _this.setState(function (prevState) {
        return { toggle: !prevState.toggle };
      });
      _this.state.toggle ? _this.countDown() : _this.stopTimer();
    };

    _this.state = {
      toggle: false,
      timer: 25 * 60 * 1000,
      sessionLength: 25,
      breakLength: 5 * 60 * 1000
    };
    return _this;
  }

  Clock.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { onClick: this.toggleTimer.bind(this) },
        this.state.timer
      )
    );
  };

  return Clock;
}(React.Component);

ReactDOM.render(React.createElement(Clock, null), document.getElementById('container'));