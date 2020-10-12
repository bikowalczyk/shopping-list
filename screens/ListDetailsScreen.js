import React, {
  useContext,
  useRef,
  useState,
  createRef,
  useEffect,
} from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Input, ThemeContext, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import * as itemActions from "../store/actions/itemActions";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { archiveList } from "../store/actions/listActions";

const ListDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items).filter(
    (x) => x.list === route.params.listId
  );

  const isArchivedList = route.name === "archivedListDetails";

  const itemsRef = useRef([]);
  const [inputGoBack, setInputGoBack] = useState(true);
  const [autofocusEnabled, setAutofocusEnabled] = useState(true);
  const [inputValue, setInputValue] = useState();

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
    } else if (text.length > 0 && text !== item.name) {
      dispatch(
        itemActions.editItem({
          ...item,
          name: text,
        })
      );
    } else if (item && text.length === 0) {
      dispatch(itemActions.removeItem(item.id));
    }
  };

  const iconPressHandler = (item) => {
    if (isArchivedList) {
      alert(
        "This list is archived. Please unarchive it first in order to make changes"
      );
    } else {
      dispatch(itemActions.editItem({ ...item, done: !item.done }));
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareFlatList
        extraScrollHeight={60}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps="handled"
        style={styles.list}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback
          // disabled={!isArchivedList}
          >
            <View style={theme.ItemList} key={item.id}>
              <Input
                pointerEvents={isArchivedList ? "none" : "auto"}
                onChangeText={(text) =>
                  text.length > 0 ? setInputGoBack(false) : setInputGoBack(true)
                }
                onFocus={(e) => {
                  setAutofocusEnabled(false);
                  e.nativeEvent.text
                    ? setInputGoBack(false)
                    : setInputGoBack(true);
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && inputGoBack) {
                    // console.log(itemsRef.current[index - 1]);
                    itemsRef.current[index - 1]
                      ? itemsRef.current[index - 1].focus()
                      : setAutofocusEnabled(true);
                  }
                }}
                blurOnSubmit={false}
                // onBlur={() => {
                //   itemsRef.current[index + 1]
                //     ? itemsRef.current[index + 1].focus()
                //     : setAutofocusEnabled(true);
                // }}
                disabled={isArchivedList}
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
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        )}
        data={items}
        ListFooterComponent={() => (
          <TouchableWithoutFeedback
            disabled={!isArchivedList}
            onPress={() => iconPressHandler()}
          >
            <View style={theme.ItemList}>
              <Input
                pointerEvents={isArchivedList ? "none" : "auto"}
                onFocus={(e) => {
                  console.log(e.nativeEvent.text.length);
                  // e.nativeEvent.text.length > 0
                  //   ? setInputGoBack(false)
                  //   : setInputGoBack(true);
                  setAutofocusEnabled(true);
                  // setInputGoBack(true);
                  // e.nativeEvent.text.length === 0
                  //   ? setInputGoBack(true)
                  //   : setInputGoBack(false);
                }}
                onBlur={() => {
                  setAutofocusEnabled(false);
                }}
                onChangeText={(text) => {
                  // setInputValue(text);
                  text.length > 0
                    ? setInputGoBack(false)
                    : setInputGoBack(true);
                }}
                blurOnSubmit={false}
                // value={inputValue}
                placeholder="Type to create a new item!"
                disabled={isArchivedList}
                containerStyle={[theme.ItemListInputContainer]}
                inputContainerStyle={styles.inputStyle}
                // ref={(el) => (itemsRef.current[items.length] = el)}
                inputStyle={theme.ItemListInput}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && inputGoBack) {
                    // console.log(itemsRef.current[index - 1]);
                    if (itemsRef.current[items.length - 1]) {
                      itemsRef.current[items.length - 1].focus();
                    }
                  }
                }}
                onEndEditing={(event) =>
                  inputHandler(event, route.params.listId)
                }
                onSubmitEditing={
                  (event) => inputHandler(event, route.params.listId)
                  // enable autoFocus?
                }
                autoFocus={autofocusEnabled}
              />
            </View>
          </TouchableWithoutFeedback>
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
