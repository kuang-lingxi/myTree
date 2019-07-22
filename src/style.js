import styled, { css } from 'styled-components';

const Node = styled.div`
  margin-left: 15px;
  margin-top: 5px;
`

const Expanded = css`  
  transform:rotate(90deg) translate(3px, 3px);
`

const show = css`
  display: block;
`

const hidden = css`
  display: none;
`

const CheckBox = styled.input.attrs(props => ({
  type: 'checkbox',
  checked: props.isChecked ? true : false
}))`
  :after {
    content:"✓";
    color:white;
    line-height:12px;
    display:${props => (props.isHalfChecked && !props.isChecked) ? 'block' : 'none'};
    width:12px;
    height:12px;
    border-radius: 2px;
    background-color:#D9D9D9;
  }
`
const Triangle = styled.div`
  display: inline-block;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-left-color: ${props => (props.isSingle ? 'transparent' : 'black')};
  cursor: pointer;
  transition: all .5s;
  ${props => (props.isExpanded ? Expanded : '')}
`

const Item = styled.span`
  vertical-align: middle
`

const Show = styled.div`
  ${props => (props.isExpanded ? show : hidden)}
`

export {
  Node,
  CheckBox,
  Item,
  Triangle,
  Show
}