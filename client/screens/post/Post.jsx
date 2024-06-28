import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FooterMenu from "../../components/Menu/FooterMenu";

const Post = () => {
  return (
    <View style={styles.container}>
      <View style={styles.alignStyle}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  alignStyle: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
export default Post;
