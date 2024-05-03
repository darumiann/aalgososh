import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [valueInput, setValueInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonActive, setButtonActive] = useState(true);
  const [letters, setLetters] = useState<string[]>([]);

  const calculateFibonacci = (number: number): string[] => {
    const array: number[] = [number];
    for (let i = 0; i <= number; i++) {
      if (i === 0) {
        array[0] = 1;
      } else if (i === 1) {
        array[1] = 1;
      } else {
        array[i] = array[i - 1] + array[i - 2];
      }
    }
    return array.map((number) => number.toString());
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
    if (parseInt(e.target.value) <= 19 && parseInt(e.target.value) >= 1) {
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  };

  const clickButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let number = Number(valueInput);

    setLoading(true);

    const array: string[] = [];
    let counter: number = 0;
    const fibonacciArray = calculateFibonacci(number);

    setValueInput("");
    setButtonActive(true);

    const interval = setInterval(() => {
      array.push(fibonacciArray[counter]);
      setLetters([...array]);

      counter++;

      if (fibonacciArray.length - 1 === array.length - 1) {
        clearInterval(interval);
        setLoading(false);
      }
    }, SHORT_DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={clickButton}>
          <Input
            max={19}
            maxLength={19}
            type="number"
            isLimitText={true}
            value={valueInput}
            onInput={handleInput}
          />
          <Button
            text="Рассчитать"
            type="submit"
            isLoader={loading}
            disabled={isButtonActive}
          />
        </form>
        <div className={styles.visualBlock}>
          {letters.map((letter, i) => {
            return <Circle letter={letter} key={i} index={i} />;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};