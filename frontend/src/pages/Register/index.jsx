import React, { useState } from "react";
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import api from "../../services/api";
import './styles.css';

export default function Register() {
    const [name, setName ] = useState('')
    const [email, setEmail ] = useState('')
    const [whatsapp, setWhatsApp ] = useState('')
    const [city, setCity ] = useState('')
    const [uf, setUf ] = useState('')

    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()

        const data = ({
            name,
            email,
            whatsapp,
            city,
            uf
        })

        try {
            const response = await api.post('ongs', data)
            alert(`Seu ID de acesso: ${response.data.id}`)

            navigate('/') 
        } catch (err) {
            alert('Erro no cadastro, tente novamento.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    />
                    <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}       
                    required             
                    />
                    <input
                    placeholder="WhatsApp" 
                    value={whatsapp}
                    onChange={e => setWhatsApp(e.target.value)}
                    required
                    />

                    <div className="input-group">
                        <input
                        placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                        />
                        <input
                        placeholder="UF"
                        style={{ width: 80 }} 
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                        required
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    )

}