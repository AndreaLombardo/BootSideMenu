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
    <div class="list-group">
      <a href="#" class="list-group-item active">Cras justo odio</a>
      <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
      <a href="#" class="list-group-item">Morbi leo risus</a>
      <a href="#" class="list-group-item">Morbi leo risus</a>
      <a href="#" class="list-group-item">Porta ac consectetur ac</a>
      <a href="#subTest" class="list-group-item">Sub menù test</a>
      <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
      <a href="#" class="list-group-item">Morbi leo risus</a>
      <a href="#" class="list-group-item">Porta Porta Porta sdaf s fs hfuis uif ac consectetur ac</a>
      <a href="#" class="list-group-item">Vestibulum at eros</a>
      <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
      <a href="#" class="list-group-item">Morbi leo risus</a>
      <a href="#" class="list-group-item">Porta ac consectetur ac</a>
    </div>
</div>
```
JavaScript
-----------
```JavaScript
$("#idelemento").BootSideMenu();
```
Il plugin accetta due parametri opzionali

```JavaScript
side : 'left' // o 'right'
```
Specifica il lato della pagina nel quale verrà realizzato il menu. Di default è <b>left</b> (a sinistra).

```JavaScript
autoClose : true // o false
```
Determina se il menu dovrà essere chiuso automaticamente all'apertura della pagina. Di default è <b>true</b>.

Esempi
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