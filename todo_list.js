function addTask(description, dueTime) {
    const newLi = document.createElement('li');
    const span = document.createElement("span");
    const button = document.createElement("button");

    newLi.textContent = description;

    if (dueTime == undefined) {
        newLi.appendChild(button);
        button.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'done');
        button.textContent = 'Done';
    
        document.querySelector('ul').append(newLi);   

        button.addEventListener('click', deleteList);   
    }
    else {
        newLi.appendChild(span);
        span.classList.add('due');
        span.textContent = 'due ' + dueTime;
        
        newLi.appendChild(button);
        button.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'done');
        button.textContent = 'Done';
     
        document.querySelector('ul').append(newLi);   
       
        button.addEventListener('click', deleteList);   
    } 
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

//delete List
function deleteList(event) {
    event.target.parentNode.remove();
}

//when click Add Task btn
document.querySelector('#add_task').addEventListener('click', (e) => {
    var duedate_element = document.querySelector('#duedate_input');
    var duetime_element = document.querySelector('#duetime_input');
    var dueTimeStamp = dateAndTimeToTimestamp(duedate_element, duetime_element);
    var dueBy = new Date(dueTimeStamp).toLocaleString();
    
    if (dueTimeStamp == false) {
        addTask(input.value);
        input.value = '';
    }
    else {
        addTask(input.value, dueBy);

        input.value = '';
        duedate_element.value = '';
        duetime_element.value = '';
    }
});


//enter key
var input = document.querySelector('#task_description_input');

input.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        var duedate_element = document.querySelector('#duedate_input');
        var duetime_element = document.querySelector('#duetime_input');
        var dueTimeStamp = dateAndTimeToTimestamp(duedate_element, duetime_element);
        var dueBy = new Date(dueTimeStamp).toLocaleString();
        
        if (dueTimeStamp == false) {
            addTask(input.value);
            input.value = '';
        }
        else {
            addTask(input.value, dueBy);

            input.value = '';
            duedate_element.value = '';
            duetime_element.value = '';
        }
    }
});