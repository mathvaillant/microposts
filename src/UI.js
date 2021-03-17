class UI {
  constructor() {
    this.posts = document.querySelector('#posts')
    this.title = document.querySelector('#title')
    this.body = document.querySelector('#body')
    this.id = document.querySelector('#id')
    this.postSubmit = document.querySelector('.post-submit')
    this.postEdit = document.querySelector('.post-edit')
    this.postCancel = document.querySelector('.post-cancel')
    this.formState = 'add'
  }

  displayPosts(posts) {
    let output = ''
    posts.map((post) => {
      output += `
      <div class='card mb-3'>
        <div class='card-body'>
          <h4 class='card-title'>${post.title}</h4>
          <p class='card-text'>${post.body}</p>
          <a href='#' class='edit card-link mr-4' data-id='${post.id}'>
            <i class='fa fa-pencil'></i>
          <a>


          <a href='#' class='delete card-link' data-id='${post.id}'>
            <i class='fa fa-remove'></i>
          <a>
        </div>
      </div>`
    })
    this.posts.innerHTML = output
  }

  clearfields() {
    this.title.value = ''
    this.body.value = ''
  }

  displayAlert(message, style) {
    // Get element
    const parentDiv = document.querySelector('.postsContainer')
    const cardInput = document.querySelector('.cardInput')

    // Create Div
    const div = document.createElement('div')
    div.className = `alert ${style} text-center`
    div.appendChild(document.createTextNode(message))

    // Append to parentDiv
    parentDiv.insertBefore(div, cardInput)

    // Remove div from UI
    setTimeout(() => {
      div.remove()
    }, 2000)
  }

  editState({ title, body, id }) {
    if (this.formState === 'edit') {
      this.id.dataset.id = id
      this.title.value = title
      this.body.value = body
      this.postSubmit.style.display = 'none'
      this.postEdit.style.display = 'block'
      this.postCancel.style.display = 'block'
    } else {
      this.id.dataset.id = ''
      this.title.value = ''
      this.body.value = ''
      this.postSubmit.style.display = 'block'
      this.postEdit.style.display = 'none'
      this.postCancel.style.display = 'none'
    }
  }
}

// Export the class
export const ui = new UI()
