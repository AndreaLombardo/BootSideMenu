  		$(document).on('click', '.toggler', function(){
  			var toggler = $(this);
  			var container = toggler.parent();
  			var listaClassi = container[0].classList;
  			var side = getSide(listaClassi);
  			var containerWidth = container.width();
  			var status = container.attr('data-status');
  			if(!status){
  				status = "opened";
  			}
  			doAnimation(container, containerWidth, side, status);
  		});

		//restituisce il lato del sidebar in base alla classe che trova settata
		function getSide(listaClassi){
			var side;
			for(var i = 0; i<listaClassi.length; i++){
				if(listaClassi[i]=='sidebar-left'){
					side = "left";
					break;
				}else if(listaClassi[i]=='sidebar-right'){
					side = "right";
					break;
				}else{
					side = null;
				}
			}
			return side;
		}
		//esegue l'animazione
		function doAnimation(container, containerWidth, sidebarSide, sidebarStatus){
			var toggler = container.children()[1];
			if(sidebarStatus=="opened"){
				if(sidebarSide=="left"){
					container.animate({
						left:-containerWidth
					});
					toggleArrow(toggler, "left");
				}else if(sidebarSide=="right"){
					container.animate({
						right:-containerWidth
					});
					toggleArrow(toggler, "right");
				}
				container.attr('data-status', 'closed');
			}else{
				if(sidebarSide=="left"){
					container.animate({
						left:0
					});
					toggleArrow(toggler, "right");
				}else if(sidebarSide=="right"){
					container.animate({
						right:0
					});
					toggleArrow(toggler, "left");
				}
				container.attr('data-status', 'opened');

			}
			
		}

		function toggleArrow(toggler, side){
			if(side=="left"){
				$(toggler).children(".glyphicon-chevron-right").css('display', 'block');
				$(toggler).children(".glyphicon-chevron-left").css('display', 'none');
			}else if(side=="right"){
				$(toggler).children(".glyphicon-chevron-left").css('display', 'block');
				$(toggler).children(".glyphicon-chevron-right").css('display', 'none');
			}
		}