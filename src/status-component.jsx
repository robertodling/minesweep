var components;

(function (components) {

	var Status = React.createClass({

		render: function () {
			return <div>{this.props.state.alive ? 'alive' : 'dead'}</div>
		}
	});

	components.Status = Status;

})(components || (components = {}));
