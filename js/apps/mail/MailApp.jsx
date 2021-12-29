export class MailApp extends React.Component {
  state = {
    mails: [],
    filterBy: null,
  };

  loadMails = () => {
    const { filterBy } = this.state;
    mailService.query(filterBy).then((mails) => {
      this.setState({ mails });
    });
  };

  render() {
    return (
      <div>
        <h1>mailApp</h1>
        {/* <MailFilter /> */}
        <MailList mails={mails} />
      </div>
    );
  }
}
