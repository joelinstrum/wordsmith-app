import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "components/button/Button";
import RenderWord from "components/renderWord/RenderWord";
import { useThemeContext as useTheme } from "context/ThemeContext";
import useGetLearnedWords from "hooks/useGetLearnedWords";
import * as React from "react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";
import { getStoredItem, setStoredItem } from "utils/utilities";
import DictionaryLearnedItem from "./DictionaryLearnedItem";

const DictionaryTableOfLearnedWords = () => {
  const { theme } = useTheme();
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([5, 10]);
  const { learnedWords } = useGetLearnedWords();

  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [showCurrentWord, setShowCurrentWord] = useState(false);
  const [currentWord, setCurrentWord] = useState<IDictionary>();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [nextWord, setNextWord] = useState<IDictionary | undefined>();

  const from = page * itemsPerPage;
  const to = learnedWords
    ? Math.min((page + 1) * itemsPerPage, learnedWords.length)
    : 0;

  const sortDictionary = (column: string) => {
    // setSortColumn(column);
  };

  const updateItemsPerPage = (itemsPerPage: number) => {
    onItemsPerPageChange(itemsPerPage);
    setStoredItem(
      "@WordSmith:numberOfItemsPerPageLearned",
      itemsPerPage.toString()
    );
  };

  useEffect(() => {
    const setItems = async () => {
      const items =
        (await getStoredItem("@WordSmith:numberOfItemsPerPageLearned")) || "5";
      const n = parseInt(items, 10);
      onItemsPerPageChange(n);
    };
    setItems();
  }, []);

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
    if (!learnedWords) {
      return;
    }
    if (currentIndex > -1 && currentIndex + 1 < learnedWords?.length) {
      setNextWord(learnedWords[currentIndex + 1]);
    } else if (currentIndex + 1 === learnedWords.length) {
      setNextWord(learnedWords[0]);
      setCurrentIndex(-1);
    }
  }, [currentIndex]);

  const renderDictionaryTable = () => (
    <DataTable>
      <DataTable.Header style={theme.dataTable.header}>
        <DataTable.Title textStyle={[{ flex: 1 }, theme.dataTable.headerText]}>
          +/- Learned
        </DataTable.Title>
        <DataTable.Title
          textStyle={theme.dataTable.headerText}
          onPress={() => sortDictionary("word")}
          numeric
        >
          Word
        </DataTable.Title>
        <DataTable.Title
          textStyle={[theme.dataTable.headerText]}
          onPress={() => sortDictionary("category")}
          numeric
          style={{ flex: 2 }}
        >
          Category
        </DataTable.Title>
      </DataTable.Header>

      {learnedWords &&
        learnedWords
          .slice(from, to)
          .map((item: IDictionary, index: number, array: IDictionary[]) => (
            <DictionaryLearnedItem
              item={item}
              key={item.id}
              onWordPress={pressWord}
              index={index}
            />
          ))}
      {learnedWords && (
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(learnedWords.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${learnedWords.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={updateItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
          style={[{ backgroundColor: "#aaa" }]}
        />
      )}
    </DataTable>
  );

  return (
    <>
      {learnedWords && showCurrentWord && currentWord ? (
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
                <Ionicons name="arrow-forward-circle" size={32} color="gray" />
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
        renderDictionaryTable()
      )}
    </>
  );
};

export default DictionaryTableOfLearnedWords;
