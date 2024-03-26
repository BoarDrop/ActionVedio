// RecordItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface RecordItemProps {
  recordDate: string | null;
}

const RecordItem: React.FC<RecordItemProps> = ({ recordDate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.recordContainer}>
        <Text style={styles.dateText}>{recordDate}</Text>
      </View>
      <View style={styles.line}>
        <Svg style={styles.vector} width="320" height="2" viewBox="0 0 320 2" fill="none">
          <Path d="M0 1H320" stroke="#CECCCA" strokeWidth="0.5" />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
  },
  recordContainer: {
    flexShrink: 0,
    width: '100%',
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    columnGap: 75
  },
  dateText: {
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "400",
  },
  timeText: {
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "400",
  },
  line: {
    flexShrink: 0,
    width: '100%',
    paddingVertical: 4
  },
  vector: {
    alignSelf: "stretch",
    overflow: "visible"
  }
});

export default RecordItem;
