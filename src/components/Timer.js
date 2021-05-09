import diffInSeconds from 'date-fns/differenceInSeconds';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledTimer = styled.div`
  font-size: 32px;
  text-align: center;
  color: ${(props) => props.isWon ? 'green' : 'black'};
`;

export default (props) => {
  const [diff, setDiff] = useState(null);

  let interval = null;
  useEffect(() => {
    if (props.start && !interval) {
      interval = setInterval(() => {
        setDiff(diffInSeconds(new Date(), props.start));
      });
    }
    if (props.isWon) {
      clearInterval(interval);
    }
    return () => {clearInterval(interval)}
  }, [props.start, props.isWon]);

  let formatted = `00:00`;
  if (diff) {
    const seconds = diff % 60;
    const minutes = (diff - seconds) / 60;
    formatted = `${minutes}m:${seconds}s`;
  }
  return <StyledTimer isWon={props.isWon}>{formatted}</StyledTimer>;
}
