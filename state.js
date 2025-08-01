// state.js
import { soalList } from "./data.js";

export const state = {
  soalIndex: 0,
  jawabanTerbuka: [],
  soalList: soalList
};

export function resetSoalBaru() {
  state.soalIndex = (state.soalIndex + 1) % state.soalList.length;
  state.jawabanTerbuka = [];
}
