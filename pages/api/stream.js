export default async function handler(req, res) {
  const { file } = req.query;

  if (!file) {
    return res.status(400).send("Missing file parameter");
  }

  const fileUrl = `https://archive.org/download/songs_20250506/${file}`;

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return res.status(404).send("File not found");
    }

    res.setHeader("Content-Type", "audio/mpeg");
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Stream error");
  }
}
