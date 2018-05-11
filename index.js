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
    var forms = shadow.querySelectorAll("form");
    forms.forEach(function (form,idx) {
        $(form).submit(function (e) {
            e.preventDefault();
            var data = $(form).serializeArray();
            console.log(data);
        }) ;
    });
});
function formsSPA(){
    var forms = shadow.querySelectorAll("form");
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