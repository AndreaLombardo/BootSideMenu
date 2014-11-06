BootSideMenu
============
<p>Plugin jQuery per realizzare un menu laterale a scomparsa al gusto di Bootstrap.<br/>Sono ben accetti collaboratori.</p>
<p align="center"><strong>*.*.* Il plugin non è ancora ultimato *.*.*</strong></p>

HOW TO
============

HTML
-----------
```html
<div id="idelemento">
  ... link del menù...
</div>
```
JavaScript
-----------
```JavaScript
$("#idelemento").BootSideMenu();
```
Il plugin accetta due parametri opzionali

```JavaScript
side : 'left' //o 'right'
```
Specifica il lato della pagina nel quale verrà realizzato il menu. Di default è <b>left</b> (a sinistra).

```JavaScript
autoClose : true //o false
```
Determina se il menu dovrà essere chiuso automaticamente all'apertura della pagina. Di default è <b>true</b>.

Esempio
-----------
```JavaScript
$("#idelemento").BootSideMenu({side:'left'});
```
il menù verrà creato a sinistra della pagina e al caricamento della stessa, esso verà chiuso.

```JavaScript
$("#idelemento").BootSideMenu({
	side:'right',
	autoClose:false
});
```
il menù verrà creato a destra della pagina e al caricamento della stessa, esso <b>non</b> verà chiuso.