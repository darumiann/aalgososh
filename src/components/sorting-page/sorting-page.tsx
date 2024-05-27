import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { bubbleSort, selectionSort } from "../../utils/sorting-page_utils";

export type TArray = {
  value: number;
  state: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TArray[]>([]);
  const [typeSorting, setTypeSorting] = useState<string>("selection");
  const [loaderInc, setLoaderInc] = useState(false);
  const [loaderDec, setLoaderDec] = useState(false);
  const [isLoading, setIsLoading] = useState("");

  useEffect(() => {
    setArray(randomArr());
  }, []);


  const handleSortingIncrease = (arr: TArray[]) => {
    
    if(typeSorting === "selection") {
      selectionSort(arr, setLoaderInc, setArray);
    } else {
      bubbleSort(arr, setLoaderInc, setArray);
    }

  };


  const handleSortingDecrease = (arr: TArray[]) => {

    if (typeSorting === "selection") {
      selectionSort(arr, setLoaderDec, setArray, false);
    } else {
      bubbleSort(arr, setLoaderDec, setArray, false);
    }

  };

  const handleAddNewArray = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading("newArray");
    setArray(randomArr());
    setIsLoading("");
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
              onClick={() => {
                setTypeSorting("selection");
              }}
            />
            <RadioInput
              label="Пузырёк"
              value={"bubbleType"}
              name={"sorting"}
              onClick={() => {
                setTypeSorting("bubble");
              }}
            />
          </div>
          <div className={styles.sortingButtons}>
            <Button
              text="По возрастанию"
              sorting={Direction.Descending}
              onClick={() => handleSortingIncrease(array)}
              isLoader={loaderInc}
              disabled={loaderDec || array.length === 0}
              extraClass={styles.button}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Ascending}
              onClick={() => handleSortingDecrease(array)}
              isLoader={loaderDec}
              disabled={loaderInc || array.length === 0}
              extraClass={styles.button}
            />
          </div>
          <Button
            text="Новый массив"
            onClick={handleAddNewArray}
            disabled={loaderInc || loaderDec}
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