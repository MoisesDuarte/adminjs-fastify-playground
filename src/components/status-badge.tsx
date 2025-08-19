import { ShowPropertyProps } from 'adminjs';
import React from 'react';

const StatusBadge: React.FC<ShowPropertyProps> = (props: ShowPropertyProps) => {
  const { property, record } = props;
  const refId = record.params[property.path];
  const populated = record.populated[property.path];
  const value = (populated && populated.title) || refId;

  const statusColors = {
    PENDING: { background: '#FBBF24', color: '#92400E' }, // amber background, dark amber text
    ACTIVE: { background: '#34D399', color: '#065F46' }, // green background, dark green text
    INACTIVE: { background: '#F87171', color: '#7F1D1D' }, // red background, dark red text
    BLOCKED: { background: '#A78BFA', color: '#4C1D95' }, // purple background, dark purple text
  };

  return (
    <div style={{
      display: 'inline-block',
      borderRadius: '10px',
      padding: '5px 10px',
      fontWeight: 'bold',
      backgroundColor: statusColors[value].background,
      color: statusColors[value].color,
    }}
    >
      { value }
    </div>
  );
};

export default StatusBadge;
