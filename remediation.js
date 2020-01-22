let ele = {outerFind = () =>{}};//definition of ele for intellisense, ignore

//universal fixes

$ae('table').each(function(){//this code checks to if a table presents data, if it doesnt then applies role presentation
    var tableData = $ae(this).find('td');
      if(tableData.toArray().length <= 1){
  //this table doesnt present any data, set to role presentation
  $ae(this).attr('role','presentation');
  }else{
    var count = 0;
    var noMoreData = tableData.each(function(){
        if($ae(this).is(':empty')){
        count++;
      }
      if(count >= 2){
      return false;//break outta loop
      }
    });
  //has more than one td but the rest are empty
    if(noMoreData){
    $ae(this).attr('role','presentation');
    }
  }
  
  
  });


  //converting legacy nav 
//auto fix headings outta order
function autoHeading(){
//check it first h is 1 or 2
var headings = $ae('h1,h2,h3,h4,h5,h6');
if(!headings.eq(0).is('h1')||!!headings.eq(0).is('h2')){

}

}

function checkAria(jObject){

}

///ad compiance to PDF and DOC
function addDocComp (){
ele.outerFind('a[href$=".pdf"]').each(function(){
	api.addComplianceIndent($ae(this),'append','span' ,'download as pdf' )
});
ele.outerFind('a').filter(function(){
  return /\.docx?$/.test($ae(this).attr('href'))
}).each(function(){
	api.addComplianceIndent($ae(this),'append','span' ,'download as word DOC' )
});

}
//fix JW players

var videoContext = ele.outerFind('.jwmain');
videoContext.attr('tabindex','0');
videoContext.on('focus',function(){
  console.log('video Focus');
  ele.outerFind('span#ddc-jwplayer-0_controlbar').css({
    'display':'block',
    'opacity':'1'
  });

});
videoContext.on('blur',function(){
  console.log('video Focus lost');
  ele.outerFind('span#ddc-jwplayer-0_controlbar').css({
    'display':'none',
    'opacity':'0'
  });

});
videoContext.find('img.jwlogo').attr('alt','JW player logo');
videoContext.each(function(){
  $ae(this).find('.jwgroup')
  .children('span:has(button)').each(function(){
    switch($ae(this).attr('class').split(' ')[0]){
    case 'jwplay':
      $ae(this).find('button').attr('aria-label','play');
      break;
    case 'jwprev':
      $ae(this).find('button').attr('aria-label','previous'));
      break;
    case 'jwnext':
      $ae(this).find('button').attr('aria-label','next'));
      break;
    case 'jwcc':
      $ae(this).find('button').attr('aria-label','Close Captions'));
      break;
    case 'jwhd':
      $ae(this).find('button').attr('aria-label','High Definition'));
      break;
    case 'jwmute':
      $ae(this).find('button').attr('aria-label','mute'));
      break;
    case 'jwfullscreen':
      $ae(this).find('button').attr('aria-label','full screen mode'));
      break;

    }
  });
  $ae(this).find('jwlogo').attr('alt','JW Player');

});
//fixes redundant navigation anouncement
ele.outerFind('nav[aria-label*=Navigation]').each(function(){
  var oldLabel = $ae(this).attr('aria-label');
  if(!oldLabel)//skip if there is no aria-label
    return;
  var newLabel = oldLabel.replace(/nav.*/i,'').trim();//remove nav or any variation of it from string
  $ae(this).attr('aria-label',newLabel);
});

//add keyboard support
ele.outerFind(selector).on('keypress',function(e){
  if(e.keyCode === 32 || e.keyCode === 13){
    this.click();
  }
});