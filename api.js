/**
 * This API was developed with the intent to make our lives easier, increase productivity,
and to make our remediations a little more uniform. The Remediation API is a library of
functions that we can utilize to do most of the common remediations we encounter.
 * when used inside of a rem, use api.[method_name]
 * while in the console use AudioEye.remApi.[method_name]
 * @property {Object} pres - shortcut for role presentation
 * @property {Object} rmv - short for make invisble to AT
 * @property {Object} btn - short for properties of a proper button
 * @property {Object} acd - short for properties of an accordion
 * @property {Object} dlb - short for dialog attribute
 * @property {Object} expt - short for expanded true
 * @property {Object} expf - short for expanded false
 * @static
 */
class api{
  static constructor(){
    this.pres = {'role':'presentation'};
    this.rmv = {'role':'presentation', 'aria-hidden':'true', 'tabindex':'-1'};
    this.btn = {'role':'button', 'tabindex':'0', 'data-ae-blurbtype':'button'};
    this.acd = {'aria-expanded':'false', 'role':'button', 'tabindex':'0'};
    this.dlg = {'role':'dialog'};
    this.expt = {'aria-expanded':'true'};
    this.expf = {'aria-expanded':'false'};
  }
   /**
    * 
    * @param {String | jquery} selector - DOM element to apply attributes to
    * @param {Object | String} attributes - Attributes to apply. use a JSON object to apply more than one
    * @example
    * api.setAttribute('.classOfTarget',{'role':'presentation','tabindex':'0'});
    */
  setAttribute(selector, attributes){}

  setAlt(selector,alt_text){}

  /**
   * Adds role="dialog" to HTML elements.
   * @param {String | Jquery} selector - DOM element to apply attributes to. 
   * @example
   * setDialog($ae('.element')) 
   * @deprecated
   */
  setDialog(selector){}
  
  
  /**
   * Adds an invisble element for use in adding additional context to HTML elements for screen readers and other AT.
   * @param {String | jquery} parent - the complience will be made a direct child of this element in the DOM 
   * @param {String} position - Either 'Append' for after element or 'prepend' to place it before
   * @param {HTML_element} Html_tagName - the html tag to be placed in DOM, use Span for most cases 
   * @param {String} text - text content of new element
   * @method
   * @example
   * 
   * //given
   * //<a href="new_computers.html">learn more </a>
   * api.addComplianceIndent(ele.outerFind('a[href="new_computers.html"]'),'append','span','about new computers');
   * //outputs
   * //<a href="new_computers.html">learn more <span class="ae-compliance">about new computers</span> </a>
   */
  addComplianceIndent(parent, position, Html_tagName, text){}

  /**
   * Adds a keypress event for the 'space' and 'enter keys to html elements to trigger a mouse click event
   * @param {String | jquery} target - DOM element to place keypress event on.
   */
  addKeyboardClick(target){}

  /**
   * Adds WCAG Accordion functionality, such as aria-expanded true/false, to HTML elements
   * @param {String | jquery} trigger - selector for the DOM element that opens/closes accordion
   * @param {CSS_class} activeClass - class that is toggled to show/hide. if no such class exist pass in an empty string ('')
   * @param {String | jquery} [contentPanel] - DOM element containing hidden content. Use only if no active class is availible
   * @deprecated
   * @example
   * //given:
   * //<div>
   * //<button id="accordionButton">show panel</button>
   * //<div class="show">content panel</div>
   * //</div>
   * api.convertToAccordion(ele.outerFind('#accordionButton'),'show');
   *  
   */
  convertToAccordion(trigger, activeClass, contentPanel){}
  /**
   * Adds an ae-reader-hidden compliance indent element for use in adding context to HTML elements
   * @param {String | jquery} parent - DOM element to add as a child
   * @param {String} position - excepts either 'append' or 'prepend'
   * @param {HTML_element} tag - HTML element type to use. most cases use a span
   * @param {String} text - text to be added into new element
   */
  addComplianceIndentHidden(parent, position, tag, text){}
  /**
   * Hides elements from screen-readers. Use this when an element adds nothing to the AT users experience or may cause confusion
   * @param {String | jquery} selector -DOM element to make invisible to AT users
   * @example
   * //given
   * //<a id="place1_img_link" href="place1"><img src="place1.png" alt="place 1"/></>
   * //<a id="place1_link" href="place1">go to place1</a> // adjacent links pointing to the same location
   * api.hideFromAt('#place1_img_link')
   */
  hideFromAt(selector){}
  /**
   * Sets the heading level of HTML elements. applies both role and aria-level, can be used on non-header elements
   * @param {String | jquery} selector - DOM element to change to header
   * @param {Number | String} level - the level element is to be set to
   * @example
   * //given:
   * //<h1>page title</h1>
   * //<h3 id="header2">invaild header</h3>
   * api.setHeadingLevel('#header2',2);
   */
  setHeadingLevel(selector, level){}
  /**
   * Adds role="presentation" to HTML elements. This is used to remove the native aria role from an element that was mis-used
   * @param {String | jquery} selector - DOM element to apply attributes to. 
   * @example
   * //given:
   * //<table id="tableUseForLayout"> // this table is used for layout purposes, not to display data
   * //<td><p>this is on the left</p></td>
   * //<td><img src="rightside.png"/></td>
   * //</table>
   * api.setPresentation('#tableUseForLayout')
   */
  setPresentation(selector){}
  /**
   * Adds a unique body class to the page based on the text of the H1 page title. Can be used to ensure remediation only run on intended page 
   * @deprecated
   */
  addBodyClass(){}

  /**
   * Adds title tags to html elements.
   * @param {String | jquery} selector 
   * @param {String} title - text to be placed in title element
   * @deprecated - Do not create a title element. use an aria label instead
   */
  setTitle(selector, title){}








}