import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 200px;
  height: 250px;
  border-radius: 30px;
  background-repeat: no-repeat;
  background-position: center center;
  transition: transform 2s;
  transform-style: preserve-3d;
  cursor: pointer;
  background-size: 200px 250px;
  background-image: url("${(props) => props.image}");
  box-shadow: RGBA(0, 0, 0, 0.5) 1px 0 10px;
  &:hover {
    box-shadow: RGBA(0, 0, 0, 1) 1px 0 15px;
  }
`;

const StyledCardOuter = styled(StyledCard)`
  visibility: ${(props) => props.visible ? 'visible' : 'hidden'};
  margin: 15px 10px;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
`;

const StyledCardInner = styled(StyledCard)`
  display: ${(props) => props.display ? 'block' : 'none'};

`;

const FrontSide = styled(StyledCardInner)`
  border: 2px solid black;
`;

const BackSide = styled(StyledCardInner)`
  position: relative;
  &:after {
    content: '${(props) => {
      if (!props.image) {
        return props.id + 1;
      }
    }}';
    font-size: 36px;
    position: absolute;
    top: calc(50% - 41px/2);
    display: block;
    width: 100%;
    text-align: center;    
  }
  border: ${(props) => props.image ? '' : '2px solid black'}; 
`;

export default (props) => {
  const clickHandler = (event) => {
    return props.onClick(event, props);
  };
  return (
    <StyledCardOuter
      visible={props.isWon || !props.isGuessed}
      onClick={clickHandler}
    >
      <FrontSide
        display={props.isFrontSide}
        image={props.frontSide}
      />
      <BackSide
        display={!props.isFrontSide}
        image={props.image}
        id={props.id}
      />
    </StyledCardOuter>
  );
}
