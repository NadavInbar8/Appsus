import { MailPreview } from './MailPreview.jsx';

export function MailList({ mails }) {
  function togglePreview(mailId) {
    mails.map((mail) => {
      if (mail.id === mailId) {
        console.log(mail.isOpen);
        mail.isOpen = !mail.isOpen;
        console.log('after change', mail.isOpen);
        mail.isRead = true;
      }
    });
  }

  function showUnreadCount(mails) {
    let unreadCount = 0;
    mails.forEach((mail) => {
      if (!mail.isRead) unreadCount++;
    });
    let percent = (unreadCount / mails.length) * 100;
    return percent;
  }

  const percent = showUnreadCount(mails);

  return (
    <div className='mail-list'>
      {mails.map((mail) => {
        return (
          <MailPreview
            key={mail.id}
            mail={mail}
            togglePreview={() => togglePreview(mail.id)}
          />
        );
      })}
    </div>
  );
}
