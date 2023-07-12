const reminderForm = document.getElementById("reminder-form");
const reminderInput = document.getElementById("reminder-input");
const inputMessage = document.getElementById("message");
const reminderList = document.getElementById("reminder-list");
const filterReminders = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

// add a new reminder
function onAddSubmit(e){
    e.preventDefault();

    let newReminder = reminderInput.value;

    // check if there's anything in the input
    if(newReminder === ""){
        inputMessage.classList.remove("hidden");
        inputMessage.textContent = "Please add a reminder";

        // remove message after 3 seconds
        setTimeout(() => {
            inputMessage.textContent = "";
        }, 3000);

        return;
    }

    // add reminder to DOM
    addReminder(newReminder);

    // clear input
    reminderInput.value = "";

    checkUI();
}

// add reminder element to DOM
function addReminder(item){
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));

    const button = createButton("btn-link message-text");
    li.appendChild(button);

    reminderList.appendChild(li);
}

// reminder button with icon
function createButton(classes){
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);

    return button;
}

// reminder element button icon
function createIcon(classes){
    const icon = document.createElement("i")
    icon.className = classes;

    return icon;
}

// remove single reminder onClick
function onReminderClick(e){
    if(e.target.parentElement.classList.contains("btn-link")){
        removeReminder(e.target.parentElement.parentElement);
    }
}

// remove single reminder function
function removeReminder(reminder){
    
    if(confirm("Are you sure?")){
        reminder.remove();

        checkUI();
    }

}

// check UI status
function checkUI(){
    const reminders = reminderList.querySelectorAll("li");

    if(reminders.length === 0){
        clearBtn.style.display = "none";
        filterReminders.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        filterReminders.style.display = "block";
    }

}

// remove all the reminders
function clearAllReminders(){

    while(reminderList.firstChild){
        reminderList.removeChild(reminderList.firstChild);
    }

    checkUI();
}

checkUI();

// initialize app
function init(){
    reminderForm.addEventListener("submit", onAddSubmit);
    reminderList.addEventListener("click", onReminderClick);
    clearBtn.addEventListener("click", clearAllReminders)
}

init();