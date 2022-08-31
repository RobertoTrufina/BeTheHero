import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Logon from './pages/Logon'
import Register from './pages/Register/index';
import Profile from './pages/Profile';
import NewIncident from './pages/Newincident';

export default function ProjectRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Logon />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/incidentes/new" element={<NewIncident />} />

            </Routes>
        </BrowserRouter>
    )
}
