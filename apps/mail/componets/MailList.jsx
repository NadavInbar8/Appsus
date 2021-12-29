import { MailPreview } from './MailPreview.jsx';

export function MailList({ mails }) {
  return (
    <div className='mail-list'>
      {mails.map((mail) => {
        return <MailPreview key={mail.id} mail={mail} />;
      })}
    </div>
  );
}
