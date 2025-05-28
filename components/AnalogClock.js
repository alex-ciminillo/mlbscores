import React, { Component } from "react";
import { View } from "react-native";
import Svg, { G, Path, Circle } from "react-native-svg";

export default class AnalogClock extends Component {
  constructor(props) {
    super(props);
    let d = new Date();
    this.state = {
      sec: d.getSeconds() * 6,
      min: d.getMinutes() * 6,
      hour:
        ((d.getHours() % 12) / 12) * 360 +
        (d.getMinutes() * 6 + (d.getSeconds() * 6) / 60) / 12,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      let d = new Date();
      this.setState({
        sec: d.getSeconds() * 6,
        min: (d.getMinutes() * 6) + (d.getSeconds() * 6) / 60,
        hour:
          ((d.getHours() % 12) / 12) * 360 +
          (d.getMinutes() * 6 + (d.getSeconds() * 6) / 60) / 12,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getHandPath(
    cx,
    cy,
    length,
    baseWidth,
    taperType = "triangle",
    backLength = this.props.backLength
  ) {
    const yStart = cy + backLength;
    const yEnd = cy - length;

    if (taperType === "triangle") {
      return `
      M ${cx - baseWidth / 2} ${yStart}
      L ${cx} ${yEnd}
      L ${cx + baseWidth / 2} ${yStart}
      Z
    `;
    } else {
      const tipWidth = baseWidth / 3;
      return `
      M ${cx - baseWidth / 0.7} ${yStart}
      L ${cx - tipWidth / 0.6} ${yEnd}
      L ${cx + tipWidth / 0.6} ${yEnd}
      L ${cx + baseWidth / 0.7} ${yStart}
      Z
    `;
    }
  }

  dotStyles(angle) {
    const radius = this.props.clockSize / 2 - this.props.clockBorderWidth - 10;
    const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
    const y = radius * Math.sin((angle - 90) * (Math.PI / 180));
    return (
      <Circle
        key={angle}
        cx={this.props.clockSize / 2 + x}
        cy={this.props.clockSize / 2 + y}
        r={4}
        fill={this.props.dotColor}
      />
    );
  }

  renderDots() {
    const dots = [];
    for (let i = 0; i < 12; i++) {
      dots.push(this.dotStyles(i * 30));
    }
    return dots;
  }

  render() {
    const size = this.props.clockSize;
    const center = size / 2;

    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: center,
          borderWidth: this.props.clockBorderWidth,
          borderColor: this.props.clockBorderColor,
          backgroundColor: this.props.backgroundColor,
        }}
      >
        <Svg width={size} height={size}>
          <defs>
            <filter id="dropshadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {this.renderDots()}

          {/* Hour hand */}
          <G rotation={this.state.hour} origin={`${center}, ${center}`}>
            <Path
              d={this.getHandPath(
                center,
                center,
                this.props.hourHandLength,
                this.props.hourHandWidth,
                false
              )}
              fill={this.props.hourHandColor}
              filter="url(#dropshadow)"
            />
          </G>

          {/* Minute hand */}
          <G rotation={this.state.min} origin={`${center}, ${center}`}>
            <Path
              d={this.getHandPath(
                center,
                center,
                this.props.minuteHandLength,
                this.props.minuteHandWidth,
                false
              )}
              fill={this.props.minuteHandColor}
              filter="url(#dropshadow)"
            />
          </G>

          {/* Optional second hand */}
          {/* <G rotation={this.state.sec} origin={`${center}, ${center}`}>
            <Path
              d={this.getHandPath(
                center,
                center,
                this.props.secondHandLength,
                this.props.secondHandWidth,
                false
              )}
              fill={this.props.secondHandColor}
            />
          </G> */}

          {/* Center dot */}
          <Circle
            cx={center}
            cy={center}
            r={this.props.clockCentreSize / 2}
            stroke={this.props.clockCentreColor}
            strokeWidth={2}
            fill="none"
          />
        </Svg>
      </View>
    );
  }
}

AnalogClock.defaultProps = {
  clockSize: 270,
  clockBorderWidth: 7,
  clockBorderColor: "black",
  clockCentreSize: 15,
  clockCentreColor: "black",
  hourHandColor: "black",
  hourHandLength: 70,
  hourHandWidth: 8,
  minuteHandColor: "black",
  minuteHandLength: 100,
  minuteHandWidth: 6,
  secondHandColor: "red",
  secondHandLength: 120,
  secondHandWidth: 2,
  backgroundColor: "white",
  dotColor: "black",
};
