const { Link } = ReactRouterDOM;

export function MailPreview({ mail, togglePreview, onMoveToTrash }) {
  return (
    <Link className='clean-link' to={'/mail'}>
      <div>
        {!mail.isOpen ? (
          <div
            className={
              mail.isRead ? 'mail-preview flex' : 'mail-preview bold flex'
            }
            onClick={togglePreview}
          >
            <div className='star-preview'>⭐</div>
            <div className='from-preview'>{mail.from}</div>
            <div className='subject-preview'>{mail.subject}</div>
            <div className='text-preview'>{mail.body}</div>
            <button className='delete' onClick={onMoveToTrash}>
              move to trash
            </button>
          </div>
        ) : (
          <div
            className='mail-preview-open flex-column'
            onClick={togglePreview}
          >
            <h1 className='subject-preview-open'>{mail.subject}</h1>
            <div className='from-preview-open flex'>
              <h2>{mail.from}</h2> <h3>{mail.to}</h3>
            </div>
            <div className='text-preview-open'>{mail.body}</div>
            <div className='star-preview-open'>⭐</div>
          </div>
        )}
      </div>
    </Link>
  );
}
