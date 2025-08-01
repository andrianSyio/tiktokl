export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const { nama, jawaban } = req.body;

  const jawabanBenar = ["Sabun", "Sikat Gigi", "Shampoo", "Handuk"];

  if (jawabanBenar.includes(jawaban)) {
    return res.status(200).json({
      message: "Jawaban benar!",
      poin: 10,
      penjawab: nama
    });
  } else {
    return res.status(200).json({
      message: "Jawaban salah!",
      poin: 0,
      penjawab: nama
    });
  }
}
