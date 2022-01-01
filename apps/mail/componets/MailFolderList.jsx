export function MailFolderList({
  mails,
  showUnreadCount,
  onFolderFilter,
  onTitleSort,
  onSortMail,
}) {
  let percent = 100;
  percent = showUnreadCount(mails);
  const getFolderFilter = (ev) => {
    ev.preventDefault();
    onFolderFilter(ev.target.value);
  };
  return (
    <div className='mail-folder-list flex-colunm'>
      <button onClick={onSortMail}>sort by date</button>
      <button onClick={onTitleSort}>sort by name</button>
      <ul>
        <li onClick={getFolderFilter} value='0'>
          Inbox
        </li>
        <li onClick={getFolderFilter} value='1'>
          Read
        </li>
        <li onClick={getFolderFilter} value='2'>
          Unread
        </li>
        <li onClick={getFolderFilter} value='3'>
          Starred
        </li>
        <li onClick={getFolderFilter} value='4'>
          Trash
        </li>
        <li onClick={getFolderFilter} value='5'>
          Sent
        </li>
      </ul>
      <div className='meter'>
        <span>{percent}</span>
        <meter min='0' max='100' value={percent}>
          {percent}
        </meter>
      </div>
    </div>
  );
}
