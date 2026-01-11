import express from "express"
import fetch from "node-fetch"
import cors from "cors"

const app = express()
app.use(cors())

app.get("/", async (req, res) => {
  const url = req.query.url
  if (!url) return res.send("No URL")

  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    })
    const text = await r.text()
    res.send(text)
  } catch (e) {
    res.status(500).send(e.toString())
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Proxy running"))
