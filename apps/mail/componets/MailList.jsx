import { MailPreview } from './MailPreview.jsx';

export function MailList({ mails, togglePreview, onMoveToTrash }) {
  return (
    <div className='mail-list'>
      {mails.map((mail) => {
        return (
          <MailPreview
            key={mail.id}
            mail={mail}
            togglePreview={() => togglePreview(mails, mail.id)}
            onMoveToTrash={() => onMoveToTrash(mails, mail.id)}
          />
        );
      })}
    </div>
  );
}
