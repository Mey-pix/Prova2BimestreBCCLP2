import {Button, Spinner, Col, Form, InputGroup,Row} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { gravarUsuario, alterarUsuario } from '../../../Servicos/ServicosUsuario';

export default function FormCadUsuario(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                gravarUsuario(usuario)
                    .then((resultado) => {
                        if (resultado.status) {
                            props.setExibirTabela(true);
                            props.success("Usuário Cadastrado!");
                        }
                        else {
                            props.error(resultado.mensagem);
                        }
                    });

            }
            else {
                alterarUsuario(usuario)
                    .then((resultado) => {
                        if (resultado.status) {
                            props.setModoEdicao(false);
                            props.success("Usuário Alterado");
                        }
                        else
                            props.error(resultado.mensagem);
                    });
            }
            props.setModoEdicao(false);
            props.setUsuarioSelecionado({
                id: 0,
                nickname: "",
                urlAvatar: "",
                dataIngresso: ""
            });
            props.setExibirTabela(true);
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="id"
                        name="id"
                        value={usuario.id}
                        disabled
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o id do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={usuario.nickname}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome do usuário!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Url da imagem:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="urlImagem"
                        name="urlImagem"
                        value={usuario.urlAvatar}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a url da imagem!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Data: </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="dataIngresso"
                        name="dataIngresso"
                        value={usuario.dataIngresso}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a data!</Form.Control.Feedback>
                </Form.Group>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>

    );
}