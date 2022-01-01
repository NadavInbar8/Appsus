export class LongTxt extends React.Component {
  state = {
    txtShown: '',
    isLongTxtShown: false,
  };

  componentDidMount() {
    this.showText();
  }
  showText = () => {
    var fullText = this.props.text;
    if (fullText.length < 100) {
      this.setState({ txtShown: fullText });
    } else {
      this.setState({ txtShown: fullText.slice(0, 100) });
    }
  };

  toggleShownTxt = (ev) => {
    var fullText = this.props.text;

    let { isLongTxtShown } = this.state;
    if (isLongTxtShown) {
      this.setState({
        txtShown: fullText.slice(0, 100),
        isLongTxtShown: false,
      });
      ev.target.innerText = ' show more..';
    } else if (!isLongTxtShown) {
      this.setState({ txtShown: fullText, isLongTxtShown: true });
      ev.target.innerText = ' show less..';
    }
  };

  render() {
    return (
      <p>
        {this.state.txtShown}
        {this.props.text.length > 100 && (
          <span className='more' onClick={this.toggleShownTxt}>
            <b> show more...</b>
          </span>
        )}
      </p>
    );
  }
}
