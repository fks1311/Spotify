import { atom } from "recoil";

export const triggerAtom = atom<number>({
  key: "triggerState",
  default: 0,
});
