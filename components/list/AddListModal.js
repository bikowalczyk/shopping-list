import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Text, Input, ThemeContext, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import * as listActions from "../../store/actions/listActions";

const AddListModal = ({ toggleOverlay }) => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const addNewList = () => {
    if (!name) {
      setError("Please insert a name");
    } else {
      dispatch(listActions.addList(name));
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={theme.ModalTitle}>ADD A NEW LIST</Text>
      <View style={{ marginTop: 15, width: "100%" }}>
        <Input
          placeholder="Name of the list"
          value={name}
          onChangeText={(val) => {
            setName(val);
            error ? setError() : null;
          }}
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
        <Button title="Add" onPress={() => addNewList()} />
      </View>
    </View>
  );
};

export default AddListModal;
