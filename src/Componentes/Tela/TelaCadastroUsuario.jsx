import { Alert } from "react-bootstrap";
import Pagina from "../Layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaUsuario from "./Tabelas/TabelaUsuario";
import { consultarUsuario } from "../../Servicos/ServicosUsuario";
import FormCadUsuario from "./Formularios/FormCadUsuario";
export default function TelaCadastroUsuario(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeUsuarios, setListaDeUsuarios]=useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        codigo: 0,
        nickname:"",
        dataIngresso:"",
        mensagem:{}
    });

    useEffect(() => {
        consultarUsuario().then((lista) => {
            setListaDeUsuarios(lista)
        })
    }, []) //listaVazia

    useEffect(() => {
        consultarUsuario().then((lista) => {
            setListaDeUsuarios(lista)
        })
    }, [listaDeUsuarios])
    // atualiza a lista com dados do backend
    
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de usuário
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaUsuario
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            setUsuarioSelecionado={setUsuarioSelecionado}
                        />
                        :
                        <FormCadUsuario
                            setExibirTabela={setExibirTabela}
                            usuarioSelecionado={usuarioSelecionado}
                            setUsuarioSelecionado={setUsuarioSelecionado}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}

                        />
                }
            </Pagina>
        </div>
    );

}