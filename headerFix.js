class Node{
  constructor(element,prev){
    this.element = element;
    this.weight = 0;
    this.next = null;
    this._lvlChanged = false;
    this.prev = prev;//needed?
    let headerTags = ['h1','h2','h3','h4','h5','h6'];
    this.assignWeight();
    if(!headerTags.includes(element.tagName.toLowerCase())){
      //not a header tag, check for role
      if(element.getAttribute('role') !== 'heading'){
        throw new TypeError('needs to be a H tag or have role set to heading, to add non-header element use force header argument');
        
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
  setLevel(lvl){
    this._lvlChanged = true;
    this.level = lvl;

  }
  assignWeight(){
    let count = 0;
    let n = this.element;
    while(n !== document.body){
      count++;
      n=n.parentElement;
    }
    this.weight = count;
  
  }
  updateLvl(){
    if(this._lvlChanged){
      this.element.setAttribute('role','heading');
      this.element.setAttribute('aria-level',this.level);
      this._lvlChanged = false;
    }
  }
}//end node
class LL{
  constructor(){
    this.head = null;
    this.tail = null;//needed?
    this.mainHeader;

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
  _display(){
    let output = '';
    this.traverse(n=>{
      output += n.element.attributes['aria-level'] ? n.element.tagName + '(level '+ n.element.getAttribute('aria-level') + ') weight( '+ n.weight + ' ) ->' :  n.element.tagName + ' weight( '+ n.weight + ' ) -> ';
    });
    return output;
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
let oneStepRule = (current)=>{
  let nextlvl = current.next.level;
  if(nextlvl > current.level ){
    if(Math.abs(nextlvl - current.level) >= 2 ){//out side range
      current.next.setLevel(current.level + 1);
      current.next.updateLvl();
    }
  
  }else if(nextlvl < current.level){//todo this is wrong, i want a diff of more than 2
    if(Math.abs(nextlvl - current.level) >= 2){
      current.next.setLevel(current.level - 1);
      current.next.updateLvl();
    }
  }
  
};


function remHeaders(forcedHeader=null,ignore=null, mainHeaderConfirmed = false){//currently only take selector strings
  console.log('starting header rem');
  if(forcedHeader){
    setHeaderLevelofElement(document.querySelector(forcedHeader),'1');
    mainHeaderConfirmed = true;
  }
  let list = new LL();
  list.fromArray(document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]'));
  console.log(list._display());
  list.mainHeader = list.traverse(n=>n.level===1);//create sub ll
  if(list.mainHeader.next===null){
  //there is no main header
    let logoHeader = document.querySelector('img[href="/"]');//main logo
    logoHeader.setAttribute('role','heading');
    logoHeader.setAttribute('aria-level','1');
    remHeaders();//restart function now that H1 is set
  }
  let subList = new LL();
  if(list.mainHeader.prev !== null){//if main is not top of list
    list.mainHeader.prev.next = null;
    list.mainHeader.prev = null;
    subList._addAsNode(list.mainHeader);//todo applie one step rules for sublist, for list aplly specialized checks
  //set any lvl 1 other than main to lvl 2
  }else{
    //there is no sublist
    subList = list;
  }
  console.log('sublist',subList._display());
  let n = list.mainHeader.next;
  while(n.next){
    if(n.level ===1){
      setHeaderLevelofNode(n,'2');
    } 
    n = n.next;//increment
  } 
  subList.traverse(n=>oneStepRule(n));//aply one ste rule to sub list
  //list.traverse(n=>n.element.role = 'presentation');
}