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

let list = new LL();
list.fromArray($(':header').toArray());