function createCell(row, column){
	return {
		row:row,
		column:column
	}
}

var gameBoard = {
	init: function(rows, cols){
		this.rows = [];
		for(var r = 0; r < rows; r++){
			var row = [];
			 
			for(var c = 0; c < cols; c++){
				row.push(createCell(r, c));	
			}	
			
			this.rows.push(row);
		}
	},
	getCell : function(row, column){
		return this.rows[row][column];
	},
	check: function(row, column){
		var cell = this.getCell(row, column);
		cell.marked = !cell.marked;
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var board = Object.create(gameBoard);
board.init(30,30);


function render(){
	var json = board.toJSON();

var game = React.render(<GameBoard gameBoard={json}/>,  document.getElementById('main'));

}

var Cell = React.createClass({
	handleClick: function(){
		var cell = this.props.cell;
		board.check(cell.row, cell.column);
		render();
	},
	render: function(){
		var cell = this.props.cell;
		var divStyle = {
			top: cell.row*15,
			left: cell.column*15,
		}
		var cx = React.addons.classSet;
		var classes = cx({
    		'cell': true,
    		'clicked': cell.marked
  		});
			
		return <div className={classes} style={divStyle} onClick={this.handleClick}></div>;
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
			width: 30*15,
			heigt: 30*15,
		}
		
		return <div style={divStyle}>{
			this.props.gameBoard.cells.map(createItem)
		};</div>
	}
	
});

render();

