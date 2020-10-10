import React, { useState, useLayoutEffect } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import {
  Text,
  SearchBar,
  ListItem,
  Icon,
  Overlay,
} from "react-native-elements";
import { ActionSheet } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as listActions from "../store/actions/listActions";
import AddListModal from "../components/list/AddListModal";

const ActiveListsScreen = () => {
  const [search, setSearch] = useState();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.lists.activeLists);

  useLayoutEffect(() => {
    navigation.setParams({
      handleOverlay: () => setOverlayVisible(!overlayVisible),
    });
  }, []);

  const actionSheetHandler = (index, id) => {
    switch (index) {
      case 2:
        dispatch(listActions.removeList(id));
    }
  };

  const longPressHandler = (id) => {
    ActionSheet.show(
      {
        options: ["Edit", "Archive", "Delete", "Cancel"],
        cancelButtonIndex: 3,
        destructiveButtonIndex: 2,
        title: "Choose what to do",
      },
      (index) => {
        actionSheetHandler(index, id);
      }
    );
  };

  return (
    <View style={{ flex: 1, alignContent: "center" }}>
      <SearchBar onChangeText={(value) => setSearch(value)} value={search} />
      <ScrollView>
        {list.map(({ name, id }) => (
          <TouchableOpacity
            key={id}
            onLongPress={() => longPressHandler(id)}
            onPress={() =>
              navigation.navigate("listDetails", {
                routeName: name,
              })
            }
          >
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => setOverlayVisible(!overlayVisible)}
      >
        <AddListModal
          toggleOverlay={() => setOverlayVisible(!overlayVisible)}
        />
      </Overlay>
    </View>
  );
};

export default ActiveListsScreen;
