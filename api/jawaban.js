import data from '../../data';
import { state } from '../../state';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { nama, jawaban } = req.body;
  const currentSoal = data[state.soalIndex];
  const foundIndex = currentSoal.jawaban.findIndex(
    (j, i) =>
      j.text.toLowerCase() === jawaban.toLowerCase() &&
      !state.jawabanTerbuka.includes(i)
  );

  if (foundIndex !== -1) {
    state.jawabanTerbuka.push(foundIndex);
    return res.status(200).json({
      status: 'benar',
      nama,
      jawaban,
      index: foundIndex,
      poin: currentSoal.jawaban[foundIndex].poin,
    });
  }

  return res.status(200).json({ status: 'salah', jawaban });
}
