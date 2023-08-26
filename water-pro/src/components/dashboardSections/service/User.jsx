import { ReactComponent as Photo } from "../../../assets/photo.svg";
import { ReactComponent as Avatar } from "../../../assets/avatar.svg";

function User() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="relative group photo overflow-hidden rounded-full cursor-pointer">
        <Avatar />
        <div className="absolute group-hover:opacity-80 opacity-0 transition-opacity bg-mainBlack top-16 w-[90px] h-9 flex justify-center">
          <Photo className="text-mainWhite  w-6 h-6" />
        </div>
      </div>
      <div className="flex flex-col gap-8 text-mainWhite w-full break-all">
        <div>
          <label>Nome</label>
          <p>João Pedro de Sousa Corrêa</p>
        </div>
        <div>
          <label>E-mail</label>
          <p>joao.correa@academico.ifpb.edu.br</p>
        </div>
        <div>
          <label>Telefone</label>
          <p>(83) 98176-9315</p>
        </div>
      </div>
    </div>
  );
}

export default User;
