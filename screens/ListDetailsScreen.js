import React, { useState, useContext } from "react";
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
import { FlatList } from "react-native-gesture-handler";

const ListDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items).filter(
    (x) => x.list === route.params.listId
  );

  const { theme } = useContext(ThemeContext);

  const inputHandler = (event, listId, item) => {
    const { text } = event.nativeEvent;

    if (listId && text.length > 0) {
      dispatch(itemActions.addItem(text, listId));
    } else if (text.length > 0) {
      dispatch(
        itemActions.editItem({
          ...item,
          name: text,
        })
      );
    } else if (item) {
      dispatch(itemActions.removeItem(item.id));
    }
  };

  const iconPressHandler = (item) => {
    if (route.name === "archivedListDetails") {
      alert(
        "This list is archived. Please unarchive it first in order to make changes"
      );
    } else {
      dispatch(itemActions.editItem({ ...item, done: !item.done }));
    }
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

            <Input
              disabled={item.done || route.name === "archivedListDetails"}
              containerStyle={theme.ItemListInput}
              inputStyle={
                item.done ? { textDecorationLine: "line-through" } : {}
              }
              defaultValue={item.name}
              onEndEditing={(event) => inputHandler(event, null, item)}
              rightIcon={() => (
                <TouchableOpacity
                  style={{ margin: 3 }}
                  onPress={() => {
                    iconPressHandler(item);
                  }}
                >
                  <Icon
                    name="done"
                    reverse
                    color={
                      item.done ? theme.colors.success : theme.colors.grey3
                    }
                    containerStyle={{
                      transform: [{ scale: 0.5 }],
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        data={items}
        ListFooterComponent={() => (
          <View style={theme.ItemList}>
            <ListItem.Title style={theme.ItemListNumber}>
              {items.length + 1}.
            </ListItem.Title>
            <Input
              placeholder="Type to create a new item!"
              disabled={route.name === "archivedListDetails"}
              containerStyle={theme.ItemListInput}
              onEndEditing={(event) => inputHandler(event, route.params.listId)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ListDetailsScreen;
