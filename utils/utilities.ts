/* bring this in first*/
import { NativeEventEmitter } from "react-native";
const eventEmitter = new NativeEventEmitter();
/* bring in the rest */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";

const pause = (seconds: number) => {
  const milliseconds = seconds * 1000;
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

const getTimestamp = () => {
  return Date.now();
};

const setStoredItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
};

const getStoredItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(error);
  }
};

const getStoredItemObject = async (key: string) => {
  try {
    const value: string | null = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  } catch (error) {
    console.log(error);
  }
};

export const newShade = (hexColor: string, magnitude: number) => {
  hexColor =
    hexColor.length === 4
      ? "#" + hexColor.slice(1).padStart(6, hexColor[1])
      : hexColor;
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};

export const getUsage = (inputString: string): string => {
  var goodQuotes = inputString.replace(/[“”]/g, '"');
  const match = goodQuotes.match(/"([^"]*)"/);
  return match ? match[1] : inputString;
};

const getMeaning = (inputString: string): string => {
  let newString = inputString.replace(/tr\./g, "transitive ");
  newString = newString.replace(/intr\./g, "intransitive ");
  return newString;
};

const getPronounciation = (inputString: string): string => {
  const match = inputString.match(/\((.*?)(?:,|$)/); // Match text between parentheses up to comma or end of string
  if (match) {
    const textInsideParentheses = match[1].trim(); // Extract text between parentheses and trim whitespace
    const pronunciation = textInsideParentheses.split(":")[1]; // Split by colon and get second part
    if (pronunciation) {
      return pronunciation.trim(); // Return the trimmed pronunciation
    }
  }
  return inputString; // Return empty string if no match or no pronunciation found
};

const getCategory = (inputString: string): string => {
  const pattern = /AWAD.*/;
  const newString = inputString.replace(pattern, "");
  return newString;
};

const playWordMp3 = async (word: string) => {
  const mp3Uri = `https://wordsmith.org/words/${word.toLowerCase()}.mp3`;
  const sound = new Audio.Sound();
  await sound.loadAsync({
    uri: mp3Uri,
  });
  await sound.playAsync();
  return;
};

const playWordNative = async (word: string) => {
  await Speech.speak("n(y)üˈgasətē");
  return true;
};

export {
  getCategory,
  getMeaning,
  getPronounciation as getPronunciation,
  getStoredItem,
  getStoredItemObject,
  getTimestamp,
  pause,
  playWordMp3,
  playWordNative,
  setStoredItem,
};
