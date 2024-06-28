import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import FooterMenu from "../../components/Menu/FooterMenu";

const About = () => {
  const [state] = useContext(AuthContext);

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
export default About;
