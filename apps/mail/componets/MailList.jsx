import { MailPreview } from './MailPreview.jsx';

export function MailList({ mails, togglePreview }) {
  return (
    <div className='mail-list'>
      {mails.map((mail) => {
        return (
          <MailPreview
            key={mail.id}
            mail={mail}
            togglePreview={() => togglePreview(mails, mail.id)}
          />
        );
      })}
    </div>
  );
}
