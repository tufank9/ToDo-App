const addTodoBtn = document.querySelector('.addTodoBtn') // todo ekleme butonu
const todoText = document.querySelector('.todoText') // todo yazma  alanı
const todolist = document.querySelector('.todo-text') // todo list alanı
const modal = document.querySelector('.modal') // modal ekranı
const close = document.querySelector('.close') // modal kapama
let todo;

if(localStorage.todo){
    todo=JSON.parse(localStorage.todo)
}
else{
    todo=[]
}

function saveToLocalStorage(){
    localStorage.setItem('todo', JSON.stringify(todo))
}
addTodoBtn.addEventListener('click', addGorev);
function getToDo(){
            todolist.innerHTML='';
            for(i=0; i<todo.length;i++){
                todolist.innerHTML+=
                `
                <div class="todo-list">
                        <div class="todo-info" id="${i}" ${todo[i].completed ? 'style="text-decoration: line-through;"' : ''} >
                            <span class="todo-text-span">${todo[i].gorev}</span>     
                            <button class="deleteBtn">❌</button>
                            <button class="editBtn" data-target >🖊️</button>
                            <button class="cmpBtn" >✅</button>
                        </div>
                </div>
                `
        }
    
    bindDeleteBtns();
    bindEditBtns();
    bindOkeyBtns();
}

function addGorev(){
    const answer = todoText.value; 
    todoText.value = "";
    if(answer !== ""){
        todo.push({gorev:answer, completed:false});
        saveToLocalStorage();
        getToDo();
         
    }   
}
function bindDeleteBtns(){
    const deleteBtns=document.querySelectorAll('.deleteBtn'); 
    for(const deleteBtn of deleteBtns){
        deleteBtn.addEventListener('click', function(){
            const taskId=Number(this.parentElement.id);
            todo.splice(taskId,1)
            saveToLocalStorage()
            getToDo()
        })
    }
}

function bindEditBtns() {
    const editBtns = document.querySelectorAll('.editBtn');
    const spanText = document.querySelectorAll('.todo-text-span');
    for (const editBtn of editBtns) {
      editBtn.addEventListener('click', function () {
        const answer = prompt("Ne ile değiştirmek istersiniz?");
        const span = this.parentNode.querySelector('.todo-text-span');
        span.textContent = answer;
        saveToLocalStorage();
      });
    }
  }

  function bindOkeyBtns() {
    const okeyBtns = document.querySelectorAll('.cmpBtn');
    for (const okeyBtn of okeyBtns) {
      okeyBtn.addEventListener('click', function () {
        const taskId = Number(this.parentElement.id);
        todo[taskId].completed = !todo[taskId].completed;
        const spanText = this.parentNode.querySelector('.todo-text-span');
        spanText.style.textDecoration = todo[taskId].completed ? 'line-through' : 'none';
        saveToLocalStorage();
      });
    }
  }
  
  
  
  


// SHOW MODAL EKLE KALAN BİNDLARI TAMMALA. 

getToDo()