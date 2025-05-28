import AnalogClock from "@/components/AnalogClock.js";
import { View, Text } from "react-native";
import { Colors } from "@/constants/Colors";

export function TheCrown({ imageWidth }) {
  return (
    <>
      <View
        style={{
          zIndex: 9999,
          marginBottom: imageWidth / 2.7,
          marginRight: imageWidth / 700,
        }}
      >
        <AnalogClock
          clockSize={imageWidth / 9}
          clockBorderColor={Colors.light.text}
          clockBorderWidth={0}
          clockCentreSize={imageWidth / 350}
          hourHandColor={Colors.light.text}
          hourHandLength={imageWidth / 30}
          hourHandOffset={-(imageWidth / 90)}
          hourHandWidth={imageWidth / 300}
          minuteHandColor={Colors.light.text}
          minuteHandLength={imageWidth / 20}
          minuteHandOffset={imageWidth / 20}
          minuteHandWidth={imageWidth / 340}
          backgroundColor={"transparent"}
          dotColor={"transparent"}
          hourHandCurved={false}
          minuteHandCurved={false}
          backLength={imageWidth / 150}
          clockCentreColor={"rgb(192, 192, 192)"}
        />
      </View>
    </>
  );
}
