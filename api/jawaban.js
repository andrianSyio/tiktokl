// api/jawaban.js
let jawabanList = []

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { jawaban } = req.body
    if (jawaban && !jawabanList.includes(jawaban)) {
      jawabanList.push(jawaban)
    }
    res.status(200).json({ success: true })
  } else if (req.method === 'GET') {
    res.status(200).json({ jawaban: jawabanList })
  } else {
    res.status(405).end()
  }
}
