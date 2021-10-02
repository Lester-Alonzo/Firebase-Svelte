<script>
	import {db} from './firebase'
    import { auth } from './firebase'
    import { push } from 'svelte-spa-router'
    import { storage } from './firebase'
    let emailUser = ''
    let idUser = ''
    auth.onAuthStateChanged((user)=>{
        if (user) {
            emailUser = user.email
            idUser = user.uid

        }else{
            push('/')
        }
    })

    let files
    let ruta = ''
	let nombre = ''
	let email = ''
	let users = []
	let idUpdate = ''
	db.collection('users').orderBy('nombre', 'asc').onSnapshot(data=>{
		users = data.docs
	})

	const addUser = ()=>{
        let file = ''
        if (files && files[0]) {
            file = files[0].name + Math.random().toString(30)
        }
        storage.child( `imagenes/${file}` ).put(files[0]).then((snapshot)=>{
            console.log('Imagen cargada correctamente')
            snapshot.ref.getDownloadURL().then((url)=>{
                console.log(url)
            db.collection('users').add({
			    nombre: nombre,
			    email: email,
                ruta: url,
                file:file
		})
		nombre = ''
		email = ''
            })
        })
		

	}
	const deleteUser = (id, img)=>{
		db.collection('users').doc(id).delete()

        let imagenDelete = storage.child( `imagenes/${img}`)
        imagenDelete.delete().then(()=>{
            console.log('Imagen Eliminada')
        }).catch((error)=>{
            console.error(error)
        })
	}

	const enviarForm = (x, y, z) =>{
		nombre = x
		email = y
		idUpdate = z
	}

	const updateUser = () =>{
		db.collection('users').doc(idUpdate).update({
			nombre: nombre,
			email: email
		})
	}
	let user = {}
	const userById = (id) =>{
		db.collection('users').doc(id).onSnapshot(data=>{
			user = data.data()
			console.log(user.nombre)
		})
	}

    const salir = ()=>{
        auth.signOut()
        push('/')
    }
</script>


	<h1>Crud firestore</h1>
    <h4>Bienbenido {emailUser}</h4>
	<input type="hidden" bind:value={idUpdate}>
	<input type="text" placeholder="Nombre" bind:value={nombre}>
	<input type="text" placeholder="Email" bind:value={email}>
    <input type="file" bind:files>
	<button class="btn blue" on:click={addUser}>Guardar</button>
	<button class="btn green" on:click={updateUser}>Actualizar</button>
	<table>
        <th></th>
		<th>id</th>
		<th>Nombre</th>
		<th>Email</th>
		<th>Eliminar</th>
		<th>Editar</th>
		<th>Enviar ID</th>
		{#each users as item}
		<tr>
            <td><img src={item.data().ruta} alt="" width="100" height="100" class="circle"></td>
			<td >{item.id}</td>
			<td>{item.data().nombre}</td>
			<td>{item.data().email}</td>
			<td> <button class="btn red" on:click={deleteUser(item.id, item.data().file)}>Eliminar</button></td>
			<td> <button class="btn orange" on:click={enviarForm(item.data().nombre, item.data().email, item.id)}>Editar</button> </td>
			<td> <button class="btn cyan" on:click={userById(item.id)}>Enviar ID</button></td>
		</tr>
	{:else}
		<tr>
			<td colspan="6">
				<p>No hay datos en firestore</p>
			</td>
		</tr>
	{/each}

	</table>
    {#if files && files[0]}
    <p>{files[0].name}</p>
    {/if}
    <button class="btn red" on:click={salir}>Cerrar Sesion</button>
