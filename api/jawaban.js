import { soalSekarang, tambahJawaban, terjawab } from '../../data.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Hanya menerima POST' });
  }

  const { nama, jawaban } = req.body;

  if (!nama || !jawaban) {
    return res.status(400).json({ error: 'Parameter nama dan jawaban wajib diisi' });
  }

  const soal = soalSekarang();
  const jawabanLower = jawaban.toLowerCase();

  const benar = soal.jawaban.some(j => j.toLowerCase() === jawabanLower);
  const sudah = terjawab.some(j => j.jawaban === jawabanLower);

  if (benar && !sudah) {
    tambahJawaban(jawabanLower, nama);
    return res.status(200).json({ status: 'benar', message: 'Jawaban benar!' });
  }

  return res.status(200).json({
    status: 'salah',
    message: sudah ? 'Jawaban sudah ditemukan' : 'Jawaban salah'
  });
}
