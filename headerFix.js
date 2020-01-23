class Node{
  constructor(element,prev){
    this.element = element;
    this.next = null;
    this.prev = prev;//needed?
    let headerTags = ['h1','h2','h3','h4','h5','h6'];
    if(!headerTags.includes(element.tagName.toLowerCase())){
      //not a header tag, check for role
      if(element.role !== 'header'){
        throw new TypeError('needs to be a H tag or have role set to header, to add non-header element use force header argument');
        
      }else{
        //has role header
        if(element.getAttribute('aria-level'))
          this.level = element.getAttribute('aria-level');
        else
          throw new Error('Header without a level');
      }
    }else{
      //a H tag
      this.level = Number(element.tagName.split('')[1]);
    }
  }
}//end node
class LL{
  constructor(){
    this.head = null;
    this.tail = null;//needed?

  }
  traverse(callback = ()=>false){
    let n = this.head;
    while(n.next){
      if(callback(n))
        return n;
      n= n.next;
    }
    return n;
  }
  _addAsNode(node){
    if(!this.head){
      //first element
      this.head = node;
      this.tail = this.head;
    }else{
      let cEnd = this.traverse();
      let end = node;
      cEnd.next = end;
      this.tail = end;
    }
  }
  push(element){
    if(!this.head){
      //first element
      this.head = new Node(element,null);
      this.tail = this.head;
    }else{
      let cEnd = this.traverse();
      let end = new Node(element,cEnd);
      cEnd.next = end;
      this.tail = end;
    }
  }
  pop(){
    let end = this.tail;
    this.traverse((n)=>n.next.next === null).next = null;
    return end;
  }
  fromArray(arr){
    arr.forEach(i=>this.push(i));
  }
}

function setHeaderLevelofNode(n,lvl){
  n.element.setAttribute('role','heading');
  n.element.setAttribute('role','heading');
}
function setHeaderLevelofElement(element,lvl){
  element.setAttribute('role','heading');
  element.setAttribute('role','heading');
}
function remHeaders(forcedHeader=null,ignore=null){//currently only take selector strings
  if(forcedHeader){
    setHeaderLevelofElement(document.querySelector(forcedHeader),'1');
  }
  let list = new LL();
  list.fromArray(document.querySelectorAll(':header'));
  let mainHeader = ll.traverse(n=>n.level===1);//create sub ll
  if(mainHeader.next===null){
  //there is no main header
    let logoHeader = document.querySelector('img[href="/"]');//main logo
    logoHeader.setAttribute('role','heading');
    logoHeader.setAttribute('aria-level','1');
    remHeaders();//restart function now that H1 is set
  }
  mainHeader.prev.next = null;
  mainHeader.prev = null;
  let subList = new LL();
  subList._addAsNode(mainHeader);//todo apply one step rules for sublist, for list aplly specialized checks
  //set any lvl 1 other than main to lvl 2
  let n = mainHeader.next;
  subList.traverse((n)=>{
    if(n.next.level ===1){
      setHeaderLevelofNode(n.next,'2');
    }
    return false;//goto end
  });
  let oneStepRule = (n)=>{
    let nextlvl = n.next.level;
    if(nextlvl > n.level + 2){
      //create a new grouping

    }

  };
}