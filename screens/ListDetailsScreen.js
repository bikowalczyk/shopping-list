import React, { useContext, useRef, useState, createRef } from "react";
import { TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import { Input, ThemeContext, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import * as itemActions from "../store/actions/itemActions";

const ListDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items).filter(
    (x) => x.list === route.params.listId
  );

  const itemsRef = useRef([]);
  const [inputGoBack, setInputGoBack] = useState(false);
  const [autofocusEnabled, setAutofocusEnabled] = useState(true);

  if (itemsRef.current.length !== items.length) {
    // add or remove refs
    itemsRef.current = Array(items.length)
      .fill()
      .map((_, i) => itemsRef.current[i] || createRef());
  }
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
    <View style={styles.container}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        style={styles.list}
        renderItem={({ item, index }) => (
          <View style={theme.ItemList} key={item.id}>
            <Input
              onChangeText={(text) =>
                text.length === 0 ? setInputGoBack(true) : setInputGoBack(false)
              }
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace" && inputGoBack) {
                  console.log(itemsRef.current[index - 1]);
                  itemsRef.current[index - 1]
                    ? itemsRef.current[index - 1].focus()
                    : setAutofocusEnabled(true);
                  setInputGoBack(false);
                }
              }}
              blurOnSubmit={false}
              disabled={route.name === "archivedListDetails"}
              containerStyle={[theme.ItemListInputContainer]}
              inputContainerStyle={styles.inputStyle}
              onSubmitEditing={() =>
                itemsRef.current[index + 1]
                  ? itemsRef.current[index + 1].focus()
                  : setAutofocusEnabled(true)
              }
              ref={(el) => (itemsRef.current[index] = el)}
              inputStyle={[
                item.done ? theme.textStrikethrough : {},
                theme.ItemListInput,
              ]}
              defaultValue={item.name}
              onEndEditing={(event) => inputHandler(event, null, item)}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                iconPressHandler(item);
              }}
            >
              <Icon
                name="done"
                reverse
                color={item.done ? theme.colors.success : theme.colors.grey3}
                // containerStyle={{
                //   transform: [{ scale: 0.45 }],
                //   position: "absolute",
                //   right: 0,
                //   top: 0,
                // }}
              />
            </TouchableOpacity>
          </View>
        )}
        data={items}
        ListFooterComponent={() => (
          <View style={theme.ItemList}>
            <Input
              onFocus={() => setAutofocusEnabled(true)}
              onBlur={() => setAutofocusEnabled(false)}
              blurOnSubmit={false}
              placeholder="Type to create a new item!"
              disabled={route.name === "archivedListDetails"}
              containerStyle={[theme.ItemListInputContainer]}
              inputContainerStyle={styles.inputStyle}
              // ref={(el) => (itemsRef.current[items.length] = el)}
              inputStyle={theme.ItemListInput}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  // console.log(itemsRef.current[index - 1]);
                  itemsRef.current[items.length - 1]
                    ? itemsRef.current[items.length - 1].focus()
                    : setAutofocusEnabled(true);
                  setInputGoBack(false);
                }
              }}
              onEndEditing={(event) => inputHandler(event, route.params.listId)}
              onSubmitEditing={
                (event) => inputHandler(event, route.params.listId)
                // enable autoFocus?
              }
              autoFocus={autofocusEnabled}
            />
          </View>
        )}
      />
      <View style={styles.redLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  redLine: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: "red",
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: "red",
    height: "100%",
    width: 4,
    position: "absolute",
    left: "5.5%",
  },
  inputStyle: {
    marginHorizontal: "-2.3%",
  },
  list: { backgroundColor: "#f5f5f5", marginVertical: 20, width: "100%" },
  icon: {
    margin: 3,
    position: "absolute",
    transform: [{ scale: 0.5 }],
    right: 0,
    top: -20,
    zIndex: 15,
  },
});

export default ListDetailsScreen;
