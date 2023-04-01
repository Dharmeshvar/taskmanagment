      
            var tr;
            var arr= [];
            var arrtime=[];
            if (localStorage.getItem("tasks")){
                arr=JSON.parse(localStorage.getItem("tasks"))
                display()
            }
            document.getElementById('btn').addEventListener('click',create);
            setInterval(()=>{
                let d = new Date();
                console.log(parseInt(d.getTime()/1000));
                if(arrtime.includes(parseInt(d.getTime()/1000))){
                    document.getElementById("alarm").play();
                    alert(parseInt(d.getTime()/1000/60/60));
                }
            },1000);
            function create(){
                let d = new Date(document.getElementById('date1').value);
                let newd = parseInt(d.getTime()/1000);
                arr.push({
                    title1:document.getElementById('task1').value,
                    date1:document.getElementById('date1').value,
                    select1:document.getElementById('select1').value
                })

                arrtime.push(newd)
                  
                console.log(arr)
                console.log(arrtime)
                display()
                }
            function display(){
                
                localStorage.setItem("tasks",JSON.stringify(arr))
                localStorage.setItem("times",JSON.stringify(arrtime))
                document.getElementById('map1').innerHTML=null; 
                let d;
                arr.map((data,key)=>{
                    console.log(data)
                    tr=document.createElement('tr');
                    d=new Date(data.date1);
                    tr.innerHTML=`
                    <td><input type="text" placeholder="Enter your task" id="task1${key}" value="${data.title1}"></td>
                    <td><input type="datetime-local" id="date1${key}" value="${data.date1}"></td>
                    <td>
                        <select class="child-select" align="center" id="select1${key}">
                            <option>select1</option>
                            <option ${data.select1 == '1'?"selected":""}>1</option>
                            <option ${data.select1 == '2'?"selected":""}>2</option>
                            <option ${data.select1 == '3'?"selected":""}>3</option>
                            <option ${data.select1 == '4'?"selected":""}>4</option>
                        </select>
                    </td>
                   
                    <td onclick="del(${key})"><img src="images/del.png" width="25px"> </td>
                    <td onclick="upd(${key})"><img src="images/up.png" width="25px"></td>
                    `;
                    document.getElementById('map1').appendChild(tr);        
                })   
              }
            function del(k){ // jis index number par click kr rhe h usi index ka nunmber k me as value aa rha h     
                var temp=[];
                arr.map((data,key)=>{
                    if (key!=k){
                        temp.push(data);                       
                    }
                })
                arr=temp;
                display();
              }
            function cleardata(){
                arr=[];
                localStorage.removeItem("tasks");
                display()
              }        
            function upd(k){
                var temp=[];
                arr.map((data,key)=>{
                   if (key!=k){
                    temp.push(data);
                   }else{
                      temp.push({
                         title1:document.getElementById('task1'+k).value,
                         date1:document.getElementById('date1'+k).value,   
                         select1:document.getElementById('select1'+k).value,
                      })
                    }
                 })
                 arr=temp;
                 display();
              }

            function search(){
                
                localStorage.setItem("tasks",JSON.stringify(arr))
                document.getElementById('map1').innerHTML=null; 
                arr.map((data,key)=>{
                
                 if (data.title1==document.getElementById('searchdata').value){
                    tr=document.createElement('tr');
                    tr.innerHTML=`
                    <td><input type="text" placeholder="Enter your task" id="task1${key}" value="${data.title1}"></td>
                    <td><input type="date" id="date1${key}" value="${data.date1}"></td>
                    <td>
                        <select class="child-select" align="center" id="select1${key}">
                            <option>select1</option>
                            <option ${data.select1 == '1'?"selected":""}>1</option>
                            <option ${data.select1 == '2'?"selected":""}>2</option>
                            <option ${data.select1 == '3'?"selected":""}>3</option>
                            <option ${data.select1 == '4'?"selected":""}>4</option>
                        </select>
                    </td>
                    <td onclick="del(${key})"><img src="images/del.png" width="25px"> </td>
                    <td onclick="upd(${key})"><img src="images/up.png" width="25px"></td>
                    `;
                    document.getElementById('map1').appendChild(tr);
                 }
             })   
         }
       
      