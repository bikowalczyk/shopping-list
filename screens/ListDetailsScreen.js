import React, { useLayoutEffect, useState, useContext } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Text,
  ListItem,
  Overlay,
  Input,
  ThemeContext,
  Icon,
} from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { ActionSheet } from "native-base";
import * as itemActions from "../store/actions/itemActions";
import AddItemModal from "../components/Item/AddItemModal";
import { FlatList } from "react-native-gesture-handler";

const ListDetailsScreen = ({ route, navigation }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items).filter(
    (x) => x.list === route.params.listId
  );

  const { theme } = useContext(ThemeContext);

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

  const inputHandler = (val) => {
    // Edit
    dispatch(itemActions.editItem(val));
  };

  return (
    <View
      style={{
        flex: 1,
        marginVertical: 20,
        width: "95%",
        alignItems: "center",
      }}
    >
      <FlatList
        renderItem={({ item, index }) => (
          <View style={theme.ItemList} key={item.id}>
            <ListItem.Title style={theme.ItemListNumber}>
              {index + 1}.
            </ListItem.Title>
            <TouchableOpacity
              style={{ position: "absolute", right: 20, zIndex: 5 }}
            >
              <Icon
                name="done"
                reverse
                color="grey"
                containerStyle={{
                  transform: [{ scale: 0.5 }],
                }}
              />
            </TouchableOpacity>
            <Input
              containerStyle={theme.ItemListInput}
              defaultValue={item.name}
              onEndEditing={(event) =>
                inputHandler({ ...item, name: event.nativeEvent.text })
              }
            />
          </View>
        )}
        data={items}
        ListFooterComponent={() => (
          <View style={theme.ItemList}>
            <ListItem.Title style={theme.ItemListNumber}>
              {items.length + 1}.
            </ListItem.Title>
            <Input containerStyle={theme.ItemListInput} />
          </View>
        )}
      />

      {/* <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => setOverlayVisible(!overlayVisible)}
      >
        <AddItemModal
          toggleOverlay={() => setOverlayVisible(!overlayVisible)}
          listId={route.params.listId}
        />
      </Overlay> */}
    </View>
  );
};

export default ListDetailsScreen;
