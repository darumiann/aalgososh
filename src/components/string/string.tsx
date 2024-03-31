import React, { ChangeEvent, useState } from "react";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {

  type TArray = {
    value: string;
    color: ElementStates;
  };

  const [valueInput, setValueInput] = useState("");
  const [arrayLetters, setArrayLetters] = useState<Array<TArray>>([]);
  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const changeColor = (arr: TArray[], i: number, color: ElementStates) => {
    arr[i].color = color;
    arr[arr.length - i - 1].color = color;
    const newArr: TArray[] = arr.concat();

    setArrayLetters(newArr);
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

  const reverseString = (arr: TArray[]) => {
    const n = Math.floor(arr.length / 2);

    if (arr.length % 2 === 0) {
      let i = 0;

      changeColor(arr, i, ElementStates.Changing);

      const interval = setInterval(() => {
        swap(arr, arr.length - i - 1, i);
        changeColor(arr, i, ElementStates.Modified);

        if (i < n - 1) {
          i++;
          changeColor(arr, i, ElementStates.Changing);
        } else {
          clearInterval(interval);
          setLoading(false);
        }
      }, 1000);
    } else {
      let i = 0;

      changeColor(arr, i, ElementStates.Changing);

      const interval = setInterval(() => {
        swap(arr, arr.length - i - 1, i);
        changeColor(arr, i, ElementStates.Modified);

        if (i < n) {
          i++;
          changeColor(arr, i, ElementStates.Changing);
        } else {
          clearInterval(interval);
          setLoading(false);
        }
      }, 1000);
    }
  };

  const clickButton = () => {
    setLoading(true);
    const arr = valueInput
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));

    setArrayLetters(arr);
    setValueInput("");

    setTimeout(() => reverseString(arr), 1000);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form className={styles.form}>
          <Input
            type="text"
            maxLength={11}
            isLimitText={true}
            onChange={onChange}
          />
          <Button
            text="Развернуть"
            type="submit"
            extraClass={styles.button}
            onClick={clickButton}
            disabled={valueInput === "" || valueInput.length > 11}
            isLoader={loading}
          />
        </form>
        <div className={styles.circleBlock}>
          {arrayLetters.map((item, index) => (
            <li className={styles.circle} key={index}>
              <Circle letter={item.value} state={item.color} />
            </li>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};