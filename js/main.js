let jobsList = document.getElementById("jobs-container");

renderJobs();

document.getElementById("create-job").addEventListener("click", jobPopup)
  
async function createJob(){
    let job = {
        createdAt: Date.now(),
        name: document.getElementById("job-name-input").value,
        description: document.getElementById("description-input").value,
        salary: document.getElementById("salary-input").value,
        }
    let response = await fetch("https://6129ebf1068adf001789b975.mockapi.io/api/jobs",{
        method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(job)
    });
    renderJobs()
}



async function renderJobs(){
    while(jobsList.firstChild){
        jobsList.firstChild.remove()
    }
    const jobsData = await fetch("https://6129ebf1068adf001789b975.mockapi.io/api/jobs");
    let jobs = await jobsData.json();
    jobs.forEach((job)=>createJobContainer(job))
}

function createJobContainer(job){
        let jobBlock = document.createElement("div");
        jobBlock.className = "job-block";
        jobBlock.id = job.id

        let jobInfo = document.createElement("div");
        jobInfo.className = "job-info";

        let jobName = document.createElement("p");
        jobName.textContent = `${job.name}`;
        jobName.className = "job-name";
        jobInfo.appendChild(jobName);

        let jobDescription = document.createElement("p");
        jobDescription.textContent = `${job.description}`;
        jobDescription.className = "job-description";
        jobInfo.appendChild(jobDescription);

        let jobSalary = document.createElement("p");
        jobSalary.textContent = `${job.salary}`;
        jobSalary.className = "job-salary";
        jobInfo.appendChild(jobSalary);

        let postTime = document.createElement("p");
        postTime.textContent = `Posted ${timeSince(job.createdAt)}`;
        postTime.className = "post-time";
        jobInfo.appendChild(postTime);
        
        jobBlock.appendChild(jobInfo);

        let editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.addEventListener("click", jobPopup);
        editButton.textContent = "EDIT";
        jobBlock.appendChild(editButton);

        let removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.addEventListener("click", removeJob);
        removeButton.textContent = "REMOVE";
        jobBlock.appendChild(removeButton);

        jobsList.appendChild(jobBlock);

}

async function removeJob(){
    let response = await fetch(`https://6129ebf1068adf001789b975.mockapi.io/api/jobs/${this.parentNode.id}`, {
        method: 'DELETE',
    });
    let result = await response.json();
    renderJobs()
}
function jobPopup(){
    let popup = document.createElement("div");
    popup.id = "popup";

    let jobCreationForm = document.createElement("form");
    jobCreationForm.id = "popup-content";
    popup.appendChild(jobCreationForm);

    let jobName = document.createElement("input");
    jobName.id = "job-name-input";
    jobName.placeholder = "Write appointment"
    jobCreationForm.appendChild(jobName);

    let jobDescription = document.createElement("textarea");
    jobDescription.id = "description-input";
    jobDescription.placeholder = "What is your job about?";
    jobCreationForm.appendChild(jobDescription);

    let jobSalary = document.createElement("input");
    jobSalary.placeholder = "Salary that you can pay";
    jobSalary.id = "salary-input";
    jobCreationForm.appendChild(jobSalary);

    let confirmButton = document.createElement("button");
    confirmButton.id = "confirm";
    confirmButton.type = "submit";
    jobCreationForm.appendChild(confirmButton);

    document.body.appendChild(popup);

    window.onclick = function(e){
        if(e.target === popup){
            popup.remove()
        }
    }

    let jobBlock = this.parentNode
    if(this.id != "create-job"){
        jobName.value = this.parentNode.firstChild.firstChild.textContent;
        jobDescription.value = this.parentNode.firstChild.firstChild.nextElementSibling.textContent;
        jobSalary.value = this.parentNode.firstChild.firstChild.nextElementSibling.nextElementSibling.textContent;
        confirmButton.textContent = "Confirm Edit"

        confirmButton.addEventListener("click", function(event){
            event.preventDefault();
            editJob(jobBlock);
            popup.remove();
        })
    }

    else{
        confirmButton.textContent = "Create a new Job"
        confirmButton.addEventListener("click", function(event){
            event.preventDefault();
            createJob(this);
            popup.remove()
        })
    }
    
    
}

async function editJob(changedBlock){
    let editedJob = {
        name: document.getElementById("job-name-input").value,
        description: document.getElementById("description-input").value,
        salary: document.getElementById("salary-input").value,
    }
    console.log(changedBlock)
    let response = await fetch(`https://6129ebf1068adf001789b975.mockapi.io/api/jobs/${changedBlock.id}`,{
        method: 'PUT',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(editedJob)
    });
    renderJobs()
}


function timeSince(date) {

    let seconds = Math.floor((new Date() - date) / 1000);
  
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      interval = Math.floor(interval);
     return interval === 1 ? interval + " year ago" : interval + " years ago"
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        interval = Math.floor(interval);
        return interval === 1 ? interval + " month ago" : interval + " months ago"
    }
    interval = seconds / 86400;
    if (interval > 1) {
        interval = Math.floor(interval);
        return interval === 1 ? interval + " day ago" : interval + " days ago"
    }
    interval = seconds / 3600;
    if (interval > 1) {
        interval = Math.floor(interval);
        
        return interval === 1 ? interval + " hour ago" : interval + " hours ago"
    }
    interval = seconds / 60;
    if (interval > 1) {
        interval = Math.floor(interval);
        return interval === 1 ? interval + " minute ago" : interval + " minutes ago"    
    }

    interval = Math.floor(interval);
        console.log(interval)
    if(interval === 0){
        return " just now"
    }
    return interval + " seconds ago";
  }
  