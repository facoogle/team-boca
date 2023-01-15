import Usuario from "../models/Usuario.js"
import token from "../helpers/token.js"
const registrar = async(req, res) => {
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({ email })

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = token()
        await usuario.save()
            // TODO: Agregar funcionalidad de comprobación por correo

        res.json({ msg: "Usuario creado correctamente revisa tú correo para confirmar tú cuenta" })
    } catch (error) {
        console.log(error)
    }
}


const getPublicUser = async(req, res) =>{
    const {id} = req.params;

    const usuario = await Usuario.findById(id).select("-password -confirmado -token -createdAt -updatedAt -__v")

    if(!usuario){
        const error = new Error("Usuario no existe")
        return res.status(404).json({ msg: error.message })
    }


    res.json(usuario)

}

export { registrar, getPublicUser }