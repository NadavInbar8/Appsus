import { MailPreview } from './MailPreview.jsx';

export function MailList({
  mails,
  togglePreview,
  onMoveToTrash,
  toggleStar,
  toggleRead,
  loadMails,
  onSendNote,
  onSortMail,
  onTitleSort,
}) {
  return (
    <div className='mail-list'>
      <table>
        <thead>
          <tr>
            <th width='100px'>star</th>
            <th onClick={onTitleSort}>From</th>
            <th>Subject</th>
            <th width='100%'>Message</th>
            <th width='100%'>Labels</th>
            <th onClick={onSortMail}>Date</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {mails.map((mail) => (
            <MailPreview
              key={mail.id}
              mail={mail}
              toggleStar={() => {
                toggleStar(mails, mail.id);
                loadMails();
              }}
              toggleRead={() => {
                toggleRead(mails, mail.id);
                loadMails();
              }}
              togglePreview={() => {
                togglePreview(mails, mail.id);
                loadMails();
              }}
              onMoveToTrash={() => onMoveToTrash(mail.id)}
              onSendNote={() => onSendNote(mail.subject, mail.body)}
            />
          ))}
        </tbody>
      </table>
      {/* 
        {mails.map((mail) => {
          return (
            <MailPreview
              key={mail.id}
              mail={mail}
              toggleStar={() => {
                toggleStar(mails, mail.id);
                loadMails();
              }}
              toggleRead={() => {
                toggleRead(mails, mail.id);
                loadMails();
              }}
              togglePreview={() => {
                togglePreview(mails, mail.id);
                loadMails();
              }}
              onMoveToTrash={() => onMoveToTrash(mail.id)}
              onSendNote={() => onSendNote(mail.subject, mail.body)}
            />
          );
        })}
      </table> */}
    </div>
  );
}
