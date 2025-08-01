// api/state.js

const soalList = [
  {
    soal: "Sebutkan alat mandi!",
    jawaban: ["Sabun", "Sampo", "Sikat gigi", "Handuk", "Pasta gigi", "Gayung"]
  },
  {
    soal: "Sebutkan buah berwarna merah!",
    jawaban: ["Apel", "Stroberi", "Semangka", "Ceri", "Delima", "Tomat"]
  },
  {
    soal: "Sebutkan hewan peliharaan!",
    jawaban: ["Kucing", "Anjing", "Ikan", "Burung", "Kelinci", "Hamster"]
  },
  // ... Tambah total 20 soal
];

export default function handler(req, res) {
  const randomIndex = Math.floor(Math.random() * soalList.length);
  const soalDipilih = soalList[randomIndex];

  res.status(200).json(soalDipilih);
}
