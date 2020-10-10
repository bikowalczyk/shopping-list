import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Text, Input, ThemeContext, Button } from "react-native-elements";

const AddListModal = ({ toggleOverlay }) => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState();
  const [error, setError] = useState();

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={theme.ModalTitle}>ADD A NEW LIST</Text>
      <View style={{ marginTop: 15, width: "100%" }}>
        <Input
          placeholder="Name of the list"
          value={name}
          onChangeText={(val) => setName(val)}
          errorMessage={error}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <Button title="Cancel" type="outline" onPress={() => toggleOverlay()} />
        <Button title="Add" />
      </View>
    </View>
  );
};

export default AddListModal;
