import React, { useLayoutEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Text, ListItem, Overlay } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { ActionSheet } from "native-base";
import * as itemActions from "../store/actions/itemActions";
import AddItemModal from "../components/Item/AddItemModal";

const ListDetailsScreen = ({ route, navigation }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items).filter(
    (x) => x.list === route.params.listId
  );

  useLayoutEffect(() => {
    navigation.setParams({
      handleOverlay: () => setOverlayVisible(!overlayVisible),
    });
  }, []);

  const actionSheetHandler = (index, id) => {
    switch (index) {
      case 1:
        dispatch(itemActions.removeItem(id));
    }
  };

  const longPressHandler = (id) => {
    ActionSheet.show(
      {
        options: ["Edit", "Delete", "Cancel"],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
        title: "Choose what to do",
      },
      (index) => {
        actionSheetHandler(index, id);
      }
    );
  };

  return (
    <ScrollView>
      {items.map(({ name, id }) => (
        <TouchableOpacity key={id} onLongPress={() => longPressHandler(id)}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      ))}
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => setOverlayVisible(!overlayVisible)}
      >
        <AddItemModal
          toggleOverlay={() => setOverlayVisible(!overlayVisible)}
          listId={route.params.listId}
        />
      </Overlay>
    </ScrollView>
  );
};

export default ListDetailsScreen;
