<script>
    import { auth } from './firebase'
    import { push } from 'svelte-spa-router'
    let email = ''
    let pass = ''

    auth.onAuthStateChanged((user)=>{
        if (user) {
            push('/crud')
        }else{
            console.log('no iniciaste sesion')
        }
    })

    const registro = (email, pass) =>{
        auth.createUserWithEmailAndPassword(email, pass).then(()=>{
            console.log('Registrado correctamente')
            // db.collection('users').add({
			// nombre: nombre,
			// email: email,
		// })
		// nombre = ''
		// email = ''
        }).catch((error)=>{
            console.error(error)
        })
    }

    const login = (email, pass) =>{
        auth.signInWithEmailAndPassword(email, pass).then(()=>{
            push('/crud')
        }).catch((error)=>{
            console.error(error)
        })
    }
</script>
<h1>Login|Registro</h1>

<input type="email" placeholder="Email" bind:value={email}>
<input type="password" placeholder="Pass" bind:value={pass}>
<button class="btn blue" on:click={login(email,pass)}>Ingresar</button>
<button class="btn green" on:click={registro(email,pass)}>Registro</button>