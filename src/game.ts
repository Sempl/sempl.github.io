import $ = require('jquery');
import CheckWin  from './checkwin';
import Board from './board';

let board = new Board();

export default class Game {
	
	boardSize : number;
	arrayTd : any[];
	matrixCheck : any[][];
	focusTd : number; 
	row : number;
	col : number;
	step : number;
	firstWins : number;
	secondWins : number;
	chooseSign : number;
	rounds : number;

	constructor() {
		
		this.boardSize = Math.sqrt($(".table td:last").data('pos')); //depends from quanity of <td> elem. 
		this.focusTd = (this.boardSize%2 === 0 ? (this.boardSize/2*this.boardSize-this.boardSize/2) : 
			(this.boardSize*this.boardSize+1)/2);
		this.matrixCheck = [[],[]];
		this.row = this.col = Math.ceil(this.boardSize/2)-1;
		this.arrayTd = $(".table td").toArray();
		this.makeMatrix(true);
		$('[data-pos="' + this.focusTd +'"]').addClass('onfocus');
		this.step = this.chooseSign =  Math.floor(Math.random() * 2);
		$('.game h2').text(this.step == 0 ? "First player starts" : "Second player starts");
		this.firstWins = this.secondWins = 0;
		this.rounds = this.firstWins+this.secondWins;

		$(document).keydown(this.selectPos.bind(this));
		
	}

	selectPos(event : KeyboardEvent){

		$(".player1__score").text("Wins: " +this.firstWins);
		$(".player2__score").text("Wins: " +this.secondWins);
		
		let row : number = this.row;
		let col : number = this.col;
	

		if(this.step%2==0 ? event.keyCode === 87 : event.keyCode === 38){
			row = this.row-1;
			this.fadeTd(row,col);	
		}
		else if(this.step%2==0 ? event.keyCode === 65 : event.keyCode === 37) {
			col = this.col-1;
			this.fadeTd(row,col);
		}
		else if(this.step%2==0 ? event.keyCode === 68 : event.keyCode ===39) {
			col = this.col +1;
			this.fadeTd(row,col);		
		}
		else if(this.step%2==0 ? event.keyCode === 83 : event.keyCode ===40) {
			row = this.row+1;
			this.fadeTd(row,col);
		}
		else if((this.step%2==0 ? event.keyCode === 90 : event.keyCode === 57) && $(".game span").text() == "")  {
			this.makeChoose(event.keyCode); 
		}
						
	}

	// change css properties of choosed <td> elem
	fadeTd(row:number, col:number){
				
		let oldFocus = this.focusTd;
		
		if(row<this.boardSize && col<this.boardSize && row>=0 && col>=0) {
			
			this.focusTd = this.boardSize*(row+1) - (this.boardSize-(col+1));
			this.row = row;
			this.col = col;
			$('[data-pos="' + oldFocus +'"]').removeClass('onfocus');
			$('[data-pos="' + this.focusTd +'"]').addClass('onfocus');
		}

		if(col==this.boardSize && row<this.boardSize-1 && row>=0 ) {
			
			this.col = 0
			this.row = row+1
			this.focusTd = this.boardSize*(this.row+1) - (this.boardSize-(this.col+1));
			$('[data-pos="' + oldFocus +'"]').removeClass('onfocus');
			$('[data-pos="' + this.focusTd +'"]').addClass('onfocus');
		}

		if(col == -1 && row<this.boardSize && row>0 ) {
			
			this.col = this.boardSize-1;
			this.row = row-1;
			this.focusTd = this.boardSize*(this.row+1) - (this.boardSize-(this.col+1));
			$('[data-pos="' + oldFocus +'"]').removeClass('onfocus');
			$('[data-pos="' + this.focusTd +'"]').addClass('onfocus');
		}
		
	}

	// rendering array to matrix , false for making "clear matrix"
	makeMatrix(e:boolean){
		
		let k : number = 0;

		for(let i = 0; i<this.boardSize; i++){
			this.matrixCheck[i] = [i];

			for(let j = 0; j<this.boardSize; j++)
			{
				if(e) {
				
					this.matrixCheck[i][j] = this.arrayTd[k].innerHTML;
				 	k++
				}
				else{
				
				 	this.matrixCheck[i][j] = "";
				}				 
			}
		}	
	}
	
	makeChoose(e : number){

		if (this.matrixCheck[this.row][this.col] === ""){
			
			if((e === 57 && this.chooseSign%2 !== 0)||(e === 90 && this.chooseSign%2 ==0)) {

				$('[data-pos="' + this.focusTd +'"]').text('x');
			}
			else if ((e === 57 && this.chooseSign%2 ==0) || (e === 90 && this.chooseSign%2 !== 0)) {

				$('[data-pos="' + this.focusTd +'"]').text('0');
			}

			this.makeMatrix(true);
			this.step++;

			new CheckWin(this.matrixCheck);

			let c1 : string = $('[data-pos="' + this.focusTd +'"]').attr("class");
			let c2 : number = this.boardSize*this.boardSize+this.chooseSign;
		
			//checking for win or draw combo
			if( c1 === "onfocus win" || this.step== c2) {
				
				//clearing matrix and writing result
				
				this.makeMatrix(false);
				
				if(this.step==c2 && c1 !== "onfocus win" ){
					
					$(".player1__score").text("Draw!");
					$(".player2__score").text("Draw!");
					this.rounds++;
					setTimeout(board.clear.bind(this), 2000);
				}
				else if(e===90){
					
					this.firstWins++;
					
				}
				else if(e === 57) {
					
					this.secondWins++;
					
				}
			
				this.step = this.chooseSign = Math.floor(Math.random() * 2);
				$(".game h2").text(this.step == 0 ? "First player starts" : "Second player starts");
				
				$(".game p").text("rounds played: "+this.rounds);
				$(".game span").text("Round over!");
			}

			
		}	

	}

}
