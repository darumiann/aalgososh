import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../types/element-states";
import { setDelay } from "./string_utils";
import { SHORT_DELAY_IN_MS } from "../constants/delays";

export const swap = (array: any[], i: number, j: number) => {
  [array[i], array[j]] = [array[j], array[i]];
};

export type TArray = {
  value: number;
  state: ElementStates;
};

export const selectionSort = async (
  arr: TArray[],
  setLoader: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<typeof arr>>,
  sortDirection = true,
) => {
  setLoader(true);

  const { length } = arr;
  if (length === 0) return [];

  for (let i = 0; i < length - 1; i++) {
    let currInd = i;

    for (let j = i + 1; j < length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      setArray([...arr]);
      await setDelay(SHORT_DELAY_IN_MS);

      if (sortDirection) {
        
        if (arr[currInd].value > arr[j].value) {
          currInd = j;
        }
      } else {
        if (arr[currInd].value < arr[j].value) {
          currInd = j;
        }
      }

      arr[j].state = ElementStates.Default;
    }
    swap(arr, i, currInd);
    arr[i].state = ElementStates.Modified;
  }

  arr[length - 1].state = ElementStates.Modified;
  setArray([...arr]);
  setLoader(false);

  return arr;
};

export const bubbleSort = async (
  arr: TArray[],
  setLoader: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<typeof arr>>,
  sortDirection = true
) => {
  setLoader(true);

  const { length } = arr;
  if (length === 0) return [];

  for (let i = length - 1; i >= 0; i--) {

    for (let j = 0; j < i; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setArray([...arr]);

      await setDelay(SHORT_DELAY_IN_MS);

      if (sortDirection) {

        if (arr[j].value > arr[j + 1].value) {
          swap(arr, j + 1, j);
        }

      } else {

        if (arr[j].value < arr[j + 1].value) {
          swap(arr, j + 1, j);
        }
        
      }

      arr[j + 1].state = ElementStates.Modified;
      arr[j].state = ElementStates.Default;
    }
    arr[i].state = ElementStates.Modified;
  }

  setArray([...arr]);
  setLoader(false);

  return arr;
};

