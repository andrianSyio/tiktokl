// /api/jawaban.js
import { state, resetSoalBaru } from "../../state.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nama, jawaban } = req.body;
  if (!nama || !jawaban) {
    return res.status(400).json({ error: "Missing nama or jawaban" });
  }

  const currentSoal = state.soalList[state.soalIndex];
  const jawabanBenar = currentSoal.jawaban.find(
    (j) => j.text.toLowerCase() === jawaban.toLowerCase()
  );

  const sudahDijawab = state.jawabanTerbuka.some(
    (j) => j.text.toLowerCase() === jawaban.toLowerCase()
  );

  if (jawabanBenar && !sudahDijawab) {
    const jawabanObj = {
      text: jawabanBenar.text,
      poin: jawabanBenar.poin,
      nama
    };
    state.jawabanTerbuka.push(jawabanObj);

    if (state.jawabanTerbuka.length === currentSoal.jawaban.length) {
      const soalLama = jawabanObj;
      resetSoalBaru();
      return res.status(200).json({
        status: "benar-next",
        ...soalLama,
        nextSoal: state.soalList[state.soalIndex].soal
      });
    }

    return res.status(200).json({ status: "benar", ...jawabanObj });
  }

  if (
    jawabanBenar &&
    sudahDijawab &&
    state.jawabanTerbuka.length === state.soalList.length
  ) {
    return res.status(200).json({ status: "benar-terakhir", selesai: true });
  }

  return res.status(200).json({ status: "salah" });
}
