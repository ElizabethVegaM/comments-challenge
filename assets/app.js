window.onload = () => {
  let getMessages = JSON.parse(window.localStorage.getItem('values'));
  console.log(getMessages);
  getMessages.forEach(element => {
    commentSection.innerHTML =  `<div id="commentNumber${element.id}" class="comment-container row">
    <div class="col s11">
      <textarea disabled  class="materialize-textarea" cols="30" rows="10">${element.text}</textarea>
    </div>
    <div class="col s1">
      <button id="removeComment${element.id}" onclick="removeComment(${element.id})" class="waves-effect waves-light btn">Eliminar</button>
    </div>
  </div>` + commentSection.innerHTML;
  });
};

let messageNumber = 0;
let comments = [];

publishBtn.addEventListener('submit', (event) => {
  event.preventDefault();
  let commentText = publishComment.value;
  if (commentText.length > 0) {
    messageNumber++;
    let newComment = {
      id: messageNumber,
      text: commentText
    }
    comments.push(newComment);
    console.log(comments);
    
    window.localStorage.setItem('values', JSON.stringify(comments));
    commentSection.innerHTML = `<div id="commentNumber${newComment.id}" class="comment-container row">
        <div class="col s11">
          <textarea disabled  class="materialize-textarea" cols="30" rows="10">${newComment.text}</textarea>
        </div>
        <div class="col s1">
          <button id="removeComment${newComment.id}" onclick="removeComment(${newComment.id})" class="waves-effect waves-light btn">Eliminar</button>
        </div>
      </div>` + commentSection.innerHTML;
      publishComment.value = '';
  }
})

const removeComment = (element) => {
  let position = element - 1;
  let filteredComments = comments.filter((value, index) => index !== position);
  console.log(filteredComments);
  window.localStorage.setItem('values', JSON.stringify(filteredComments));
  let commentContainer  = document.getElementById(`commentNumber${element}`);
  commentContainer.parentNode.removeChild(commentContainer);
};
