class CustLogin extends HTMLElement{
    constructor(){
        super();
        shadow = this.shadowDeclare();
        // console.log(shadow.isConnected);
    }
    static get is(){return "auth-element"}
    shadowDeclare(){
        var imprt = document.querySelector("link[rel='import']");
        var template = imprt.import.querySelector("template");
        var content = template.content;
        var point = this.attachShadow({mode:"open"});
        point.appendChild(content.cloneNode(true));
        return point;
    }

}
customElements.define(CustLogin.is,CustLogin);