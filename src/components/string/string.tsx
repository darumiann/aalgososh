import React, { ChangeEvent, useState } from "react";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { reverseString } from "../../utils/string_utils";

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

  const clickButton = async () => {
    const arr = valueInput
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));
    reverseString(arr, setLoading, setArrayLetters);
  }

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