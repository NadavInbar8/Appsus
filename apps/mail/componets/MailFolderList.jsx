export function MailFolderList({ mails, showUnreadCount }) {
  // handleChange = ({ target }) => {
  //   const field = target.name;
  //   const value = target.value;
  //   // console.log(field, value);
  //   this.setState((prevState) => ({ ...prevState, [field]: value }));
  // };

  // getFitler = (ev) => {
  //   ev.preventDefault();
  //   console.log(this.state);

  //   this.props.onSetFilter(this.state);
  // };

  let percent = 100;
  percent = showUnreadCount(mails);

  return (
    <div>
      <span>{percent}</span>
      <meter min='0' max='100' value={percent}>
        {percent}
      </meter>
    </div>
  );
}
