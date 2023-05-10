let user = document.getElementById('input')
let divError = document.getElementById('divError')
let botao = document.getElementById('botao')
let perror = document.getElementById('perror')
let divRes = document.getElementById('divRes')
let contError1 = 0
function enviar() {
    if (user.value.length == 0 && contError1 < 1) {
        divError.innerHTML = `<p id="perror">Digite algo para enviar</p>`
        contError1 += 1
    } else {
        /*EnzoGoulart*/
        divError.style.display = 'none'
        fetch(`https://api.github.com/users/${user.value}`, {
            /*PS: sacada de mestre esse .value*/
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
            },
        }).then(data => {
            console.log(typeof data)
            console.log(data)
            return data.json()
        }).then(data => {
            if (data.login == undefined || data.login == undefined || data.public_repos == undefined) {
                divError.style.display = 'block'
                divError.innerHTML =`<p id="perror">Digite o seu usuário corretamente.</p>`
                divRes.innerHTML = ''
            } else {
                divError.style.display = 'none'
                divRes.innerHTML = `<p>O seu nome de usuário é '${data.login}';</p>`
                divRes.innerHTML += `<p>Seu nome é ${data.name};</p>`
                if(data.bio == null){
                    divRes.innerHTML += `<p>Você não tem biografia;</p>`
                }else{
                    divRes.innerHTML += `<p>Sua biografia é '${data.bio}';</p>`
                }
                divRes.innerHTML += `<p>Você tem ${data.public_repos} repositórios.;</p>`
            }
        }).finally(console.log('Tudo certo.'))
    }
}
