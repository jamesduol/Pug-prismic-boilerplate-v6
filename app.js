/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config()

const fetch = require('node-fetch')
// const logger = require('morgan')
const path = require('path')
const express = require('express')
const errorHandler = require('errorhandler')
// const bodyParser = require('body-parser')
// const methodOverride = require('method-override')

const app = express()
const port = process.env.PORT || 3000

// app.use(logger('dev'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(errorHandler())
// app.use(methodOverride())
// app.use(express.static(path.join(__dirname, 'public')))

const Prismic = require('@prismicio/client')
const PrismicH = require('@prismicio/helpers')
// const { application } = require('express')
// const UAParser = require('ua-parser-js')

// Initialize the prismic.io api
const initApi = (req) => {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
    fetch
  })
}

// LinkResolver
const handleLinkResolver = doc => {
  // if (doc.type === 'category') {
  //   return '/category/' + doc.uid
  // }
  // if (doc.type === 'product') {
  //   return '/product/' + doc.uid
  // }

  return '/'
}

// Middleware
app.use((req, res, next) => {
  // res.locals.ctx = {
  //   endpoint: process.env.PRISMIC_ENDPOINT,
  //   linkResolver: handleLinkResolver
  // }

  // Detetions
  // const ua = UAParser(req.headers['user-agent'])

  // res.locals.isDesktop = ua.device.type === undefined
  // res.locals.isPhone = ua.device.type === 'mobile'
  // res.locals.isTablet = ua.device.type === 'tablet'

  // res.locals.Link = handleLinkResolver

  res.locals.PrismicH = PrismicH

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleRequest = async (api) => {
  // const [work, study, preloader, navigation, meta, home, contact, about] =
  //   await Promise.all([
  //     api.getSingle('work'),
  //     api.getSingle('study'),
  //     api.getSingle('preloader'),
  //     api.getSingle('navigation'),
  //     api.getSingle('meta'),
  //     api.getSingle('home'),
  //     api.getSingle('contact'),
  //     api.getSingle('about')
  //   ])

  // return {
  //   about,
  //   home,
  //   meta,
  //   navigation,
  //   preloader
  // }
}

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const home = await api.getSingle('home')
  const meta = await api.getSingle('meta')
  // const product = await api.getByUID('product', req.params.uid)

  console.log('home')
  // console.log(home.data.body)

  // home.data.body.forEach(media => {
  //   console.log(media)
  // })

  res.render('pages/home', {
    home,
    meta
    // product
  })
})

app.get('/about', (req, res) => {
  res.render('pages/about')
})

app.get('/contact', (req, res) => {
  res.render('pages/contact')
})

app.listen(port, () => {
  console.log(`App Server listening at http://localhost:${port}`)
})
