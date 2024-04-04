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
  const [isDisabled, setIsDisabled] = useState({
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

  const handleAddValue = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!value) return null;
    setIsLoading((prevState) => ({ ...prevState, addButton: true }));
    setIsDisabled((prevState) => ({
      ...prevState,
      addButton: true,
      deleteButton: true,      
      clearButton: true,
    }));

    stack.push({ letter: value, state: ElementStates.Changing });
    setValue("");
    setLetters([...stack.items]);

    stack.getByIndex(stack.size - 1, {
      letter: value,
      state: ElementStates.Default,
    });
    setLetters([...stack.items]);

    await delay(SHORT_DELAY_IN_MS);
    
    setIsLoading((prevState) => ({ ...prevState, addButton: false }));
    setIsDisabled((prevState) => ({
      ...prevState,
      addButton: false,
      deleteButton: false,      
      clearButton: false,
    }));
  };

  const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading((prevState) => ({ ...prevState, deleteButton: true }));
    setIsDisabled((prevState) => ({
      ...prevState,
      addButton: true,
      deleteButton: true,      
      clearButton: true,
    }));

    stack.getByIndex(stack.size - 1, {
      letter: stack.items[stack.size - 1].letter,
      state: ElementStates.Changing,
    });
    setLetters([...stack.items]);

    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setLetters([...stack.items]);
    setIsLoading((prevState) => ({ ...prevState, deleteButton: false }));
    setIsDisabled((prevState) => ({
      ...prevState,
      addButton: false,
      deleteButton: false,      
      clearButton: false,
    }));
  };

  const handleClearAll = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    stack.clear();
    setLetters(stack.items);
    setIsLoading((prevState) => ({ ...prevState, clearButton: true }));
    setIsDisabled((prevState) => ({
      ...prevState,
      addButton: true,
      deleteButton: true,      
      clearButton: true,
    }));

    await delay(SHORT_DELAY_IN_MS);

    setIsLoading((prevState) => ({ ...prevState, clearButton: false }));
    setIsDisabled((prevState) => ({
      ...prevState,
      addButton: false,
      deleteButton: false,      
      clearButton: false,
    }));
  };
  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            maxLength={4}
            isLimitText={true}
            placeholder="Введите значение"
            value={value}
            onChange={handleInput}
          />
          <Button
            text="Добавить"
            onClick={handleAddValue}
            disabled={value.length === 0 || letters.length < 0 || isDisabled.addButton}
            isLoader={isLoading.addButton}
          />
          <Button
            text="Удалить"
            onClick={handleDelete}
            disabled={!letters.length || isDisabled.addButton}
            isLoader={isLoading.deleteButton}
          />
          <Button
            text="Очистить"
            onClick={handleClearAll}
            disabled={!letters.length || isDisabled.addButton || isDisabled.deleteButton}
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