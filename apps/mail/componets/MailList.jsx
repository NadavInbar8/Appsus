import { MailPreview } from './MailPreview.jsx';

export function MailList({
  mails,
  togglePreview,
  onMoveToTrash,
  toggleStar,
  toggleRead,
  loadMails,
  onSendNote,
}) {
  return (
    <div className='mail-list'>
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
    </div>
  );
}
