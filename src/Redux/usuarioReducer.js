import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarUsuario } from "../Servicos/ServicosUsuario";
import ESTADO from "./Estados";

const buscarUsuario = createAsyncThunk("buscarUsuario", async () => {
    const resultado = await consultarUsuario()
    try {
        if (Array.isArray(resultado)) //se meu retorno for um array
        {
            return {
                "status": true,
                "mensagem": "Usuários recuperados com sucesso.",
                listaDeUsuarios
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os usuários do backend.",
                listaDeUsuarios: []
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " +erro.message,
            "listaDeUsuarios": []
        }
    }
})
const usuarioReducer = createSlice({
    name: "usuario",
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeUsuarios: []
    },
    reducers: {},
    extreReducers: (builder) => {
        builder
        .addCase(buscarUsuario.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE
            state.mensagem = "Processando requisição (buscando usuários)"
        })
        .addCase(buscarUsuario.fulfilled, (state, action) => {
            if(action.payload.status)
            {
                state.estado = ESTADO.OCIOSO
                state.mensagem = action.payload.mensagem
                state.listaDeUsuarios = action.payload.listaDeUsuarios
            }
            else
            {
                state.estado = ESTADO.ERRO
                state.mensagem = action.payload.mensagem
                state.listaDeUsuarios = action.payload.listaDeUsuarios
            }
        })
        .addCase(buscarUsuario.rejected, (state, action) => {
            state.estado = ESTADO.ERRO
            state.mensagem = action.payload.mensagem
            state.listaDeUsuarios = action.payload.listaDeUsuarios
        })
    }
})

export default usuarioReducer.reducer