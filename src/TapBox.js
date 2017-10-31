import React from 'react';
import Hammer from 'hammerjs';
import ReactDOM from 'react-dom';
import './Note.css';

export default class TapBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {initialPosition: {y: 0},
    			  startPosition: {y: ''},
				  y: ''};

	//this.handleTap = this.handleTap.bind(this);

	this.handlePan = this.handlePan.bind(this);

  }

  calculatePosition(deltaY) {
    return {
        y: (this.state.initialPosition.y = deltaY)
    };
  }

  panHandlers(ev) {
  	console.log('called panHandlers');
	this.setState(this.calculatePosition(
		ev.deltaY
	));
	this.setState({initialPosition: {y: ev.deltaY}});
	console.log(ev.deltaY);  	
  }

  /*

  panHandlers = {

		panstart: function() {
			this.setState({
				startPosition: {
					y: this.state.y
				}
			});	
		},

		panmove: function(ev) {
			console.log('panmove fire');
			this.setState(this.calculatePosition(
				ev.deltaY
			));
			this.setState({initialPosition: {y: ev.deltaY}});
			console.log(ev.deltaY);
		}
  }

	*/

  handlePan(ev) {
    console.log('handlePan fire');
    this.panHandlers.call(this, ev);
    return false;  	
  }

  componentWillMount() {
  }

  componentDidMount() {

	this.hammertap = Hammer(ReactDOM.findDOMNode(this));
	this.hammertap.add(new Hammer.Pan({direction: Hammer.DIRECTION_VERTICAL, threshold: 0}));

	console.log('hammer init');

    var events = [
    		['panstart panmove', this.handlePan],
    		['panstart panmove', this.handlePan]
    ];

    events.forEach(function(data) {
    	if (data[0] && data[1]) {
    		console.log('data0:' + data[0] + ' and data1:' + data[1]);
    		this.hammertap.on(data[0], data[1]);
    	}
    }, this);

    //this.hammertap.on('panmove', this.handlePan);

    /*

    this.hammertap.on(events);

    console.log(events);

    events.forEach(function(data) {
        if ( data ) {
            this.hammertap.on(data);
            console.log('data:' + data);
        }
    }, this);

	*/

  }

  componentWillUnmount() {
	this.hammertap.stop();
	this.hammertap.destroy();
	this.hammertap = null;
  }

  render() {
    var translate = ''.concat(
        'translate3d(',
        '0px,',
        this.state.y + 'px,',
        '0px)'
    );

    var style = {
        msTransform: translate,
        WebkitTransform: translate,
        transform: translate
    };

    return (
      <div className="TapBox" style={style} >
      	Pan Me {this.state.initialPosition.y}
      </div>
    );
  }
}
