import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Text, Input, ThemeContext, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import * as itemActions from "../../store/actions/itemActions";

const AddListModal = ({ toggleOverlay, listId }) => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const addNewList = () => {
    if (!name) {
      setError("Please insert a name");
    } else {
      dispatch(itemActions.addItem(name, listId));
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={theme.ModalTitle}>ADD A NEW ITEM</Text>
      <View style={{ marginTop: 15, width: "100%" }}>
        <Input
          placeholder="What do you want to buy?"
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
