const { Router } = require('express')
const Note = require('../models/note')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Add note',
    isAdd: true,
  })
})

router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
  })

  try {
    await note.save()
    res.redirect('/notes')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
