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
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
        "Referer": "https://www.mirrativ.com/",
        "Origin": "https://www.mirrativ.com"
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