import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([])

    const navigate = useNavigate()

    const OngId = localStorage.getItem('OngId')
    const OngName = localStorage.getItem('OngName')


    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: OngId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [OngId])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: OngId,
                }
            })    
            
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear()

        navigate('/')
    }



    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {OngName} </span>

                <Link className="button" to="/incidentes/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident =>(
                    <li key={incident.id}>
                    <strong>CASO: </strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO: </strong>
                    <p>{incident.description}</p>

                    <strong>VALOR: </strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                    .format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button" >
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}
// onClick={() => handleDeleteIncident(incident.id)} // QUANDO COLOCO ESSA FUNÇÃO DA ERRO