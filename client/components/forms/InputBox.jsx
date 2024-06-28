import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const InputBox = ({
  label,
  keyBoardType,
  autoComplete,
  secureTextEntry = false,
  value,
  setValue,
}) => {
  return (
    <View>
      <Text style={{ marginLeft: 20 }}>{label}</Text>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        keyBoardType={keyBoardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    backgroundColor: "#ffffff",
    paddingLeft: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default InputBox;
