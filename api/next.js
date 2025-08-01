import { soalBerikutnya } from '../../data.js';

export default function handler(req, res) {
  if (req.method === 'POST') {
    soalBerikutnya();
    res.status(200).json({ message: 'Soal berikutnya dimuat' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
