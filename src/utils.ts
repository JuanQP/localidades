import React from "react";

// React "setState" of string type
type ReactStringSetState = React.Dispatch<React.SetStateAction<string>>;

export function setFieldValue(setter: ReactStringSetState) {
  return (element: React.ChangeEvent<HTMLInputElement>) => setter(element.target.value);
}

export function pickRandom(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomBetween(start: number, end: number) {
  return String(Math.floor(Math.random() * end) + start);
}
