const later = require('later')

const handlerUpdate = require('./update')

// node app.js 设置自动更新
later.date.localTime()
later.setInterval(handlerUpdate, {
  schedules: [
    { h: [06], m: [00] },
    { h: [08], m: [00] },
    { h: [12], m: [00] },
    { h: [21], m: [25] }, 
    { h: [21], m: [27] },
    { h: [21], m: [30] },
    { h: [21], m: [32] },
  ]
})
