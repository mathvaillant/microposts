import { http } from '../api/http'
import { ui } from './UI'

// Event Listeners
document.addEventListener('DOMContentLoaded', getPosts)
document.querySelector('.post-submit').addEventListener('click', submitPost)
document.querySelector('#posts').addEventListener('click', removePost)
document.querySelector('#posts').addEventListener('click', enableEdit)
document.querySelector('.post-edit').addEventListener('click', editPost)
document.querySelector('.post-cancel').addEventListener('click', editCancel)

// GET Posts
function getPosts() {
  http
    .get('http://localhost:3000/posts/')
    .then((data) => {
      ui.displayPosts(data)
    })
    .catch((err) => console.log(err))
}

// POST new post
function submitPost(e) {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value

  const data = {
    title,
    body,
  }

  if (title !== '' && body !== '') {
    http
      .post(`http://localhost:3000/posts/`, data)
      .then((data) => {
        ui.clearfields()
        getPosts()
        ui.displayAlert('Post Added', 'alert-success')
      })
      .catch((err) => console.log(err))
  } else {
    ui.displayAlert('No blank spaces allowed!', 'alert-danger')
  }

  e.preventDefault()
}

// DELETE Post
function removePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = parseInt(e.target.parentElement.getAttribute('data-id'))

    if (confirm('Are you sure to delete the item?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((res) => {
          console.log(res)
          getPosts()
          ui.displayAlert('Post Successfully Removed', 'alert-warning')
        })
        .catch((err) => console.log(err))
    }
  }
  e.preventDefault()
}

// Enable Edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = parseInt(e.target.parentElement.dataset.id)

    http.get(`http://localhost:3000/posts/${id}`).then((data) => {
      ui.editState(data, (ui.formState = 'edit'), id)
    })
  }
}

// PUT post
function editPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value
  const id = document.querySelector('#id').dataset.id

  const data = {
    title,
    body,
  }

  if (title !== '' && body !== '') {
    http
      .put(`http://localhost:3000/posts/${id}`, data)
      .then((data) => {
        ui.editState((ui.formState = 'add'))
        ui.clearfields()
        getPosts()
        ui.displayAlert('Post Edited', 'alert-success')
      })
      .catch((err) => console.log(err))
  } else {
    ui.displayAlert('No blank spaces allowed!', 'alert-danger')
  }

  e.preventDefault()
}

// Cancel edit
function editCancel() {
  ui.editState((ui.formState = 'add'))
}
