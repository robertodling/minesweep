var width = 18;
var height = 18;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createCell(row, column){
	return {
		row:row,
		column:column
	}
}

var alive = true;


var gameBoard = {
	init: function(rows, cols){
		this.sizeRow = rows;
		this.sizeCols = cols;
		this.rows = [];
		var self = this;
		for(var r = 0; r < rows; r++){
			var row = [];
			 
			for(var c = 0; c < cols; c++){
				var cell = createCell(r, c);
				
				row.push(cell);
			}	
			
			this.rows.push(row);
		}
		var nrBombs = 100;
		
		for(var i = 0; i<nrBombs; i++){
			console.log(i);
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
			alive = false;
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
	
	
	// representation of game state
	toJSON: function (){
		var json = {};
		json.alive = true;
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


var cx = React.addons.classSet;
var board = Object.create(gameBoard);
board.init(30,30);


function render(){
	var json = board.toJSON();

	var game = React.render(<GameBoard gameBoard={json}/>,  document.getElementById('main'));
	React.render(<Status/>,  document.getElementById('status'));
}

var Cell = React.createClass({
	handleClick: function(e){
		
		e.preventDefault();
		var cell = this.props.cell;
		if(e.button){
			board.flag(cell.row, cell.column);
			
		}else{
			board.check(cell.row, cell.column);
		}
		render();
	},
	render: function(){
		
		var cell = this.props.cell;
		var divStyle = {
			top: cell.row*width,
			left: cell.column*height,
			color: cell.number>=3?"#AA0000":(cell.number==2?"#00AA00":"#666666"),
		}
	
		var classes = cx({
    		'cell': true,
    		'clicked': cell.clicked,
    		'bomb': cell.bomb,
    		'flag': cell.flag,
			'fa':cell.flag || cell.bomb,
			'fa-flag':cell.flag,
			'fa-bomb':cell.bomb && !alive,
			'number':cell.number>0 && cell.clicked
			
  		});
		
			
		return <div className={classes} style={divStyle} onClick={this.handleClick} onContextMenu={this.handleClick}>
			{cell.clicked && cell.number>0?cell.number:''}
			
		</div>;
	}
});


var GameBoard = React.createClass({
	
  	render: function() {
	
		var createItem = function(cell) {
      		return <td><Cell cell={cell}/></td>;
    	};
		var divStyle = {
			position: 'relative',
			display: 'block',
			float: 'left',
			width: 30*width,
			heigt: 30*height,
		}
		
		var classes = cx({
    		'dead': !alive
  		});
			
		
		return <div style={divStyle} className={classes}>{
			this.props.gameBoard.cells.map(createItem)
		};</div>
	}
	
});

var Status = React.createClass({
	
  	render: function() {
	
		return <div>{alive?'alive':'dead'}</div>
	}
	
});

render();

