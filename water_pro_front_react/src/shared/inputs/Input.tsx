import {BoxInput, TitleInput} from "./input.styles";
import {Input as InputAntd} from 'antd';
import {InputProps as InputPropsAntd} from 'antd';

interface InputProps extends InputPropsAntd
{
  title?: string;
}

const Input = ({title, ...props}: InputProps) => 
{
  return (
    <BoxInput>
      {title && (<TitleInput>{title}</TitleInput>)}
      <InputAntd {...props}></InputAntd>
    </BoxInput>
  )
}

export default Input;
