"use client";
import { resolveStyles, StyledProps } from "@/util/StyleUtil";
import { ChangeEvent, useCallback } from "react";

interface TextboxProps extends StyledProps {
  text: string;
  onChange: (text: string) => void;
  disabled?: boolean;
}

export function Textbox(props: TextboxProps) {
  const { text, onChange, disabled = false } = props;

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const className = "p-2 m-2 rounded-md border border-neutral-700 max-w-fit";

  return (
    <input
      type="text"
      onChange={changeHandler}
      value={text}
      disabled={disabled}
      {...resolveStyles(props, className)}
    />
  );
}
