import $ = require('jquery');
import Game from './game';  


export default class Board {

	focusTd : number;
	boardSize : number;
	arrayTd : any;

	constructor (){
		this.boardSize = Math.sqrt($(".table td:last").data('pos'));
		this.arrayTd = $(".table td").toArray();
	}

	drawRow(i : number){
		this.focusTd = this.boardSize*(i+1)-(this.boardSize - 1);
		for(let j = 0; j<this.boardSize; j++){
			$('[data-pos="' + this.focusTd +'"]').addClass('win');
			this.focusTd ++;
		}

		 
		setTimeout(this.clear.bind(this),4000);
		

	}

	drawCol(i : number){
		
		for(let j = 0; j<this.boardSize; j++){
			this.focusTd =  this.boardSize*(j+1)-(this.boardSize - (i+1));
			$('[data-pos="' + this.focusTd +'"]').addClass('win');
			
		}

		 
		setTimeout(this.clear.bind(this),4000);
		


	}

	drawLDiagonal(){
		
		for(let i = 0; i<this.boardSize; i++){

			this.focusTd = this.boardSize*(i+1)-(this.boardSize - (i+1)) ;
			$('[data-pos="' + this.focusTd +'"]').addClass('win');

		}

		 
		setTimeout(this.clear.bind(this),4000);
		

	}

	drawRDiagonal(){

		for(let i = 0, j= this.boardSize-1; j>=0; j--){

			this.focusTd = this.boardSize*(i+1)-(this.boardSize - (j+1));
			
			$('[data-pos="' + this.focusTd +'"]').addClass('win');
			i++;
		}
		
		 
		setTimeout(this.clear.bind(this),4000);
		


	}

	clear(){
		
		for(let i = 1; i <= this.boardSize*this.boardSize; i++){
			$('[data-pos="' + i +'"]').removeClass('win');
			$('[data-pos="' + i +'"]').text("");
			$(".game span").text("");
			
		}
		

	}
}