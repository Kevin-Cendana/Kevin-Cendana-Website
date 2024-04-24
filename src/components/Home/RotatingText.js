//--------------------------------------------------------------------------------------//
//                                   RotatingText.js                                    //
//          https://www.npmjs.com/package/react-rotating-text?activeTab=readme          //
//--------------------------------------------------------------------------------------//

// Credit for rotating text animation: 
import './RotatingText.css';
var React = require('react');
var PropTypes = require('prop-types');
var toArray = require('lodash.toarray');

class ReactRotatingText extends React.Component {

    // Constructor
    constructor(props) {
        super(props);
        const { items, random } = this.props;
        // Set initial state
        this.state = {
            index: random ? Math.floor(Math.random() * Math.floor(items.length)) : 0,
            output: '',         // Text that is displayed
            substrLength: 0,    // Length of the current substring
        };
        this.timeouts = [];     // Keeps track of timeouts for animation
    }

    // Component lifecycle method: called when component is inserted into the DOM
    componentDidMount() {
        const { initialdelay } = this.props; // Get the initial delay from props
        
        // Set a timeout to delay the start of the animation
        this.initialTimeout = setTimeout(() => {
            this._animate.bind(this)();
        }, initialdelay);
    }

    // Component lifecycle method: called when component is removed from the DOM
    componentWillUnmount() {
        this.timeouts.map(x => clearTimeout(x));  // Stop all the loops
        clearTimeout(this.initialTimeout);        // Stop the intial timeout
    }

    // Helper function: loops a function w/ a delay
    _loop(loopingFunc, pause) {
        // Save the timeouts so we can stop on unmount
        const timeout = setTimeout(loopingFunc, pause);
        this.timeouts.push(timeout);

        // Prevent memory leaks by limiting amount of timeouts
        const maxTimeouts = 100;
        if (this.timeouts.length > maxTimeouts) {
            clearTimeout(this.timeouts[0]);
            this.timeouts.shift();
        }
    }

    // Typing effecT: types out a word letter by letter
    _type(text, callback) {
        const { output } = this.state;
        const { typingInterval } = this.props; // How fast each letter is typed
        const loopingFunc = this._type.bind(this, text, callback);
        const word = toArray(text)

        // Updating state to display one more letter
        this.setState({output: word.slice(0, toArray(output).length + 1).join('')});

        // Rcursively ontinue typing if word is not complete
        if (output.length < word.length) {
            this._loop(loopingFunc, typingInterval);
        } else {
        // When typing is complete, call the callback function
            if (typeof this.props.onTypingEnd == 'function') {
            this.props.onTypingEnd();
            }
            callback();
        }
    }

    // Erasing effect: erases the word letter by letter
    _erase(callback) {
        const { output } = this.state;
        const { deletingInterval } = this.props;
        const loopingFunc = this._erase.bind(this, callback);
        const word = toArray(output)

        if (typeof this.props.onDeletingStart == 'function') {
            this.props.onDeletingStart();
        }
        // Set the string one character shorter
        this.setState({output: word.slice(0, word.length - 1).join('')});

        // If we're still not done, recursively loop again
        if (word.length !== 0) {
            this._loop(loopingFunc, deletingInterval);
        } else {
            if (typeof this.props.onDeletingEnd == 'function') {
            this.props.onDeletingEnd();
            }
            callback();
        }
    };

    _overwrite(text, callback) {
        const { output, substrLength } = this.state;
        const { deletingInterval } = this.props;
        const loopingFunc = this._overwrite.bind(this, text, callback);
        const word = toArray(text)
        const out = toArray(output)

        this.setState({
            output: word.slice(0, substrLength).concat(out.slice(substrLength)),
            substrLength: substrLength + 1,
        });

        if (word.length !== substrLength) {
            this._loop(loopingFunc, deletingInterval);
        } else {
            this.setState({
            output: text,
            substrLength: 0,
            });
            callback();
        }
    };

    _animate() {
        const { index } = this.state;
        const { items, pause, emptyPause, eraseMode, random } = this.props;
        const type = this._type;
        const erase = this._erase;
        const overwrite = this._overwrite;
        const loopingFunc = this._animate.bind(this);
        let nextIndex;
        if (random) {
            nextIndex = Math.floor(Math.random() * Math.floor(items.length));
        } else {
            nextIndex = index === items.length - 1 ? 0 : index + 1;
        }

        const nextWord = () => {
            this.setState({index: nextIndex});
            this._loop(loopingFunc, emptyPause);
        };

        if (typeof this.props.onTypingStart == 'function') {
            this.props.onTypingStart();
        }

        type.bind(this)(items[index], () => {
            if (eraseMode === 'overwrite') {
            this._loop(overwrite.bind(this, items[nextIndex], nextWord), pause);
            } else {
            this._loop(erase.bind(this, nextWord), pause);
            }
        });
    };

    render() {
        const {
            color,
            cursor,
            deletingInterval,
            emptyPause,
            items,
            pause,
            eraseMode,
            typingInterval,
            random,
            ...other
        } = this.props;

        return (
            <span className="home-typing-alias"style={{ color }} {...other}>
            { this.state.output }
            { cursor ? <span className="react-rotating-text-cursor">|</span> : null }
            </span>
        );
    }

}

ReactRotatingText.propTypes = {
    color: PropTypes.string,
    cursor: PropTypes.bool,
    deletingInterval: PropTypes.number,
    emptyPause: PropTypes.number,
    eraseMode: PropTypes.string,
    items: PropTypes.array,
    pause: PropTypes.number,
    typingInterval: PropTypes.number,
    random: PropTypes.bool,
    onTypingStart: PropTypes.func,
    onTypingEnd: PropTypes.func,
    onDeletingStart: PropTypes.func,
    onDeletingEnd: PropTypes.func,
};

// Setting default prop values
ReactRotatingText.defaultProps = {
    color: 'inherit',
    cursor: true,
    deletingInterval: 50, // Default time between deleting characters
    emptyPause: 600,     // Default pause time between words (when no word is visible)
    eraseMode: 'erase',   // Default erase mode
    items: ['first', 'second', 'third', 'fourth', 'fifth'], // Default text items
    pause: 3500,          // Default pause time after typing a word (when a word is visible)
    typingInterval: 52,   // Default time between typing characters
    random: false,         // Default setting for randomizing text items
    initialdelay: 2950,      // Default time to wait before typing starts
};



export default ReactRotatingText;