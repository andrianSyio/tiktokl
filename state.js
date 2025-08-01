import allSoal from './data';

let soalAcak = allSoal.sort(() => Math.random() - 0.5); // acak urutan soal

let state = {
  soalIndex: 0,
  jawabanTerbuka: [],
  soalList: soalAcak
};

export { state };
