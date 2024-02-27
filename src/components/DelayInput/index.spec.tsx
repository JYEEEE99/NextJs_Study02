import { RenderResult, fireEvent, render } from "@testing-library/react";
import { describe } from "node:test";
import { DelayInput } from "./index";

// DelayInput 컴포넌트에 관한 테스트
describe("DelayInput", () => {
  let renderResult: RenderResult;
  let handleChange: jest.Mock;

  beforeEach(() => {
    // 목 함수를 작성
    handleChange = jest.fn();

    // 목 함수를 Delaybutton에 전달해서 화면을 그린다
    renderResult = render(<DelayInput onChange={handleChange} />);
  });
  afterEach(() => {
    renderResult.unmount();
  });
  // span 요소의 텍스트가 비어있음을 테스트
  it("should display empty in spna on initial render", () => {
    const spanNode = screen.getByTestId("display-text") as HTMLSpanElement;
    // 초기 표시에는 비어 있음
    expect(spanNode).toHaveTextContent("입력한 텍스트:");
  });
  // 입력 직후 span 요소가 '입력중...' 이라고 표시함을 테스트
  it('should display "입력중..." immediately after onChange event occurs', () => {
    const inputText = "Test Input Text";
    const inputNode = screen.getByTestId("input-text") as HTMLInputElement;
    // input의 onChange 이벤트를 호출
    fireEvent.change(inputNode, { target: { value: inputText } });
    const spandNode = screen.getByTestId("display-text") as HTMLSpanElement;
    // '입력중...' 표시 여부 확인
    expect(spanNode).toHaveTextContent("입력중...");
  });
});
