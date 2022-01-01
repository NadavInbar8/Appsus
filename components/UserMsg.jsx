import { eventBusService } from '../js/services/event-bus.service.js';

export class UserMsg extends React.Component {
  state = {
    msg: null,
  };

  removeEventBus = null;
  timeoutId = null;

  componentDidMount() {
    this.removeEventBus = eventBusService.on('user-msg', (msg) => {
      this.setState({ msg }, this.onAutoClose);
    });
  }

  onAutoClose = () => {
    this.timeoutId = setTimeout(() => {
      this.onCloseMsg();
    }, 3000);
  };
  onCloseMsg = () => {
    clearTimeout(this.timeoutId);
    this.setState({ msg: null });
  };

  render() {
    const { msg } = this.state;
    if (!msg) return <React.Fragment></React.Fragment>;
    return (
      <div className={`user-msg ${msg.type} `}>
        <h1>{msg.text}</h1>
        {msg.link && <a href={`/#/books/${msg.link}`}>Check it Out</a>}
      </div>
    );
  }
}
