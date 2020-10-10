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
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AddListModal from "../components/list/AddListModal";

const ActiveListsScreen = () => {
  const [search, setSearch] = useState();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const navigation = useNavigation();

  const list = useSelector((state) => state.lists.activeLists);

  useLayoutEffect(() => {
    navigation.setParams({
      handleOverlay: () => setOverlayVisible(!overlayVisible),
    });
  }, []);

  const actionSheetHandler = (index) => {
    switch (index) {
    }
  };

  const longPressHandler = () => {
    ActionSheet.show(
      {
        options: ["Edit", "Archive", "Delete", "Cancel"],
        cancelButtonIndex: 3,
        destructiveButtonIndex: 2,
        title: "Choose what to do",
      },
      (index) => {
        console.log(index);
      }
    );
  };

  return (
    <View style={{ flex: 1, alignContent: "center" }}>
      <SearchBar onChangeText={(value) => setSearch(value)} value={search} />
      <ScrollView>
        {list.map((l, i) => (
          <TouchableOpacity
            key={i}
            onLongPress={() => longPressHandler()}
            onPress={() =>
              navigation.navigate("listDetails", {
                routeName: l.name,
              })
            }
          >
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
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
