let ele = {outerFind : () =>{}};//definition of ele for intellisense, ignore

//universal fixes
//Auto rems--add to every site

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


///ad compiance to PDF and DOC
 var addDocComp = function (){
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

/**
 * 
 * @param {String | Jquery} trigger - button element
 * @param {String | Jquery} options - container of different options
 * @param {Boolean} addOptionRole - set to true if you want this function to set all children of option to have role=option
 */
function fixListbox(trigger, options,addOptionRole){
  if(addOptionRole){
    $(options).children().attr('role','option');
  }
selectBox = trigger;
  //var selectBox = ele.outerFind('.SelectDropdown__DropdownButton-sc-15hdakp-5.bQzoUX[data-qa="dropdown-button"]');
selectBox.attr({'aria-haspopup':'listbox','aria-expanded':false,'role':'button'});
//var options = ele.outerFind('[data-qa="options"]');
var remID = 'ae-REM-id-';
options.attr({'role':'listbox','tabindex':'-1'});
options.find('[role="option"]').each(function(i){//todo add in adding of role option
	$ae(this).attr('id',remID + i);
});


selectBox.on('keypress',function(e){
  e.preventDefault();
  setTimeout(function(){
    if(e.keyCode === 32 || e.keyCode === 13){
      $ae(e.target).click();
      selectBox.attr({'aria-expanded':true});
      options.attr({'aria-activedescendant': remID + '0'});
      options.attr('aria-hidden','false');
      AudioEye.focusElement(options.find('[role="option"]').eq(0));
    }
  });
});
options.on('keydown', function(e){
  e.preventDefault();
  var current = Number(options.attr('aria-activedescendant').split('-')[3]);
	if(e.keyCode === 38){ //up
      if(current > 0){
        current--;
        options.attr('aria-activedescendant', remID + current);
        AudioEye.focusElement('#'+ remID + current);
      }
    }else if(e.keyCode === 40){//down
      if(current < options.find('[role="option"]').length -1){
        current++;
        //console.info('moving to ',current);
        options.attr('aria-activedescendant', remID + current);
        AudioEye.focusElement('#'+ remID + current);
      }
      
    }else if(e.keyCode === 13 || e.keyCode === 32){//enter or space
      $ae(document.activeElement).attr('aria-selected','true');  
      $ae(document.activeElement).click();
      selectBox.attr({'aria-haspopup':'listbox','aria-expanded':false});
      AudioEye.focusElement(selectBox);
      }else if(e.keyCode === 35){//end key, go to last item
        current = 50;
        //console.info('moving to ',current);
        options.attr('aria-activedescendant', remID + current);
        AudioEye.focusElement('#'+ remID + current);
      
      }else if(e.keyCode === 36){// home key, goto top of list
      	current = 0;
        //console.info('moving to ',current);
        options.attr('aria-activedescendant', remID + current);
        AudioEye.focusElement('#'+ remID + current);
        
      }else if(e.keyCode === 27){//esc key, close menu, refocus on button
        selectBox.attr('aria-expanded','false');
        options.attr('aria-hidden','true');
        options.removeAttr('aria-activedescendant');
        selectBox.click();
        AudioEye.focusElement(selectBox);
      }
  
});
}
 var addModal = function(trigger, container, closeBtn){
  setTimeout(function(){
    trigger.on('click',function(){
      AudioEye.modals.enableTabLoop(container);
      AudioEye.focusElement(closeBtn);
      closeBtn.on('click',function(){
        AudioEye.modals.disableTabLoop(container);
        AudioEye.focusElement(trigger);

      });
    });
  },500);
}
 fixTabIndex = function(){
  ele.outerFind('[tabindex]').filter('[tabindex!="0"][tabindex!="-1"]').each(function(){
    var tIndex = Number($ae(this).attr('tabindex'));
    if(tIndex < 0){
      $ae(this).attr('tabindex','-1');
    }else {
      $ae(this).attr('tabindex','0');
    }
  });

}
fixTabsets : function(tablist,buttons, panel, direction){
  var current = 0;
  var next;
  var prev;
  var max = buttons.length;
  if(direction === 'ltr'){
    next = 39;
    prev = 37;
  }else{
    next = 40;
    prev = 38;
  }

  buttons.on('focus',function(e){
    e.preventDefault();
    console.log('focus');
    buttons.attr('tabindex','-1');
    buttons.eq(current).attr('tabindex','0');
  });

  buttons.on('keydown',function(e){
    var last;
    console.log('current',current);
    //e.preventDefault();
    if(e.keyCode == next){
      if(current === max){
        last = current;
        current = -1;
      }
      current++;
    }else if(e.keyCode == prev){
      if(current === 0){
        last = current;
        current = max;
      }
      current--;
    }else if(e.keyCode == 13 || e.keyCode == 32 ){//enter or space
      e.preventDefault();
      e.target.click();
      buttons.attr('tabindex','-1');
      //buttons.eq(current).attr('tabindex','0');

    }
    AudioEye.focusElement(buttons.eq(current));
  });

  tablist.attr({'role':'tablist', 'label':'Car search filter','id':'ae_REM-tabset1'});
  var tab = Object.assign(api.btn, {'role':'tab','tabindex':'-1','aria-selected':false});
  buttons.attr(tab);
  buttons.eq(0).attr({'aria-selected':true,'tabindex':'0'});
  panel.attr({'role':'tabpanel','aria-labelledby':'ae_REM-tabset1'});
  buttons.on('click',function(e){
    buttons.attr('aria-selected',false);
    $ae(e.target).attr({'aria-selected':true});
  });
}

////////////////////edit site menu
ele.outerFind('#ae_app').on('AfterModuleActivate', function(e) {
  setTimeout(function() {
    if (e.detail.module === 'site-menu') {
      var text = document.createTextNode('AAA homepage');
      $ae('.ae-menu a[href="/"]').append(text);
     $ae('.ae-menu a[href="/"] svg').css('display','none');
    }
    }, 0);
  });
  ////////////////
  function glyphs(){
    var icons = ele.outerFind('button .glyphicon, [role="button"] .glyphicon, a .glyphicon');
    icons.each(function(){
      if($ae(this).text() !== ''){
        return;//no rem needed, exit
      }
      var classes = $ae(this).attr('class');
      //ex glyphicon glyphicon-play hidden- want to grab play
      var name = classes.match(/glyphicon-\w+(?:-\w+)?/)[0];//now can catch multi-word icons
      name = name.replace('glyphicon-','').trim();//should now be action
      if(name === 'th'){
        name = 'sort'
      }
      if(exceptions){
        name = exceptions(name);
      }
      if($ae(this)[0].tagName.toLowerCase() === 'button' || $ae(this).attr('role')==='button'){//a button add label
        $ae(this).attr('.aria-label',name);
      }
      else{
      api.addComplianceIndent($ae(this),'append','span',name); 
      }
    });
  }
  faIcons : function(exceptions){
    var icons = ele.outerFind('i.fa, i.fa, i.fa');
    icons.each(function(){
      if($ae(this).text() !== ''){
        return;//no rem needed, exit
      }
      var classes = $ae(this).attr('class');
      var name = classes.match(/fa-\w+/i)[0];//now can catch multi-word icons
      name = name.replace('fa-','').trim();//should now be action
      if(name === 'heart'){
        name = 'favorite';
      }
      if(exceptions){
        name = exceptions(name);
      }
      //search for exceptions and put them here
      //check if button

      if($ae(this).is('[role="button"]')){
        $ae(this).attr('aria-label',name);
      }else if($ae(this).parent().is('[role="button"]'))
      {
        $ae(this).parent().attr('aria-label',name);
      }
      else if($ae(this).parent().is('[role="link"], a') || $ae(this).is('[role="link"]')){
        api.addComplianceIndent($ae(this),'append','span',name); 
      }
    });
  }//end icon rem

  fixForms : function(){
    var labels = ele.outerFind('label[for]');
    if(labels.length > 0){
      ele.outerFind('label[for]').each(function(){
        var label = $ae(this).text();
        if(/(full)?[_ ]?(name)\*?/i.test(label)){
          ele.outerFind('#'+$ae(this).attr('for')).attr('autocomplete','name');
        }
        if(/(first|given)[_ ]?(name)?\*?/i.test(label)){//matches 'first name*' 'first' 'first_name' case insenitive
           ele.outerFind('#'+$ae(this).attr('for')).attr('autocomplete','given-name');
        }
        if(/(last|family)[_ ]?(name)?\*?/ig.test(label)){
           ele.outerFind('#'+$ae(this).attr('for')).attr('autocomplete','family-name');
        }
        if(/middle[_ ]?(name)?\*?/ig.test(label)){
          ele.outerFind('#'+$ae(this).attr('for')).attr('autocomplete','additional-name');
        }
        if(/user[_ ]?(name)?\*?/ig.test(label)){
           ele.outerFind('#'+$ae(this).attr('for')).attr('autocomplete','username');
        }
        if(/email[_ ]?(address)?\*?/ig.test(label)){
           ele.outerFind('#'+$ae(this).attr('for')).attr('autocomplete','email');
        }
        if(/birth[_ ]?(day|date)?\*?/ig.test(label)){// warning... does not work for date of birth
           ele.outerFind('#'+$ae(this).attr('for')).attr('autocomplete','bday');
        }
        if(/phone[_ ](nuber)?\*?/ig.test(label)){//does not capture phonenumber
           ele.outerFind('#'+$ae(this).attr('for')).attr('autocomplete','tel');
        }
        
    });
    }else{//placeholders
      ele.outerFind('input[placeholder]').each(function(){
        var label = $ae(this).attr('aria-label');
        if(label === '' || !label){
            label = $ae(this).attr('placeholder');
            $ae(this).attr('aria-label',label);
        }else{
          console.log('FORM FIX NO CONTEXT');
        }
        if(/(full)?[_ ]?(name)\*?/i.test(label)){
          $ae(this).attr('autocomplete','name');
        }
        if(/(first|given)[_ ]?(name)?\*?/i.test(label)){//matches 'first name*' 'first' 'first_name' case insenitive
          $ae(this).attr('autocomplete','given-name');
        }
        if(/(last|family)[_ ]?(name)?\*?/ig.test(label)){
          $ae(this).attr('autocomplete','family-name');
        }
        if(/middle[_ ]?(name)?\*?/ig.test(label)){
          $ae(this).attr('autocomplete','additional-name');
        }
        if(/user[_ ]?(name)?\*?/ig.test(label)){
          $ae(this).attr('autocomplete','username');
        }
        if(/email[_ ]?(address)?\*?/ig.test(label)){
          $ae(this).attr('autocomplete','email');
        }
        if(/birth[_ ]?(day|date)?\*?/ig.test(label)){// warning... does not work for date of birth
          $ae(this).attr('autocomplete','bday');
        }
        if(/phone[_ ](nuber)?\*?/ig.test(label)){//does not capture phonenumber
          $ae(this).attr('autocomplete','tel');
        }
        
    });
    
      
    }
    
  
    }