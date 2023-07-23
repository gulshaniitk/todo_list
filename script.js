let tasks = [{"id":-2,"task":"Go to Office","completed":false,"category":"Office","priority":"High","duedate":"2024-09-10"},
{"id":-1,"task":"Go to village","completed":false,"category":"Family","priority":"Medium","duedate":"2024-10-12"},
{"id":-4,"task":"Go to market","completed":false,"category":"Personal","priority":"Low","duedate":"2023-11-10"}
];
var id = 0;
let filtered_task=tasks;




// fetch('https://jsonplaceholder.typicode.com/todos').then((response) => {
//     // console.log(response);
//     if (!response.ok) {
//         throw new Error('Network response was not OK');
//     }
//     return response.json();
// }).then((data) => {
//         // Process the received data
//          data.forEach((ele)=>{
//             if(!ele.completed)
//             {
//                 // console.log(ele);
//                 tasks.push({"id":id,"task":ele.title,"completed":false,"category":"personal","priority":"High","duedate":"2018-09-12"})
//                 id++;
//             }
//          })
//          filtered_task=tasks;
//          showtask(filtered_task);
//     })
//     .catch(error => {
//         // Handle any errors that occurred during the fetch request
//         console.log('Error:', error.message);
//     });


    let Check=(ele)=>{
        // console.log(ele);
        for(let i=0;i<tasks.length;i++)
        {
          if(tasks[i].id==ele)
          {
             tasks[i].completed=!tasks[i].completed;
          }
        }
     }


let showtask = (temp) => {

    let iscomplete=(checked)=>{
        if(checked) return "checked";

        return "";
    }

    let table=document.getElementById('table');
    table.innerHTML=`<tr><th>S.no</th><th>Task</th><th>Due Date</th>
    <th>Priority</th><th>Category </th><th>Completed</th><th>Edit</th><th>Delete</th></tr>`;

if(temp!=undefined)
{
    temp.forEach((ele,idx) => {

        let text = `<tr id="${ele.id}">
        <td ><p  class="table_data" >${idx+1}</p></td>
        <td><div class="p_task">${ele.task}</div></td>
        <td ><div class="table_data">${ele.duedate}</div></td>
        <td><div class="table_data">${ele.priority}</div></td>
        <td><div class="table_data">${ele.category}</div></td>
        <td><div class="table_data"><input type="checkbox" class="defaultCheckbox" onclick="Check(${ele.id})" name="Completed" ${iscomplete(ele.completed)}></div></td>
        <td><div class="table_data"><button class="del" onclick="Edit(${ele.id})">Edit</button></div></td>
        <td><div class="table_data"><button class="del" onclick="deletetask(${ele.id})">Delete</button></div></td> 
        </tr> `;
        table.innerHTML += text;
    })
}

    


}

let Edit=(x)=>{
   

  
    let ele=document.getElementById(x).children[1].children[0];
    let due=document.getElementById(x).children[2].children[0];
    let prio=document.getElementById(x).children[3].children[0];
    let cat=document.getElementById(x).children[4].children[0];
    let btn=document.getElementById(x).children[6].children[0].children[0];
    ele.style.border="2px solid black";
    ele.style.background="white";
   
   
    if(btn.innerText=="Save")
    {
        Save(x);
        
    }
    else
    {
    btn.innerText="Save";
    ele.contentEditable = true;
    // console.log(cat.innerText,cat.innerHTML);
    prio.innerHTML=`<select id="priority">
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
</select>`;

   cat.innerHTML=`<select id="category" name="category" >
   <option value="Office">Office</option>
   <option value="Personal">Personal</option>
   <option value="Family">Family</option>
   <option value="Friends">Friends</option>
</select>`;

 due.innerHTML=`<input type="date" id="duedate" value=${due.innerText}>`;
//  console.log(cat.innerText,cat.innerHTML);

    }

}

let Save=(x)=>{
    let ele=document.getElementById(x).children[1].children[0];
    let due=document.getElementById(x).children[2].children[0];
    let prio=document.getElementById(x).children[3].children[0];
    let cat=document.getElementById(x).children[4].children[0];
    // console.log(due.innerHTML,due.innerText, due.children[0].value,prio.children[0].value,cat.children[0].value);
    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].id==x)
        {
            tasks[i].task=ele.innerHTML;
            tasks[i].duedate=due.children[0].value;
            tasks[i].priority=prio.children[0].value;
            tasks[i].category=cat.children[0].value;
            // console.log(i,tasks[i])
            break;
        }
    }


    // console.log(due,prio,cat);

    ele.contentEditable=false;
    let due_val=due.children[0].value;
    due.innerHTML=due_val;
    let cat_val=cat.children[0].value;
    cat.innerHTML=cat_val;
    let prio_val=prio.children[0].value;
    prio.innerHTML=prio_val;

    ele.style.border="none";
    ele.style.background="lightyellow";
    let btn=document.getElementById(x).children[6].children[0].children[0];
    btn.innerText="Edit";
    // console.log(due,prio,cat);

}

