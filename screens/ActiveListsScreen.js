import React, { useState, useLayoutEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import SwipeableFlatList from "react-native-swipeable-list";
import {
  Text,
  SearchBar,
  ListItem,
  Overlay,
  ThemeContext,
} from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
import * as listActions from "../store/actions/listActions";
import ListModal from "../components/list/ListModal";

const ActiveListsScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedListId, setSelectedListId] = useState();
  const dispatch = useDispatch();

  const list = useSelector((state) =>
    route.name === "Archived Lists"
      ? state.lists.archivedLists
      : state.lists.activeLists
  );
  const items = useSelector((state) => state.items.items);
  const { theme } = useContext(ThemeContext);

  console.log();

  useLayoutEffect(() => {
    navigation.setParams({
      handleOverlay: () => setOverlayVisible(!overlayVisible),
    });
  }, []);

  const actionSheetHandler = (type, id) => {
    switch (type) {
      case "edit":
        setSelectedListId(id);
        setOverlayVisible(!overlayVisible);
        break;
      case "delete":
        Alert.alert("Do you want to delete this list?", "", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => dispatch(listActions.removeList(id)),
            style: "destructive",
          },
        ]);
        break;
      case "archive":
        route.name === "Archived Lists"
          ? dispatch(
              listActions.archiveList(list.filter((x) => x.id === id)[0], false)
            )
          : dispatch(
              listActions.archiveList(list.filter((x) => x.id === id)[0], true)
            );

        break;
      default:
        return;
    }
  };

  const toggleOverlay = () => {
    setSelectedListId();
    setOverlayVisible(!overlayVisible);
  };

  const QuickActions = (index, qaItem) => {
    return (
      <View style={theme.qaContainer}>
        <View
          style={[theme.swipeButton, { backgroundColor: theme.colors.success }]}
        >
          <Pressable
            style={theme.swipeButtonPressable}
            onPress={() => actionSheetHandler("edit", qaItem.id)}
          >
            <Text>Edit</Text>
          </Pressable>
        </View>
        <View
          style={[theme.swipeButton, { backgroundColor: theme.colors.warning }]}
        >
          <Pressable
            style={theme.swipeButtonPressable}
            onPress={() =>
              actionSheetHandler(
                "archive",
                qaItem.id,
                !route.name === "Archived Lists"
              )
            }
          >
            <Text>
              {route.name === "Archived Lists" ? "Unarchive" : "Archive"}
            </Text>
          </Pressable>
        </View>
        <View
          style={[theme.swipeButton, { backgroundColor: theme.colors.error }]}
        >
          <Pressable
            style={theme.swipeButtonPressable}
            onPress={() => actionSheetHandler("delete", qaItem.id)}
          >
            <Text>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const getBoughtItems = (id) => {
    return items.filter((x) => x.list === id && x.done).length;
  };
  const getTotalItems = (id) => {
    return items.filter((x) => x.list === id).length;
  };

  return (
    <SafeAreaView style={{ flex: 1, alignContent: "center" }}>
      <SearchBar onChangeText={(value) => setSearch(value)} value={search} />
      <SwipeableFlatList
        // keyboardShouldPersistTaps="handled"
        // keyExtractor={extractItemKey}
        data={list.filter((x) => (search ? x.name.startsWith(search) : x))}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nothing here... yet
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onLongPress={() => longPressHandler(item.id)}
            onPress={() =>
              navigation.navigate(
                route.name === "Archived Lists"
                  ? "archivedListDetails"
                  : "listDetails",
                {
                  routeName: item.name,
                  listId: item.id,
                }
              )
            }
          >
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <View>
                  <Text>
                    {getBoughtItems(item.id)}/{getTotalItems(item.id)} 🛒
                  </Text>
                </View>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        )}
        maxSwipeDistance={240}
        renderQuickActions={({ index, item }) => QuickActions(index, item)}
        // contentContainerStyle={styles.contentContainerStyle}
        shouldBounceOnMount={true}
      />
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => toggleOverlay()}
      >
        <ListModal
          toggleOverlay={() => toggleOverlay()}
          list={list.filter((x) => x.id === selectedListId)[0]}
        />
      </Overlay>
    </SafeAreaView>
  );
};

export default ActiveListsScreen;
