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
            <div className='subject-preview'>
              {mail.subject.length > 20
                ? mail.subject.slice(0, 20) + `...`
                : mail.subject}
            </div>
            <div className='text-preview'>
              {mail.body.length > 120
                ? mail.body.slice(0, 120) + `...`
                : mail.body}
            </div>
            {mail.labels.map((label) => {
              return (
                <span key={label} className='label-span'>
                  {label}
                </span>
              );
            })}
          </div>
          <div className='preview-options'>
            <Link className='clean-link' to={`/mail/${mail.id}`}>
              <img src='assets/SVG/expand.svg' alt='expand' />
            </Link>
            {mail.isRead ? (
              <img
                src='assets/SVG/markAsUnread.svg'
                alt='mark as unread'
                onClick={toggleRead}
                height='22px'
              />
            ) : (
              <img
                src='assets/SVG/markAsRead.svg'
                alt='mark as read'
                onClick={toggleRead}
                height='22px'
              />
            )}
            <img
              className='delete'
              src='assets/SVG/moveToTrash.svg'
              alt='Trash'
              height='20px'
              onClick={onMoveToTrash}
            />
            {/* <Link className='clean-link' to='/keep'> */}
            <img
              src='assets/SVG/sendAsANote.svg'
              alt='send as a note'
              height='20px'
              onClick={onSendNote}
            />
            {/* </Link> */}
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
