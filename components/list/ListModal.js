import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Text, Input, ThemeContext, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import * as listActions from "../../store/actions/listActions";

const ListModal = ({ toggleOverlay, list }) => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState(list ? list.name : undefined);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const listHandler = () => {
    if (!name) {
      setError("Please insert a name");
    } else {
      if (list) {
        dispatch(listActions.editList({ ...list, name }));
        toggleOverlay();
      } else {
        dispatch(listActions.addList(name));
        setName(undefined);
      }
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={theme.ModalTitle}>
        {list ? "EDIT LIST" : "ADD A NEW LIST"}
      </Text>
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
        <Button title="Close" type="outline" onPress={() => toggleOverlay()} />
        <Button title={list ? "Edit" : "Add"} onPress={() => listHandler()} />
      </View>
    </View>
  );
};

export default ListModal;
