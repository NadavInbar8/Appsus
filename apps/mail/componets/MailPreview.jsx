export class MailPreview extends React.Component {
  render() {
    const { mail } = this.props;
    return (
      <div>
        {mail.from} {mail.subject}
      </div>
    );
  }
}
