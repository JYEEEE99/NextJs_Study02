// 테스트 파일
import {
  getByRole,
  RenderResult,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, it } from "node:test"; // it 함수 추가
import { Input } from "./index";
import { expect } from "@storybook/test";

// describe로 처리를 모은다
describe("Input", () => {
  let renderResult: RenderResult;

  // 각 테스트 케이스 전에 컴포넌트를 화면에 그리고, renderResult에 설정한다
  beforeEach(() => {
    renderResult = render(<Input id="username" label="Username" />);
  });

  // 테스트 케이스 실행 후 화면에 그려지는 컴포넌트를 언마운트한다
  afterEach(() => {
    renderResult.unmount();
  });

  // 처음 화면에 그릴 때 input 요소가 비어있는지 테스트
  it("should be empty in input on initial render", () => {
    // label이 'Username'인 컴포넌트에 대응하는 input 요소를 얻는다
    const inputNode = screen.getByLabelText("Username") as HTMLInputElement;
    // input 요소의 표시가 비어있는지 확인한다
    expect(inputNode).toHaveValue("");
  });
  // 문자를 입력했을 때 입력한 내용이 표시되는지 테스트
  it("should show input text", () => {
    const inputText = "Test Input Text";
    const inputNode = screen.getByLabelText("Username") as HTMLInputElement;

    // fierEvent를 사용해 input요소의 onChange 이벤트를 트리거
    fireEvent.change(inputNode, { target: { value: inputText } });
    // input 요소에 입력한 텍스트가 표시되는지 확인
    expect(inputNode).toHaveValue(inputText);
    // 버튼이 클릭되면 입력 텍스트가 클리어하는지 체크
    it("should reset when user clicks button", () => {
      //먼저 input에 텍스트를 입력한다
      const inputText = "Test Input Text";
      const inputNode = screen.getByLabelText("Username") as HTMLInputElement;
      fireEvent.change(inputNode, { target: { value: inputText } });

      //버튼을 얻는다
      const buttonNode = screen.getByRole("button", {
        name: "Reset",
      }) as HTMLButtonElement;
      //버튼을 클릭한다
      fireEvent.click(buttonNode);
      // input 요소의 표시가 비었는지 확인
      expect(inputNode).toHaveValue("");
    });
  });
});