let addtask = () => {

    document.getElementById('filter_priority').value="None";
    document.getElementById('filter_category').value="None";
    document.getElementById('filter_due').value="";
    document.getElementById('sorting').value="None";


    let task = document.getElementById("inputtext").value;
    let due=document.getElementById('duedate').value;
    let priority=document.getElementById('priority').value;
    let category=document.getElementById('category').value;
    document.getElementById('duedate').value="";
    document.getElementById('priority').value="High";
    document.getElementById('category').value="Office";


    document.getElementById("inputtext").value = "";


    if (task == "") {
        alert("Please enter some task");
    }
    else if(due=="")
    {
        alert("Please enter some due date");
    }
    else {
        tasks.push({ "id":id,"task":task,"completed":false,"duedate":due,"priority":priority,"category":category});
        id++;
        // console.log(tasks);
    }

    filtered_task=tasks;
    showtask(filtered_task);

}

let search=()=>{

    let temp=filter_();
    


    let str=document.getElementById('searchtext').value.toLowerCase();
    console.log(str);
    temp=temp.filter((ele,idx)=>{
        if(ele['task'].toLowerCase().indexOf(str)!=-1)
         return true;

        return false;
    })
    // console.log(temp);
    showtask(temp);

}

let show_all=()=>{

    document.getElementById('filter_priority').value="None";
    document.getElementById('filter_category').value="None";
    document.getElementById('filter_due').value="";
    document.getElementById('sorting').value="None";
   

    filtered_task=tasks;
    showtask(filtered_task);
}

let show_completed=()=>{

    document.getElementById('filter_priority').value="None";
    document.getElementById('filter_category').value="None";
    document.getElementById('filter_due').value="";
    document.getElementById('sorting').value="None";

    filtered_task=tasks.filter((ele,idx)=>{
        return ele['completed'];
    })
    showtask(filtered_task);
}


let show_pending=()=>{

    document.getElementById('filter_priority').value="None";
    document.getElementById('filter_category').value="None";
    document.getElementById('filter_due').value="";
    document.getElementById('sorting').value="None";

    filtered_task=tasks.filter((ele,idx)=>{
        return !ele['completed'];
    })
    showtask(filtered_task);
}

let filter_=()=>{
    let prior=document.getElementById('filter_priority').value;
    let due=document.getElementById('filter_due').value;
    let cat=document.getElementById('filter_category').value;
    let srt=document.getElementById('sorting').value;
    let temp=filtered_task;

    let str=document.getElementById('searchtext').value.toLowerCase();
    // console.log(str);
    temp=temp.filter((ele,idx)=>{
        if(ele['task'].toLowerCase().indexOf(str)!=-1)
         return true;

        return false;
    })



   if(prior!="None")
    {
        temp=temp.filter((ele,idx)=>{
            return ele['priority']==prior;
        })
      
    }

    if(cat!="None")
    {
        temp=temp.filter((ele,idx)=>{
            return ele['category']==cat;
        })
      
    }

    if(due!="")
    {
        // console.log(ele.duedate,due);
        temp=temp.filter((ele,idx)=>{
            return ele['duedate']==due;
        })
    }

    // console.log(temp);
   if(srt=="Task")
   {
    temp.sort(function (a, b) {
        let key1 = a.task;
        let key2 = b.task;
    
        if (key1 < key2) {
            return -1;
        } else if (key1 == key2) {
            return 0;
        } else {
            return 1;
        }
    });
    // console.log(temp);
   }


   if(srt=="Duedate")
   {
    temp.sort(function (a, b) {
        let key1 = new Date(a.duedate);
        let key2 = new Date(b.duedate);
    
        if (key1 < key2) {
            return -1;
        } else if (key1 == key2) {
            return 0;
        } else {
            return 1;
        }
    });
    // console.log(temp);
   }

   if(srt=="Category")
   {
    temp.sort(function (a, b) {
        let key1 = a.category;
        let key2 = b.category;
    
        if (key1 < key2) {
            return -1;
        } else if (key1 == key2) {
            return 0;
        } else {
            return 1;
        }
    });
    // console.log(temp);
   }


   if(srt=="Priority")
   {
    temp.sort(function (a, b) {
        let key1 = a.priority;
        let key2 = b.priority;

        console.log(key1,key2);
        if(key1=="Low") key1=0;
        else if(key1=="Medium") key1=1;
        else key1=2;

        if(key2=="Low") key2=0;
        else if(key2=="Medium") key2=1;
        else key2=2;

        console.log(key1,key2);
    
        if (key1 < key2) {
            return -1;
        } else if (key1 == key2) {
            return 0;
        } else {
            return 1;
        }
    });
    console.log(temp);
   }




    // console.log(srt);

    showtask(temp);
   
    return temp;
}




let deletetask = (x) => {

    // console.log(x);
    tasks = tasks.filter((ele) => ele.id != x);
    filtered_task=filtered_task.filter((ele) => ele.id != x);
    showtask(filtered_task);

}




setInterval(function () {

    let ele=document.getElementById('reminder');
    let count=0;
    for(let i=0;i<tasks.length;i++)
    {
        if(!tasks[i].completed && tasks[i].priority=='High')
        {
            count++;
        }
    }

ele.style.color=ele.style.color=="white"?"blue":"white";

    if(count==0)
{
  ele.innerHTML="";
}
else
{
    ele.innerHTML=` You have ${count} High priority task pending!`;
}

}, 1000);

