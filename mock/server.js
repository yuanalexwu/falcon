const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const homeApi = require('./home/home_request')

const app = express()

const PORT = 9999
// const API_PREFIX = '/api'
// const HOME_PATH = `${API_PREFIX}/home`

// parse json data from POST
app.use(bodyParser.json())
// add middleware for logging
app.use(morgan('combined'))

/**
 * HOME
 */
// Get home config
app.post('/api/home', function (req, res) {
  const jsonData = req.body
  const {action = ''} = jsonData
  let data
  if (action === 'getHomeConfig') {
    console.log('getHomeConfig')
    data = homeApi.getHomeConfig()
  } else if (action === 'updateHomeConfig') {
    const {config = []} = jsonData
    data = homeApi.updateHomeConfig(config)
  } else if (action === 'getHomeData') {
    data = homeApi.getHomeData()
  } else {
    res.json({
      status: 400,
      msg: '无效请求',
      devmsg: ''
    })
    return
  }
  const responseData = {
    status: 200,
    msg: '成功',
    devmsg: '',
    data
  }
  res.json(responseData)
})

app.listen(PORT, function () {
  console.log(`Api server is running on ${PORT}`)
})
