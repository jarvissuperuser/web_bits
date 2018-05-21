var root = {
    forms:document.querySelectorAll("form"),
    mockTableData:{
        students:[
        {
            profile:{"name":"test", "surname":"tester"},
            uid:"123",
            grade:"3",
            class:"7",
            modules:[
                "math","content","english","shona"
            ]
        },
        {
            profile:{"name":"rest", "surname":"rester"},
            uid:"124",
            grade:"3",
            class:"7",
            modules:[
                "math","ndebele","english","shona","science"
            ]
        }
        ],
        educators:[
            {
                profile:{"name":"fest", "surname":"fester"},
                uid:"125",
                modules:[
                    "math","content"
                ],
                pupils:[]
            },
            {
                profile:{"name":"jest", "surname":"jester"},
                uid:"126",
                modules:[
                    "math","content"
                ]
            }
            
        ],
        parents:[
            {},
            {}
        ]
        
    },
    logged:{
        uid:1,
        AUTH:"Session"
    },
    tableHideList:[2,4,5]
}
$(document).ready(function(){
    if (window.location.hash === ""){
        window.location.hash ="#register";
    }else{
        formsSPA();
    }
    $(window).on(
        "hashchange",
        function(e){
            formsSPA();
            $('title').text(location.hash.substring(1))
        }
    );
    var forms = root.forms;
    forms.forEach(function (form,idx) {
        $(form).submit(function (e) {
            e.preventDefault();
            var data = $(form).serializeArray();
            // console.log({form:data,index:idx});
            sendToServer("http://localhost/datasv.php",data);
        }) ;
    });
});
function formsSPA(){
    var forms = root.forms;
    $(forms).each(
        function(id,form){
            var hashLocation = window.location.hash.substr(1);
            if (form.id === hashLocation)
                $(form).fadeIn("fast");
            else
                $(form).hide("");
        }
    );
}
function tableCreate(data,depth){
    $("#data").empty();
    if (data){
        var table = document.createElement("table");;
        var header = table.createTHead();
        table.style = "text-align:center";
        var rowCount = 0;
        var row = header.insertRow(0);
        for(key in data[0]){
            var cell = row.insertCell(rowCount++);
            cell.innerHTML = valueProcessor(undefined,key).toUpperCase().bold();
            cell.style.padding = "10px 30px 10px ";
            if (hideCell(rowCount)){
                cell.classList.add("w3-hide-small");
            }
        };
        data.forEach(function(entry,key){
            row  = table.insertRow(key+1);
            var rowExtract = data[key];
            var count = 0;
            for(p in rowExtract){
                var cell = row.insertCell(count++);
                cell.innerHTML = valueProcessor(rowExtract[p],p);
                if (hideCell(count)){
                    cell.classList.add("w3-hide-small");
                }
            }
        });
        table.style.borderSpacing = 0;
        header.style = "background-color:black;color:white";
        
        //cell1.style.padding = "10px 30px 10px ";
        table.style.whiteSpace = "normal";
        document.getElementById("data").appendChild(table.cloneNode(true));
    }
    
}
function valueProcessor(str,key){
    switch(key){
        case "uid":
            return str?str:"students number";
        case "profile":
            return str?str.name + " " + str.surname :"name";
        default:
            return str?str:key;
    }
}
function hideCell(num){
    var a = false;
    root.tableHideList.some(function(entry,key){
        a = entry === num;
        return  a;
    });
    return a;
}

function sendToServer(addr,data){
    var reorgData = {};
    data.forEach(function (d) {
        reorgData[d.name] = d.value;
    });
    reorgData["submit"] = location.hash.substring(1);
    $.post(addr,reorgData,function (response) {
        alert(response);
    });
}