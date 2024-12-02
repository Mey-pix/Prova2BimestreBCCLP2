const urlBase = 'https://backend-bcc-2-b.vercel.app/mensagem';

export async function gravarMensagem(usuario){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}
