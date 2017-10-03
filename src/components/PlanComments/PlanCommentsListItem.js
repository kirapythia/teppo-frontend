import React from 'react';

/**
 * A single row in comments list
 * @param {object} props
 * @param {object} props.comment
 */
const PlanCommentsListItem = ({ comment }) => (
  <li className="PlanCommentsListItem">
    <div>
      <i className="fa fa-comment-o fa-2x" aria-hidden />
    </div>
    <div>
      <div className="PlanCommentsListItem__author">
        <a href="mailto:seija.suunnittelija@espoo.fi">
          Seija Suunnittelija
        </a>
      </div>
      <div className="PlanCommentsListItem__body">
        {comment.body}
      </div>
    </div>
  </li>
);

export default PlanCommentsListItem;
