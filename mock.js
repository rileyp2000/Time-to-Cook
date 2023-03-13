const express = require('express');
const app = express();
const port = 3000;

  app.get('title', (req, res) => {
    res.send('GET request for title')
  })
  
  // POST method route
  app.post('title', (req, res) => {
    res.send('POST request for title')
  })

  app.get('time', (req, res) => {
    res.send('GET request for time')
  })
  
  // POST method route
  app.post('time', (req, res) => {
    res.send('POST request for time')
  })

  app.get('energy', (req, res) => {
    res.send('GET request for energy')
  })
  
  // POST method route
  app.post('energy', (req, res) => {
    res.send('POST request for energy')
  })

  app.get('mealType', (req, res) => {
    res.send('GET request for mealType')
  })
  
  // POST method route
  app.post('mealType', (req, res) => {
    res.send('POST request for mealType')
  })

  app.get('utensils', (req, res) => {
    res.send('GET request for utensils')
  })
  
  // POST method route
  app.post('utensils', (req, res) => {
    res.send('POST request for utensils')
  })
  
  app.get('ingredients', (req, res) => {
    res.send('GET request for ingredients')
  })
  
  // POST method route
  app.post('ingredients', (req, res) => {
    res.send('POST request for ingredients')
  })

  app.get('steps', (req, res) => {
    res.send('GET request for steps')
  })
  
  // POST method route
  app.post('steps', (req, res) => {
    res.send('POST request for steps')
  })

  app.get('image', (req, res) => {
    res.send('GET request for image')
  })
  
  // POST method route
  app.post('image', (req, res) => {
    res.send('POST request for image')
  })

  app.get('filters', (req, res) => {
    res.send('GET request for filters')
  })
  
  // POST method route
  app.post('filters', (req, res) => {
    res.send('POST request for filters')
  })
  

//options::
title: {}
time: {}
energy: {}
mealType: {}
utensils: {}
ingredients: {}
steps: {}
image: {}
filters: {}
