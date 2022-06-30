const Parser = require('rss-parser')
const Async = require('async')

const utils = require('./utils')

require('dotenv').config()

async function fetchFeed(rss) {
  const parser = new Parser({
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
    },
  })

  try {
    const feed = await parser.parseURL(rss)
    if (feed) {
      utils.logSuccess('成功 RSS: ' + rss)
      return feed
    }
  } catch (e) {}

  utils.logWarn('失败 RSS: ' + rss)
  return true
}

async function initFetch(rssItem, onFinish) {
  const envRss = process.env['RSS_' + rssItem.id]
  let rssArray = rssItem.rss

  if (typeof rssArray === 'string') {
    rssArray = [rssArray]
  }

  if (envRss) {
    rssArray.unshift(envRss)
  }

  const tasks = rssArray.map((rss) => ((callback) => {
    ((async () => {
      const feed = await fetchFeed(rss)

      if (feed === true) {
        callback(true)
      } else {
        callback(null, feed)
      }
    })())
  }))

  utils.log('开始 RSS: ' + rssItem.title)

  return new Promise((resolve) => {
    Async.tryEach(tasks, (err, res) => {
      utils.log('完成 RSS: ' + rssItem.title)
      resolve(err ? null : res)
    })
  })
}

module.exports = initFetch