//<reference="headerFix.js"/>

Node.assignWeight = ()=>{

    this.weight = 0;
    let count = 0;
    let n = this.Element;
    while(n !== document.body){
        count++;
        n=n.parentelement;
    }

};

