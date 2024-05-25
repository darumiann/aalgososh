import { ElementStates } from "../../types/element-states";
import { reverseString } from "../../utils/string_utils";

const setResultArr = jest.fn();
const setLoad = jest.fn();

const initialArr = [
  { value: "1", color: ElementStates.Default },
  { value: "2", color: ElementStates.Default },
  { value: "3", color: ElementStates.Default },
  { value: "4", color: ElementStates.Default },
];

const referenceArr = [
  { value: "4", color: ElementStates.Modified },
  { value: "3", color: ElementStates.Modified },
  { value: "2", color: ElementStates.Modified },
  { value: "1", color: ElementStates.Modified },
];

describe("Тест разворота строки", () => {

  it("Разворот с четным количеством элементов", async () => {
    const tmpArr = initialArr;
    await reverseString(tmpArr, setLoad, setResultArr);
    expect(initialArr).toStrictEqual(referenceArr);
  });

  it("Разворот с нечетным количеством элементов", async () => {
    const tmpArr = initialArr.splice(-1, 1);
    const tmpArr2 = referenceArr.splice(-1, 1);
    await reverseString(tmpArr, setLoad, setResultArr);
    expect(tmpArr).toStrictEqual(tmpArr2);
  });

  it("Разворот с одним элементом", async () => {
    const tmpArr = initialArr.splice(-1, 3);
    const tmpArr2 = referenceArr.splice(-1, 3);
    await reverseString(tmpArr, setLoad, setResultArr);
    expect(tmpArr).toStrictEqual(tmpArr2);
  });

  it("Работа с пустым массивом", () => {
    const emptyArr = [{ value: "" }];
    const emptyArr2 = [{ value: "" }];
    expect(emptyArr).toStrictEqual(emptyArr2);
  })


})