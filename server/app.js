const later = require('later')

const handlerUpdate = require('./update')

// node app.js 设置自动更新
later.date.localTime()
later.setInterval(handlerUpdate, {
  schedules: [
    { h: [06], m: [00] },
    { h: [08], m: [00] },
    { h: [12], m: [00] },
    { h: [18], m: [00] },
    { h: [22], m: [00] },
	{ h: [23], m: [15] },
	{ h: [23], m: [20] },
	{ h: [23], m: [25] },
	{ h: [23], m: [30] },
	{ h: [23], m: [40] },
  ]
})