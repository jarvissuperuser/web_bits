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
    }
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
        }
    );
    var forms = root.forms;
    forms.forEach(function (form,idx) {
        $(form).submit(function (e) {
            e.preventDefault();
            var data = $(form).serializeArray();
            console.log({form:data,index:idx});
        }) ;
    });
});
function formsSPA(){
    var forms = root.forms;
    $(forms).each(
        function(id,form){
            var hashLocation = window.location.hash.substr(1,window.location.hash.length);
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
            cell.innerHTML = valueProcessor(undefined,key).bold();
            cell.style.padding = "10px 30px 10px ";
        };
        data.forEach(function(entry,key){
            row  = table.insertRow(key+1);
            var rowExtract = data[key];
            var count = 0;
            for(p in rowExtract){
                console.log(count);
                var cell = row.insertCell(count++);
                cell.innerHTML = valueProcessor(rowExtract[p],p);
            }
            $(row).get().reverse();
            
        });
//         console.log(table);
        
//         var cell = row.insertCell(0);
//         cell.innerHTML = "<b>T</b>";
//         var cell1 = row.insertCell(1);
//         cell1.innerHTML = "<b>T3xt3syhuitdoidofa</b>";
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