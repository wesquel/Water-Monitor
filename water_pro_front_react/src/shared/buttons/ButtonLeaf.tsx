import {ButtonAntd} from "./button.styles";
import {ButtonProps} from 'antd';


const ButtonLeaf = ({...props}: ButtonProps) => 
{
  return(<ButtonAntd {...props}></ButtonAntd>);
}

export default ButtonLeaf;

