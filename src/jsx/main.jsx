///////////////////// GAME ENGINE ///////////////////// 
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


var gameBoard = {
	init: function(rows, cols, bombs){
		this.sizeRow = rows;
		this.sizeCols = cols;
		this.rows = [];
		var self = this;
		for(var r = 0; r < rows; r++){
			var row = [];
			 
			for(var c = 0; c < cols; c++){
					
				row.push({
					row:r,
					column:c
				});
			}	
			
			this.rows.push(row);
		}
		
		
		var nrBombs = bombs;
		
		for(var i = 0; i<nrBombs; i++){
			
			var row = getRandomInt(0,rows);
			var column = getRandomInt(0,cols);
			this.getCell(row, column).bomb = true;
		}
		
		for(var r = 0; r < rows; r++){
			 
			for(var c = 0; c < cols; c++){
				var cell = self.getCell(r, c);
				if(cell.bomb){
					continue;
				}
				var number = 0;
				[-1+r,r,1+r].forEach(function(r2){
					[-1+c,c,1+c].forEach(function(c2){
						
						if(!(c===c2 &&r === r2) && r2>=0 && r2 < self.sizeRow && c2>=0 && c2 < self.sizeCols){
							var cell2 = self.getCell(r2,c2);
							if(cell2.bomb){
								number++;
							}
						}
						
					});
				});
				cell.number = number;
			}	
		}
	},
	getCell : function(row, column){
		return this.rows[row][column];
	},
	flag : function(row, column){
		var cell = this.getCell(row,column);
		cell.flag = !cell.flag;
	},
	check: function(row, column){
		var withinBounds = row>=0 && row < this.sizeRow && column>=0 && column < this.sizeCols;
		if(!withinBounds){
			return;
		}
		
		var cell = this.getCell(row, column);
		
		if(cell.bomb){
			game.state.alive = false;
			return;
		}
		
		
		if(cell.flag){
			return;
		}
		if(cell.clicked || cell.number>0){
			cell.clicked = true;
			return;
		}else{
			cell.clicked = true;
			
			this.check(row-1, column-1);
			this.check(row-1, column);
			this.check(row-1, column+1);
			
			this.check(row, column-1);
			this.check(row, column+1);
			
			this.check(row+1, column-1);
			this.check(row+1, column);
			this.check(row+1, column+1);
		}
		
	},
	
	
	// representation of state
	toJSON: function (){
		var json = {};
		json.cells = this.rows.map(function (row){
			return row.map(function (cell){
				return cell;
			});
		}).reduce(function(a,b){
			return a.concat(b);
		});
		return json;
	}
}





///////////////////// REACT ///////////////////// 

var cx = React.addons.classSet;
///// CLASSES

var Cell = React.createClass({
	handleClick: function(e){
		
		e.preventDefault();
		var cell = this.props.cell;
		if(e.button){
			game.board.flag(cell.row, cell.column);
		} else {
			game.board.check(cell.row, cell.column);
		}
		
		game.redraw();
		
	},
	render: function(){
		
		var cell = this.props.cell;
		var config = this.props.config;
		var state = this.props.state;
		
		var divStyle = {
			top: cell.row*config.width,
			left: cell.column*config.height,
			color: cell.number>=3?"#AA0000":(cell.number==2?"#00AA00":"#666666"),
		}
	
		var classes = cx({
    		'cell': true,
    		'clicked': cell.clicked,
    		'bomb': cell.bomb,
    		'flag': cell.flag,
			'fa': cell.flag || cell.bomb,
			'fa-flag': cell.flag,
			'fa-bomb': cell.bomb && !state.alive,
			'number': cell.number>0 && cell.clicked
			
  		});
		
			
		return <div className={classes} style={divStyle} onClick={this.handleClick} onContextMenu={this.handleClick}>
			{cell.clicked && cell.number>0?cell.number:''}
			
		</div>;
	}
});


var GameBoard = React.createClass({
	
  	render: function() {
	
		var config = this.props.config;
		var state = this.props.state;
		var createItem = function(cell) {
			return <td><Cell config={config} state={state} cell={cell}/></td>;
    	};
		
		var divStyle = {
			position: 'relative',
			display: 'block',
			float: 'left',
			width: config.rows*config.width,
			heigt: config.columns*config.height,
		}
		
		var classes = cx({
    		'dead': !state.alive
  		});
			
		
		return <div style={divStyle} className={classes}>{
			this.props.board.cells.map(createItem)
		};</div>
	}
	
});

var Status = React.createClass({
	
  	render: function() {
		return <div>{this.props.state.alive?'alive':'dead'}</div>
	}
	
});

///// render
function render(config, state, board){
	
	React.render(<GameBoard config={config} state={state} board={board}/>,  document.getElementById('main'));
	React.render(<Status state={state}/>,  document.getElementById('status'));
}



///// MAIN



var config = {
	width: 18,
	height: 18,
	bombs: 20,
	rows: 20,
	columns: 20
}

var game = {
	init: function(config){
		this.config = config;
		this.state =  {
			alive: true
		};
 
		var board = this.board = Object.create(gameBoard);
		board.init(config.rows, config.columns, config.bombs);	
	},
	redraw: function(){
		render(this.config, this.state, this.board.toJSON());
	}
}

game.init(config);
game.redraw();
