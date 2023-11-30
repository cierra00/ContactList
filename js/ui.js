const tasks = document.querySelector(".tasks")

document.addEventListener("DOMContentLoaded", function () {
    //Nav Menu
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, { edge: "right" });
    // Add Tasks
    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, { edge: "left" });
  });

  function greeting(name){
    alert(`Hello ${name}`);
  }
  
  const renderTask = (data, id) => {
    const html = `
    <div class="card-panel task white row" data-id ="${id}">
              <img src="/img/task.png" class="responsive-img materialboxed" alt="">
              <div class="task-detail">
                  
                  <div class="task-title"> ${data.firstName} ${data.lastName}</div>
                    
                  <div class="task-description">${data.email}</div>
                  <div class="task-description"> ${data.phone}</div>
                  <div class="task-description"> https://${data.website}</div>
                  
              </div>
              <div class="task-edit">
              <i class="material-icons" data-id ="${id}">outlinededit</i>
              </div> 
              <div class="task-delete">
                  <i class="material-icons" data-id ="${id}">delete_outline</i>
              </div>
          </div>
    `;
  
    tasks.innerHTML += html;
  };