const fs = require('fs')
const path = require('path')
const faker = require('faker')

const home_request = {
  getHomeConfig () {
    const rawData = fs.readFileSync(path.join(__dirname, 'home_config.json'), 'utf-8')
    const data = JSON.parse(rawData)
    return data
  },
  updateHomeConfig (config) {
    console.log('updateHomeConfig() ', config)
    return ''
  },
  getHomeData () {
    const rawData = fs.readFileSync(path.join(__dirname, 'home_data.json'), 'utf-8')
    const data = JSON.parse(rawData)
    return data
  }
}

module.exports = home_request
