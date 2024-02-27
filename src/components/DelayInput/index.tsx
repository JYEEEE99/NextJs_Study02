import React, { useCallback, useRef, useState } from "react";

type DelayButtonProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
export const DelayInput = (props: DelayButtonProps) => {
  const { onChange } = props;
  // 입력중 여부를 유지하는 상태
  const [isTyping, setIsTyping] = useState(false);
  // input에 표시하는 텍스트를 유지하는 상태
  const [inputVlaue, setInputVlaue] = useState("");
  //span에 표시하는 텍스트를 유지하는 상태
  const [viewValue, setViewValue] = useState("");
  // 타이머를 유지하는 Ref
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 입력중인 플래그를 설정
      setIsTyping(true);
      // input 에 표시할 텍스트를 업데이트
      setInputVlaue(e.target.value);
      // 만약 timerRef에 이전 설정한 타이머가 있다면 먼저 해제
      if (timerRef.current !== null) {
        timerRef.current = null;
      }
      // 1초후에 실행하는 타이머를 설정
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        // 입력중 플래그를 해제
        setIsTyping(false);
        // span에 표시할 텍스트를 업데이트
        setViewValue(e.target.value);
        // onChange 콜백을 호출
        onChange(e);
      }, 1000);
    },
    [onChange]
  );
  // span에 표시하는 텍스트
  const text = isTyping ? "입력중..." : `입력한 텍스트: ${viewValue}`;
  return (
    <div>
      {/* data-testid는 테스트 안에서만 사용하는 ID */}
      <input
        data-testid="input-text"
        value={inputVlaue}
        onChange={handleChange}
      />
      <span data-testid="display-text">{text}</span>
    </div>
  );
};
