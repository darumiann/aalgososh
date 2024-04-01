import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";
import { INewStack, Stack, stack } from "../../utils/stack-page_utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS, delay } from "../../constants/delays";


export const StackPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [letters, setLetters] = useState<INewStack[]>([]);
  const [isLoading, setIsLoading] = useState({
    addButton: false,
    deleteButton: false,
    clearButton: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleAddValue = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!value) return null;
    setIsLoading({ addButton: true, deleteButton: false, clearButton: false });

    stack.push({ letter: value, state: ElementStates.Changing });
    setValue("");
    setLetters([...stack.items]);

    delay(SHORT_DELAY_IN_MS);
    stack.getByIndex(stack.size - 1, {
      letter: value,
      state: ElementStates.Default,
    });
    setLetters([...stack.items]);
    setIsLoading({
      addButton: false,
      deleteButton: false,
      clearButton: false,
    });
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading({ addButton: false, deleteButton: true, clearButton: false });

    stack.getByIndex(stack.size - 1, {
      letter: stack.items[stack.size - 1].letter,
      state: ElementStates.Changing,
    });
    setLetters([...stack.items]);

    delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setLetters([...stack.items]);
    setIsLoading({
      addButton: false,
      deleteButton: false,
      clearButton: false,
    });
  };

  const handleClearAll = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    stack.clear();
    setLetters(stack.items);
    setIsLoading({ addButton: false, deleteButton: false, clearButton: false });
  };
  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            maxLength={4}
            isLimitText={true}
            placeholder="Введите значение"
            value={value.replace(/\D/g, "")}
            onChange={handleInput}
          />
          <Button
            text="Добавить"
            onClick={handleAddValue}
            disabled={!value || isLoading.deleteButton}
            isLoader={isLoading.addButton}
          />
          <Button
            text="Удалить"
            onClick={handleDelete}
            disabled={!letters.length || isLoading.addButton}
            isLoader={isLoading.deleteButton}
          />
          <Button
            text="Очистить"
            onClick={handleClearAll}
            disabled={
              !letters.length || isLoading.addButton || isLoading.deleteButton
            }
            isLoader={isLoading.clearButton}
          />
        </form>
        <div className={styles.visualBlock}>
          {letters.length > 0 &&
            letters.map((letter, i) => {
              return (
                <Circle
                  letter={letter.letter}
                  state={letter.state}
                  key={i}
                  index={i}
                  head={`${i === letters.length - 1 ? "top" : ""}`}
                ></Circle>
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};