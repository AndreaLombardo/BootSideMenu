# BootSideMenu
After a long time a new (hope better) version is here.
**BootSideMenu** is a jQuery plugin to easily build a sliding menu in a Bootstrap based application.

Online demo can be found [HERE](https://andrealombardo.github.io/BootSideMenu/).

----------

### **Options**
| Option     | Type | Value | Description|Default
| :--------- | :--- | :---- | :--------- |:------:
|**side**|String|left or right|Where menu will be placed|*left*
|**duration**|Integer|milliseconds|Animation duration|*500*
|**remember**|Boolean|true or false|Restore last menu status on page refresh|*true*
|**autoClose**|Boolean|true or false|If true the initial status will be "closed"|false
|**pushBody**|Boolean|true or false|If true the body of the page will be pushed left or right, according to the menu width and position|false
|**closeOnClick**|Boolean|true or false|If true the menu will be closed when a link is clicked or if a click is made outside of it|true
|**icons**|Object|An object where to specify the icon fonts classes|A way to use other icon fonts instead of glyphicon|`icons: {left: 'glyphicon glyphicon-chevron-left', right: 'glyphicon glyphicon-chevron-right', down: 'glyphicon glyphicon-chevron-down'}`
|**theme**|String|'default', 'dracula', 'darkblue', 'zenburn', 'pinklady', 'somebook'|Five themes plus a default one. Your is welcome.|*'default'*

### **Events**
| Event | Description | Default
| :---- | :---------- | :------:
|**onStartup**|A function to be executed when the menu is instantiated| do nothing
|**onTogglerClick**|A function to be executed when the toggler arrow is clicked| do nothing
|**onBeforeOpen**|A function to be executed before the menu is opened| do nothing
|**onOpen**|A function to be executed when the menu is opened| do nothing
|**onBeforeClose**|A function to be executed before the menu is closed| do nothing
|**onClose**|A function to be executed when the menu is closed| do nothing

### **Methods**
| Method | Description
| :---- | :------------:
|**$(selector).BootSideMenu.open();**| Open menu programmatically
|**$(selector).BootSideMenu.close();**| Close menu programmatically
|**$(selector).BootSideMenu.toggle();**| Toggle menu programmatically
*Watch in action [HERE](https://andrealombardo.github.io/BootSideMenu/11-remote-control.html).*

## Examples
Watch the examples folder to see it in actions or try an [Online Demo](https://andrealombardo.github.io/BootSideMenu/)

## Donations
Coffee and beers are well accepted!
:coffee: [PayPal Donations Here](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=DUNFGKA32BFGE) :beer:
