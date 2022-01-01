const { Link } = ReactRouterDOM;

export function MailPreview({
  mail,
  togglePreview,
  onMoveToTrash,
  toggleStar,
  toggleRead,
  onSendNote,
}) {
  let d = new Date(mail.sentAt);
  return !mail.isOpen ? (
    <tr className={mail.isRead ? 'mail-preview' : 'mail-preview bold '}>
      <td className='star-preview' onClick={toggleStar}>
        {!mail.star ? (
          <img src='../../../assets/SVG/notFilledStar.svg' alt='star' />
        ) : (
          <img src='../../../assets/SVG/filledStar.svg' alt='star' />
        )}
      </td>
      <td className='from-preview' onClick={togglePreview}>
        {mail.from}
      </td>
      <td className='subject-preview' onClick={togglePreview}>
        {mail.subject.length > 20
          ? mail.subject.slice(0, 20) + `...`
          : mail.subject}
      </td>
      <td className='text-preview' onClick={togglePreview}>
        {mail.body.length > 60 ? mail.body.slice(0, 60) + `...` : mail.body}
      </td>
      <td onClick={togglePreview}>
        {mail.labels.map((label) => {
          return (
            <span key={label} className='label-span'>
              {label}{' '}
            </span>
          );
        })}
      </td>
      <td onClick={togglePreview}>
        {d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()}
      </td>
      <td className='preview-options'>
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
        <img
          src='assets/SVG/sendAsANote.svg'
          alt='send as a note'
          height='20px'
          onClick={onSendNote}
        />
      </td>
    </tr>
  ) : (
    <tr className='expand-preview'>
      <td>
        {!mail.star ? (
          <img src='../../../assets/SVG/notFilledStar.svg' alt='star' />
        ) : (
          <img src='../../../assets/SVG/filledStar.svg' alt='star' />
        )}
      </td>
      <td className='from-preview' onClick={togglePreview}>
        {mail.from}
      </td>
      <td className='expand-preview-cell' onClick={toggleStar}>
        <div className='expand-preview-cell-content'>
          <div onClick={togglePreview} className='from-preview-open flex'>
            <h3>
              {mail.from} to {mail.to}
            </h3>
          </div>
          <div onClick={togglePreview} className='text-preview-open'>
            {mail.body}
          </div>
        </div>
      </td>
    </tr>
  );

  // <tr
  //   className={mail.isRead ? 'mail-preview flex' : 'mail-preview bold flex'}
  // >
  //   {/* // !mail.isOpen ?  */}

  //   <td className='star-preview' onClick={toggleStar}>
  //     {!mail.star ? (
  //       <img src='../../../assets/SVG/notFilledStar.svg' alt='star' />
  //     ) : (
  //       <img src='../../../assets/SVG/filledStar.svg' alt='star' />
  //     )}
  //   </td>
  //   <td className='clickable flex' onClick={togglePreview}>
  //     <div className='from-preview'>{mail.from}</div>
  //     <div className='subject-preview'>
  //       {mail.subject.length > 20
  //         ? mail.subject.slice(0, 20) + `...`
  //         : mail.subject}
  //     </div>
  //     <div className='text-preview'>
  //       {mail.body.length > 120 ? mail.body.slice(0, 120) + `...` : mail.body}
  //     </div>
  //     {mail.labels.map((label) => {
  //       return (
  //         <span key={label} className='label-span'>
  //           {label}
  //         </span>
  //       );
  //     })}
  //   </td>
  //   <td className='preview-options'>
  //     <Link className='clean-link' to={`/mail/${mail.id}`}>
  //       <img src='assets/SVG/expand.svg' alt='expand' />
  //     </Link>
  //     {mail.isRead ? (
  //       <img
  //         src='assets/SVG/markAsUnread.svg'
  //         alt='mark as unread'
  //         onClick={toggleRead}
  //         height='22px'
  //       />
  //     ) : (
  //       <img
  //         src='assets/SVG/markAsRead.svg'
  //         alt='mark as read'
  //         onClick={toggleRead}
  //         height='22px'
  //       />
  //     )}
  //     <img
  //       className='delete'
  //       src='assets/SVG/moveToTrash.svg'
  //       alt='Trash'
  //       height='20px'
  //       onClick={onMoveToTrash}
  //     />
  //     <img
  //       src='assets/SVG/sendAsANote.svg'
  //       alt='send as a note'
  //       height='20px'
  //       onClick={onSendNote}
  //     />
  //   </td>
  // // )
  // // } */}
  // </tr>
}
