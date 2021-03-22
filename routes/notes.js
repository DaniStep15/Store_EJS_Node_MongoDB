const { Router } = require('express')
const Note = require('../models/note')
const router = Router()

router.get('/', async (req, res) => {
  const notes = await Note.find()
  res.render('notes', {
    title: 'Notes',
    isNotes: true,
    notes,
  })
})

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }

  const notes = await Note.findById(req.params.id)

  res.render('notes-edit', {
    title: `Edit ${notes.title}`,
    notes,
  })
})

router.post('/edit', async (req, res) => {
  const { id } = req.body
  delete req.body.id
  await Note.findByIdAndUpdate(id, req.body)
  res.redirect('/notes')
})

router.post('/remove', async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.body.id })
    res.redirect('/notes')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
