// api/views.js
let views = 0; // temporary in-memory variable (resets on cold starts)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    views++;
    return res.status(200).json({ views });
  } else if (req.method === 'GET') {
    return res.status(200).json({ views });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
