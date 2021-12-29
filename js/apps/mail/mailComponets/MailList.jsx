export function MailList({ mails }) {
  return (
    <div className='mail-list'>
      {mails.map((mail) => (
        <li key={mail.id}> {mail.body}</li>
      ))}
      hello
    </div>
  );
}
