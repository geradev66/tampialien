import React from 'react'
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { Link } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {useState} from "react";

const Login = () => {

    const { login } = useAuth();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await login(form);
        if (res.success) {
            window.location.href = '/admin';
        } else {
            alert(res.message || 'Error al iniciar sesión');
        }
    }

  return (
    <>
    <div className='flex flex-col md:flex-row gap-8 p-4 justify-center items-start mb-[22em]'>
        <div>
        <h2 className='text-white text-2xl'><i className="fa-solid fa-user text-[#39ff14]"></i> Iniciar sesión</h2>
        <p className='text-white'>¿No tienes una cuenta? <Link to="/register" className='text-[#39ff14]'>Regístrate aquí</Link>.</p>
        <Form className="mt-4" onSubmit={handleSubmit}>
            <TextField>
                <Label className="text-white">Correo electrónico</Label>
                <Input type="email" name="email" placeholder="Tu correo electrónico" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                <Description>Por favor ingresa tu correo electrónico.</Description>
                <FieldError>El correo electrónico es requerido.</FieldError>
            </TextField>
            <TextField className="mt-4">
                <Label className="text-white">Contraseña</Label>
                <Input type="password" name="password" placeholder="Tu contraseña" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
                <Description>Por favor ingresa tu contraseña.</Description>
                <FieldError>La contraseña es requerida.</FieldError>
            </TextField>
            <Button type="submit" className="mt-4 bg-[#39ff14] text-black hover:bg-[#32cd32]">Iniciar sesión</Button>
        </Form>
        </div>
    </div>
      
    </>
  )
}

export default Login
