
import $ = require('jquery');
import Board from './board';

let board = new Board();

export default class CheckWin {

	matchCount : number;
	round : number;
	matrixCheck : any;
	boardSize : number;

	constructor (matrix : any) {
		this.matrixCheck = matrix;
		this.matchCount = 0;
		this.round = 1;
		this.boardSize = Math.sqrt($(".table td:last").data('pos'));
		this.checkRow();


	}

	checkRow() {

		for(let i = 0; i<this.boardSize; i++){
			this.matchCount=0;
			if(this.matrixCheck[i][0] !== ""){
				for (let j = 1; j < this.boardSize; j++){
					if(this.matrixCheck[i][j-1] === this.matrixCheck[i][j]) {
						this.matchCount++;
					}
				}
				if(this.matchCount === this.boardSize -1 ) {
					
					this.round ++;
					
					board.drawRow(i);
					return ;
				}
				
			}
		}

		this.checkCol();

	}

	checkCol(){

		for (let i =0; i<this.boardSize; i++){
			this.matchCount=0;
			if(this.matrixCheck[0][i] !== ""){
				for(let j = 1; j<this.boardSize; j++){
					if(this.matrixCheck[j][i] === this.matrixCheck[j-1][i]) {
						this.matchCount++;
					}
				}
				if(this.matchCount === this.boardSize -1 ) {
					
					this.round ++;
					
					board.drawCol(i);
					return ;
				}
				
			}	
		}
		this.checkLDiagonal();
	}

	checkLDiagonal(){

		this.matchCount=0;
		for (let i =1; i<this.boardSize; i++){
			if(this.matrixCheck[i-1][i-1] !== "" && this.matrixCheck[i][i] === this.matrixCheck[i-1][i-1]) {
				this.matchCount++;
				
			}
		}	
		if(this.matchCount === this.boardSize -1 ) {
				
				this.round ++;
				
				board.drawLDiagonal();
				return ;
		}
		
		this.checkRDiagonal();
}

	checkRDiagonal(){
		this.matchCount=0;
		for (let j = this.boardSize - 1 , i=0; i<this.boardSize-1; i++){
			if(this.matrixCheck[i][j] !== "" && this.matrixCheck[i+1][j-1] === this.matrixCheck[i][j]) {
				this.matchCount++;
				
			}
			j--;
		}	

		if( this.matchCount === this.boardSize -1 ) {
			
			board.drawRDiagonal();
							
			this.round ++;
						
			return ;
		}

	}
}
