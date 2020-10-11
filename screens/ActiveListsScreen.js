import React, { useState, useLayoutEffect } from "react";
import { ScrollView, View, TouchableOpacity, FlatList } from "react-native";
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
import ListModal from "../components/list/ListModal";

const ActiveListsScreen = () => {
  const [search, setSearch] = useState();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [editOverlayVisible, setEditOverlayVisible] = useState(false);
  const [selectedListId, setSelectedListId] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.lists.activeLists);

  const items = useSelector((state) => state.items.items);

  useLayoutEffect(() => {
    navigation.setParams({
      handleOverlay: () => setOverlayVisible(!overlayVisible),
    });
  }, []);

  const actionSheetHandler = (index, id) => {
    switch (index) {
      case 0:
        setSelectedListId(id);
        setOverlayVisible(!overlayVisible);
        break;
      case 2:
        dispatch(listActions.removeList(id));
        break;
      default:
        return;
    }
  };

  const toggleOverlay = () => {
    setSelectedListId();
    setOverlayVisible(!overlayVisible);
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

  const getBoughtItems = () => {};

  return (
    <View style={{ flex: 1, alignContent: "center" }}>
      <SearchBar onChangeText={(value) => setSearch(value)} value={search} />
      <ScrollView>
        {list
          .filter((x) => (search ? x.name.startsWith(search) : x))
          .map(({ name, id }) => (
            <TouchableOpacity
              key={id}
              onLongPress={() => longPressHandler(id)}
              onPress={() =>
                navigation.navigate("listDetails", {
                  routeName: name,
                  listId: id,
                })
              }
            >
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{name}</ListItem.Title>
                  <View>
                    <Text>2/4</Text>
                  </View>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => toggleOverlay()}
      >
        <ListModal
          toggleOverlay={() => toggleOverlay()}
          list={list.filter((x) => x.id === selectedListId)[0]}
        />
      </Overlay>
    </View>
  );
};

export default ActiveListsScreen;
