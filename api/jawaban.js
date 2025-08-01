import data from '../../data';
import { state } from '../../state';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nama, jawaban } = req.body;

  if (!nama || !jawaban) {
    return res.status(400).json({ error: 'Nama dan jawaban wajib diisi' });
  }

  const currentSoal = state.soalList[state.soalIndex];
  const jawabanLower = jawaban.trim().toLowerCase();

  // Cek apakah jawaban sudah dibuka
  const sudahDijawab = state.jawabanTerbuka.find(j => j.text.toLowerCase() === jawabanLower);
  if (sudahDijawab) {
    return res.status(200).json({ status: 'sudah-dijawab' });
  }

  const match = currentSoal.jawaban.find(j => j.text.toLowerCase() === jawabanLower);

  if (match) {
    // Masukkan ke jawaban terbuka
    state.jawabanTerbuka.push({ ...match, nama });

    // Cek apakah semua jawaban sudah terbuka
    const semuaTerbuka = currentSoal.jawaban.length === state.jawabanTerbuka.length;

    if (semuaTerbuka) {
      state.soalIndex++;

      if (state.soalIndex >= state.soalList.length) {
        // Game selesai
        return res.status(200).json({
          status: 'benar-terakhir',
          jawaban: match.text,
          poin: match.poin,
          nama,
          selesai: true
        });
      }

      // Reset untuk soal selanjutnya
      state.jawabanTerbuka = [];

      return res.status(200).json({
        status: 'benar-next',
        jawaban: match.text,
        poin: match.poin,
        nama,
        nextSoal: state.soalList[state.soalIndex].soal
      });
    }

    return res.status(200).json({
      status: 'benar',
      jawaban: match.text,
      poin: match.poin,
      nama
    });
  } else {
    return res.status(200).json({ status: 'salah' });
  }
}
