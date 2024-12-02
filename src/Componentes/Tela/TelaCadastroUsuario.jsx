import { Alert } from "react-bootstrap";
import Pagina from "../Layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaUsuario from "./Tabelas/TabelaUsuario";
import { consultarUsuario } from "../../Servicos/ServicosUsuario";

export default function TelaCadastroUsuario(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        codigo: 0
    });

    useEffect(() => {
        consultarUsuario().then((lista) => {
            setListaDeUsuario(lista)
        })
    }, []) //listaVazia

    useEffect(() => {
        consultarUsuario().then((lista) => {
            setListaDeUsuario(lista)
        })
    }, [listaDeUsuario])
    // atualiza a lista com dados do backend
    
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Produto
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
                        <FormCadProdutos
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