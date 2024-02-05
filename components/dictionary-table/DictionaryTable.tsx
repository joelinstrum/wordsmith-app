import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "components/button/Button";
import Loader from "components/loader/Loader";
import RenderWord from "components/renderWord/RenderWord";
import { useAppData } from "context/AppDataContext";
import { useTheme } from "context/ThemeContext";
import * as React from "react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";
import DictionaryItem from "./DictionaryItem";

const DictionaryTable = () => {
  const theme = useTheme();
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([5, 10]);
  const {
    dictionary,
    getWordList,
    dictionaryLoading,
    setSortColumn,
    generateRandomWordList,
    addToList,
    wordList,
  } = useAppData();

  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [showCurrentWord, setShowCurrentWord] = useState(false);
  const [currentWord, setCurrentWord] = useState<IDictionary>();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [nextWord, setNextWord] = useState<IDictionary | undefined>();

  useEffect(() => {
    if (dictionary && dictionary.length) {
      getWordList();
    }
  }, [dictionary.length]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, dictionary.length);

  const sortDictionary = (column: string) => {
    setSortColumn(column);
  };

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const pressWord = (wordObject: IDictionary, index: number) => {
    const _currentIndex = index + from;
    setCurrentWord(wordObject);
    setShowCurrentWord(true);
    setCurrentIndex(_currentIndex);
  };

  const pressNextWord = () => {
    const nextIndex = currentIndex + 1;
    setCurrentWord(nextWord);
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    if (currentIndex > -1 && currentIndex + 1 < dictionary.length) {
      setNextWord(dictionary[currentIndex + 1]);
    } else if (currentIndex + 1 === dictionary.length) {
      setNextWord(dictionary[0]);
      setCurrentIndex(-1);
    }
  }, [currentIndex]);

  const renderDictionaryTable = () => (
    <DataTable>
      <DataTable.Header style={theme.dataTable.header}>
        <DataTable.Title textStyle={theme.dataTable.headerText}>
          +/-
        </DataTable.Title>
        <DataTable.Title
          textStyle={theme.dataTable.headerText}
          onPress={() => sortDictionary("word")}
          numeric
        >
          Word
        </DataTable.Title>
        <DataTable.Title
          textStyle={theme.dataTable.headerText}
          onPress={() => sortDictionary("category")}
          numeric
        >
          Category
        </DataTable.Title>
      </DataTable.Header>

      {dictionary
        .slice(from, to)
        .map((item: IDictionary, index: number, array: IDictionary[]) => (
          <DictionaryItem
            item={item}
            key={item.id}
            onWordPress={pressWord}
            index={index}
          />
        ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(dictionary.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${dictionary.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={"Rows per page"}
        style={[{ backgroundColor: "#aaa" }]}
      />
    </DataTable>
  );

  return (
    <>
      {dictionaryLoading ? (
        <Loader isLoading={dictionaryLoading} />
      ) : (
        <View>
          {showCurrentWord && currentWord ? (
            <>
              <RenderWord wordObject={currentWord} />
              {nextWord && (
                <View style={{ marginTop: 20 }}>
                  <Button
                    style={theme.button.settings}
                    title={`Next word: ${nextWord.word}`}
                    onPress={() => pressNextWord()}
                    iconPlacement="left"
                  >
                    <Ionicons
                      name="arrow-forward-circle"
                      size={32}
                      color="gray"
                    />
                  </Button>
                </View>
              )}

              <View style={{ marginTop: 20 }}>
                <Button
                  style={theme.button.settings}
                  title="Return to word list"
                  onPress={() => setShowCurrentWord(false)}
                  iconPlacement="left"
                >
                  <Ionicons name="arrow-back-circle" size={32} color="gray" />
                </Button>
              </View>
            </>
          ) : (
            <>
              {renderDictionaryTable()}
              <View style={{ marginTop: 20 }}>
                <Button
                  style={theme.button.settings}
                  title="Replace drill list randomly"
                  onPress={generateRandomWordList}
                >
                  <Ionicons name="add-sharp" size={32} color="gray" />
                </Button>
              </View>
              {wordList.length < 5 && (
                <View style={{ marginTop: 20 }}>
                  <Button
                    style={theme.button.settings}
                    title={`Add ${
                      5 - wordList.length
                    } random words to drill list`}
                    onPress={addToList}
                  >
                    <Ionicons name="add-sharp" size={32} color="gray" />
                  </Button>
                </View>
              )}
            </>
          )}
        </View>
      )}
    </>
  );
};

export default DictionaryTable;
