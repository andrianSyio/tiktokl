export let soalIndex = 0;

export const soalList = [
  {
    soal: "Sebutkan alat mandi!",
    jawaban: ["Sabun", "Sikat gigi", "Shampoo", "Gayung", "Handuk", "Pasta gigi"]
  },
  {
    soal: "Hewan yang hidup di air",
    jawaban: ["Ikan", "Lumba-lumba", "Paus", "Kepiting", "Ubur-ubur", "Lele"]
  },
  // Tambahkan 18 soal lagi...
];

export let terjawab = [];

export function resetJawaban() {
  terjawab = [];
}

export function tambahJawaban(jawaban, nama) {
  if (!terjawab.find(j => j.jawaban === jawaban.toLowerCase())) {
    terjawab.push({ jawaban: jawaban.toLowerCase(), nama });
  }
}

export function soalSekarang() {
  return soalList[soalIndex % soalList.length];
}

export function soalBerikutnya() {
  soalIndex++;
  terjawab = [];
}
