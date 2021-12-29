export class KeepApp extends React.Component {
  state = {
    notes: [],
    filterBy: null,
  };

  componentDidMount() {
    this.loadTodoos();
  }
  loadTodoos = () => {
    const { filterBy } = this.state;
    NotesService.query(filterBy).then((notes) => {
      this.setState({});
    });
  };

  onSetFilter = (filterBy) => {
    console.log(filterBy);
    this.setState({ filterBy }, this.loadMails);
  };

  render() {
    const { notes } = this.state;
    return (
      <div>
        <NotesHeader onSetFilter={this.onSetFilter} />

        {/* <MailFilter /> */}
        <NotesList notes={notes} />
      </div>
    );
  }
}
