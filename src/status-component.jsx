var components;

(function (components) {

	var Status = React.createClass({

		render: function () {
			return (
				<div>
					<span>{this.props.state.alive ? 'alive' : 'dead'}</span>
					<span>{this.props.state.unflagged}</span>
				</div>
			)
		}
	});

	components.Status = Status;

})(components || (components = {}));
