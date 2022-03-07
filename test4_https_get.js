const https = require('https')
const options = {
  hostname: 'api.notion.com',
  port: 443,
  path: '/v1/databases',
  method: 'GET',
  headers:
  {
    'Authorization':'Bearer secret_151Mw9NJrcCkraFR7ytPZJcKdHInwrSCcMcxrt7z19f',
    'Notion-Version':'2021-08-16'
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()
