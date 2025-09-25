const taskInput = document.getElementById("inputTask");
const addTaskBtn = document.getElementById("addTaskButton");
const taskListContainer = document.querySelector(".ul-container");
const taskArray = [];

function renderTasks() {
  taskListContainer.innerHTML = "";

  if (taskArray.length == 0) {
    const li = document.createElement("li");
    li.textContent = `No tasks yet`;
    li.className = "NoTask";
    taskListContainer.appendChild(li);
     completeMessage.innerHTML = "";
    return;
  }

  taskArray.forEach(function (newtask, index) {
    const li = document.createElement("li");
    li.className =
      "li-class d-flex align-items-center justify-content-between mt-2";

    const btnContainer = document.createElement("div");
    btnContainer.className =
      "li-class d-flex align-items-center justify-content-around gap-1";

    const deletebtn = document.createElement("button");
    deletebtn.className = "delete btn btn-light p-2";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "bx bx-trash";

    deletebtn.addEventListener("click", function () {
      taskArray.splice(index, 1);
      renderTasks();
    });

    const editbtn = document.createElement("button");
    editbtn.className = "edit btn btn-light p-2";

    const editIcon = document.createElement("i");
    editIcon.className = "bx bx-edit-alt";

    editbtn.addEventListener("click", function () {
      const updatedText = prompt("Edit your task:", taskArray[index].text);
      if (updatedText !== null && updatedText.trim() !== "") {
        taskArray[index].text = updatedText.trim();
        renderTasks();
      }
    });

    const leftContainer = document.createElement("div");
  leftContainer.className = "d-flex align-items-center gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = newtask.completed;

    const taskTextSpan = document.createElement('span')
    taskTextSpan.textContent = newtask.text
   if (newtask.completed) {
    taskTextSpan.style.textDecoration = "line-through";
    editbtn.disabled= true;
  } 

    checkbox.addEventListener("change", function () {
      newtask.completed = checkbox.checked;
      renderTasks();
    });

    const completeMessage = document.getElementById("completeMessage");
    allTaskCompleted = taskArray.length > 0 && taskArray.every(task => task.completed);
    if(allTaskCompleted){
completeMessage.innerHTML = `You have completed, Greate job!!`;
    }else {
  completeMessage.innerHTML = "";
}


 leftContainer.appendChild(checkbox);
  leftContainer.appendChild(taskTextSpan);

    editbtn.appendChild(editIcon);
    deletebtn.appendChild(deleteIcon);
    btnContainer.appendChild(editbtn);
    btnContainer.appendChild(deletebtn);
    li.appendChild(leftContainer);
    li.appendChild(btnContainer);
    taskListContainer.appendChild(li);
  });
}

renderTasks();

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  console.log("🚀 ~ taskText:", taskText)
  if (taskText != "") {
    taskArray.push({text:taskText, completed: false});
    taskListContainer.innerHTML = "";
    
    renderTasks();
  }

  taskInput.value = "";
});
