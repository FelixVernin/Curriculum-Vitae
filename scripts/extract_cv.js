const fs = require('fs')
;(async () => {
  const mod = await import('pdf-parse')
  const pdf = mod.default || mod

  const input = 'public/CV_Felix_Vernin_EN.pdf'
  if (!fs.existsSync(input)) {
    console.error('PDF not found:', input)
    process.exit(2)
  }

  const dataBuffer = fs.readFileSync(input)

  try {
    const data = await pdf(dataBuffer)
    fs.writeFileSync('public/CV_text.txt', data.text, 'utf8')
    console.log('Extracted text length:', data.text.length)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
