export function MailList({ mails }) {
  return (
    <div className='mail-list'>
      {mails.map((mail) => (
        <MailPreview className='mail-preview' key={mail.id} mail={mail} />
      ))}
    </div>
  );
}
