renderJobs();

document.getElementById("create-job").addEventListener("click", function(){
    this.style.display = "none";
    let jobCreationForm = document.createElement("form");
    let jobName = document.createElement("input");
    jobName.id = "job-name-input";
    jobName.placeholder = "Write appointment"
    jobCreationForm.appendChild(jobName);

    let jobDescription = document.createElement("input");
    jobDescription.id = "description-input";
    jobDescription.placeholder = "What is your job about?";
    jobCreationForm.appendChild(jobDescription);

    let jobSalary = document.createElement("input");
    jobSalary.placeholder = "Salary that you can pay";
    jobSalary.id = "salary-input";
    jobCreationForm.appendChild(jobSalary);

    let createButton = document.createElement("button");
    createButton.type = "submit";
    createButton.textContent = "Create"
    jobCreationForm.appendChild(createButton)

    this.parentNode.insertBefore(jobCreationForm, this);

    jobCreationForm.addEventListener("submit", function(event){
        event.preventDefault();
        createJob();
        
    })
});

async function idCreation(){
    const jobsData = await fetch("https://6129ebf1068adf001789b975.mockapi.io/api/jobs");
    let jobs = await jobsData.json();
    return jobs[jobs.length-1].id+1;
}
  
async function createJob(){
    let job = {
        createdAt: Date.now(),
        name: document.getElementById("job-name-input").value,
        description: document.getElementById("description-input").value,
        salary: document.getElementById("salary-input").value,
        id: idCreation()
    }
    console.log(job)

    let response = await fetch("https://6129ebf1068adf001789b975.mockapi.io/api/jobs",{
        method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(job)
    });
    createJobContainer(job);
}



async function renderJobs(){
    const jobsData = await fetch("https://6129ebf1068adf001789b975.mockapi.io/api/jobs");
    let jobs = await jobsData.json();
    jobs.forEach((job)=>createJobContainer(job))
}

function createJobContainer(job){
        let jobBlock = document.createElement("div");

        let jobInfo = document.createElement("div");

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
        
        jobBlock.appendChild(jobInfo);

        let removeButton = document.createElement("button");
        removeButton.addEventListener("click", removeJob);
        removeButton.textContent = "REMOVE";
        removeButton.setAttribute("id", job.id);
        jobBlock.appendChild(removeButton);

        let editButton = document.createElement("button");
        editButton.addEventListener("click", editJob);
        editButton.textContent = "EDIT";
        jobBlock.appendChild(editButton);

        document.body.appendChild(jobBlock);

}

async function removeJob(){
    let response = await fetch(`https://6129ebf1068adf001789b975.mockapi.io/api/jobs/${this.id}`, {
        method: 'DELETE',
    });
    let result = await response.json();
    this.parentNode.remove()
    renderJobs()
}

function editJob(){
    let jobEditForm = document.createElement("form");

    let jobName = document.createElement("input");
    jobName.id = "job-name-input";
    jobName.placeholder = "Write appointment";
    jobName.value = this.
    jobCreationForm.appendChild(jobName);
}

