// /api/state.js
import { state } from "../../state.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const currentSoal = state.soalList[state.soalIndex];
  res.status(200).json({
    soal: currentSoal.soal,
    jawabanTerbuka: state.jawabanTerbuka
  });
}
