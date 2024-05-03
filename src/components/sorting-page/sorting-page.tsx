import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TArray } from "../../utils/sorting-page_utils";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TArray[]>([]);
  const [radioChecked, setRadioChecked] = useState("selectionType");
  const [isLoading, setIsLoading] = useState("");

  useEffect(() => {
    setArray(randomArr());
  }, []);

  const setDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleRadioCheck = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadioChecked(e.target.value);
  };
  const handleAddNewArray = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading("newArray");
    setArray(randomArr());
    setIsLoading("");
  };

  const bubbleSort = async (array: TArray[], mode: boolean) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        const value1 = array[j].value;
        const value2 = array[j + 1].value;
        setArray([...array]);
        await setDelay(DELAY_IN_MS);
        if (mode ? value1 > value2 : value1 < value2) {
          array[j].value = value2;
          array[j + 1].value = value1;
        }
        array[j].state = ElementStates.Default;
        if (array[j + 1]) {
          array[j + 1].state = ElementStates.Default;
        }
        setArray([...array]);
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setArray([...array]);
    }

    return array;
  };

  const swap = (
    arr: TArray[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const selectionSort = async (array: TArray[], mode: boolean) => {
    for (let i = 0; i < array.length; i++) {
      let smallestIndex = i;
      array[smallestIndex].state = ElementStates.Changing;
      for (let j = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing;
        setArray([...array]);
        await setDelay(DELAY_IN_MS);
        if (
          mode
            ? array[j].value < array[smallestIndex].value
            : array[j].value > array[smallestIndex].value
        ) {
          smallestIndex = j;
          array[j].state = ElementStates.Changing;
          array[smallestIndex].state =
            i === smallestIndex
              ? ElementStates.Changing
              : ElementStates.Default;
          smallestIndex = j;
        }
        if (j !== smallestIndex) {
          array[j].state = ElementStates.Default;
        }
        setArray([...array]);
      }
      swap(array, i, smallestIndex);
      array[smallestIndex].state = ElementStates.Changing;
      array[i].state = ElementStates.Modified;
      setArray([...array]);
    }
    return array;
  };

  const randomArr = (): TArray[] => {
    const arr = [{ value: 0, state: ElementStates.Default }];
    const length = Math.floor(Math.random() * 13) + 3;
    for (let i = 0; i < length; i++) {
      arr.push({
        value: Math.round(Math.random() * 100),
        state: ElementStates.Default,
      });
    }
    return arr;
  };

  const setSortingType = async (mode: string): Promise<void> => {
    setIsLoading(mode);
    const currentMode = mode === "descending";
    if (radioChecked === "selectionType") {
      setArray(await selectionSort([...array], currentMode));
    } else {
      setArray(await bubbleSort([...array], currentMode));
    }
    setIsLoading("");
  };
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.radioButtons}>
            <RadioInput
              label="Выбор"
              value={"selectionType"}
              name={"sorting"}
              defaultChecked
              onChange={handleRadioCheck}
            />
            <RadioInput
              label="Пузырёк"
              value={"bubbleType"}
              name={"sorting"}
              onChange={handleRadioCheck}
            />
          </div>
          <div className={styles.sortingButtons}>
            <Button
              text="По возрастанию"
              sorting={Direction.Descending}
              onClick={() => setSortingType("descending")}
              isLoader={isLoading === "descending"}
              disabled={isLoading === "ascending"}
              extraClass={styles.button}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Ascending}
              onClick={() => setSortingType("ascending")}
              isLoader={isLoading === "ascending"}
              disabled={isLoading === "descending"}
              extraClass={styles.button}
            />
          </div>
          <Button
            text="Новый массив"
            onClick={handleAddNewArray}
            isLoader={isLoading === "newArray"}
            disabled={isLoading === "ascending" || isLoading === "descending"}
            extraClass={styles.button}
          />
        </form>
        <div className={styles.visualBlock}>
          {array.map((element, i) => {
            return (
              <Column
                index={element.value}
                state={element.state}
                key={i}
                extraClass={styles.element}
              />
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};