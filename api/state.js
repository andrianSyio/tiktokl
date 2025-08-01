// /api/state.js
import { soalSekarang, terjawab } from './data.js';

export default function handler(req, res) {
  res.status(200).json({
    soal: soalSekarang(),
    terjawab
  });
}
