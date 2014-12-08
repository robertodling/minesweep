function createCell(count, marked){
	return {
		count: count,
		marked: marked || false,
		mark: function(m){
			this.marked = m;
		}
	}
}

var gameBoard = {
	init: function(rows, cols){
		this.rows = [];
		for(var r = 0; r < rows; r++){
			var row = [];
			 
			for(var c = 0; c < cols; c++){
				row.push(createCell(c+r*cols));	
			}	
			
			this.rows.push(row);
		}
	}
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var board = Object.create(gameBoard);
board.init(5,10);

setInterval(function(){
	var cell = board.rows[getRandomInt(0,4)][getRandomInt(0,9)];
	cell.count = getRandomInt(0,400);
	React.render(<GameBoard gameBoard={board}/>,  document.getElementById('main'));
},1000);
var Cell = React.createClass({
	handleClick: function(){
		var cell = this.props.cell;
		cell.mark(!cell.marked);
		console.log(cell.marked);
		this.forceUpdate();
	},
	render: function(){
		var cell = this.props.cell;
		return <div onClick={this.handleClick}>
			{cell.count + (cell.marked?'0':'x')}
		</div>;
	}
});

var GameBoard = React.createClass({
	
  	render: function() {
	
		var createItem = function(cell) {
      		return <td><Cell cell={cell}/></td>;
    	};
		
		var createRow = function(row) {
      		return <tr>{
				row.map(createItem)
			}</tr>;
    	};
    
		return <table>{
			this.props.gameBoard.rows.map(createRow)
		}</table>;
	}
	
});


