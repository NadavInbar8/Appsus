const { Link } = ReactRouterDOM;

export function MailPreview({
  mail,
  togglePreview,
  onMoveToTrash,
  toggleStar,
  toggleRead,
  onSendNote,
}) {
  return (
    <div>
      {!mail.isOpen ? (
        <div
          className={
            mail.isRead ? 'mail-preview flex' : 'mail-preview bold flex'
          }
        >
          <div className='star-preview' onClick={toggleStar}>
            {!mail.star ? (
              <img src='../../../assets/SVG/notFilledStar.svg' alt='star' />
            ) : (
              <img src='../../../assets/SVG/filledStar.svg' alt='star' />
            )}
          </div>
          <div className='clickable flex' onClick={togglePreview}>
            <div className='from-preview'>{mail.from}</div>
            <div className='subject-preview'>{mail.subject}</div>
            <div className='text-preview'>
              {mail.body > 100 ? mail.body.slice(0, 30) : mail.body}
            </div>
            <div className='labels'>{mail.labels} </div>
          </div>
          <div className='preview-options'>
            <Link className='clean-link' to={`/mail/${mail.id}`}>
              Expand
            </Link>
            <button onClick={toggleRead}>
              {mail.isRead ? 'mark as unread' : 'mark as read'}
            </button>
            <button className='delete' onClick={onMoveToTrash}>
              move to trash
            </button>
            <Link className='clean-link' to='/keep'>
              <button className='send-note' onClick={onSendNote}>
                send as a note
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='mail-preview-open flex-column' onClick={togglePreview}>
          <h1 className='subject-preview-open'>{mail.subject}</h1>
          <div className='from-preview-open flex'>
            <h2>{mail.from}</h2> <h3>{mail.to}</h3>
          </div>
          <div className='text-preview-open'>{mail.body}</div>
          <div className='star-preview' onClick={toggleStar}>
            {!mail.star ? (
              <img src='../../../assets/SVG/notFilledStar.svg' alt='star' />
            ) : (
              <img src='../../../assets/SVG/filledStar.svg' alt='star' />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
