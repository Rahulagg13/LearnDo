import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";
const generateMCQ = (
  meaning: {
    Text: string;
  }[],
  idx: number
): string[] => {
  const correctAns: string = meaning[idx].Text;

  // An Array with all words except for correct ans
  const allMeaningExceptForCorrect = meaning.filter(
    (i) => i.Text !== correctAns
  );

  // Randomly genrating 3 elements from incorrectArray
  const incorrectOptions: string[] = _.sampleSize(
    allMeaningExceptForCorrect,
    3
  ).map((i) => i.Text);

  const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);

  return mcqOptions;
};

export const transLateWords = async (params: LangType): Promise<WordType[]> => {
  const words = generate(8).map((i) => ({
    Text: i,
  }));
  const apikey = import.meta.env.VITE_MICROSOFT_KEY;
  try {
    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": apikey,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );
    const receive: FetchedDataType[] = response.data;
    console.log(receive);

    const arr: WordType[] = receive.map((i, idx) => {
      const options: string[] = generateMCQ(words, idx);
      return {
        word: i.translations[0].text,
        meaning: words[idx].Text,
        options,
      };
    });
    return arr;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const countMatchingElements = (
  arr1: string[],
  arr2: string[]
): number => {
  if (arr1.length !== arr2.length) throw new Error("Arrays are not equal");
  let matchingCount = 0;
  for (let index = 0; index < arr1.length; index++) {
    if (arr1[index] === arr2[index]) matchingCount++;
  }
  return matchingCount;
};

export const fetchAudio = async (
  text: string,
  language: LangType
): Promise<string> => {
  const rapidKey = import.meta.env.VITE_RAPID_API;
  const key = import.meta.env.VITE_TEXT_TO_SPEECH_API;

  try {
    const encodedParams = new URLSearchParams({
      src: text,
      r: "0",
      c: "mp3",
      f: "8khz_8bit_mono",
      b64: "true",
    });

    if (language === "ja") encodedParams.set("hl", "ja-jp");
    else if (language === "es") encodedParams.set("hl", "es-es");
    else if (language === "fr") encodedParams.set("hl", "fr-fr");
    else encodedParams.set("hl", "hi-in");

    const response = await axios.post(
      "https://voicerss-text-to-speech.p.rapidapi.com/",
      encodedParams,
      {
        params: {
          key,
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": rapidKey,
          "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error("Audio error");
  }
};
